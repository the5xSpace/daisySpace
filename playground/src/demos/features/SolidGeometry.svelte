<script>
// =============================================================================
// SolidGeometry Demo — 实体几何体演示
//
// 本示例演示如何创建基本实体几何体：
// 1. BoxFeature: 盒体
// 2. CylinderFeature: 圆柱体
// 3. EllipsoidFeature: 椭球体
//
// 关键 API：
// - Daisy.BoxFeature: 盒体组件
//   - dimensions: 盒体尺寸（Cartesian3）
//   - material: 材质
// - Daisy.CylinderFeature: 圆柱体组件
//   - length: 长度
//   - topRadius: 顶部半径
//   - bottomRadius: 底部半径
// - Daisy.EllipsoidFeature: 椭球体组件
//   - radii: 三轴半径（Cartesian3）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;

// ── 2. 创建盒体 ──────────────────────────────────────────────
const e1 = engine.createEntity("Box");
e1.position = C3.fromDegrees(116.2, 39.9, 300000);
e1.addFeature(new Daisy.BoxFeature({ dimensions: new C3(200000, 200000, 200000), material: Daisy.Color.CYAN.withAlpha(0.6) }));

// ── 3. 创建圆柱体 ──────────────────────────────────────────────
const e2 = engine.createEntity("Cylinder");
e2.position = C3.fromDegrees(116.4, 39.9, 300000);
e2.addFeature(new Daisy.CylinderFeature({ length: 300000, topRadius: 80000, bottomRadius: 80000, material: Daisy.Color.LIME.withAlpha(0.6) }));

// ── 4. 创建椭球体 ──────────────────────────────────────────────
const e3 = engine.createEntity("Ellipsoid");
e3.position = C3.fromDegrees(116.6, 39.9, 300000);
e3.addFeature(new Daisy.EllipsoidFeature({ radii: new C3(150000, 100000, 100000), material: Daisy.Color.ORANGE.withAlpha(0.6) }));

// ── 5. 相机定位和日志 ──────────────────────────────────────────────
engine.camera.flyToTarget(C3.fromDegrees(116.4, 39.9, 1500000));
__log("SolidGeometry 已创建: Box + Cylinder + Ellipsoid");
</script>
