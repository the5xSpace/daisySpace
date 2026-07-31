[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ImageOptions

# Type Alias: ImageOptions

> **ImageOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

ImageFeature 配置。

用于在 Entity 附近创建一个始终面向相机的图片渲染节点，并随实体位置在每帧更新。

设计要点：
- 该 Feature 自己管理节点创建/销毁（不依赖 Entity 的 property 系列）
- `position` 表示“实体局部坐标系下的偏移”，最终会叠加到实体当前位置
- 屏幕偏移支持“像素”和“米”两套口径；当提供米时，会在每帧按相机尺度换算为像素

## Type Declaration

### alignedAxis?

> `optional` **alignedAxis?**: `Daisy.Cartesian3`

对齐轴（通常用于让图片与某方向对齐）。

### color?

> `optional` **color?**: [`DColor`](DColor.md)

颜色。

说明：内部会在创建与更新阶段统一解析为渲染层颜色对象。

#### Default

```ts
WHITE
```

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

关闭深度测试的距离阈值（单位：米）。

值越大越倾向“始终可见”；通常用于 UI 类节点避免被场景遮挡。

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

显示距离条件。

用于在不同视距下自动隐藏/显示该节点（典型用于“远距离简化 UI 负担”）。

### eyeOffset?

> `optional` **eyeOffset?**: `Daisy.Cartesian3`

视点偏移（单位：米）。

### height?

> `optional` **height?**: `number`

高度。

- 当 `sizeInMeters=false`：单位为像素
- 当 `sizeInMeters=true`：单位为米

### heightReference?

> `optional` **heightReference?**: `Daisy.HeightReference`

高程参考。

### horizontalOrigin?

> `optional` **horizontalOrigin?**: `Daisy.HorizontalOrigin`

水平对齐。

### image?

> `optional` **image?**: `string` \| `HTMLCanvasElement` \| `HTMLImageElement` \| `ImageData`

图片资源。

可传图片 URL、Canvas、Image、ImageData 等。

### imageSubRegion?

> `optional` **imageSubRegion?**: `Daisy.BoundingRectangle`

图片裁剪区域。

### offsetMeters?

> `optional` **offsetMeters?**: `Daisy.Cartesian2`

屏幕偏移（单位：米）。

与 `offsetPx` 二选一；若同时设置则优先使用米。

说明：
- “米偏移”面向空间尺度表达：不随屏幕分辨率/缩放变化而改变语义
- 内部会在 update 周期通过相机尺度换算为像素偏移（见 update 中的 metersPerPixelAt）

### offsetPx?

> `optional` **offsetPx?**: `Daisy.Cartesian2`

屏幕像素偏移（单位：像素）。

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准（因为“米”会在每帧自适应换算）。

### pixelOffset?

> `optional` **pixelOffset?**: `Daisy.Cartesian2`

兼容字段：等同 `offsetPx`（单位：像素）。

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Daisy.Cartesian2`

兼容字段：等同 `offsetMeters`（单位：米）。

与 `offsetPx` 二选一；若同时设置则优先使用米。

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `Daisy.NearFarScalar`

像素偏移随距离缩放。

### position?

> `optional` **position?**: `Daisy.Cartesian3`

相对实体坐标系下的位置。

#### Default

```ts
Cartesian3.ZERO
```

### rotation?

> `optional` **rotation?**: `number`

旋转角（弧度）。

### scale?

> `optional` **scale?**: `number`

缩放比例。

#### Default

```ts
1
```

### scaleByDistance?

> `optional` **scaleByDistance?**: `Daisy.NearFarScalar`

按距离缩放。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### sizeInMeters?

> `optional` **sizeInMeters?**: `boolean`

是否使用“米”为单位的尺寸（否则 width/height 为像素）。

#### Default

```ts
false
```

### splitDirection?

> `optional` **splitDirection?**: `Daisy.SplitDirection`

分屏方向。

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `Daisy.NearFarScalar`

透明度随距离变化。

### verticalOrigin?

> `optional` **verticalOrigin?**: `Daisy.VerticalOrigin`

垂直对齐。

### width?

> `optional` **width?**: `number`

宽度。

- 当 `sizeInMeters=false`：单位为像素
- 当 `sizeInMeters=true`：单位为米
