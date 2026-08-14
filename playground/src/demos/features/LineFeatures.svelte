<script>
// =============================================================================
// LineFeatures Demo — 线状组件演示
//
// 本示例演示各种线状组件的创建和配置：
// 1. PolylineFeature: 折线组件
// 2. CorridorFeature: 走廊组件
// 3. WallFeature: 墙体组件
// 4. PolylineVolumeFeature: 体积线组件
// 5. ArrowPointerFeature: 箭头指向组件
//
// 关键 API：
// - Daisy.PolylineFeature: 折线组件
//   - pathway: 路径坐标
//   - width: 线宽
//   - material: 材质（颜色/渐变/箭头等）
//   - clampToGround: 是否贴地
//   - arcType: 弧线类型（GEODESIC/RHUMB/NONE）
//   - alwaysOnTop: 是否始终在最上层
// - Daisy.MaterialFactory: 材质工厂
//   - PolylineGlow: 发光材质
//   - PolylineDash: 虚线材质
//   - PolylineArrow: 箭头材质
//   - PolylineArrowPath: 流动箭头路径材质
// - Daisy.CorridorFeature: 走廊组件
// - Daisy.WallFeature: 墙体组件
// - Daisy.PolylineVolumeFeature: 体积线组件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和辅助函数 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const C2 = Daisy.Cartesian2;
const Color = Daisy.Color;
const Material = Daisy.MaterialFactory;

engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();

// 设置基础图层和天空盒
engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
    minLevel: 0,
    maxLevel: 2,
    tilingScheme: "geographic",
});
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.SkyBox, sources: {
    positiveX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/px.png"),
    negativeX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nx.png"),
    positiveY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/py.png"),
    negativeY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/ny.png"),
    positiveZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/pz.png"),
    negativeZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nz.png"),
}});

// p: 创建经纬度坐标
function p(lon, lat, height) {
    return C3.fromDegrees(lon, lat, height || 0);
}

// shapeStar: 生成星形形状（Cartesian2）
function shapeStar(arms, outer, inner) {
    const pts = [];
    const angle = Math.PI / arms;
    for (let i = 0; i < arms * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        pts.push(new C2(Math.cos(i * angle) * r, Math.sin(i * angle) * r));
    }
    return pts;
}

// circleShape: 生成圆形形状（Cartesian2）
function circleShape(radius, segments) {
    const pts = [];
    for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new C2(Math.cos(a) * radius, Math.sin(a) * radius));
    }
    return pts;
}

// 实体管理
const entities = [];
function createEntity(name, lon, lat, height) {
    const e = engine.createEntity(name);
    e.position = p(lon, lat, height || 0);
    entities.push(e);
    return e;
}

// addLine: 添加折线组件
function addLine(entity, name, pathway, options) {
    entity.addFeature(new Daisy.PolylineFeature({
        pathway,
        width: options.width,
        material: options.material,
        clampToGround: options.clampToGround ?? false,
        arcType: options.arcType,
        alwaysOnTop: options.alwaysOnTop,
        depthFailMaterial: options.depthFailMaterial,
        name,
    }));
}

// ── 2. 贴地线材质演示 ──────────────────────────────────────────────
// 贴地 / Rhumb / Glow / Outline / Arrow
const surfaceLines = createEntity("Line-Surface-Materials", -96, 40, 0);
// 贴地线（clampToGround: true）
addLine(surfaceLines, "ground-cyan", C3.fromDegreesArray([-132, 28, -78, 28]), {
    width: 12,
    material: "#66e8ff",
    clampToGround: true,
});
// 等角航线（arcType: RHUMB）
addLine(surfaceLines, "rhumb-green", C3.fromDegreesArray([-132, 31, -78, 34]), {
    width: 11,
    material: "#65f080",
    clampToGround: true,
    arcType: Daisy.ArcType.RHUMB,
});
// 发光线（Material.PolylineGlow）
addLine(surfaceLines, "glow-blue", C3.fromDegreesArray([-132, 37, -78, 37]), {
    width: 18,
    material: Material.PolylineGlow({
        color: "#5c9dff",
        glowPower: 0.28,
        taperPower: 0.55,
    }),
    clampToGround: true,
});
// 轮廓线（Material.PolylineOutline）
addLine(surfaceLines, "outline-orange", C3.fromDegreesArray([-132, 42, -78, 42]), {
    width: 14,
    material: Material.PolylineOutline({
        color: "#ff9f43",
        outlineColor: "#07131f",
        outlineWidth: 5,
    }),
    clampToGround: true,
});
// 箭头线（Material.PolylineArrow）
addLine(surfaceLines, "arrow-purple", C3.fromDegreesArray([-132, 47, -78, 47]), {
    width: 16,
    material: Material.PolylineArrow({
        color: "#c77dff",
        arrowSize: 26,
        direction: "forward",
    }),
    clampToGround: true,
    arcType: Daisy.ArcType.GEODESIC,
});

