<script>
// =============================================================================
// EllipticalCone Demo — 柱体/锥体演示
//
// 本示例演示如何创建各种柱体和锥体：
// 1. CylinderFeature: 圆柱体
// 2. EllipticalConeFeature: 椭圆柱/椭圆锥体
// 3. CubeFeature: 棱柱/棱锥体
//
// 关键 API：
// - Daisy.CylinderFeature: 圆柱体组件
//   - topRadius: 顶部半径
//   - bottomRadius: 底部半径
//   - height: 高度
//   - slices: 切片数（越大越圆滑）
//   - emitDirection: 发射方向
// - Daisy.EllipticalConeFeature: 椭圆椎体组件
//   - topSemiMajorAxis/topSemiMinorAxis: 顶部半长轴/半短轴
//   - bottomSemiMajorAxis/bottomSemiMinorAxis: 底部半长轴/半短轴
// - Daisy.CubeFeature: 棱柱组件
//   - topX/topY: 顶部X/Y尺寸
//   - bottomX/bottomY: 底部X/Y尺寸
// - emitDirection: 发射方向（TO_UP/TO_DOWN/TO_FRONT等）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 形状配置 ──────────────────────────────────────────────
const shapeSpecs = [
    // 圆柱
    {
        name: "圆柱", lon: 104.0, lat: 42.0,
        feature: () => new Daisy.CylinderFeature({
            topRadius: 160000, bottomRadius: 160000, height: 620000, slices: 72,
            material: Daisy.Color.CYAN.withAlpha(0.46), outline: true, outlineColor: Daisy.Color.CYAN,
            emitDirection: Daisy.EmitDirection.TO_UP,
        }),
    },
    // 椭圆柱
    {
        name: "椭圆柱", lon: 111.0, lat: 42.0,
        feature: () => new Daisy.EllipticalConeFeature({
            topSemiMajorAxis: 220000, topSemiMinorAxis: 90000,
            bottomSemiMajorAxis: 220000, bottomSemiMinorAxis: 90000, height: 620000, slices: 72,
            material: Daisy.Color.DODGERBLUE.withAlpha(0.44), outline: true, outlineColor: Daisy.Color.DEEPSKYBLUE,
            emitDirection: Daisy.EmitDirection.TO_FRONT,
        }),
    },
    // 棱柱
    {
        name: "棱柱", lon: 118.0, lat: 42.0,
        feature: () => new Daisy.CubeFeature({
            topX: 240000, topY: 150000, bottomX: 240000, bottomY: 150000, height: 620000,
            material: Daisy.Color.LIME.withAlpha(0.42), outline: true, outlineColor: Daisy.Color.LAWNGREEN,
            emitDirection: Daisy.EmitDirection.TO_LEFT,
        }),
    },
    // 多棱柱（slices=8）
    {
        name: "多棱柱", lon: 125.0, lat: 42.0,
        feature: () => new Daisy.CylinderFeature({
            topRadius: 170000, bottomRadius: 170000, height: 620000, slices: 8,
            material: Daisy.Color.MEDIUMSPRINGGREEN.withAlpha(0.42), outline: true, outlineColor: Daisy.Color.SPRINGGREEN,
            emitDirection: Daisy.EmitDirection.TO_RIGHT,
        }),
    },
    // 圆锥体（topRadius=0）
    {
        name: "圆锥体", lon: 104.0, lat: 33.0,
        feature: () => new Daisy.CylinderFeature({
            topRadius: 0, bottomRadius: 190000, height: 680000, slices: 72,
            material: Daisy.Color.GOLD.withAlpha(0.46), outline: true, outlineColor: Daisy.Color.YELLOW,
            emitDirection: Daisy.EmitDirection.TO_BOTTOM,
        }),
    },
    // 椭圆锥体
    {
        name: "椭圆锥体", lon: 111.0, lat: 33.0,
        feature: () => new Daisy.EllipticalConeFeature({
            topSemiMajorAxis: 0, topSemiMinorAxis: 0,
            bottomSemiMajorAxis: 260000, bottomSemiMinorAxis: 100000, height: 680000, slices: 72,
            material: Daisy.Color.ORANGE.withAlpha(0.44), outline: true, outlineColor: Daisy.Color.ORANGE,
            emitDirection: Daisy.EmitDirection.TO_AFTER,
        }),
    },
    // 棱锥体
    {
        name: "棱锥体", lon: 118.0, lat: 33.0,
        feature: () => new Daisy.CubeFeature({
            topX: 0, topY: 0, bottomX: 260000, bottomY: 180000, height: 680000,
            material: Daisy.Color.MAGENTA.withAlpha(0.4), outline: true, outlineColor: Daisy.Color.MAGENTA,
            emitDirection: Daisy.EmitDirection.TO_UP,
        }),
    },
    // 多棱锥体（slices=7）
    {
        name: "多棱锥体", lon: 125.0, lat: 33.0,
        feature: () => new Daisy.CylinderFeature({
            topRadius: 0, bottomRadius: 210000, height: 680000, slices: 7,
            material: Daisy.Color.AQUA.withAlpha(0.42), outline: true, outlineColor: Daisy.Color.AQUA,
            emitDirection: Daisy.EmitDirection.TO_GROUND,
        }),
    },
];

// ── 2. 创建实体 ──────────────────────────────────────────────
for (const spec of shapeSpecs) {
    const entity = engine.createEntity(spec.name);
    entity.position = Daisy.Cartesian3.fromDegrees(spec.lon, spec.lat, 700000);
    entity.addFeature(spec.feature());
}

// ── 3. 相机定位和日志 ──────────────────────────────────────────────
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(114.5, 37.5, 4200000));
__log("Created: cylinders, elliptical cylinders, prisms, cones, and pyramids");
</script>
