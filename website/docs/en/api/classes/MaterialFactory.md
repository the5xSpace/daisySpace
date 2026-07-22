[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / MaterialFactory

# Class: MaterialFactory

Unified material factory providing stable built-in materials, extended effect materials, and custom Shader creation entry point.

For regular geometry, prefer using `Solid()`, `Builtin()`, or `Registered()` which return `DaisyMaterialDescriptor`;
use `Custom()` for real-time compilation of custom shader source code.

## Constructors

### Constructor

> **new MaterialFactory**(): `MaterialFactory`

#### Returns

`MaterialFactory`

## Methods

### AlphaMap()

> `static` **AlphaMap**(`options`): `Material`

Create an Alpha map material

#### Parameters

##### options

Configuration options

###### channel?

`string`

Channel (default: "a")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.AlphaMap({
 image: 'alpha.jpg'
});
```

***

### AspectRamp()

> `static` **AspectRamp**(`image`): `Material`

Create an aspect ramp material

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

Gradient image (path or Canvas)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.AspectRamp('ramp.png');
```

***

### Builtin()

> `static` **Builtin**(`type`, `options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Daisy built-in material wrapper.

Only allows material types explicitly supported by Daisy, preventing business code from directly depending on underlying material type strings.

#### Parameters

##### type

[`DaisyBuiltinMaterialType`](../types/DaisyBuiltinMaterialType.md)

##### options?

[`DaisyBuiltinMaterialOptions`](../types/DaisyBuiltinMaterialOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

#### Example

```ts
const material = Daisy.MaterialFactory.Builtin("grid", {
 color: "#38bdf8",
 lineCount: { x: 12, y: 8 },
});
```

***

### BumpMap()

> `static` **BumpMap**(`options`): `Material`

Create bump map material

#### Parameters

##### options

Configuration options

###### channel?

`string`

Channel (default "r")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

###### strength?

`number`

Intensity (default 0.5)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.BumpMap({
 image: 'bump.jpg',
 strength: 0.8
});
```

***

### Checkerboard()

> `static` **Checkerboard**(`options`): `Material`

Create checkerboard material

#### Parameters

##### options

Configuration options

###### darkColor?

[`DColor`](../types/DColor.md)

Dark color

###### lightColor?

[`DColor`](../types/DColor.md)

Light color

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Checkerboard({
 lightColor: 'white',
 darkColor: 'gray',
 repeat: 4
});
```

***

### Color()

> `static` **Color**(`color`): `Material`

Create solid color material

#### Parameters

##### color

[`DColor`](../types/DColor.md)

Daisy color object or CSS color string.

#### Returns

`Material`

Daisy material descriptor

#### Example

```ts
const material = Daisy.MaterialFactory.Color(Daisy.Color.RED);
// 或者
const mat = Material.Color('#ff0000');
```

***

### Custom()

> `static` **Custom**(`type`, `uniforms`, `source`, `translucent?`): `Material`

Create custom material from Daisy GLSL source code.

Directly pass a string containing `daisy_*` identifiers for automatic conversion, no need to call wrapper functions in advance.

#### Parameters

##### type

`string`

Current material instance type identifier.

##### uniforms

`Uniforms`

Uniform parameters used by the Shader, can include `ShaderParams` dynamic parameters.

##### source

[`MaterialShaderSource`](../types/MaterialShaderSource.md)

Daisy GLSL material source code.

##### translucent?

`boolean` = `true`

Whether to treat as a translucent material. Default `true`.

#### Returns

`Material`

#### Example

```ts
const material = Daisy.MaterialFactory.Custom("MissionSurface", {
 color: Daisy.Color.RED,
}, `
 daisy_material daisy_getMaterial(daisy_materialInput input) {
 daisy_material material = daisy_getDefaultMaterial(input);
 material.diffuse = color.rgb;
 material.alpha = color.a;
 return material;
 }
`);
```

***

### DaisyAdvancedWater()

> `static` **DaisyAdvancedWater**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Create advanced water surface material

#### Parameters

##### options?

[`DaisyAdvancedWaterOptions`](../types/DaisyAdvancedWaterOptions.md) = `{}`

Configuration options

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

DaisyMaterialDescriptor

#### Example

```ts
const mat = Material.DaisyAdvancedWater({
 baseColor: '#001428',
 surfaceColor: '#006496',
 waveSpeed: 0.8,
});
```

***

### DaisyAurora()

> `static` **DaisyAurora**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Aurora curtain material.

#### Parameters

##### options?

[`DaisyAuroraOptions`](../types/DaisyAuroraOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyCellular()

> `static` **DaisyCellular**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Cell/honeycomb boundary material.

#### Parameters

##### options?

[`DaisyCellularOptions`](../types/DaisyCellularOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyCircuit()

> `static` **DaisyCircuit**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Circuit trace material.

#### Parameters

##### options?

[`DaisyCircuitOptions`](../types/DaisyCircuitOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyContourBands()

> `static` **DaisyContourBands**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Contour layered material.

#### Parameters

##### options?

[`DaisyContourBandsOptions`](../types/DaisyContourBandsOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyDitherFade()

> `static` **DaisyDitherFade**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Bayer dithering fade material.

#### Parameters

##### options?

[`DaisyDitherFadeOptions`](../types/DaisyDitherFadeOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyGridGlow()

> `static` **DaisyGridGlow**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Glowing grid material.

#### Parameters

##### options?

[`DaisyGridGlowOptions`](../types/DaisyGridGlowOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyHalftone()

> `static` **DaisyHalftone**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Halftone dot material.

#### Parameters

##### options?

[`DaisyHalftoneOptions`](../types/DaisyHalftoneOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyHeatmap()

> `static` **DaisyHeatmap**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Thermal radial gradient material.

#### Parameters

##### options?

[`DaisyHeatmapOptions`](../types/DaisyHeatmapOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyMarble()

> `static` **DaisyMarble**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Marble/stratum texture material.

Noise-perturbed sinusoidal stripes, suitable for abstract strata, moire patterns, or structural slices.

#### Parameters

##### options?

[`DaisyMarbleOptions`](../types/DaisyMarbleOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyMatrixRain()

> `static` **DaisyMatrixRain**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Matrix rain/telemetry stream material.

#### Parameters

##### options?

[`DaisyMatrixRainOptions`](../types/DaisyMatrixRainOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyNoiseField()

> `static` **DaisyNoiseField**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Procedural noise field material.

Drawing from common value-noise/fbm approaches, for non-realistic texture representations like clouds, energy surfaces, and signal perturbations.

#### Parameters

##### options?

[`DaisyNoiseFieldOptions`](../types/DaisyNoiseFieldOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyScanline()

> `static` **DaisyScanline**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Scanline material.

#### Parameters

##### options?

[`DaisyScanlineOptions`](../types/DaisyScanlineOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisySdfRings()

> `static` **DaisySdfRings**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

SDF concentric ring material.

#### Parameters

##### options?

[`DaisySdfRingsOptions`](../types/DaisySdfRingsOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyTopoRipple()

> `static` **DaisyTopoRipple**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Terrain contour and radar ripple blended material.

#### Parameters

##### options?

[`DaisyTopoRippleOptions`](../types/DaisyTopoRippleOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyTurbulence()

> `static` **DaisyTurbulence**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Turbulence noise material.

Uses multi-layer absolute value noise to represent energy clouds, air masses, and non-uniform signal surfaces.

#### Parameters

##### options?

[`DaisyTurbulenceOptions`](../types/DaisyTurbulenceOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DaisyWarpedStripes()

> `static` **DaisyWarpedStripes**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Distorted stripe material.

#### Parameters

##### options?

[`DaisyWarpedStripesOptions`](../types/DaisyWarpedStripesOptions.md) = `{}`

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### DiffuseMap()

> `static` **DiffuseMap**(`options`): `Material`

Create diffuse map material

#### Parameters

##### options

Configuration options

###### channels?

`string`

Channel (default "rgb")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.DiffuseMap({
 image: 'diffuse.jpg'
});
```

***

### Dot()

> `static` **Dot**(`options`): `Material`

Create dot matrix material

#### Parameters

##### options

Configuration options

###### darkColor?

[`DColor`](../types/DColor.md)

Dark color

###### lightColor?

[`DColor`](../types/DColor.md)

Light color

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Dot({
 lightColor: 'white',
 darkColor: 'black',
 repeat: 10
});
```

***

### DownEmitDiffuse()

> `static` **DownEmitDiffuse**(`options`): `Material`

Create downward emissive diffuse material (native material)
Static creation, not time-driven

#### Parameters

##### options

Configuration options

###### bottomColor?

`string` \| `Color`

Bottom color

###### color?

`string` \| `Color`

Base color

###### diffusionRadius?

`number`

Diffusion radius

###### diffusionWidth?

`number`

Diffusion width

###### opacity?

`number`

Opacity

###### speed?

`number`

Speed

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.DownEmitDiffuse({
 color: 'green',
 bottomColor: 'lime',
 speed: 1.5
});
```

***

### ElevationBand()

> `static` **ElevationBand**(`options`): `Material`

Create elevation band material

#### Parameters

##### options

Configuration options

###### colors

`string` \| `HTMLCanvasElement`

Color ramp (image or Canvas)

###### heights

`string` \| `HTMLCanvasElement`

Height ramp (image or Canvas)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.ElevationBand({
 heights: 'heights.png',
 colors: 'colors.png'
});
```

***

### ElevationContour()

> `static` **ElevationContour**(`options`): `Material`

Create contour line material

#### Parameters

##### options

Configuration options

###### alpha?

`number`

Opacity

###### color?

`string` \| `Color`

###### contourColor?

`string` \| `Color`

Contour line color

###### contourWidth?

`number`

Contour line width

###### spacing?

`number`

Spacing

###### width?

`number`

Line width

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.ElevationContour({
 contourColor: 'red',
 spacing: 50,
 width: 2
});
```

***

### ElevationRamp()

> `static` **ElevationRamp**(`image`, `options?`): `Material`

Create elevation gradient material

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

Gradient image (path or Canvas)

##### options?

###### maximumHeight?

`number`

###### minimumHeight?

`number`

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.ElevationRamp('ramp.png');
```

***

### EmissionMap()

> `static` **EmissionMap**(`options`): `Material`

Create emissive map material

#### Parameters

##### options

Configuration options

###### channels?

`string`

Channel (default "rgb")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.EmissionMap({
 image: 'emission.jpg'
});
```

***

### Fade()

> `static` **Fade**(`options`): `Material`

Create gradient/fade material

#### Parameters

##### options

Configuration options

###### fadeDirection?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Gradient direction

###### fadeInColor

[`DColor`](../types/DColor.md)

Fade-in color (near color)

###### fadeOutColor

[`DColor`](../types/DColor.md)

Fade-out color (far color)

###### maximumDistance

`number`

Maximum distance

###### repeat?

`boolean`

Whether to repeat

###### time?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Time control (for dynamic effects, optional)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Fade({
 fadeInColor: 'red',
 fadeOutColor: 'transparent',
 maximumDistance: 10000,
 repeat: true
});
```

***

### Grid()

> `static` **Grid**(`options`): `Material`

Create grid material

#### Parameters

##### options

Configuration options

###### cellAlpha?

`number`

Cell transparency (default 0.1)

###### color?

[`DColor`](../types/DColor.md)

Color (default white)

###### lineCount?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Line count (default 8x8)

###### lineOffset?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Line offset

###### lineThickness?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Line thickness (default 1.0)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Grid({
 color: 'yellow',
 cellAlpha: 0.2,
 lineCount: { x: 10, y: 10 }
});
```

