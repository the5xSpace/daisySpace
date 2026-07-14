[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraMaintainer

# Class: ArcRotateCameraMaintainer

环绕相机维护器（ArcRotate）。

面向“围绕某个目标点旋转/缩放”的跟随视角需求：内部维护一组环绕参数（水平角/俯仰角/距离/滚转），并在每帧根据目标的位姿求解并应用相机姿态。

特性：
- 支持 DaisyEntity / 兼容对象（只要能提供 worldMatrix / 或可回退到 position）
- 支持目标 worldMatrix 缺失时的 fallback（优先使用上一次有效矩阵；或从状态 position 生成平移矩阵）
- 支持椭球地表碰撞约束（限制相机不会落到地表以下）
- 支持 roll（绕视线方向的滚转）
- 可安装输入监听：拖拽环绕、滚轮缩放；并支持禁用/恢复宿主的屏幕空间控制器

使用建议：
- 业务上通常通过 `viewer.camera.followTarget(...)` 使用跟随能力；只有在需要自定义目标解析、输入、碰撞策略时才直接使用本类。

## Example

```ts
// 低层使用方式：自行维护生命周期与每帧 update
const maintainer = new Daisy.ArcRotateCameraMaintainer(entity, viewer.camera, {
 viewForm: { theta: Math.PI, phi: 0.2, radius: 10000, roll: 0 },
})

maintainer.attach()

// 可选：安装输入（拖拽/滚轮）
maintainer.installInputListeners({
 canvas: viewer._originScene.canvas,
 screenSpaceCameraController: viewer._originScene.screenSpaceCameraController,
})

// 接入渲染循环（time 由外部回调传入）
const remove = viewer._originScene.preRender.addEventListener((_, time) => {
 maintainer.update(time)
})

// 清理
// remove(); maintainer.dispose()
```

## Constructors

### Constructor

> **new ArcRotateCameraMaintainer**(`entity`, `camera`, `options?`): `ArcRotateCameraMaintainer`

#### Parameters

##### entity

[`ArcRotateDaisyEntityLike`](../types/ArcRotateDaisyEntityLike.md)

跟随目标（DaisyEntity 或兼容对象）

##### camera

[`ArcRotateCameraHost`](../types/ArcRotateCameraHost.md)

相机宿主（提供底层相机引用）

##### options?

[`ArcRotateCameraOptions`](../types/ArcRotateCameraOptions.md)

初始化视角与局部坐标系配置

#### Returns

`ArcRotateCameraMaintainer`

### Constructor

> **new ArcRotateCameraMaintainer**(`entity`, `camera`, `options?`): `ArcRotateCameraMaintainer`

#### Parameters

##### entity

[`ArcRotateEntityLike`](../types/ArcRotateEntityLike.md)

##### camera

[`ArcRotateCameraHost`](../types/ArcRotateCameraHost.md)

##### options?

[`ArcRotateCameraOptions`](../types/ArcRotateCameraOptions.md)

#### Returns

`ArcRotateCameraMaintainer`

## Accessors

### disposed

#### Get Signature

> **get** **disposed**(): `boolean`

是否已释放。

##### Returns

`boolean`

***

### mode

#### Get Signature

> **get** **mode**(): [`ArcRotateCameraMode`](../types/ArcRotateCameraMode.md)

当前工作模式：
- Initial：初始化（尚未进入稳定跟随）
- Follow：跟随中（每帧根据目标刷新）
- UserControl：外部正在直接操控相机（可在结束时回灌状态）

##### Returns

[`ArcRotateCameraMode`](../types/ArcRotateCameraMode.md)

## Methods

### attach()

> **attach**(): `void`

初始化并挂接到目标，进入跟随模式。

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

释放资源并解除引用（包含输入监听的卸载与 sscc 状态恢复）。

#### Returns

`void`

***

### installInputListeners()

> **installInputListeners**(`options`): `void`

安装输入监听（拖拽环绕、滚轮缩放）。

该方法不会直接改动相机，而是将输入转换为环绕/缩放意图交由内部控制器处理；
同时会暂时禁用 `screenSpaceCameraController` 的输入，并在卸载时恢复。

#### Parameters

##### options

[`ArcRotateInputInstallOptions`](../types/ArcRotateInputInstallOptions.md)

#### Returns

`void`

***

### onUserControlEnd()

> **onUserControlEnd**(): `void`

标记离开用户控制模式，并将当前相机状态回灌到内部环绕参数。

#### Returns

`void`

***

### onUserControlStart()

> **onUserControlStart**(): `void`

标记进入用户控制模式（外部开始直接操控相机时调用）。

#### Returns

`void`

***

### orbitBy()

> **orbitBy**(`deltaTheta`, `deltaPhi`): `void`

按角度增量执行环绕。

#### Parameters

##### deltaTheta

`number`

水平方向增量（弧度）

##### deltaPhi

`number`

垂直方向增量（弧度）

#### Returns

`void`

***

### uninstallInputListeners()

> **uninstallInputListeners**(`options?`): `void`

卸载输入监听，并恢复 `screenSpaceCameraController` 状态。

#### Parameters

##### options?

###### screenSpaceCameraController?

`any`

#### Returns

`void`

***

### update()

> **update**(`time`): `void`

每帧更新（由外部渲染循环传入当前仿真时间）。

注意：禁止在内部隐式获取 time，必须由调用方显式传入。

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

***

### zoomByScale()

> **zoomByScale**(`scale`): `void`

按比例缩放（>0，越大越远）。

#### Parameters

##### scale

`number`

#### Returns

`void`
