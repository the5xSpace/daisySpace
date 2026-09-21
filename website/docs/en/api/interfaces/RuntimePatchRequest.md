[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchRequest

# Interface: RuntimePatchRequest\<TValue, TTargetKind, TPath\>

## Type Parameters

### TValue

`TValue` = `unknown`

### TTargetKind

`TTargetKind` *extends* `string` = `string`

### TPath

`TPath` *extends* `string` = `string`

## Properties

### metadata?

> `readonly` `optional` **metadata?**: `Readonly`\<`Record`\<`string`, `unknown`\>\>

***

### path

> `readonly` **path**: `TPath`

Semantic field key. It is only a registry key; it is never traversed.

***

### revision?

> `readonly` `optional` **revision?**: `string` \| `number`

***

### source?

> `readonly` `optional` **source?**: `string`

***

### targetId

> `readonly` **targetId**: `string`

***

### targetKind

> `readonly` **targetKind**: `TTargetKind`

***

### value

> `readonly` **value**: `TValue`
