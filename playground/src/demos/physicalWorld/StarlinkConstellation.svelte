<script lang="ts">
// =============================================================================
// Starlink 星座实时轨道追踪压测 Demo
// -----------------------------------------------------------------------------
// 核心流程：
//   1. 从预生成紧凑格式星历文本（TEME 坐标）解析数千颗卫星的位置采样
//   2. 用 TrajectorySample（INERTIAL 参考系）驱动每颗 Daisy.PW.Satellite 的位置
//   3. 监听 hover / click 事件，动态挂载/卸载标签与轨迹线
//   4. 分批（BATCH_SIZE）创建卫星并插帧，避免单帧卡顿
// 关键 API：
//   - Daisy.TrajectorySample        : 轨迹数据容器（INERTIAL 参考系 + 线性插值）
//   - Daisy.PW.Satellite            : 物理世界层卫星实体
//   - sat.entity.setPath()          : hover 时显示采样轨迹线
//   - engine.setHighPerformanceMode : 大量实体渲染分组优化
//   - engine.eventHandle            : hover / click 事件桥接
// =============================================================================
import { onDestroy, onMount } from "svelte";

let { engine, daisy: Daisy, log: __log } = $props();

const DATA_URL = Daisy.BuildModuleUrl.getUrl("cache/starlink-ephemeris.txt");
// 星历文件初始时间窗口，加载完成后会用实际数据范围覆盖
const WINDOW_START_ISO = "2026-06-04T00:00:00.000Z";
const WINDOW_END_ISO = "2026-06-04T04:00:00.000Z";
// 每批次创建的卫星数，超出后插帧避免页面冻结
const BATCH_SIZE = 250;
// 卫星颜色循环调色板（按索引取色，数量不足时循环）
const PALETTE = [
    Daisy.Color.fromCssColorString("#22d3ee"),
    Daisy.Color.fromCssColorString("#7cfc9a"),
    Daisy.Color.fromCssColorString("#ffd166"),
    Daisy.Color.fromCssColorString("#ff8fab"),
    Daisy.Color.fromCssColorString("#8ab4f8"),
    Daisy.Color.fromCssColorString("#f472b6"),
    Daisy.Color.fromCssColorString("#a3e635"),
    Daisy.Color.fromCssColorString("#f59e0b"),
];

// 星历文件中单条采样：Unix 毫秒时间戳 + TEME 坐标（km）
type ParsedSample = { timeMs: number; xKm: number; yKm: number; zKm: number };
// 单颗卫星的解析结果
type ParsedSatellite = { name: string; samples: ParsedSample[] };

let loading = $state(true);
let statusText = $state("准备加载星历文本...");
let errorText = $state("");
let satelliteCount = $state(0);
let sampleCount = $state(0);
let firstSampleTime = $state("");
let lastSampleTime = $state("");
let maxSampleStepText = $state("");

// 所有已创建的卫星实例，用于批量销毁
const satellites: any[] = [];
// 当前处于 focus 状态（hover/activated）的卫星 ID 集合
const focusedSatelliteIds = new Set<string>();
// entityId → { sat, name, colorIndex } 映射，供事件桥接快速查找，避免遍历整个数组
const satelliteFocusTargets = new Map<string, { sat: any; satelliteName: string; colorIndex: number }>();
// 事件桥接的注销函数，onDestroy 时调用
let removeFocusEventBridge: (() => void) | undefined;

// 双击跟踪状态
let followedSat = $state<any>(null);
let followedSatName = $state("");
let followedSatInfo = $state({ lon: "—", lat: "—", alt: "—", speed: "—" });
let removeFollowTickListener: (() => void) | undefined;
let lastFollowPos: any = null;
let lastFollowTime: number | null = null;

/** 销毁所有卫星并清空状态，重建前调用 */
function clearSatellites() {
    exitFollow();
    focusedSatelliteIds.clear();
    satelliteFocusTargets.clear();
    while (satellites.length > 0) {
        const sat = satellites.pop();
        try {
            sat?.destroy();
        } catch {
            // 忽略销毁过程中的重复释放错误
        }
    }
}

function pickColor(index: number) {
    return PALETTE[index % PALETTE.length].withAlpha(0.88);
}

