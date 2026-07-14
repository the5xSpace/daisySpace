<script>
// =============================================================================
// ArrowPointer Demo — 天体目标指向演示
//
// 本示例演示如何使用 ArrowPointerFeature 创建指向天体（太阳、月球、火星等）
// 和地面目标（北京、新加坡）的指向箭头。
//
// 关键 API：
// - Daisy.ArrowPointerFeature: 指向箭头组件
//   - target: 指向目标（"sun"/"moon"/"mars"/"earthCenter"/实体/坐标）
//   - lengthPx: 箭头长度（像素）
//   - width: 箭头宽度
//   - color: 箭头颜色
//   - label: 标签配置
// - Daisy.CelestialMarkerWidget: 天体标记组件
// - engine.camera.followTarget: 相机跟随目标
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和场景设置 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;

// ── 2. 创建移动卫星实体 ──────────────────────────────────────────────
// 使用 TrajectorySample 创建卫星轨迹
const startTime = engine.getStartTime();
const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED);
const orbitPeriod = 7200; // 轨道周期：7200秒（2小时）
const stopTime = Daisy.JulianDate.addSeconds(startTime, orbitPeriod, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime, true);
engine.play(60);

// 生成轨迹采样点
const stepSec = 20;
const totalSteps = Math.ceil(orbitPeriod / stepSec);
const samples = [];
for (let i = 0; i <= totalSteps; i++) {
    const t = Daisy.JulianDate.addSeconds(startTime, i * stepSec, new Daisy.JulianDate());
    const angle = ((i * stepSec) / orbitPeriod) * 2 * Math.PI;
    const lon = (116 + (angle * 180 / Math.PI) * 0.5) % 360;
    const lat = 20 * Math.sin(angle);
    samples.push({ time: t, position: C3.fromDegrees(lon, lat, 10000000) });
}
trajectory.pushData(samples);

// 创建卫星实体并设置轨迹
const satEntity = engine.createEntity("ArrowDemo");
satEntity.position = trajectory;

// 添加点标记和标签
satEntity.addFeature(new Daisy.PointFeature({ pixelSize: 12, color: Daisy.Color.CORNFLOWERBLUE, outlineColor: Daisy.Color.WHITE, outlineWidth: 2 }));
satEntity.addFeature(new Daisy.UI.LabelFeature({ text: "Sat", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.5), fillColor: Daisy.Color.WHITE }));

// ── 3. 响应式状态：指向开关 ──────────────────────────────────────────────
let sunEnabled = $state(true);
let moonEnabled = $state(true);
let marsEnabled = $state(true);
let earthEnabled = $state(true);
let beijingEnabled = $state(true);
let singaporeEnabled = $state(true);
let lensFlareEnabled = $state(true);

// ── 4. 创建指向天体的箭头 ──────────────────────────────────────────────
// target: "sun"/"moon"/"mars"/"earthCenter" 为内置天体目标
const arrowSun = new Daisy.ArrowPointerFeature({ target: "sun", lengthPx: 300, width: 3, color: Daisy.Color.YELLOW, label: { text: "指向太阳", font: "14px sans-serif" } });
const arrowMoon = new Daisy.ArrowPointerFeature({ target: "moon", lengthPx: 300, width: 3, color: Daisy.Color.LIGHTGRAY, label: { text: "指向月球", font: "14px sans-serif" } });
const arrowMars = new Daisy.ArrowPointerFeature({ target: "mars", lengthPx: 300, width: 3, color: Daisy.Color.fromCssColorString("#ff6f61"), label: { text: "指向火星", font: "14px sans-serif" } });
const arrowEarth = new Daisy.ArrowPointerFeature({ target: "earthCenter", lengthPx: 160, width: 3, color: Daisy.Color.CYAN, label: { text: "指向地球中心", font: "14px sans-serif" } });

// ── 5. 创建地面目标实体 ──────────────────────────────────────────────
// 北京实体
const beijingEntity = engine.createEntity("Beijing");
beijingEntity.position = C3.fromDegrees(116.4, 39.9, 500);
beijingEntity.addFeature(new Daisy.PointFeature({ pixelSize: 16, color: Daisy.Color.RED, outlineColor: Daisy.Color.WHITE, outlineWidth: 2 }));
beijingEntity.addFeature(new Daisy.UI.LabelFeature({ text: "北京市", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -22), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.6), fillColor: Daisy.Color.WHITE }));

