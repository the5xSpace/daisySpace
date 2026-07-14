<script>
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const SCENE_START = new Date("2026-03-20T12:00:00Z");
const startTime = Daisy.JulianDate.fromDate(SCENE_START);
const stopTime = Daisy.JulianDate.addSeconds(startTime, 3600, new Daisy.JulianDate());
const SAMPLE_PRESETS = [
    { label: "10s", value: 10 },
    { label: "30s", value: 30 },
    { label: "60s", value: 60 },
    { label: "120s", value: 120 },
];
const LIMIT_PRESETS = [500, 1000, 2000, 3000];

let sampleStep = $state(30);
let maxSampleCount = $state(1000);
let accumulatedMode = $state("samples");
let showRealtime = $state(true);
let isBusy = $state(false);
let stats = $state({
    requestedStep: 30,
    effectiveStep: 30,
    requestedSamples: 121,
    samples: 121,
    adjusted: false,
    maxSampleCount: 1000,
    visibleRealtime: 0,
    costMs: 0,
});

engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setGlobeOptions({ show: true, baseColor: Daisy.Color.BLACK });
engine.clearViewLayer?.();
engine.addViewLayer?.(
    new Daisy.EarthGridLayers({
        show: true,
        color: Daisy.Color.GOLD.withAlpha(0.1),
    }),
);
engine.setSceneTime(startTime, stopTime);
engine.setCurrentTime(startTime);
engine.setMultiplier(30);
engine.setLoop(true);
engine.play();

function nowMs() {
    return globalThis.performance?.now?.() ?? Date.now();
}

function makeSat(name, tle, pathColor) {
    const sat = new Daisy.PW.Satellite({
        name,
        model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 48 },
        trajectory: { stepSeconds: 30 },
        path: {
            show: true,
            color: pathColor.withAlpha(0.45),
            width: 2,
        },
        point: {
            size: 900,
            color: pathColor,
            outlineColor: Daisy.Color.BLACK.withAlpha(0.6),
            outlineWidth: 1.4,
        },
        label: {
            text: name,
            font: "13px sans-serif",
            offsetPx: new Daisy.Cartesian2(0, -18),
            showBackground: true,
            backgroundColor: Daisy.Color.BLACK.withAlpha(0.36),
        },
    });
    sat.setTle(tle);
    sat.bindEngine(engine);
    return sat;
}

const starlinkTle = [
    "STARLINK-1008",
    "1 44714U 19074B   26067.59669313  .00002636  00000+0  98623-4 0  9992",
    "2 44714  53.1570 183.8326 0001400 100.8583 259.2576 15.31028559348701",
].join("\n");

const scanSat = makeSat("Demo-Sat", starlinkTle, Daisy.Color.CYAN);

const scanPeriodSeconds = 18 * 60;
function beamAttitudeDeg(time) {
    const dt = Daisy.JulianDate.secondsDifference(time, startTime);
    const phase = (dt / scanPeriodSeconds) * Math.PI * 2;
    return {
        azimuthDeg: 90 + (dt / scanPeriodSeconds) * 360,
        elevationDeg: -18 + Math.sin(phase) * 6,
        rollDeg: 0,
    };
}

const scanSensor = scanSat.addSensor({
    name: "Coverage-Sensor",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 25, yDeg: 50 },
    beamLength: 1_000_000,
    color: Daisy.Color.CYAN.withAlpha(0.82),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.5),
    beamAttitudeDeg,
});

function updateStats(plan, costMs) {
    stats = {
        requestedStep: plan.requestedStepSeconds,
        effectiveStep: plan.effectiveStepSeconds,
        requestedSamples: plan.requestedSampleCount,
        samples: plan.estimatedSampleCount,
        adjusted: plan.adjusted,
        maxSampleCount: plan.maxSampleCount,
        visibleRealtime: scanSensor.getEstimatedRealtimeFootprintVisibleCount?.() ?? 0,
        costMs,
    };
}

