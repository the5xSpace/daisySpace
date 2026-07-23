[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Engine

# Class: Engine

Daisy 仿真引擎主入口。

负责管理引擎生命周期、场景对象集合、widget 集合、时间轴约束以及相机能力。

## Constructors

### Constructor

> **new Engine**(`viewer`, `options?`): `Engine`

创建 Daisy 引擎实例。

初始化渲染循环、相机管理、集合管理、交互守卫、地形检测、镜头光晕等子系统。

#### Parameters

##### viewer

`Viewer`

由 `Engine.create()` 创建并传入的内部视图实例。

##### options?

`EngineOptions`

引擎运行时配置选项。

#### Returns

`Engine`

## Properties

### \_destroyed

> **\_destroyed**: `boolean` = `false`

***

### camera

> **camera**: [`Camera`](Camera.md)

***

### clock

> **clock**: `Clock`

***

### collections

> **collections**: `ViewerCollections`

***

### entityUpdateGroups

> **entityUpdateGroups**: `number` = `6`

***

### eventHandle

> **eventHandle**: `ViewerEventHandle`

***

### geoLayer

> **geoLayer**: [`GeoLayerManager`](GeoLayerManager.md)

***

### isMorphing

> **isMorphing**: `boolean` = `false`

***

### lastFrameTime

> **lastFrameTime**: `JulianDate`

***

### lodOptions

> **lodOptions**: `object` = `{}`

***

### modelMatrixCache

> **modelMatrixCache**: `TimeCache`\<`Matrix4`\>

***

### nextFrameTime

> **nextFrameTime**: `JulianDate`

***

### renderFrameCache

> **renderFrameCache**: \{ `cameras?`: `Camera`[]; `cullingVolume`: `CullingVolume`; `cullingVolumes?`: `CullingVolume`[]; `fixedToTeme?`: `Matrix3`; `temeToFixed?`: `Matrix3`; \} \| `undefined`

***

### stateCache

> **stateCache**: `TimeCache`\<[`EntityTimeState`](../interfaces/EntityTimeState.md)\>

***

### timeSchedule

> `readonly` **timeSchedule**: [`TimeSchedule`](TimeSchedule.md)

***

### timeSchedules

> `readonly` **timeSchedules**: [`TimeSchedule`](TimeSchedule.md)[] = `[]`

***

### ui?

> `optional` **ui?**: `DaisyUIManager`

***

### viewDistanceStrategy

> **viewDistanceStrategy**: [`ViewDistanceStrategy`](ViewDistanceStrategy.md)

## Accessors

### currentCelestial

#### Get Signature

> **get** **currentCelestial**(): [`CelestialBody`](PW.CelestialBody.md) \| `undefined`

##### Returns

[`CelestialBody`](PW.CelestialBody.md) \| `undefined`

***

### entities

#### Get Signature

> **get** **entities**(): [`Entity`](Entity.md)[]

##### Returns

[`Entity`](Entity.md)[]

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

## Methods

### \_shouldRunUpdateThisFrame()

> **\_shouldRunUpdateThisFrame**(`nowWallMs`): `boolean`

#### Parameters

##### nowWallMs

`number`

#### Returns

`boolean`

***

### addEntity()

> **addEntity**(`entity`): `void`

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

***

### addViewLayer()

> **addViewLayer**(`viewLayer`): [`ILayer`](../interfaces/ILayer.md)

#### Parameters

##### viewLayer

[`ILayer`](../interfaces/ILayer.md)

#### Returns

[`ILayer`](../interfaces/ILayer.md)

***

### addWidget()

> **addWidget**(`widget`): [`IWidget`](../interfaces/IWidget.md)

Adds a widget instance to engine.

Note: UI widgets must be created through `addWidget`, not through `Engine.create` UI options.

#### Parameters

##### widget

[`IWidget`](../interfaces/IWidget.md)

#### Returns

[`IWidget`](../interfaces/IWidget.md)

***

### checkInCameraCullingVolume()

> **checkInCameraCullingVolume**(`position`, `radius?`): `boolean`

#### Parameters

##### position

`Cartesian3`

##### radius?

`number` = `...`

#### Returns

`boolean`

***

### clearViewLayer()

> **clearViewLayer**(): `void`

#### Returns

`void`

***

### clearWidgets()

> **clearWidgets**(): `void`

#### Returns

`void`

***

### completeMorph()

> **completeMorph**(): `void`

强制完成当前进行中的 morph 动画。
在切换场景模式后需要立即操作相机时调用，避免 morph 动画干扰。

#### Returns

`void`

***

### createEntity()

> **createEntity**(`name?`, `options?`): [`Entity`](Entity.md)

#### Parameters

##### name?

`string` = `""`

##### options?

###### id?

`string`

#### Returns

[`Entity`](Entity.md)

***

### createExtraCamera()

> **createExtraCamera**(`options?`): [`ExtraCamera`](ExtraCamera.md)

创建并注册一个额外相机（ExtraCamera）。

#### Parameters

##### options?

`CreateExtraCameraOptions` = `{}`

相机配置选项，包括 id、跟踪目标、视角等

#### Returns

[`ExtraCamera`](ExtraCamera.md)

创建的 ExtraCamera 实例

#### Example

```ts
const cam = engine.createExtraCamera({ id: "pip", follow: true });
```

***

### createTimeSchedule()

> **createTimeSchedule**(): [`TimeSchedule`](TimeSchedule.md)

创建一个新的时间调度器（TimeSchedule）并注册到引擎。

#### Returns

[`TimeSchedule`](TimeSchedule.md)

新创建的 TimeSchedule 实例

***

### debug()

> **debug**(`value?`): `void`

#### Parameters

##### value?

`boolean` = `true`

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### flyTo()

> **flyTo**(`target`, `options?`): `Promise`\<`boolean`\>

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

##### options?

[`CameraFlyToTargetOptions`](../types/CameraFlyToTargetOptions.md) = `{}`

#### Returns

`Promise`\<`boolean`\>

***

### followTarget()

> **followTarget**(`entity`): `void`

使主相机跟踪指定实体或基础对象。

注意：月球/火星天体建议使用 `switchToCelestial` 切换参考系，而非本方法。

#### Parameters

##### entity

[`Entity`](Entity.md) \| [`BaseObject`](PW.BaseObject.md)

要跟踪的 Entity 或 PW.BaseObject 实例

#### Returns

`void`

***

### formatTime()

> **formatTime**(`time`, `config?`): `string`

使用引擎级默认配置格式化一个 JulianDate。

#### Parameters

##### time

`JulianDate`

##### config?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

#### Returns

`string`

***

### getActiveRenderCameraId()

> **getActiveRenderCameraId**(): `string`

#### Returns

`string`

***

### getActiveRenderViewportSize()

> **getActiveRenderViewportSize**(): `object`

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

***

### getAllCesiumCameras()

> **getAllCesiumCameras**(): `Camera`[]

#### Returns

`Camera`[]

***

### getCesiumCameraById()

> **getCesiumCameraById**(`id`): `Camera`

#### Parameters

##### id

`string` \| `undefined`

#### Returns

`Camera`

***

### getCesiumCamerasById()

> **getCesiumCamerasById**(): `object`[]

#### Returns

`object`[]

***

### getCurrentTime()

> **getCurrentTime**(): `JulianDate`

#### Returns

`JulianDate`

***

### getDaisyUpdateFps()

> **getDaisyUpdateFps**(): `number`

#### Returns

`number`

***

### getEntityById()

> **getEntityById**(`id?`): [`Entity`](Entity.md) \| `undefined`

#### Parameters

##### id?

`string` = `""`

#### Returns

[`Entity`](Entity.md) \| `undefined`

***

### getEntityByName()

> **getEntityByName**(`name?`): [`Entity`](Entity.md) \| `undefined`

#### Parameters

##### name?

`string` = `""`

#### Returns

[`Entity`](Entity.md) \| `undefined`

***

### getExtraCamera()

> **getExtraCamera**(`id`): [`Camera`](Camera.md) \| `undefined`

#### Parameters

##### id

`string`

#### Returns

[`Camera`](Camera.md) \| `undefined`

***

### getHighPerformanceModeOptions()

> **getHighPerformanceModeOptions**(): `Required`\<`HighPerformanceModeOptions`\>

#### Returns

`Required`\<`HighPerformanceModeOptions`\>

***

### getLensFlareOptions()

> **getLensFlareOptions**(): `Required`\<[`EngineLensFlareOptions`](../interfaces/EngineLensFlareOptions.md)\>

Returns the current lens flare parameters.

#### Returns

`Required`\<[`EngineLensFlareOptions`](../interfaces/EngineLensFlareOptions.md)\>

***

### getMultiplier()

> **getMultiplier**(): `number`

获取当前播放倍率。

#### Returns

`number`

当前倍率值。

***

### getObjects()

> **getObjects**(): [`BaseObject`](PW.BaseObject.md)[]

获取引擎中所有已注册的 BaseObject 列表。

#### Returns

[`BaseObject`](PW.BaseObject.md)[]

BaseObject 数组引用

***

### getStartTime()

> **getStartTime**(): `JulianDate`

#### Returns

`JulianDate`

***

### getStopTime()

> **getStopTime**(): `JulianDate`

#### Returns

`JulianDate`

***

### getTimeFormat()

> **getTimeFormat**(): [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

获取当前引擎级 Widget 时间格式配置。

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

***

### getWidgets()

> **getWidgets**(): [`IWidget`](../interfaces/IWidget.md)[]

获取引擎中所有已注册的 Widget 列表。

#### Returns

[`IWidget`](../interfaces/IWidget.md)[]

IWidget 数组，若无集合管理器则返回空数组

***

### getZoomTargets()

> **getZoomTargets**(): `any`[]

Collects all current 3D targets for `zoomAll`.

Hidden/removed/destroyed objects are filtered out.

#### Returns

`any`[]

***

### hasSceneTimeBounds()

> **hasSceneTimeBounds**(): `boolean`

#### Returns

`boolean`

***

### is3D()

> **is3D**(): `boolean`

#### Returns

`boolean`

***

### isAnimating()

> **isAnimating**(): `boolean`

判断动画是否正在播放。

#### Returns

`boolean`

true 表示正在播放，false 表示已暂停或停止。

***

### isHighPerformanceMode()

> **isHighPerformanceMode**(): `boolean`

#### Returns

`boolean`

***

### isSceneTimeLoopEnabled()

> **isSceneTimeLoopEnabled**(): `boolean`

#### Returns

`boolean`

***

### lockTimeline()

> **lockTimeline**(): `void`

#### Returns

`void`

***

### morphTo()

> **morphTo**(`mode`): `void`

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

***

### morphTo2D()

> **morphTo2D**(): `void`

#### Returns

`void`

***

### morphTo3D()

> **morphTo3D**(): `void`

#### Returns

`void`

***

### offMorphStart()

> **offMorphStart**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

#### Parameters

##### callback

(`mode`) => `void`

#### Returns

`void`

***

### offTick()

> **offTick**(`callback`): `void`

取消时钟 tick 回调。

#### Parameters

##### callback

() => `void`

之前注册的回调函数

#### Returns

`void`

***

### onActiveRenderCameraIdChange()

> **onActiveRenderCameraIdChange**(`handler`): () => `void`

#### Parameters

##### handler

(`id`) => `void`

#### Returns

() => `void`

***

### onMorphStart()

> **onMorphStart**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

#### Parameters

##### callback

(`mode`) => `void`

#### Returns

`void`

***

### onPostRender()

> **onPostRender**(`callback`): () => `void`

注册每帧渲染后的回调（postRender）。
回调中 `this` 自动绑定为当前 Engine 实例。

#### Parameters

##### callback

(`time`) => `void`

回调函数，接收当前仿真时间

#### Returns

取消注册的函数

() => `void`

***

### onPreRender()

> **onPreRender**(`callback`): () => `void`

注册每帧渲染前的回调（preRender）。
回调中 `this` 自动绑定为当前 Engine 实例。

#### Parameters

##### callback

(`time`) => `void`

回调函数，接收当前仿真时间

#### Returns

取消注册的函数

() => `void`

***

### onTick()

> **onTick**(`callback`): () => `void`

注册时钟 tick 回调。

#### Parameters

##### callback

() => `void`

回调函数

#### Returns

取消注册的函数

() => `void`

***

### pause()

> **pause**(): `void`

暂停动画播放（不重置 currentTime）。
与 stop() 的区别：stop() 会将 currentTime 重置到 startTime，而 pause() 仅冻结当前时间。

#### Returns

`void`

***

### play()

> **play**(`speedMultiplier?`): `void`

#### Parameters

##### speedMultiplier?

`number`

#### Returns

`void`

***

### popActiveRenderCameraId()

> **popActiveRenderCameraId**(): `void`

#### Returns

`void`

***

### pushActiveRenderCameraId()

> **pushActiveRenderCameraId**(`id`, `viewport?`): `void`

#### Parameters

##### id

`string`

##### viewport?

###### height

`number`

###### width

`number`

#### Returns

`void`

***

### registerObject()

> **registerObject**(`object`): [`BaseObject`](PW.BaseObject.md)

将一个 BaseObject 注册到引擎中，使其参与引擎的生命周期管理。
重复注册同一对象不会产生副作用。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

要注册的 BaseObject 实例

#### Returns

[`BaseObject`](PW.BaseObject.md)

传入的对象（便于链式调用）

***

### removeCelestial()

> **removeCelestial**(): `void`

#### Returns

`void`

***

### removeEntity()

> **removeEntity**(`obj`): `void`

#### Parameters

##### obj

[`Entity`](Entity.md)

#### Returns

`void`

***

### removeExtraCamera()

> **removeExtraCamera**(`id`): `void`

#### Parameters

##### id

`string`

#### Returns

`void`

***

### removeTimeSchedule()

> **removeTimeSchedule**(`schedule`): `void`

#### Parameters

##### schedule

[`TimeSchedule`](TimeSchedule.md)

#### Returns

`void`

***

### removeViewLayer()

> **removeViewLayer**(`viewLayer`): `void`

#### Parameters

##### viewLayer

[`ILayer`](../interfaces/ILayer.md)

#### Returns

`void`

***

### removeWidget()

> **removeWidget**(`widget`, `destroy?`): `void`

#### Parameters

##### widget

[`IWidget`](../interfaces/IWidget.md)

##### destroy?

`boolean` = `false`

#### Returns

`void`

***

### resetPlaybackState()

> **resetPlaybackState**(`time?`): `void`

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

***

### resize()

> **resize**(): `void`

#### Returns

`void`

***

### resolveCameraId()

> **resolveCameraId**(`camera`): `string`

#### Parameters

##### camera

`Camera` \| `undefined`

#### Returns

`string`

***

### setCameraInputEnabled()

> **setCameraInputEnabled**(`enabled`): `void`

设置主相机输入控制器是否启用（锁定/解锁用户交互）。

#### Parameters

##### enabled

`boolean`

是否启用输入

#### Returns

`void`

***

### setCameraInputFlags()

> **setCameraInputFlags**(`flags`): () => `void`

按 patch 方式设置主相机输入控制 flag，只修改传入的字段，其余保持不变。
返回 restore 函数，调用后恢复被修改的字段到调用前的值。

#### Parameters

##### flags

需要修改的 flag 集合，只 patch 传入的字段。

###### inputs?

`boolean`

###### look?

`boolean`

###### rotate?

`boolean`

###### tilt?

`boolean`

###### translate?

`boolean`

###### zoom?

`boolean`

#### Returns

restore 函数，调用后恢复原状。

() => `void`

#### Example

```ts
// 锁定主相机全部输入，后续恢复
const restore = engine.setCameraInputFlags({
 rotate: false, translate: false, zoom: false,
 tilt: false, look: false, inputs: false
});
// ... PiP 操作 ...
restore(); // 恢复
```

***

### setCurrentTime()

> **setCurrentTime**(`time`): `void`

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

***

### setHighPerformanceMode()

> **setHighPerformanceMode**(`enable`, `options?`): `this`

设置高性能模式。

当场景中实体数量较大时（数百至数万级），启用此模式可显著降低每帧 CPU 开销，
通过分组更新、频率节流、Feature 裁剪等策略将负载分散到多帧。

**使用方式：**
- `setHighPerformanceMode(true)` — 使用默认参数启用
- `setHighPerformanceMode(false)` — 关闭
- `setHighPerformanceMode({ enabled: true, entityUpdateGroups: 4, ... })` — 自定义参数启用

**内部联动：**
- 启用时自动将 `stateCache` 时间桶设为 0.1s、`modelMatrixCache` 设为 1s
- 禁用时恢复为不限制（`undefined`）
- 参数值会被 clamp 到有效范围（如 entityUpdateGroups ∈ [1, 64]）

#### Parameters

##### enable

`boolean` \| `HighPerformanceModeOptions`

布尔值或完整配置对象

##### options?

`Omit`\<`HighPerformanceModeOptions`, `"enabled"`\>

当 `enable` 为布尔值时，可附加额外配置

#### Returns

`this`

this（支持链式调用）

#### Example

```ts
// 最简用法
engine.setHighPerformanceMode(true);

// 自定义参数
engine.setHighPerformanceMode({
 enabled: true,
 entityUpdateGroups: 4,
 visibilityCheckGroups: 24,
 inactiveUpdateIntervalSeconds: 0.5,
 activeUpdateIntervalSeconds: 0.03,
 keepFeatureTypes: ["PointFeature", "UI_LabelFeature", "BillboardFeature"],
});

// 关闭
engine.setHighPerformanceMode(false);
```

***

### setLensFlare()

> **setLensFlare**(`options?`): `void`

Update the scene lens flare effect with simple Daisy-level parameters.

#### Parameters

##### options?

`boolean` \| [`EngineLensFlareOptions`](../interfaces/EngineLensFlareOptions.md)

#### Returns

`void`

***

### setLensFlareVisible()

> **setLensFlareVisible**(`show`): `void`

Show or hide the lens flare effect without changing tuned parameters.

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### setLoop()

> **setLoop**(`enabled?`): `void`

#### Parameters

##### enabled?

`boolean` = `true`

#### Returns

`void`

***

### setMaxZoomDistance()

> **setMaxZoomDistance**(`value`): `void`

#### Parameters

##### value

`number`

#### Returns

`void`

***

### setMinZoomDistance()

> **setMinZoomDistance**(`value`): `void`

#### Parameters

##### value

`number`

#### Returns

`void`

***

### setMultiplier()

> **setMultiplier**(`v`): `void`

设置仿真时钟倍速。

#### Parameters

##### v

`number`

时钟倍速值，1 为实时，负值表示倒退

#### Returns

`void`

***

### setReferenceFrame()

> **setReferenceFrame**(`_`): `void`

#### Parameters

##### \_

`any`

#### Returns

`void`

***

### setSceneTime()

> **setSceneTime**(`startTime`, `stopTime`, `loop?`): `void`

#### Parameters

##### startTime

`JulianDate`

##### stopTime

`JulianDate`

##### loop?

`boolean` = `true`

#### Returns

`void`

***

### setTerrainDetectionEnabled()

> **setTerrainDetectionEnabled**(`enabled?`): `void`

#### Parameters

##### enabled?

`boolean` = `true`

#### Returns

`void`

***

### setTimeFormat()

> **setTimeFormat**(`config?`): `this`

设置所有 Widget 默认使用的时间格式。

Widget 自身传入 `timeFormat` / `timeLabel` 时优先使用局部配置。

#### Parameters

##### config?

[`TimeFormatConfig`](../types/TimeFormatConfig.md) = `"utc"`

#### Returns

`this`

***

### setUpdateMaxFps()

> **setUpdateMaxFps**(`maxFps?`): `void`

#### Parameters

##### maxFps?

`number` \| `false`

#### Returns

`void`

***

### shouldKeepFeatureType()

> **shouldKeepFeatureType**(`type`): `boolean`

#### Parameters

##### type

`string`

#### Returns

`boolean`

***

### startAutoRender()

> **startAutoRender**(): `void`

#### Returns

`void`

***

### stop()

> **stop**(): `void`

#### Returns

`void`

***

### stopAutoRender()

> **stopAutoRender**(): `void`

#### Returns

`void`

***

### switchToCelestial()

> **switchToCelestial**(`body`): `void`

#### Parameters

##### body

`CelestialBodyLike` \| `undefined`

#### Returns

`void`

***

### syncSceneTimeClockRange()

> **syncSceneTimeClockRange**(): `void`

#### Returns

`void`

***

### triggerUpdateOnce()

> **triggerUpdateOnce**(): `void`

#### Returns

`void`

***

### unlockTimeline()

> **unlockTimeline**(): `void`

#### Returns

`void`

***

### unregisterObject()

> **unregisterObject**(`object`): `void`

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`void`

***

### zoom()

> **zoom**(`target`, `offset?`): `Promise`\<`boolean`\>

Zoom camera to one or multiple targets.

#### Parameters

##### target

`any`

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

#### Example

```ts
await engine.zoom([entityA, widgetB, objectC]);
```

***

### zoomAll()

> **zoomAll**(`offset?`): `Promise`\<`boolean`\>

Zoom camera to all currently visible/valid 3D targets in engine.

#### Parameters

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### zoomTo()

> **zoomTo**(`target`, `offset?`): `Promise`\<`boolean`\>

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

##### offset?

`HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### beforeInit()

> `static` **beforeInit**(`options?`): `void`

Static pre-initialization hook.

#### Parameters

##### options?

`ViewBeforeInitOptions` = `{}`

#### Returns

`void`

***

### create()

> `static` **create**(`container`, `options?`): `Promise`\<`Engine`\>

#### Parameters

##### container

`string` \| `Viewer` \| `HTMLElement`

##### options?

`DaisySpaceCreateOptions`

#### Returns

`Promise`\<`Engine`\>

***

### setEngineBaseUrl()

> `static` **setEngineBaseUrl**(`baseUrl`): `void`

设置底层静态资源基址。

#### Parameters

##### baseUrl

`string`

#### Returns

`void`
