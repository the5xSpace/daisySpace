<script>
// =============================================================================
// 千帆星座覆盖分析 Demo
//
// 使用 TLE + SGP4 轨道传播 + ConstellationCoverageAnalysis 对 164 颗千帆卫星
// 进行覆盖分析，支持 6/12/24 小时范围、30/60/300 秒步长，
// 按每颗卫星连续覆盖显示结果，支持卫星筛选和波束显示控制。
//
// 关键 API：
// - Daisy.Analysis.ConstellationCoverageAnalysis({ backend })
// - analysis.setConstellation(constellation)
// - analysis.computeCoverageOverRange({ startTime, endTime, stepSeconds, gridResolution, targetRegion, targets, onProgress })
//   - 返回 { stats, satelliteCoverages, polygons }
// - Daisy.CoverageAreaFeature — 渲染覆盖围栏
// =============================================================================

import { QIANFAN_TLES } from "./qianfan-tles";

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const SCENE_DATE = new Date("2026-06-11T06:00:00Z");
const REGION_CHINA = { westLon: 73, southLat: 3, eastLon: 135, northLat: 54 };
const REGION_GLOBAL = { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 };
const DURATION_OPTIONS = [
    { hours: 1.6, label: "100分钟" },
    { hours: 3, label: "3小时" },
    { hours: 6, label: "6小时" },
];
const STEP_OPTIONS = [
    { seconds: 30, label: "30秒" },
    { seconds: 60, label: "60秒" },
    { seconds: 300, label: "300秒" },
];
const startTime = Daisy.JulianDate.fromDate(SCENE_DATE);

engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.setMultiplier(60);
engine.setLoop(true);
engine.play();

const sensorOpts = {
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 103, yDeg: 90 },
    beamLength: 1_000_000,
    beamShow: false,
    color: Daisy.Color.CYAN.withAlpha(0.18),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.28),
};

const colorStops = [
    [198, 88, 60], [151, 76, 55], [33, 92, 58], [274, 76, 66],
    [12, 86, 62], [176, 74, 52], [222, 78, 65], [326, 74, 64],
    [86, 70, 50], [44, 90, 58], [252, 76, 68], [4, 76, 58],
];

function satColor(index, alpha = 0.28) {
    const [h, s, l] = colorStops[index % colorStops.length];
    const hue = (h + Math.floor(index / colorStops.length) * 17) % 360;
    return `hsla(${hue}, ${s}%, ${l}%, ${alpha})`;
}

function shortName(name) {
    return name.replace("QIANFAN-", "QF-");
}

function makeEndTime(hours) {
    return Daisy.JulianDate.addSeconds(startTime, hours * 3600, new Daisy.JulianDate());
}

