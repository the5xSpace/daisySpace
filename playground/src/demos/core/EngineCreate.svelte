<script>
// =============================================================================
// Engine 创建 Demo — 引擎初始化与基本配置
//
// 本示例演示如何创建 Daisy 引擎实例、配置场景时间、
// 创建实体并添加 PointFeature 和 LabelFeature 组件。
//
// 关键 API 说明：
// - engine: 引擎实例，由 Playground 框架自动创建和注入
// - Daisy: SDK 命名空间，包含所有 API（你的项目中通过 import 导入）
// - container: DOM 容器元素（你的项目中需自行获取）
//
// 在你的项目中初始化方式：
//   import * as Daisy from "daisy-space-sdk";
//   const container = document.getElementById("app");
//   const engine = await Daisy.Engine.create(container);
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

__log("=== Engine 创建 Demo ===");
// ── 1. 检查引擎模式 ──────────────────────────────────────────────────────
// is3D() 返回 true 表示 3D 模式，false 表示 2.5D 模式
__log("是否 3D 模式: " + engine.is3D());

// ── 2. 获取当前场景时间 ──────────────────────────────────────────────────
// getCurrentTime() 返回 JulianDate 格式的当前时间
const currentTime = engine.getCurrentTime();
__log("当前场景时间: " + Daisy.JulianDate.toDate(currentTime).toISOString());

// ── 3. 设置场景时间范围 ──────────────────────────────────────────────────
// JulianDate.fromDate() 将 JavaScript Date 转换为 JulianDate
// setSceneTime(startTime, stopTime, loop)
//   - startTime: 场景起始时间
//   - stopTime: 场景结束时间
//   - loop: 是否循环播放
const startTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T00:00:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2025-06-02T00:00:00Z"));
engine.setSceneTime(startTime, stopTime, true);
__log("场景时间已设置: 2025-06-01 ~ 2025-06-02 (循环播放)");

// ── 4. 配置时间倍率并启动播放 ────────────────────────────────────────────
// setMultiplier(1) 设置时间流速为 1x（实时）
// play() 启动引擎时间播放
engine.setMultiplier(1);
engine.play();
__log("时间倍率: 1x, 引擎已开始播放");

// ── 5. 创建实体并添加组件 ──────────────────────────────────────────────
// createEntity(name) 创建一个新实体，name 为实体标识名
//   - 返回 Entity 对象，可添加 position 和多个 Feature 组件
const entity = engine.createEntity("DemoEntity");

// 设置实体位置（经纬度坐标，单位：度/米）
// fromDegrees(longitude, latitude, height)
//   - longitude: 经度 (116.4°E = 北京附近)
//   - latitude: 纬度 (39.9°N)
//   - height: 高度 (500km)
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000);

// 添加 PointFeature（点标记）
// PointFeature 参数：
//   - size: 点大小（米）
//   - color: 填充颜色（Daisy.Color.CYAN = 青色）
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度
//   - show: 是否显示
entity.addFeature(new Daisy.PointFeature({
    size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.WHITE, outlineWidth: 2, show: true,
}));

// 添加 LabelFeature（标签）
// LabelFeature 参数：
//   - text: 显示文本
//   - font: 字体样式（CSS 格式）
//   - fillColor: 文字颜色
//   - style: 标签样式（FILL_AND_OUTLINE = 填充+轮廓）
//   - outlineWidth: 轮廓宽度
//   - outlineColor: 轮廓颜色
//   - showBackground: 显示背景
//   - backgroundColor: 背景颜色（支持 alpha 透明度）
//   - backgroundPadding: 背景内边距
//   - pixelOffset: 像素偏移量
entity.addFeature(new Daisy.UI.LabelFeature({
    text: "DemoEntity", font: "14px sans-serif", fillColor: Daisy.Color.CYAN,
    style: Daisy.LabelStyle.FILL_AND_OUTLINE, outlineWidth: 2, outlineColor: Daisy.Color.BLACK,
    showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.5),
    backgroundPadding: new Daisy.Cartesian2(7, 5), pixelOffset: new Daisy.Cartesian2(0, -20), show: true,
}));

// 输出创建信息
__log("实体已创建: " + entity.name);
__log("当前实体数量: " + engine.entities.length);

// ── 6. 查看视距策略配置 ──────────────────────────────────────────────────
// viewDistanceStrategy 管理不同距离范围内的对象显示策略
// getScene() 返回当前场景类型（SPACE/AVIATION/MARITIME/GROUND）
const vds = engine.viewDistanceStrategy;
__log("视距策略当前场景: " + vds.getScene());

// ── 7. 相机飞行到实体 ──────────────────────────────────────────────────
// flyToTarget(target, options) 将相机飞行到目标位置
//   - target: 目标实体或坐标
//   - offset: HeadingPitchRange 对象
//     - heading: 航向角（弧度）
//     - pitch: 俯仰角（弧度，负值=俯视）
//     - range: 距离（米）
engine.camera.flyToTarget(entity, {
    offset: new Daisy.HeadingPitchRange(Daisy.Math.toRadians(0), Daisy.Math.toRadians(-45), 2_500_000),
});

__log("=== Engine 创建 Demo 完成 ===");
// =============================================================================
</script>
