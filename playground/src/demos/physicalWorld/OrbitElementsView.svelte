<script>
// =============================================================================
// OrbitElementsView Demo — 轨道根数几何可视化
//
// 本示例演示如何可视化卫星的轨道根数：
// 1. 创建卫星对象
// 2. 配置轨道根数可视化组件
// 3. 显示赤道圈、交点线、拱线、径向矢量、角度弧线
// 4. 实时显示轨道参数
//
// 关键 API：
// - Daisy.PW.NearEarthOrbiter: 近地轨道卫星对象
// - orbitElementsView: 轨道根数可视化配置
// - getOrbitStateAtTime(): 获取指定时间的轨道状态
// - getOrbitMetadata(): 获取轨道元数据
// - onTick(): 添加帧更新监听
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 设置场景时间 ──────────────────────────────────────────────────
// 场景时间：当前时间，前后各 1/3 小时
const now = Daisy.JulianDate.now();
const start = Daisy.JulianDate.addSeconds(now, -1800, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addSeconds(now, 3 * 3600, new Daisy.JulianDate());
engine.setSceneTime(start, stop, true);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

// ── 2. 创建卫星对象 ──────────────────────────────────────────────────
// Daisy.PW.NearEarthOrbiter: 近地轨道卫星对象
// - name: 卫星名称
// - orbitDefinition: 轨道定义（TLE 格式）
// - enableSpg4Propagation: 是否启用 SGP4 实时轨道传播
// - point: 点标记配置
// - orbitElementsView: 轨道根数可视化配置
//   - show: 是否显示
//   - width: 线条宽度
//   - sampleStepSeconds: 采样步长（秒）
//   - resampleSeconds: 重采样间隔（秒）
//   - minEccentricityForApsides: 显示拱线的最小偏心率
//   - material: 轨道材质
//   - showEquatorCircle: 是否显示赤道圈
//   - showEquatorOutline: 是否显示赤道轮廓
//   - showNodeLine: 是否显示交点线
//   - showApsidesLine: 是否显示拱线
//   - showRadiusVector: 是否显示径向矢量
//   - showReferenceAxes: 是否显示参考轴
//   - showAngleArcs: 是否显示角度弧线
//   - alwaysOnTop: 是否始终在最上层
//   - equatorMaterial: 赤道材质
//   - equatorDiskMaterial: 赤道圆盘材质
//   - nodeLineMaterial: 交点线材质
//   - apsidesLineMaterial: 拱线材质
//   - radiusVectorMaterial: 径向矢量材质
//   - referenceAxisMaterial: 参考轴材质
//   - angleArcMaterial: 角度弧线材质
//   - earthTransparencyAlpha: 地球透明度
// - label: 标签配置
const sat = new Daisy.PW.NearEarthOrbiter({
    name: "ISS (Orbit Elements Demo)",
    orbitDefinition: `ISS (ZARYA)
1 25544U 98067A   24055.51902778  .00016839  00000-0  30650-3 0  9999
2 25544  51.6411  12.2347 0004715  52.3029  57.9229 15.50039934440941`,
    enableSpg4Propagation: true,
    point: { size: 1000, color: Daisy.Color.WHITE, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    orbitElementsView: {
        show: true, width: 3, sampleStepSeconds: 30, resampleSeconds: 30,
        minEccentricityForApsides: 0.01, material: Daisy.Color.ORANGE.withAlpha(0.95),
        showEquatorCircle: true, showEquatorOutline: true,
        showNodeLine: true, showApsidesLine: true, showRadiusVector: true,
        showReferenceAxes: true, showAngleArcs: true, alwaysOnTop: true,
        equatorMaterial: Daisy.Color.GRAY.withAlpha(0.65),
        equatorDiskMaterial: Daisy.Color.GRAY.withAlpha(0.06),
        nodeLineMaterial: Daisy.Color.DODGERBLUE.withAlpha(0.9),
        apsidesLineMaterial: Daisy.Color.GOLD.withAlpha(0.9),
        radiusVectorMaterial: Daisy.Color.LIME.withAlpha(0.9),
        referenceAxisMaterial: Daisy.Color.GRAY.withAlpha(0.45),
        angleArcMaterial: Daisy.Color.WHITE.withAlpha(0.75),
        earthTransparencyAlpha: 0.45,
    },
    label: { text: "ISS (Orbit Elements)", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -16), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.4) },
});