// ── 3. 虚线谱系 ──────────────────────────────────────────────
// 虚线：不同宽度、间隔色、短虚线和二进制 pattern
const dashLines = createEntity("Line-Dash-Patterns", -2, 40, 0);
const dashRows = [
    { lat: 28, width: 10, color: "#ff6f61", dashLength: 18, pattern: 255 },
    { lat: 32, width: 30, color: "#2f9bff", gapColor: "#ffd166", dashLength: 24, pattern: 255 },
    { lat: 36, width: 11, color: "#ffa94d", dashLength: 8, pattern: 255 },
    { lat: 40, width: 16, color: "#66e8ff", dashLength: 20, pattern: parseInt("110000001111", 2) },
    { lat: 44, width: 16, color: "#f7ff6a", dashLength: 20, pattern: parseInt("1010101010101010", 2) },
];
for (let i = 0; i < dashRows.length; i++) {
    const row = dashRows[i];
    addLine(dashLines, "dash-" + i, C3.fromDegreesArray([-28, row.lat, 26, row.lat + (i % 2) * 1.3]), {
        width: row.width,
        material: Material.PolylineDash({
            color: row.color,
            gapColor: row.gapColor,
            dashLength: row.dashLength,
            dashPattern: row.pattern,
        }),
        clampToGround: true,
        arcType: Daisy.ArcType.GEODESIC,
    });
}

// ── 4. 航路场景 ──────────────────────────────────────────────
// 宽线、流动箭头路径、始终可见线
const airRoutes = createEntity("Line-Air-Routes", 84, 16, 0);
addLine(airRoutes, "air-main", C3.fromDegreesArrayHeights([
    48, 8, 3200000,
    64, 23, 3600000,
    82, 10, 3900000,
    100, 28, 4200000,
    118, 14, 4500000,
]), {
    width: 14,
    material: "#ffa94d",
    arcType: Daisy.ArcType.NONE,
});
addLine(airRoutes, "air-arrow-train", C3.fromDegreesArrayHeights([
    50, 2, 4700000,
    70, 15, 4700000,
    92, 3, 4700000,
    116, 18, 4700000,
]), {
    width: 13,
    material: Material.PolylineArrowPath({
        color: "#8df7ff",
        glowColor: "#ffffff",
        speed: 1.6,
        spacing: 0.18,
        arrowSize: 24,
    }),
    arcType: Daisy.ArcType.NONE,
});
addLine(airRoutes, "air-depth-fail", C3.fromDegreesArrayHeights([
    50, -4, 5200000,
    78, -12, 5200000,
    110, -2, 5200000,
]), {
    width: 10,
    material: "#ffd166",
    depthFailMaterial: Material.PolylineGlow({ color: "#ff6f61", glowPower: 0.45 }),
    alwaysOnTop: true,
    arcType: Daisy.ArcType.NONE,
});

