[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceStrategyOptions

# Interface: ViewDistanceStrategyOptions

View distance strategy construction parameters.

## Properties

### scene?

> `optional` **scene?**: `string`

Currently used scene template name.

- Can use built-in values of `ViewScene.*`
- Or register a custom template name

***

### templates?

> `optional` **templates?**: `Map`\<`string`, [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)\>

Custom template collection.

Merged with built-in templates; keys with the same name override built-in values.