// 创建指向地面目标的箭头
// target: 可以是实体或坐标
const arrowBeijing = new Daisy.ArrowPointerFeature({ target: beijingEntity, lengthPx: 300, width: 3, color: Daisy.Color.ORANGE, label: { text: "指向北京", font: "14px sans-serif" } });
const arrowSingapore = new Daisy.ArrowPointerFeature({ target: C3.fromDegrees(103.8, 1.3, 0), lengthPx: 300, width: 3, color: Daisy.Color.CYAN, label: { text: "指向新加坡", font: "14px sans-serif" } });

// 将所有箭头添加到卫星实体
satEntity.addFeature(arrowSun);
satEntity.addFeature(arrowMoon);
satEntity.addFeature(arrowMars);
satEntity.addFeature(arrowEarth);
satEntity.addFeature(arrowBeijing);
satEntity.addFeature(arrowSingapore);

// ── 6. 同步显示状态 ──────────────────────────────────────────────
// 通过修改 options.show 控制箭头显隐
function syncShow() {
    arrowSun.options = { ...arrowSun.options, show: sunEnabled };
    arrowMoon.options = { ...arrowMoon.options, show: moonEnabled };
    arrowMars.options = { ...arrowMars.options, show: marsEnabled };
    arrowEarth.options = { ...arrowEarth.options, show: earthEnabled };
    arrowBeijing.options = { ...arrowBeijing.options, show: beijingEnabled };
    arrowSingapore.options = { ...arrowSingapore.options, show: singaporeEnabled };
}

// toggleLensFlare: 切换镜头光晕效果
function toggleLensFlare() {
    engine.setLensFlareVisible(lensFlareEnabled);
}

// ── 7. 添加天体标记组件 ──────────────────────────────────────────────
// CelestialMarkerWidget: 显示太阳、月球、火星的标记
const markerWidget = engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,
    moon: true,
    mars: true,
}));

// ── 8. 相机跟随和日志输出 ──────────────────────────────────────────────
engine.camera.followTarget(satEntity, { view: { distance: 1200000, pitchDeg: -35, headingDeg: 0 } });
__log("ArrowPointer: Sun/Moon/Mars/Earth + Beijing + Singapore 指向已创建");

// ── 9. 资源清理 ──────────────────────────────────────────────
registerCleanup(() => {
    engine.removeWidget(markerWidget, true);
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="天体目标指向">
    <h2>天体目标指向</h2>
    <p class="desc">开关各指向箭头，拉远视角可看到天体标记。</p>
    <div class="controls">
        <label class="toggle"><input type="checkbox" bind:checked={sunEnabled} onchange={syncShow} /><span class="dot" style="background:#ffd166"></span>太阳</label>
        <label class="toggle"><input type="checkbox" bind:checked={moonEnabled} onchange={syncShow} /><span class="dot" style="background:#cccccc"></span>月球</label>
        <label class="toggle"><input type="checkbox" bind:checked={marsEnabled} onchange={syncShow} /><span class="dot" style="background:#ff6f61"></span>火星</label>
        <label class="toggle"><input type="checkbox" bind:checked={earthEnabled} onchange={syncShow} /><span class="dot" style="background:#00bcd4"></span>地球中心</label>
        <label class="toggle"><input type="checkbox" bind:checked={beijingEnabled} onchange={syncShow} /><span class="dot" style="background:#ff9800"></span>北京</label>
        <label class="toggle"><input type="checkbox" bind:checked={singaporeEnabled} onchange={syncShow} /><span class="dot" style="background:#00bcd4"></span>新加坡</label>
        <label class="toggle"><input type="checkbox" bind:checked={lensFlareEnabled} onchange={toggleLensFlare} /><span class="dot" style="background:#fff"></span>光晕</label>
    </div>
</DemoPanel>

<style>
h2 { margin: 0 0 8px; font-size: 16px; }
    .desc { margin: 0 0 12px; color: #aaa; font-size: 12px; }
    .controls { display: flex; flex-direction: column; gap: 8px; }
    .toggle { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    .toggle input { cursor: pointer; }
    .dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
</style>
