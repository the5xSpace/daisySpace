[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchPortOptions

# Interface: RuntimePatchPortOptions\<TTargetKind, TTarget\>

## Type Parameters

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TTarget

`TTarget` = `unknown`

## Properties

### resolveTarget?

> `readonly` `optional` **resolveTarget?**: [`RuntimePatchTargetResolver`](../types/RuntimePatchTargetResolver.md)\<`TTarget`, `TTargetKind`\>

***

### targets?

> `readonly` `optional` **targets?**: `ReadonlyMap`\<`string`, `TTarget`\> \| `Readonly`\<`Record`\<`string`, `TTarget`\>\>

***

### updateBatch?

> `readonly` `optional` **updateBatch?**: [`RuntimePatchBatchBoundary`](RuntimePatchBatchBoundary.md)
