<script>
// =============================================================================
// AreaFeatures Demo — 面状组件演示
//
// 本示例演示如何创建各种面状组件：
// 1. 贴地多边形（PolygonFeature）
// 2. 带孔多边形（PolygonHierarchy）
// 3. 多边形材质
// 4. 轮廓样式
//
// 关键 API：
// - Daisy.PolygonFeature: 多边形组件
// - pathway: 多边形路径（经纬度坐标数组）
// - material: 材质（颜色/透明度）
// - outline: 是否显示轮廓
// - outlineColor: 轮廓颜色
// - outlineWidth: 轮廓宽度
// - clampToGround: 是否贴地
// - arcType: 弧线类型（GEODESIC/RHUMB 等）
// - PolygonHierarchy: 多边形层次结构（用于带孔多边形）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和辅助函数 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;
const PH = Daisy.PolygonHierarchy;

// 设置引擎参数
engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();

// 设置基础图层和天空盒
engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0,
    maxLevel: 3,
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

// circlePts: 生成圆形点集
function circlePts(lon0, lat0, rDeg, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        pts.push(p(lon0 + rDeg * Math.cos(a), lat0 + rDeg * Math.sin(a), 0));
    }
    return pts;
}

// ellipsePts: 生成椭圆形点集
function ellipsePts(lon0, lat0, rx, ry, n, rot, height) {
    const r = rot || 0;
    const cosR = Math.cos(r);
    const sinR = Math.sin(r);
    const pts = [];
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const x = rx * Math.cos(a);
        const y = ry * Math.sin(a);
        pts.push(p(lon0 + x * cosR - y * sinR, lat0 + x * sinR + y * cosR, height || 0));
    }
    return pts;
}

// circleShape: 生成圆形形状（Cartesian2）
function circleShape(radius, segments) {
    const pts = [];
    for (let i = 0; i < segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push(new Daisy.Cartesian2(radius * Math.cos(a), radius * Math.sin(a)));
    }
    return pts;
}

// addTitle: 添加标题
function addTitle(text) {
    __log(text);
}

// createEntity: 创建实体
const entities = [];
function createEntity(name, lon, lat, height) {
    const e = engine.createEntity(name);
    e.position = p(lon, lat, height || 0);
    entities.push(e);
    return e;
}

// ── 2. 创建贴地大区块 ──────────────────────────────────────────────
// PolygonFeature: 多边形组件
// - pathway: 多边形路径（经纬度坐标数组）
// - material: 材质（颜色/透明度）
// - outline: 是否显示轮廓
// - outlineColor: 轮廓颜色
// - outlineWidth: 轮廓宽度
// - clampToGround: 是否贴地
// - arcType: 弧线类型（GEODESIC/RHUMB 等）
const regionA = createEntity("Area-Atlantic", -20, 18, 0);
regionA.addFeature(new Daisy.PolygonFeature({
    pathway: [
        p(-58, 8, 0), p(-38, -14, 0), p(-6, -18, 0), p(18, -2, 0),
        p(12, 18, 0), p(-8, 35, 0), p(-34, 42, 0), p(-54, 28, 0),
    ],
    material: Color.fromCssColorString("#2f9bff").withAlpha(0.32),
    outline: true,
    outlineColor: Color.fromCssColorString("#66e8ff"),
    outlineWidth: 2,
    clampToGround: true,
    arcType: Daisy.ArcType.GEODESIC,
}));

const regionB = createEntity("Area-Hole-Ring", 40, 5, 0);
regionB.addFeature(new Daisy.PolygonFeature({
    pathway: new PH(
        [
            p(28, 28, 0), p(54, 30, 0), p(66, 10, 0),
            p(54, -8, 0), p(30, -2, 0), p(22, 14, 0),
        ],
        [
            new PH([p(36, 20, 0), p(52, 22, 0), p(58, 10, 0), p(46, 4, 0)]),
            new PH([p(40, 12, 0), p(46, 13, 0), p(44, 7, 0)]),
        ],
    ),
    material: Color.fromCssColorString("#22dd77").withAlpha(0.28),
    outline: true,
    outlineColor: Color.fromCssColorString("#b4ff7a"),
    outlineWidth: 2,
    clampToGround: true,
}));

const regionC = createEntity("Area-Ribbon", 110, 15, 0);
regionC.addFeature(new Daisy.PolygonFeature({
    pathway: ellipsePts(112, 8, 18, 9, 36, Math.PI * 0.24, 0),
    material: Color.fromCssColorString("#ffbf00").withAlpha(0.36),
    outline: true,
    outlineColor: Color.fromCssColorString("#ffe770"),
    outlineWidth: 2,
    clampToGround: true,
    stRotation: Math.PI * 0.2,
}));

const rectGround = createEntity("Area-Ground-Rectangle", -108, 34, 0);
rectGround.addFeature(new Daisy.RectangleFeature({
    rectangle: Daisy.Rectangle.fromDegrees(-122, 26, -100, 38),
    material: Color.fromCssColorString("#3fb8ff").withAlpha(0.24),
    outline: true,
    outlineColor: Color.fromCssColorString("#c8f5ff"),
    outlineWidth: 2,
    rotation: Math.PI * 0.08,
    stRotation: Math.PI * 0.2,
}));