***

### Image()

> `static` **Image**(`options`): `Material`

Create image material

#### Parameters

##### options

Configuration options

###### color?

[`DColor`](../types/DColor.md)

Blend color (default white)

###### image

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

Image path, Image object or Canvas object

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count (default 1.0, 1.0)

#### Returns

`Material`

Daisy material descriptor

#### Example

```ts
const mat = Material.Image({
 image: 'path/to/image.png',
 repeat: { x: 2, y: 2 }
});
```

***

### NeonScan()

> `static` **NeonScan**(`options`): `Material`

Create neon scan material

#### Parameters

##### options

Configuration options

###### bandWidth?

`number`

Band width

###### baseColor?

`string` \| `Color`

Base color

###### glowSize?

`number`

Glow size

###### neonColor?

`string` \| `Color`

Neon color

###### opacity?

`number`

Opacity

###### speed?

`number`

Speed

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.NeonScan({
 baseColor: 'purple',
 neonColor: 'cyan',
 speed: 1.5
});
```

***

### NormalMap()

> `static` **NormalMap**(`options`): `Material`

Create normal map material

#### Parameters

##### options

Configuration options

###### channels?

`string`

Channel (default "rgb")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

###### strength?

`number`

Intensity (default 0.5)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.NormalMap({
 image: 'normal.jpg',
 strength: 0.8
});
```

