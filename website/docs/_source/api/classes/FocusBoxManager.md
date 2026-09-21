[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FocusBoxManager

# Class: FocusBoxManager

Engine 级聚焦框资源池。

两个 slot 各自只拥有一个 BoundBoxFeature 及其底层渲染资源；切换目标时
只更新边界和显隐状态，不把辅助框挂到目标 Entity 或实体调度链上。

## Constructors

### Constructor

> **new FocusBoxManager**(`_engine`): `FocusBoxManager`

#### Parameters

##### \_engine

[`Engine`](Engine.md)

#### Returns

`FocusBoxManager`

## Methods

### clear()

> **clear**(`slot`): `void`

隐藏指定 slot，但保留其渲染资源以便复用。

#### Parameters

##### slot

[`FocusBoxSlot`](../types/FocusBoxSlot.md)

#### Returns

`void`

***

### clearAll()

> **clearAll**(): `void`

隐藏两个 slot，但不销毁资源。

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

销毁两个 slot 的渲染资源和内部 host。

#### Returns

`void`

***

### show()

> **show**(`slot`, `target`, `options?`): [`BoundBoxFeature`](BoundBoxFeature.md) \| `undefined`

显示或切换指定 slot 的聚焦目标。

#### Parameters

##### slot

[`FocusBoxSlot`](../types/FocusBoxSlot.md)

##### target

`EntityFocusTarget`

##### options?

[`FocusBoxManagerOptions`](../types/FocusBoxManagerOptions.md) = `{}`

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md) \| `undefined`

***

### update()

> **update**(`time?`): `void`

每帧更新两个活跃 slot 的矩阵，像素尺寸按节流窗口刷新。

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`
