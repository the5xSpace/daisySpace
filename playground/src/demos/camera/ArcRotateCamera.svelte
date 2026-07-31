<script>
// =============================================================================
// ArcRotateCamera.svelte - 环绕跟踪相机 Demo
// -----------------------------------------------------------------------------
// 本文件演示 ArcRotateCamera 的核心功能：
//   - 围绕移动/静止实体持续环绕跟踪
//   - 触地绕行（Ground Collision Slide）自动避障
//   - 全局相机、环绕跟踪相机、退出跟踪三种模式切换
//
// 关键 API：
//   - engine.camera.followTarget(target, options)
//     · options.view: { distance, pitchDeg, headingDeg }
//     · options.installInputListeners: true（启用鼠标拖拽/滚轮交互）
//     · options.arcRotate: {
//         enableGroundCollisionSlide: boolean,    // 启用触地绕行
//         disableGroundCollisionSlideBelowTargetHeight: number  // 低于此高度自动禁用
//       }
//   - engine.camera.removeTrackedDaisyEntity()  // 退出跟踪
//   - engine.camera.flyToTarget(position, options)  // 飞行到目标
//   - engine.camera.setFrustumNear(near)  // 设置近裁剪面
//   - engine.onPreRender(callback)  // 每帧渲染前回调
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化引擎与地形 ─────────────────────────────────────────────────────────
// 设置时间倍速为 1（实时），关闭最大帧率限制，启动播放
// 清除默认底图并加载 ArcGIS 卫星影像
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;
const MathCesium = Daisy.Math;

// 设置时间倍速为 1（实时播放），关闭最大帧率限制，启动仿真
engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();
// 清除默认底图，加载 ArcGIS World Imagery 卫星图层
// Daisy.GeoImageryType.XYZ: 标准瓦片服务（{z}/{y}/{x} 模板）
engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
});

const routeLat = 39.9;
const routeStartLon = 116.396;
const routeEndLon = 116.414;
const routeSpeedMetersPerSecond = 9;  // 移动速度：9 m/s（约 32.4 km/h）
// 将经度差转换为米：1度经度 ≈ 111320 * cos(纬度) 米
const metersPerDegreeLon = 111320 * Math.cos(MathCesium.toRadians(routeLat));
const nearGroundAutoDisableHeight = 80;  // 低于 80m 时自动禁用触地绕行

// 响应式状态（Svelte 5 $state 语法）
let targetLon = routeStartLon;  // 当前目标经度
let lastMoveTime;                // 上一帧时间（JulianDate）
let cameraMode = $state("环绕跟踪");           // 当前相机模式
let targetAltitude = $state(16);                // 目标飞行高度（米）
let enableGroundCollisionSlide = $state(true);  // 用户是否启用触地绕行
// $derived: 派生状态，当目标高度 < 80m 时自动禁用触地绕行
let groundSlideAutoDisabled = $derived(targetAltitude < nearGroundAutoDisableHeight);
let groundSlideEffective = $derived(enableGroundCollisionSlide && !groundSlideAutoDisabled);

// ── 3. 目标位置计算函数 ─────────────────────────────────────────────────────────
// 根据经度计算目标的三维笛卡尔坐标（经度、纬度、高度）
// 纬度和高度通过 sin 函数产生小幅波动，模拟不规则运动轨迹
function targetPosition(lonDeg) {
    return C3.fromDegrees(
        lonDeg,
        routeLat + Math.sin((lonDeg - routeStartLon) * 820) * 0.0007,  // 纬度微小波动
        targetAltitude + Math.sin((lonDeg - routeStartLon) * 420) * 1.2,  // 高度微小波动
    );
}

