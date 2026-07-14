<script>
// =============================================================================
// 天球网格组件
// -----------------------------------------------------------------------------
// 展示天球坐标网格和天球球面网格。
// 关键 API:
//   - Daisy.CelestialGeodeticGridLayers : 天球大地坐标网格（经纬度）
//   - Daisy.CelestialSphereGridLayers   : 天球球面网格（赤经赤纬）
// =============================================================================

// ── 1. 组件属性 ────────────────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 2. 添加天球网格 ──────────────────────────────────────────────────────────
// 天球大地坐标网格：显示经纬度网格线
engine.addWidget(new Daisy.CelestialGeodeticGridLayers());
// 天球球面网格：显示赤经赤纬网格线
engine.addWidget(new Daisy.CelestialSphereGridLayers());
__log("Celestial grids added");
</script>