const ellipseGround = createEntity("Area-Ground-Ellipse", -72, 28, 0);
ellipseGround.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 2600000,
    semiMinorAxis: 1500000,
    rotation: Math.PI * -0.22,
    stRotation: Math.PI * 0.12,
    material: Color.fromCssColorString("#73fbd3").withAlpha(0.28),
    outline: true,
    outlineColor: Color.fromCssColorString("#b7fff0"),
    outlineWidth: 2,
    clampToGround: true,
}));

// 2) 挤出和高度面
const stackA = createEntity("Area-Extruded-Block", -118, -8, 0);
stackA.addFeature(new Daisy.RectangleFeature({
    rectangle: Daisy.Rectangle.fromDegrees(-128, -16, -108, 2),
    height: 0,
    extrudedHeight: 1600000,
    material: Color.fromCssColorString("#00ddff").withAlpha(0.38),
    outline: true,
    outlineColor: Color.fromCssColorString("#7ef9ff"),
    outlineWidth: 2,
    stRotation: Math.PI * 0.18,
}));

const stackB = createEntity("Area-Extruded-Ellipse", -82, -14, 0);
stackB.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 2600000,
    semiMinorAxis: 1200000,
    height: 220000,
    extrudedHeight: 1250000,
    rotation: Math.PI * -0.27,
    stRotation: Math.PI * 0.09,
    material: Color.fromCssColorString("#ff6f61").withAlpha(0.34),
    outline: true,
    outlineColor: Color.fromCssColorString("#ffb2a8"),
    outlineWidth: 2,
    clampToGround: false,
}));

const stackC = createEntity("Area-PerPosition", -48, -32, 0);
stackC.addFeature(new Daisy.PolygonFeature({
    pathway: C3.fromDegreesArrayHeights([
        -62, -24, 420000,
        -38, -18, 700000,
        -28, -30, 1100000,
        -42, -42, 900000,
        -58, -36, 580000,
    ]),
    perPositionHeight: true,
    material: Color.fromCssColorString("#aa66ff").withAlpha(0.32),
    outline: true,
    outlineColor: Color.fromCssColorString("#d18cff"),
    outlineWidth: 2,
    clampToGround: false,
    height: 0,
}));

const nestedHole = createEntity("Area-Nested-Holes", 100, 36, 0);
nestedHole.addFeature(new Daisy.PolygonFeature({
    pathway: {
        positions: C3.fromDegreesArray([
            78, 28, 122, 28, 126, 48, 92, 54, 72, 42,
        ]),
        holes: [
            {
                positions: C3.fromDegreesArray([
                    84, 32, 116, 34, 112, 46, 88, 46,
                ]),
                holes: [
                    {
                        positions: C3.fromDegreesArray([
                            94, 36, 106, 36, 105, 42, 94, 42,
                        ]),
                    },
                ],
            },
        ],
    },
    material: Color.fromCssColorString("#8df7ff").withAlpha(0.22),
    outline: true,
    outlineColor: Color.fromCssColorString("#e3fbff"),
    outlineWidth: 2,
    clampToGround: true,
}));

const extrudedPoly = createEntity("Area-Extruded-Polygon", 132, -24, 0);
extrudedPoly.addFeature(new Daisy.PolygonFeature({
    pathway: [
        p(118, -14, 0), p(140, -12, 0), p(150, -28, 0),
        p(136, -42, 0), p(116, -34, 0),
    ],
    height: 240000,
    extrudedHeight: 1800000,
    material: Color.fromCssColorString("#ff9f43").withAlpha(0.38),
    outline: true,
    outlineColor: Color.fromCssColorString("#ffd7a0"),
    outlineWidth: 2,
    clampToGround: false,
}));

// 3) Daisy-only: ShaderPolygonFeature 做一个高阶块
const shaderA = createEntity("Area-Shader-Only", 18, -4, 0);
shaderA.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        p(-2, 14, 0), p(16, 22, 0), p(30, 16, 0), p(34, 4, 0),
        p(26, -10, 0), p(8, -14, 0), p(-4, -6, 0),
    ],
    color: Color.fromCssColorString("#2fffd3").withAlpha(0.35),
    outline: true,
    outlineColor: Color.fromCssColorString("#9bfff1"),
    outlineWidth: 2,
    effectType: 7,
    projectionMode: "cartographic",
    surfaceConform: true,
}));

shaderA.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: circlePts(20, -6, 8, 28),
    color: Color.fromCssColorString("#ff8fcf").withAlpha(0.32),
    outline: true,
    outlineColor: Color.fromCssColorString("#ffb3df"),
    outlineWidth: 2,
    effectType: 8,
    surfaceConform: false,
    height: 1200000,
}));

