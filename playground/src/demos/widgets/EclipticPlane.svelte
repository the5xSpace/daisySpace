<script>
// =============================================================================
// 黄道面组件
// -----------------------------------------------------------------------------
// 展示黄道平面和天体标记，用于观察太阳系天体的位置关系。
// 关键 API:
//   - Daisy.Plane.EclipticPlaneLayers : 添加黄道面可视化
//   - Daisy.CelestialMarkerWidget     : 天体标记组件
//   - engine.setLensFlareVisible()    : 控制光晕效果
// =============================================================================

// ── 1. 组件属性 ────────────────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 2. 添加黄道面 ──────────────────────────────────────────────────────────
// 黄道面是地球绕太阳公转的平面，用于可视化行星轨道
engine.addWidget(new Daisy.Plane.EclipticPlaneLayers());

// ── 3. 添加天体标记 ────────────────────────────────────────────────────────
// 在黄道面上显示太阳、月球、火星和地球的位置标记
// API: new Daisy.CelestialMarkerWidget({ sun, moon, mars, earth })
const markerWidget = engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,    // 显示太阳标记
    moon: true,   // 显示月球标记
    mars: true,   // 显示火星标记
    earth: true,  // 显示地球标记
}));

// ── 4. 光晕控制状态 ──────────────────────────────────────────────────────────
let lensFlareEnabled = $state(true);

// 切换太阳光晕效果
function toggleLensFlare() {
    engine.setLensFlareVisible(lensFlareEnabled);  // 控制镜头光晕可见性
}

__log("EclipticPlaneLayers + 天体标记已创建，拉远视角查看效果");

// ── 5. 资源清理 ──────────────────────────────────────────────────────────────
registerCleanup(() => {
    engine.removeWidget(markerWidget, true);  // 移除天体标记组件
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="黄道面">
    <h2>黄道面</h2>
    <p class="desc">拉远视角可看到天体标记。</p>
    <div class="controls">
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
