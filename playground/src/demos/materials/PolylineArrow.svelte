<script>
// =============================================================================
// PolylineArrow.svelte - 箭头线材质 Demo
// -----------------------------------------------------------------------------
// 本文件演示 PolylineArrow 材质的效果：
//   - 静态箭头线：显示方向，不流动
//   - 动态流光箭头线：显示方向 + 流动动画
//
// 关键 API：
//   - Daisy.MaterialFactory.PolylineArrow(config)
//     · config.color: 箭头颜色
//     · config.speed: 流动速度（可选，默认 0 静态）
//     · config.direction: "forward" | "backward"（流动方向）
//     · config.arrowSize: 箭头大小（像素）
//   - Daisy.PolylineFeature: 折线特征
//     · pathway: 坐标点数组
//     · width: 线宽
//     · material: 材质
//   - engine.camera.zoom(entities, offset): 缩放到实体包围球
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 定义路线坐标 ─────────────────────────────────────────────────────────
// 从西经80°北纬72°到东经60°北纬70°，高度 450km
const lonA = -80.0, latA = 72.0;
const lonB = 60.0, latB = 70.0;
const height = 450000;  // 450km

// positions: 3 个控制点（起点、中点、终点）
const positions = [
    Daisy.Cartesian3.fromDegrees(lonA, latA, height),
    Daisy.Cartesian3.fromDegrees((lonA + lonB) / 2, (latA + latB) / 2 + 8, height),  // 中点略偏北
    Daisy.Cartesian3.fromDegrees(lonB, latB, height),
];

// ── 2. 创建静态箭头线 ─────────────────────────────────────────────────────────
// PolylineArrow: 箭头线材质（无 speed 参数，静态显示）
const staticArrow = engine.createEntity("StaticArrow");
staticArrow.position = positions[0];
const staticArrowFeature = new Daisy.PolylineFeature({
    pathway: positions,
    width: 40,
    material: Daisy.MaterialFactory.PolylineArrow({ color: Daisy.Color.YELLOW }),  // 静态黄色箭头
}).setIncludeInBoundingSphere(true);  // 包含在包围球计算中
staticArrow.addFeature(staticArrowFeature);

// ── 3. 创建动态流光箭头线 ─────────────────────────────────────────────────────────
// offsetLat: 向南偏移 3°，避免两条线重叠
const offsetLat = 3.0;
const flowPositions = [
    Daisy.Cartesian3.fromDegrees(lonA, latA - offsetLat, height),
    Daisy.Cartesian3.fromDegrees((lonA + lonB) / 2, (latA + latB) / 2 + 8 - offsetLat, height),
    Daisy.Cartesian3.fromDegrees(lonB, latB - offsetLat, height),
];

const flowArrow = engine.createEntity("FlowArrow");
flowArrow.position = flowPositions[0];
const flowArrowFeature = new Daisy.PolylineFeature({
    pathway: flowPositions,
    width: 40,
    material: Daisy.MaterialFactory.PolylineArrow({
        color: Daisy.Color.CYAN,      // 青色
        speed: 2.2,                    // 流动速度 2.2
        direction: "forward",          // 向前流动
        arrowSize: 40,                 // 箭头大小 40px
    }),
}).setIncludeInBoundingSphere(true);
flowArrow.addFeature(flowArrowFeature);

// ── 4. 相机定位 ─────────────────────────────────────────────────────────
// zoom: 缩放到实体包围球
//   第一个参数：实体数组
//   第二个参数：HeadingPitchRange 偏移
//   返回 Promise<boolean>
requestAnimationFrame(() => {
    engine.camera.zoom([staticArrow, flowArrow], new Daisy.HeadingPitchRange(
        0,
        Daisy.Math.toRadians(-90),  // 俯视
        12000000,                    // 距离 12000km
    )).then((ok) => __log(`PolylineArrow: 包围球取景 ${ok ? "成功" : "失败"}`));
});
__log("PolylineArrow: 静态箭头 + 动态流光箭头已创建");
</script>
