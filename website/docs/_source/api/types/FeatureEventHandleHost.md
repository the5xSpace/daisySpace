[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureEventHandleHost

# Type Alias: FeatureEventHandleHost

> **FeatureEventHandleHost** = `{ getEngine: () => any; matchesPickedResult: (result) => boolean; submitToEntity: (event, payload?) => void; submitToEntityEnabled: boolean }`

FeatureEventHandle 的宿主能力集合。

由 Feature 基类实现，用于把 ViewerEventHandle 的 SPACE_ENTITY_* 事件
映射为“Feature 自身可监听 + 可选向上提交 Entity”的统一交互事件系统。

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
