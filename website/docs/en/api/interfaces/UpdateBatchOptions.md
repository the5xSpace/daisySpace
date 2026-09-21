[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / UpdateBatchOptions

# Interface: UpdateBatchOptions\<TUpdate\>

## Type Parameters

### TUpdate

`TUpdate` *extends* [`UpdateInvalidation`](UpdateInvalidation.md) = [`UpdateInvalidation`](UpdateInvalidation.md)

## Properties

### merge?

> `readonly` `optional` **merge?**: (`previous`, `next`) => `TUpdate`

Defaults to last-write-wins while preserving first insertion order.

#### Parameters

##### previous

`TUpdate`

##### next

`TUpdate`

#### Returns

`TUpdate`

***

### onFlush?

> `readonly` `optional` **onFlush?**: (`updates`) => `void` \| `Promise`\<`void`\>

Called once for the outermost non-empty batch.

#### Parameters

##### updates

readonly `TUpdate`[]

#### Returns

`void` \| `Promise`\<`void`\>