***

### PolylineArrow()

> `static` **PolylineArrow**(`options`): `Material`

Create arrow line material

#### Parameters

##### options

[`DColor`](../types/DColor.md) \| \{ `arrowSize?`: `number`; `color?`: DColor \| undefined; `direction?`: `"forward"` \| `"backward"` \| `"both"`; `speed?`: `number`; \}

Configuration options

[`DColor`](../types/DColor.md)

***

###### Type Literal

\{ `arrowSize?`: `number`; `color?`: DColor \| undefined; `direction?`: `"forward"` \| `"backward"` \| `"both"`; `speed?`: `number`; \}

Configuration options

###### arrowSize?

`number`

Arrow size

###### color?

DColor \| undefined

Color

###### direction?

`"forward"` \| `"backward"` \| `"both"`

Arrow direction ('forward' | 'backward' | 'both')

###### speed?

`number`

Flow speed (greater than 0 enables flowing light effect)

#### Returns

`Material`

Material instance.

#### Example

```ts
// 静态箭头
const mat = Material.PolylineArrow({
 color: 'yellow',
 arrowSize: 20
});

// 动态流光箭头
const mat2 = Material.PolylineArrow({
 color: 'cyan',
 speed: 2.0,
 direction: 'forward'
});
```

***

### PolylineArrowPath()