function applyCoverage() {
    isBusy = true;
    const started = nowMs();
    scanSensor.clearFootprintSampleRenderer?.();
    scanSensor.clearFootprintUnionRenderer?.();

    const plan = scanSensor.getFootprintSamplingPlan(
        { start: startTime, end: stopTime },
        sampleStep,
        maxSampleCount,
    );

    if (showRealtime) {
        scanSensor.setBeamFootprint({
            show: true,
            fillColor: Daisy.Color.RED.withAlpha(0.45),
            outline: false,
            outlineColor: Daisy.Color.GREEN,
            outlineWidthPx: 1,
            footprintTimes: { start: startTime, end: stopTime },
            sampleStepSeconds: sampleStep,
            maxSampleCount,
            retainSeconds: 60 * 60,
        });
    } else {
        scanSensor.setBeamFootprint(false);
    }

    if (accumulatedMode === "union") {
        scanSensor.drawFootprint({
            begin: startTime,
            end: stopTime,
            union: true,
            debugName: "playground-coverage-union",
            sampleStepSeconds: sampleStep,
            maxSampleCount,
            fillColor: Daisy.Color.BLUE.withAlpha(0.08),
            outline: true,
            outlineColor: Daisy.Color.PINK,
            outlineWidthPx: 2,
        });
    } else if (accumulatedMode === "samples") {
        scanSensor.drawFootprint({
            begin: startTime,
            end: stopTime,
            union: false,
            debugName: "playground-coverage-samples",
            sampleStepSeconds: sampleStep,
            maxSampleCount,
            fillColor: Daisy.Color.GREENYELLOW.withAlpha(0.1),
            outline: true,
            outlineColor: Daisy.Color.YELLOW.withAlpha(1),
            outlineWidthPx: 10,
        });
    }

    updateStats(plan, nowMs() - started);
    __log?.(`覆盖采样: ${plan.requestedSampleCount} -> ${plan.estimatedSampleCount}, step ${plan.requestedStepSeconds}s -> ${plan.effectiveStepSeconds}s`);
    isBusy = false;
}

function setPresetStep(value) {
    sampleStep = value;
    applyCoverage();
}

function setLimit(value) {
    maxSampleCount = value;
    applyCoverage();
}

function switchMode(mode) {
    accumulatedMode = mode;
    applyCoverage();
}

function toggleRealtime() {
    showRealtime = !showRealtime;
    applyCoverage();
}

const statsTimer = globalThis.setInterval(() => {
    const plan = scanSensor.getFootprintSamplingPlan(
        { start: startTime, end: stopTime },
        sampleStep,
        maxSampleCount,
    );
    updateStats(plan, stats.costMs);
}, 1200);
registerCleanup?.(() => globalThis.clearInterval(statsTimer));