// ── 5. 走廊/墙体/体积线 ──────────────────────────────────────────────
// Corridor / Wall / PolylineVolume
const belts = createEntity("Line-Belts", -96, -20, 0);
belts.addFeature(new Daisy.CorridorFeature({
    pathway: C3.fromDegreesArray([-128, -12, -110, 4, -92, -14, -72, 6, -54, -10]),
    width: 560000,
    material: Color.fromCssColorString("#2a9df4").withAlpha(0.32),
    outline: true,
    outlineColor: "#b5ecff",
    outlineWidth: 2,
    clampToGround: true,
}));
belts.addFeature(new Daisy.CorridorFeature({
    pathway: C3.fromDegreesArray([-128, -26, -110, -8, -92, -30, -72, -6, -54, -24]),
    width: 620000,
    height: 2800000,
    extrudedHeight: 3500000,
    material: Color.fromCssColorString("#18c2ff").withAlpha(0.24),
    outline: true,
    outlineColor: "#18c2ff",
    outlineWidth: 2,
}));

const barriers = createEntity("Line-Walls-Volumes", 64, -40, 0);
barriers.addFeature(new Daisy.WallFeature({
    pathway: C3.fromDegreesArray([32, -38, 48, -28, 66, -42, 84, -26, 104, -40]),
    minimumHeights: [0, 220000, 0, 260000, 0],
    maximumHeights: [1400000, 2100000, 1600000, 2300000, 1500000],
    material: Color.fromCssColorString("#ff6f61").withAlpha(0.32),
    outline: true,
    outlineColor: "#ffb2a8",
    outlineWidth: 2,
}));
barriers.addFeature(new Daisy.PolylineVolumeFeature({
    pathway: C3.fromDegreesArrayHeights([
        34, -56, 900000,
        50, -46, 1200000,
        70, -56, 1300000,
        92, -44, 1100000,
    ]),
    shape: shapeStar(7, 32000, 17000),
    material: Color.fromCssColorString("#aa66ff").withAlpha(0.34),
    outline: true,
    outlineColor: "#d18cff",
    outlineWidth: 1.5,
}));
barriers.addFeature(new Daisy.PolylineVolumeFeature({
    pathway: C3.fromDegreesArrayHeights([
        36, -62, 700000,
        58, -66, 900000,
        86, -60, 780000,
    ]),
    shape: circleShape(36000, 28),
    material: Color.WHITE.withAlpha(0.72),
    outline: true,
    outlineColor: "#66e8ff",
    outlineWidth: 1.5,
}));

// ── 6. 组合对照 ──────────────────────────────────────────────
// 地表折线、悬浮折线、轨带、墙体和体积线的组合对照
const originalRouteA = createEntity("Line-Original-Route-A", -12, 58, 0);
addLine(originalRouteA, "original-ground-wide", C3.fromDegreesArray([
    -58, 54, -36, 44, -12, 57, 10, 45, 32, 59, 56, 48,
]), {
    width: 12,
    material: "#66e8ff",
    clampToGround: true,
    arcType: Daisy.ArcType.GEODESIC,
});
addLine(originalRouteA, "original-ground-accent", C3.fromDegreesArray([
    -58, 49, -35, 61, -8, 47, 18, 62, 44, 50,
]), {
    width: 9,
    material: "#f7ff6a",
    clampToGround: true,
    arcType: Daisy.ArcType.GEODESIC,
});

const originalRouteB = createEntity("Line-Original-Air-B", 82, 58, 0);
addLine(originalRouteB, "original-air-main", C3.fromDegreesArrayHeights([
    48, 50, 3200000,
    64, 62, 3500000,
    82, 50, 3600000,
    100, 64, 3800000,
    118, 52, 4000000,
]), {
    width: 13,
    material: "#ffa94d",
    clampToGround: false,
    arcType: Daisy.ArcType.NONE,
});
addLine(originalRouteB, "original-air-secondary", C3.fromDegreesArrayHeights([
    48, 57, 4300000,
    68, 66, 4300000,
    88, 57, 4300000,
    112, 67, 4300000,
]), {
    width: 11,
    material: "#8df7ff",
    clampToGround: false,
    arcType: Daisy.ArcType.NONE,
});

