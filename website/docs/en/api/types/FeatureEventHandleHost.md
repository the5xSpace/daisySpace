[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureEventHandleHost

# Type Alias: FeatureEventHandleHost

> **FeatureEventHandleHost** = `{ getEngine: () => any; matchesPickedResult: (result) => boolean; submitToEntity: (event, payload?) => void; submitToEntityEnabled: boolean }`

FeatureEventHandle's host capability set.

Implemented by the Feature base class to map ViewerEventHandle’s SPACE_ENTITY_* events
into a unified interaction event system where “Feature can listen itself + optionally submit Entity upward”.

## Properties

### getEngine

> **getEngine**: () => `any`

#### Returns

`any`

***

### matchesPickedResult

> **matchesPickedResult**: (`result`) => `boolean`

#### Parameters

##### result

`ClickSpaceEntityResult`

#### Returns

`boolean`

***

### submitToEntity

> **submitToEntity**: (`event`, `payload?`) => `void`

#### Parameters

##### event

`string`

##### payload?

`ClickSpaceEntityResult`

#### Returns

`void`

***

### submitToEntityEnabled

> **submitToEntityEnabled**: `boolean`
