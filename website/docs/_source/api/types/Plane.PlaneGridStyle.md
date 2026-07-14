[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / PlaneGridStyle

# Type Alias: PlaneGridStyle

> **PlaneGridStyle** = `object`

## Properties

### cellAlpha?

> `optional` **cellAlpha?**: `number`

网格单元填充透明度（0~1）。

#### Default

```ts
0.1
```

***

### cellPixelSize?

> `optional` **cellPixelSize?**: `number`

目标网格单元的屏幕像素尺寸（仅 followCamera=true 生效）。

#### Default

```ts
80
```

***

### followCamera?

> `optional` **followCamera?**: `boolean`

是否根据相机距离自动调整网格密度，使屏幕上网格视觉密度更稳定。

#### Default

```ts
true
```

***

### linePixelWidth?

> `optional` **linePixelWidth?**: `number`

网格线宽（像素）。

#### Default

```ts
1
```

***

### maxCellSizeMeters?

> `optional` **maxCellSizeMeters?**: `number`

网格单元最大尺寸（单位：米），用于限制过稀（仅 followCamera=true 生效）。

#### Default

```ts
5000000000
```

***

### minCellSizeMeters?

> `optional` **minCellSizeMeters?**: `number`

网格单元最小尺寸（单位：米），用于限制过密导致闪烁（仅 followCamera=true 生效）。

#### Default

```ts
100000
```
