<script>
// =============================================================================
// RadialPulse.svelte - 径向脉冲材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 RadialPulse 材质的效果：
//   - 中心径向脉冲波纹
//   - 适合告警范围和传播效果
//
// 关键 API：
//   - Daisy.MaterialFactory.RadialPulse(config)
//     · config.color: 底色
//     · config.pulseColor: 脉冲颜色
//     · config.speed: 脉冲速度
//     · config.ringWidth: 环宽度（0-1）
//     · config.center: { x, y } 脉冲中心（0-1，默认 0.5, 0.5）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建中心实体 ─────────────────────────────────────────────────────────
// 椭圆中心位于 (115.0, 38.0)，添加点和椭圆面特征
const e1 = engine.createEntity("Center");
e1.position = Daisy.Cartesian3.fromDegrees(115.0, 38.0, 0);
e1.addFeature(new Daisy.PointFeature({ size: 1400, color: Daisy.Color.LIME, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));

// ── 2. 添加椭圆面特征 ─────────────────────────────────────────────────────────
// RadialPulse: 径向脉冲材质
//   color: 青色底色
//   pulseColor: 白色脉冲
//   speed: 2.0 - 脉冲速度
//   ringWidth: 0.08 - 环宽度 8%
//   center: { x: 0.5, y: 0.5 } - 脉冲中心（中心点）
e1.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 100000,
    material: Daisy.MaterialFactory.RadialPulse({
        color: Daisy.Color.CYAN,
        pulseColor: Daisy.Color.WHITE,
        speed: 2.0,
        ringWidth: 0.08,
        center: { x: 0.5, y: 0.5 },
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
