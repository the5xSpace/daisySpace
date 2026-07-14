<script lang="ts">
// =============================================================================
// 飞行航路演示 — 北京→上海 飞行航线 + 飞行器跟踪
//
// 本示例演示：
// 1. 创建 RouteComponent 在地球上绘制一条带航点的飞行航路
// 2. 使用 PolylineFeature（而非 Cesium 原生折线）绘制航路连线
// 3. 创建飞行器实体并通过引擎相机持续跟踪
// 4. 每个航点支持：图标、标题/副标题标签、鼠标悬停弹窗
//
// 关键 API：
// - Daisy.PW.RouteComponent: 航路组件
// - Daisy.PW.Aircraft: 带运动能力的飞行器
// - RouteWaypoint: { position, label, subtitle, icon, popoverContent }
// - engine.camera.followTarget(): 引擎相机实体跟踪
// - PolylineFeature: SDK 折线要素（支持贴地/大圆弧/动态目标追踪）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;
const JD = Daisy.JulianDate;

// ── 1. 场景设置 ──────────────────────────────────────────────────
const now = JD.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = JD.addHours(now, -1, new JD());
const stop = JD.addHours(now, 3, new JD());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(10);
// Add fog for altitude perception — makes ground look distant
engine.geoLayer.setFog({ enabled: true, density: 8.0e-5, screenSpaceErrorFactor: 6000 });
engine.play();

// ArcGIS 卫星影像
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
});

// 添加控制面板
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "lite",
    preset: "rightTop",
    layout: "row",
    draggable: true,
}));

// ── 2. 定义航路点 ──────────────────────────────────────────────────
// 模拟一次战斗机任务航线：机场起飞 → 巡逻区 → 目标区域 → 返航
const waypoints = [
    {
        position: C3.fromDegrees(116.4, 39.9, 0),
        label: "北京",
        subtitle: "首都国际机场 · 起飞",
        icon: "",  // 使用默认图标
        popoverContent: `
            <div style="display:grid;gap:4px;font-size:12px">
                <div style="display:flex;gap:8px">
                    <span style="color:var(--panel-text-muted)">ICAO:</span>
                    <span>ZBAA</span>
                </div>
                <div style="display:flex;gap:8px">
                    <span style="color:var(--panel-text-muted)">IATA:</span>
                    <span>PEK</span>
                </div>
                <div style="display:flex;gap:8px">
                    <span style="color:var(--panel-text-muted)">海拔:</span>
                    <span>35m</span>
                </div>
                <div style="display:flex;gap:8px">
                    <span style="color:var(--panel-text-muted)">跑道:</span>
                    <span>18L/36R · 18R/36L</span>
                </div>
            </div>
        `,
    },
    {
        position: C3.fromDegrees(118.5, 38.2, 0),
        label: "济南",
        subtitle: "ALPHA 巡逻区 · 高度 8000m",
        popoverContent: `
            <div style="display:grid;gap:4px;font-size:12px">
                <div>📡 进入 ALPHA 巡逻空域</div>
                <div style="color:var(--panel-text-muted)">航线: JN-01A</div>
                <div style="color:var(--panel-text-muted)">速度: 720 km/h</div>
            </div>
        `,
    },
    {
        position: C3.fromDegrees(120.8, 31.5, 0),
        label: "上海",
        subtitle: "BRAVO 目标区 · 高度 10000m",
        popoverContent: `
            <div style="display:grid;gap:4px;font-size:12px">
                <div>🎯 抵达目标区域</div>
                <div style="color:var(--panel-text-muted)">任务: 区域侦察</div>
                <div style="color:var(--panel-text-muted)">高度: 10000m</div>
                <div style="color:var(--panel-text-muted)">速度: 850 km/h</div>
            </div>
        `,
    },
    {
        position: C3.fromDegrees(121.5, 29.8, 0),
        label: "舟山",
        subtitle: "CHARLIE 转折点 · 高度 6000m",
        popoverContent: `
            <div style="display:grid;gap:4px;font-size:12px">
                <div>🔄 转向返航</div>
                <div style="color:var(--panel-text-muted)">航向: 340°</div>
                <div style="color:var(--panel-text-muted)">燃油余量: 46%</div>
            </div>
        `,
    },
];