const originalBelt = createEntity("Line-Original-Belt", -110, -48, 0);
originalBelt.addFeature(new Daisy.CorridorFeature({
    pathway: C3.fromDegreesArray([-138, -48, -122, -34, -106, -50, -88, -32, -70, -46]),
    width: 520000,
    material: Color.fromCssColorString("#2a9df4").withAlpha(0.34),
    outline: true,
    outlineColor: "#b5ecff",
    outlineWidth: 2,
    clampToGround: true,
}));
originalBelt.addFeature(new Daisy.CorridorFeature({
    pathway: C3.fromDegreesArray([-138, -62, -122, -46, -106, -64, -88, -44, -70, -60]),
    width: 560000,
    height: 3200000,
    material: Color.fromCssColorString("#18c2ff").withAlpha(0.26),
    outline: true,
    outlineColor: "#18c2ff",
    outlineWidth: 2,
    clampToGround: false,
}));

const originalWall = createEntity("Line-Original-Wall", -8, -58, 0);
originalWall.addFeature(new Daisy.WallFeature({
    pathway: C3.fromDegreesArray([-34, -56, -16, -46, 2, -60, 20, -44, 38, -57]),
    minimumHeights: [0, 0, 0, 0, 0],
    maximumHeights: [1700000, 2000000, 1800000, 2100000, 1750000],
    material: Color.fromCssColorString("#ff6f61").withAlpha(0.34),
    outline: true,
    outlineColor: "#ff9e94",
    outlineWidth: 2,
}));
originalWall.addFeature(new Daisy.PolylineVolumeFeature({
    pathway: C3.fromDegreesArrayHeights([
        -34, -68, 1000000,
        -16, -58, 1200000,
        4, -68, 1400000,
        26, -56, 1100000,
    ]),
    shape: shapeStar(7, 30000, 16000),
    material: Color.fromCssColorString("#aa66ff").withAlpha(0.34),
    outline: true,
    outlineColor: "#d18cff",
    outlineWidth: 1.5,
}));

// ── 7. 箭头指向线 ──────────────────────────────────────────────
// ArrowPointerFeature：Daisy 自有指向线
const targetA = createEntity("Line-Target-A", 130, 8, 0);
targetA.addFeature(new Daisy.PointFeature({
    pixelSize: 10,
    color: "#ffd166",
    outlineColor: "#07131f",
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
}));

const targetB = createEntity("Line-Target-B", 138, -4, 0);
targetB.addFeature(new Daisy.PointFeature({
    pixelSize: 10,
    color: "#8df7ff",
    outlineColor: "#07131f",
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
}));

const pointerHost = createEntity("Line-Pointer-Host", 122, 0, 2200000);
pointerHost.addFeature(new Daisy.PointFeature({
    pixelSize: 12,
    color: "#ff8fcf",
    outlineColor: "#ffffff",
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
}));
pointerHost.addFeature(new Daisy.ArrowPointerFeature({
    target: targetA,
    length: 1800000,
    width: 5,
    color: "#ffd166",
    arrowSize: 24,
    label: { text: "A", font: "13px sans-serif", fillColor: "#ffd166" },
}));
pointerHost.addFeature(new Daisy.ArrowPointerFeature({
    target: targetB,
    length: 2200000,
    width: 5,
    color: "#8df7ff",
    arrowSize: 24,
    label: { text: "B", font: "13px sans-serif", fillColor: "#8df7ff" },
}));
pointerHost.addFeature(new Daisy.ArrowPointerFeature({
    target: "earthCenter",
    length: 1500000,
    width: 4,
    color: "#ffffff",
    arrowSize: 20,
}));

// ── 8. 相机定位和日志 ──────────────────────────────────────────────
engine.camera.flyToTarget(C3.fromDegrees(8, 4, 20500000));

__log("LineFeatures: Polyline 材质谱系、Dash、Glow、Outline、Arrow、Corridor、Wall、PolylineVolume、ArrowPointer 已创建");

// ── 9. 资源清理 ──────────────────────────────────────────────
registerCleanup(() => {
    for (const e of entities) {
        try {
            engine.removeEntity(e);
        } catch (err) {
            // ignore cleanup errors
        }
    }
});
</script>
