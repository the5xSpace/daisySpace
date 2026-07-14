[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ShaderPolygonRenderable

# Class: ShaderPolygonRenderable

## Constructors

### Constructor

> **new ShaderPolygonRenderable**(`viewer`, `options?`): `ShaderPolygonRenderable`

#### Parameters

##### viewer

[`Engine`](Engine.md)

##### options?

[`ShaderPolygonRenderableOptions`](../types/ShaderPolygonRenderableOptions.md)

#### Returns

`ShaderPolygonRenderable`

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### getDebugState()

> **getDebugState**(): `any`

#### Returns

`any`

***

### isDestroyed()

> **isDestroyed**(): `boolean`

#### Returns

`boolean`

***

### setCoverageTexture()

> **setCoverageTexture**(`texture`): `void`

#### Parameters

##### texture

\{ `data`: `Uint8Array`; `height`: `number`; `width`: `number`; \} \| `undefined`

#### Returns

`void`

***

### setHeight()

> **setHeight**(`height`): `void`

#### Parameters

##### height

`number`

#### Returns

`void`

***

### setMesh()

> **setMesh**(`mesh`): `void`

#### Parameters

##### mesh

[`ShaderPolygonMeshInput`](../types/ShaderPolygonMeshInput.md) \| `undefined`

#### Returns

`void`

***

### setMeshComplexity()

> **setMeshComplexity**(`options`): `void`

#### Parameters

##### options

###### boundaryDensify?

`boolean`

###### boundaryMaxArcMeters?

`number`

###### boundaryMaxDeltaLatDeg?

`number`

###### boundaryMaxDeltaLonDeg?

`number`

###### boundaryMaxSagittaMeters?

`number`

###### centroidErrorMeters?

`number`

###### inputSimplifyStep?

`number`

###### maxSubdivisionDepth?

`number`

###### midpointErrorMeters?

`number`

###### preferLongestEdgeSplit?

`boolean`

###### skinnyAspectLimit?

`number`

###### subdivisionGranularityMeters?

`number`

###### surfaceErrorMeters?

`number`

#### Returns

`void`

***

### setPositions()

> **setPositions**(`positions`): `void`

#### Parameters

##### positions

`Cartesian3`[]

#### Returns

`void`

***

### setShow()

> **setShow**(`show`): `void`

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### setSurfaceRenderingOptions()

> **setSurfaceRenderingOptions**(`options`): `void`

#### Parameters

##### options

`Partial`\<`Pick`\<[`ShaderPolygonRenderableOptions`](../types/ShaderPolygonRenderableOptions.md), `"disableCulling"` \| `"disableBackFaceCulling"` \| `"depthTestEnabled"` \| `"surfaceConform"` \| `"projectionMode"` \| `"projectionReferenceLongitude"` \| `"surfaceLiftMeters"` \| `"subdivisionGranularityMeters"` \| `"maxSubdivisionDepth"` \| `"inputSimplifyStep"` \| `"surfaceErrorMeters"` \| `"boundaryDensify"` \| `"boundaryMaxArcMeters"` \| `"boundaryMaxSagittaMeters"` \| `"boundaryMaxDeltaLonDeg"` \| `"boundaryMaxDeltaLatDeg"` \| `"skinnyAspectLimit"` \| `"midpointErrorMeters"` \| `"centroidErrorMeters"` \| `"preferLongestEdgeSplit"`\>\>

#### Returns

`void`

***

### setUniforms()

> **setUniforms**(`uniforms`): `void`

#### Parameters

##### uniforms

`Partial`\<`ShaderPolygonUniforms`\>

#### Returns

`void`

***

### update()

> **update**(`frameState`): `void`

#### Parameters

##### frameState

`any`

#### Returns

`void`
