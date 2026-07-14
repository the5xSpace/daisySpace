<script>
// =============================================================================
// ShaderPolygon Demo — 贴地与非贴地多边形演示
//
// 本示例演示如何使用 ShaderPolygonFeature 创建贴地和非贴地多边形：
// 1. 贴地多边形（surfaceConform: true）
// 2. 非贴地多边形（surfaceConform: false + height 抬升）
//
// 关键 API：
// - Daisy.ShaderPolygonFeature: 着色器多边形组件
//   - pathway: 多边形路径坐标
//   - color: 填充颜色
//   - surfaceConform: 是否贴地（默认 true）
//   - height: 非贴地时的高度
//   - outline: 是否显示轮廓
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

function circlePts(lon0, lat0, rDeg, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        pts.push(C3.fromDegrees(lon0 + rDeg * Math.cos(a), lat0 + rDeg * Math.sin(a), 0));
    }
    return pts;
}
function ellipsePts(lon0, lat0, rx, ry, n, rot) {
    const r = rot || 0, cosR = Math.cos(r), sinR = Math.sin(r);
    const pts = [];
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const x = rx * Math.cos(a), y = ry * Math.sin(a);
        pts.push(C3.fromDegrees(lon0 + x * cosR - y * sinR, lat0 + x * sinR + y * cosR, 0));
    }
    return pts;
}

// 贴地实体 — surfaceConform: true（默认）
const surfaceEntity = engine.createEntity("Surface");
surfaceEntity.position = C3.fromDegrees(60, 20, 0);

surfaceEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        C3.fromDegrees(75, 18, 0), C3.fromDegrees(95, 10, 0), C3.fromDegrees(120, 12, 0),
        C3.fromDegrees(138, 22, 0), C3.fromDegrees(142, 42, 0), C3.fromDegrees(135, 55, 0),
        C3.fromDegrees(115, 58, 0), C3.fromDegrees(90, 52, 0), C3.fromDegrees(72, 40, 0),
    ],
    color: Color.fromCssColorString("#2288ff").withAlpha(0.35),
}));

surfaceEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: circlePts(170, 0, 22, 32),
    color: Color.fromCssColorString("#ff3355").withAlpha(0.4),
}));

surfaceEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        C3.fromDegrees(-50, -20, 0), C3.fromDegrees(-30, -30, 0), C3.fromDegrees(-5, -25, 0),
        C3.fromDegrees(10, -10, 0), C3.fromDegrees(5, 15, 0), C3.fromDegrees(-15, 35, 0),
        C3.fromDegrees(-35, 45, 0), C3.fromDegrees(-55, 35, 0), C3.fromDegrees(-65, 15, 0),
    ],
    color: Color.fromCssColorString("#22dd77").withAlpha(0.3),
}));

surfaceEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: ellipsePts(75, -5, 30, 22, 32, Math.PI * 0.1),
    color: Color.fromCssColorString("#ffaa00").withAlpha(0.45),
}));

// 非贴地实体 — surfaceConform: false + height 抬升
const floatingEntity = engine.createEntity("Floating");
floatingEntity.position = C3.fromDegrees(-60, 10, 0);

floatingEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        C3.fromDegrees(-140, 50, 0), C3.fromDegrees(-100, 55, 0), C3.fromDegrees(-60, 50, 0),
        C3.fromDegrees(-60, 30, 0), C3.fromDegrees(-80, 20, 0), C3.fromDegrees(-120, 25, 0),
    ],
    color: Color.fromCssColorString("#00ddff").withAlpha(0.5),
    surfaceConform: false,
    height: 2000000,
}));

floatingEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        C3.fromDegrees(-20, 35, 0), C3.fromDegrees(10, 35, 0), C3.fromDegrees(40, 15, 0),
        C3.fromDegrees(50, -5, 0), C3.fromDegrees(40, -30, 0), C3.fromDegrees(15, -35, 0),
        C3.fromDegrees(-15, -30, 0), C3.fromDegrees(-20, -5, 0),
    ],
    color: Color.fromCssColorString("#ffdd00").withAlpha(0.45),
    surfaceConform: false,
    height: 2500000,
}));

floatingEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: circlePts(110, 0, 18, 32),
    color: Color.fromCssColorString("#ff6633").withAlpha(0.5),
    surfaceConform: false,
    height: 3000000,
}));

floatingEntity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: ellipsePts(0, 75, 55, 12, 36, 0),
    color: Color.fromCssColorString("#aa66ff").withAlpha(0.4),
    surfaceConform: false,
    height: 1800000,
}));

engine.camera.flyToTarget(C3.fromDegrees(30, 20, 28000000));
__log("ShaderPolygon: 贴地(4) + 悬浮(4) 已创建");
</script>
