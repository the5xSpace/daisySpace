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

Whether the model can be picked with `Scene#pick`.

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

The relative base path for URLs in the glTF JSON.

#### Default

```ts
''
```

***

### clampAnimations?

> `optional` **clampAnimations?**: `boolean`

Whether to keep the model's animation pose on frames without keyframes.

#### Default

```ts
true
```

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

The color used to blend with the model's rendered color.

***

### colorBlendAmount?

> `optional` **colorBlendAmount?**: `number`

Value used to determine blend strength when `colorBlendMode` is `MIX`.

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

Whether to use frustum or horizon culling for the model. If the model is part of a 3D tileset, this property is always `false` because the 3D tiles culling system is used instead.

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

Whether to show the bounding spheres for each draw command in the model, for debugging only.

#### Default

```ts
false
```

***

### debugWireframe?

> `optional` **debugWireframe?**: `boolean`

Whether to draw the model in wireframe mode, for debugging only.

#### Default

```ts
false
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Specifies the distance condition under which the model is shown relative to the camera.

***

### ~~distanceFallbackPoint?~~

> `optional` **distanceFallbackPoint?**: `boolean` \| [`ModelDistanceFallbackPointOptions`](../types/ModelDistanceFallbackPointOptions.md)

Fallback point for distant viewing.

Deprecated: responsibility for the fallback point has been moved down to `modelDistanceFallbackPoint` at the `BaseObject` layer. `ModelFeature` no longer handles automatic switching to a fallback point beyond the viewing distance.

#### Deprecated

***

### enableDebugWireframe?

> `optional` **enableDebugWireframe?**: `boolean`

Whether wireframe mode is enabled, for debugging only. Set this to `true` for WebGL1.

#### Default

```ts
false
```

***

### enablePick?

> `optional` **enablePick?**: `boolean`

Whether CPU picking is allowed when WebGL 2 or newer is not available.

#### Default

```ts
false
```

***

### enableShowOutline?

> `optional` **enableShowOutline?**: `boolean`

Whether to enable outlines for models using the `CESIUM_primitive_outline` extension.

#### Default

```ts
true
```

***

### enableVerticalExaggeration?

> `optional` **enableVerticalExaggeration?**: `boolean`

Whether to exaggerate the model along the ellipsoid normal when `Scene.verticalExaggeration` is set to a value other than `1.0`.

#### Default

```ts
true
```

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

Function invoked with the loaded glTF object after loading completes.

***

### id?

> `optional` **id?**: `string`

User-defined object returned by `Scene#pick`.

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the owning entity's bounding sphere aggregation.

Useful for features that should be included in camera `zoom` / `flyTo` framing. Helper lines and temporary effects can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### incrementallyLoadTextures?

> `optional` **incrementallyLoadTextures?**: `boolean`

Whether to continue streaming textures after the model is loaded.

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

Lighting color used when shading the model; if undefined, the scene lighting color is used.

***

### maximumScale?

> `optional` **maximumScale?**: `number`

Maximum scale for the model, which also caps `minimumPixelSize`.

***

### minimumPixelSize?

> `optional` **minimumPixelSize?**: `number`

Minimum pixel size for the model to keep it visible at long distance.

#### Default

```ts
0.0
```

***

### modelMatrix?

> `optional` **modelMatrix?**: `Matrix4`

4x4 transformation matrix used to convert the model from model coordinates to world coordinates.

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

Draw pass for the model's opaque parts.

#### Default

```ts
Pass.OPAQUE
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Color used when rendering outlines.

#### Default

```ts
AutoColor.BLACK
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pointCloudShading?

> `optional` **pointCloudShading?**: `any`

`PointCloudShading` options used to control point attenuation and lighting.

***

### projectTo2D?

> `optional` **projectTo2D?**: `boolean`

Whether to project the model position accurately to 2D.

#### Default

```ts
false
```

***

### releaseGltfJson?

> `optional` **releaseGltfJson?**: `boolean`

Whether to release the glTF JSON after loading.

#### Default

```ts
false
```

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value. Smaller values are rendered earlier.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

Uniform scale factor for the model.

#### Default

```ts
1.0
```

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

Whether the model casts or receives shadows.

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

Whether to display outlines for models using the `CESIUM_primitive_outline` extension.

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

Split direction applied to the model.

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

URL of the model, supporting `.gltf` and `.glb` formats.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
