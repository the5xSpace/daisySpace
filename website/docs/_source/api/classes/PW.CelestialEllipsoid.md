[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialEllipsoid

# Class: CelestialEllipsoid

天体椭球（带世界位置偏移）

用途：在地球固定系（ECEF）场景中，将一个“局部椭球”（radii 与 Ellipsoid 一致）
放置到某个世界坐标位置（ECEF），并提供：
- “射线-椭球”交点计算
- 世界坐标 <-> 天体局部坐标（以天体中心为原点）的变换
- 动态天体（如月球/太阳）在每一帧根据时间更新其平移/旋转矩阵

坐标系约定：
- 场景默认使用地球固定系 ECEF，地心为 (0,0,0)
- `position` 必须是天体中心在 ECEF 下的世界坐标
- `orientation`（可选）用于把“天体局部坐标系”旋转到 ECEF（例如：让某天体的经纬度系在 ECEF 中保持自洽）
- `ray.origin` 与 `ray.direction` 必须是 ECEF 世界坐标；本类会把射线变换到天体局部坐标系再求交点

动态位置：
- 对于非地球天体（例如月球/太阳），天体中心在 ECEF 下随时间变化
- 可通过 `time` 提供当前时间，并让 `position(time)` 与 `orientation(time)` 依赖该时间
- 这样 `getLocalToWorldMatrix()` 会在每一帧返回新的矩阵；绘制对象（polygon/polyline/primitive 等）
 若以天体局部坐标定义，必须在每帧将点位乘上该矩阵（或设置 primitive.modelMatrix），否则会出现“贴地失败/位置漂移”

## Example

```ts
// 动态月球：位置每帧变化（ECEF）
const moon = new CelestialEllipsoid({
 ellipsoid: ELLIPSOID.MOON,
 time: () => viewer.clock.currentTime,
 position: (time) => Utils.getMoonPositionECEF(time),
});

// 世界射线与月球求交（命中点为 ECEF 坐标）
const ray = { origin: viewer.camera.positionWC, direction: viewer.camera.directionWC };
const hitECEF = moon.rayIntersection(ray);

// 若你要在“月球表面”贴地绘制，点位应当是“月球局部坐标”（以月心为原点，使用月球椭球）。
// 最常见的输入方式是“月球经纬度 + 高度”，它会生成月心为原点的 local Cartesian3：
const localOnMoon = Daisy.Cartesian3.fromDegrees(0, 0, 0, ELLIPSOID.MOON);

// 也可以直接传入任意“月心为原点”的 local Cartesian3（不一定必须经纬度）
const localAny = new Daisy.Cartesian3(1000, 0, 0);

// 使用本类把 local 点变换到 ECEF 世界，再交给 绘制（或把 modelMatrix 设为 getLocalToWorldMatrix）
const worldPoint = moon.localToWorldPoint(localOnMoon);
```

## Constructors

### Constructor

> **new CelestialEllipsoid**(`options`): `CelestialEllipsoid`

构造函数

#### Parameters

##### options

天体椭球参数

###### ellipsoid

`Ellipsoid`

###### orientation?

[`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md)

###### position

[`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

###### surfaceGravity?

`number`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const moon = new CelestialEllipsoid({
 ellipsoid: Daisy.ELLIPSOID.MOON,
 time: () => viewer.clock.currentTime,
 position: (t) => Daisy.Utils.getMoonPositionECEF(t),
 orientation: (t) => Daisy.Utils.getMoonRotationMatrix(t),
});
```

## Properties

### ellipsoid

> **ellipsoid**: `Ellipsoid`

天体椭球几何参数（radii 等）。

注意：该椭球本身始终以“天体局部坐标系（以天体中心为原点）”定义；
天体中心在世界坐标系（ECEF）中的平移/旋转由 `position/orientation` 决定。

***

### orientation

> **orientation**: [`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md) \| `undefined`

天体局部坐标系到 ECEF 的姿态来源（可选）。

- 未提供时视为单位旋转
- 对动态天体可传入函数按时间返回矩阵/四元数

***

### position

> **position**: [`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

天体中心在 ECEF 下的位置来源。

- 传入固定 Cartesian3：表示天体中心固定不动
- 传入函数：表示天体中心随时间变化（每帧可更新）

***

### surfaceGravity

> **surfaceGravity**: `number`

天体表面附近的重力加速度常量，单位 m/s²。

这是给视觉粒子、贴地局部动力学等短时效果使用的近似值；轨道动力学仍应使用专门的轨道/引力模型。

## Methods

### cameraHeightMeters()

> **cameraHeightMeters**(`cameraPositionECEF`, `time?`): `number` \| `null`

获取相机在天体表面的高度（米）

#### Parameters

##### cameraPositionECEF

`Cartesian3`

##### time?

`JulianDate`

#### Returns

`number` \| `null`

#### Example

```ts
const h = celestial.cameraHeightMeters(viewer.camera.positionWC);
```

***

### cartesianToCartographic()

> **cartesianToCartographic**(`cartesianECEF`): `Cartographic` \| `null`

将 ECEF 世界坐标转换为经纬度（Cartographic）

#### Parameters

##### cartesianECEF

`Cartesian3`

#### Returns

`Cartographic` \| `null`

#### Example

```ts
const carto = celestial.cartesianToCartographic(viewer.camera.positionWC);
```

***

### cartographicToCartesian()

> **cartographicToCartesian**(`cartographic`): `Cartesian3` \| `null`

将经纬度（Cartographic）转换为 ECEF 世界坐标

#### Parameters

##### cartographic

`Cartographic`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const carto = Daisy.Cartographic.fromDegrees(116.39, 39.9, 0);
const world = celestial.cartographicToCartesian(carto);
```

***

### computeGroundPositions()

> **computeGroundPositions**(`positions`, `options?`): `Cartesian3`[]

计算贴地路径采样点（可选闭合、排序与贴地）

#### Parameters

##### positions

`Cartesian3`[]

路径点（ECEF 世界坐标）

##### options?

采样配置

###### clampToGround?

`boolean`

是否贴地插值，默认 false

###### loop?

`boolean`

是否闭合路径，默认 false

###### sampleCount?

`number`

每段插值采样数（整数，>=1），默认 32

###### sortBefore?

`boolean`

是否在采样前按环绕角排序，默认 true

###### time?

`JulianDate`

#### Returns

`Cartesian3`[]

#### Example

```ts
const sampled = celestial.computeGroundPositions(path, {
 sampleCount: 32,
 clampToGround: true,
});
```

***

### computeRayEllipsoidGrazingPoint()

> **computeRayEllipsoidGrazingPoint**(`origin`, `direction`, `time?`): `Cartesian3` \| `null`

计算射线相对椭球的掠地切点（grazing point）。

当射线不直接命中椭球时，可用于构造与地平线连续的闭环弧段。

#### Parameters

##### origin

`Cartesian3`

##### direction

`Cartesian3`

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `null`

***

### computeRayEllipsoidIntersection()

> **computeRayEllipsoidIntersection**(`origin`, `direction`): `Cartesian3` \| `null`

计算射线与天体椭球交点（简化调用）

#### Parameters

##### origin

`Cartesian3`

##### direction

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const hit = celestial.computeRayEllipsoidIntersection(origin, direction);
```

***

### distanceBetweenECEFPointsStable()

> **distanceBetweenECEFPointsStable**(`aECEF`, `bECEF`, `time?`): `number` \| `null`

计算两个 ECEF 点之间的距离（数值更稳定，适用于非地球天体偏移场景）。

说明：
- 先将 ECEF 点变换到“天体局部坐标系”（以天体中心为原点），再计算欧氏距离
- 相比直接在 ECEF 上做 distance，在天体中心远离地心的情况下更不易出现精度问题

#### Parameters

##### aECEF

`Cartesian3`

点 A（ECEF）

##### bECEF

`Cartesian3`

点 B（ECEF）

##### time?

`JulianDate`

仿真时间（可选，默认取内部 timeProvider）

#### Returns

`number` \| `null`

***

### EdgePointsToCartographicByRayAndMatrix()

> **EdgePointsToCartographicByRayAndMatrix**(`edgePoints`, `rayPosition`, `matrix`): `Cartographic`[]

#### Parameters

##### edgePoints

`Cartesian3`[]

##### rayPosition

`Cartesian3`

##### matrix

`Matrix4`

#### Returns

`Cartographic`[]

***

### getBodyToWorldRotation()

> **getBodyToWorldRotation**(`time?`, `result?`): `Matrix3`

获取天体自转到世界坐标的旋转矩阵

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix3`

#### Returns

`Matrix3`

#### Example

```ts
const rot = celestial.getBodyToWorldRotation(viewer.clock.currentTime);
```

***

### getLocalToWorldMatrix()

> **getLocalToWorldMatrix**(`time?`, `result?`): `Matrix4` \| `null`

获取天体局部坐标到世界坐标的矩阵

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix4`

#### Returns

`Matrix4` \| `null`

#### Example

```ts
const localToWorld = celestial.getLocalToWorldMatrix();
```

***

### getPositionECEF()

> **getPositionECEF**(`time?`): `Cartesian3` \| `undefined`

获取天体中心的 ECEF 坐标

#### Parameters

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Example

```ts
const center = celestial.getPositionECEF(viewer.clock.currentTime);
```

***

### getSurfaceGravity()

> **getSurfaceGravity**(): `number`

获取天体表面附近的重力加速度常量，单位 m/s²。

#### Returns

`number`

***

### getTrajectorySample()

> **getTrajectorySample**(`centerTime`, `rangeSeconds?`, `stepSeconds?`, `referenceFrame?`): [`TrajectorySample`](TrajectorySample.md)

获取指定时间范围内的稀疏轨迹样本

#### Parameters

##### centerTime

`JulianDate`

中心时间

##### rangeSeconds?

`number` = `...`

前后范围（秒），默认 100 天 (86400 * 100)

##### stepSeconds?

`number` = `86400`

采样步长（秒），默认 1 天 (86400)

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.INERTIAL`

参考系，默认 INERTIAL (ICRF)

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
const sample = celestial.getTrajectorySample(
 viewer.clock.currentTime,
 86400 * 10,
 86400
);
```

***

### getWorldToLocalMatrix()

> **getWorldToLocalMatrix**(`time?`, `result?`): `Matrix4` \| `null`

获取世界坐标到天体局部坐标矩阵

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix4`

#### Returns

`Matrix4` \| `null`

#### Example

```ts
const worldToLocal = celestial.getWorldToLocalMatrix();
```

***

### isEarth()

> **isEarth**(`options?`): `boolean`

判断当前椭球是否为地球（位置接近原点且半径接近 WGS84）

#### Parameters

##### options?

判断条件

###### positionToleranceMeters?

`number`

位置容差（米），默认 1e-3

###### radiiToleranceMeters?

`number`

半径容差（米），默认 1e-3

###### time?

`JulianDate`

#### Returns

`boolean`

#### Example

```ts
const isEarth = celestial.isEarth();
```

***

### localToWorldPoint()

> **localToWorldPoint**(`cartesianLocal`, `time?`, `result?`): `Cartesian3` \| `null`

将天体局部坐标转换为 ECEF 世界坐标

#### Parameters

##### cartesianLocal

`Cartesian3`

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const local = new Daisy.Cartesian3(1000, 0, 0);
const world = celestial.localToWorldPoint(local);
```

***

### rayIntersection()

> **rayIntersection**(`ray`, `time?`): `Cartesian3` \| `null`

计算射线与天体椭球的交点（返回最近的有效交点）。

- 返回值坐标为 ECEF 世界坐标
- 未命中或位置无效时返回 `null`

#### Parameters

##### ray

[`CelestialRayLike`](../types/PW.CelestialRayLike.md)

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const ray = { origin: viewer.camera.positionWC, direction: viewer.camera.directionWC };
const hit = celestial.rayIntersection(ray);
```

***

### sortPositions()

> **sortPositions**(`positions`, `time?`): `Cartesian3`[]

#### Parameters

##### positions

`Cartesian3`[]

##### time?

`JulianDate`

#### Returns

`Cartesian3`[]

***

### worldToLocalPoint()

> **worldToLocalPoint**(`cartesianECEF`, `time?`, `result?`): `Cartesian3` \| `null`

将 ECEF 世界坐标转换为天体局部坐标

#### Parameters

##### cartesianECEF

`Cartesian3`

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const local = celestial.worldToLocalPoint(viewer.camera.positionWC);
```

***

### create()

> `static` **create**(`options`): `CelestialEllipsoid`

创建天体椭球实例

#### Parameters

##### options

###### ellipsoid

`Ellipsoid`

###### orientation?

[`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md)

###### position

[`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

###### surfaceGravity?

`number`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const mars = CelestialEllipsoid.create({
 ellipsoid: Daisy.ELLIPSOID.MARS,
 time: () => viewer.clock.currentTime,
 position: (time) => Daisy.Utils.getMarsPositionECEF(time),
});
```

***

### Earth()

> `static` **Earth**(`options?`): `CelestialEllipsoid`

创建地球椭球（ECEF 原点即地心）。

约定：在 Daisy 的 Fixed/ECEF 坐标系下，地球中心点就是 (0, 0, 0)。

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const earth = CelestialEllipsoid.Earth();
```

***

### Mars()

> `static` **Mars**(`options?`): `CelestialEllipsoid`

创建火星椭球：火星中心位置使用 Daisy 内置的行星历计算。

火星对象目前没有独立的体轴旋转模型，因此这里只负责火星中心平移和局部椭球坐标转换。

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

***

### Moon()

> `static` **Moon**(`options?`): `CelestialEllipsoid`

创建月球椭球：月心位置使用 Daisy 内置的 Simon1994 行星历计算（先得惯性系，再转 ECEF）。

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
import { , CelestialEllipsoid } from "daisy-space-sdk";

const moon = CelestialEllipsoid.Moon({
 time: () => Daisy.JulianDate.now(),
});
```

***

### setActiveCamerasProvider()

> `static` **setActiveCamerasProvider**(`provider?`): `void`

注册活动相机提供器

- 用于位置缓存策略判断“相机是否靠近天体”

#### Parameters

##### provider?

() => `Camera`[]

#### Returns

`void`

#### Example

```ts
CelestialEllipsoid.setActiveCamerasProvider(() => viewer.getAllCesiumCameras());
```

***

### setClockMultiplierProvider()

> `static` **setClockMultiplierProvider**(`provider?`): `void`

注册时钟倍速提供器

- 用于在高倍速时降低缓存时效

#### Parameters

##### provider?

() => `number`

#### Returns

`void`

#### Example

```ts
CelestialEllipsoid.setClockMultiplierProvider(() => viewer.clock.multiplier);
```

***

### Sun()

> `static` **Sun**(`options?`): `CelestialEllipsoid`

创建太阳椭球：太阳中心位置使用 内置的 Simon1994 行星历计算（先得惯性系，再转 ECEF）。

说明： 未内置 Sun Ellipsoid，这里默认以太阳平均半径构造球形椭球。

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const sun = CelestialEllipsoid.Sun({
 time: () => Daisy.JulianDate.now(),
});
```