function formatTimeRange(hours = selectedDurationHours) {
    const end = makeEndTime(hours);
    const start = Daisy.JulianDate.toDate(startTime);
    const stop = Daisy.JulianDate.toDate(end);
    const fmt = (d) => `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
    return `${start.toISOString().slice(0, 10)} ${fmt(start)}-${fmt(stop)} UTC`;
}

const satCount = QIANFAN_TLES.length;

function emptyResults() {
    return {
        coveragePercent: 0,
        totalTimeSeconds: 0,
        stepSeconds: selectedStepSeconds,
        maxGapSeconds: 0,
        revisitTimeSeconds: 0,
        totalSatelliteCount: satCount,
        selectedCount: selectedCount(),
        totalPolygonCount: 0,
    };
}

function syncSceneTimeRange(hours = selectedDurationHours) {
    const endTime = makeEndTime(hours);
    engine.setSceneTime(startTime, endTime);
    engine.setCurrentTime(startTime);
    engine.setLoop(true);
    engine.play();
    return endTime;
}

function markAnalysisStale(message = "参数已变更，请重新运行分析") {
    if (isAnalyzing) return;
    analysisDone = false;
    selectedSat = null;
    detailRows = [];
    loadingDetail = false;
    progressMsg = message;
    results = emptyResults();
    clearCoverageRenderers();
}

function selectDuration(hours) {
    if (selectedDurationHours === hours) return;
    selectedDurationHours = hours;
    syncSceneTimeRange(hours);
    markAnalysisStale();
}

function selectStep(seconds) {
    if (selectedStepSeconds === seconds) return;
    selectedStepSeconds = seconds;
    markAnalysisStale();
}

const constellation = new Daisy.PW.Constellation({ name: "QIANFAN" });
const satSensors = new Map();
const coverageEntity = new Daisy.Entity("qianfan-coverage");
coverageEntity.position = Daisy.Cartesian3.fromDegrees(0, 0, 0);
coverageEntity.bindEngine(engine);
let coverageFeature = null;
let analysisPolygons = [];
let satelliteRows = $state(QIANFAN_TLES.map(([name], index) => ({
    name,
    label: shortName(name),
    color: satColor(index),
    selected: true,
    sensorCount: 0,
    polygonCount: 0,
})));
let selectedDurationHours = $state(1.6);
let selectedStepSeconds = $state(60);
let beamsVisible = $state(true);
let isAnalyzing = $state(false);
let analysisDone = $state(false);
let progressMsg = $state("");
let satFilter = $state("");
let selectedSat = $state(null);
let detailRows = $state([]);
let loadingDetail = $state(false);
let results = $state(emptyResults());

function rowByName(name) {
    return satelliteRows.find((row) => row.name === name);
}

function filteredSatelliteRows() {
    const q = satFilter.trim().toLowerCase();
    if (!q) return satelliteRows;
    return satelliteRows.filter((row) => row.name.toLowerCase().includes(q) || row.label.toLowerCase().includes(q));
}

function selectedCount() {
    return satelliteRows.filter((row) => row.selected).length;
}

function totalPolygonCount() {
    return satelliteRows.reduce((sum, row) => sum + (row.polygonCount ?? 0), 0);
}

function clearCoverageRenderers() {
    if (coverageFeature) {
        coverageFeature.setPolygons([]);
    }
}

function fenceColor(row) {
    return row?.color ?? "hsla(198, 88%, 60%, 0.28)";
}

function ensureCoverageFeature() {
    if (coverageFeature) return coverageFeature;
    coverageFeature = coverageEntity.addFeature(new Daisy.CoverageAreaFeature({
        polygons: [],
        opacity: 0.78,
        minVisible: 0.01,
        outlineWidth: 0,
        outlineColor: "rgba(255,255,255,0.34)",
        resolution: 4,
        label: { show: false },
    }));
    return coverageFeature;
}

function applyCoverageVisibility() {
    if (!coverageFeature) return;
    const selectedNames = new Set(satelliteRows.filter((row) => row.selected).map((row) => row.name));
    const visible = analysisPolygons
        .filter((p) => selectedNames.has(p.satelliteName))
        .map((p) => ({
            ring: p.ring,
            color: fenceColor(rowByName(p.satelliteName)),
        }));
    coverageFeature.setPolygons(visible);
    engine.triggerUpdateOnce?.();
}

function renderCoveragePolygons(polygons) {
    analysisPolygons = polygons ?? [];
    ensureCoverageFeature();
    applyCoverageVisibility();
}

function formatFenceRing(ring) {
    if (!ring || ring.length === 0) return "-";
    return ring
        .map(([lon, lat]) => `${lon.toFixed(3)},${lat.toFixed(3)}`)
        .join(" | ");
}

function formatUtcTime(time) {
    if (!time) return "-";
    const d = Daisy.JulianDate.toDate(time);
    return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")}`;
}

function buildFenceRows(name) {
    return analysisPolygons
        .filter((polygon) => polygon.satelliteName === name)
        .map((polygon, index) => ({
            idx: index + 1,
            time: formatUtcTime(polygon.time),
            sensor: polygon.sensorName?.replace(`${name}-`, "") ?? "-",
            points: polygon.ring?.length ?? 0,
            fence: formatFenceRing(polygon.ring),
        }));
}

function refreshSelectedFenceRows() {
    if (!selectedSat) {
        detailRows = [];
        return;
    }
    detailRows = buildFenceRows(selectedSat);
}

function syncSatVisibility(name, selected) {
    const entry = satSensors.get(name);
    if (!entry) return;
    entry.sat.show = selected;
    if (selected && beamsVisible) {
        entry.sensor.showBeam?.();
    } else {
        entry.sensor.hideBeam?.();
    }
}

