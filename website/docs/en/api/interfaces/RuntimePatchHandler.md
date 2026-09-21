[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchHandler

# Interface: RuntimePatchHandler\<TTarget, TValue, TTargetKind, TPath\>

## Type Parameters

### TTarget

`TTarget`

### TValue

`TValue`

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TPath

`TPath` *extends* `string` = `string`

## Properties

### apply?

> `readonly` `optional` **apply?**: (`target`, `value`, `context`) => `void` \| [`RuntimePatchMutation`](RuntimePatchMutation.md)

Invoke the target's typed setter/options operation.

#### Parameters

##### target

`TTarget`

##### value

`TValue`

##### context

[`RuntimePatchApplyContext`](RuntimePatchApplyContext.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Returns

`void` \| [`RuntimePatchMutation`](RuntimePatchMutation.md)

***

### path

> `readonly` **path**: `TPath`

***

### restore?

> `readonly` `optional` **restore?**: (`target`, `snapshot`, `context`) => `void`

Restore the snapshot when apply or a later recreate step fails.

#### Parameters

##### target

`TTarget`

##### snapshot

`unknown`

##### context

[`RuntimePatchRollbackContext`](RuntimePatchRollbackContext.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Returns

`void`

***

### snapshot?

> `readonly` `optional` **snapshot?**: (`target`, `request`) => `unknown`

Capture options or render state before the typed setter runs.

#### Parameters

##### target

`TTarget`

##### request

[`RuntimePatchRequest`](RuntimePatchRequest.md)\<`TValue`, `TTargetKind`, `TPath`\>

#### Returns

`unknown`

***

### strategy?

> `readonly` `optional` **strategy?**: [`RuntimePatchStrategy`](../types/RuntimePatchStrategy.md)

Defaults to `patch` when omitted.

***

### targetKind

> `readonly` **targetKind**: `TTargetKind`
