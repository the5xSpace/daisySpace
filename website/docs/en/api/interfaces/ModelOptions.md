[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelOptions

# Interface: ModelOptions

Configuration options for the 3D model entity component.
 ModelOptions

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### allowPicking?

> `optional` **allowPicking?**: `boolean`

Whether to allow model picking with Scene#pick.

#### Default

```ts
true
```

***

### asynchronous?

> `optional` **asynchronous?**: `boolean`

Whether to create the model's WebGL resources asynchronously.

#### Default

```ts
true
```

***

### backFaceCulling?

> `optional` **backFaceCulling?**: `boolean`

Whether to cull back-face geometry.

#### Default

```ts
true
```

***

### basePath?

> `optional` **basePath?**: `string` \| `Resource`

Relative base path for paths in the glTF JSON.

#### Default

```ts
''
```

***

### clampAnimations?

> `optional` **clampAnimations?**: `boolean`

Whether to preserve the model's animation pose on frames without a keyframe.

#### Default

```ts
true
```

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color to blend with the model's rendered color.

***

### colorBlendAmount?

> `optional` **colorBlendAmount?**: `number`

Value used to determine color intensity when colorBlendMode is MIX.

#### Default

```ts
0.5
```

***

### colorBlendMode?

> `optional` **colorBlendMode?**: `ColorBlendMode`

Defines how the color is blended with the model.

#### Default

```ts
ColorBlendMode.HIGHLIGHT
```

***

### cull?

> `optional` **cull?**: `boolean`

Whether to use frustum/horizon culling for the model. If the model is part of a 3D Tileset, this property is always false because the 3D Tiles culling system is used.

#### Default

```ts
true
```

***

### customShader?

> `optional` **customShader?**: `CustomShader`

Custom shader used to add user-defined GLSL code to the vertex and fragment shaders.

***

### debugShowBoundingVolume?

> `optional` **debugShowBoundingVolume?**: `boolean`

Whether to display the bounding sphere of each draw command in the model (debugging only).

#### Default

```ts
false
```

***

### debugWireframe?

> `optional` **debugWireframe?**: `boolean`

Whether to draw the model in wireframe mode (debugging only).

#### Default

```ts
false
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Conditions specifying the camera distance at which the model is displayed.

***

### ~~distanceFallbackPoint?~~

> `optional` **distanceFallbackPoint?**: `boolean` \| [`ModelDistanceFallbackPointOptions`](../types/ModelDistanceFallbackPointOptions.md)

Far-distance fallback point.

Deprecated: responsibility for the far-distance fallback point has moved to the BaseObject-level `modelDistanceFallbackPoint`.
ModelFeature no longer automatically switches points after the view distance is exceeded.

#### Deprecated

***

### enableDebugWireframe?

> `optional` **enableDebugWireframe?**: `boolean`

Whether to enable wireframe mode (debugging only; must be true for WebGL1).

#### Default

```ts
false
```

***

### enablePick?

> `optional` **enablePick?**: `boolean`

Whether to allow CPU picking when WebGL 2 or later is not available.

#### Default

```ts
false
```

***

### enableShowOutline?

> `optional` **enableShowOutline?**: `boolean`

Whether to enable outlines for models using the CESIUM_primitive_outline extension.

#### Default

```ts
true
```

***

### enableVerticalExaggeration?

> `optional` **enableVerticalExaggeration?**: `boolean`

Whether to exaggerate the model along the ellipsoid normal when Scene.verticalExaggeration is set to a value other than 1.0.

#### Default

```ts
true
```

***

### explosion?

> `optional` **explosion?**: `number` \| `boolean` \| [`ModelExplosionOptions`](../types/ModelExplosionOptions.md)

Initial exploded-view configuration.

- `true`: enables the default exploded view (factor=1).
- `number`: enables it using the value as factor.
- `ModelExplosionOptions`: full configuration.

***

### featureIdLabel?

> `optional` **featureIdLabel?**: `string`

Label for the feature ID set used for picking and styling.

#### Default

```ts
"featureId_0"
```

***

### forwardAxis?

> `optional` **forwardAxis?**: `Axis`

The forward axis of the glTF model.

#### Default

```ts
Axis.Z
```

***

### gltfCallback?

> `optional` **gltfCallback?**: `GltfCallback`

Function called with the loaded glTF object after loading completes.

***

### id?

> `optional` **id?**: `string`

User-defined object returned by Scene#pick.

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding-sphere aggregation of the owning Entity.

Useful for Features that should be included when the camera uses zoom/flyTo. Auxiliary lines and temporary effects can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### incrementallyLoadTextures?

> `optional` **incrementallyLoadTextures?**: `boolean`

Whether to continue streaming textures after the model loads.

#### Default

```ts
true
```

***

### instanceFeatureIdLabel?

> `optional` **instanceFeatureIdLabel?**: `string`

Label for the instance feature ID set used for picking and styling.

#### Default

```ts
"instanceFeatureId_0"
```

***

### lightColor?

> `optional` **lightColor?**: `Cartesian3`

Lighting color used when shading the model; the scene lighting color is used when undefined.

***

### maximumScale?

> `optional` **maximumScale?**: `number`

Maximum scale of the model, and the upper limit for minimumPixelSize.

***

### minimumPixelSize?

> `optional` **minimumPixelSize?**: `number`

Minimum pixel size of the model, ensuring it remains visible at a distance.

#### Default

```ts
0.0
```

***

### modelMatrix?

> `optional` **modelMatrix?**: `Matrix4`

4x4 transformation matrix used to transform the model from model coordinates to world coordinates.

#### Default

```ts
Matrix4.IDENTITY
```

***

### name?

> `optional` **name?**: `string`

Name, which can be used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### opaquePass?

> `optional` **opaquePass?**: `boolean`

Render pass for the model's opaque portions.

#### Default

```ts
Pass.OPAQUE
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Color used when rendering the outline.

#### Default

```ts
AutoColor.BLACK
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay rendering pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pointCloudShading?

> `optional` **pointCloudShading?**: `any`

PointCloudShading object options for controlling point attenuation and lighting.

***

### projectTo2D?

> `optional` **projectTo2D?**: `boolean`

Whether to accurately project the model position to 2D.

#### Default

```ts
false
```

***

### releaseGltfJson?

> `optional` **releaseGltfJson?**: `boolean`

Whether to release the glTF JSON after loading the glTF.

#### Default

```ts
false
```

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Rendering order value; smaller values are rendered first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

Uniform scale of the model.

#### Default

```ts
1.0
```

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

Whether the model casts or receives shadows from light sources.

#### Default

```ts
ShadowMode.ENABLED
```

***

### show?

> `optional` **show?**: `boolean`

Whether to render the model.

#### Default

```ts
true
```

***

### showOutline?

> `optional` **showOutline?**: `boolean`

Whether to display outlines for models using the CESIUM_primitive_outline extension.

#### Default

```ts
true
```

***

### silhouetteColor?

> `optional` **silhouetteColor?**: [`DColor`](../types/DColor.md)

Outline color.

#### Default

```ts
AutoColor.RED
```

***

### silhouetteSize?

> `optional` **silhouetteSize?**: `number`

Outline size in pixels.

#### Default

```ts
0.0
```

***

### splitDirection?

> `optional` **splitDirection?**: `SplitDirection`

Clipping direction applied to the model.

#### Default

```ts
SplitDirection.NONE
```

***

### upAxis?

> `optional` **upAxis?**: `Axis`

The up axis of the glTF model.

#### Default

```ts
Axis.Y
```

***

### url

> **url**: `string` \| `Resource`

URL of the model; .gltf and .glb formats are supported.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
