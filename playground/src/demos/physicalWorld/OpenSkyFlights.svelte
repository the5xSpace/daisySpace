<script lang="ts">
// =============================================================================
// OpenSky Flights Demo — 实时全球航班信息（OpenSky Network API）
// -----------------------------------------------------------------------------
// 演示如何调用 OpenSky Network REST API 获取当前所有航班状态向量，
// 并将其显示为地球上的彩色点标记与呼号标签。
//
// 核心流程：
//   1. 调用 GET https://opensky-network.org/api/states/all 获取快照
//   2. 每行 state vector 包含 icao24 / callsign / lat / lon / alt / velocity ……
//   3. 有效位置 → 创建 Entity + PointFeature + TextFeature
//   4. 颜色编码高度（绿→青→黄→橙→红），地面为绿色
//   5. 每 30 秒自动刷新（匿名用户限速 10次/s，30s 间隔完全合规）
//
// 关键 API：
//   - fetch("https://opensky-network.org/api/states/all")  — 获取所有航班
//   - engine.createEntity(name)        — 创建实体
//   - Daisy.PointFeature               — 点标记（彩色圆点）
//   - Daisy.UI.TextFeature            — 文本（呼号文字）
//   - engine.setHighPerformanceMode    — 大量实体渲染优化
// =============================================================================
import { onDestroy, onMount } from "svelte";

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 状态变量 ─────────────────────────────────────────────────────────────────
let loading = $state(true);
let statusText = $state("初始化...");
let errorText = $state("");
let flightCount = $state(0);
let totalStates = $state(0);
let lastUpdateTime = $state("—");
let autoRefresh = $state(true);
let showLabels = $state(true);

// 所有已创建的实体（用于批量销毁）
const entities: any[] = [];

// ── 辅助函数 ─────────────────────────────────────────────────────────────────

function clearEntities() {
    while (entities.length > 0) {
        const e = entities.pop();
        try { e?.destroy?.() ?? engine.removeEntity(e); } catch { /* ignore */ }
    }
}

/** 根据海拔高度（米）返回颜色 */
function getAltColor(alt: number | null): any {
    if (alt === null) return Daisy.Color.fromCssColorString("#94a3b8"); // gray
    if (alt < 300) return Daisy.Color.fromCssColorString("#4ade80");    // 地面/超低空: 绿
    if (alt < 3000) return Daisy.Color.fromCssColorString("#22d3ee");   // 低空: 青
    if (alt < 8000) return Daisy.Color.fromCssColorString("#fbbf24");   // 中空: 黄
    if (alt < 12000) return Daisy.Color.fromCssColorString("#fb923c");  // 高空: 橙
    return Daisy.Color.fromCssColorString("#f87171");                   // 极高空: 红
}

/** 格式化高度显示 */
function fmtAlt(alt: number | null): string {
    if (alt === null) return "—";
    return `${(alt / 1000).toFixed(1)} km`;
}

// ── 核心：获取航班数据并渲染 ──────────────────────────────────────────────────

async function fetchFlights() {
    loading = true;
    statusText = "正在获取航班数据...";
    errorText = "";

    try {
        const resp = await fetch("https://opensky-network.org/api/states/all", {
            signal: AbortSignal.timeout(15000),
        });
        if (!resp.ok) {
            throw new Error(`API 请求失败 (${resp.status}): ${resp.statusText}`);
        }
        const data = await resp.json();
        const states: any[] = data.states ?? [];
        const serverTime: number = data.time;

        lastUpdateTime = serverTime
            ? new Date(serverTime * 1000).toLocaleTimeString()
            : "—";
        totalStates = states.length;

        // ── 清除旧实体 ──
        clearEntities();

        // ── 遍历状态向量 ──
        let valid = 0;
        for (const s of states) {
            const icao24: string = s[0];
            const callsign: string = (s[1] ?? "").trim() || icao24;
            const lon: number | null = s[5];
            const lat: number | null = s[6];
            const alt: number | null = s[7];
            const onGround: boolean = s[8];
            // const velocity: number | null = s[9];
            // const trueTrack: number | null = s[10];

            // 跳过无有效坐标的记录
            if (lon === null || lat === null) continue;

            const entity = engine.createEntity(`opensky-${icao24}-${valid}`);
            entity.position = Daisy.Cartesian3.fromDegrees(
                lon,
                lat,
                Math.max(alt ?? 300, onGround ? 10 : 300),
            );

            const color = onGround
                ? Daisy.Color.fromCssColorString("#4ade80") // 地面: 绿
                : getAltColor(alt);

            // ── 点标记 ──
            entity.addFeature(new Daisy.PointFeature({
                pixelSize: onGround ? 4 : 6,
                color,
                outlineColor: Daisy.Color.WHITE.withAlpha(0.45),
                outlineWidth: 1,
            }));

            // ── 标签（仅非空呼号且非纯 ICAO 地址） ──
            if (showLabels && callsign && callsign !== icao24 && callsign.length > 1) {
                entity.addFeature(new Daisy.UI.TextFeature({
                    text: callsign,
                    font: "11px sans-serif",
                    fillColor: Daisy.Color.WHITE,
                    style: Daisy.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    outlineColor: Daisy.Color.BLACK.withAlpha(0.55),
                    showBackground: true,
                    backgroundColor: color.withAlpha(0.25),
                    backgroundPadding: new Daisy.Cartesian2(4, 3),
                    pixelOffset: new Daisy.Cartesian2(0, -14),
                }));
            }

            entities.push(entity);
            valid++;
        }

        flightCount = valid;
        statusText = `${valid} 架航班 (共 ${states.length} 个状态向量)`;
        __log?.(`[OpenSky] ${statusText} @ ${lastUpdateTime}`);
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        // 超时或网络错误不展示红色错误（可能跨域或网络问题）
        errorText = msg;
        statusText = "获取失败，将重试";
        __log?.(`[OpenSky][ERROR] ${msg}`);
    } finally {
        loading = false;
    }
}

