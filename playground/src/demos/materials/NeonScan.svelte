<script>
// =============================================================================
// NeonScan.svelte - 霓虹扫描材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 NeonScan 材质的效果：
//   - 霓虹斜向扫描效果
//   - 适合雷达扫掠和状态高亮面
//
// 关键 API：
//   - Daisy.MaterialFactory.NeonScan(config)
//     · config.baseColor: 底色
//     · config.neonColor: 霓虹颜色
//     · config.speed: 扫描速度
//     · config.bandWidth: 扫描带宽度（0-1）
//     · config.glowSize: 发光大小（0-1）
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建中心实体 ─────────────────────────────────────────────────────────
// 椭圆中心位于 (115.0, 38.0)，添加点和椭圆面特征
const e1 = engine.createEntity("Center");
e1.position = Daisy.Cartesian3.fromDegrees(115.0, 38.0, 0);
e1.addFeature(new Daisy.PointFeature({ size: 1400, color: Daisy.Color.LIME, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 2 }));

// ── 2. 添加椭圆面特征 ─────────────────────────────────────────────────────────
// NeonScan: 霓虹扫描材质
//   baseColor: 紫色底色
//   neonColor: 青色霓虹
//   speed: 1.5 - 扫描速度
//   bandWidth: 0.15 - 扫描带宽度 15%
//   glowSize: 0.35 - 发光大小 35%
e1.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 160000,
    semiMinorAxis: 100000,
    material: Daisy.MaterialFactory.NeonScan({
        baseColor: Daisy.Color.PURPLE,
        neonColor: Daisy.Color.CYAN,
        speed: 1.5,
        bandWidth: 0.15,
        glowSize: 0.35,
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