> `static` **PolylineArrowPath**(`options`): `Material`

Create arrow path material (repeating arrows flowing along the line)
Suitable for path planning, route navigation, etc.

#### Parameters

##### options

Configuration options

###### arrowSize?

`number`

Arrow size (percentage relative to spacing)

###### color?

[`DColor`](../types/DColor.md)

Arrow color

###### direction?

`"forward"` \| `"backward"`

Flow direction

###### glowColor?

[`DColor`](../types/DColor.md)

Arrow inner flowing light color (optional)

###### spacing?

`number`

Arrow spacing

###### speed?

`number`

Flow speed

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.PolylineArrowPath({
 color: 'orange',
 speed: 3.0,
 spacing: 0.2
});
```

***

### PolylineDash()

> `static` **PolylineDash**(`options`): `Material`

Create dashed line material

#### Parameters

##### options

Configuration options

###### color?

[`DColor`](../types/DColor.md)

Dash color

###### dashLength?

`number`

Dash length

###### dashPattern?

`number`

Dash style (bitmask)

###### flowColor?

[`DColor`](../types/DColor.md)

Flow color (only effective in dynamic mode)

###### gapColor?

[`DColor`](../types/DColor.md)

Interval color

###### speed?

`number`

Flow speed (greater than 0 enables flowing effect)

#### Returns

`Material`

Material instance.

#### Example

```ts
// 静态虚线
const mat = Material.PolylineDash({
 color: 'blue',
 gapColor: 'transparent',
 dashLength: 20
});