// 4) 柱、盒、椭球和体积线，让这个示例更像完整几何集合
for (let i = 0; i < 5; i++) {
    const h = 250000 + i * 300000;
    const box = createEntity("Area-Box-Stack-" + i, -150 + i * 5, 56, h);
    box.addFeature(new Daisy.BoxFeature({
        dimensions: new C3(240000, 240000, 240000),
        material: Color.fromCssColorString(i % 2 ? "#66e8ff" : "#ffd166").withAlpha(0.34),
        outline: true,
        outlineColor: Color.fromCssColorString("#ffffff").withAlpha(0.86),
        outlineWidth: 1.5,
    }));

    const ellipsoid = createEntity("Area-Ellipsoid-Stack-" + i, -150 + i * 5, 49, h);
    ellipsoid.addFeature(new Daisy.EllipsoidFeature({
        dimensions: new C3(180000, 180000, 320000),
        material: Color.fromCssColorString(i % 2 ? "#ff8fcf" : "#73fbd3").withAlpha(0.34),
        outline: true,
        outlineColor: Color.fromCssColorString("#ffffff").withAlpha(0.78),
        outlineWidth: 1.5,
    }));
}

const cylinderA = createEntity("Area-Cylinder", -36, 50, 500000);
cylinderA.addFeature(new Daisy.CylinderFeature({
    bottomRadius: 520000,
    topRadius: 280000,
    height: 1300000,
    slices: 48,
    material: Color.fromCssColorString("#2fffd3").withAlpha(0.36),
    outline: true,
    outlineColor: Color.fromCssColorString("#b8fff2"),
    outlineWidth: 2,
}));

const cylinderB = createEntity("Area-Cone", -18, 48, 500000);
cylinderB.addFeature(new Daisy.CylinderFeature({
    bottomRadius: 620000,
    topRadius: 0,
    height: 1500000,
    slices: 48,
    material: Color.fromCssColorString("#ff6f61").withAlpha(0.36),
    outline: true,
    outlineColor: Color.fromCssColorString("#ffc2ba"),
    outlineWidth: 2,
}));

const wallGallery = createEntity("Area-Wall-Gallery", 8, 48, 0);
wallGallery.addFeature(new Daisy.WallFeature({
    pathway: C3.fromDegreesArray([
        -8, 46, 4, 54, 18, 47, 30, 55,
    ]),
    minimumHeights: [0, 240000, 0, 240000],
    maximumHeights: [900000, 1600000, 1100000, 1800000],
    material: Color.fromCssColorString("#aa66ff").withAlpha(0.32),
    outline: true,
    outlineColor: Color.fromCssColorString("#dcc2ff"),
    outlineWidth: 2,
}));

const corridorGallery = createEntity("Area-Corridor-Gallery", 58, 50, 0);
corridorGallery.addFeature(new Daisy.CorridorFeature({
    pathway: C3.fromDegreesArray([
        42, 48, 54, 56, 70, 46, 84, 54,
    ]),
    width: 520000,
    height: 1000000,
    extrudedHeight: 1400000,
    material: Color.fromCssColorString("#18c2ff").withAlpha(0.26),
    outline: true,
    outlineColor: Color.fromCssColorString("#8df7ff"),
    outlineWidth: 2,
    clampToGround: false,
}));

const volumeGallery = createEntity("Area-Volume-Gallery", -112, 14, 0);
volumeGallery.addFeature(new Daisy.PolylineVolumeFeature({
    pathway: C3.fromDegreesArrayHeights([
        -132, 12, 700000,
        -118, 22, 950000,
        -100, 12, 850000,
        -84, 20, 1100000,
    ]),
    shape: circleShape(36000, 28),
    material: Color.fromCssColorString("#ffffff").withAlpha(0.7),
    outline: true,
    outlineColor: Color.fromCssColorString("#66e8ff"),
    outlineWidth: 1.5,
}));

// 5) 角落里的小型拼贴，制造“官方不太一样”的排布感
const miniA = createEntity("Area-Mini-1", 145, -18, 0);
miniA.addFeature(new Daisy.PolygonFeature({
    pathway: [
        p(136, -10, 0), p(148, -8, 0), p(154, -20, 0), p(142, -28, 0),
    ],
    material: Color.fromCssColorString("#54d3ff").withAlpha(0.35),
    outline: true,
    outlineColor: Color.fromCssColorString("#bff6ff"),
    outlineWidth: 1.5,
    clampToGround: true,
}));

const miniB = createEntity("Area-Mini-2", -150, 35, 0);
miniB.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 1800000,
    semiMinorAxis: 800000,
    rotation: Math.PI * 0.15,
    material: Color.fromCssColorString("#ffd166").withAlpha(0.3),
    outline: true,
    outlineColor: Color.fromCssColorString("#fff2b0"),
    outlineWidth: 1.5,
    clampToGround: true,
}));

engine.camera.flyToTarget(C3.fromDegrees(20, 12, 26000000));

addTitle("AreaFeatures: 贴地区域、孔洞、挤出、高度面、ShaderPolygon 组合展示");
addTitle("底图使用 Daisy 自有地球瓦片，天空使用 Daisy SkyBox，不借用官方素材");

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
