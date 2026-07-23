[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Sensor

# Class: Sensor

Physical sensor component (PW.Sensor).

Semantic layer:
- Sensor parameters are provided as values that can change with simulation time (angles/attitude/range, etc.)
- Outputs footprint geofences for application-side analysis or linkage

Rendering layer (reuses Feature internally):
- Uses Solid Features (elliptical cones/cylinders, etc.) for volume/frustum presentation
- Uses PolygonFeature for ground footprint area

Coordinate and direction conventions for application semantics:
- The sensor is always mounted in the host object local frame, with `mountDirection` specifying the initial orientation
- `beamAttitudeDeg` only describes the beam attitude offset relative to the mount base (azimuth/elevation/roll)
Geometry parameter conventions for tunable logic:
- `range` is the base length/range used to construct the geometry (or auto-extended in ground-relative modes)
- `apertureDeg` is converted into a lateral size at the range end, such as base radius, semi-axes, or base width/height
- When key parameter changes require topology rebuild, an internal `reCreate` is triggered (see `_resolveGeometry().solidKey`)

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new Sensor**(`options?`): `Sensor`

Create a sensor component instance that is not yet bound to an object.

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

Sensor configuration.

#### Returns

`Sensor`

#### Example

```ts
const sensor = new Sensor({
 type: SensorType.EllipticalCone,
 range: 200_000,
 apertureDeg: { xDeg: 10, yDeg: 6 },
 beamAttitudeDeg: (t) => ({ azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 }),
 footPrint: false,
});
vehicle.addComponent(sensor);
```

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`constructor`](PW.BaseComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

Component-level Transformer (optional).

Prefer this for mount/physical-base transforms rather than polluting Entity.transformer.

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`transformer`](PW.BaseComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"Sensor"`

Component type identifier. Subclasses must override it.

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

## Accessors

### beamLength

#### Get Signature

> **get** **beamLength**(): [`TimeValue`](../types/TimeValue.md)\<`number`\>

##### Returns

[`TimeValue`](../types/TimeValue.md)\<`number`\>

#### Set Signature

> **set** **beamLength**(`value`): `void`

##### Parameters

###### value

[`TimeValue`](../types/TimeValue.md)\<`number`\>

##### Returns

`void`

***

### id

#### Get Signature

> **get** **id**(): `string`

Set the component ID, a globally unique identifier.

- Usually generated automatically by BaseComponent.register()
- Applications may also set it manually to align with external system IDs

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

Set the component ID, a globally unique identifier.

- Usually generated automatically by BaseComponent.register()
- Applications may also set it manually to align with external system IDs

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`RouteComponent`](PW.RouteComponent.md).[`id`](PW.RouteComponent.md#id)

***

### name

#### Get Signature

> **get** **name**(): `string`

Set the component name for lookup and management by name.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Set the component name for lookup and management by name.

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`name`](PW.BaseComponent.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`SensorOptions`](../types/PW.SensorOptions.md)

##### Returns

[`SensorOptions`](../types/PW.SensorOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

##### Parameters

###### value

[`SensorOptions`](../types/PW.SensorOptions.md)

##### Returns

`void`

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`registered`](PW.BaseComponent.md#registered)

## Methods

### clearBeamFootprint()

> **clearBeamFootprint**(): `void`

Clear currently generated beam footprint data and render results.

#### Returns

`void`

***

### clearFootprintRangeRenderer()

> **clearFootprintRangeRenderer**(): `void`

Clear the footprint interval renderer.

#### Returns

`void`

***

### clearFootprintSampleRenderer()

> **clearFootprintSampleRenderer**(): `void`

Clear footprint results drawn sample-by-sample.

#### Returns

`void`

***

### clearFootprintUnionRenderer()

> **clearFootprintUnionRenderer**(): `void`

Clear the merged footprint renderer.

#### Returns

`void`

***

### computeFootprintRecords()

> **computeFootprintRecords**(`stepSeconds?`, `maxSampleCount?`): `RealtimeFootprintRecord`[]

Compute discrete sampled coverage records over a coverage time range.

According to the `footPrint.footprintTimes` configuration and the specified step size, discretely sample the time range
and compute coverage (longitude/latitude sets) at each sample time.

#### Parameters

##### stepSeconds?

`number` = `60`

Sampling step size in seconds; defaults to 60 seconds.

##### maxSampleCount?

`number`

#### Returns

`RealtimeFootprintRecord`[]

Coverage record array; each element contains a sample time and the corresponding coverage longitude/latitude set.

#### Example

```ts
// 计算每 30 秒采样一次的所有覆盖记录
const records = sensor.computeFootprintRecords(30);
// 结果: [{ time: JulianDate, positions: [{ lon, lat, height }, ...] }, ...]
```

***

### destroy()

> **destroy**(): `void`

Destroy the component, remove internal Features, and release resources.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### drawCoverageAtSimulationTime()

> **drawCoverageAtSimulationTime**(`config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw coverage at the current simulation time; alias of drawFootprintAtSimulationTime.

#### Parameters

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawCoverageAtTime()

> **drawCoverageAtTime**(`time`, `config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw coverage at a single time; alias of drawFootprintAtTime.

#### Parameters

##### time

`JulianDate`

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawFootprint()

> **drawFootprint**(`config`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw the footprint within the specified time interval.

#### Parameters

##### config

[`FootprintDrawOptions`](../types/PW.FootprintDrawOptions.md)

Draw configuration.

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Longitude/latitude/height bounds for the current draw result.

***

### drawFootprintAtSimulationTime()

> **drawFootprintAtSimulationTime**(`config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw coverage at the current simulation time.

#### Parameters

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawFootprintAtTime()

> **drawFootprintAtTime**(`time`, `config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw coverage at a single time (begin equals end).

#### Parameters

##### time

`JulianDate`

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawFootprintUnion()

> **drawFootprintUnion**(`config`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Draw the merged footprint within the specified time interval.

#### Parameters

##### config

[`FootprintDrawOptions`](../types/PW.FootprintDrawOptions.md)

Merged draw configuration.

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

Longitude/latitude/height bounds corresponding to the merged result.

***

### getEstimatedRealtimeFootprintVisibleCount()

> **getEstimatedRealtimeFootprintVisibleCount**(): `number`

Get the expected visible count of the real-time footprint.

#### Returns

`number`

Current estimated visible count.

***

### getFootPrintAtTime()

> **getFootPrintAtTime**(`time`): `Cartographic`[]

Get the sensor ground coverage at the current or specified time.

Temporarily modifies Feature state and restores it automatically; each call pays a state save/restore cost.
For batch analysis, use [getFootPrintAtTimeUnsafe](#getfootprintattimeunsafe).

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartographic`[]

***

### getFootPrintAtTimeUnsafe()

> **getFootPrintAtTimeUnsafe**(`time`): `Cartographic`[]

Batch-analysis only: skip state save/restore/_syncLiveFeature and compute coverage directly.

Differences from [getFootPrintAtTime](#getfootprintattime):
- Does not call _captureFootprintEvaluationLiveState / _restoreFootprintEvaluationLiveState
- Does not call _syncLiveFeatureToCurrentTime (after the call, the Feature remains at the target time without triggering render)
- After batch computation finishes, call [syncLiveFeatureToCurrentTime](#synclivefeaturetocurrenttime) to restore state in one step

Suitable for BaseCoverageAnalysis scenarios that compute coverage continuously across many time steps.

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartographic`[]

***

### getFootprintRenderComplexityProfile()

> **getFootprintRenderComplexityProfile**(): `FootprintRenderComplexityProfile` \| `undefined`

Get the footprint rendering complexity profile.

#### Returns

`FootprintRenderComplexityProfile` \| `undefined`

Current complexity profile; returns `undefined` if it has not been established yet.

***

### getFootprintSamplingPlan()

> **getFootprintSamplingPlan**(`footprintTimes`, `stepSeconds?`, `maxSampleCount?`): `FootprintSamplingPlan`

#### Parameters

##### footprintTimes

`JulianDate` \| `JulianDate`[] \| [`TimeRange`](../types/PW.TimeRange.md) \| [`TimeRanges`](../types/PW.TimeRanges.md)

##### stepSeconds?

`number` = `60`

##### maxSampleCount?

`number`

#### Returns

`FootprintSamplingPlan`

***

### getFootprintUnionBoundsInRange()

> **getFootprintUnionBoundsInRange**(`footprintTimes`, `stepSeconds?`, `maxSampleCount?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

#### Parameters

##### footprintTimes

`JulianDate` \| `JulianDate`[] \| [`TimeRange`](../types/PW.TimeRange.md) \| [`TimeRanges`](../types/PW.TimeRanges.md)

##### stepSeconds?

`number` = `60`

##### maxSampleCount?

`number`

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### getHostObject()

> **getHostObject**(): [`BaseObject`](PW.BaseObject.md) \| `undefined`

Get the currently bound host object.

#### Returns

[`BaseObject`](PW.BaseObject.md) \| `undefined`

The physical object that currently owns this sensor.

***

### hideBeam()

> **hideBeam**(): `void`

Hide the beam volume.

#### Returns

`void`

***

### hideBeamFootprint()

> **hideBeamFootprint**(): `void`

Hide the currently generated beam footprint.

#### Returns

`void`

***

### hideFootprintRangeRenderer()

> **hideFootprintRangeRenderer**(): `void`

Hide the footprint interval render result.

#### Returns

`void`

***

### hideFootprintUnionRenderer()

> **hideFootprintUnionRenderer**(): `void`

Hide the merged footprint render result.

#### Returns

`void`

***

### register()

> **register**(`object`): `Sensor`

Register the component on a physical object and ensure internal Features (volume/footprint) are created.

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`Sensor`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### removeBeamFootprint()

> **removeBeamFootprint**(): `void`

Completely remove the beam footprint feature and any generated results.

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Reset temporary state retained across time loops.

When simulation time rewinds or loops back to the start, the host object calls this method so the component can clear cross-frame caches.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

***

### setBeamFootprint()

> **setBeamFootprint**(`config`): `void`

Configure and start interval coverage drawing.

Description:
- Real-time scheduling starts immediately after the call
- The method can be called again later to update drawing parameters dynamically

#### Parameters

##### config

`false` \| [`BeamFootprint`](../types/PW.BeamFootprint.md)

#### Returns

`void`

***

### setFootprintRangeRenderer()

> **setFootprintRangeRenderer**(`config`): `void`

Configure the footprint interval renderer.

#### Parameters

##### config

`false` \| [`FootprintRangeRendererOptions`](../types/PW.FootprintRangeRendererOptions.md)

Interval render configuration; pass `false` to clear the current renderer.

#### Returns

`void`

***

### setRealtimeFootprintRender()

> **setRealtimeFootprintRender**(`stepSeconds?`, `retainSeconds?`, `maxSampleCount?`): `void`

Configure real-time footprint drawing parameters.

Description:
- Precompute coverage at all sample times
- Dynamically show/hide sample points with simulation time
- Draw when the time reaches a sample, then remove or hide after it expires

#### Parameters

##### stepSeconds?

`number` = `60`

Sampling step size in seconds. Defaults to 60.

##### retainSeconds?

`number`

Retention time after a sample expires, in seconds; `0` means remove immediately.

##### maxSampleCount?

`number`

Maximum number of coverage samples; the effective value is capped at 3000.

#### Returns

`void`

***

### showBeam()

> **showBeam**(): `void`

Show the beam volume.

#### Returns

`void`

***

### showBeamFootprint()

> **showBeamFootprint**(): `void`

Show the currently generated beam footprint.

#### Returns

`void`

***

### showFootprintRangeRenderer()

> **showFootprintRangeRenderer**(): `void`

Show the footprint interval render result.

#### Returns

`void`

***

### showFootprintUnionRenderer()

> **showFootprintUnionRenderer**(): `void`

Show the merged footprint render result.

#### Returns

`void`

***

### syncLiveFeatureToCurrentTime()

> **syncLiveFeatureToCurrentTime**(): `void`

After batch analysis, restore the Feature to the engine time in one step.

Use with [getFootPrintAtTimeUnsafe](#getfootprintattimeunsafe). After batch computation, call this method
to reset the Feature temporal state back to the engine current time.

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

Detach the component from the physical object and remove internal Features.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`spaceObject`, `time`): `void`

Update every frame, driven by the host BaseObject.update.

Current responsibilities:
- Dispatch coverage scheduling updates on the same cadence as entity update
- Update real-time footprint drawing state

Description:
- Coverage scheduling no longer depends on internal timers or scene event listeners
- It is driven by host updates so it stays synchronized with entity attitude and position

#### Parameters

##### spaceObject

`any`

Host entity (accepted for compatibility).

##### time

`JulianDate`

Simulation time.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
