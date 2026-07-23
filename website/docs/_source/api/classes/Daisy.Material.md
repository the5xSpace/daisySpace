[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Material

# Class: Material

A Material defines surface appearance through a combination of diffuse, specular,
normal, emission, and alpha components. These values are specified using a
JSON schema called Fabric which gets parsed and assembled into glsl shader code
behind-the-scenes. Check out the [page](https://github.com/GS/cesium/wiki/Fabric|wiki)
for more details on Fabric.





Base material types and their uniforms:


- Color
 
- `color`: rgba color object.
 
- Image
 
- `image`: path to image.
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
 
- DiffuseMap
 
- `image`: path to image.
- `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels.
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
 
- AlphaMap
 
- `image`: path to image.
- `channel`: One character string containing r, g, b, or a for selecting the desired image channel. 
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
 
- SpecularMap
 
- `image`: path to image.
- `channel`: One character string containing r, g, b, or a for selecting the desired image channel. 
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
 
- EmissionMap
 
- `image`: path to image.
- `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels. 
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
 
- BumpMap
 
- `image`: path to image.
- `channel`: One character string containing r, g, b, or a for selecting the desired image channel. 
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
- `strength`: Bump strength value between 0.0 and 1.0 where 0.0 is small bumps and 1.0 is large bumps.
 
- NormalMap
 
- `image`: path to image.
- `channels`: Three character string containing any combination of r, g, b, and a for selecting the desired image channels. 
- `repeat`: Object with x and y values specifying the number of times to repeat the image.
- `strength`: Bump strength value between 0.0 and 1.0 where 0.0 is small bumps and 1.0 is large bumps.
 
- Grid
 
- `color`: rgba color object for the whole material.
- `cellAlpha`: Alpha value for the cells between grid lines. This will be combined with color.alpha.
- `lineCount`: Object with x and y values specifying the number of columns and rows respectively.
- `lineThickness`: Object with x and y values specifying the thickness of grid lines (in pixels where available).
- `lineOffset`: Object with x and y values specifying the offset of grid lines (range is 0 to 1).
 
- Stripe
 
- `horizontal`: Boolean that determines if the stripes are horizontal or vertical.
- `evenColor`: rgba color object for the stripe's first color.
- `oddColor`: rgba color object for the stripe's second color.
- `offset`: Number that controls at which point into the pattern to begin drawing; with 0.0 being the beginning of the even color, 1.0 the beginning of the odd color, 2.0 being the even color again, and any multiple or fractional values being in between.
- `repeat`: Number that controls the total number of stripes, half light and half dark.
 
- Checkerboard
 
- `lightColor`: rgba color object for the checkerboard's light alternating color.
- `darkColor`: rgba color object for the checkerboard's dark alternating color.
- `repeat`: Object with x and y values specifying the number of columns and rows respectively.
 
- Dot
 
- `lightColor`: rgba color object for the dot color.
- `darkColor`: rgba color object for the background color.
- `repeat`: Object with x and y values specifying the number of columns and rows of dots respectively.
 
- Water
 
- `baseWaterColor`: rgba color object base color of the water.
- `blendColor`: rgba color object used when blending from water to non-water areas.
- `specularMap`: Single channel texture used to indicate areas of water.
- `normalMap`: Normal map for water normal perturbation.
- `frequency`: Number that controls the number of waves.
- `animationSpeed`: Number that controls the animations speed of the water.
- `amplitude`: Number that controls the amplitude of water waves.
- `specularIntensity`: Number that controls the intensity of specular reflections.
 
- RimLighting
 
- `color`: diffuse color and alpha.
- `rimColor`: diffuse color and alpha of the rim.
- `width`: Number that determines the rim's width.
 
- Fade
 
- `fadeInColor`: diffuse color and alpha at `time`
- `fadeOutColor`: diffuse color and alpha at `maximumDistance` from `time`
- `maximumDistance`: Number between 0.0 and 1.0 where the `fadeInColor` becomes the `fadeOutColor`. A value of 0.0 gives the entire material a color of `fadeOutColor` and a value of 1.0 gives the the entire material a color of `fadeInColor`
- `repeat`: true if the fade should wrap around the texture coodinates.
- `fadeDirection`: Object with x and y values specifying if the fade should be in the x and y directions.
- `time`: Object with x and y values between 0.0 and 1.0 of the `fadeInColor` position
 
- PolylineArrow
 
- `color`: diffuse color and alpha.
 
- PolylineDash
 
- `color`: color for the line.
- `gapColor`: color for the gaps in the line.
- `dashLength`: Dash length in pixels.
- `dashPattern`: The 16 bit stipple pattern for the line..
 
- PolylineGlow
 
- `color`: color and maximum alpha for the glow on the line.
- `glowPower`: strength of the glow, as a percentage of the total line width (less than 1.0).
- `taperPower`: strength of the tapering effect, as a percentage of the total line length. If 1.0 or higher, no taper effect is used.
 
- PolylineOutline
 
- `color`: diffuse color and alpha for the interior of the line.
- `outlineColor`: diffuse color and alpha for the outline.
- `outlineWidth`: width of the outline in pixels.
 
- ElevationContour
 
- `color`: color and alpha for the contour line.
- `spacing`: spacing for contour lines in meters.
- `width`: Number specifying the width of the grid lines in pixels.
 
- ElevationRamp
 
- `image`: color ramp image to use for coloring the terrain.
- `minimumHeight`: minimum height for the ramp.
- `maximumHeight`: maximum height for the ramp.
 
- SlopeRamp
 
- `image`: color ramp image to use for coloring the terrain by slope.
 
- AspectRamp
 
- `image`: color ramp image to use for color the terrain by aspect.
 
- ElevationBand
 
- `heights`: image of heights sorted from lowest to highest.
- `colors`: image of colors at the corresponding heights.

- WaterMask

- `waterColor`: diffuse color and alpha for the areas covered by water.
- `landColor`: diffuse color and alpha for the areas covered by land.





## Example

```ts
// Create a color material with fromType:
polygon.material = Daisy.Material.fromType('Color');
polygon.material.uniforms.color = new Daisy.Color(1.0, 1.0, 0.0, 1.0);

// Create the default material:
polygon.material = new Daisy.Material();

// Create a color material with full Fabric notation:
polygon.material = new Daisy.Material({
 fabric: {
 type: 'Color',
 uniforms: {
 color: new Daisy.Color(1.0, 1.0, 0.0, 1.0)
 }
 }
});
```

## Param

**options**

Object with the following properties:

## Param

**options.strict**

Throws errors for issues that would normally be ignored, including unused uniforms or materials.

## Param

**options.translucent**

When `true` or a function that returns `true`, the geometry
 with this material is expected to appear translucent.

## Param

**options.minificationFilter**

The TextureMinificationFilter to apply to this material's textures.

## Param

**options.magnificationFilter**

The TextureMagnificationFilter to apply to this material's textures.

## Param

**options.fabric**

The fabric JSON used to generate the material.

## Constructors

### Constructor

> **new Material**(`options?`): `Material`

#### Parameters

##### options?

###### fabric

`any`

###### magnificationFilter?

`TextureMagnificationFilter`

###### minificationFilter?

`TextureMinificationFilter`

###### strict?

`boolean`

###### translucent?

`boolean` \| ((...`params`) => `any`)

#### Returns

`Material`

## Properties

### materials

> **materials**: `any`

Maps sub-material names to Material objects.

***

### shaderSource

> **shaderSource**: `string`

The glsl shader source for this material.

***

### translucent

> **translucent**: `boolean` \| ((...`params`) => `any`)

When `true` or a function that returns `true`,
the geometry is expected to appear translucent.

***

### type

> **type**: `string`

The material type. Can be an existing type or a new type. If no type is specified in fabric, type is a GUID.

***

### uniforms

> **uniforms**: `any`

Maps uniform names to their values.

***

### AlphaMapType

> `readonly` `static` **AlphaMapType**: `string`

Gets the name of the alpha map material.

***

### AspectRampMaterialType

> `readonly` `static` **AspectRampMaterialType**: `string`

Gets the name of the aspect ramp material.

***

### BumpMapType

> `readonly` `static` **BumpMapType**: `string`

Gets the name of the bump map material.

***

### CheckerboardType

> `readonly` `static` **CheckerboardType**: `string`

Gets the name of the checkerboard material.

***

### ColorType

> `readonly` `static` **ColorType**: `string`

Gets the name of the color material.

***

### DefaultCubeMapId

> `static` **DefaultCubeMapId**: `string`

Gets or sets the default cube map texture uniform value.

***

### DefaultImageId

> `static` **DefaultImageId**: `string`

Gets or sets the default texture uniform value.

***

### DiffuseMapType

> `readonly` `static` **DiffuseMapType**: `string`

Gets the name of the diffuce map material.

***

### DotType

> `readonly` `static` **DotType**: `string`

Gets the name of the dot material.

***

### ElevationBandType

> `readonly` `static` **ElevationBandType**: `string`

Gets the name of the elevation band material.

***

### ElevationContourType

> `readonly` `static` **ElevationContourType**: `string`

Gets the name of the elevation contour material.

***

### ElevationRampType

> `readonly` `static` **ElevationRampType**: `string`

Gets the name of the elevation contour material.

***

### EmissionMapType

> `readonly` `static` **EmissionMapType**: `string`

Gets the name of the emmision map material.

***

### FadeType

> `readonly` `static` **FadeType**: `string`

Gets the name of the fade material.

***

### GridType

> `readonly` `static` **GridType**: `string`

Gets the name of the grid material.

***

### ImageType

> `readonly` `static` **ImageType**: `string`

Gets the name of the image material.

***

### NormalMapType

> `readonly` `static` **NormalMapType**: `string`

Gets the name of the normal map material.

***

### PolylineArrowType

> `readonly` `static` **PolylineArrowType**: `string`

Gets the name of the polyline arrow material.

***

### PolylineDashType

> `readonly` `static` **PolylineDashType**: `string`

Gets the name of the polyline glow material.

***

### PolylineGlowType

> `readonly` `static` **PolylineGlowType**: `string`

Gets the name of the polyline glow material.

***

### PolylineOutlineType

> `readonly` `static` **PolylineOutlineType**: `string`

Gets the name of the polyline outline material.

***

### RimLightingType

> `readonly` `static` **RimLightingType**: `string`

Gets the name of the rim lighting material.

***

### SlopeRampMaterialType

> `readonly` `static` **SlopeRampMaterialType**: `string`

Gets the name of the slope ramp material.

***

### SpecularMapType

> `readonly` `static` **SpecularMapType**: `string`

Gets the name of the specular map material.

***

### StripeType

> `readonly` `static` **StripeType**: `string`

Gets the name of the stripe material.

***

### WaterMaskType

> `readonly` `static` **WaterMaskType**: `string`

Gets the name of the water mask material.

***

### WaterType

> `readonly` `static` **WaterType**: `string`

Gets the name of the water material.

## Methods

### destroy()

> **destroy**(): `void`

Destroys the WebGL resources held by this object. Destroying an object allows for deterministic
release of WebGL resources, instead of relying on the garbage collector to destroy this object.



Once an object is destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception. Therefore,
assign the return value (`undefined`) to the object as done in the example.

#### Returns

`void`

#### Example

```ts
material = material && material.destroy();
```

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.



If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.

#### Returns

`boolean`

True if this object was destroyed; otherwise, false.

***

### isTranslucent()

> **isTranslucent**(): `boolean`

Gets whether or not this material is translucent.

#### Returns

`boolean`

`true` if this material is translucent, `false` otherwise.

***

### fromType()

> `static` **fromType**(`type`, `uniforms?`): `Material`

Creates a new material using an existing material type.



Shorthand for: new Material({fabric : {type : type}});

#### Parameters

##### type

`string`

The base material type.

##### uniforms?

`any`

Overrides for the default uniforms.

#### Returns

`Material`

New material object.

#### Example

```ts
const material = Daisy.Material.fromType('Color', {
 color: new Daisy.Color(1.0, 0.0, 0.0, 1.0)
});
```

***

### fromTypeAsync()

> `static` **fromTypeAsync**(`type`, `uniforms?`): `Promise`\<`Material`\>

Creates a new material using an existing material type and returns a promise that resolves when
all of the material's resources have been loaded.

#### Parameters

##### type

`string`

The base material type.

##### uniforms?

`any`

Overrides for the default uniforms.

#### Returns

`Promise`\<`Material`\>

A promise that resolves to a new material object when all resources are loaded.

#### Example

```ts
const material = await Daisy.Material.fromTypeAsync('Image', {
 image: '../Images/_Logo_overlay.png'
});
```