// ── 3. 创建 FreeObject 作为 RouteComponent 的宿主 ──────────────────
const hostObject = new Daisy.PW.FreeObject({
    name: "Route-Host",
    position: C3.fromDegrees(0, 0, 0), // 占位，RouteComponent 会创建自己的航点实体
    point: false,
    label: false,
    path: false,
});
hostObject.bindEngine(engine);

// ── 4. 创建并挂载 RouteComponent（贝塞尔曲线 + 动态发光材质） ──
const routeComponent = new Daisy.PW.RouteComponent({
    waypoints,
    lineWidth: 3,
    material: Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: .5, arrowSize: 24 }),
    curveType: "bezier",
    bezierTension: 30,
    showLine: true,
    showLabels: true,
    showIcons: true,
    outline: false
,
    iconScale: 1.2,
    labelFont: "bold 13px sans-serif",
    labelColor: Color.WHITE,
    popoverTrigger: "hover",
    labelOffsetY: -36,
});
hostObject.addComponent(routeComponent);

// ── 5. 创建飞行器轨迹（与航路显示完全一致的贝塞尔密集采样） ──
// 使用与 RouteComponent 相同的贝塞尔曲线算法生成密集点列，


// `使用 PathBuilder 构建轨迹`
const SEG_SAMPLES = 30;
const trajectory = new Daisy.PathBuilder()
    .fromWaypoints(waypoints.map(wp => wp.position))
    .bezier(30, SEG_SAMPLES)
    .setAltitudeProfile({
        segmentAltitudes: [6000, 9000, 5000],
        groundAltitude: 100,
    })
    .buildTrajectory(start, stop);


// ── 6. 创建飞行器并跟踪 ──────────────────────────────────────────
const aircraft = new Daisy.PW.Aircraft({
    name: "BJ-SH-Flight",
    model: {
        url: Daisy.BuildModuleUrl.getUrl("models/GlobalHawk.glb"),
        minimumPixelSize: 100,
        maximumScale: 3000,
    },
    path: {
        show: true,
        width: 2,
        color: Daisy.Color.ORANGE.withAlpha(0.45),
        historyColor: Daisy.Color.ORANGE.withAlpha(0.85),
        futureColor: Daisy.Color.CYAN.withAlpha(0.55),
        historySecond: 14400,
        futureSecond: 14400,
        resolutionSecond: 10,
        maxDirectionInterpolationCount: 3000,
    },
    point: false,
    label: {
        text: "✈ 航班 BJ-SH",
        font: "bold 13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -24),
        showBackground: true,
        backgroundColor: Daisy.Color.BLACK.withAlpha(0.45),
        backgroundPadding: new Daisy.Cartesian2(7, 5),
    },
});
aircraft.position = trajectory;
aircraft.orientation = trajectory.getVelocityOrientation();
aircraft.bindEngine(engine);

// 引擎相机持续跟踪飞行器（ArcRotate 模式 — 近距观察）
engine.camera.followTarget(aircraft, {
    view: {
        headingDeg: 0,
        pitchDeg: -25,
        distance: 200000,
    },
});

// ── 6. 时间轴 ──────────────────────────────────────────
engine.addWidget(new Daisy.TimelineWidget());

// ── 7. 实时飞行数据 ──────────────────────────────────────────
let showRouteLine = $state(true);
let curvatureDeg = $state(30);
let _lastPos: any;
let flightInfo = $state({ lat: 0, lon: 0, alt: 0, speed: 0, remainingKm: 0, altAgl: 0, time: "" });

function toggleRouteLine() {
    showRouteLine = !showRouteLine;
    routeComponent.setShowLine?.(showRouteLine);
}

