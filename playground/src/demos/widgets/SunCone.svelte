<script>
// =============================================================================
// 日锥
// -----------------------------------------------------------------------------
// SunConeLayer 是 3D 空间控件，2D 下不展示锥体。
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const startTime = Daisy.JulianDate.fromIso8601("2026-01-15T03:00:00Z");
const stopTime = Daisy.JulianDate.addHours(startTime, 24, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(startTime);
engine.pause();

const sunCone = engine.addWidget(new Daisy.SunConeLayer({
    umbraColor: Daisy.Color.BLUE.withAlpha(0.34),
    penumbraColor: Daisy.Color.ORANGE.withAlpha(0.16),
    visualLengthScale: 0.05,
}));

let coneVisible = $state(true);
let probeState = $state("-");
let focusTimer;

function updateProbeState() {
    const probe = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000);
    probeState = Daisy.getSunOcclusionState(probe, engine.getCurrentTime());
}

function toggleSunCone() {
    sunCone.show = coneVisible;
}

function viewSunCone() {
    clearTimeout(focusTimer);
    focusTimer = setTimeout(() => {
        const sphere = sunCone.getBoundingSphere();
        if (sphere) engine.camera.flyToBoundingSphere(sphere, { duration: 0.8 });
    }, 900);
}

registerCleanup(() => {
    clearTimeout(focusTimer);
    engine.removeWidget(sunCone, true);
});

updateProbeState();
viewSunCone();
__log("日锥已创建；这是 3D 空间控件");

import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="日锥" width="min(230px, calc(100% - 24px))" padding="12px">
    <label class="toggle-row">
        <input type="checkbox" bind:checked={coneVisible} onchange={toggleSunCone} />
        <span class="swatch"></span>
        日锥
    </label>

    <button class="view-button" onclick={viewSunCone}>定位日锥</button>

    <div class="status-row">
        <span>北京上空</span>
        <strong>{probeState}</strong>
    </div>
</DemoPanel>

<style>
.view-button {
    min-height: 28px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: var(--panel-text-muted);
    background: transparent;
    cursor: pointer;
    font-size: 12px;
}
.toggle-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    color: var(--panel-text);
    font-size: 12px;
    cursor: pointer;
}
.toggle-row input { margin: 0; }
.swatch {
    width: 12px;
    height: 12px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 3px;
    background: #f28a2c;
}
.view-button {
    width: 100%;
    margin-top: 12px;
    color: var(--panel-btn-primary-text);
    border-color: var(--panel-btn-primary-border);
    background: var(--panel-btn-primary-bg);
}
.view-button:hover { filter: brightness(1.15); }
.status-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding-top: 9px;
    border-top: 1px solid var(--panel-border);
    color: var(--panel-text-muted);
    font-size: 11px;
}
.status-row strong {
    color: var(--panel-text-bright);
    font-size: 11px;
    text-transform: uppercase;
}
</style>
