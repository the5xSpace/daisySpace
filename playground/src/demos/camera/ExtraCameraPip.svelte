<script>
// =============================================================================
// ExtraCameraPip.svelte - 多机位画中画 Demo
// -----------------------------------------------------------------------------
// 本文件演示 ExtraCamera 和 PiP（画中画）的多机位分镜功能：
//   - 创建附加相机（ExtraCamera）并绑定到不同目标
//   - 开启画中画窗口（PiP），支持鼠标交互、拖拽、缩放
//   - 显示视锥体（Frustum）和姿态球（Attitude Sphere）
//   - 主相机锁定/解锁控制
//
// 关键 API：
//   - engine.createExtraCamera({ id, target, follow, view })
//     · id: 相机唯一标识
//     · target: 跟踪目标（实体或坐标）
//     · follow: true - 跟踪目标移动，false - 固定观察
//     · view: { distance, headingDeg, pitchDeg, rollDeg }
//   - extraCamera.openPiP(options)
//     · options: { title, position, enableMouseControl, enableWindowDrag,
//                 enableWindowResize, enableMinimize, enableMaximize,
//                 enableRestore, maxFps }
//   - extraCamera.showFrustum({ color, showCamera })
//   - extraCamera.showAttitudeSphereOverlay({ showLabels, size })
//   - extraCamera.destroy()  // 销毁附加相机
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化时间与场景 ─────────────────────────────────────────────────────────
// 设置仿真时间范围和当前时间，20x 速度循环播放
const startTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T05:30:00Z"));
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T14:30:00Z"));
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

// setSceneTime(startTime, stopTime, loop): 设置场景时间范围，第三参数为 loop
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(now);    // 设置当前仿真时间
engine.setMultiplier(20);      // 20 倍速
engine.setLoop(true);          // 循环播放
engine.play();

// ── 2. 卫星轨道计算 ─────────────────────────────────────────────────────────
// 使用 SGP4 模型从 TLE 计算卫星星历（ephemeris）
const satTle = `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`;
// Spg4.ephemeris(tle, null, startTime, stopTime, stepMs): 计算星历
// 返回数组，每项包含 ECI 坐标（单位 km）
const ephemeris = Daisy.Spg4.ephemeris(
    satTle,
    null,
    Daisy.JulianDate.toDate(startTime),
    Daisy.JulianDate.toDate(stopTime),
    60 * 1000,  // 步长 60 秒（毫秒单位）
);
// TrajectorySample: 轨迹采样数据（惯性坐标系）
// 将 ECI 坐标（km）转换为米并构建轨迹
const satTrajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.INERTIAL);
satTrajectory.pushData(ephemeris.map((sample, index) => {
    const time = Daisy.JulianDate.addSeconds(startTime, index * 60, new Daisy.JulianDate());
    return {
        time,
        position: new C3(
            sample.eci.position.x * 1000,  // km -> m
            sample.eci.position.y * 1000,
            sample.eci.position.z * 1000,
        ),
    };
}));

