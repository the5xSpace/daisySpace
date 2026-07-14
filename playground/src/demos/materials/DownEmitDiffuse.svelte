<script>
// =============================================================================
// DownEmitDiffuse.svelte - 向下发光扩散材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 DownEmitDiffuse 材质的效果：
//   - 从中心向下扩散的能量面
//   - 适合投影式区域表达（如信号覆盖、能量场）
//
// 关键 API：
//   - Daisy.MaterialFactory.DownEmitDiffuse(config)
//     · config.color: 主颜色
//     · config.bottomColor: 底部颜色
//     · config.speed: 扩散速度
//     · config.diffusionRadius: 扩散半径（0-1）
//     · config.diffusionWidth: 扩散宽度（0-1）
//   - Daisy.EllipseFeature: 椭圆面特征
//     · center: Daisy.REF.SELF_ENTITY（以实体自身为中心）
//     · semiMajorAxis/semiMinorAxis: 半长轴/半短轴（米）
//     · material: 材质
//     · clampToGround: false - 不贴地
//     · height: 离地高度（米）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建椭圆中心实体 ─────────────────────────────────────────────────────────
// 椭圆中心位于 (115.0, 38.0)，高度 0m
const e1 = engine.createEntity("Center");
e1.position = Daisy.Cartesian3.fromDegrees(115.0, 38.0, 0);
// PointFeature: 中心点标记，size: 1400m
// 注意：size 单位是米，不是像素！
e1.addFeature(new Daisy.PointFeature({ size: 1400, color: Daisy.Color.LIME, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));

// ── 2. 添加椭圆面特征 ─────────────────────────────────────────────────────────
// EllipseFeature: 椭圆面特征
// center: Daisy.REF.SELF_ENTITY - 以实体自身为中心（特殊引用）
// semiMajorAxis: 160km, semiMinorAxis: 100km
// height: 4200m 离地高度
// clampToGround: false - 不贴地（使用绝对高度）
e1.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 100000,
    // DownEmitDiffuse: 向下发光扩散材质
    material: Daisy.MaterialFactory.DownEmitDiffuse({
        color: Daisy.Color.GREEN,          // 主颜色：绿色
        bottomColor: Daisy.Color.fromBytes(0, 255, 128, 255),  // 底部颜色：亮绿
        speed: 1.5,                        // 扩散速度
        diffusionRadius: 0.45,             // 扩散半径（45%）
        diffusionWidth: 0.06,              // 扩散宽度（6%）
    }),
    clampToGround: false,
    height: 4200,
}));

// ── 3. 相机定位 ─────────────────────────────────────────────────────────
// flyToTarget: 飞行到目标实体
//   offset: HeadingPitchRange(方位角弧度, 俯仰角弧度, 距离米)
//   duration: 0 - 瞬间定位（无动画）
engine.camera.flyToTarget(e1, {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-55), 380000),  // 距离 380km
    duration: 0,
});
</script>
