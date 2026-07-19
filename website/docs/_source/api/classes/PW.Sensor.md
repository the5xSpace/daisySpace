[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Sensor

# Class: Sensor

物理传感器组件（PW.Sensor）。

语义层：
- 传感器参数以“随仿真时间变化”的形式输入（角度/姿态/量程等）
- 对外输出 footprint（地理围栏）用于业务侧分析或联动

渲染层（内部复用 Feature）：
- 以 Solid Feature（椭圆锥/圆柱等）作为体积/视锥表现
- 以 PolygonFeature 表示地面 footprint 面积

坐标与方向约定（面向业务语义）：
- 传感器始终“安装”在宿主对象的局部坐标系上，由 `mountDirection` 指定初始朝向
- `beamAttitudeDeg` 仅描述“波束相对安装基准的姿态偏转”（方位/俯仰/横滚）
形体参数约定（面向可调逻辑）：
- `range` 作为“基准长度/量程”，形体会按该长度构造（或在对地模式下自动延展）
- `apertureDeg` 会被换算为“在量程末端的横向尺寸”（例如底面半径/半轴/底面宽高）
- 当关键参数变化导致几何拓扑需要重建时，会触发内部 `reCreate`（见 `_resolveGeometry().solidKey`）

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new Sensor**(`options?`): `Sensor`

创建一个传感器组件实例（尚未绑定到对象）。

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

传感器配置

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

组件级 Transformer（可选）。

建议用来表示“安装/物理基准”变换，而不是去污染 Entity.transformer。

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`transformer`](PW.BaseComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"Sensor"`

组件类型标识。子类需要覆写。

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

设置组件 id（全局唯一标识）。

- 通常由 BaseComponent.register() 自动生成
- 也允许业务侧手动指定以便对齐外部系统 id

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

设置组件 id（全局唯一标识）。

- 通常由 BaseComponent.register() 自动生成
- 也允许业务侧手动指定以便对齐外部系统 id

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

设置组件名称（用于按名称检索/管理）。

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

设置组件名称（用于按名称检索/管理）。

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

清空当前已生成的 beam footprint 数据与渲染结果。

#### Returns

`void`

***

### clearFootprintRangeRenderer()

> **clearFootprintRangeRenderer**(): `void`

清空 footprint 区间渲染器。

#### Returns

`void`

***

### clearFootprintSampleRenderer()

> **clearFootprintSampleRenderer**(): `void`

清空按样本逐帧绘制的 footprint 结果。

#### Returns

`void`

***

### clearFootprintUnionRenderer()

> **clearFootprintUnionRenderer**(): `void`

清空合并 footprint 渲染器。

#### Returns

`void`

***

### computeFootprintRecords()

> **computeFootprintRecords**(`stepSeconds?`, `maxSampleCount?`): `RealtimeFootprintRecord`[]

计算覆盖时间范围内的离散采样覆盖记录。

根据 `footPrint.footprintTimes` 配置和指定步长，对时间范围进行离散采样，
计算每个采样时刻的覆盖范围（经纬度集合）。

#### Parameters

##### stepSeconds?

`number` = `60`

采样步长（秒），默认 60 秒

##### maxSampleCount?

`number`

#### Returns

`RealtimeFootprintRecord`[]

覆盖记录数组，每个元素包含采样时间和对应的覆盖范围经纬度集合

#### Example

```ts
// 计算每 30 秒采样一次的所有覆盖记录
const records = sensor.computeFootprintRecords(30);
// 结果: [{ time: JulianDate, positions: [{ lon, lat, height }, ...] }, ...]
```

***

### destroy()

> **destroy**(): `void`

销毁组件（会移除内部 Feature 并释放资源）。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### drawCoverageAtSimulationTime()

> **drawCoverageAtSimulationTime**(`config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

绘制当前仿真时间覆盖（drawFootprintAtSimulationTime 的别名）。

#### Parameters

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawCoverageAtTime()

> **drawCoverageAtTime**(`time`, `config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

绘制某一时刻覆盖（drawFootprintAtTime 的别名）。

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

绘制指定时间区间内的 footprint。

#### Parameters

##### config

[`FootprintDrawOptions`](../types/PW.FootprintDrawOptions.md)

绘制配置。

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

本次绘制结果对应的经纬高边界。

***

### drawFootprintAtSimulationTime()

> **drawFootprintAtSimulationTime**(`config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

绘制当前仿真时间的覆盖。

#### Parameters

##### config?

[`FootprintAtTimeDrawOptions`](../types/PW.FootprintAtTimeDrawOptions.md)

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

***

### drawFootprintAtTime()

> **drawFootprintAtTime**(`time`, `config?`): [`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

绘制某一时刻的覆盖（begin=end）。

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

绘制指定时间区间内的合并 footprint。

#### Parameters

##### config

[`FootprintDrawOptions`](../types/PW.FootprintDrawOptions.md)

合并绘制配置。

#### Returns

[`FootprintLngLatBounds`](../types/PW.FootprintLngLatBounds.md) \| `undefined`

合并结果对应的经纬高边界。

***

### getEstimatedRealtimeFootprintVisibleCount()

> **getEstimatedRealtimeFootprintVisibleCount**(): `number`

获取实时 footprint 的预计可见数量。

#### Returns

`number`

当前估算的可见数量。

***

### getFootPrintAtTime()

> **getFootPrintAtTime**(`time`): `Cartographic`[]

获取传感器在当前或指定时刻的地面覆盖范围。

会临时修改 Feature 状态并自动恢复——每次调用都有 state save/restore 开销。
批量分析场景请使用 [getFootPrintAtTimeUnsafe](#getfootprintattimeunsafe)。

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartographic`[]

***

### getFootPrintAtTimeUnsafe()

> **getFootPrintAtTimeUnsafe**(`time`): `Cartographic`[]

批量分析专用：跳过 state save/restore/_syncLiveFeature，直接计算覆盖区。

与 [getFootPrintAtTime](#getfootprintattime) 的区别：
- 不做 _captureFootprintEvaluationLiveState / _restoreFootprintEvaluationLiveState
- 不做 _syncLiveFeatureToCurrentTime（调用后 Feature 留在目标时间，不触发渲染）
- 批量计算完成后需调用 [syncLiveFeatureToCurrentTime](#synclivefeaturetocurrenttime) 统一还原

适用于 BaseCoverageAnalysis 中对大量时间步连续计算覆盖区的场景。

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartographic`[]

***

### getFootprintRenderComplexityProfile()

> **getFootprintRenderComplexityProfile**(): `FootprintRenderComplexityProfile` \| `undefined`

获取 footprint 渲染复杂度画像。

#### Returns

`FootprintRenderComplexityProfile` \| `undefined`

当前复杂度画像；若尚未建立则返回 `undefined`。

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

获取当前绑定的宿主对象。

#### Returns

[`BaseObject`](PW.BaseObject.md) \| `undefined`

当前传感器所属的物理对象。

***

### hideBeam()

> **hideBeam**(): `void`

隐藏波束体积。

#### Returns

`void`

***

### hideBeamFootprint()

> **hideBeamFootprint**(): `void`

隐藏当前已生成的 beam footprint。

#### Returns

`void`

***

### hideFootprintRangeRenderer()

> **hideFootprintRangeRenderer**(): `void`

隐藏 footprint 区间渲染结果。

#### Returns

`void`

***

### hideFootprintUnionRenderer()

> **hideFootprintUnionRenderer**(): `void`

隐藏合并 footprint 渲染结果。

#### Returns

`void`

***

### register()

> **register**(`object`): `Sensor`

将组件注册到物理对象上，并确保内部 Feature（体积/footprint）创建。

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

彻底移除 beam footprint 功能及其已生成结果。

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

重置跨时间循环保留的临时状态。

当仿真时间倒退或循环回起点时，宿主对象会调用该方法，让组件清理跨帧缓存。

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

配置并启动“时间区间覆盖绘制”。

说明：
- 调用后会立即进入实时调度
- 后续可再次调用以动态更新绘制参数

#### Parameters

##### config

`false` \| [`BeamFootprint`](../types/PW.BeamFootprint.md)

#### Returns

`void`

***

### setFootprintRangeRenderer()

> **setFootprintRangeRenderer**(`config`): `void`

配置 footprint 区间渲染器。

#### Parameters

##### config

`false` \| [`FootprintRangeRendererOptions`](../types/PW.FootprintRangeRendererOptions.md)

区间渲染配置；传 `false` 时清空当前渲染器。

#### Returns

`void`

***

### setRealtimeFootprintRender()

> **setRealtimeFootprintRender**(`stepSeconds?`, `retainSeconds?`, `maxSampleCount?`): `void`

配置实时 footprint 绘制参数。

说明：
- 预计算所有采样时刻的覆盖范围
- 跟随仿真时间动态显示/隐藏采样点
- 时间到达采样点时绘制，过期后移除或隐藏

#### Parameters

##### stepSeconds?

`number` = `60`

采样步长，单位为秒。默认 60。

##### retainSeconds?

`number`

采样点过期后的保留时间，单位为秒；`0` 表示立即移除。

##### maxSampleCount?

`number`

覆盖采样数量上限；最终有效值不超过 3000。

#### Returns

`void`

***

### showBeam()

> **showBeam**(): `void`

显示波束体积。

#### Returns

`void`

***

### showBeamFootprint()

> **showBeamFootprint**(): `void`

显示当前已生成的 beam footprint。

#### Returns

`void`

***

### showFootprintRangeRenderer()

> **showFootprintRangeRenderer**(): `void`

显示 footprint 区间渲染结果。

#### Returns

`void`

***

### showFootprintUnionRenderer()

> **showFootprintUnionRenderer**(): `void`

显示合并 footprint 渲染结果。

#### Returns

`void`

***

### syncLiveFeatureToCurrentTime()

> **syncLiveFeatureToCurrentTime**(): `void`

批量分析后统一还原 Feature 到引擎时间。

配合 [getFootPrintAtTimeUnsafe](#getfootprintattimeunsafe) 使用——批量计算完后调用此方法
将 Feature 的 temporal state 重置回引擎当前时间。

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

从物理对象卸载组件（会移除内部 Feature）。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`spaceObject`, `time`): `void`

每帧更新（由宿主 BaseObject.update 驱动）。

当前职责：
- 分发覆盖调度更新（与实体 update 保持同一时序）
- 更新实时 footprint 绘制状态

说明：
- 覆盖调度不再依赖内部定时器或场景事件监听
- 由宿主更新统一驱动，可确保与实体姿态/位置同步

#### Parameters

##### spaceObject

`any`

宿主实体（兼容传入）

##### time

`JulianDate`

仿真时间

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
