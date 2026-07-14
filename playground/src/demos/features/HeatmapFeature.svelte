<script>
// =============================================================================
// HeatmapFeature Demo — 热力覆盖图
//
// 本示例演示如何使用 HeatmapFeature 将 CoverageGrid 渲染为热力图叠加在地球表面：
// 1. 加载人口密度数据（population-points.json）作为热力点源
// 2. 加载陆地边界 GeoJSON（ne_110m_land.geojson）作为遮罩
// 3. 自定义色标和透明度
//
// 关键 API：
// - new Daisy.HeatmapFeature({ grid, colorScheme, colors, masks, opacity })
//   - grid.points: 点数组 [{ x: 经度, y: 纬度, value: 权重 }]
//   - grid.region: { westLon, southLat, eastLon, northLat }
//   - grid.spread: 扩散半径（度）
//   - colorScheme: "custom" 使用自定义色标
//   - masks: [{ geojson, type: "hideOutside" }] 遮罩区域
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(1);
engine.play();

const region = { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 };

const CUSTOM_COLORS = [
    Daisy.Color.BLUE,
    Daisy.Color.CYAN,
    Daisy.Color.GREEN,
    Daisy.Color.YELLOW,
    Daisy.Color.ORANGE,
    Daisy.Color.RED,
    Daisy.Color.PURPLE,
    new Daisy.Color(0.15, 0.00, 0.15),
];

let destroyed = false;
let entity = null;
registerCleanup(() => { destroyed = true; if (entity) entity.destroy(); });
const ac = new AbortController();

Promise.all([
    fetch("data/population-points.json", { signal: ac.signal }).then(r => r.json()),
    fetch("data/ne_110m_land.geojson", { signal: ac.signal }).then(r => r.json()),
]).then(([points, landGeoJSON]) => {
    if (destroyed) return;
    entity = new Daisy.Entity("heatmap-entity");
    entity.position = Daisy.Cartesian3.fromDegrees(0, 0, 0);
    entity.bindEngine(engine);
    entity.addFeature(new Daisy.HeatmapFeature({
        grid: {
            points,
            region,
            spread: 4,
        },
        colorScheme: "custom",
        colors: CUSTOM_COLORS,
        masks: [{ geojson: landGeoJSON, type: "hideOutside" }],
        opacity: 0.7,
    }));
    engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(0, 10, 25000000));
    __log?.("世界人口密度 (" + points.length + "个城市, spread=4°)");
})
.catch(err => { if (!destroyed) __log?.("数据加载失败:", err.message); });
</script>

<div class="panel">
    <div class="head">
        <div class="eyebrow">Heatmap Feature</div>
        <h2>世界人口密度</h2>
    </div>
    <div class="info">3089 个城市 | 全球 | spread=4° | 陆地遮罩</div>
</div>

<style>
    .panel {
        position: absolute; top: 18px; left: 18px; z-index: 8;
        width: 260px; padding: 14px;
        border: 1px solid var(--ds-overlay-border); border-radius: 8px;
        background: var(--ds-overlay-bg);
        color: var(--ds-overlay-text); font-family: "Segoe UI","Microsoft YaHei",sans-serif;
        backdrop-filter: blur(12px);
    }
    .head { margin-bottom: 8px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 16px; line-height: 1.2; }
    .info { margin-top: 6px; font-size: 11px; color: var(--ds-overlay-text-label); }
</style>
