<script>
// =============================================================================
// SpiralFlow.svelte - 螺旋流动材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 SpiralFlow 材质的效果：
//   - 螺旋轴向流动效果
//   - 适合圆形区域和能量扩散面
//
// 关键 API：
//   - Daisy.MaterialFactory.SpiralFlow(config)
//     · config.color: 底色
//     · config.spiralColor: 螺旋线颜色
//     · config.speed: 流动速度
//     · config.count: 螺旋圈数
//     · config.thickness: 螺旋线厚度（0-1）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建中心实体 ─────────────────────────────────────────────────────────
// 椭圆中心位于 (115.0, 38.0)，添加点和椭圆面特征
const e1 = engine.createEntity("Center");
e1.position = Daisy.Cartesian3.fromDegrees(115.0, 38.0, 0);
e1.addFeature(new Daisy.PointFeature({ size: 1400, color: Daisy.Color.LIME, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));

// ── 2. 添加椭圆面特征 ─────────────────────────────────────────────────────────
// SpiralFlow: 螺旋流动材质
//   color: 蓝色底色
//   spiralColor: 黄色螺旋线
//   speed: 2.0 - 流动速度
//   count: 8 - 螺旋圈数
//   thickness: 0.35 - 螺旋线厚度 35%
e1.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 100000,
    material: Daisy.MaterialFactory.SpiralFlow({
        color: Daisy.Color.fromBytes(30, 144, 255, 255),  // DodgerBlue
        spiralColor: Daisy.Color.YELLOW,
        speed: 2.0,
        count: 8,
        thickness: 0.35,
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
