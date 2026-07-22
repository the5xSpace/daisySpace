[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoGlobeOptions

# Interface: GeoGlobeOptions

Globe surface display property configuration.
All fields are optional; only passed fields are set, unpassed fields retain their current values.

## Properties

### atmosphereBrightnessShift?

> `optional` **atmosphereBrightnessShift?**: `number`

Atmosphere brightness shift (-1~1)

***

### atmosphereHueShift?

> `optional` **atmosphereHueShift?**: `number`

Atmosphere hue shift (0~1)

***

### atmosphereSaturationShift?

> `optional` **atmosphereSaturationShift?**: `number`

Atmosphere saturation shift (-1~1)

***

### backFaceCulling?

> `optional` **backFaceCulling?**: `boolean`

Whether to cull terrain back faces

***

### baseColor?

> `optional` **baseColor?**: `Color`

Earth base color when no imagery is available

***

### depthTestAgainstTerrain?

> `optional` **depthTestAgainstTerrain?**: `boolean`

Whether primitives (Billboard/Polyline/Label etc.) should perform depth testing against terrain

***

### enableLighting?

> `optional` **enableLighting?**: `boolean`

Whether to enable sunlight lighting effects

***

### lambertDiffuseMultiplier?

> `optional` **lambertDiffuseMultiplier?**: `number`

Lambert diffuse multiplier for sunlight (only effective when enableLighting=true)

***

### lightingFadeInDistance?

> `optional` **lightingFadeInDistance?**: `number`

Distance (meters) at which lighting starts to fade in, only effective when enableLighting or showGroundAtmosphere is set

***

### lightingFadeOutDistance?

> `optional` **lightingFadeOutDistance?**: `number`

Distance (meters) at which lighting is fully effective, only effective when enableLighting or showGroundAtmosphere is set

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md) \| `null`

Terrain material; pass null to clear the current material

***

### maximumScreenSpaceError?

> `optional` **maximumScreenSpaceError?**: `number`

Screen space error; higher values improve performance but reduce quality

***

### shadows?

> `optional` **shadows?**: `number`

Shadow mode: 0=disabled, 1=enable casting, 2=enable receiving, 3=cast+receive

***

### show?

> `optional` **show?**: `boolean`

Whether to show the globe, default true

***

### showGroundAtmosphere?

> `optional` **showGroundAtmosphere?**: `boolean`

Whether to show the ground atmosphere

***

### showSkirts?

> `optional` **showSkirts?**: `boolean`

Whether to show terrain skirts

***

### showWaterEffect?

> `optional` **showWaterEffect?**: `boolean`

Whether to show water surface wave effects

***

### tileCacheSize?

> `optional` **tileCacheSize?**: `number`

Terrain tile cache size

***

### vertexShadowDarkness?

> `optional` **vertexShadowDarkness?**: `number`

Vertex shadow darkness (only effective when enableLighting=true)
