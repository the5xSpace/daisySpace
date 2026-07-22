[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TilesetOptions

# Type Alias: TilesetOptions

> **TilesetOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

TilesetFeature configuration.

Used for loading and rendering 3D Tiles datasets (e.g., building models, point clouds, oblique photography, etc.).

Either `url` or `ionAssetId`: `url` takes priority.

## Type Declaration

### dynamicScreenSpaceError?

> `optional` **dynamicScreenSpaceError?**: `boolean`

Whether to enable dynamic screen space error.

When enabled, rendering quality adapts based on frame rate.

### id?

> `optional` **id?**: `string`

Custom identifier.

### ionAssetId?

> `optional` **ionAssetId?**: `number`

Ion asset resource ID.

Mutually exclusive with `url`; when used, the corresponding resource is fetched from Ion assets.

### maximumMemoryUsage?

> `optional` **maximumMemoryUsage?**: `number`

Maximum memory usage (unit: MB).

### maximumScreenSpaceError?

> `optional` **maximumScreenSpaceError?**: `number`

Maximum screen space error (unit: pixels).

Smaller values yield higher rendering quality but incur greater performance cost.

### modelMatrix?

> `optional` **modelMatrix?**: `Daisy.Matrix4`

Model transformation matrix.

Used for translating/rotating/scaling the 3D Tiles as a whole.

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

### url?

> `optional` **url?**: `string`

URL of the 3D Tiles dataset.

Mutually exclusive with `ionAssetId`; when both are provided, `url` takes priority.