// ── 3. 创建卫星实体 ─────────────────────────────────────────────────────────
// 设置位置（轨迹）和姿态（速度方向），添加点、标签和模型特征
const sat = engine.createEntity("STARLINK-1008");
sat.position = satTrajectory;
sat.orientation = satTrajectory.getVelocityOrientation();  // 姿态：速度方向
sat.addFeature(new Daisy.PointFeature({ pixelSize: 10, color: Color.CYAN, outlineColor: Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));
// LabelFeature: UI 标签
// style: FILL_AND_OUTLINE - 填充+描边样式
// backgroundPadding: 背景内边距，pixelOffset: 像素偏移
sat.addFeature(new Daisy.UI.LabelFeature({
    text: "STARLINK-1008",
    font: "13px sans-serif",
    fillColor: Color.WHITE,
    style: Daisy.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 2,
    outlineColor: Color.BLACK,
    showBackground: true,
    backgroundColor: Color.BLACK.withAlpha(0.35),
    backgroundPadding: new Daisy.Cartesian2(6, 4),
    pixelOffset: new Daisy.Cartesian2(0, -22),
}));
// ModelFeature: 3D 模型特征
// minimumPixelSize: 最小像素大小（保证模型在远处也可见）
// silhouetteSize: 轮廓线宽度（用于高亮选中效果）
sat.addFeature(new Daisy.ModelFeature({
    url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"),
    show: true,
    minimumPixelSize: 96,
    silhouetteSize: 2,
}));
// setPath: 设置实体轨迹线
// historySecond: 历史轨迹时长（秒），futureSecond: 未来轨迹时长（秒）
// historyColor/futureColor: 历史/未来轨迹颜色
sat.setPath({
    width: 2,
    historySecond: 45 * 60,   // 45 分钟历史轨迹
    futureSecond: 45 * 60,    // 45 分钟未来轨迹
    historyColor: Color.CYAN.withAlpha(0.55),
    futureColor: Color.CYAN.withAlpha(0.35),
    show: true,
});
// setBodyAxis: 显示体轴坐标系
// lengthPx: 轴长度（像素单位），axisWidth: 线宽
sat.setBodyAxis({
    lengthPx: 72,
    axisWidth: 2,
    showLabels: true,
    showSphere: false,
});

// ── 4. 创建地面站实体 ─────────────────────────────────────────────────────────
// 北京地面站，使用 size（米）而不是 pixelSize（像素）
const stationEntity = engine.createEntity("GS-BEIJING");
stationEntity.position = C3.fromDegrees(116.4, 39.9, 0);
// PointFeature.size: 点大小（单位：米），不是像素！
stationEntity.addFeature(new Daisy.PointFeature({
    size: 18000,  // 18km 可见大小
    color: Color.YELLOW,
    outlineColor: Color.BLACK.withAlpha(0.8),
    outlineWidth: 2,
}));
stationEntity.addFeature(new Daisy.UI.LabelFeature({
    text: "GS-BJ",
    font: "11px sans-serif",
    fillColor: Color.YELLOW,
    style: Daisy.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 2,
    outlineColor: Color.BLACK,
    showBackground: true,
    backgroundColor: Color.BLACK.withAlpha(0.45),
    backgroundPadding: new Daisy.Cartesian2(5, 3),
    pixelOffset: new Daisy.Cartesian2(0, -18),
}));
// CylinderFeature: 圆锥体特征（底面半径 > 顶面半径 = 圆锥）
// material: 材质，这里使用 SpiralFlow 螺旋流动效果
stationEntity.addFeature(new Daisy.CylinderFeature({
    bottomRadius: 42000,  // 底面半径 42km
    topRadius: 12000,     // 顶面半径 12km
    height: 260000,       // 高度 260km
    material: Daisy.MaterialFactory.SpiralFlow({
        color: Color.fromCssColorString("#7f4dff"),  // 紫色
        spiralColor: Color.CYAN,  // 螺旋线颜色
        speed: 0.35,
        count: 0.3,
        thickness: 0.55,
        opacity: 0.86,
        direction: "backward",  // 螺旋方向：向后
    }),
    outline: true,
    outlineColor: Color.CYAN.withAlpha(0.65),
    outlineWidth: 1,
    show: true,
}));
// setBodyAxis: 显示地面站体轴坐标系
stationEntity.setBodyAxis({
    length: 180000,  // 轴长度 180km
    axisWidth: 2,
    showLabels: true,
    showSphere: false,
});
// 地面站观察目标点（高度 130km，用于相机定位）
const stationLookTarget = C3.fromDegrees(116.4, 39.9, 130000);

// ── 5. 主相机初始位置 ─────────────────────────────────────────────────────────
// 飞行到卫星位置，距离 2000km，俯仰 -45°
engine.camera.flyToTarget(sat, {
    duration: 0.4,
    offset: new Daisy.HeadingPitchRange(
        Daisy.Math.toRadians(0),
        Daisy.Math.toRadians(-45),
        2_000_000,  // 2000km
    ),
});

// ── 6. 画中画状态管理 ─────────────────────────────────────────────────────────
// satPip/stationPip: 附加相机实例
// satPipOpen/stationPipOpen: 画中画是否打开（响应式）
// mainCameraLocked: 主相机是否锁定（响应式）
let satPip = null;
let stationPip = null;
let satPipOpen = $state(false);
let stationPipOpen = $state(false);
let mainCameraLocked = $state(false);

// ── 7. 主相机控制器管理 ─────────────────────────────────────────────────────────
// 使用 Daisy 封装的 setCameraInputFlags：返回 restore 函数，调用后恢复原状

let restoreMainCameraInputs = null;

// setMainCameraLocked: 锁定/解锁主相机
// 锁定时：通过 setCameraInputFlags 禁用所有输入，保存 restore 函数
// 解锁时：调用 restore 恢复
function setMainCameraLocked(locked) {
    if (mainCameraLocked === locked) return;
    if (locked) {
        if (!restoreMainCameraInputs) {
            restoreMainCameraInputs = engine.setCameraInputFlags({
                rotate: false, translate: false, zoom: false,
                tilt: false, look: false, inputs: false,
            });
        }
        mainCameraLocked = true;
        __log("主相机已锁定：用户输入已关闭。");
        return;
    }
    if (restoreMainCameraInputs) {
        restoreMainCameraInputs();
        restoreMainCameraInputs = null;
    }
    mainCameraLocked = false;
    __log("主相机已解锁：用户输入已恢复。");
}

// toggleMainCameraLock: 切换主相机锁定状态
function toggleMainCameraLock() {
    setMainCameraLocked(!mainCameraLocked);
}

// ── 8. 卫星特写画中画 ─────────────────────────────────────────────────────────
// createExtraCamera: 创建附加相机
//   id: 唯一标识，target: 跟踪目标，follow: true 跟踪移动
//   view: { distance, headingDeg, pitchDeg, rollDeg }
function openSatellitePip() {
    if (satPipOpen) return;
    satPip = engine.createExtraCamera({
        id: "shot-satellite-close",
        target: sat,
        follow: true,
        view: { distance: 120000, headingDeg: 18, pitchDeg: -28, rollDeg: 0 },
    });
    // showFrustum: 显示视锥体（透明度 0.45）
    satPip.showFrustum({ color: Color.CYAN.withAlpha(0.45), showCamera: true });
    // openPiP: 打开画中画窗口
    satPip.openPiP({
        title: "卫星特写",
        position: { top: "10px", left: "360px", width: 430 },
        enableMouseControl: true,   // 允许鼠标控制
        enableWindowDrag: true,     // 允许窗口拖拽
        enableWindowResize: true,   // 允许窗口缩放
        enableMinimize: true,       // 允许最小化
        enableMaximize: true,       // 允许最大化
        enableRestore: true,        // 允许还原
        maxFps: 24,                 // 最大帧率 24fps
    });
    // showAttitudeSphereOverlay: 显示姿态球叠加层
    satPip.showAttitudeSphereOverlay({ showLabels: true, size: 30 });
    satPipOpen = true;
    __log("卫星特写机位已开启");
}

// ── 9. 测站分镜画中画 ─────────────────────────────────────────────────────────
// 创建固定观察地面站的附加相机（follow: false）
function openStationPip() {
    if (stationPipOpen) return;
    stationPip = engine.createExtraCamera({
        id: "shot-ground-station",
        target: stationLookTarget,  // 观察目标：地面站上方 130km
        follow: false,              // 固定观察，不跟踪移动
        view: { distance: 620000, headingDeg: 35, pitchDeg: -42, rollDeg: 0 },
    });
    stationPip.showFrustum({ color: Color.YELLOW.withAlpha(0.45), showCamera: true });
    stationPip.openPiP({
        title: "测站分镜",
        position: { right: "12px", bottom: "14px", width: 360 },
        enableMouseControl: true,
        enableWindowDrag: true,
        enableWindowResize: true,
        enableMinimize: true,
        enableMaximize: true,
        enableRestore: true,
        maxFps: 24,
    });
    stationPipOpen = true;
    __log("测站分镜机位已开启");
}

// ── 10. 关闭画中画 ─────────────────────────────────────────────────────────
// destroy: 销毁附加相机并释放资源
function closeSatellitePip() {
    if (satPip) {
        satPip.destroy();
        satPip = null;
    }
    satPipOpen = false;
}

function closeStationPip() {
    if (stationPip) {
        stationPip.destroy();
        stationPip = null;
    }
    stationPipOpen = false;
}

// ── 11. 批量操作函数 ─────────────────────────────────────────────────────────
function openAllPips() {
    openSatellitePip();
    openStationPip();
}

function closeAllPips() {
    closeSatellitePip();
    closeStationPip();
    __log("所有分镜画中画已关闭");
}

// resetMainShot: 重置主相机到全局视角
function resetMainShot() {
    engine.camera.flyToTarget(sat, {
        duration: 0.6,
        offset: new Daisy.HeadingPitchRange(
            Daisy.Math.toRadians(10),
            Daisy.Math.toRadians(-45),
            2_000_000,
        ),
    });
    __log("主相机已回到卫星与测站全局分镜");
}

// ── 12. 初始化与资源清理 ─────────────────────────────────────────────────────
// 启动时打开所有画中画，300ms 后再次打开（确保初始化完成）
openAllPips();
setTimeout(openAllPips, 300);

// registerCleanup: 注册清理函数
registerCleanup(() => {
    if (satPip) satPip.destroy();
    if (stationPip) stationPip.destroy();
    restoreMainCameraController();  // 恢复主相机控制器
});

__log("多机位分镜已启动：主相机展示全局，PiP 默认打开卫星特写和测站分镜。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="多机位分镜" padding="12px" width="240px">
    <div class="pip-head">
        <div class="pip-icon">🎥</div>
        <div class="pip-title">多机位控制台</div>
    </div>

    <div class="pip-status">
        <span class="pip-pill" class:on={satPipOpen}>卫星 {satPipOpen ? "开" : "关"}</span>
        <span class="pip-pill" class:on={stationPipOpen}>测站 {stationPipOpen ? "开" : "关"}</span>
        <span class="pip-pill" class:on={mainCameraLocked}>主相机 {mainCameraLocked ? "锁定" : "可控"}</span>
    </div>

    <div class="pip-group">
        <div class="pip-group-label">相机控制</div>
        <div class="pip-grid-2">
            <button onclick={resetMainShot}>主相机全局分镜</button>
            <button class:active={mainCameraLocked} onclick={toggleMainCameraLock}>{mainCameraLocked ? "解锁相机" : "锁定相机"}</button>
        </div>
    </div>

    <div class="pip-group">
        <div class="pip-group-label">画中画</div>
        <button onclick={openAllPips} disabled={satPipOpen && stationPipOpen}>开启全部画中画</button>
        <button onclick={openSatellitePip} disabled={satPipOpen}>开启卫星特写</button>
        <button onclick={openStationPip} disabled={stationPipOpen}>开启测站分镜</button>
        <button onclick={closeAllPips} disabled={!satPipOpen && !stationPipOpen}>关闭全部画中画</button>
    </div>
</DemoPanel>
<style>
.pip-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.pip-icon {
    width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 6px;
    background: var(--color-accent-muted);
    font-size: 13px;
}
.pip-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--panel-text-bright);
}
.pip-status {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
}
.pip-pill {
    padding: 3px 8px;
    border-radius: 999px;
    background: var(--panel-bg-card);
    color: var(--panel-text-muted);
    font-size: 10px;
    font-weight: 600;
    border: 1px solid var(--panel-border);
}
.pip-pill.on {
    color: var(--color-success);
    border-color: var(--color-success-muted);
    background: var(--color-success-muted);
}
.pip-group {
    margin-top: 6px;
    padding-top: 8px;
    border-top: 1px solid var(--panel-border);
}
.pip-group-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--panel-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
}
.pip-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
}
button {
    width: 100%;
    min-height: 30px;
    background: var(--panel-bg-card);
    border: 1px solid var(--panel-border);
    color: var(--panel-text);
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.12s;
}
button:hover { background: var(--color-accent-muted); border-color: var(--color-accent); }
button:disabled { opacity: 0.4; cursor: default; pointer-events: none; }
button.active {
    background: var(--color-accent-muted);
    border-color: var(--color-accent);
    color: var(--panel-text-bright);
}
</style>
