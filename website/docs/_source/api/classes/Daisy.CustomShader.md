[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / CustomShader

# Class: CustomShader

A user defined GLSL shader used with Model as well
as 3DTileset.

If texture uniforms are used, additional resource management must be done:


 <li>
 The `update` function must be called each frame. When a
 custom shader is passed to a Model or a
 3DTileset, this step is handled automaticaly
 </li>
 <li>
 [CustomShader#destroy](#destroy) must be called when the custom shader is
 no longer needed to clean up GPU resources properly. The application
 is responsible for calling this method.
 </li>


See the [Shader Guide](https://github.com/GS/cesium/tree/main/Documentation/CustomShaderGuide|Custom) for more detailed documentation.


## Example

```ts
const customShader = new CustomShader({
 uniforms: {
 u_colorIndex: {
 type: Daisy.UniformType.FLOAT,
 value: 1.0
 },
 u_normalMap: {
 type: Daisy.UniformType.SAMPLER_2D,
 value: new Daisy.TextureUniform({
 url: "http://example.com/normal.png"
 })
 }
 },
 varyings: {
 v_selectedColor: Daisy.VaryingType.VEC3
 },
 vertexShaderText: `
 void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
 v_selectedColor = mix(vsInput.attributes.color_0, vsInput.attributes.color_1, u_colorIndex);
 vsOutput.positionMC += 0.1 * vsInput.attributes.normal;
 }
 `,
 fragmentShaderText: `
 void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
 material.normal = texture(u_normalMap, fsInput.attributes.texCoord_0);
 material.diffuse = v_selectedColor;
 }
 `
});
```

## Param

An object with the following options

## Param

The custom shader mode, which determines how the custom shader code is inserted into the fragment shader.

## Param

The lighting model (e.g. PBR or unlit). If present, this overrides the default lighting for the model.

## Param

The translucency mode, which determines how the custom shader will be applied. If the value is CustomShaderTransulcencyMode.OPAQUE or CustomShaderTransulcencyMode.TRANSLUCENT, the custom shader will override settings from the model's material. If the value is CustomShaderTransulcencyMode.INHERIT, the custom shader will render as either opaque or translucent depending on the primitive's material settings.

## Param

A dictionary for user-defined uniforms. The key is the uniform name that will appear in the GLSL code. The value is an object that describes the uniform type and initial value

## Param

A dictionary for declaring additional GLSL varyings used in the shader. The key is the varying name that will appear in the GLSL code. The value is the data type of the varying. For each varying, the declaration will be added to the top of the shader automatically. The caller is responsible for assigning a value in the vertex shader and using the value in the fragment shader.

## Param

The custom vertex shader as a string of GLSL code. It must include a GLSL function called vertexMain. See the example for the expected signature. If not specified, the custom vertex shader step will be skipped in the computed vertex shader.

## Param

The custom fragment shader as a string of GLSL code. It must include a GLSL function called fragmentMain. See the example for the expected signature. If not specified, the custom fragment shader step will be skipped in the computed fragment shader.

## Constructors

### Constructor

> **new CustomShader**(`options`): `CustomShader`

#### Parameters

##### options

###### fragmentShaderText?

`string`

###### lightingModel?

`LightingModel`

###### mode?

`CustomShaderMode`

###### translucencyMode?

`CustomShaderTranslucencyMode`

###### uniforms?

\{\[`key`: `string`\]: `UniformSpecifier`; \}

###### varyings?

\{\[`key`: `string`\]: `VaryingType`; \}

###### vertexShaderText?

`string`

#### Returns

`CustomShader`

## Properties

### fragmentShaderText

> `readonly` **fragmentShaderText**: `string`

The user-defined GLSL code for the fragment shader

***

### lightingModel

> `readonly` **lightingModel**: `LightingModel`

The lighting model to use when using the custom shader.
This is used by CustomShaderPipelineStage

***

### mode

> `readonly` **mode**: `CustomShaderMode`

A value determining how the custom shader interacts with the overall
fragment shader. This is used by CustomShaderPipelineStage

***

### translucencyMode

> `readonly` **translucencyMode**: `CustomShaderTranslucencyMode`

The translucency mode, which determines how the custom shader will be applied. If the value is
CustomShaderTransulcencyMode.OPAQUE or CustomShaderTransulcencyMode.TRANSLUCENT, the custom shader
will override settings from the model's material. If the value isCustomShaderTransulcencyMode.INHERIT,
the custom shader will render as either opaque or translucent depending on the primitive's material settings.

***

### uniforms

> `readonly` **uniforms**: `object`

Additional uniforms as declared by the user.

#### Index Signature

\[`key`: `string`\]: `UniformSpecifier`

***

### varyings

> `readonly` **varyings**: `object`

Additional varyings as declared by the user.
This is used by CustomShaderPipelineStage

#### Index Signature

\[`key`: `string`\]: `VaryingType`

***

### vertexShaderText

> `readonly` **vertexShaderText**: `string`

The user-defined GLSL code for the vertex shader

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
customShader = customShader && customShader.destroy();
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

### setUniform()

> **setUniform**(`uniformName`, `value`): `void`

Update the value of a uniform declared in the shader

#### Parameters

##### uniformName

`string`

The GLSL name of the uniform. This must match one of the uniforms declared in the constructor

##### value

`string` \| `number` \| `boolean` \| `Resource` \| [`Cartesian2`](Daisy.Cartesian2.md) \| [`Cartesian3`](Daisy.Cartesian3.md) \| [`Matrix4`](Daisy.Matrix4.md) \| [`Cartesian4`](Daisy.Cartesian4.md) \| [`Matrix2`](Daisy.Matrix2.md) \| [`Matrix3`](Daisy.Matrix3.md) \| `TextureUniform`

The new value of the uniform.

#### Returns

`void`
