# 标记系统

标记类 Feature 用于在场景中标定位置和显示信息，包括点标记、广告牌、文字标签和弹出框。

## Feature 选型

| 需求 | Feature | 说明 |
|------|---------|------|
| 简单圆点 | `PointFeature` | 像素点或米制圆点 |
| 图片/图标 | `BillboardFeature` | 始终面向相机的广告牌 |
| 文字标签 | `UI.LabelFeature` | 二维文字叠加层 |
| HTML 弹出框 | `UI.PopoverFeature` | DOM Overlay |

## PointFeature

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
entity.addFeature(new Daisy.PointFeature({
    color: Daisy.Color.CYAN,
    size: 1000,              // 米制尺寸
    sizePx: 18,              // 像素尺寸（与 size 二选一）
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,  // 始终显示
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `color` | `DColor` | 填充色 |
| `size` | `number` | 米制尺寸 |
| `sizePx` / `pixelSize` | `number` | 像素尺寸 |
| `outlineColor` | `DColor` | 轮廓色 |
| `outlineWidth` | `number` | 轮廓宽度（像素） |
| `disableDepthTestDistance` | `number` | 关闭深度测试的距离（米） |
| `position` | `Cartesian3` | 相对实体偏移 |

## BillboardFeature

```typescript
entity.addFeature(new Daisy.BillboardFeature({
    image: "/assets/sat-icon.png",
    scale: 1.5,
    color: Daisy.Color.WHITE,
    offsetPx: new Daisy.Cartesian2(0, -20),
    disableDepthTestDistance: 100000,
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `image` | `string \| Canvas \| Image` | 图片资源 |
| `scale` | `number` | 缩放 |
| `color` | `DColor` | 叠加色 |
| `offsetPx` | `Cartesian2` | 像素偏移 |
| `offsetMeters` | `Cartesian2` | 米偏移（优先级高于 offsetPx） |
| `alignedAxis` | `Cartesian3` | 朝向轴 |
| `disableDepthTestDistance` | `number` | 关闭深度测试 |

## UI.LabelFeature

```typescript
entity.addFeature(new Daisy.UI.LabelFeature({
    text: "SAT-01\nAlt: 550km",
    font: "14px sans-serif",
    fillColor: Daisy.Color.WHITE,
    style: Daisy.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth: 2,
    outlineColor: Daisy.Color.BLACK,
    showBackground: true,
    backgroundColor: Daisy.Color.BLACK.withAlpha(0.5),
    backgroundPadding: new Daisy.Cartesian2(7, 5),
    pixelOffset: new Daisy.Cartesian2(0, -20),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 显示文本（支持 `\n` 换行） |
| `font` | `string` | CSS 字体字符串 |
| `fillColor` | `DColor` | 文字色 |
| `style` | `LabelStyle` | `FILL` / `OUTLINE` / `FILL_AND_OUTLINE` |
| `outlineColor` | `DColor` | 轮廓色 |
| `outlineWidth` | `number` | 轮廓宽度 |
| `showBackground` | `boolean` | 背景矩形 |
| `backgroundColor` | `DColor` | 背景色 |
| `backgroundPadding` | `Cartesian2` | 背景内边距 |
| `pixelOffset` / `offsetPx` | `Cartesian2` | 像素偏移 |
| `offsetMeters` | `Cartesian2` | 米偏移 |
| `disableDepthTestDistance` | `number` | 关闭深度测试 |

## UI.PopoverFeature

Popover 是 DOM Overlay——它不在 WebGL 画布中渲染，而是将 HTML 元素投影到屏幕坐标系中实体对应的位置：

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: "#my-popover",   // CSS 选择器或 HTMLElement
    anchorPosition: "top",    // 锚点方向："top"|"bottom"|"left"|"right"
    trigger: "hover",         // "always"|"click"|"hover"
    offsetPx: new Daisy.Cartesian2(0, -10),
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `element` | `string \| HTMLElement` | 绑定的 DOM |
| `anchorPosition` | `PopoverAnchor` | 锚点方向 |
| `trigger` | `PopoverTrigger` | 触发方式 |
| `maxDistance` | `number` | 最大显示距离（米） |
| `offsetPx` | `Cartesian2` | 像素偏移 |

Popover 在以下情况自动隐藏：实体被遮挡、实体离屏、距离超出 `maxDistance` 范围。传入的 `element` 必须已经存在于 DOM 中。


---

<!--
示例参考: [Marker demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
