[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Pathway

# Type Alias: Pathway

> **Pathway** = (`Cartesian3` \| [`Entity`](../classes/Entity.md) \| [`REF`](../enums/REF.md))[]

Ordered collection of path points used by line or path features.

## Example

```ts
const path: Daisy.Pathway = [
 entityA,
 new Daisy.Cartesian3(1, 2, 3),
 Daisy.REF.GLOBAL_ORIGIN,
];
```
