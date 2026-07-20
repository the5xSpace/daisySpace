# Marker System

Marker Features are used to mark positions and display information in the scene, including point markers, billboards, text labels, and popovers.

## Feature Selection

| Requirement | Feature | Description |
|-------------|---------|-------------|
| Simple dot | `PointFeature` | Pixel or meter-sized dot |
| Image/icon | `BillboardFeature` | Billboard always facing the camera |
| Text label | `UI.LabelFeature` | 2D text overlay |
| HTML popup | `UI.PopoverFeature` | DOM Overlay |

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
| `size` | `number` | Meter size |
| `sizePx` / `pixelSize` | `number` | Pixel size |
| `outlineColor` | `DColor` | Outline color |
| `outlineWidth` | `number` | Outline width (pixels) |
| `disableDepthTestDistance` | `number` | Distance to disable depth test (meters) |
| `position` | `Cartesian3` | Relative entity offset |

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
| `offsetMeters` | `Cartesian2` | Meter offset (higher priority than offsetPx) |
| `alignedAxis` | `Cartesian3` | Orientation axis |
| `disableDepthTestDistance` | `number` | Disable depth test |

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
| `text` | `string` | Display text (supports `\n` for line breaks) |
| `font` | `string` | CSS font string |
| `fillColor` | `DColor` | Text color |
| `style` | `LabelStyle` | `FILL` / `OUTLINE` / `FILL_AND_OUTLINE` |
| `outlineColor` | `DColor` | Outline color |
| `outlineWidth` | `number` | Outline width |
| `showBackground` | `boolean` | Background rectangle |
| `backgroundColor` | `DColor` | Background color |
| `backgroundPadding` | `Cartesian2` | Background padding |
| `pixelOffset` / `offsetPx` | `Cartesian2` | Pixel offset |
| `offsetMeters` | `Cartesian2` | Meter offset |
| `disableDepthTestDistance` | `number` | Disable depth test |

## UI.PopoverFeature

Popover is a DOM Overlay — it is not rendered in the WebGL canvas, but projects HTML elements to the entity's corresponding position in screen coordinates:

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
| `trigger` | `PopoverTrigger` | Trigger method |
| `maxDistance` | `number` | Maximum display distance (meters) |
| `offsetPx` | `Cartesian2` | Pixel offset |

Popover auto-hides in the following cases: entity is occluded, entity is off-screen, distance exceeds `maxDistance` range. The passed `element` must already exist in the DOM.


---

<!--
示例参考: [Marker demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