$effect(() => {
    const iv = setInterval(() => {
        const pos = aircraft.getCurrentPosition?.();
        if (pos) {
            const carto = Daisy.Cartographic.fromCartesian(pos);
            flightInfo.lat = Daisy.Math.toDegrees(carto.latitude);
            flightInfo.lon = Daisy.Math.toDegrees(carto.longitude);
            flightInfo.alt = Math.round(carto.height);
            // Approximate ground altitude from terrain (use 0 as baseline since terrain varies)
            flightInfo.altAgl = Math.round(Math.max(0, carto.height - 0));
            // Speed from distance delta (approx using 200ms interval)
            if (typeof _lastPos !== "undefined" && _lastPos) {
                const dx = Daisy.Cartesian3.distance(pos, _lastPos);
                flightInfo.speed = Math.round(dx * 5); // 200ms * 5 = 1s
            }
            _lastPos = Daisy.Cartesian3.clone(pos);
        }
        const t = engine.getCurrentTime?.();
        if (t) {
            const d = Daisy.JulianDate.toDate(t);
            flightInfo.time = d.toTimeString().slice(0, 8);
        }
        // Update aircraft label with current altitude
        try {
            const altKm = (flightInfo.alt / 1000).toFixed(1);
            aircraft.label?.setText?.('✈ BJ-SH  ' + altKm + 'km');
        } catch {}
    }, 200);
    return () => clearInterval(iv);
});

// Revuild trajectory when curvature changes
$effect(() => {
    const deg = curvatureDeg;

    
    const newTrajectory = new Daisy.PathBuilder()
        .fromWaypoints(waypoints.map(wp => wp.position))
        .bezier(deg, SEG_SAMPLES)
        .setAltitudeProfile({
            segmentAltitudes: [6000, 9000, 5000],
            groundAltitude: 100,
        })
        .buildTrajectory(start, stop);
    aircraft.position = newTrajectory;
    aircraft.orientation = newTrajectory.getVelocityOrientation();
    try { routeComponent.setBezierTension?.(deg); } catch {}
});

// ── 7. 清理 ──────────────────────────────────────────────────────
registerCleanup?.(() => {
    try { hostObject.destroy(); } catch {}
    try {
        engine.camera.removeTrackedDaisyEntity?.();
        aircraft.destroy();
    } catch {}
});

