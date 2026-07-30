[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Camera

# Class: Camera

相机管理类
用于管理场景中的相机操作，包括实体追踪、视锥显示等功能

## Example

```ts
const camera = new Camera(viewer);
```

## Extended by

- [`ExtraCamera`](ExtraCamera.md)

## Properties

### id

> **id**: `string`

***

### viewer

> **viewer**: [`Engine`](Engine.md) \| `undefined`

关联的引擎实例。

## Accessors

### isMainCamera

#### Get Signature

> **get** **isMainCamera**(): `boolean`

是否为主相机

##### Returns

`boolean`

***

### trackedEntity

#### Get Signature

> **get** **trackedEntity**(): [`FollowTarget`](../types/FollowTarget.md) \| `undefined`

##### Returns

[`FollowTarget`](../types/FollowTarget.md) \| `undefined`

## Methods

### cameraToWorldCoordinates()

> **cameraToWorldCoordinates**(`cartesian`, `result?`): `Cartesian4`

将相机参考系中的向量/点变换到世界坐标系。

#### Parameters

##### cartesian

`Cartesian4`

待变换的向量/点（Cartesian4）。

##### result?

`Cartesian4`

输出结果复用对象。

#### Returns

`Cartesian4`

变换后的向量/点。

***

### cameraToWorldCoordinatesPoint()

> **cameraToWorldCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

将相机参考系中的点变换到世界坐标系。

#### Parameters

##### cartesian

`Cartesian3`

待变换的点（Cartesian3）。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3`

变换后的点。

***

### cameraToWorldCoordinatesVector()

> **cameraToWorldCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

将相机参考系中的向量变换到世界坐标系。

#### Parameters

##### cartesian

`Cartesian3`

待变换的向量（Cartesian3）。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3`

变换后的向量。

***

### cancelFlight()

> **cancelFlight**(): `void`

取消当前相机飞行，停在当前位置（若无飞行则无效果）。

#### Returns

`void`

***

### completeFlight()

> **completeFlight**(): `void`

立即完成当前相机飞行，瞬移到飞行终点（若无飞行则无效果）。

#### Returns

`void`

***

### computeViewRectangle()

> **computeViewRectangle**(`ellipsoid?`, `result?`): `Rectangle` \| `undefined`

计算椭球体上大致可见的矩形范围。

#### Parameters

##### ellipsoid?

`Ellipsoid`

要计算可见区域的椭球体，默认 Ellipsoid.WGS84。

##### result?

`Rectangle`

输出结果复用对象。

#### Returns

`Rectangle` \| `undefined`

可见矩形范围；若椭球不可见返回 undefined。

***

### destroy()

> **destroy**(): `void`

销毁相机管理对象

#### Returns

`void`

#### Example

```ts
camera.destroy();
```

***

### distanceToBoundingSphere()

> **distanceToBoundingSphere**(`boundingSphere`): `number`

获取相机到包围球前表面的距离。

#### Parameters

##### boundingSphere

`BoundingSphere`

世界坐标系的包围球。

#### Returns

`number`

距离值（米）。

***

### flyHome()

> **flyHome**(`duration?`): `void`

飞行到“主页视角”。

3D 模式使用默认视域矩形；2D/哥伦布视图显示整张地图。

#### Parameters

##### duration?

`number`

飞行耗时（秒）。不传时会根据距离估算。

#### Returns

`void`

***

### flyTo()

> **flyTo**(`options`): `void`

从当前位置飞行到新位置/矩形区域。

#### Parameters

##### options

飞行参数。

###### cancel?

`FlightCancelledCallback`

###### complete?

`FlightCompleteCallback`

###### convert?

`boolean`

###### destination

`Cartesian3` \| `Rectangle`

###### duration?

`number`

###### easingFunction?

`Callback`

###### endTransform?

`Matrix4`

###### flyOverLongitude?

`number`

###### flyOverLongitudeWeight?

`number`

###### maximumHeight?

`number`

###### orientation?

`any`

###### pitchAdjustHeight?

`number`

#### Returns

`void`

***

### flyToBoundingSphere()

> **flyToBoundingSphere**(`boundingSphere`, `options?`): `void`

飞行到使当前视图包含指定包围球的位置。

#### Parameters

##### boundingSphere

`BoundingSphere`

世界坐标系包围球。

##### options?

飞行参数。

###### cancel?

`FlightCancelledCallback`

###### complete?

`FlightCompleteCallback`

###### duration?

`number`

###### easingFunction?

`Callback`

###### endTransform?

`Matrix4`

###### flyOverLongitude?

`number`

###### flyOverLongitudeWeight?

`number`

###### maximumHeight?

`number`

###### offset?

`HeadingPitchRange`

###### pitchAdjustHeight?

`number`

#### Returns

`void`

***

### flyToTarget()

> **flyToTarget**(`target`, `options?`): `Promise`\<`boolean`\>

相机飞行到目标（主相机调用引擎默认飞行逻辑；额外相机基于点集飞行）

支持 Daisy `Entity`、坐标对象、坐标集合与异步目标。

约定：
- `[lon, lat, height]` 与 `{lon,lat,height?}`/`{lng,lat,alt?}`/`{longitude,latitude,height?}` 按“角度”解析
- `Cartographic` 按“弧度”解析

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

相机飞行目标

##### options?

[`CameraFlyToTargetOptions`](../types/CameraFlyToTargetOptions.md) = `{}`

相机飞行选项

#### Returns

`Promise`\<`boolean`\>

相机飞行是否成功

#### Example

```ts
camera.flyTo(entity);
camera.flyTo([entity1, entity2]);

camera.flyTo(new Cartesian3(x, y, z));
camera.flyTo([cart1, cart2, cart3]);

camera.flyTo({ lon: 120, lat: 30, height: 1000 });
camera.flyTo([{ lng: 120, lat: 30 }, { lng: 121, lat: 31, alt: 5000 }]);
camera.flyTo([120, 30, 1000]);

camera.flyTo(targetPromise);
```

***

### followTarget()

> **followTarget**(`entity`, `options?`): `void`

设置相机跟踪的实体或物理对象。

#### Parameters

##### entity

[`FollowTarget`](../types/FollowTarget.md)

要跟踪的实体或物理对象。

##### options?

[`FollowTargetOptions`](../types/FollowTargetOptions.md) = `{}`

跟踪视角、交互和渲染优化配置。

#### Returns

`void`

#### Example

```ts
engine.camera.followTarget(entity, {
 view: {
 distance: 50_000,
 headingDeg: 45,
 pitchDeg: -30,
 rollDeg: 0,
 },
});
```

***

### getDirection()

> **getDirection**(): `Cartesian3`

获取相机方向向量。
返回 clone 副本。

#### Returns

`Cartesian3`

相机方向向量（单位向量）。

***

### getMagnitude()

> **getMagnitude**(): `number`

获取相机位置的“尺度”。

3D 为 position 向量模长；2D/哥伦布视图为相机到地图的距离。

#### Returns

`number`

相机位置尺度值。

***

### getPickRay()

> **getPickRay**(`windowPosition`, `result?`): `Ray` \| `undefined`

从相机位置穿过屏幕像素生成拾取射线。

#### Parameters

##### windowPosition

`Cartesian2`

屏幕像素坐标。

##### result?

`Ray`

输出结果复用对象。

#### Returns

`Ray` \| `undefined`

射线（包含 origin 与 direction），无法计算时返回 undefined。

***

### getPixelSize()

> **getPixelSize**(`boundingSphere`, `drawingBufferWidth`, `drawingBufferHeight`): `number`

计算像素在世界中的尺寸（米）。

#### Parameters

##### boundingSphere

`BoundingSphere`

世界坐标系包围球。

##### drawingBufferWidth

`number`

绘制缓冲区宽度。

##### drawingBufferHeight

`number`

绘制缓冲区高度。

#### Returns

`number`

像素尺寸（米）。

***

### getPosition()

> **getPosition**(): `Cartesian3`

获取相机世界坐标位置（防御式读取 positionWC ?? position）。
返回 clone 副本，修改返回值不影响相机内部状态。

#### Returns

`Cartesian3`

相机世界坐标位置。

***

### getRectangleCameraCoordinates()

> **getRectangleCameraCoordinates**(`rectangle`, `result?`): `Cartesian3`

计算“看见某个矩形区域”所需的相机位置。

#### Parameters

##### rectangle

`Rectangle`

需要可见的矩形区域。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3`

相机位置坐标（世界坐标系）。

***

### getRight()

> **getRight**(): `Cartesian3`

获取相机 right 向量。
返回 clone 副本。

#### Returns

`Cartesian3`

相机 right 向量（单位向量）。

***

### getUp()

> **getUp**(): `Cartesian3`

获取相机 up 向量。
返回 clone 副本。

#### Returns

`Cartesian3`

相机 up 向量（单位向量）。

***

### hideAttitudeSphere()

> **hideAttitudeSphere**(): `void`

#### Returns

`void`

***

### hideAttitudeSphereOverlay()

> **hideAttitudeSphereOverlay**(): `void`

#### Returns

`void`

***

### look()

> **look**(`axis`, `angle?`): `void`

围绕任意轴旋转相机的三个姿态向量（direction/up/right）。

#### Parameters

##### axis

`Cartesian3`

旋转轴。

##### angle?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### lookAt()

> **lookAt**(`target`, `offset`): `void`

锁定相机视角到指定目标位置，使用偏移量确定相机姿态。

#### Parameters

##### target

`Cartesian3`

目标世界坐标位置。

##### offset

`Cartesian3` \| `HeadingPitchRange`

相对目标的偏移量（HeadingPitchRange 或 Cartesian3）。

#### Returns

`void`

***

### lookAtTransform()

> **lookAtTransform**(`transform`, `offset?`): `void`

以变换矩阵定义的参考系设置相机（目标为变换矩阵原点），并使用偏移量确定相机姿态。

#### Parameters

##### transform

`Matrix4`

定义参考系的变换矩阵。

##### offset?

`Cartesian3` \| `HeadingPitchRange`

相对目标的偏移量（Cartesian3 或 HeadingPitchRange）。

#### Returns

`void`

***

### lookDown()

> **lookDown**(`amount?`): `void`

围绕 right 轴向下看（非 2D 模式生效）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### lookLeft()

> **lookLeft**(`amount?`): `void`

围绕 up 轴向左看（非 2D 模式生效）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### lookRight()

> **lookRight**(`amount?`): `void`

围绕 up 轴向右看（非 2D 模式生效）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### lookUp()

> **lookUp**(`amount?`): `void`

围绕 right 轴向上看（非 2D 模式生效）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### move()

> **move**(`direction`, `amount?`): `void`

沿指定方向平移相机位置。

#### Parameters

##### direction

`Cartesian3`

移动方向（单位向量，世界坐标系）。

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveBackward()

> **moveBackward**(`amount?`): `void`

沿相机视线反方向平移（2D 模式会表现为缩放）。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveDown()

> **moveDown**(`amount?`): `void`

沿相机上方向的反方向平移。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveForward()

> **moveForward**(`amount?`): `void`

沿相机视线方向平移（2D 模式会表现为缩放）。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveLeft()

> **moveLeft**(`amount?`): `void`

沿相机右方向的反方向平移。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveRight()

> **moveRight**(`amount?`): `void`

沿相机右方向平移。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### moveUp()

> **moveUp**(`amount?`): `void`

沿相机上方向平移。

#### Parameters

##### amount?

`number`

移动距离（米），不传使用 defaultMoveAmount。

#### Returns

`void`

***

### onChanged()

> **onChanged**(`callback`): () => `void`

订阅相机变化事件，返回取消订阅函数。

#### Parameters

##### callback

() => `void`

相机变化时的回调函数。

#### Returns

取消订阅函数，调用后移除监听。

() => `void`

***

### orbitTrackedTargetBy()

> **orbitTrackedTargetBy**(`deltaTheta`, `deltaPhi?`): `boolean`

对当前 ArcRotate 跟踪视角施加环绕增量。

#### Parameters

##### deltaTheta

`number`

水平环绕增量，单位为弧度。

##### deltaPhi?

`number` = `0`

垂直环绕增量，单位为弧度。

#### Returns

`boolean`

当前存在可用的 ArcRotate 跟踪器时返回 true。

***

### pickEllipsoid()

> **pickEllipsoid**(`windowPosition`, `ellipsoid?`, `result?`): `Cartesian3` \| `undefined`

从屏幕坐标拾取椭球/地图表面的点。

#### Parameters

##### windowPosition

`Cartesian2`

屏幕像素坐标。

##### ellipsoid?

`Ellipsoid`

要拾取的椭球体，默认 Ellipsoid.WGS84。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3` \| `undefined`

拾取到的世界坐标点，未拾取到返回 undefined。

***

### removeTrackedDaisyEntity()

> **removeTrackedDaisyEntity**(): `void`

移除当前对实体的追踪
解除锁定并恢复相机控制

#### Returns

`void`

#### Example

```ts
camera.removeTrackedDaisyEntity();
```

***

### rotate()

> **rotate**(`axis`, `angle?`): `void`

围绕世界坐标系的任意轴旋转相机，保持相机到参考系原点的距离不变。

#### Parameters

##### axis

`Cartesian3`

旋转轴（世界坐标系）。

##### angle?

`number`

旋转角度（弧度），不传使用 defaultRotateAmount。

#### Returns

`void`

***

### rotateDown()

> **rotateDown**(`angle?`): `void`

围绕相机参考系中心向下旋转。

#### Parameters

##### angle?

`number`

旋转角度（弧度），不传使用 defaultRotateAmount。

#### Returns

`void`

***

### rotateLeft()

> **rotateLeft**(`angle?`): `void`

围绕相机参考系中心向左旋转。

#### Parameters

##### angle?

`number`

旋转角度（弧度），不传使用 defaultRotateAmount。

#### Returns

`void`

***

### rotateRight()

> **rotateRight**(`angle?`): `void`

围绕相机参考系中心向右旋转。

#### Parameters

##### angle?

`number`

旋转角度（弧度），不传使用 defaultRotateAmount。

#### Returns

`void`

***

### rotateUp()

> **rotateUp**(`angle?`): `void`

围绕相机参考系中心向上旋转。

#### Parameters

##### angle?

`number`

旋转角度（弧度），不传使用 defaultRotateAmount。

#### Returns

`void`

***

### setDirection()

> **setDirection**(`dir`): `void`

直接设定相机方向向量。
会先断开当前跟踪状态。

#### Parameters

##### dir

`Cartesian3`

方向向量（世界坐标）。

#### Returns

`void`

***

### setFrustumFar()

> **setFrustumFar**(`far`): `void`

设置相机远裁剪面距离。

#### Parameters

##### far

`number`

远裁剪面距离（米）

#### Returns

`void`

***

### setFrustumNear()

> **setFrustumNear**(`near`): `void`

设置相机近裁剪面距离。

#### Parameters

##### near

`number`

近裁剪面距离（米）

#### Returns

`void`

***

### setPosition()

> **setPosition**(`pos`): `void`

直接设定相机世界坐标位置。
会先断开当前跟踪状态。

#### Parameters

##### pos

`Cartesian3`

目标位置（世界坐标）。

#### Returns

`void`

***

### setUp()

> **setUp**(`up`): `void`

直接设定相机 up 向量。
会先断开当前跟踪状态。

#### Parameters

##### up

`Cartesian3`

up 向量（世界坐标）。

#### Returns

`void`

***

### setView()

> **setView**(`options`): `void`

设置相机视图到指定位置或区域，与cesium setView 方法一致

#### Parameters

##### options

视图参数配置

###### convert?

`boolean`

###### destination?

`Cartesian3` \| `Rectangle`

###### endTransform?

`Matrix4`

###### orientation?

`HeadingPitchRollValues` \| `DirectionUp`

#### Returns

`void`

***

### showAttitudeSphere()

> **showAttitudeSphere**(`options?`): [`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

#### Parameters

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md) = `{}`

#### Returns

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

***

### showAttitudeSphereOverlay()

> **showAttitudeSphereOverlay**(`options?`): [`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

#### Parameters

##### options?

[`AttitudeSphereOverlayOptions`](../types/AttitudeSphereOverlayOptions.md) = `{}`

#### Returns

[`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

***

### switchToOrthographicFrustum()

> **switchToOrthographicFrustum**(): `void`

切换为正交投影（2D 模式下无效果）。

#### Returns

`void`

***

### switchToPerspectiveFrustum()

> **switchToPerspectiveFrustum**(): `void`

切换为透视投影（2D 模式下无效果）。

#### Returns

`void`

***

### twistLeft()

> **twistLeft**(`amount?`): `void`

围绕 direction 轴逆时针扭转（roll）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### twistRight()

> **twistRight**(`amount?`): `void`

围绕 direction 轴顺时针扭转（roll）。

#### Parameters

##### amount?

`number`

旋转角度（弧度），不传使用 defaultLookAmount。

#### Returns

`void`

***

### unlockView()

> **unlockView**(): `void`

解除视角锁定，恢复相机到世界坐标系自由视角。
等价于 lookAtTransform(Matrix4.IDENTITY) 的语义化封装。

#### Returns

`void`

***

### viewBoundingSphere()

> **viewBoundingSphere**(`boundingSphere`, `offset?`): `void`

设置相机，使当前视图包含指定包围球。

#### Parameters

##### boundingSphere

`BoundingSphere`

世界坐标系包围球。

##### offset?

`HeadingPitchRange`

以包围球中心为原点的局部 ENU 坐标系下的 Heading/Pitch/Range。

#### Returns

`void`

***

### worldToCameraCoordinates()

> **worldToCameraCoordinates**(`cartesian`, `result?`): `Cartesian4`

将世界坐标系中的向量/点变换到相机参考系。

#### Parameters

##### cartesian

`Cartesian4`

待变换的向量/点（Cartesian4）。

##### result?

`Cartesian4`

输出结果复用对象。

#### Returns

`Cartesian4`

变换后的向量/点。

***

### worldToCameraCoordinatesPoint()

> **worldToCameraCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

将世界坐标系中的点变换到相机参考系。

#### Parameters

##### cartesian

`Cartesian3`

待变换的点（Cartesian3）。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3`

变换后的点。

***

### worldToCameraCoordinatesVector()

> **worldToCameraCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

将世界坐标系中的向量变换到相机参考系。

#### Parameters

##### cartesian

`Cartesian3`

待变换的向量（Cartesian3）。

##### result?

`Cartesian3`

输出结果复用对象。

#### Returns

`Cartesian3`

变换后的向量。

***

### zoom()

> **zoom**(`target`, `offset?`): `Promise`\<`boolean`\>

缩放到一个或多个目标。

这是新的聚合型入口，支持混合传入：
- Daisy Entity / PhysicalWorld Object
- 底层实体集合 / 数据源 / 可计算边界的对象
- Widget / Layer（若其实现了 `getBoundingSphere()`）
- Cartesian3 / Cartographic / 常见经纬度对象
- 上述类型的数组

UI 类 widget 若设置了 `zoomIgnored = true` 会被自动忽略。

#### Parameters

##### target

`any`

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### zoomAll()

> **zoomAll**(`offset?`): `Promise`\<`boolean`\>

缩放到当前 Engine 内的全部三维目标。

#### Parameters

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### zoomIn()

> **zoomIn**(`amount?`): `void`

沿视线方向缩放（zoom in）。

#### Parameters

##### amount?

`number`

缩放量，不传使用 defaultZoomAmount。

#### Returns

`void`

***

### zoomOut()

> **zoomOut**(`amount?`): `void`

沿视线反方向缩放（zoom out）。

#### Parameters

##### amount?

`number`

缩放量，不传使用 defaultZoomAmount。

#### Returns

`void`

***

### zoomTo()

> **zoomTo**(`target`, `offset?`): `Promise`\<`boolean`\>

缩放/运镜到目标（主相机使用引擎默认运镜逻辑；额外相机基于点集飞行）

支持 Daisy `Entity`、坐标对象、坐标集合与异步目标。

约定：
- `[lon, lat, height]` 与 `{lon,lat,height?}`/`{lng,lat,alt?}`/`{longitude,latitude,height?}` 按“角度”解析
- `Cartographic` 按“弧度”解析

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>
