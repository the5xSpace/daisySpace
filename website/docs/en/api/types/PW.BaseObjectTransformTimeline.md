[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BaseObjectTransformTimeline

# Type Alias: BaseObjectTransformTimeline

> **BaseObjectTransformTimeline** = `object`

Local transform time-sampling configuration for physical objects.

Notes:
- Supports four `TimeValue` forms: constant, callback, sample array, sample sequence
- `translate` is the recommended field name
- `tanslate` is a legacy compatibility spelling

## Properties

### rotation?

> `optional` **rotation?**: [`TimeValue`](TimeValue.md)\<[`Rotation`](Rotation.md)\>

***

### scale?

> `optional` **scale?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>

***

### tanslate?

> `optional` **tanslate?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>

***

### translate?

> `optional` **translate?**: [`TimeValue`](TimeValue.md)\<`Daisy.Cartesian3`\>
