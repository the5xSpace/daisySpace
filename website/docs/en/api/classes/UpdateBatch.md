[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / UpdateBatch

# Class: UpdateBatch\<TUpdate\>

Coalesces update invalidations without owning a render loop or a lock.

`beginUpdate`/`endUpdate` are useful for hosts that already have a queue;
`withUpdateBatch` is the preferred exception-safe form.

## Type Parameters

### TUpdate

`TUpdate` *extends* [`UpdateInvalidation`](../interfaces/UpdateInvalidation.md) = [`UpdateInvalidation`](../interfaces/UpdateInvalidation.md)

## Constructors

### Constructor

> **new UpdateBatch**\<`TUpdate`\>(`options?`): `UpdateBatch`\<`TUpdate`\>

#### Parameters

##### options?

[`UpdateBatchOptions`](../interfaces/UpdateBatchOptions.md)\<`TUpdate`\> = `{}`

#### Returns

`UpdateBatch`\<`TUpdate`\>

## Accessors

### depth

#### Get Signature

> **get** **depth**(): `number`

##### Returns

`number`

***

### isActive

#### Get Signature

> **get** **isActive**(): `boolean`

##### Returns

`boolean`

***

### pendingCount

#### Get Signature

> **get** **pendingCount**(): `number`

##### Returns

`number`

***

### pendingUpdates

#### Get Signature

> **get** **pendingUpdates**(): readonly `TUpdate`[]

##### Returns

readonly `TUpdate`[]

## Methods

### abortUpdate()

> **abortUpdate**(`token?`): [`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>

#### Parameters

##### token?

[`UpdateBatchToken`](../interfaces/UpdateBatchToken.md)

#### Returns

[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>

***

### beginUpdate()

> **beginUpdate**(): [`UpdateBatchToken`](../interfaces/UpdateBatchToken.md)

#### Returns

[`UpdateBatchToken`](../interfaces/UpdateBatchToken.md)

***

### endUpdate()

> **endUpdate**(`token?`): [`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

#### Parameters

##### token?

[`UpdateBatchToken`](../interfaces/UpdateBatchToken.md)

#### Returns

[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

***

### flush()

> **flush**(): [`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

#### Returns

[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

***

### invalidate()

> **invalidate**(`update`): `void` \| [`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

Queue one invalidation, or flush it immediately outside a batch.

#### Parameters

##### update

`TUpdate`

#### Returns

`void` \| [`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\> \| `Promise`\<[`UpdateBatchResult`](../interfaces/UpdateBatchResult.md)\<`TUpdate`\>\>

***

### withUpdateBatch()

#### Call Signature

> **withUpdateBatch**\<`T`\>(`work`): `T`

##### Type Parameters

###### T

`T`

##### Parameters

###### work

() => `T`

##### Returns

`T`

#### Call Signature

> **withUpdateBatch**\<`T`\>(`work`): `Promise`\<`T`\>

##### Type Parameters

###### T

`T`

##### Parameters

###### work

() => `PromiseLike`\<`T`\>

##### Returns

`Promise`\<`T`\>