function setSatelliteSelected(name, selected) {
    satelliteRows = satelliteRows.map((row) => row.name === name ? { ...row, selected } : row);
    syncSatVisibility(name, selected);
    applyCoverageVisibility();
    if (analysisDone) {
        results = { ...results, selectedCount: selectedCount() };
    }
}

function setAllSelected(selected) {
    satelliteRows = satelliteRows.map((row) => ({ ...row, selected }));
    for (const [name] of satSensors) {
        syncSatVisibility(name, selected);
    }
    applyCoverageVisibility();
    if (analysisDone) {
        results = { ...results, selectedCount: selectedCount() };
    }
}

function setAllBeamsVisible(visible) {
    beamsVisible = visible;
    for (const entry of satSensors.values()) {
        if (visible && entry.sat.show) {
            entry.sensor.showBeam?.();
        } else {
            entry.sensor.hideBeam?.();
        }
    }
    engine.triggerUpdateOnce?.();
}

function updateCoverageSummaries(coverage) {
    const summaryByName = new Map((coverage.satelliteCoverages ?? []).map((item) => [item.satelliteName, item]));
    satelliteRows = satelliteRows.map((row, index) => {
        const summary = summaryByName.get(row.name);
        return {
            ...row,
            sensorCount: summary?.sensorCount ?? row.sensorCount ?? 0,
            polygonCount: summary?.polygonCount ?? 0,
            color: row.color ?? satColor(index),
        };
    });
    results = {
        coveragePercent: coverage.stats?.coveragePercent ?? 0,
        totalTimeSeconds: coverage.stats?.totalTimeSeconds ?? 0,
        stepSeconds: coverage.stats?.stepSeconds ?? selectedStepSeconds,
        maxGapSeconds: coverage.stats?.maxGapSeconds ?? 0,
        revisitTimeSeconds: coverage.stats?.revisitTimeSeconds ?? 0,
        totalSatelliteCount: satCount,
        selectedCount: selectedCount(),
        totalPolygonCount: coverage.polygons?.length ?? totalPolygonCount(),
    };
    refreshSelectedFenceRows();
}

function resetDetailRows() {
    detailRows = [];
}

async function runAnalysis() {
    if (isAnalyzing) return;
    isAnalyzing = true;
    analysisDone = false;
    progressMsg = "启动星座覆盖分析...";
    resetDetailRows();
    analysisPolygons = [];
    clearCoverageRenderers();

    const endTime = makeEndTime(selectedDurationHours);
    const windowLabel = formatTimeRange(selectedDurationHours);

    try {
        const backend = Daisy.Analysis.BeamProjectorBackend?.GPU ?? "gpu";
        const analysis = new Daisy.Analysis.ConstellationCoverageAnalysis({ backend });

        try {
            progressMsg = "绑定星座传感器...";
            await analysis.setConstellation(constellation);

            progressMsg = `分析 ${windowLabel} / ${selectedStepSeconds}s 步长...`;
            const selectedNames = new Set(satelliteRows.filter((row) => row.selected).map((row) => row.name));
            const allSats = constellation.getSatellites?.() ?? [];
            const targets = allSats.filter((sat) => selectedNames.has(sat.name ?? sat.entity?.name ?? ""));
            const coverage = await analysis.computeCoverageOverRange({
                startTime,
                endTime,
                stepSeconds: selectedStepSeconds,
                gridResolution: { latSteps: 72, lonSteps: 144 },
                targetRegion: REGION_GLOBAL,
                targets,
                onProgress: (current, total, satName) => {
                    progressMsg = `${current}/${total}: ${satName}`;
                },
            });

            updateCoverageSummaries(coverage);

            progressMsg = "绘制覆盖围栏...";
            await new Promise((resolve) => {
                const raf = globalThis.requestAnimationFrame;
                if (typeof raf === "function") {
                    raf(() => resolve());
                } else {
                    setTimeout(resolve, 0);
                }
            });
            renderCoveragePolygons(coverage.polygons);

            analysisDone = true;
            progressMsg = "";
            __log?.(
                `千帆覆盖分析完成: ${coverage.stats.coveragePercent.toFixed(1)}% 覆盖率, ` +
                `${coverage.polygons.length} 个采样块, ${coverage.satelliteCoverages.length} 星`,
            );
        } finally {
            analysis.destroy?.();
        }
    } catch (e) {
        progressMsg = "分析失败";
        console.error("覆盖分析异常:", e);
        __log?.(`覆盖分析失败: ${e?.message ?? e}\n${e?.stack ?? ""}`);
    }

    isAnalyzing = false;
}