// ── 4. 创建移动目标实体 ─────────────────────────────────────────────────────────
// 创建一个立方体作为移动目标，添加标签和体轴坐标系
const target = engine.createEntity("ArcRotate-GroundMover");
target.position = targetPosition(targetLon);
// CubeFeature: 立方体特征
// bottomX/bottomY: 底面尺寸（米），topX/topY: 顶面尺寸（米），height: 高度（米）
target.addFeature(new Daisy.CubeFeature({
    bottomX: 8,
    bottomY: 4,
    topX: 8,
    topY: 4,
    height: 3,
    color: Color.fromRgba(0x38d9ffff),  // RGBA 颜色：青蓝色
    outline: true,
    outlineColor: Color.WHITE,
    outlineWidth: 1,
    show: true,
}));
// TextFeature: UI 标签特征
// offsetPx: 像素偏移（Cartesian2），showBackground: 显示背景框
target.addFeature(new Daisy.UI.TextFeature({
    text: "Moving target",
    font: "13px sans-serif",
    offsetPx: new Daisy.Cartesian2(0, -20),
    showBackground: true,
    backgroundColor: Color.BLACK.withAlpha(0.5),
    fillColor: Color.WHITE,
}));
// setBodyAxis: 显示实体的体轴坐标系（XYZ 轴）
// length: 轴长度（米），axisWidth: 线宽，showLabels: 显示轴标签
target.setBodyAxis({
    length: 16,
    axisWidth: 1,
    showSphere: false,
    showLabels: true,
    labelPrefix: "+",
});

// ── 5. 路线起止点标记 ─────────────────────────────────────────────────────────
// PointFeature: 点特征，pixelSize: 像素大小（注意不是米）
const startMarker = engine.createEntity("ArcRotate-RouteStart");
startMarker.position = C3.fromDegrees(routeStartLon, routeLat, 0);
startMarker.addFeature(new Daisy.PointFeature({
    pixelSize: 9,
    color: Color.LIME,
    outlineColor: Color.BLACK.withAlpha(0.8),
    outlineWidth: 2,
}));

const endMarker = engine.createEntity("ArcRotate-RouteEnd");
endMarker.position = C3.fromDegrees(routeEndLon, routeLat, 0);
endMarker.addFeature(new Daisy.PointFeature({
    pixelSize: 9,
    color: Color.YELLOW,
    outlineColor: Color.BLACK.withAlpha(0.8),
    outlineWidth: 2,
}));

// ── 6. 渲染前回调：移动目标 ─────────────────────────────────────────────────
// engine.onPreRender: 每帧渲染前回调，返回取消注册函数
// 计算时间差，根据速度更新目标经度，循环往复运动
const removePreRender = engine.onPreRender((time) => {
    const deltaSeconds = lastMoveTime
        ? MathCesium.clamp(Daisy.JulianDate.secondsDifference(time, lastMoveTime), 0, 0.1)
        : 0;
    lastMoveTime = Daisy.JulianDate.clone(time, lastMoveTime || new Daisy.JulianDate());
    if (deltaSeconds <= 0) return;
    // 速度(m/s) * 时间差(s) / 每度经度米数 = 经度增量
    targetLon += (routeSpeedMetersPerSecond * deltaSeconds) / metersPerDegreeLon;
    if (targetLon > routeEndLon) targetLon = routeStartLon;  // 循环
    target.position = targetPosition(targetLon);
});

// ── 7. 全局相机模式 ─────────────────────────────────────────────────────────
// removeTrackedDaisyEntity: 取消跟踪，恢复默认相机控制
// flyToTarget: 飞行到指定位置（可指定 HeadingPitchRange 偏移）
function applyGlobalCamera() {
    cameraMode = "全局相机";
    engine.camera.removeTrackedDaisyEntity();
    engine.camera.flyToTarget(C3.fromDegrees(116.405, 39.9, 3600), {
        offset: new Daisy.HeadingPitchRange(
            MathCesium.toRadians(0),    // 方位角 0°
            MathCesium.toRadians(-70),  // 俯仰角 -70°（俯视）
            5200,                        // 距离 5200m
        ),
        duration: 1.0,  // 飞行时长 1 秒
    });
    __log("已切换到全局相机：退出环绕跟踪，从上方观察移动目标区域。");
}

// ── 8. 环绕跟踪模式 ─────────────────────────────────────────────────────────
// followTarget: 跟踪目标实体
//   view: { distance, pitchDeg, headingDeg } - 初始视角
//   installInputListeners: true - 允许用户拖拽/滚轮交互
//   arcRotate: {
//     enableGroundCollisionSlide: true - 启用地形碰撞绕行
//     disableGroundCollisionSlideBelowTargetHeight: 80 - 低于 80m 时禁用
//   }
function applyArcTrackCamera() {
    cameraMode = "环绕跟踪";
    engine.camera.followTarget(target, {
        view: { distance: 260, pitchDeg: -24, headingDeg: 35 },
        installInputListeners: true,
        arcRotate: {
            enableGroundCollisionSlide,
            disableGroundCollisionSlideBelowTargetHeight: nearGroundAutoDisableHeight,
        },
    });
    engine.camera.setFrustumNear(0.1);  // 设置近裁剪面为 0.1m（近地观察需要）
    __log(`已切换到环绕跟踪相机：触地绕行${groundSlideEffective ? "启用" : "禁用"}。`);
}

