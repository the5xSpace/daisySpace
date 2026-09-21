[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchResult

# Interface: RuntimePatchResult\<TValue, TTargetKind, TPath\>

## Type Parameters

### TValue

`TValue` = `unknown`

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TPath

`TPath` *extends* `string` = `string`

## Properties

### applied

> `readonly` **applied**: `boolean`

***

### diagnostics

> `readonly` **diagnostics**: readonly [`RuntimePatchDiagnostic`](RuntimePatchDiagnostic.md)[]

***

### path

> `readonly` **path**: `TPath`

***

### requiresRecreate

> `readonly` **requiresRecreate**: `boolean`

***

### rollback?

> `readonly` `optional` **rollback?**: () => [`RuntimePatchRollbackResult`](RuntimePatchRollbackResult.md)

Available to an adapter when a later recreate step needs compensation.

#### Returns

[`RuntimePatchRollbackResult`](RuntimePatchRollbackResult.md)

***

### rolledBack

> `readonly` **rolledBack**: `boolean`

True when a failed apply was restored before the result was returned.

***

### status

> `readonly` **status**: [`RuntimePatchStatus`](../types/RuntimePatchStatus.md)

***

### targetId

> `readonly` **targetId**: `string`

***

### targetKind

> `readonly` **targetKind**: `TTargetKind`

***

### unsupported

> `readonly` **unsupported**: `boolean`

***

### value

> `readonly` **value**: `TValue`