/** 兼容获取卫星底层 Entity（字段名在不同版本间可能不同）*/
function getSatelliteEntity(sat: any) {
    return sat?.entity ?? sat?._entity;
}

/** 获取卫星稳定唯一 ID，作为 focusedSatelliteIds / satelliteFocusTargets 的 key */
function getSatelliteId(sat: any): string {
    const entity = getSatelliteEntity(sat);
    const id = typeof entity?.getId === "function" ? entity.getId() : undefined;
    return id || `${sat?.name ?? "sat"}-${satellites.indexOf(sat)}`;
}

/** 判断卫星是否处于 hover 或 activated 状态 */
function isSatelliteFocused(sat: any): boolean {
    const entity = getSatelliteEntity(sat);
    return entity?.hovered === true || entity?.activated === true || entity?.interaction?.hovered === true || entity?.interaction?.actived === true;
}

/** hover/label 等属性变更后主动触发一次 update，否则要等下一帧才生效 */
function forceSatelliteRefresh(sat: any) {
    const entity = getSatelliteEntity(sat);
    const time = typeof engine?.getCurrentTime === "function" ? engine.getCurrentTime() : undefined;
    if (entity && time && typeof entity.update === "function") {
        entity.update(time);
    }
}

/** 注册卫星到 entityId 映射表，供事件桥接快速查找 */
function registerSatelliteFocusTarget(sat: any, satelliteName: string, colorIndex: number) {
    satelliteFocusTargets.set(getSatelliteId(sat), { sat, satelliteName, colorIndex });
}

