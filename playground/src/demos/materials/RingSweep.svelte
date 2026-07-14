<script>
// =============================================================================
// RingSweep.svelte - 角向环形扫描材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 RingSweep 材质的效果：
//   - 角向环形扫描效果
//   - 适合圆盘形态的扫描光束
//
// 关键 API：
//   - Daisy.MaterialFactory.RingSweep(config)
//     · config.color: 底色
//     · config.sweepColor: 扫描颜色
//     · config.speed: 扫描速度
//     · config.width: 扫描带宽度（0-1）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建中心实体 ─────────────────────────────────────────────────────────
// 椭圆中心位于 (115.0, 38.0)，添加点和椭圆面特征
const e1 = engine.createEntity("Center");
e1.position = Daisy.Cartesian3.fromDegrees(115.0, 38.0, 0);
e1.addFeature(new Daisy.PointFeature({ size: 1400, color: Daisy.Color.LIME, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));

// ── 2. 添加椭圆面特征 ─────────────────────────────────────────────────────────
// RingSweep: 角向环形扫描材质
//   color: 蓝色底色
//   sweepColor: 橙色扫描线
//   speed: 1.0 - 扫描速度
//   width: 0.12 - 扫描带宽度 12%
e1.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 100000,
    material: Daisy.MaterialFactory.RingSweep({
        color: Daisy.Color.BLUE,
        sweepColor: Daisy.Color.ORANGE,
        speed: 1.0,
        width: 0.12,
    }),
    clampToGround: false,
    height: 4200,
}));

// ── 3. 相机定位 ─────────────────────────────────────────────────────────
// flyToTarget: 飞行到目标实体
engine.camera.flyToTarget(e1, {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-55), 380000),
    duration: 0,
});
</script>
