[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyHeatmapMaterial

# Class: DaisyHeatmapMaterial

Radial thermal distribution material.

## Extends

- `Material`

## Constructors

### Constructor

> **new DaisyHeatmapMaterial**(`options?`): `DaisyHeatmapMaterial`

#### Parameters

##### options?

[`DaisyHeatmapOptions`](../types/DaisyHeatmapOptions.md) = `{}`

#### Returns

`DaisyHeatmapMaterial`

#### Overrides

`Daisy.Material.constructor`

## Properties

### materials

> **materials**: `any`

Maps sub-material names to Material objects.

#### Inherited from

`Daisy.Material.materials`

***

### shaderSource

> **shaderSource**: `string`

The glsl shader source for this material.

#### Inherited from

`Daisy.Material.shaderSource`

***

### translucent

> **translucent**: `boolean` \| ((...`params`) => `any`)

When `true` or a function that returns `true`,
the geometry is expected to appear translucent.

#### Inherited from

`Daisy.Material.translucent`

***

### type

> **type**: `string`

The material type. Can be an existing type or a new type. If no type is specified in fabric, type is a GUID.

#### Inherited from

`Daisy.Material.type`

***

### uniforms

> **uniforms**: `any`

Maps uniform names to their values.

#### Inherited from

`Daisy.Material.uniforms`

***

### AlphaMapType

> `readonly` `static` **AlphaMapType**: `string`

Gets the name of the alpha map material.

#### Inherited from

`Daisy.Material.AlphaMapType`

***

### AspectRampMaterialType

> `readonly` `static` **AspectRampMaterialType**: `string`

Gets the name of the aspect ramp material.

#### Inherited from

`Daisy.Material.AspectRampMaterialType`

***

### BumpMapType

> `readonly` `static` **BumpMapType**: `string`

Gets the name of the bump map material.

#### Inherited from

`Daisy.Material.BumpMapType`

***

### CheckerboardType

> `readonly` `static` **CheckerboardType**: `string`

Gets the name of the checkerboard material.

#### Inherited from

`Daisy.Material.CheckerboardType`

***

### ColorType

> `readonly` `static` **ColorType**: `string`

Gets the name of the color material.

#### Inherited from

`Daisy.Material.ColorType`

***

### DefaultCubeMapId

> `static` **DefaultCubeMapId**: `string`

Gets or sets the default cube map texture uniform value.

#### Inherited from

`Daisy.Material.DefaultCubeMapId`

***

### DefaultImageId

> `static` **DefaultImageId**: `string`

Gets or sets the default texture uniform value.

#### Inherited from

`Daisy.Material.DefaultImageId`

***

### DiffuseMapType

> `readonly` `static` **DiffuseMapType**: `string`

Gets the name of the diffuce map material.

#### Inherited from

`Daisy.Material.DiffuseMapType`

***

### DotType

> `readonly` `static` **DotType**: `string`

Gets the name of the dot material.

#### Inherited from

`Daisy.Material.DotType`

***

### ElevationBandType

> `readonly` `static` **ElevationBandType**: `string`

Gets the name of the elevation band material.

#### Inherited from

`Daisy.Material.ElevationBandType`

***

### ElevationContourType

> `readonly` `static` **ElevationContourType**: `string`

Gets the name of the elevation contour material.

#### Inherited from

`Daisy.Material.ElevationContourType`

***

### ElevationRampType

> `readonly` `static` **ElevationRampType**: `string`

Gets the name of the elevation contour material.

#### Inherited from

`Daisy.Material.ElevationRampType`

***

### EmissionMapType

> `readonly` `static` **EmissionMapType**: `string`

Gets the name of the emmision map material.

#### Inherited from

`Daisy.Material.EmissionMapType`

***

### FadeType

> `readonly` `static` **FadeType**: `string`

Gets the name of the fade material.

#### Inherited from

`Daisy.Material.FadeType`

***

### GridType

> `readonly` `static` **GridType**: `string`

Gets the name of the grid material.

#### Inherited from

`Daisy.Material.GridType`

***

### ImageType

> `readonly` `static` **ImageType**: `string`

Gets the name of the image material.

#### Inherited from

`Daisy.Material.ImageType`

***

### NormalMapType

> `readonly` `static` **NormalMapType**: `string`

Gets the name of the normal map material.

#### Inherited from

`Daisy.Material.NormalMapType`

***

### PolylineArrowType

> `readonly` `static` **PolylineArrowType**: `string`

Gets the name of the polyline arrow material.

#### Inherited from

`Daisy.Material.PolylineArrowType`

***

### PolylineDashType

> `readonly` `static` **PolylineDashType**: `string`

Gets the name of the polyline glow material.

#### Inherited from

`Daisy.Material.PolylineDashType`

***

### PolylineGlowType

> `readonly` `static` **PolylineGlowType**: `string`

Gets the name of the polyline glow material.

#### Inherited from

`Daisy.Material.PolylineGlowType`

***

### PolylineOutlineType

> `readonly` `static` **PolylineOutlineType**: `string`

Gets the name of the polyline outline material.

#### Inherited from

`Daisy.Material.PolylineOutlineType`

***

### RimLightingType

> `readonly` `static` **RimLightingType**: `string`

Gets the name of the rim lighting material.

#### Inherited from

`Daisy.Material.RimLightingType`

***

### SlopeRampMaterialType

> `readonly` `static` **SlopeRampMaterialType**: `string`

Gets the name of the slope ramp material.

#### Inherited from

`Daisy.Material.SlopeRampMaterialType`

***

### SpecularMapType

> `readonly` `static` **SpecularMapType**: `string`

Gets the name of the specular map material.

#### Inherited from

`Daisy.Material.SpecularMapType`

***

### StripeType

> `readonly` `static` **StripeType**: `string`

Gets the name of the stripe material.

#### Inherited from

`Daisy.Material.StripeType`

***

### type

> `readonly` `static` **type**: `"DaisyHeatmap"` = `MATERIAL_TYPE_DAISY_HEATMAP`

***

### WaterMaskType

> `readonly` `static` **WaterMaskType**: `string`

Gets the name of the water mask material.

#### Inherited from

`Daisy.Material.WaterMaskType`

***

### WaterType

> `readonly` `static` **WaterType**: `string`

Gets the name of the water material.

#### Inherited from

`Daisy.Material.WaterType`

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

#### Inherited from

`Daisy.Material.destroy`

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.



If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.

#### Returns

`boolean`

True if this object was destroyed; otherwise, false.

#### Inherited from

`Daisy.Material.isDestroyed`

***

### isTranslucent()

> **isTranslucent**(): `boolean`

Gets whether or not this material is translucent.

#### Returns

`boolean`

`true` if this material is translucent, `false` otherwise.

#### Inherited from

`Daisy.Material.isTranslucent`

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

#### Inherited from

`Daisy.Material.fromType`

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

#### Inherited from

`Daisy.Material.fromTypeAsync`