/** hover/activated 时显示卫星名称标签和轨迹线（幂等）*/
function showFocusFeatures(sat: any, satelliteName: string, colorIndex: number) {
    const id = getSatelliteId(sat);
    if (focusedSatelliteIds.has(id)) return;
    focusedSatelliteIds.add(id);
    const color = pickColor(colorIndex);

    sat.setOptions?.({
        text: {
            text: satelliteName,
            font: "bold 18px sans-serif",
            offsetPx: new Daisy.Cartesian2(0, -24),
            showBackground: true,
            backgroundColor: Daisy.Color.BLACK.withAlpha(0.72),
            fillColor: Daisy.Color.WHITE,
            outlineColor: Daisy.Color.BLACK.withAlpha(0.9),
            outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
    });
    getSatelliteEntity(sat)?.setPath?.({
        show: true,
        historySecond: 3600,
        futureSecond: 3600,
        width: 2,
        color: color.withAlpha(0.92),
        historyColor: color.withAlpha(0.92),
        futureColor: color.withAlpha(0.55),
        autoOptimize: false,
        resolutionSecond: 10,
        maxDirectionInterpolationCount: 512,
    });
    forceSatelliteRefresh(sat);
}

/** 离开 hover/activated 时移除标签和轨迹线（幂等）*/
function hideFocusFeatures(sat: any) {
    const id = getSatelliteId(sat);
    if (!focusedSatelliteIds.has(id)) return;
    focusedSatelliteIds.delete(id);
    sat.setOptions?.({
        text: false,
    });
    getSatelliteEntity(sat)?.removePath?.();
    forceSatelliteRefresh(sat);
}

/** 根据当前 focus 状态同步显示/隐藏，用于事件后的状态对齐 */
function syncFocusFeatures(sat: any, satelliteName: string, colorIndex: number) {
    if (isSatelliteFocused(sat)) {
        showFocusFeatures(sat, satelliteName, colorIndex);
    } else {
        hideFocusFeatures(sat);
    }
}

/**
 * 清理所有非 focus 卫星的特效。
 * click 激活某颗卫星后调用，确保同一时刻只有被点击的卫星保持高亮。
 * @param exceptSat 跳过此卫星不清理
 */
function pruneInactiveFocus(exceptSat?: any) {
    for (const sat of satellites) {
        if (sat === exceptSat) continue;
        if (!isSatelliteFocused(sat)) {
            hideFocusFeatures(sat);
        }
    }
}

/** 更新跟踪卫星的实时信息面板（每 tick 调用） */
function updateFollowedSatInfo() {
    const sat = followedSat;
    if (!sat) return;
    try {
        const entity = getSatelliteEntity(sat);
        const entityId = entity?.getId?.();
        const time = engine?.getCurrentTime?.();
        if (!entity || !time) return;

        if (entityId) engine?.stateCache?.invalidate(entityId);

        const state = entity.getState(time);
        const pos = state?.positionECEF;
        if (!pos) return;

        const carto = Daisy.Cartographic.fromCartesian(pos);

        let speedText = "—";
        const nowMs = performance.now();
        if (lastFollowPos && lastFollowTime != null) {
            const dt = (nowMs - lastFollowTime) / 1000;
            if (dt > 0.001) {
                const dist = Daisy.Cartesian3.distance(pos, lastFollowPos);
                speedText = `${(dist / dt / 1000).toFixed(3)} km/s`;
            }
        }
        if (lastFollowPos instanceof Daisy.Cartesian3) {
            Daisy.Cartesian3.clone(pos, lastFollowPos);
        } else {
            lastFollowPos = Daisy.Cartesian3.clone(pos, new Daisy.Cartesian3());
        }
        lastFollowTime = nowMs;

        followedSatInfo = {
            lon: `${Daisy.Math.toDegrees(carto.longitude).toFixed(4)}°`,
            lat: `${Daisy.Math.toDegrees(carto.latitude).toFixed(4)}°`,
            alt: `${(carto.height / 1000).toFixed(2)} km`,
            speed: speedText,
        };
    } catch {
        // 忽略瞬时状态读取异常
    }
}

/** 退出跟踪模式，相机回到全局视野 */
function exitFollow() {
    if (followedSat) {
        const entity = getSatelliteEntity(followedSat);
        if (entity) entity.activated = false;
    }
    removeFollowTickListener?.();
    removeFollowTickListener = undefined;
    engine?.camera?.removeTrackedDaisyEntity();
    engine?.camera?.flyHome(0);
    followedSat = null;
    followedSatName = "";
    followedSatInfo = { lon: "—", lat: "—", alt: "—", speed: "—" };
    lastFollowPos = null;
    lastFollowTime = null;
}

/**
 * 将引擎 hover/hoverOut/click/dblclick 事件桥接到 focus 特效系统。
 * hoverOut 和 click 都延迟一帧（rAF），确保引擎内部 interaction 状态已更新后再读取。
 */
function installFocusEventBridge() {
    if (removeFocusEventBridge) return;
    const eventHandle = engine?.eventHandle;
    if (!eventHandle) return;

    const handleHover = (result: any) => {
        const target = satelliteFocusTargets.get(result?.entityId);
        if (!target) return;
        showFocusFeatures(target.sat, target.satelliteName, target.colorIndex);
    };
    const handleHoverOut = (result: any) => {
        const target = satelliteFocusTargets.get(result?.entityId);
        if (!target) return;
        requestAnimationFrame(() => syncFocusFeatures(target.sat, target.satelliteName, target.colorIndex));
    };
    const handleClick = (result: any) => {
        const target = satelliteFocusTargets.get(result?.entityId);
        if (!target) return;
        requestAnimationFrame(() => {
            syncFocusFeatures(target.sat, target.satelliteName, target.colorIndex);
            pruneInactiveFocus(target.sat);
        });
    };
    const handleDoubleClick = (result: any) => {
        const target = satelliteFocusTargets.get(result?.entityId);
        if (!target) return;
        requestAnimationFrame(() => {
            exitFollow();
            followedSat = target.sat;
            followedSatName = target.satelliteName;
            showFocusFeatures(target.sat, target.satelliteName, target.colorIndex);
            pruneInactiveFocus(target.sat);
            const entity = getSatelliteEntity(target.sat);
            if (entity) {
                entity.activated = true;
                engine?.camera?.followTarget(entity, { view: { distance: 50000, pitchDeg: -30, headingDeg: 0 } });
            }
            updateFollowedSatInfo();
            if (engine) {
                removeFollowTickListener = engine.onTick(() => updateFollowedSatInfo());
            }
        });
    };

    eventHandle.addHoverSpaceEntityListener(handleHover);
    eventHandle.addHoverOutSpaceEntityListener(handleHoverOut);
    eventHandle.addClickSpaceEntityListener(handleClick);
    eventHandle.addDoubleClickSpaceEntityListener(handleDoubleClick);
    removeFocusEventBridge = () => {
        eventHandle.removeHoverSpaceEntityListener(handleHover);
        eventHandle.removeHoverOutSpaceEntityListener(handleHoverOut);
        eventHandle.removeClickSpaceEntityListener(handleClick);
        eventHandle.removeDoubleClickSpaceEntityListener(handleDoubleClick);
    };
}

/**
 * 解析紧凑格式星历文本。
 * 格式：非数字开头行 = 卫星名；数字开头行 = 采样（timeMs x y z，空格分隔）。
 */
function parseCompactEphemeris(text: string): ParsedSatellite[] {
    const lines = String(text ?? "").replace(/\r/g, "").split("\n");
    const result: ParsedSatellite[] = [];
    let current: ParsedSatellite | null = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        const firstToken = line.split(/\s+/, 1)[0];
        const firstNumber = Number(firstToken);
        const isSampleLine = Number.isFinite(firstNumber) && /^\d/.test(firstToken);

        if (!isSampleLine) {
            // 非数字开头行视为新卫星名
            current = { name: line, samples: [] };
            result.push(current);
            continue;
        }

        if (!current) continue;

        const parts = line.split(/\s+/);
        if (parts.length < 4) continue;

        const timeMs = Number(parts[0]);
        const xKm = Number(parts[1]);
        const yKm = Number(parts[2]);
        const zKm = Number(parts[3]);
        if (![timeMs, xKm, yKm, zKm].every(Number.isFinite)) continue;

        current.samples.push({ timeMs, xKm, yKm, zKm });
    }

    return result.filter((sat) => sat.samples.length > 0);
}