// ── 9. 退出跟踪模式 ─────────────────────────────────────────────────────────
function exitTrackingMode() {
    cameraMode = "已退出跟踪";
    engine.camera.removeTrackedDaisyEntity();
    __log("已退出跟踪模式：相机控制权交还给全局相机。");
}

// ── 10. 触地绕行开关 ─────────────────────────────────────────────────────────
// 切换触地绕行状态，如果当前是环绕跟踪模式则重新应用相机设置
function toggleGroundSlide() {
    enableGroundCollisionSlide = !enableGroundCollisionSlide;
    if (cameraMode === "环绕跟踪") applyArcTrackCamera();
}

// ── 11. 目标高度控制 ─────────────────────────────────────────────────────────
// setLowTarget: 切换到近地目标（16m），低于 80m 阈值时自动禁用触地绕行
function setLowTarget() {
    targetAltitude = 16;
    target.position = targetPosition(targetLon);
    if (cameraMode === "环绕跟踪") applyArcTrackCamera();
    __log("目标高度切换为近地：低于阈值时自动禁用触地绕行。");
}

// setHighTarget: 切换到较高目标（180m），允许观察触地绕行策略
function setHighTarget() {
    targetAltitude = 180;
    target.position = targetPosition(targetLon);
    if (cameraMode === "环绕跟踪") applyArcTrackCamera();
    __log("目标高度切换为较高：允许观察触地绕行策略。");
}

// ── 12. 初始化与资源清理 ─────────────────────────────────────────────────────
// 启动时立即应用环绕跟踪相机，250ms 后再次应用（确保初始化完成）
applyArcTrackCamera();
setTimeout(applyArcTrackCamera, 250);

// registerCleanup: 注册清理函数，在组件销毁时自动调用
registerCleanup(() => {
    removePreRender();  // 移除渲染前回调
});

__log("ArcRotateCamera 示例已启动：低空移动目标来自粒子系统工作台同类写法。");
__log("拖拽画布可在跟踪模式下环绕目标，滚轮可改变环绕半径。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="ArcRotateCamera">
        <div class="title">ArcRotateCamera</div>
        <div class="meta">
            <span>{cameraMode}</span>
            <span>{routeSpeedMetersPerSecond} m/s</span>
        </div>
        <div class="status">
            <span>触地绕行：{groundSlideEffective ? "启用" : "禁用"}</span>
            <span>{targetAltitude} m</span>
        </div>
        <div class="actions">
            <button class:active={cameraMode === "全局相机"} onclick={applyGlobalCamera}>全局相机</button>
            <button class:active={cameraMode === "环绕跟踪"} onclick={applyArcTrackCamera}>环绕跟踪相机</button>
            <button class:active={cameraMode === "已退出跟踪"} onclick={exitTrackingMode}>退出跟踪模式</button>
            <button class:active={enableGroundCollisionSlide} onclick={toggleGroundSlide}>触地绕行开关</button>
            <button class:active={targetAltitude < nearGroundAutoDisableHeight} onclick={setLowTarget}>近地目标</button>
            <button class:active={targetAltitude >= nearGroundAutoDisableHeight} onclick={setHighTarget}>较高目标</button>
        </div>
    </DemoPanel>
<style>
.title { font-size: 13px; font-weight: 700; margin-bottom: 7px; }
.meta { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 9px; color: var(--ds-overlay-accent); font-size: 12px; }
.status {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 9px;
    color: var(--ds-overlay-text);
    font-size: 12px;
}
.actions { display: grid; gap: 6px; }
button {
    min-height: 30px;
    background: var(--ds-overlay-card-bg);
    border: 1px solid var(--ds-overlay-border);
    color: var(--ds-overlay-text);
    padding: 5px 9px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    text-align: left;
}
button:hover { background: rgba(80, 165, 255, 0.28); border-color: rgba(125, 190, 255, 0.55); }
button.active { background: rgba(75, 185, 255, 0.32); border-color: var(--color-accent); color: var(--ds-overlay-text-bright); }
</style>
