[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchApplyContext

# Interface: RuntimePatchApplyContext\<TValue, TTargetKind, TPath\>

## Type Parameters

### TValue

`TValue` = `unknown`

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TPath

`TPath` *extends* `string` = `string`

## Properties

### request

> `readonly` **request**: [`RuntimePatchRequest`](RuntimePatchRequest.md)\<`TValue`, `TTargetKind`, `TPath`\>

***

### snapshot

> `readonly` **snapshot**: `unknown`

The host-defined snapshot captured immediately before apply.

## Methods

### addDiagnostic()

> **addDiagnostic**(`diagnostic`): `void`

#### Parameters

##### diagnostic

[`RuntimePatchDiagnosticInput`](RuntimePatchDiagnosticInput.md)

#### Returns

`void`
