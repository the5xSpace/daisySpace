<script>
// =============================================================================
// Sky.svelte - 天空切换 Demo
// -----------------------------------------------------------------------------
// 本文件演示不同天空效果的切换：
//   - Default: 默认大气效果
//   - Cesium: Cesium 天空盒
//   - SkyBox: 自定义天空盒（渐变）
//   - None: 关闭天空（纯黑背景）
//
// 关键 API：
//   - engine.geoLayer.setSky(config)
//     · config.type: Daisy.GeoSkyType.Default | Cesium | SkyBox | None
//     · config.sources: { positiveX, negativeX, positiveY, negativeY, positiveZ, negativeZ }
//       （仅 SkyBox 类型需要）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化时间与场景 ─────────────────────────────────────────────────────────
// 设置时间范围，10 倍速播放
const now = Daisy.JulianDate.now();
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(10);
engine.play();

// ── 2. 设置默认天空 ─────────────────────────────────────────────────────────
// setSky: 设置天空效果
// Daisy.GeoSkyType.Default: 默认大气效果
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });

// ── 3. 相机定位 ─────────────────────────────────────────────────────────
// flyToTarget: 飞行到指定位置
//   destination: 目标位置（笛卡尔坐标）
//   orientation: { heading, pitch, roll } 朝向
engine.camera.flyTo({
    destination: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 2000000_0),  // 北京上空 2000km
    duration: 2,
});

// ── 4. 创建调试坐标轴 ─────────────────────────────────────────────────────────
// 在原点创建一个巨大的坐标轴，用于观察天空盒效果
const axisEntity = engine.createEntity("SkyboxDebugAxes");
axisEntity.position = Daisy.Cartesian3.ZERO;
axisEntity.setBodyAxis({ length: 15_000_000, axisWidth: 3, showLabels: true, showSphere: false });  // 15000km

// ── 5. 天空切换函数 ─────────────────────────────────────────────────────────
// setDefault: 默认大气效果
function setDefault() { engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default }); __log("已切换为默认天空"); }

// setCesium: Cesium 天空盒
function setCesium() { engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Cesium }); __log("已切换为 Cesium 天空盒"); }

// setGradient: 自定义渐变天空盒
// sources: 6 张图片，分别对应立方体的 6 个面
function setGradient() {
    engine.geoLayer.setSky({
        type: Daisy.GeoSkyType.SkyBox,
        sources: {
            positiveX: "/sandAssets/SkyBox/gradient/px.jpg", negativeX: "/sandAssets/SkyBox/gradient/nx.jpg",
            positiveY: "/sandAssets/SkyBox/gradient/py.jpg", negativeY: "/sandAssets/SkyBox/gradient/ny.jpg",
            positiveZ: "/sandAssets/SkyBox/gradient/pz.jpg", negativeZ: "/sandAssets/SkyBox/gradient/nz.jpg",
        },
    });
    __log("已切换为渐变天空盒");
}
setGradient();  // 默认使用渐变天空盒
// setNone: 关闭天空（纯黑背景）
function setNone() { engine.geoLayer.setSky({ type: Daisy.GeoSkyType.None }); __log("天空已关闭"); }
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="天空切换" padding="12px" width="210px">
    <div class="panel-head-simple">
        <span class="panel-icon">☀️</span>
        <span class="panel-title-text">天空切换</span>
    </div>
    <div class="btn-stack">
        <button onclick={setDefault}>默认</button>
        <button onclick={setCesium}>Cesium 天空盒</button>
        <button onclick={setGradient}>渐变天空盒</button>
        <button onclick={setNone}>关闭天空</button>
    </div>
</DemoPanel>
<style>
.panel-head-simple {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 10px; padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.panel-icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px;
    background: var(--color-accent-muted);
    font-size: 12px;
}
.panel-title-text {
    font-size: 13px; font-weight: 700;
    color: var(--panel-text-bright);
}
.btn-stack {
    display: flex; flex-direction: column; gap: 6px;
}
button {
    width: 100%; min-height: 30px;
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
</style>
