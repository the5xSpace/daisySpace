[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / preloadIcrfFixed

# Function: preloadIcrfFixed()

> **preloadIcrfFixed**(`timeInterval`): `Promise`\<`void`\>

Preloads the data necessary to transform between the ICRF and Fixed axes, in either
direction, over a given interval. This function returns a promise that, when resolved,
indicates that the preload has completed.

## Parameters

### timeInterval

[`TimeInterval`](../classes/Daisy.TimeInterval.md)

The interval to preload.

## Returns

`Promise`\<`void`\>

A promise that, when resolved, indicates that the preload has completed
 and evaluation of the transformation between the fixed and ICRF axes will
 no longer return undefined for a time inside the interval.

## Example

```ts
const interval = new Daisy.TimeInterval(...);
await Daisy.Transforms.preloadIcrfFixed(interval));
// the data is now loaded
```
