[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialBodyConfig

# Type Alias: CelestialBodyConfig

> **CelestialBodyConfig** = `object`

Shared base configuration for celestial body objects.

## Properties

### arrowPointers?

> `optional` **arrowPointers?**: [`ArrowPointerOptions`](ArrowPointerOptions.md)[]

List of arrow pointer configurations

***

### bodyAxis?

> `optional` **bodyAxis?**: `boolean` \| `BodyAxisOptions`

Whether to display the body axis

***

### ellipsoid?

> `optional` **ellipsoid?**: `false` \| \{ `shadows?`: `Daisy.ShadowMode`; `show?`: `boolean`; `terminator?`: `boolean`; \}

Ellipsoid configuration; false disables it

#### Union Members

`false`

***

##### Type Literal

\{ `shadows?`: `Daisy.ShadowMode`; `show?`: `boolean`; `terminator?`: `boolean`; \}

##### shadows?

> `optional` **shadows?**: `Daisy.ShadowMode`

Shadow mode

##### show?

> `optional` **show?**: `boolean`

Whether to display the ellipsoid

##### terminator?

> `optional` **terminator?**: `boolean`

Whether to enable day/night terminator lighting transition

***

### grid?

> `optional` **grid?**: `false` \| `ConstructorParameters`\<*typeof* [`CelestialGeodeticGridLayers`](../classes/CelestialGeodeticGridLayers.md)\>\[`0`\]

Latitude/longitude grid configuration; false disables it

***

### lockCamera?

> `optional` **lockCamera?**: `boolean`

Whether to lock the camera to the celestial body

***

### name?

> `optional` **name?**: `string`

Name

***

### track?

> `optional` **track?**: `boolean`

Whether to enable camera tracking