/** 统计全部卫星的采样总数、最大采样间隔、首尾时间 */
function computeEphemerisStats(records: ParsedSatellite[]) {
    let totalSamples = 0;
    let maxStepSeconds = 0;
    let minTime = Number.POSITIVE_INFINITY;
    let maxTime = Number.NEGATIVE_INFINITY;

    for (const record of records) {
        totalSamples += record.samples.length;
        for (let index = 1; index < record.samples.length; index += 1) {
            const stepSeconds = (record.samples[index].timeMs - record.samples[index - 1].timeMs) / 1000;
            if (Number.isFinite(stepSeconds)) {
                maxStepSeconds = Math.max(maxStepSeconds, stepSeconds);
            }
        }
        for (const sample of record.samples) {
            if (Number.isFinite(sample.timeMs)) {
                minTime = Math.min(minTime, sample.timeMs);
                maxTime = Math.max(maxTime, sample.timeMs);
            }
        }
    }

    return {
        totalSamples,
        maxStepSeconds,
        minTime,
        maxTime,
    };
}

/**
 * 将卫星采样转换为 TrajectorySample。
 * 使用 INERTIAL（ECI/TEME）参考系 + 线性插值，坐标单位 km → m。
 */
function buildTrajectory(samples: ParsedSample[]) {
    const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.INERTIAL, {
        interpolationAlgorithm: "LINEAR",
        interpolationDegree: 1,
        computeBackend: "auto",
    });

    trajectory.pushData(samples.map((sample) => ({
        time: Daisy.JulianDate.fromDate(new Date(sample.timeMs)),
        position: Daisy.Cartesian3.fromElements(sample.xKm * 1000, sample.yKm * 1000, sample.zKm * 1000),
    })));

    return trajectory;
}

/** 添加时间轴、控制面板、仿真时间显示等基准测试 Widget（不含帧率监控） */
function addBenchmarkWidgets() {
    engine.addWidget(new Daisy.TimelineWidget());
    engine.addWidget(new Daisy.ControlPanelWidget({
        mode: "standard",
        preset: "rightTop",
        layout: "row",
        draggable: true,
    }));
    engine.addWidget(new Daisy.SimulationTimeDisplayWidget({
        widgetOptions: {
            preset: "rightBottom",
            offset: { x: 14, y: 24 },
            theme: "dark",
            radius: "2xl",
            title: "SIM TIME",
            backgroundOpacity: 0.7,
            borderOpacity: 0.25,
            className: "text-[15px]",
            timeLabel: {
                preset: "date-time-ms",
            },
        },
    }));
}

