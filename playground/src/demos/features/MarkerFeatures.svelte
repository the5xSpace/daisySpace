<script>
// =============================================================================
// MarkerFeatures Demo — 标记组件演示
//
// 本示例演示如何创建 PointFeature（点标记）、ImageFeature（图片）和 TextFeature（文本）组件。
// 这些是最常用的标记组件，用于在地图上显示位置、图片和文字信息。
//
// 关键 API：
// - engine.createEntity(name): 创建新实体
// - entity.position: 设置实体位置（Cartesian3 坐标）
// - entity.addFeature(): 添加组件到实体
// - Daisy.PointFeature: 点标记组件
// - Daisy.ImageFeature: 图片组件
// - Daisy.UI.TextFeature: 文本组件
// - engine.camera.flyToTarget(): 相机飞行到目标
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建实体并设置位置 ──────────────────────────────────────────────────
// createEntity(name): 创建一个新实体，name 为实体标识名
// position: 设置实体位置（经纬度坐标，单位：度/米）
//   - fromDegrees(longitude, latitude, height)
//     - longitude: 经度 (116.4°E = 北京附近)
//     - latitude: 纬度 (39.9°N)
//     - height: 高度 (500km)
const e1 = engine.createEntity("MarkerDemo");
e1.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500000);

// ── 2. 添加 PointFeature（点标记） ──────────────────────────────────────────
// PointFeature: 点标记组件，用于在地图上显示一个点
// 参数说明：
//   - size: 点大小（米）
//   - color: 填充颜色（Daisy.Color.CYAN = 青色）
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度（像素）
e1.addFeature(new Daisy.PointFeature({ size: 1200, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.WHITE, outlineWidth: 2 }));

// ── 3. 添加 ImageFeature（图片） ──────────────────────────────────────────
const icon = document.createElement("canvas");
icon.width = 48;
icon.height = 48;
const iconContext = icon.getContext("2d");
if (iconContext) {
    iconContext.fillStyle = "#0891b2";
    iconContext.beginPath();
    iconContext.arc(24, 24, 20, 0, Math.PI * 2);
    iconContext.fill();
    iconContext.strokeStyle = "#ffffff";
    iconContext.lineWidth = 3;
    iconContext.stroke();
    iconContext.fillStyle = "#ffffff";
    iconContext.font = "bold 18px sans-serif";
    iconContext.textAlign = "center";
    iconContext.textBaseline = "middle";
    iconContext.fillText("DS", 24, 25);
}
e1.addFeature(new Daisy.ImageFeature({
    image: icon,
    scale: 1,
    offsetPx: new Daisy.Cartesian2(0, -52),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
}));

// ── 4. 添加 TextFeature（文本） ──────────────────────────────────────────
// TextFeature: 文本组件，用于在地图上显示文字信息
// 参数说明：
//   - text: 显示文本
//   - font: 字体样式（CSS 格式）
//   - fillColor: 文字颜色
//   - style: 标签样式（FILL_AND_OUTLINE = 填充+轮廓）
//   - outlineWidth: 轮廓宽度
//   - outlineColor: 轮廓颜色
//   - showBackground: 显示背景
//   - backgroundColor: 背景颜色（支持 alpha 透明度）
//   - backgroundPadding: 背景内边距
//   - pixelOffset: 像素偏移量（x, y）
e1.addFeature(new Daisy.UI.TextFeature({
    text: "MarkerDemo", font: "14px sans-serif", fillColor: Daisy.Color.CYAN,
    style: Daisy.LabelStyle.FILL_AND_OUTLINE, outlineWidth: 2, outlineColor: Daisy.Color.BLACK,
    showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.5),
    backgroundPadding: new Daisy.Cartesian2(7, 5), pixelOffset: new Daisy.Cartesian2(0, -20),
}));

// ── 5. 相机飞行到实体 ──────────────────────────────────────────────────
// flyToTarget(): 将相机飞行到目标位置
// 参数说明：
//   - target: 目标实体
//   - offset: HeadingPitchRange 对象
//     - heading: 航向角（弧度）
//     - pitch: 俯仰角（弧度，负值=俯视）
//     - range: 距离（米）
engine.camera.flyToTarget(e1, { offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-45), 2000000) });

// 输出创建信息
__log("MarkerFeatures 已创建: Point + Image + Text");
// =============================================================================
</script>
