[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineHighlightRange

# Class: TimelineHighlightRange

## Constructors

### Constructor

> **new TimelineHighlightRange**(`color`, `heightInPx`, `base?`): `TimelineHighlightRange`

#### Parameters

##### color

`string`

##### heightInPx

`number`

##### base?

`number`

#### Returns

`TimelineHighlightRange`

## Methods

### getBase()

> **getBase**(): `number`

#### Returns

`number`

***

### getHeight()

> **getHeight**(): `number`

#### Returns

`number`

***

### getStartTime()

> **getStartTime**(): `JulianDate` \| `undefined`

#### Returns

`JulianDate` \| `undefined`

***

### getStopTime()

> **getStopTime**(): `JulianDate` \| `undefined`

#### Returns

`JulianDate` \| `undefined`

***

### render()

> **render**(`renderState`): `string`

#### Parameters

##### renderState

[`HighlightRangeRenderState`](../interfaces/HighlightRangeRenderState.md)

#### Returns

`string`

***

### setRange()

> **setRange**(`start`, `stop`): `void`

#### Parameters

##### start

`JulianDate`

##### stop

`JulianDate`

#### Returns

`void`
