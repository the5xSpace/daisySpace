[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrackingOptions

# Interface: TrackingOptions

Tracking target configuration options.

Used to make a Feature (e.g., trajectory line, polyline) automatically track a dynamic target.

## Properties

### trackingEnabled?

> `optional` **trackingEnabled?**: [`TimeValue`](../types/TimeValue.md)\<`boolean`\>

Whether to enable tracking (supports dynamic switching by simulation time).

***

### trackingTarget

> **trackingTarget**: [`Entity`](../classes/Entity.md) \| `Cartesian3` \| [`FreeObject`](../classes/PW.FreeObject.md) \| \{ `entity`: [`Entity`](../classes/Entity.md); \} \| `undefined`

Tracking target (entity, coordinate point, or free object).