// 动态流动虚线
const mat2 = Material.PolylineDash({
 color: 'yellow',
 speed: 5.0,
 flowColor: 'red'
});
```

***

### PolylineFlow()

> `static` **PolylineFlow**(`options`): `Material`

Create texture flowing line material (custom)
Suitable for pipelines, road light flows, etc., using images as textures for flow

#### Parameters

##### options

Configuration options

###### color?

`string` \| `Color`

Blend color

###### image

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count (optional)

###### speed?

`number`

Flow speed

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.PolylineFlow({
 image: 'arrow.png',
 color: 'yellow',
 speed: 1.5
});
```

***

### PolylineGlow()

> `static` **PolylineGlow**(`options`): `Material`

Create glow line material

#### Parameters

##### options

Configuration options

###### color?

[`DColor`](../types/DColor.md)

Color

###### glowPower?

`number`

Glow intensity

###### taperPower?

`number`

Taper

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.PolylineGlow({
 color: 'gold',
 glowPower: 0.2,
 taperPower: 0.5
});
```

***

### PolylineOutline()

> `static` **PolylineOutline**(`options`): `Material`

Create outline line material

#### Parameters

##### options

Configuration options

###### color?

[`DColor`](../types/DColor.md)

Inner color

###### outlineColor?

[`DColor`](../types/DColor.md)

Outline color

###### outlineWidth?

`number`

Outline width

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.PolylineOutline({
 color: 'orange',
 outlineColor: 'white',
 outlineWidth: 2
});
```

***

### PolylineTrail()

> `static` **PolylineTrail**(`options`): `Material`

Create flowing trail line material (custom)
Simulates the effect of light flowing along the line

#### Parameters

##### options

Configuration options

###### color?

`string` \| `Color`

Base color (background color)

###### speed?

`number`

Flow speed

###### trailColor?

`string` \| `Color`

Trail color (highlight color)

###### trailLength?

`number`

Trail length (corresponds to glowSize 0-1)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.PolylineTrail({
 color: 'blue',
 trailColor: 'cyan',
 speed: 2.0,
 trailLength: 0.4
});
```

***

### RadialPulse()

> `static` **RadialPulse**(`options`): `Material`

Create radial pulse material

#### Parameters

##### options

Configuration options

###### center?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Center point (0.0 - 1.0)

###### color?

`string` \| `Color`

Base color

###### opacity?

`number`

Opacity

###### pulseColor?

`string` \| `Color`

Pulse color

###### ringWidth?

`number`

Ring width

###### speed?

`number`

Speed

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.RadialPulse({
 color: 'cyan',
 pulseColor: 'white',
 speed: 2.0
});
```

***

### Registered()

