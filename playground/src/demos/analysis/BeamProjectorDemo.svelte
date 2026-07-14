<script>
// =============================================================================
// BeamProjector Demo — 波束投影计算
//
// 展示 BeamProjector 的 CPU 后端波束投影计算能力：
// 从卫星矩阵 + 传感器参数生成地面 footprint。
//
// 关键 API：
// - Daisy.Analysis.BeamProjector() — 波束投影计算器
// - bp.projectFootprint({ entityId, entityMatrix, beamAttitude, sensorType,
//     apertureDeg, beamLength, emitDirection, slices, celestialEllipsoid, time })
//   - 返回 { cartographic: [{ longitude, latitude, height }], metadata }
// - sensor.drawFootprint({ begin, end, fillColor, outlineColor }) — 绘制覆盖
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const SCENE_START = new Date("2026-03-20T12:00:00Z");
const startTime = Daisy.JulianDate.fromDate(SCENE_START);
const stopTime = Daisy.JulianDate.addSeconds(startTime, 3600, new Daisy.JulianDate());

engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setGlobeOptions({ show: true, baseColor: Daisy.Color.BLACK });
engine.clearViewLayer?.();
engine.setSceneTime(startTime, stopTime);
engine.setCurrentTime(startTime);
engine.setMultiplier(30);
engine.setLoop(true);
engine.play();

const beamLength = 800_000;
const apertureDeg = { xDeg: 30, yDeg: 60 };
let showFootprint = $state(true);
let stats = $state({ hitCount: 0, sampleCount: 0, costMs: 0, dropReason: "" });

const starlinkTle = [
    "STARLINK-1008",
    "1 44714U 19074B   26067.59669313  .00002636  00000+0  98623-4 0  9992",
    "2 44714  53.1570 183.8326 0001400 100.8583 259.2576 15.31028559348701",
].join("\n");

const sat = new Daisy.PW.Satellite({
    name: "BeamProj-Sat",
    model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 48 },
    trajectory: { stepSeconds: 30 },
    path: { show: true, color: Daisy.Color.CYAN.withAlpha(0.45), width: 2 },
    point: { size: 900, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.6), outlineWidth: 1.4 },
    label: { text: "BeamProj-Sat", font: "13px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.36) },
});
sat.setTle(starlinkTle);
sat.bindEngine(engine);

const sensor = sat.addSensor({
    name: "Demo-Sensor",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg,
    beamLength,
    color: Daisy.Color.CYAN.withAlpha(0.82),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.5),
});

const bp = new Daisy.Analysis.BeamProjector();
const cpu = new Daisy.Analysis.BeamProjectorCpuBackend();

function computeFootprint() {
    const t0 = globalThis.performance?.now?.() ?? 0;
    const result = bp.projectFootprint({
        entityId: "demo",
        entityMatrix: sat.entity.getWorldMatrix?.(startTime) ?? Daisy.Matrix4.IDENTITY,
        beamAttitude: { azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 },
        sensorType: Daisy.PW.SensorType.EllipticalCone,
        apertureDeg,
        beamLength,
        emitDirection: Daisy.EmitDirection.TO_GROUND,
        slices: 32,
        celestialEllipsoid: Daisy.PW.CelestialEllipsoid.Earth(),
        time: startTime,
    });
    const cost = (globalThis.performance?.now?.() ?? 0) - t0;

    metadata = new Daisy.Cartographic(result.cartographic[0]?.longitude ?? 0, result.cartographic[0]?.latitude ?? 0, 0);
    stats = {
        hitCount: result.metadata.hitCount,
        sampleCount: result.metadata.sampleCount,
        costMs: cost,
        dropReason: result.metadata.dropReason ?? "",
    };

    if (showFootprint && result.cartographic.length >= 3) {
        const positions = result.cartographic.map((c) => Daisy.Cartographic.fromRadians(c.longitude, c.latitude, 0));
        sensor.clearFootprintUnionRenderer?.();
        sensor.drawFootprint?.({
            begin: startTime,
            end: stopTime,
            union: true,
            debugName: "beamproj-demo",
            sampleStepSeconds: 30,
            maxSampleCount: 500,
            fillColor: Daisy.Color.RED.withAlpha(0.12),
            outline: true,
            outlineColor: Daisy.Color.YELLOW.withAlpha(1),
            outlineWidthPx: 2,
        });
    } else {
        sensor.clearFootprintUnionRenderer?.();
    }
}

let metadata = $state(null);
computeFootprint();

function toggleFootprint() {
    showFootprint = !showFootprint;
    computeFootprint();
}

engine.camera.followTarget(sat, {
    view: { distance: 2_400_000, pitchDeg: -38, headingDeg: -18 },
});

__log?.("BeamProjector Demo: CPU后端波束投影计算，展示 footprint 采样与命中统计");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="Beam Projector">
    <div class="panel-head">
        <div>
            <div class="eyebrow">Beam Projector</div>
            <h2>波束投影计算器</h2>
        </div>
    </div>

    <div class="metric-grid">
        <div>
            <span>采样点</span>
            <strong>{stats.sampleCount}</strong>
        </div>
        <div>
            <span>命中</span>
            <strong>{stats.hitCount}</strong>
        </div>
        <div>
            <span>耗时</span>
            <strong>{stats.costMs.toFixed(2)}ms</strong>
        </div>
    </div>

    {#if stats.dropReason}
        <div class="notice">丢弃: {stats.dropReason}</div>
    {/if}

    <div class="control-group">
        <span class="control-label">参数</span>
        <div class="param-row">
            <span>开角</span>
            <span>{apertureDeg.xDeg}°×{apertureDeg.yDeg}°</span>
        </div>
        <div class="param-row">
            <span>波束长</span>
            <span>{(beamLength / 1000).toFixed(0)} km</span>
        </div>
        <div class="param-row">
            <span>姿态</span>
            <span>az 0° el -30°</span>
        </div>
    </div>

    <div class="control-group">
        <span class="control-label">显示</span>
        <button class="primary" onclick={toggleFootprint}>
            {showFootprint ? "隐藏覆盖" : "显示覆盖"}
        </button>
    </div>
    </DemoPanel>

<style>
    .panel-head { display: flex; align-items: start; justify-content: space-between; margin-bottom: 12px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 16px; line-height: 1.2; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-bottom: 10px; }
    .metric-grid div { padding: 7px 6px; border-radius: 7px; background: var(--ds-overlay-card-bg); }
    .metric-grid span { display: block; color: var(--ds-overlay-text-muted); font-size: 10px; line-height: 1.1; }
    .metric-grid strong { display: block; margin-top: 4px; color: var(--ds-overlay-text-bright); font-size: 12px; line-height: 1.1; font-variant-numeric: tabular-nums; }
    .param-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
    .param-row span:first-child { color: var(--ds-overlay-text-label); }
    .control-group { margin-top: 10px; }
    .control-label { display: block; margin-bottom: 6px; color: var(--ds-overlay-text-label); font-size: 11px; font-weight: 700; }
    .notice { margin-bottom: 10px; padding: 7px 9px; border: 1px solid var(--ds-overlay-accent-warm-border); border-radius: 7px; background: var(--ds-overlay-accent-warm-soft); color: var(--ds-overlay-accent-warm); font-size: 11px; }
    .primary { width: 100%; height: 28px; border: 1px solid rgba(99,215,255,0.28); border-radius: 6px; background: linear-gradient(135deg, rgba(77,168,255,0.22), rgba(62,207,142,0.12)); color: var(--ds-overlay-btn-primary-text); font-size: 11px; font-weight: 700; cursor: pointer; }
</style>
