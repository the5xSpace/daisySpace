[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineOptions

# Type Alias: PolylineOptions

> **PolylineOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolylineFeature 配置。

通过 `pathway` 描述线段路径，支持点位、实体引用与父实体占位符。

## Type Declaration

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

是否始终可见（被地球遮挡时使用 depthFailMaterial 绘制）。

#### Default

```ts
false
```

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

折线插值方式。

用于控制相邻采样点之间如何连线。

### clampToGround?

> `optional` **clampToGround?**: `boolean`

是否贴地。

#### Default

```ts
true
```

### classificationType?

> `optional` **classificationType?**: `ClassificationType`

贴地折线分类目标。

仅在 `clampToGround=true` 且底层使用 GroundPolylinePrimitive 时生效。

#### Default

```ts
ClassificationType.BOTH
```

### depthFailMaterial?

> `optional` **depthFailMaterial?**: [`DMaterial`](DMaterial.md)

深度失败材质（可选）。

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

贴地计算与天体跟随所使用的中心天体定义。

注意：一旦该组件添加到实体上，会被实体自身的中心天体配置覆盖，
组件将始终遵循实体当前绑定的中心天体。

注意：当使用非默认中心天体时，`pathway` 中的点位应为该天体局部坐标。

#### Default

```ts
CelestialEllipsoid.Earth()
```

### loop?

> `optional` **loop?**: `boolean`

是否闭合为环。

#### Default

```ts
false
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

材质。

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

### pathway?

> `optional` **pathway?**: [`Pathway`](Pathway.md)

折线路径。

支持点位、实体引用与父实体占位符。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### sortBefore?

> `optional` **sortBefore?**: `boolean`

贴地采样前是否按地理顺序排序点位。
对于时间序列轨迹应设为 false 以保持时间顺序。

#### Default

```ts
true
```

### trackingTarget?

> `optional` **trackingTarget?**: `PolylineTrackTarget`

`trackTarget` 的兼容别名，与 Feature.enableTracking 的命名保持一致。

### trackTarget?

> `optional` **trackTarget?**: `PolylineTrackTarget`

自动追踪目标。

当配置该项时，PolylineFeature 会把目标补入 `pathway`：
- 未提供 pathway：使用 `[REF.SELF_ENTITY, trackTarget]`
- pathway 只有宿主/起点：追加 `trackTarget` 作为终点

适合表达“宿主实体始终连到某个动态目标”的链路线。

### width?

> `optional` **width?**: `number`

线宽（像素）。

最小为 1。

#### Default

```ts
2
```
