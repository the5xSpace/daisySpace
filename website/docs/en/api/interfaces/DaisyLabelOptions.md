[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyLabelOptions

# Interface: DaisyLabelOptions

Daisy 标签配置，用于在实体附近创建文本标签节点。

## Properties

### backgroundColor?

> `optional` **backgroundColor?**: [`DColor`](../types/DColor.md)

背景颜色。

***

### backgroundPadding?

> `optional` **backgroundPadding?**: `Cartesian2`

背景内边距。

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

关闭深度检测的距离阈值（单位：米）。

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

***

### eyeOffset?

> `optional` **eyeOffset?**: `Cartesian3`

视点偏移（单位：米）。

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](../types/DColor.md)

文本填充色。

***

### font?

> `optional` **font?**: `string`

字体，如 `"16px sans-serif"`。

***

### heightReference?

> `optional` **heightReference?**: `HeightReference`

高程参考。

***

### horizontalOrigin?

> `optional` **horizontalOrigin?**: `HorizontalOrigin`

水平对齐方式。

***

### id?

> `optional` **id?**: `string`

自定义标识。

***

### offsetMeters?

> `optional` **offsetMeters?**: `Cartesian2`

屏幕偏移（单位：米）。与 `offsetPx` 二选一；若同时设置则优先使用米。

***

### offsetPx?

> `optional` **offsetPx?**: `Cartesian2`

屏幕像素偏移（单位：像素）。与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

文本描边颜色。

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

文本描边宽度（单位：像素）。

***

### pixelOffset?

> `optional` **pixelOffset?**: `Cartesian2`

兼容字段：等同 `offsetPx`（单位：像素）。

***

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Cartesian2`

兼容字段：等同 `offsetMeters`（单位：米）。

***

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `NearFarScalar`

像素偏移随距离缩放。

***

### position?

> `optional` **position?**: `Cartesian3`

相对实体坐标系下的位置。

***

### scale?

> `optional` **scale?**: `number`

缩放比例。

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

缩放随距离变化。

***

### show?

> `optional` **show?**: `boolean`

是否显示。

***

### showBackground?

> `optional` **showBackground?**: `boolean`

是否显示背景。

***

### style?

> `optional` **style?**: `LabelStyle`

标签样式（填充/描边/填充加描边）。

***

### text?

> `optional` **text?**: `string`

显示的文本内容。

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `NearFarScalar`

透明度随距离变化。

***

### verticalOrigin?

> `optional` **verticalOrigin?**: `VerticalOrigin`

垂直对齐方式。