async function selectSatellite(name) {
    const entry = satSensors.get(name);
    if (!entry) return;
    selectedSat = name;
    loadingDetail = false;
    detailRows = buildFenceRows(name);
    __log?.(`${name} 覆盖围栏: ${detailRows.length} 条`);
    loadingDetail = false;
}

function toggleBeamDisplay() {
    setAllBeamsVisible(!beamsVisible);
}

syncSceneTimeRange(selectedDurationHours);

for (const [name, line1, line2] of QIANFAN_TLES) {
    try {
        const row = satelliteRows.find((item) => item.name === name);
        const tle = [name, line1, line2].join("\n");
        const sat = new Daisy.PW.Satellite({
            name,
            enableSpg4Propagation: false,
            trajectory: { stepSeconds: 30 },
            point: {
                size: 520,
                color: Daisy.Color.CYAN,
                outlineColor: Daisy.Color.BLACK.withAlpha(0.6),
                outlineWidth: 1,
            },
            text: {
                text: shortName(name),
                font: "9px sans-serif",
                offsetPx: new Daisy.Cartesian2(0, -11),
                showBackground: true,
                backgroundColor: Daisy.Color.BLACK.withAlpha(0.3),
            },
        });
        sat.setTle(tle);
        const sensor = sat.addSensor({ ...sensorOpts, name: `${name}-sensor` });
        sat.bindEngine(engine);
        constellation.addSatellite(sat);
        satSensors.set(name, { sat, sensor, color: row?.color ?? satColor(satSensors.size) });
    } catch (error) {
        console.warn("千帆星座卫星初始化失败", name, error);
    }
}

constellation.bindEngine(engine);
setAllBeamsVisible(true);
results = emptyResults();
__log?.(`千帆星座加载完成: ${satSensors.size} 星`);

engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(0, 0, 2000_0000));

