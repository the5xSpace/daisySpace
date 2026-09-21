[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / UpdateInvalidation

# Interface: UpdateInvalidation\<TValue, TKey\>

A small, renderer-agnostic update boundary for coalescing invalidations.

## Type Parameters

### TValue

`TValue` = `unknown`

### TKey

`TKey` *extends* `string` = `string`

## Properties

### key

> `readonly` **key**: `TKey`

***

### metadata?

> `readonly` `optional` **metadata?**: `Readonly`\<`Record`\<`string`, `unknown`\>\>

***

### reason?

> `readonly` `optional` **reason?**: `string`

***

### value?

> `readonly` `optional` **value?**: `TValue`
