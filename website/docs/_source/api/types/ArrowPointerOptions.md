[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerOptions

# Type Alias: ArrowPointerOptions

> **ArrowPointerOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

ArrowPointerFeature 配置。

## Type Declaration

### arrowSize?

> `optional` **arrowSize?**: `number`

箭头纹理大小（像素）。

#### Default

```ts
15
```

### color?

> `optional` **color?**: [`DColor`](DColor.md)

箭头颜色。

#### Default

```ts
Color.WHITE
```

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

显示距离条件。

若不设置，内部会按视距策略使用默认值（通常为 NEAR）。

### label?

> `optional` **label?**: [`ArrowPointerLabelOptions`](ArrowPointerLabelOptions.md)

箭头前端 label 配置。

可传 `ArrowPointerLabelOptions` 或直接传字符串（作为文本内容）。

### length?

> `optional` **length?**: `number`

箭头长度（单位：米）。

若设置该值，则优先使用“米长度”；否则使用 `lengthPx` 并依据当前视角换算米/像素。

### lengthPx?

> `optional` **lengthPx?**: `number`

箭头长度（单位：屏幕像素）。

#### Default

```ts
100
```

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### target

> **target**: [`ArrowPointerTarget`](ArrowPointerTarget.md)

指向目标。

支持坐标点、Daisy 实体、目标回调或内置目标名（sun/moon/mars/earthCenter）。

### width?

> `optional` **width?**: `number`

线宽（像素）。

最小为 1。

#### Default

```ts
5
```

## Example

```ts
const feature = new ArrowPointerFeature({
 target: ArrowPointerFeature.targetMoon,
 lengthPx: 120,
 width: 3,
 color: "cyan",
 label: { text: "MOON" }
});
entity.addFeature(feature);
```
