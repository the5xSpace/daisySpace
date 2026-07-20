[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoFogOptions

# Interface: GeoFogOptions

Scene fog configuration; only modifies the provided fields.

## Properties

### brightness?

> `optional` **brightness?**: `number`

Fog brightness.

***

### density?

> `optional` **density?**: `number`

Fog density; larger values make distant terrain blend into the background sooner.

***

### enabled?

> `optional` **enabled?**: `boolean`

Whether to enable fog.

***

### renderable?

> `optional` **renderable?**: `boolean`

Whether to render fog color directly; when disabled, fog still affects level-of-detail calculations.

***

### screenSpaceErrorFactor?

> `optional` **screenSpaceErrorFactor?**: `number`

Screen-space error coefficient used when fog participates in level-of-detail calculations.
