<script>
// =============================================================================
// Terrain.svelte - 地形切换 Demo
// -----------------------------------------------------------------------------
// 本文件演示不同地形数据源的切换：
//   - Custom: 程序化生成地形（自定义高程数据）
//   - ArcGis: ArcGIS 地形服务
//   - CesiumIon: Cesium Ion 地形服务
//   - Ellipsoid: 椭球体（无高程，平面地球）
//
// 关键 API：
//   - engine.geoLayer.setTerrain(config)
//     · config.type: Daisy.GeoTerrainType.Custom | ArcGis | CesiumIon | Ellipsoid
//     · config.provider: CustomHeightmapTerrainProvider（仅 Custom 类型需要）
//   - new Daisy.CustomHeightmapTerrainProvider({ width, height, callback })
//     · width/height: 高程网格尺寸
//     · callback(x, y, level): 返回 Float32Array 高程数据
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化时间与场景 ─────────────────────────────────────────────────────────
// 设置时间范围，10 倍速播放
const now = Daisy.JulianDate.now();
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(10);
engine.play();

// ── 2. 程序化地形生成器 ─────────────────────────────────────────────────────────
// createProceduralTerrain: 创建自定义地形提供者
// CustomHeightmapTerrainProvider: 自定义高程图地形提供者
//   width/height: 每个瓦片的高程网格尺寸（64x64）
//   callback(x, y, level): 回调函数，返回高程数据
//     x, y: 瓦片坐标
//     level: 缩放级别
//     返回值: Float32Array，高程值数组（单位：米）
function createProceduralTerrain() {
    return new Daisy.CustomHeightmapTerrainProvider({
        width: 64, height: 64,
        callback: (x, y, level) => {
            const size = 64;
            const heights = new Float32Array(size * size);
            const n = Math.pow(2, level);
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    // 将瓦片坐标转换为经纬度
                    const lon = (x + col / (size - 1)) * (180 / n) - 180;
                    const lat = (y + row / (size - 1)) * (180 / n) - 90;
                    // 使用多个正弦波叠加生成地形
                    const h = Math.sin(lon * 0.4 + lat * 0.3) * 420000
                        + Math.sin(lon * 0.8 - lat * 0.6 + 1.5) * 200000
                        + Math.cos(lon * 1.5 + lat * 1.2) * 115000;
                    heights[row * size + col] = Math.max(0, h);  // 确保非负
                }
            }
            return heights;
        },
    });
}

// ── 3. 设置初始地形 ─────────────────────────────────────────────────────────
// setTerrain: 设置地形数据源
// GeoTerrainType.Custom: 自定义地形，需要提供 provider
engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Custom, provider: createProceduralTerrain() });

// ── 4. 相机定位 ─────────────────────────────────────────────────────────
// setView: 直接设置相机位置（无动画）
engine.camera.setView({
    destination: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 3500000),  // 北京上空 3500km
    orientation: { heading: Daisy.Math.toRadians(-30), pitch: Daisy.Math.toRadians(-50), roll: 0 },
});

// ── 5. 地形切换函数 ─────────────────────────────────────────────────────────
// setProcedural: 程序化生成地形（自定义高程数据）
function setProcedural() {
    engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Custom, provider: createProceduralTerrain() });
    __log("已切换为程序化地形");
}

// setArcGIS: ArcGIS 地形服务
function setArcGIS() { engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.ArcGis }); __log("已切换为 ArcGIS 地形"); }

// setCesiumIon: Cesium Ion 地形服务（需要 token）
function setCesiumIon() { engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.CesiumIon }); __log("已切换为 CesiumIon 地形"); }

// setEllipsoid: 椭球体（无高程，平面地球）
function setEllipsoid() { engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid }); __log("已切换为椭球体"); }
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="地形切换" padding="12px" width="210px">
    <div class="panel-head-simple">
        <span class="panel-icon">🏔️</span>
        <span class="panel-title-text">地形切换</span>
    </div>
    <div class="btn-stack">
        <button onclick={setProcedural}>程序生成地形</button>
        <button onclick={setArcGIS}>ArcGIS 地形</button>
        <button onclick={setCesiumIon}>CesiumIon 地形</button>
        <button onclick={setEllipsoid}>椭球体（无高程）</button>
    </div>
</DemoPanel>
<style>
.panel-head-simple {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 10px; padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.panel-icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px;
    background: var(--color-accent-muted);
    font-size: 12px;
}
.panel-title-text {
    font-size: 13px; font-weight: 700;
    color: var(--panel-text-bright);
}
.btn-stack {
    display: flex; flex-direction: column; gap: 6px;
}
button {
    width: 100%; min-height: 30px;
    background: var(--panel-bg-card);
    border: 1px solid var(--panel-border);
    color: var(--panel-text);
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.12s;
}
button:hover { background: var(--color-accent-muted); border-color: var(--color-accent); }
</style>