const initialViewTime = Daisy.JulianDate.addSeconds(startTime, 32 * 60, new Daisy.JulianDate());
engine.setCurrentTime(initialViewTime);
applyCoverage();
engine.camera.followTarget(scanSat, {
    view: {
        distance: 2_400_000,
        pitchDeg: -38,
        headingDeg: -18,
    },
});
__log?.("传感器覆盖 Demo 已加载: 单星动态扫描 + 真实覆盖采样 + 采样上限保护");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="覆盖分析">
    <div class="panel-head">
        <div>
            <div class="eyebrow">Sensor Coverage</div>
            <h2>波束覆盖工作台</h2>
        </div>
        <div class:warn={stats.adjusted} class="sample-pill">
            {stats.samples}/{stats.maxSampleCount}
        </div>
    </div>

    <div class="metric-grid">
        <div>
            <span>步长</span>
            <strong>{stats.effectiveStep}s</strong>
        </div>
        <div>
            <span>采样</span>
            <strong>{stats.samples}</strong>
        </div>
        <div>
            <span>保留</span>
            <strong>{stats.visibleRealtime}</strong>
        </div>
        <div>
            <span>耗时</span>
            <strong>{stats.costMs.toFixed(1)}ms</strong>
        </div>
    </div>

    {#if stats.adjusted}
        <div class="notice">已自动降低分辨率: {stats.requestedStep}s -> {stats.effectiveStep}s</div>
    {/if}

    <div class="control-group">
        <span class="control-label">采样间隔</span>
        <div class="segmented">
            {#each SAMPLE_PRESETS as item}
                <button class:active={sampleStep === item.value} onclick={() => setPresetStep(item.value)}>
                    {item.label}
                </button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">采样上限</span>
        <div class="segmented">
            {#each LIMIT_PRESETS as value}
                <button class:active={maxSampleCount === value} onclick={() => setLimit(value)}>
                    {value}
                </button>
            {/each}
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">累计绘制</span>
        <div class="segmented">
            <button class:active={accumulatedMode === "samples"} onclick={() => switchMode("samples")}>样本</button>
            <button class:active={accumulatedMode === "union"} onclick={() => switchMode("union")}>合并</button>
            <button class:active={accumulatedMode === "none"} onclick={() => switchMode("none")}>关闭</button>
        </div>
    </div>

    <div class="toggle-row">
        <button class:active={showRealtime} onclick={toggleRealtime}>实时 Footprint</button>
        <button class:active={accumulatedMode !== "none"} onclick={() => switchMode(accumulatedMode === "none" ? "samples" : "none")}>累计覆盖</button>
    </div>

    <button class="primary" onclick={applyCoverage} disabled={isBusy}>重新绘制</button>
</DemoPanel>

<style>
    .panel-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
    }
    .eyebrow {
        color: var(--ds-overlay-accent);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }
    h2 {
        margin: 2px 0 0;
        font-size: 16px;
        line-height: 1.2;
    }
    .sample-pill {
        min-width: 74px;
        padding: 5px 8px;
        border-radius: 999px;
        background: rgba(62, 207, 142, 0.11);
        color: #3ecf8e;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
    .sample-pill.warn {
        background: var(--ds-overlay-accent-warm-muted);
        color: var(--ds-overlay-accent-warm);
    }
    .metric-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 10px;
    }
    .metric-grid div {
        padding: 7px 6px;
        border-radius: 7px;
        background: var(--ds-overlay-card-bg);
    }
    .metric-grid span {
        display: block;
        color: var(--ds-overlay-text-muted);
        font-size: 10px;
        line-height: 1.1;
    }
    .metric-grid strong {
        display: block;
        margin-top: 4px;
        color: var(--ds-overlay-text-bright);
        font-size: 12px;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
    }
    .notice {
        margin-bottom: 10px;
        padding: 7px 9px;
        border: 1px solid var(--ds-overlay-accent-warm-border);
        border-radius: 7px;
        background: var(--ds-overlay-accent-warm-soft);
        color: var(--ds-overlay-accent-warm);
        font-size: 11px;
    }
    .control-group {
        margin-top: 10px;
    }
    .control-label {
        display: block;
        margin-bottom: 6px;
        color: var(--panel-text-muted);
        font-size: 11px;
        font-weight: 700;
    }
    .segmented {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 4px;
        padding: 3px;
        border-radius: 8px;
        background: var(--panel-bg-card);
    }
    button {
        height: 28px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--panel-text-muted);
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.16s ease, color 0.16s ease, transform 0.16s ease;
    }
    button:hover {
        color: var(--panel-text-bright);
        background: var(--panel-btn-bg);
    }
    button.active {
        color: var(--ds-overlay-accent);
        background: rgba(77, 168, 255, 0.14);
        box-shadow: inset 0 0 0 1px rgba(77, 168, 255, 0.18);
    }
    .toggle-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-top: 12px;
    }
    .toggle-row button {
        border: 1px solid var(--panel-border);
        background: var(--panel-bg-card);
    }
    .primary {
        width: 100%;
        margin-top: 10px;
        border: 1px solid var(--panel-border);
        background: linear-gradient(135deg, rgba(77, 168, 255, 0.18), rgba(62, 207, 142, 0.10));
        color: var(--ds-overlay-btn-primary-text);
    }
    .primary:disabled {
        opacity: 0.55;
        cursor: wait;
    }
</style>