// ── 定时刷新 ──

let refreshTimer: ReturnType<typeof setInterval> | undefined;

function startAutoRefresh() {
    stopAutoRefresh();
    refreshTimer = setInterval(() => void fetchFlights(), 30000);
}

function stopAutoRefresh() {
    if (refreshTimer !== undefined) {
        clearInterval(refreshTimer);
        refreshTimer = undefined;
    }
}

function toggleAutoRefresh() {
    autoRefresh = !autoRefresh;
    if (autoRefresh) startAutoRefresh();
    else stopAutoRefresh();
}

function handleRefreshNow() {
    void fetchFlights();
}

function handleToggleLabels() {
    showLabels = !showLabels;
    void fetchFlights();
}

// ── 生命周期 ──

onMount(() => {
    // 设置场景——使用当前时间，关闭时间推进（因为是快照）
    const now = Daisy.JulianDate.fromDate(new Date());
    const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
    const stop = Daisy.JulianDate.addHours(now, 1, new Daisy.JulianDate());
    engine.setSceneTime(start, stop);
    engine.setCurrentTime(now);
    engine.setMultiplier(0);
    engine.pause();

    // 开启高性能模式（大量点实体）
    engine.setHighPerformanceMode?.({
        enabled: true,
        visibilityCheckGroups: 20,
        keepFeatureTypes: ["PointFeature", "UI_TextFeature"],
    });

    // 添加轻量控制面板
    engine.addWidget(new Daisy.ControlPanelWidget({
        mode: "lite",
        preset: "rightTop",
        layout: "row",
        draggable: true,
    }));

    // 首次获取
    void fetchFlights();
    startAutoRefresh();

    // 相机飞到全球视角
    engine.camera.flyHome(0.8);
});

onDestroy(() => {
    stopAutoRefresh();
    clearEntities();
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="✈ OpenSky 实时航班">
        <div class="title-row">
            <div>
                <div class="title">✈ OpenSky 实时航班</div>
                <div class="subtitle">调用 /states/all · 颜色编码高度 · 30s 自动刷新</div>
            </div>
            <button class="action" onclick={handleRefreshNow} disabled={loading}>
                {loading ? "加载中…" : "刷新"}
            </button>
        </div>

        <div class="meta">
            <div>状态: <span class="val">{statusText}</span></div>
            <div>上次更新: <span class="val">{lastUpdateTime}</span></div>
            <div>有效航班: <span class="val highlight">{flightCount.toLocaleString()}</span></div>
        </div>

        {#if errorText}
            <div class="error">⚠ {errorText}</div>
        {/if}

        <div class="controls">
            <label class="toggle">
                <input type="checkbox" checked={autoRefresh} onchange={toggleAutoRefresh} />
                <span>自动刷新 (30s)</span>
            </label>
            <label class="toggle">
                <input type="checkbox" checked={showLabels} onchange={handleToggleLabels} />
                <span>呼号标签</span>
            </label>
        </div>

        <div class="legend">
            <span class="legend-item"><span class="dot" style="background:#4ade80"></span>地面</span>
            <span class="legend-item"><span class="dot" style="background:#22d3ee"></span>&lt;3km</span>
            <span class="legend-item"><span class="dot" style="background:#fbbf24"></span>3-8km</span>
            <span class="legend-item"><span class="dot" style="background:#fb923c"></span>8-12km</span>
            <span class="legend-item"><span class="dot" style="background:#f87171"></span>&gt;12km</span>
        </div>
    </DemoPanel>
<style>
.title-row {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 12px;
        margin-bottom: 10px;
    }

    .title {
        font-size: 18px;
        font-weight: 700;
        color: var(--panel-accent);
        margin-bottom: 2px;
    }

    .subtitle {
        font-size: 12px;
        color: var(--panel-text-muted);
    }

    .action {
        cursor: pointer;
        border: 1px solid rgba(34, 211, 238, 0.34);
        background: rgba(34, 211, 238, 0.12);
        color: var(--panel-accent);
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 600;
        transition: background 0.15s;
    }
    .action:hover {
        background: rgba(34, 211, 238, 0.24);
    }
    .action:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .meta {
        display: grid;
        gap: 4px;
        font-size: 12px;
        color: var(--panel-text-bright);
        line-height: 1.55;
    }
    .meta .val {
        color: var(--panel-text);
    }
    .meta .highlight {
        color: var(--panel-accent);
        font-weight: 700;
        font-variant-numeric: tabular-nums;
    }

    .error {
        margin-top: 8px;
        font-size: 12px;
        color: #ff98a8;
        line-height: 1.45;
    }

    .controls {
        display: flex;
        gap: 16px;
        margin-top: 10px;
        flex-wrap: wrap;
    }

    .toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--panel-text-bright);
        cursor: pointer;
        user-select: none;
    }
    .toggle input[type="checkbox"] {
        accent-color: var(--panel-accent);
    }

    .legend {
        display: flex;
        gap: 8px;
        margin-top: 10px;
        flex-wrap: wrap;
    }
    .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--panel-text-muted);
    }
    .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
</style>
