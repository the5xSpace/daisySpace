[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / PlaneGridStyle

# Type Alias: PlaneGridStyle

> **PlaneGridStyle** = `object`

## Properties

### cellAlpha?

> `optional` **cellAlpha?**: `number`

Grid cell fill alpha (0~1).

#### Default

```ts
0.1
```

***

### cellPixelSize?

> `optional` **cellPixelSize?**: `number`

Target grid cell screen pixel size (only effective when followCamera=true).

#### Default

```ts
80
```

***

### followCamera?

> `optional` **followCamera?**: `boolean`

Whether to auto-adjust grid density based on camera distance for more stable visual grid density on screen.

#### Default

```ts
true
```

***

### linePixelWidth?

> `optional` **linePixelWidth?**: `number`

Grid line width (pixels).

#### Default

```ts
1
```

***

### maxCellSizeMeters?

> `optional` **maxCellSizeMeters?**: `number`

Maximum grid cell size (meters), used to limit sparsity (only effective when followCamera=true).

#### Default

```ts
5000000000
```

***

### minCellSizeMeters?

> `optional` **minCellSizeMeters?**: `number`

Minimum grid cell size (meters), used to limit density that causes flickering (only effective when followCamera=true).

#### Default

```ts
100000
```
