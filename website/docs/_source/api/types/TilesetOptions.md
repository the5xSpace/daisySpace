[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TilesetOptions

# Type Alias: TilesetOptions

> **TilesetOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

TilesetFeature 配置。

用于加载和渲染 3D Tiles 数据集（如建筑物模型、点云、倾斜摄影等）。

`url` 与 `ionAssetId` 二选一：优先使用 `url`。

## Type Declaration

### dynamicScreenSpaceError?

> `optional` **dynamicScreenSpaceError?**: `boolean`

是否启用动态屏幕空间误差。

启用后会根据帧率自适应调整渲染质量。

### id?

> `optional` **id?**: `string`

自定义标识。

### ionAssetId?

> `optional` **ionAssetId?**: `number`

Ion 资产 资源 ID。

与 `url` 二选一；使用时会从 Ion 资产 拉取对应资源。

### maximumMemoryUsage?

> `optional` **maximumMemoryUsage?**: `number`

最大内存使用量（单位：MB）。

### maximumScreenSpaceError?

> `optional` **maximumScreenSpaceError?**: `number`

最大屏幕空间误差（单位：像素）。

值越小渲染质量越高，但性能开销更大。

### modelMatrix?

> `optional` **modelMatrix?**: `Daisy.Matrix4`

模型变换矩阵。

用于对 3D Tiles 整体进行平移/旋转/缩放变换。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### url?

> `optional` **url?**: `string`

3D Tiles 数据集的 URL 地址。

与 `ionAssetId` 二选一；同时提供时优先使用 `url`。
