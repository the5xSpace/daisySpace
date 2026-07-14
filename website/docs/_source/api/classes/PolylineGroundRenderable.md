[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineGroundRenderable

# Class: PolylineGroundRenderable

PolylineGroundRenderable：基于 `viewer.collections.polylineCollection` 的折线封装。

该类负责折线的创建、位置更新以及销毁，避免业务代码直接操作 Collection 的细节。

## Example

```ts
const renderable = new PolylineGroundRenderable(viewer, {
 positions,
 clampToGround: true,
});

renderable.updatePositions(nextPositions);
renderable.destroy();
```

## Constructors

### Constructor

> **new PolylineGroundRenderable**(`viewer`, `options?`): `PolylineGroundRenderable`

创建一条折线并立即加入到 `viewer.collections.polylineCollection`。

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`PolylineGroundOptions`](../types/PolylineGroundOptions.md)

折线配置参数。

#### Returns

`PolylineGroundRenderable`

## Methods

### create()

> **create**(): `void`

创建 Polyline 并加入到 polylineCollection。

#### Returns

`void`

#### Remarks

若 `clampToGround=true`，会在创建时对 `positions` 进行贴地采样插值。

***

### destroy()

> **destroy**(): `void`

从 `viewer.collections.polylineCollection` 移除并释放引用。

#### Returns

`void`

***

### setAlwaysOnTop()

> **setAlwaysOnTop**(`alwaysOnTop`): `void`

#### Parameters

##### alwaysOnTop

`boolean`

#### Returns

`void`

***

### setArcType()

> **setArcType**(`arcType`): `void`

#### Parameters

##### arcType

`ArcType` \| `undefined`

#### Returns

`void`

***

### setDepthFailMaterial()

> **setDepthFailMaterial**(`material`): `void`

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

#### Returns

`void`

***

### setMaterial()

> **setMaterial**(`material`): `void`

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md)

#### Returns

`void`

***

### setShow()

> **setShow**(`show`): `void`

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### setWidth()

> **setWidth**(`width`): `void`

#### Parameters

##### width

`number`

#### Returns

`void`

***

### updatePositions()

> **updatePositions**(`positions`): `void`

更新折线控制点。

#### Parameters

##### positions

`Cartesian3`[]

新的折线控制点（世界坐标）。

#### Returns

`void`

#### Remarks

- 当 `clampToGround=true` 时，会自动重新计算贴地采样后的点集。
