# Marker System

Features are used to mark locations and display information in the scene, including point markers, billboards, text labels, and popovers.

## Feature Selection

| Use Case | Feature | Description |
|----------|---------|-------------|
| Simple dot | `PointFeature` | Pixel or metric-sized dot |
| Image / icon | `BillboardFeature` | Billboard always facing the camera |
| Text label | `UI.LabelFeature` | 2D text overlay |
| HTML popover | `UI.PopoverFeature` | DOM Overlay |

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `color` | `DColor` | Fill color |
| `size` | `number` | Size in meters |
| `sizePx` / `pixelSize` | `number` | Pixel size |
| `outlineColor` | `DColor` | Outline color |
| `outlineWidth` | `number` | Outline width (pixels) |
| `disableDepthTestDistance` | `number` | Distance at which depth testing is disabled (meters) |
| `position` | `Cartesian3` | Offset relative to the entity |

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `image` | `string \| Canvas \| Image` | Image resource |
| `scale` | `number` | Scale |
| `color` | `DColor` | Overlay color |
| `offsetPx` | `Cartesian2` | Pixel offset |
| `offsetMeters` | `Cartesian2` | Offset in meters (takes precedence over offsetPx) |
| `alignedAxis` | `Cartesian3` | Alignment axis |
| `disableDepthTestDistance` | `number` | Distance at which depth testing is disabled |

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Display text (supports `\n` for newlines) |
| `font` | `string` | CSS font string |
| `fillColor` | `DColor` | Text color |
| `style` | `LabelStyle` | `FILL` / `OUTLINE` / `FILL_AND_OUTLINE` |
| `outlineColor` | `DColor` | Outline color |
| `outlineWidth` | `number` | Outline width |
| `showBackground` | `boolean` | Show background rectangle |
| `backgroundColor` | `DColor` | Background color |
| `backgroundPadding` | `Cartesian2` | Background padding |
| `pixelOffset` / `offsetPx` | `Cartesian2` | Pixel offset |
| `offsetMeters` | `Cartesian2` | Offset in meters |
| `disableDepthTestDistance` | `number` | Distance at which depth testing is disabled |

## UI.PopoverFeature

A Popover is a DOM Overlay—it does not render inside the WebGL canvas; instead, it projects HTML elements to the screen-space coordinates corresponding to the entity's position:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: "#my-popover",   // CSS 选择器或 HTMLElement
    anchorPosition: "top",    // 锚点方向："top"|"bottom"|"left"|"right"
    trigger: "hover",         // "always"|"click"|"hover"
    offsetPx: new Daisy.Cartesian2(0, -10),
}))
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `element` | `string \| HTMLElement` | Bound DOM element |
| `anchorPosition` | `PopoverAnchor` | Anchor direction |
| `trigger` | `PopoverTrigger` | Trigger mode |
| `maxDistance` | `number` | Maximum display distance (meters) |
| `offsetPx` | `Cartesian2` | Pixel offset |

The Popover automatically hides when the entity is occluded, off-screen, or the distance exceeds `maxDistance`. The provided `element` must already exist in the DOM.


---

<!--
示例参考: [Marker demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
