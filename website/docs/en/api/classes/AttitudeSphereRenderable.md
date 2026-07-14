[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereRenderable

# Class: AttitudeSphereRenderable

AttitudeSphereRenderable：一个用于显示姿态参考的 3D 球体组件。

组件包含：
- 半透明球体（可选）
- 球体线框（可选）
- XYZ 三轴箭头（可选）
- yaw/pitch/roll 三个参考圆（可选）
- XYZ 标签（可选）

## Remarks

- 姿态更新通过 `updateOrientation` 完成；内部会更新各 Primitive/Polyline/Label 的位置与旋转。
- 该类不自动订阅 帧回调；需要业务侧按需在相机/姿态变化时调用更新。

## Extended by

- [`AttitudeSphereMatrix4Renderable`](AttitudeSphereMatrix4Renderable.md)

## Constructors

### Constructor

> **new AttitudeSphereRenderable**(`viewer`, `options?`): `AttitudeSphereRenderable`

创建姿态球并立即加入到 viewer 的各类集合中。

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md)

创建参数。

#### Returns

`AttitudeSphereRenderable`

## Methods

### destroy()

> **destroy**(): `void`

从 viewer 的集合中移除所有创建的对象并释放引用。

#### Returns

`void`

***

### setCenter()

> **setCenter**(`center`): `void`

设置球心（世界坐标），并立即应用变换。

#### Parameters

##### center

`Cartesian3`

新球心坐标。

#### Returns

`void`

***

### setDistanceDisplayCondition()

> **setDistanceDisplayCondition**(`value`): `void`

#### Parameters

##### value

`DistanceDisplayCondition` \| `undefined`

#### Returns

`void`

***

### setRadius()

> **setRadius**(`radius`): `void`

设置球体半径，并立即应用变换（通过矩阵缩放，无几何重建）。

#### Parameters

##### radius

`number`

新半径（世界单位）。

#### Returns

`void`

***

### setShow()

> **setShow**(`value`): `void`

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### updateOrientation()

> **updateOrientation**(`matrix`): `void`

更新姿态旋转矩阵，并立即应用变换。

#### Parameters

##### matrix

`Matrix4` \| `Matrix3`

姿态矩阵（旋转）。

#### Returns

`void`

#### Remarks

- 传入 `Matrix4` 时只取其旋转部分（Matrix3）。