registerCleanup(() => {
    clearCoverageRenderers();
    if (coverageFeature) coverageFeature.destroy();
    coverageEntity.destroy();
    constellation.destroy();
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="千帆星座覆盖分析">
    <div class="panel-head">
        <div>
            <div class="eyebrow">QIANFAN Constellation</div>
            <h2>千帆星座覆盖分析</h2>
        </div>
        <div class="sat-badge">{satCount} 星</div>
    </div>

    <div class="info-row">
        <span>时间范围</span>
        <strong>{formatTimeRange()}</strong>
    </div>
    <div class="info-row">
        <span>分析步长</span>
        <strong>{selectedStepSeconds}s</strong>
    </div>
    <div class="info-row">
        <span>覆盖区域</span>
        <strong>lon -180~180 lat -90~90</strong>
    </div>

    <div class="choice-group">
        <div class="choice-block">
            <div class="choice-label">窗口</div>
            <div class="choice-row">
                {#each DURATION_OPTIONS as option}
                    <button
                        class:active={selectedDurationHours === option.hours}
                        onclick={() => selectDuration(option.hours)}
                        disabled={isAnalyzing}
                    >
                        {option.label}
                    </button>
                {/each}
            </div>
        </div>
        <div class="choice-block">
            <div class="choice-label">步长</div>
            <div class="choice-row">
                {#each STEP_OPTIONS as option}
                    <button
                        class:active={selectedStepSeconds === option.seconds}
                        onclick={() => selectStep(option.seconds)}
                        disabled={isAnalyzing}
                    >
                        {option.label}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <div class="action-row">
        <button class="primary" class:loading={isAnalyzing} onclick={runAnalysis} disabled={isAnalyzing}>
            {#if isAnalyzing}
                <span class="spinner"></span> {progressMsg}
            {:else if analysisDone}
                重新运行覆盖分析
            {:else}
                运行覆盖分析
            {/if}
        </button>
        <button class="secondary" onclick={toggleBeamDisplay} disabled={isAnalyzing}>
            {beamsVisible ? "关闭所有波束" : "打开所有波束"}
        </button>
    </div>

    {#if progressMsg && !isAnalyzing}
        <div class="status-line">{progressMsg}</div>
    {/if}

    {#if analysisDone}
        <div class="metric-grid">
            <div><span>覆盖率</span><strong class="highlight">{results.coveragePercent.toFixed(1)}%</strong></div>
            <div><span>已选卫星</span><strong>{results.selectedCount} / {results.totalSatelliteCount}</strong></div>
            <div><span>最大间隙</span><strong>{results.maxGapSeconds.toFixed(0)}s</strong></div>
            <div><span>重访时间</span><strong>{results.revisitTimeSeconds.toFixed(0)}s</strong></div>
            <div><span>采样块</span><strong>{results.totalPolygonCount}</strong></div>
            <div><span>步长</span><strong>{results.stepSeconds.toFixed(0)}s</strong></div>
        </div>
    {/if}

    <div class="list-toolbar">
        <input type="text" placeholder="搜索卫星..." bind:value={satFilter} disabled={isAnalyzing} />
        <button onclick={() => setAllSelected(true)} disabled={isAnalyzing}>全选</button>
        <button onclick={() => setAllSelected(false)} disabled={isAnalyzing}>全不选</button>
    </div>

    <div class="sat-scroll">
        {#each filteredSatelliteRows() as row}
            <div class="sat-item" class:selected={selectedSat === row.name}>
                <label class="sat-toggle">
                    <input
                        type="checkbox"
                        checked={row.selected}
                        onchange={(e) => setSatelliteSelected(row.name, e.currentTarget.checked)}
                    />
                    <span class="swatch" style={`background:${row.color}`}></span>
                </label>
                <span class="sat-name" onclick={() => selectSatellite(row.name)} role="button" tabindex={0} onkeydown={(e) => e.key === "Enter" && selectSatellite(row.name)}>{row.label}</span>
                <button class="count-btn" onclick={() => selectSatellite(row.name)}>{row.polygonCount}</button>
            </div>
        {/each}
    </div>

    <div class="detail">
        {#if !selectedSat}
            <div class="hint">未选择卫星</div>
        {:else if loadingDetail}
            <div class="hint">加载围栏...</div>
        {:else}
            <div class="detail-head">
                <span>{shortName(selectedSat)}</span>
                <strong>{rowByName(selectedSat)?.polygonCount ?? 0} 条围栏</strong>
            </div>
            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UTC</th>
                            <th>传感器</th>
                            <th>点数</th>
                            <th>围栏连续坐标 lon,lat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each detailRows as row}
                            <tr>
                                <td>{row.idx}</td>
                                <td>{row.time}</td>
                                <td>{row.sensor}</td>
                                <td>{row.points}</td>
                                <td class="fence-cell">{row.fence}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    </div>
</DemoPanel>

<style>
.panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 15px; line-height: 1.2; }
    .sat-badge { padding: 4px 8px; border-radius: 999px; background: var(--color-success-muted); color: var(--color-success); font-size: 11px; font-weight: 700; white-space: nowrap; }
    .info-row { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 2px; font-size: 10px; }
    .info-row span { color: var(--ds-overlay-text-muted); }
    .info-row strong { color: var(--panel-text-bright); font-weight: 700; text-align: right; }
    .choice-group { display: grid; gap: 7px; margin-top: 10px; }
    .choice-block { padding: 8px; border: 1px solid var(--panel-border); border-radius: 8px; background: var(--panel-bg-card); }
    .choice-label { margin-bottom: 6px; color: var(--panel-text-label); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; }
    .choice-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
    .choice-row button, .secondary {
        height: 28px; border: 1px solid var(--panel-bg-card); border-radius: 7px;
        background: var(--ds-overlay-btn-bg); color: var(--panel-text); font-size: 10px; cursor: pointer;
    }
    .choice-row button.active { background: var(--panel-bg-card); border-color: var(--color-accent); color: var(--ds-overlay-btn-primary-text); }
    .choice-row button:disabled, .secondary:disabled { opacity: 0.38; cursor: default; }
    .action-row { display: grid; grid-template-columns: 1fr 116px; gap: 6px; margin-top: 10px; }
    .primary {
        width: 100%; min-height: 31px; border: 1px solid var(--panel-border); border-radius: 7px;
        background: linear-gradient(135deg, var(--color-accent-muted), var(--color-success-muted));
        color: var(--ds-overlay-btn-primary-text); font-size: 11px; font-weight: 700; cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .primary:disabled { opacity: 0.58; cursor: wait; }
    .primary.loading { background: linear-gradient(135deg, var(--color-warning-muted), var(--color-warning-muted)); border-color: var(--color-warning-muted); }
    .secondary { display: flex; align-items: center; justify-content: center; }
    .status-line {
        margin-top: 8px; padding: 7px 8px; border-radius: 7px;
        background: var(--panel-bg-card); color: var(--panel-text); font-size: 10px;
    }
    .spinner { display: inline-block; width: 10px; height: 10px; border: 2px solid var(--panel-border); border-top-color: var(--ds-overlay-btn-primary-text); border-radius: 50%; animation: spin 0.8s linear infinite; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin: 8px 0; }
    .metric-grid div { padding: 6px 5px; border-radius: 7px; background: var(--ds-overlay-card-bg); }
    .metric-grid span { display: block; color: var(--ds-overlay-text-muted); font-size: 9px; }
    .metric-grid strong { display: block; margin-top: 3px; color: var(--panel-text-bright); font-size: 11px; font-variant-numeric: tabular-nums; }
    .metric-grid .highlight { color: var(--color-success); }
    .list-toolbar { display: grid; grid-template-columns: 1fr 54px 54px; gap: 5px; margin-top: 8px; }
    .list-toolbar input { min-width: 0; height: 26px; padding: 0 8px; border: 1px solid var(--panel-border); border-radius: 6px; background: rgba(0,0,0,0.08); color: var(--ds-overlay-text); font-size: 10px; outline: none; box-sizing: border-box; }
    .list-toolbar button { height: 26px; border: 1px solid var(--panel-bg-embed); border-radius: 6px; background: var(--ds-overlay-btn-bg); color: var(--panel-text); font-size: 10px; cursor: pointer; }
    .list-toolbar button:disabled { opacity: 0.35; cursor: default; }
    .sat-scroll { margin-top: 6px; max-height: 262px; overflow-y: auto; padding-right: 2px; }
    .sat-scroll::-webkit-scrollbar, .table-wrap::-webkit-scrollbar { width: 4px; height: 4px; }
    .sat-scroll::-webkit-scrollbar-thumb, .table-wrap::-webkit-scrollbar-thumb { background: var(--panel-btn-bg); border-radius: 3px; }
    .sat-item { display: grid; grid-template-columns: auto 1fr 42px; align-items: center; gap: 5px; min-height: 26px; border-radius: 6px; padding: 0 4px; }
    .sat-item:hover, .sat-item.selected { background: var(--panel-bg-card); }
    .sat-toggle { display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .sat-toggle input { width: 13px; height: 13px; margin: 0; accent-color: var(--color-success); }
    .swatch { width: 11px; height: 11px; border-radius: 3px; box-shadow: inset 0 0 0 1px var(--panel-bg-embed); }
    .sat-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--panel-text); font-size: 10px; cursor: pointer; }
    .count-btn { height: 20px; border: 0; border-radius: 4px; background: var(--panel-bg-card); color: var(--panel-text-muted); font-size: 10px; font-variant-numeric: tabular-nums; cursor: pointer; }
    .detail { margin-top: 8px; border-top: 1px solid var(--panel-border); padding-top: 7px; min-height: 42px; }
    .hint { color: var(--panel-text-label); font-size: 11px; text-align: center; padding: 12px 0; }
    .detail-head { display: flex; justify-content: space-between; align-items: center; color: var(--ds-overlay-accent); font-size: 11px; font-weight: 700; margin-bottom: 5px; }
    .detail-head strong { color: var(--panel-text-muted); font-size: 10px; }
    .table-wrap { max-height: 150px; overflow: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 9px; }
    th { position: sticky; top: 0; background: var(--ds-overlay-bg); padding: 3px 4px; text-align: left; color: var(--panel-text-muted); font-weight: 600; white-space: nowrap; border-bottom: 1px solid var(--panel-border); }
    td { padding: 3px 4px; border-bottom: 1px solid var(--panel-border); color: var(--panel-text); white-space: nowrap; }
    .fence-cell { min-width: 420px; max-width: 680px; white-space: nowrap; font-family: "Consolas", "Menlo", monospace; color: var(--panel-text); }
    @keyframes spin { to { transform: rotate(360deg); } }
</style>