/** 等待下一帧，分批创建卫星时插帧用，避免长时间占用主线程 */
function waitNextFrame() {
    return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

async function loadAndBuild() {
    loading = true;
    errorText = "";
    statusText = "读取星历文件...";
    satelliteCount = 0;
    sampleCount = 0;
    firstSampleTime = "";
    lastSampleTime = "";
    maxSampleStepText = "";

    clearSatellites();

    try {
        // 开启高性能模式：将实体更新和可见性检测分组到多帧执行，降低每帧负载
        engine.setHighPerformanceMode({
            enabled: true,
            visibilityCheckGroups: 24,
            keepFeatureTypes: ["PointFeature", "UI_TextFeature", "ImageFeature"],
        });
        installFocusEventBridge();

        const startTime = Daisy.JulianDate.fromDate(new Date(WINDOW_START_ISO));
        const endTime = Daisy.JulianDate.fromDate(new Date(WINDOW_END_ISO));
        engine.setSceneTime(startTime, endTime, true);
        engine.setCurrentTime(Daisy.JulianDate.addHours(startTime, 2, new Daisy.JulianDate()));
        engine.setMultiplier(1);
        engine.setLoop(true);
        engine.play();
        addBenchmarkWidgets();

        const response = await fetch(DATA_URL, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`无法读取 ${DATA_URL}: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        const records = parseCompactEphemeris(text);
        if (records.length === 0) {
            throw new Error("星历文件为空或格式不正确");
        }

        satelliteCount = records.length;
        const stats = computeEphemerisStats(records);
        sampleCount = stats.totalSamples;
        maxSampleStepText = stats.maxStepSeconds > 0 ? `${stats.maxStepSeconds.toLocaleString()}s` : "";
        if (!Number.isFinite(stats.minTime) || !Number.isFinite(stats.maxTime)) {
            throw new Error("星历采样时间无效");
        }

        firstSampleTime = new Date(stats.minTime).toISOString();
        lastSampleTime = new Date(stats.maxTime).toISOString();
        engine.setSceneTime(
            Daisy.JulianDate.fromDate(new Date(stats.minTime)),
            Daisy.JulianDate.fromDate(new Date(stats.maxTime)),
            true,
        );
        engine.setCurrentTime(Daisy.JulianDate.fromDate(new Date(stats.minTime)));

        statusText = `正在创建 ${records.length} 颗卫星...`;

        // 分批创建卫星，每 BATCH_SIZE 颗插帧一次，避免页面冻结
        for (let index = 0; index < records.length; index += 1) {
            const record = records[index];
            const trajectory = buildTrajectory(record.samples);
            const sat = new Daisy.PW.Satellite({
                name: record.name,
                enableSpg4Propagation: false,
                autoOrientationByVelocity: false,
                trajectory: false,
                point: {
                    pixelSize: 6,
                    color: pickColor(index),
                    outlineColor: Daisy.Color.BLACK.withAlpha(0.35),
                    outlineWidth: 1.25,
                },
            });

            sat.position = trajectory as any;
            sat.bindEngine(engine);
            registerSatelliteFocusTarget(sat, record.name, index);
            satellites.push(sat);

            if ((index + 1) % BATCH_SIZE === 0) {
                statusText = `已创建 ${index + 1}/${records.length} 颗卫星`;
                __log?.(`[Starlink] ${statusText}`);
                await waitNextFrame();
            }
        }

        statusText = `完成：${records.length} 颗卫星 / ${sampleCount} 个采样点`;
        __log?.(`[Starlink] ${statusText}`);

        // 数据加载完成后再挂载帧率监控，避免初始化阶段的低帧率干扰基准数据
        engine.addWidget(new Daisy.FrameRateWidget());
    } catch (error) {
        errorText = error instanceof Error ? error.message : String(error);
        statusText = "加载失败";
        __log?.(`[Starlink][ERROR] ${errorText}`);
    } finally {
        loading = false;
    }
}

onMount(() => {
    void loadAndBuild();
});

onDestroy(() => {
    exitFollow();
    removeFocusEventBridge?.();
    removeFocusEventBridge = undefined;
    clearSatellites();
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="Starlink 大型星座">
        <div class="title-row">
            <div>
                <div class="title">Starlink 大型星座</div>
                <div class="subtitle">Daisy.PW.Satellite + hover 轨迹线 + 预生成 TEME 星历</div>
            </div>
            <button class="action" onclick={loadAndBuild}>重建</button>
        </div>

        <div class="meta">
            <div>文件: <code>{DATA_URL}</code></div>
            <div>窗口: {WINDOW_START_ISO} ~ {WINDOW_END_ISO}</div>
            <div>卫星: {satelliteCount.toLocaleString()} | 采样点: {sampleCount.toLocaleString()}</div>
            <div>最大采样间隔: {maxSampleStepText || "—"}</div>
            <div>首尾采样: {firstSampleTime || "—"} ~ {lastSampleTime || "—"}</div>
        </div>

        <div class="status">{statusText}</div>

        {#if errorText}
            <div class="error">{errorText}</div>
        {/if}

        {#if loading}
            <div class="loading-bar"><div class="loading-fill"></div></div>
        {/if}
    </DemoPanel>

    {#if followedSat}
        <div class="follow-panel">
            <div class="follow-title">{followedSatName}</div>
            <div class="follow-grid">
                <div class="follow-label">经度</div>
                <div class="follow-value">{followedSatInfo.lon}</div>
                <div class="follow-label">纬度</div>
                <div class="follow-value">{followedSatInfo.lat}</div>
                <div class="follow-label">高度</div>
                <div class="follow-value">{followedSatInfo.alt}</div>
                <div class="follow-label">速度</div>
                <div class="follow-value">{followedSatInfo.speed}</div>
            </div>
            <button class="follow-exit" onclick={exitFollow}>退出跟踪</button>
        </div>
    {/if}

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
        color: var(--ds-overlay-accent-warm);
        margin-bottom: 2px;
    }

    .subtitle {
        font-size: 12px;
        color: var(--ds-overlay-text-muted);
    }

    .action {
        cursor: pointer;
        border: 1px solid var(--ds-overlay-accent-warm-border);
        background: var(--ds-overlay-accent-warm-muted);
        color: var(--ds-overlay-accent-warm);
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 600;
    }

    .meta {
        display: grid;
        gap: 5px;
        font-size: 12px;
        color: var(--panel-text-bright);
        line-height: 1.45;
    }

    .meta code {
        color: var(--panel-accent);
        background: rgba(255, 255, 255, 0.06);
        padding: 1px 4px;
        border-radius: 4px;
    }

    .status {
        margin-top: 10px;
        font-size: 12px;
        color: #9fe4b5;
    }

    .error {
        margin-top: 8px;
        font-size: 12px;
        color: #ff98a8;
        line-height: 1.45;
    }

    .loading-bar {
        margin-top: 10px;
        height: 4px;
        border-radius: 999px;
        overflow: hidden;
        background: rgba(255, 255, 255, 0.08);
    }

    .loading-fill {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(34, 211, 238, 0.2), rgba(34, 211, 238, 1), rgba(255, 216, 102, 0.8));
        animation: loading-move 1.1s linear infinite;
        transform-origin: left center;
    }

    @keyframes loading-move {
        0% { transform: translateX(-35%); }
        100% { transform: translateX(35%); }
    }

    .follow-panel {
        position: absolute;
        right: 16px;
        bottom: 80px;
        width: min(20rem, calc(100vw - 32px));
        pointer-events: auto;
        color: var(--panel-text);
        background: rgba(5, 12, 20, 0.82);
        border: 1px solid rgba(110, 177, 255, 0.22);
        border-radius: 14px;
        padding: 14px 14px 12px;
        backdrop-filter: blur(14px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32);
    }

    .follow-title {
        font-size: 15px;
        font-weight: 700;
        color: var(--panel-accent);
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .follow-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 4px 12px;
        font-size: 12px;
        line-height: 1.6;
    }

    .follow-label {
        color: var(--panel-text-muted);
    }

    .follow-value {
        color: var(--panel-text);
        font-variant-numeric: tabular-nums;
    }

    .follow-exit {
        display: block;
        width: 100%;
        margin-top: 12px;
        cursor: pointer;
        border: 1px solid rgba(255, 152, 168, 0.34);
        background: rgba(255, 152, 168, 0.12);
        color: #ff98a8;
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 600;
        transition: background 0.15s;
    }

    .follow-exit:hover {
        background: rgba(255, 152, 168, 0.24);
    }
</style>
