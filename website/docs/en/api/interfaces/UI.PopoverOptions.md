[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [UI](../modules/UI.md) / PopoverOptions

# Interface: PopoverOptions

DOM Overlay Feature Options
配置选项接口

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### anchorPosition?

> `optional` **anchorPosition?**: [`PopoverAnchor`](../types/UI.PopoverAnchor.md)

Position relative to the entity.
相对于实体的定位锚点

#### Default

```ts
'top'
```

***

### backgroundColor?

> `optional` **backgroundColor?**: [`DColor`](../types/DColor.md)

Background color of the overlay.
弹窗背景颜色

#### Default

```ts
'rgba(0, 0, 0, 0.75)'
```

***

### backgroundOpacity?

> `optional` **backgroundOpacity?**: `number`

Background opacity override.
背景透明度覆盖值；设置后会覆盖 `backgroundColor` 自身的 alpha。

***

### closeOnEsc?

> `optional` **closeOnEsc?**: `boolean`

是否按 ESC 关闭（仅在 `trigger !== 'always'` 时生效）。
`always` 模式不会安装 ESC 关闭监听；如需关闭请调用 `hide()`。

#### Default

```ts
trigger !== 'always'
```

***

### closeOnOutsideClick?

> `optional` **closeOnOutsideClick?**: `boolean`

是否在点击弹窗外部时关闭（仅在 `trigger !== 'always'` 时生效）。
`always` 模式不会安装外部点击关闭监听；如需关闭请调用 `hide()`。

#### Default

```ts
trigger !== 'always'
```

***

### color?

> `optional` **color?**: `string`

Text color (if applicable).
文本颜色

#### Default

```ts
'white'
```

***

### destroyDOM?

> `optional` **destroyDOM?**: `boolean`

Whether to destroy the bound DOM element when this feature is destroyed.
If false, the element will be hidden (display: none) and appended to the body (or left where it is but hidden).
销毁时是否移除绑定的 DOM 元素。
若为 false，则仅隐藏并将元素移回 body；若为 true，则从 DOM 树中彻底移除。

#### Default

```ts
false
```

***

### element

> **element**: `string` \| `HTMLElement`

The DOM element to bind. Can be a CSS selector string or an HTMLElement.
绑定的 DOM 元素，支持 CSS 选择器或直接传入 HTMLElement 对象

***

### fixedHeight?

> `optional` **fixedHeight?**: `string` \| `number`

Fixed height of the content area.
内容区域固定高度

***

### fixedWidth?

> `optional` **fixedWidth?**: `string` \| `number`

Fixed width of the content area.
内容区域固定宽度

***

### frame?

> `optional` **frame?**: `boolean`

Whether to show the default frame (background, padding, border-radius) on the content wrapper.
是否显示默认外框（背景色、内边距、圆角）。
Set to `false` when your custom element has its own styling and you don't want
the built-in dark frame to interfere.
当自定义元素自带样式、不希望内置深色框体干扰时设为 false。

#### Default

```ts
true
```

***

### gap?

> `optional` **gap?**: `number`

Distance from the anchor point (gap).
箭头尖端距离目标点的间隙距离（像素）。
会根据 anchorPosition 自动调整方向：
- top: 向上偏移
- bottom: 向下偏移
- left: 向左偏移
- right: 向右偏移

#### Default

```ts
0
```

***

### gapMeters?

> `optional` **gapMeters?**: `number`

Distance from the anchor point (gap).
箭头尖端距离目标点的间隙距离（单位：米）。

与 `gapPx` 二选一；若同时设置则优先使用米。

***

### gapPx?

> `optional` **gapPx?**: `number`

Distance from the anchor point (gap).
箭头尖端距离目标点的间隙距离（单位：像素）。

与 `gapMeters` 同时设置时，以 `gapMeters` 为准。

***

### hoverDelayMs?

> `optional` **hoverDelayMs?**: `number`

hover 模式下的隐藏延迟（毫秒）。

#### Default

```ts
120
```

***

### id?

> `optional` **id?**: `string`

自定义标识（用于底层渲染对象标识/检索）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### maxDistance?

> `optional` **maxDistance?**: `number`

Max visibility distance in meters.
最大显示距离（米）。
超过此距离将自动隐藏。

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### offset?

> `optional` **offset?**: `object`

Offset in screen pixels.
屏幕像素偏移量 (X, Y)（单位：像素）

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

兼容字段：等同 `offsetPx`。

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### offsetMeters?

> `optional` **offsetMeters?**: `object`

Offset in meters.
屏幕偏移量 (X, Y)（单位：米）

与 `offsetPx` 二选一；若同时设置则优先使用米。

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### offsetPx?

> `optional` **offsetPx?**: `object`

Offset in screen pixels.
屏幕像素偏移量 (X, Y)（单位：像素）

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### show?

> `optional` **show?**: `boolean`

Initial visibility.
初始显示状态

#### Default

```ts
true
```

***

### snapToPixel?

> `optional` **snapToPixel?**: `boolean`

Snap DOM position to integer CSS pixels.
将 DOM 位置吸附到整像素，减少亚像素抗锯齿造成的文字抖动。

#### Default

```ts
true
```

***

### trigger?

> `optional` **trigger?**: [`PopoverTrigger`](../types/UI.PopoverTrigger.md)

触发方式。

- `always`：始终显示（默认）
- `click`：点击实体显示，取消选择隐藏
- `hover`：悬停实体显示，移出后延迟隐藏

#### Default

```ts
'always'
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
