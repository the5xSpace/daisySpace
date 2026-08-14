<script>
// =============================================================================
// LensFlare Demo — 镜头光晕效果
//
// 本示例演示如何配置引擎的镜头光晕效果：
// 1. 控制光晕显示/隐藏
// 2. 调整光晕强度
// 3. 配置拉伸效果
// 4. 设置色散参数
// 5. 调整光环宽度
// 6. 控制镜头尘点
//
// 关键 API：
// - engine.setLensFlare(options): 设置镜头光晕参数
//   - show: 是否显示光晕
//   - intensity: 光晕强度（0-6）
//   - distortion: 拉伸效果（0-30）
//   - dispersion: 色散参数（0-2）
//   - haloWidth: 光环宽度（0-1.5）
//   - dirtAmount: 镜头尘点（0-1.5）
// =============================================================================

import { onMount } from "svelte";

let { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

// ── 1. 光晕参数状态 ──────────────────────────────────────────────────
// 使用 $state() 创建响应式状态
// 当这些值改变时，会自动触发 $effect 更新引擎配置
let show = $state(true);
let intensity = $state(2.0);
let distortion = $state(10.0);
let dispersion = $state(0.4);
let haloWidth = $state(0.4);
let dirtAmount = $state(0.4);

// resetLensFlare: 重置光晕参数为默认值
function resetLensFlare() {
    show = true;
    intensity = 2.0;
    distortion = 10.0;
    dispersion = 0.4;
    haloWidth = 0.4;
    dirtAmount = 0.4;
}

// ── 2. 响应式更新 ──────────────────────────────────────────────────────
// $effect: 当依赖的状态改变时自动执行
// 这里用于实时更新引擎的光晕配置
$effect(() => {
    engine.setLensFlare({
        show,
        intensity,
        distortion,
        dispersion,
        haloWidth,
        dirtAmount,
    });
});

// ── 3. 初始化场景 ──────────────────────────────────────────────────────
// onMount: Svelte 组件挂载后执行
// 这里用于初始化相机位置和场景设置
onMount(() => {
    const C3 = Daisy.Cartesian3;

    // 清除现有图层并设置基础图层
    engine.geoLayer.clearImagery();
    engine.geoLayer.setBaseImagery({
        type: Daisy.GeoImageryType.XYZ,
        url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
        minLevel: 0,
        maxLevel: 2,
        tilingScheme: "geographic",
    });

    // 启用光照和天体显示
    engine.geoLayer.setGlobeOptions({ enableLighting: true });
    engine.geoLayer.setCelestialVisibility({ sun: true, moon: true, skyBox: true });

    // 设置场景时间
    const sceneTime = new Daisy.JulianDate(2458047, 27399.860215000022);
    engine.setSceneTime(sceneTime, Daisy.JulianDate.addSeconds(sceneTime, 3600, new Daisy.JulianDate()), true);
    engine.setCurrentTime(sceneTime);
    engine.setMultiplier(1);
    engine.play();

    // 设置相机位置和方向
    const dir = new C3(-0.5549701431494752, -0.7801872010801355, -0.2886452346452218);
    const up = new C3(-0.3016252360948521, -0.13464820558887716, 0.9438707950150912);
    engine.camera.setPosition(new C3(40010447.97500168, 56238683.46406788, 20776576.752223067));
    engine.camera.setDirection(dir);
    engine.camera.setUp(up);
    engine.triggerUpdateOnce();

    __log("LensFlare: Engine 默认创建光晕效果，示例仅调整简单参数");
    __log("可用 API: engine.setLensFlare({ show, intensity, distortion, dispersion, haloWidth, dirtAmount })");

    // registerCleanup: 注册清理回调
    // 当 demo 销毁时自动执行，重置光晕参数为默认值
    registerCleanup(() => {
        engine.setLensFlare({
            show: true,
            intensity: 2.0,
            distortion: 10.0,
            dispersion: 0.4,
            haloWidth: 0.4,
            dirtAmount: 0.4,
        });
    });
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="镜头光晕">
    <div class="eyebrow">ENGINE LENS FLARE</div>
    <h2>镜头光晕</h2>
    <p>默认自动启用，只需要隐藏显示或调几个直观参数。</p>

    <label class="toggle">
        <input type="checkbox" bind:checked={show} />
        <span>显示光晕</span>
    </label>

    <div class="control">
        <span>强度</span>
        <input type="range" min="0" max="6" step="0.1" bind:value={intensity} />
        <b>{intensity.toFixed(1)}</b>
    </div>
    <div class="control">
        <span>拉伸</span>
        <input type="range" min="0" max="30" step="0.5" bind:value={distortion} />
        <b>{distortion.toFixed(1)}</b>
    </div>
    <div class="control">
        <span>色散</span>
        <input type="range" min="0" max="2" step="0.05" bind:value={dispersion} />
        <b>{dispersion.toFixed(2)}</b>
    </div>
    <div class="control">
        <span>光环宽度</span>
        <input type="range" min="0" max="1.5" step="0.05" bind:value={haloWidth} />
        <b>{haloWidth.toFixed(2)}</b>
    </div>
    <div class="control">
        <span>镜头尘点</span>
        <input type="range" min="0" max="1.5" step="0.05" bind:value={dirtAmount} />
        <b>{dirtAmount.toFixed(2)}</b>
    </div>

    <button type="button" onclick={resetLensFlare}>恢复默认</button>
</DemoPanel>

<style>
.eyebrow {
    letter-spacing: 0.16em;
    font-size: 11px;
    color: var(--panel-accent);
    opacity: 0.86;
}

h2 {
    margin: 6px 0 4px;
    font-size: 22px;
    color: var(--panel-text-bright);
}

p {
    margin: 0 0 16px;
    color: var(--panel-text-muted);
    font-size: 13px;
}

.toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(77, 183, 235, 0.12);
    border: 1px solid rgba(116, 218, 255, 0.22);
}

.control {
    display: grid;
    grid-template-columns: 72px 1fr 48px;
    align-items: center;
    gap: 12px;
    margin: 12px 0;
    font-size: 13px;
}

.control input {
    accent-color: var(--panel-accent);
}

.control b {
    text-align: right;
    color: var(--panel-accent);
}

button {
    width: 100%;
    margin-top: 12px;
    padding: 10px 12px;
    color: var(--panel-text);
    background: linear-gradient(135deg, var(--color-accent), var(--color-accent-soft));
    border: 1px solid rgba(126, 231, 255, 0.38);
    border-radius: 12px;
    cursor: pointer;
}
</style>
