[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchPort

# Class: RuntimePatchPort\<TTargetKind, TTarget\>

Explicit runtime patch registry and dispatcher.

The class never interprets `path`; a registered handler is the only code
that can mutate a target. This makes the contract suitable for both real
SDK objects and small test doubles.

## Type Parameters

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TTarget

`TTarget` = `unknown`

## Constructors

### Constructor

> **new RuntimePatchPort**\<`TTargetKind`, `TTarget`\>(`options`): `RuntimePatchPort`\<`TTargetKind`, `TTarget`\>

#### Parameters

##### options

[`RuntimePatchPortOptions`](../interfaces/RuntimePatchPortOptions.md)\<`TTargetKind`, `TTarget`\>

#### Returns

`RuntimePatchPort`\<`TTargetKind`, `TTarget`\>

## Methods

### apply()

> **apply**\<`TValue`, `TPath`\>(`request`): [`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Type Parameters

##### TValue

`TValue`

##### TPath

`TPath` *extends* `string` = `string`

#### Parameters

##### request

[`RuntimePatchRequest`](../interfaces/RuntimePatchRequest.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Returns

[`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`TValue`, `TTargetKind`, `TPath`\>

***

### applyBatch()

> **applyBatch**(`requests`): readonly [`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`unknown`, `TTargetKind`, `string`\>[]

Apply several typed patches inside one optional host batch boundary.

#### Parameters

##### requests

readonly [`RuntimePatchRequest`](../interfaces/RuntimePatchRequest.md)\<`unknown`, `TTargetKind`, `string`\>[]

#### Returns

readonly [`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`unknown`, `TTargetKind`, `string`\>[]

***

### hasHandler()

> **hasHandler**(`targetKind`, `path`): `boolean`

#### Parameters

##### targetKind

`TTargetKind`

##### path

`string`

#### Returns

`boolean`

***

### patch()

> **patch**\<`TValue`, `TPath`\>(`request`): [`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`TValue`, `TTargetKind`, `TPath`\>

Alias matching the language used by runtime adapters.

#### Type Parameters

##### TValue

`TValue`

##### TPath

`TPath` *extends* `string` = `string`

#### Parameters

##### request

[`RuntimePatchRequest`](../interfaces/RuntimePatchRequest.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Returns

[`RuntimePatchResult`](../interfaces/RuntimePatchResult.md)\<`TValue`, `TTargetKind`, `TPath`\>

***

### register()

> **register**\<`TValue`, `TPath`\>(`handler`): () => `void`

Short alias useful when a host treats the registry as a port.

#### Type Parameters

##### TValue

`TValue`

##### TPath

`TPath` *extends* `string` = `string`

#### Parameters

##### handler

[`RuntimePatchHandler`](../interfaces/RuntimePatchHandler.md)\<`TTarget`, `TValue`, `TTargetKind`, `TPath`\>

#### Returns

() => `void`

***

### registerHandler()

> **registerHandler**\<`TValue`, `TPath`\>(`handler`): () => `void`

Register one explicit semantic field and return a scoped disposer.

#### Type Parameters

##### TValue

`TValue`

##### TPath

`TPath` *extends* `string` = `string`

#### Parameters

##### handler

[`RuntimePatchHandler`](../interfaces/RuntimePatchHandler.md)\<`TTarget`, `TValue`, `TTargetKind`, `TPath`\>

#### Returns

() => `void`
