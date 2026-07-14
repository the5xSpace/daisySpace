[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceStrategy

# Class: ViewDistanceStrategy

视距策略管理器。

用于：
- 按“场景模板”管理不同尺度的 `DistanceDisplayCondition`
- 计算相机到目标点（ECEF）的距离，并据此判断是否满足显示距离

## Example

```ts
const strategy = new ViewDistanceStrategy({ scene: ViewScene.SPACE });
strategy.setScene(ViewScene.GROUND);
```

## Constructors

### Constructor

> **new ViewDistanceStrategy**(`options?`): `ViewDistanceStrategy`

#### Parameters

##### options?

[`ViewDistanceStrategyOptions`](../interfaces/ViewDistanceStrategyOptions.md)

#### Returns

`ViewDistanceStrategy`

## Accessors

### PathResolutionScale

#### Get Signature

> **get** **PathResolutionScale**(): `number`

路径分辨率缩放系数（默认 1）。

数值越大，路径显示更平滑，但开销更高。

##### Returns

`number`

#### Set Signature

> **set** **PathResolutionScale**(`scale`): `void`

设置路径分辨率缩放系数。

##### Parameters

###### scale

`number`

必须为正数

##### Returns

`void`

## Methods

### anyCameraInDistanceDisplayCondition()

> **anyCameraInDistanceDisplayCondition**(`cameras`, `positionECEF`, `ddc?`, `options?`): `boolean`

判断是否存在任意相机满足距离显示条件（near/far）。

#### Parameters

##### cameras

`Camera`[]

相机数组（主相机/额外相机）

##### positionECEF

`Cartesian3`

目标位置（ECEF）

##### ddc?

`DistanceDisplayCondition`

距离显示条件；为空时视为永远可见

##### options?

可选计算参数

###### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

###### time?

`JulianDate`

#### Returns

`boolean`

#### Example

```ts
const visible = strategy.anyCameraInDistanceDisplayCondition(cameras, targetPos, ddc);
```

***

### computeCameraToPositionDistance()

> **computeCameraToPositionDistance**(`cameraPositionECEF`, `positionECEF`, `options?`): `number`

计算相机到目标点的距离（米）。

#### Parameters

##### cameraPositionECEF

`Cartesian3`

相机位置（ECEF）

##### positionECEF

`Cartesian3`

目标位置（ECEF）

##### options?

可选计算参数

###### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

###### time?

`JulianDate`

#### Returns

`number`

#### Example

```ts
const d = strategy.computeCameraToPositionDistance(cameraPos, targetPos);
```

***

### getDistanceDisplayCondition()

> **getDistanceDisplayCondition**(`level`): `DistanceDisplayCondition`

获取指定视距等级对应的距离显示条件。

#### Parameters

##### level

[`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

视距等级

#### Returns

`DistanceDisplayCondition`

***

### getScene()

> **getScene**(): `string`

获取当前场景模板名。

#### Returns

`string`

***

### getViewDistance()

> **getViewDistance**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

获取当前场景对应的视距模板。

#### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

***

### hasTemplate()

> **hasTemplate**(`name`): `boolean`

判断是否存在指定模板名。

#### Parameters

##### name

`string`

模板名

#### Returns

`boolean`

***

### registerTemplate()

> **registerTemplate**(`name`, `template`): `void`

注册/覆盖一个视距模板。

#### Parameters

##### name

`string`

模板名

##### template

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

模板对象

#### Returns

`void`

#### Example

```ts
strategy.registerTemplate("custom", template);
```

***

### setScene()

> **setScene**(`scene`): `void`

切换当前场景模板。

#### Parameters

##### scene

`string`

模板名（如 `ViewScene.SPACE`）

#### Returns

`void`

#### Example

```ts
strategy.setScene(ViewScene.AVIATION);
```
