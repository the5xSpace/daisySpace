[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyBuiltinMaterialOptions

# Type Alias: DaisyBuiltinMaterialOptions

> **DaisyBuiltinMaterialOptions** = [`SolidMaterialOptions`](SolidMaterialOptions.md) \| \{ `channel?`: `string`; `channels?`: `string`; `color?`: [`DColor`](DColor.md); `image?`: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`; `maximumHeight?`: `number`; `minimumHeight?`: `number`; `repeat?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `strength?`: `number`; \} \| [`GridMaterialOptions`](GridMaterialOptions.md) \| [`CheckerboardMaterialOptions`](CheckerboardMaterialOptions.md) \| [`StripeMaterialOptions`](StripeMaterialOptions.md) \| [`DotMaterialOptions`](DotMaterialOptions.md) \| \{ `amplitude?`: `number`; `animationSpeed?`: `number`; `baseWaterColor?`: [`DColor`](DColor.md); `blendColor?`: [`DColor`](DColor.md); `frequency?`: `number`; `normalMap?`: `string`; `specularIntensity?`: `number`; `specularMap?`: `string`; \} \| \{ `color?`: [`DColor`](DColor.md); `rimColor?`: [`DColor`](DColor.md); `width?`: `number`; \} \| \{ `fadeDirection?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `fadeInColor?`: [`DColor`](DColor.md); `fadeOutColor?`: [`DColor`](DColor.md); `maximumDistance?`: `number`; `repeat?`: `boolean`; `time?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; \} \| \{ `color?`: [`DColor`](DColor.md); `dashLength?`: `number`; `dashPattern?`: `number`; `gapColor?`: [`DColor`](DColor.md); `glowPower?`: `number`; `outlineColor?`: [`DColor`](DColor.md); `outlineWidth?`: `number`; `taperPower?`: `number`; \} \| \{ `alpha?`: `number`; `color?`: [`DColor`](DColor.md); `contourColor?`: [`DColor`](DColor.md); `contourWidth?`: `number`; `spacing?`: `number`; `width?`: `number`; \} \| \{ `colors?`: `string` \| `HTMLCanvasElement`; `heights?`: `string` \| `HTMLCanvasElement`; `landColor?`: [`DColor`](DColor.md); `waterColor?`: [`DColor`](DColor.md); \}

Union of built-in material option types accepted by `MaterialFactory.Builtin()`.

## Union Members

[`SolidMaterialOptions`](SolidMaterialOptions.md)

***

### Type Literal

\{ `channel?`: `string`; `channels?`: `string`; `color?`: [`DColor`](DColor.md); `image?`: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`; `maximumHeight?`: `number`; `minimumHeight?`: `number`; `repeat?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `strength?`: `number`; \}

#### channel?

> `optional` **channel?**: `string`

A single channel used for scalar sampling, such as `a` or `r`.

#### channels?

> `optional` **channels?**: `string`

A combination of channels used for color sampling, such as `rgb`.

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

Texture blend color.

#### image?

> `optional` **image?**: `string` \| `HTMLImageElement` \| `HTMLCanvasElement`

Image URL, image element, or canvas.

#### maximumHeight?

> `optional` **maximumHeight?**: `number`

Maximum height for elevation mapping.

#### minimumHeight?

> `optional` **minimumHeight?**: `number`

Minimum height for elevation mapping.

#### repeat?

> `optional` **repeat?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Number of horizontal and vertical texture repetitions.

#### strength?

> `optional` **strength?**: `number`

Strength of the bump or normal effect.

***

[`GridMaterialOptions`](GridMaterialOptions.md)

***

[`CheckerboardMaterialOptions`](CheckerboardMaterialOptions.md)

***

[`StripeMaterialOptions`](StripeMaterialOptions.md)

***

[`DotMaterialOptions`](DotMaterialOptions.md)

***

### Type Literal

\{ `amplitude?`: `number`; `animationSpeed?`: `number`; `baseWaterColor?`: [`DColor`](DColor.md); `blendColor?`: [`DColor`](DColor.md); `frequency?`: `number`; `normalMap?`: `string`; `specularIntensity?`: `number`; `specularMap?`: `string`; \}

#### amplitude?

> `optional` **amplitude?**: `number`

Wave amplitude.

#### animationSpeed?

> `optional` **animationSpeed?**: `number`

Wave animation speed.

#### baseWaterColor?

> `optional` **baseWaterColor?**: [`DColor`](DColor.md)

Base water color.

#### blendColor?

> `optional` **blendColor?**: [`DColor`](DColor.md)

Water-surface blend color.

#### frequency?

> `optional` **frequency?**: `number`

Wave frequency.

#### normalMap?

> `optional` **normalMap?**: `string`

Normal-map URL.

#### specularIntensity?

> `optional` **specularIntensity?**: `number`

Specular intensity.

#### specularMap?

> `optional` **specularMap?**: `string`

Specular-map URL.

***

### Type Literal

\{ `color?`: [`DColor`](DColor.md); `rimColor?`: [`DColor`](DColor.md); `width?`: `number`; \}

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

Base surface color.

#### rimColor?

> `optional` **rimColor?**: [`DColor`](DColor.md)

Rim-light color.

#### width?

> `optional` **width?**: `number`

Rim-light width.

***

### Type Literal

\{ `fadeDirection?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; `fadeInColor?`: [`DColor`](DColor.md); `fadeOutColor?`: [`DColor`](DColor.md); `maximumDistance?`: `number`; `repeat?`: `boolean`; `time?`: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`; \}

#### fadeDirection?

> `optional` **fadeDirection?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Fade direction; a number uses the same value for both components.

#### fadeInColor?

> `optional` **fadeInColor?**: [`DColor`](DColor.md)

Fade-in color.

#### fadeOutColor?

> `optional` **fadeOutColor?**: [`DColor`](DColor.md)

Fade-out color.

#### maximumDistance?

> `optional` **maximumDistance?**: `number`

Maximum distance used for the fade calculation.

#### repeat?

> `optional` **repeat?**: `boolean`

Whether to repeat the fade.

#### time?

> `optional` **time?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Current fade progress; a number uses the same value for both components.

***

### Type Literal

\{ `color?`: [`DColor`](DColor.md); `dashLength?`: `number`; `dashPattern?`: `number`; `gapColor?`: [`DColor`](DColor.md); `glowPower?`: `number`; `outlineColor?`: [`DColor`](DColor.md); `outlineWidth?`: `number`; `taperPower?`: `number`; \}

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

Main line color.

#### dashLength?

> `optional` **dashLength?**: `number`

Length of one dash cycle.

#### dashPattern?

> `optional` **dashPattern?**: `number`

Dash bit pattern.

#### gapColor?

> `optional` **gapColor?**: [`DColor`](DColor.md)

Dash gap color.

#### glowPower?

> `optional` **glowPower?**: `number`

Glow intensity.

#### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color.

#### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width in pixels.

#### taperPower?

> `optional` **taperPower?**: `number`

Line-end taper strength.

***

### Type Literal

\{ `alpha?`: `number`; `color?`: [`DColor`](DColor.md); `contourColor?`: [`DColor`](DColor.md); `contourWidth?`: `number`; `spacing?`: `number`; `width?`: `number`; \}

#### alpha?

> `optional` **alpha?**: `number`

Overall opacity, from 0 to 1.

#### color?

> `optional` **color?**: [`DColor`](DColor.md)

Base color.

#### contourColor?

> `optional` **contourColor?**: [`DColor`](DColor.md)

Contour color.

#### contourWidth?

> `optional` **contourWidth?**: `number`

Contour width.

#### spacing?

> `optional` **spacing?**: `number`

Contour elevation spacing.

#### width?

> `optional` **width?**: `number`

Compatibility field for contour width.

***

### Type Literal

\{ `colors?`: `string` \| `HTMLCanvasElement`; `heights?`: `string` \| `HTMLCanvasElement`; `landColor?`: [`DColor`](DColor.md); `waterColor?`: [`DColor`](DColor.md); \}

#### colors?

> `optional` **colors?**: `string` \| `HTMLCanvasElement`

Segmented color texture.

#### heights?

> `optional` **heights?**: `string` \| `HTMLCanvasElement`

Segmented elevation texture.

#### landColor?

> `optional` **landColor?**: [`DColor`](DColor.md)

Land-area color.

#### waterColor?

> `optional` **waterColor?**: [`DColor`](DColor.md)

Water-area color.