> `static` **Registered**(`type`, `uniforms?`, `translucent?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Create Daisy material descriptor for a registered material type.

Applicable to custom Shaders registered via `shaderManager.registerShader()`.

#### Parameters

##### type

`string`

Registered global material type identifier.

##### uniforms?

`Uniforms` = `{}`

Uniform parameters that override registered defaults.

##### translucent?

`boolean` = `true`

Whether to treat as a translucent material. Default `true`.

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### RimLighting()

> `static` **RimLighting**(`options`): `Material`

Create rim light material

#### Parameters

##### options

Configuration options

###### color?

[`DColor`](../types/DColor.md)

Base color

###### rimColor?

[`DColor`](../types/DColor.md)

Edge color

###### width?

`number`

Edge width (0.0 - 1.0)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.RimLighting({
 color: 'red',
 rimColor: 'yellow',
 width: 0.3
});
```

***

### RingSweep()

> `static` **RingSweep**(`options`): `Material`

Create ring scan material

#### Parameters

##### options

Configuration options

###### color?

`string` \| `Color`

Base color

###### opacity?

`number`

Opacity

###### speed?

`number`

Speed

###### sweepColor?

`string` \| `Color`

Scan color

###### width?

`number`

Scan width

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.RingSweep({
 color: 'blue',
 sweepColor: 'orange',
 speed: 1.0
});
```

***

### SlopeRamp()

> `static` **SlopeRamp**(`image`): `Material`

Create slope gradient material

#### Parameters

##### image

`string` \| `HTMLCanvasElement`

Gradient image (path or Canvas)

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.SlopeRamp('ramp.png');
```

***

### Solid()

> `static` **Solid**(`options?`): [`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

Create solid entity material.

Suitable for Box/Cube/Cylinder/Ellipsoid solid geometries, and Polygon/Ellipse/Rectangle surface features.
This is Daisy's stable wrapper entry point; the caller does not need to touch internal rendering materials.

#### Parameters

##### options?

[`DColor`](../types/DColor.md) \| [`SolidMaterialOptions`](../types/SolidMaterialOptions.md)

#### Returns

[`DaisyMaterialDescriptor`](../types/DaisyMaterialDescriptor.md)

***

### SpecularMap()

> `static` **SpecularMap**(`options`): `Material`

Create specular map material

#### Parameters

##### options

Configuration options

###### channel?

`string`

Channel (default: "a")

###### image

`string`

Image path

###### repeat?

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.SpecularMap({
 image: 'specular.jpg'
});
```

***

### SpiralFlow()

> `static` **SpiralFlow**(`options`): `Material`

Create spiral flow material (native material)
Static creation, not time-driven

#### Parameters

##### options

Configuration options

###### color?

`string` \| `Color`

Base color

###### count?

`number`

Spiral count

###### direction?

`"forward"` \| `"backward"`

###### opacity?

`number`

Opacity

###### speed?

`number`

Speed

###### spiralColor?

`string` \| `Color`

Spiral color

###### thickness?

`number`

Thickness

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.SpiralFlow({
 color: 'blue',
 spiralColor: 'yellow',
 speed: 2.0,
 count: 8
});
```

***

### Stripe()

> `static` **Stripe**(`options`): `Material`

Create stripe material

#### Parameters

##### options

Configuration options

###### evenColor?

[`DColor`](../types/DColor.md)

Even stripe color

###### oddColor?

[`DColor`](../types/DColor.md)

Odd stripe color

###### offset?

`number`

Offset

###### orientation?

`StripeOrientation`

Direction (horizontal/vertical)

###### repeat?

`number`

Repeat count

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Stripe({
 evenColor: 'white',
 oddColor: 'black',
 repeat: 10
});
```

***

### Water()

> `static` **Water**(`options?`): `Material`

Create water surface material

#### Parameters

##### options?

Configuration options

###### amplitude?

`number`

Wave amplitude

###### animationSpeed?

`number`

Animation speed

###### baseWaterColor?

[`DColor`](../types/DColor.md)

Base water color

###### blendColor?

[`DColor`](../types/DColor.md)

Blend color

###### frequency?

`number`

Wave frequency

###### normalMap?

`string`

Normal map

###### specularIntensity?

`number`

Specular intensity

###### specularMap?

`string`

Specular map

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.Water({
 baseWaterColor: '#004080',
 blendColor: '#0080b0',
 frequency: 800,
 animationSpeed: 0.02
});
```

***

### WaterMask()

> `static` **WaterMask**(`options`): `Material`

Create water body mask material

#### Parameters

##### options

Configuration options

###### landColor?

`string` \| `Color`

Land color

###### waterColor?

`string` \| `Color`

Water color

#### Returns

`Material`

Material instance.

#### Example

```ts
const mat = Material.WaterMask({
 waterColor: 'blue',
 landColor: 'green'
});
```