__log?.("飞行航路演示已启动：北京→上海 航路 + 飞行器跟踪");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="✈ 飞行航路">
    <div class="title-row">
        <div>
            <div class="title">✈ 飞行航路</div>
            <div class="subtitle">北京→上海 · {waypoints.length} 个航点 · 飞行器跟踪</div>
        </div>
        <span class="badge">航路+跟踪</span>
    </div>

    <div class="waypoint-list">
        {#each waypoints as wp, i}
            <div class="waypoint-item">
                <div class="wp-index">{i + 1}</div>
                <div class="wp-info">
                    <div class="wp-label">{wp.label || "航点"}</div>
                    <div class="wp-sub">{wp.subtitle || ""}</div>
                </div>
            </div>
        {/each}
    </div>

    <div class="slider-group">
        <div class="slider-header">
            <span class="data-label">飞线曲率</span>
            <span class="data-value" style="min-width:32px;text-align:right">{curvatureDeg}°</span>
        </div>
        <input type="range" min="5" max="40" value={curvatureDeg}
            oninput={(e) => curvatureDeg = parseInt(e.currentTarget.value)}
            class="curvature-slider" />
        <div class="slider-labels">
            <span>5° 平直</span>
            <span>40° 陡拱</span>
        </div>
    </div>

    <button class="toggle-btn" onclick={() => toggleRouteLine()}>
        <span class="toggle-indicator" class:toggle-indicator--off={!showRouteLine}></span>
        {showRouteLine ? "显示" : "隐藏"}航路连线
    </button>

    <div class="flight-data">
        <div class="section-title">实时飞行数据</div>
        <div class="data-grid">
            <span class="data-label">纬度</span>
            <span class="data-value">{flightInfo.lat.toFixed(4)}°N</span>
            <span class="data-label">经度</span>
            <span class="data-value">{flightInfo.lon.toFixed(4)}°E</span>
            <span class="data-label">高度 (MSL)</span>
            <span class="data-value">{flightInfo.alt.toLocaleString()} m</span>
            <span class="data-label">对地高度 (AGL)</span>
            <span class="data-value">{flightInfo.altAgl.toLocaleString()} m</span>
            <span class="data-label">地速</span>
            <span class="data-value">{flightInfo.speed.toLocaleString()} m/s</span>
            <span class="data-label">场景时间 (UTC)</span>
            <span class="data-value">{flightInfo.time}</span>
        </div>
    </div>

    <div class="aircraft-info">
        <div class="section-title">跟踪状态</div>
        <div class="track-status">
            <span class="track-dot"></span>
            引擎相机 ArcRotate 持续跟踪飞行器
        </div>
    </div>

    <div class="legend">
        <div class="section-title">图例</div>
        <div class="legend-grid">
            <span class="legend-item">
                <span class="dot glow-dot"></span>航路（{showRouteLine ? "显示" : "隐藏"}）
            </span>
            <span class="legend-item">
                <span class="dot-icon">📌</span>航点
            </span>
            <span class="legend-item">
                <span class="dot-icon">🟠</span>飞行器（GlobalHawk）
            </span>
            <span class="legend-item">
                <span class="dot" style="background:#fbbf24"></span>飞行轨迹 Path
            </span>
        </div>
    </div>

    <div class="footer">
        贝塞尔 {30}° · PolylineGlow · GlobalHawk · TrajectorySample
    </div>
</DemoPanel>

<style>
.title-row {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 12px;
        margin-bottom: 12px;
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

    .badge {
        flex: 0 0 auto;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(34, 211, 238, 0.15);
        color: var(--panel-accent);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.05em;
    }

    .waypoint-list {
        display: grid;
        gap: 6px;
        margin-bottom: 12px;
    }

    .waypoint-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 10px;
        border-radius: 8px;
        background: var(--panel-bg-card);
        border: 1px solid var(--panel-border);
        transition: background 0.15s;
    }
    .waypoint-item:hover {
        background: rgba(34, 211, 238, 0.08);
    }

    .wp-index {
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(34, 211, 238, 0.15);
        color: var(--panel-accent);
        font-size: 11px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .wp-info {
        flex: 1;
        min-width: 0;
    }

    .wp-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--panel-text);
    }

    .wp-sub {
        font-size: 11px;
        color: var(--panel-text-muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .section-title {
        font-size: 11px;
        color: var(--panel-text-muted);
        margin-bottom: 6px;
        font-weight: 600;
        letter-spacing: 0.03em;
    }


    .flight-data {
        margin-bottom: 10px;
    }
    .data-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2px 10px;
        padding: 6px 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--panel-border);
        font-size: 12px;
    }
    .data-label {
        color: var(--panel-text-muted);
    }
    .data-value {
        color: var(--panel-text);
        text-align: right;
        font-variant-numeric: tabular-nums;
    }

    .toggle-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 7px 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        border: 1px solid var(--panel-border);
        background: var(--panel-bg-card);
        color: var(--panel-text-muted);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.15s;
    }
    .toggle-btn:hover {
        background: rgba(34, 211, 238, 0.1);
        border-color: rgba(34, 211, 238, 0.3);
        color: var(--panel-text-bright);
    }
    .toggle-indicator {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #22d3ee;
        box-shadow: 0 0 6px rgba(34, 211, 238, 0.5);
        transition: all 0.2s;
    }
    .toggle-indicator--off {
        background: var(--panel-border);
        box-shadow: none;
    }

    .aircraft-info {
        margin-bottom: 10px;
    }
    .track-status {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 8px;
        font-size: 12px;
        color: #fbbf24;
        background: rgba(251, 191, 36, 0.08);
        border: 1px solid rgba(251, 191, 36, 0.15);
    }
    .track-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #fbbf24;
        box-shadow: 0 0 6px rgba(251, 191, 36, 0.6);
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.15); }
    }

    .legend {
        margin-bottom: 10px;
    }
    .legend-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        color: var(--panel-text-bright);
    }
    .dot {
        display: inline-block;
        width: 10px;
        height: 3px;
        border-radius: 2px;
    }
    .glow-dot {
        background: #22d3ee;
        box-shadow: 0 0 6px #22d3ee;
        animation: glow-pulse 2s ease-in-out infinite;
    }
    @keyframes glow-pulse {
        0%, 100% { box-shadow: 0 0 4px #22d3ee; }
        50% { box-shadow: 0 0 10px #22d3ee, 0 0 16px rgba(34, 211, 238, 0.3); }
    }
    .dot-icon {
        font-size: 12px;
    }

    .footer {
        padding-top: 10px;
        border-top: 1px solid var(--panel-border);
        font-size: 11px;
        color: var(--panel-text-muted);
        text-align: center;
    }
</style>
