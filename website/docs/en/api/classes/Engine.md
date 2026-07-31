[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Engine

# Class: Engine

Main entry point for the Daisy simulation engine.

Manages the engine lifecycle, scene-object collections, widget collections, timeline constraints, and camera capabilities.

## Constructors

### Constructor

> **new Engine**(`viewer`, `options?`): `Engine`

Create a Daisy engine instance.

Initialize the render loop, camera management, collection management, interaction guards, terrain detection, lens flare, and other subsystems.

#### Parameters

##### viewer

`Viewer`

Internal view instance created and passed by `Engine.create()`.

##### options?

`EngineOptions`

Engine runtime configuration options.

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

### runtimeProfile

> `readonly` **runtimeProfile**: `EngineRuntimeProfile`

Runtime resource configuration used by the current Engine.

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

Force the current morph animation to complete.
Call this when the camera must be operated immediately after a scene-mode switch, so the morph animation does not interfere.

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

Create and register an extra camera (ExtraCamera).

#### Parameters

##### options?

`CreateExtraCameraOptions` = `{}`

Camera configuration options, including id, tracking target, and view parameters.

#### Returns

[`ExtraCamera`](ExtraCamera.md)

The created ExtraCamera instance

#### Example

```ts
const cam = engine.createExtraCamera({ id: "pip", follow: true });
```

***

### createTimeSchedule()

> **createTimeSchedule**(): [`TimeSchedule`](TimeSchedule.md)

Create a new time scheduler (TimeSchedule) and register it with the engine.

#### Returns

[`TimeSchedule`](TimeSchedule.md)

The newly created TimeSchedule instance

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

Make the main camera follow the specified Entity or BaseObject.

Note: For Moon or Mars, use `switchToCelestial` to switch the reference frame instead of this method.

#### Parameters

##### entity

[`Entity`](Entity.md) \| [`BaseObject`](PW.BaseObject.md)

Entity or PW.BaseObject instance to follow

#### Returns

`void`

***

### formatTime()

> **formatTime**(`time`, `config?`): `string`

Format a JulianDate using the engine-level default configuration.

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

Get the current playback multiplier.

#### Returns

`number`

Current multiplier value.

***

### getObjects()

> **getObjects**(): [`BaseObject`](PW.BaseObject.md)[]

Get all registered BaseObjects in the engine.

#### Returns

[`BaseObject`](PW.BaseObject.md)[]

Reference to the BaseObject array

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

Get the current engine-level Widget time-format configuration.

#### Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

***

### getWidgets()

> **getWidgets**(): [`IWidget`](../interfaces/IWidget.md)[]

Get all registered Widgets in the engine.

#### Returns

[`IWidget`](../interfaces/IWidget.md)[]

IWidget array; returns an empty array when there is no collection manager.

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

Check whether animation is playing.

#### Returns

`boolean`

true means playing; false means paused or stopped.

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

Cancel the clock tick callback.

#### Parameters

##### callback

() => `void`

Previously registered callback function

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

Register a callback after each frame is rendered (postRender).
Inside the callback, `this` is automatically bound to the current Engine instance.

#### Parameters

##### callback

(`time`) => `void`

Callback function receiving the current simulation time

#### Returns

Function that unregisters the callback

() => `void`

***

### onPreRender()

> **onPreRender**(`callback`): () => `void`

Register a callback before each frame is rendered (preRender).
Inside the callback, `this` is automatically bound to the current Engine instance.

#### Parameters

##### callback

(`time`) => `void`

Callback function receiving the current simulation time

#### Returns

Function that unregisters the callback

() => `void`

***

### onTick()

> **onTick**(`callback`): () => `void`

Register a clock tick callback.

#### Parameters

##### callback

() => `void`

Callback function

#### Returns

Function that unregisters the callback

() => `void`

***

### pause()

> **pause**(): `void`

Pause animation playback without resetting currentTime.
Unlike stop(), which resets currentTime to startTime, pause() only freezes the current time.

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

Register a BaseObject with the engine so it participates in engine lifecycle management.
Registering the same object repeatedly has no side effects.

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

BaseObject instance to register

#### Returns

[`BaseObject`](PW.BaseObject.md)

The supplied object, for chaining

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

Set whether the main-camera input controller is enabled (lock or unlock user interaction).

#### Parameters

##### enabled

`boolean`

Whether input is enabled

#### Returns

`void`

***

### setCameraInputFlags()

> **setCameraInputFlags**(`flags`): () => `void`

Patch the main-camera input-control flags, changing only supplied fields and preserving the rest.
Returns a restore function that restores changed fields to their previous values.

#### Parameters

##### flags

Flag collection to modify; only supplied fields are patched.

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

Restore function that restores the previous state.

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

Enable or disable high-performance mode.

When a scene contains many entities (hundreds to tens of thousands), this mode can significantly reduce per-frame CPU cost
by distributing work across frames through grouped updates, frequency throttling, and Feature culling.

**Usage:**
- `setHighPerformanceMode(true)` — Enable with default options
- `setHighPerformanceMode(false)` — Disable
- `setHighPerformanceMode({ enabled: true, entityUpdateGroups: 4, ... })` — Enable with custom options

**Internal coordination:**
- When enabled, automatically set the `stateCache` time bucket to 0.1s and `modelMatrixCache` to 1s
- When disabled, restore unlimited values (`undefined`)
- Clamp parameter values to valid ranges, such as entityUpdateGroups ∈ [1, 64]

#### Parameters

##### enable

`boolean` \| `HighPerformanceModeOptions`

Boolean value or complete configuration object

##### options?

`Omit`\<`HighPerformanceModeOptions`, `"enabled"`\>

Additional configuration when `enable` is a boolean

#### Returns

`this`

this (supports chaining)

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
 keepFeatureTypes: ["PointFeature", "UI_TextFeature", "ImageFeature"],
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

Set the simulation clock multiplier.

#### Parameters

##### v

`number`

Clock multiplier; 1 is real time and negative values play backward.

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

Set the default time format used by all Widgets.

When a Widget supplies `timeFormat` / `timeLabel`, its local configuration takes priority.

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

Set the base URL for static engine resources.

#### Parameters

##### baseUrl

`string`

#### Returns

`void`