// bindEngine: 绑定引擎，使卫星生效
sat.bindEngine(engine);

// ── 3. 相机飞行到最佳观察距离 ──────────────────────────────────────
// getComponents: 获取组件列表
// getOptimalViewDistanceMeters: 获取最佳观察距离（米）
const orbitViewComp = sat.getComponents("OrbitElementsViewComponent")[0];
const optDistance = orbitViewComp?.getOptimalViewDistanceMeters?.() ?? 12000000;
engine.camera.flyToTarget(sat.entity, {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-40), optDistance),
});

// 实时轨道参数面板
// ── 4. 实时轨道参数面板 ──────────────────────────────────────────────
// infoLines: 轨道参数信息行
// title: 面板标题
// fmt: 格式化数字函数
// staticMeta: 静态轨道元数据
let infoLines = $state([]);
let title = $state("ISS Orbit Elements Demo");
const fmt = (v, digits = 3) => Number.isFinite(v) ? v.toFixed(digits) : "-";
const staticMeta = sat.getOrbitMetadata();

// tickListener: 帧更新监听器
// 每帧更新轨道参数信息
// getOrbitStateAtTime(): 获取指定时间的轨道状态
// - positionECEF: ECEF 坐标系位置
// - orientationDeg: 姿态角（度）
// - osculatingElements: 瞬时轨道根数
// - speedKmPerSec: 速度（千米/秒）
// - date: 日期
const tickListener = () => {
    const t = engine.getCurrentTime();
    const state = sat.getOrbitStateAtTime(t);
    if (!state) return;
    const c = Daisy.Cartographic.fromCartesian(state.positionECEF);
    const o = state.orientationDeg;
    const e = state.osculatingElements;
    title = `ISS Orbit Elements Demo — ${state.date.toISOString()}`;
    infoLines = [
        `Format: ${staticMeta.format} | NORAD: ${staticMeta.noradCatalogNumber ?? "-"}`,
        `Lat/Lon/Alt(km): ${fmt(Daisy.Math.toDegrees(c.latitude), 4)} / ${fmt(Daisy.Math.toDegrees(c.longitude), 4)} / ${fmt(c.height / 1000, 3)}`,
        `Speed(km/s): ${fmt(state.speedKmPerSec, 4)}`,
        `Heading/Pitch/Roll: ${fmt(o?.headingDeg, 2)} / ${fmt(o?.pitchDeg, 2)} / ${fmt(o?.rollDeg, 2)}`,
        `a(km): ${fmt(e?.semiMajorAxisKm, 3)}  e: ${fmt(e?.eccentricity, 6)}`,
        `i(deg): ${fmt(e?.inclinationDeg, 4)}  RAAN: ${fmt(e?.raanDeg, 4)}`,
        `ArgPerigee: ${fmt(e?.argPerigeeDeg, 4)}  TrueAnomaly: ${fmt(e?.trueAnomalyDeg, 4)}`,
        `Period(s): ${fmt(e?.orbitalPeriodSeconds, 2)}`,
    ];
};

// onTick: 添加帧更新监听
// 返回移除监听的函数
const _removeTick = engine.onTick(tickListener);
tickListener();

// registerCleanup: 注册清理回调
// 当 demo 销毁时自动执行，移除帧更新监听
registerCleanup(() => _removeTick());
__log("轨道根数几何可视化：赤道圈、交点线、拱线、径向矢量、角度弧线");
__log("地球已半透明（alpha=0.35），右上角面板实时显示轨道参数");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title={title}>
        <h4>{title}</h4>
        {#each infoLines as line}
            <div class="line">{line}</div>
        {/each}
    </DemoPanel>
<style>
h4 { margin: 0 0 6px; font-size: 13px; font-weight: 600; }
.line { margin: 2px 0; }
</style>
