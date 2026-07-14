[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraOptions

# Type Alias: ArcRotateCameraOptions

> **ArcRotateCameraOptions** = `object`

环绕相机配置项。

- viewForm 优先级高于 initialXXX
- localBodyAxis 可用于覆盖目标的局部坐标系（用于定义“绕谁转”的参考轴）

## Properties

### disableGroundCollisionSlideBelowTargetHeight?

> `optional` **disableGroundCollisionSlideBelowTargetHeight?**: `number`

当目标离椭球地表低于该高度（米）时，自动禁用触地绕行策略。

近地目标继续使用触地绕行容易把相机压进地表，设置该阈值后会改为阻止继续下拉。

***

### enableGroundCollisionSlide?

> `optional` **enableGroundCollisionSlide?**: `boolean`

是否允许相机视线触地后压缩有效半径，形成“贴地绕行/从底部绕过”的交互。

关闭后，继续向地面方向拖拽会被阻止，但水平旋转、向上拖拽和缩放仍可继续。

#### Default

```ts
true
```

***

### initialPhi?

> `optional` **initialPhi?**: `number`

***

### initialPhiDeg?

> `optional` **initialPhiDeg?**: `number`

***

### initialRadius?

> `optional` **initialRadius?**: `number`

***

### initialRoll?

> `optional` **initialRoll?**: `number`

***

### initialRollDeg?

> `optional` **initialRollDeg?**: `number`

***

### initialTheta?

> `optional` **initialTheta?**: `number`

***

### localBodyAxis?

> `optional` **localBodyAxis?**: `object`

#### x

> **x**: `Daisy.Cartesian3`

#### y

> **y**: `Daisy.Cartesian3`

#### z

> **z**: `Daisy.Cartesian3`

***

### radiusMultiplier?

> `optional` **radiusMultiplier?**: `number`

***

### targetFrameMode?

> `optional` **targetFrameMode?**: [`ArcRotateTargetFrameMode`](ArcRotateTargetFrameMode.md)

跟随参考系模式。

#### Default

```ts
"model"
```

***

### viewForm?

> `optional` **viewForm?**: [`ArcRotateCameraViewForm`](ArcRotateCameraViewForm.md)
