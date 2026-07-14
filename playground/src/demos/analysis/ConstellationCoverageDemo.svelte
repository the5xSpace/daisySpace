<script>
// =============================================================================
// ConstellationCoverage Demo — 星座覆盖分析
//
// 展示 Constellation 容器 + ConstellationCoverageAnalysis 的覆盖分析能力：
// 双星星座 + 覆盖分析，计算覆盖百分比、最大间隙、重访时间。
//
// 关键 API：
// - Daisy.PW.Constellation({ name }) — 星座容器
// - constellation.addSatellite(sat) — 添加卫星
// - Daisy.Analysis.ConstellationCoverageAnalysis({ name, backend })
// - analysis.setConstellation(constellation)
// - analysis.computeCoverageOverRange({ start, end, stepSeconds, gridResolution, targetRegion })
//   - 返回 { stats: { coveragePercent, maxGapSeconds, revisitTimeSeconds, ... } }
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const SCENE_START = new Date("2026-03-20T12:00:00Z");
const startTime = Daisy.JulianDate.fromDate(SCENE_START);
const stopTime = Daisy.JulianDate.addSeconds(startTime, 7200, new Daisy.JulianDate());

engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setGlobeOptions({ show: true, baseColor: Daisy.Color.BLACK });
engine.clearViewLayer?.();
engine.setSceneTime(startTime, stopTime);
engine.setCurrentTime(startTime);
engine.setMultiplier(60);
engine.setLoop(true);
engine.play();

const starlinkTle = [
    "STARLINK-1008",
    "1 44714U 19074B   26067.59669313  .00002636  00000+0  98623-4 0  9992",
    "2 44714  53.1570 183.8326 0001400 100.8583 259.2576 15.31028559348701",
].join("\n");

const sat1 = new Daisy.PW.Satellite({
    name: "SAT-1",
    trajectory: { stepSeconds: 30 },
    point: { size: 600, color: Daisy.Color.CYAN },
});
sat1.setTle(starlinkTle);
sat1.bindEngine(engine);

const sat2 = new Daisy.PW.Satellite({
    name: "SAT-2",
    trajectory: { stepSeconds: 30 },
    point: { size: 600, color: Daisy.Color.ORANGE },
});
const tle2 = [
    "SAT-2",
    "1 44714U 19074B   26067.59669313  .00002636  00000+0  98623-4 0  9992",
    "2 44714  53.1570 183.8326 0001400 100.8583 259.2576 15.31028559348701",
].join("\n");
sat2.setTle(tle2);
sat2.bindEngine(engine);

const commonSensorOpts = {
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 30, yDeg: 60 },
    beamLength: 800_000,
    color: Daisy.Color.CYAN.withAlpha(0.82),
    outline: true,
};

sat1.addSensor({ ...commonSensorOpts, name: "SAT1-Sensor" });
sat2.addSensor({ ...commonSensorOpts, name: "SAT2-Sensor", color: Daisy.Color.ORANGE.withAlpha(0.82) });

const constellation = new Daisy.PW.Constellation({ name: "Demo-Constellation" });
constellation.addSatellite(sat1);
constellation.addSatellite(sat2);
constellation.bindEngine(engine);

const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({ name: "Demo-Coverage" });

let isAnalyzing = $state(false);
let results = $state({
    coveragePercent: 0,
    totalTimeSeconds: 0,
    stepSeconds: 0,
    maxGapSeconds: 0,
    revisitTimeSeconds: 0,
    gridWidth: 0,
    gridHeight: 0,
});

async function runAnalysis() {
    isAnalyzing = true;
    try {
        await analysis.setConstellation(constellation);

        const coverage = await analysis.computeCoverageOverRange({
            start: startTime,
            end: stopTime,
            stepSeconds: 120,
            gridResolution: { latSteps: 18, lonSteps: 36 },
            targetRegion: { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 },
        });

        results = {
            coveragePercent: coverage.stats.coveragePercent,
            totalTimeSeconds: coverage.stats.totalTimeSeconds,
            stepSeconds: coverage.stats.stepSeconds,
            maxGapSeconds: coverage.stats.maxGapSeconds,
            revisitTimeSeconds: coverage.stats.revisitTimeSeconds,
            gridWidth: coverage.stats.gridWidth,
            gridHeight: coverage.stats.gridHeight,
        };
        __log?.(`覆盖分析完成: ${coverage.stats.coveragePercent.toFixed(1)}% coverage`);
    } catch (e) {
        __log?.(`分析失败: ${e?.message ?? e}`);
    }
    isAnalyzing = false;
}

engine.camera.followTarget(sat1, {
    view: { distance: 4_000_000, pitchDeg: -45, headingDeg: -18 },
});

__log?.("Constellation Coverage Demo: 双星星座 + 覆盖分析");

// ── 挂载帧率监控与场景控制组件 ──
engine.addWidget(new Daisy.FrameRateWidget());
engine.addWidget(    new Daisy.ControlPanelWidget({ mode: "lite" }));
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="覆盖分析">
    <div class="panel-head">
        <div>
            <div class="eyebrow">Coverage Analysis</div>
            <h2>星座覆盖分析</h2>
        </div>
        <div class="sat-badge">
            {constellation.satelliteCount} 星
        </div>
    </div>

    <div class="control-group">
        <button class="primary" onclick={runAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? "分析中..." : "运行覆盖分析"}
        </button>
    </div>

    {#if results.totalTimeSeconds > 0}
        <div class="metric-grid">
            <div>
                <span>覆盖率</span>
                <strong class="highlight">{results.coveragePercent.toFixed(1)}%</strong>
            </div>
            <div>
                <span>最大间隙</span>
                <strong>{results.maxGapSeconds.toFixed(0)}s</strong>
            </div>
            <div>
                <span>重访时间</span>
                <strong>{results.revisitTimeSeconds.toFixed(0)}s</strong>
            </div>
            <div>
                <span>时间跨度</span>
                <strong>{results.totalTimeSeconds.toFixed(0)}s</strong>
            </div>
            <div>
                <span>步长</span>
                <strong>{results.stepSeconds}s</strong>
            </div>
            <div>
                <span>网格</span>
                <strong>{results.gridWidth}×{results.gridHeight}</strong>
            </div>
        </div>
    {/if}
</DemoPanel>

<style>
    .panel-head { display: flex; align-items: start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 16px; line-height: 1.2; }
    .sat-badge { min-width: 50px; padding: 5px 8px; border-radius: 999px; background: rgba(62,207,142,0.11); color: #3ecf8e; font-size: 12px; font-weight: 700; text-align: center; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 10px; }
    .metric-grid div { padding: 7px 6px; border-radius: 7px; background: var(--ds-overlay-card-bg); }
    .metric-grid span { display: block; color: var(--ds-overlay-text-muted); font-size: 10px; line-height: 1.1; }
    .metric-grid strong { display: block; margin-top: 4px; color: var(--panel-text-bright); font-size: 12px; line-height: 1.1; font-variant-numeric: tabular-nums; }
    .metric-grid .highlight { color: #3ecf8e; }
    .control-group { margin-top: 10px; }
    .primary { width: 100%; height: 32px; border: 1px solid rgba(99,215,255,0.28); border-radius: 6px; background: linear-gradient(135deg, rgba(77,168,255,0.22), rgba(62,207,142,0.12)); color: var(--ds-overlay-btn-primary-text); font-size: 12px; font-weight: 700; cursor: pointer; }
    .primary:disabled { opacity: 0.55; cursor: wait; }
</style>
