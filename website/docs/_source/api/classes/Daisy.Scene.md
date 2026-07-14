[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Scene

# Class: Scene

The container for all 3D graphical objects and state in a virtual scene. Generally,
a scene is not created directly; instead, it is implicitly created by [Widget](Daisy.Widget.md).

## Example

```ts
// Create scene without anisotropic texture filtering
const scene = new Daisy.Scene({
 canvas : canvas,
 contextOptions : {
 allowTextureFilterAnisotropic : false
 }
});
```

## Param

Object with the following properties:

## Param

The HTML canvas element to create the scene for.

## Param

Context and WebGL creation properties.

## Param

The HTML element in which the credits will be displayed. If not specified, a credit container will be created and added as a sibling of the canvas.

## Param

The HTML element in which to display the credit popup. If not specified, the viewport will be added as a sibling of the canvas.

## Param

The default ellipsoid. If not specified, the default ellipsoid is used.

## Param

The map projection to use in 2D and Columbus View modes.

## Param

If true and the configuration supports it, use order independent translucency.

## Param

If true, optimizes memory use and performance for 3D mode but disables the ability to use 2D or Columbus View.

## Param

Determines if shadows are cast by light sources.

## Param

Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction.

## Param

If true, rendering a frame will only occur when needed as determined by changes within the scene. Enabling improves performance of the application, but requires using [Scene#requestRender](#requestrender) to render a new frame explicitly in this mode. This will be necessary in many cases after making changes to the scene in other parts of the API. See [Performance with Explicit Rendering](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving).

## Param

If requestRenderMode is true, this value defines the maximum change in simulation time allowed before a render is requested. See [Performance with Explicit Rendering](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving).

## Param

Adjust the DepthPlane to address rendering artefacts below ellipsoid zero elevation.

## Param

If provided, this value controls the rate of multisample antialiasing. Typical multisampling rates are 2, 4, and sometimes 8 samples per pixel. Higher sampling rates of MSAA may impact performance in exchange for improved visual quality. This value only applies to WebGL2 contexts that support multisample render targets. Set to 1 to disable MSAA.

## Constructors

### Constructor

> **new Scene**(`options`): `Scene`

#### Parameters

##### options

###### canvas

`HTMLCanvasElement`

###### contextOptions?

`ContextOptions`

###### creditContainer?

`Element`

###### creditViewport?

`Element`

###### depthPlaneEllipsoidOffset?

`number`

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

###### mapMode2D?

`MapMode2D`

###### mapProjection?

`MapProjection`

###### maximumRenderTimeChange?

`number`

###### msaaSamples?

`number`

###### orderIndependentTranslucency?

`boolean`

###### requestRenderMode?

`boolean`

###### scene3DOnly?

`boolean`

###### shadows?

`boolean`

#### Returns

`Scene`

## Properties

### \_enableEdgeVisibility

> **\_enableEdgeVisibility**: `boolean`

Whether or not to enable edge visibility rendering for 3D tiles.
When enabled, creates a framebuffer with multiple render targets
for advanced edge detection and visibility techniques.

***

### atmosphere

> **atmosphere**: `Atmosphere`

Settings for atmosphere lighting effects affecting 3D Tiles and model rendering. This is not to be confused with
[Scene#skyAtmosphere](#skyatmosphere) which is responsible for rendering the sky.

***

### backgroundColor

> **backgroundColor**: [`Color`](Daisy.Color.md)

The background color, which is only visible if there is no sky box, i.e., [Scene#skyBox](#skybox) is `undefined`.

***

### camera

> `readonly` **camera**: `Camera`

Gets or sets the camera.

***

### cameraUnderground

> `readonly` **cameraUnderground**: `boolean`

Whether or not the camera is underneath the globe.

***

### canvas

> `readonly` **canvas**: `HTMLCanvasElement`

Gets the canvas element to which this scene is bound.

***

### clampToHeightSupported

> `readonly` **clampToHeightSupported**: `boolean`

Returns `true` if the [Scene#clampToHeight](#clamptoheight) and [Scene#clampToHeightMostDetailed](#clamptoheightmostdetailed) functions are supported.

***

### completeMorphOnUserInput

> **completeMorphOnUserInput**: `boolean`

Determines whether or not to instantly complete the
scene transition animation on user input.

***

### debugCommandFilter

> **debugCommandFilter**: ((...`params`) => `any`) \| `undefined`

This property is for debugging only; it is not for production use.

A function that determines what commands are executed. As shown in the examples below,
the function receives the command's `owner` as an argument, and returns a boolean indicating if the
command should be executed.


The default is `undefined`, indicating that all commands are executed.


#### Example

```ts
// Do not execute any commands.
scene.debugCommandFilter = function(command) {
 return false;
};

// Execute only the billboard's commands. That is, only draw the billboard.
const billboards = new Daisy.BillboardCollection();
scene.debugCommandFilter = function(command) {
 return command.owner === billboards;
};
```

***

### debugFrustumStatistics

> `readonly` **debugFrustumStatistics**: `any`

This property is for debugging only; it is not for production use.

When [Scene.debugShowFrustums](#debugshowfrustums) is `true`, this contains
properties with statistics about the number of command execute per frustum.
`totalCommands` is the total number of commands executed, ignoring
overlap. `commandsInFrustums` is an array with the number of times
commands are executed redundantly, e.g., how many commands overlap two or
three frustums.


***

### debugShowCommands

> **debugShowCommands**: `boolean`

This property is for debugging only; it is not for production use.

When `true`, commands are randomly shaded. This is useful
for performance analysis to see what parts of a scene or model are
command-dense and could benefit from batching.


***

### debugShowDepthFrustum

> **debugShowDepthFrustum**: `number`

This property is for debugging only; it is not for production use.

Indicates which frustum will have depth information displayed.


***

### debugShowFramesPerSecond

> **debugShowFramesPerSecond**: `boolean`

This property is for debugging only; it is not for production use.

Displays frames per second and time between frames.


***

### debugShowFrustumPlanes

> **debugShowFrustumPlanes**: `boolean`

This property is for debugging only; it is not for production use.

When `true`, draws outlines to show the boundaries of the camera frustums


***

### debugShowFrustums

> **debugShowFrustums**: `boolean`

This property is for debugging only; it is not for production use.

When `true`, commands are shaded based on the frustums they
overlap. Commands in the closest frustum are tinted red, commands in
the next closest are green, and commands in the farthest frustum are
blue. If a command overlaps more than one frustum, the color components
are combined, e.g., a command overlapping the first two frustums is tinted
yellow.


***

### drawingBufferHeight

> `readonly` **drawingBufferHeight**: `number`

The drawingBufferHeight of the underlying GL context.

***

### drawingBufferWidth

> `readonly` **drawingBufferWidth**: `number`

The drawingBufferWidth of the underlying GL context.

***

### ellipsoid

> `readonly` **ellipsoid**: [`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid. If not specified, the default ellipsoid is used.

***

### eyeSeparation

> **eyeSeparation**: `number`

The eye separation distance in meters for use with cardboard or WebVR.

***

### farToNearRatio

> **farToNearRatio**: `number`

The far-to-near ratio of the multi-frustum when using a normal depth buffer.

This value is used to create the near and far values for each frustum of the multi-frustum. It is only used
when [Scene#logarithmicDepthBuffer](#logarithmicdepthbuffer) is `false`. When `logarithmicDepthBuffer` is
`true`, use [Scene#logarithmicDepthFarToNearRatio](#logarithmicdepthfartonearratio).


***

### focalLength

> **focalLength**: `number`

The focal length for use when with cardboard or WebVR.

***

### fog

> **fog**: `Fog`

Blends the atmosphere to geometry far from the camera for horizon views. Allows for additional
performance improvements by rendering less geometry and dispatching less terrain requests.

Disbaled by default if an ellipsoid other than WGS84 is used.

***

### gamma

> **gamma**: `number`

The value used for gamma correction. This is only used when rendering with high dynamic range.

***

### globe

> **globe**: `Globe`

Gets or sets the depth-test ellipsoid.

***

### groundPrimitives

> `readonly` **groundPrimitives**: `PrimitiveCollection`

Gets the collection of ground primitives.

***

### highDynamicRange

> **highDynamicRange**: `boolean`

Whether or not to use high dynamic range rendering.

***

### highDynamicRangeSupported

> `readonly` **highDynamicRangeSupported**: `boolean`

Whether or not high dynamic range rendering is supported.

***

### id

> `readonly` **id**: `string`

Gets the unique identifier for this scene.

***

### imageryLayers

> `readonly` **imageryLayers**: `ImageryLayerCollection`

Gets the collection of image layers that will be rendered on the globe.

***

### invertClassification

> **invertClassification**: `boolean`

When `false`, 3D Tiles will render normally. When `true`, classified 3D Tile geometry will render normally and
unclassified 3D Tile geometry will render with the color multiplied by [Scene#invertClassificationColor](#invertclassificationcolor).

***

### invertClassificationColor

> **invertClassificationColor**: [`Color`](Daisy.Color.md)

The highlight color of unclassified 3D Tile geometry when [Scene#invertClassification](#invertclassification) is `true`.
When the color's alpha is less than 1.0, the unclassified portions of the 3D Tiles will not blend correctly with the classified positions of the 3D Tiles.
Also, when the color's alpha is less than 1.0, the WEBGL_depth_texture and EXT_frag_depth WebGL extensions must be supported.

***

### invertClassificationSupported

> `readonly` **invertClassificationSupported**: `boolean`

Returns `true` if the [Scene#invertClassification](#invertclassification) is supported.

***

### lastRenderTime

> `readonly` **lastRenderTime**: [`JulianDate`](Daisy.JulianDate.md) \| `undefined`

Gets the simulation time when the scene was last rendered. Returns `undefined`
if the scene has not yet been rendered.

***

### light

> **light**: `Light`

The light source for shading. Defaults to a directional light from the Sun.

***

### logarithmicDepthBuffer

> **logarithmicDepthBuffer**: `boolean`

Whether or not to use a logarithmic depth buffer. Enabling this option will allow for less frustums in the multi-frustum,
increasing performance. This property relies on fragmentDepth being supported.

***

### logarithmicDepthFarToNearRatio

> **logarithmicDepthFarToNearRatio**: `number`

The far-to-near ratio of the multi-frustum when using a logarithmic depth buffer.

This value is used to create the near and far values for each frustum of the multi-frustum. It is only used
when [Scene#logarithmicDepthBuffer](#logarithmicdepthbuffer) is `true`. When `logarithmicDepthBuffer` is
`false`, use [Scene#farToNearRatio](#fartonearratio).


***

### mapMode2D

> `readonly` **mapMode2D**: `MapMode2D`

Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction.

***

### mapProjection

> `readonly` **mapProjection**: `MapProjection`

Get the map projection to use in 2D and Columbus View modes.

***

### maximumAliasedLineWidth

> `readonly` **maximumAliasedLineWidth**: `number`

The maximum aliased line width, in pixels, supported by this WebGL implementation. It will be at least one.

***

### maximumCubeMapSize

> `readonly` **maximumCubeMapSize**: `number`

The maximum length in pixels of one edge of a cube map, supported by this WebGL implementation. It will be at least 16.

***

### maximumRenderTimeChange

> **maximumRenderTimeChange**: `number`

If [Scene#requestRenderMode](#requestrendermode) is `true`, this value defines the maximum change in
simulation time allowed before a render is requested. Lower values increase the number of frames rendered
and higher values decrease the number of frames rendered. If `undefined`, changes to
the simulation time will never request a render.
This value impacts the rate of rendering for changes in the scene like lighting, entity property updates,
and animations.

***

### minimumDisableDepthTestDistance

> **minimumDisableDepthTestDistance**: `number`

The distance from the camera at which to disable the depth test of billboards, labels and points
to, for example, prevent clipping against terrain. When set to zero, the depth test should always
be applied. When less than zero, the depth test should never be applied. Setting the disableDepthTestDistance
property of a billboard, label or point will override this value.

***

### mode

> **mode**: `SceneMode`

Gets or sets the current mode of the scene.

***

### moon

> **moon**: `Moon` \| `undefined`

The Moon

***

### morphComplete

> **morphComplete**: `Event`

The event fired at the completion of a scene transition.

***

### morphStart

> **morphStart**: `Event`

The event fired at the beginning of a scene transition.

***

### morphTime

> **morphTime**: `number`

The current morph transition time between 2D/Columbus View and 3D,
with 0.0 being 2D or Columbus View and 1.0 being 3D.

***

### msaaSamples

> **msaaSamples**: `number`

The sample rate of multisample antialiasing (values greater than 1 enable MSAA).

***

### msaaSupported

> `readonly` **msaaSupported**: `boolean`

Returns `true` if the Scene's context supports MSAA.

***

### nearToFarDistance2D

> **nearToFarDistance2D**: `number`

Determines the uniform depth size in meters of each frustum of the multifrustum in 2D. If a primitive or model close
to the surface shows z-fighting, decreasing this will eliminate the artifact, but decrease performance. On the
other hand, increasing this will increase performance but may cause z-fighting among primitives close to the surface.

***

### orderIndependentTranslucency

> `readonly` **orderIndependentTranslucency**: `boolean`

Gets whether or not the scene has order independent translucency enabled.
Note that this only reflects the original construction option, and there are
other factors that could prevent OIT from functioning on a given system configuration.

***

### pickPositionSupported

> `readonly` **pickPositionSupported**: `boolean`

Returns `true` if the [Scene#pickPosition](#pickposition) function is supported.

***

### pickTranslucentDepth

> **pickTranslucentDepth**: `boolean`

When `true`, enables picking translucent geometry using the depth buffer. Note that [Scene#useDepthPicking](#usedepthpicking) must also be true for enabling this to work.


There is a decrease in performance when enabled. There are extra draw calls to write depth for
translucent geometry.


#### Example

```ts
// picking the position of a translucent primitive
viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
 const pickedFeature = viewer.scene.pick(movement.position);
 if (!Daisy.defined(pickedFeature)) {
 // nothing picked
 return;
 }
 const worldPosition = viewer.scene.pickPosition(movement.position);
}, Daisy.ScreenSpaceEventType.LEFT_CLICK);
```

***

### postProcessStages

> **postProcessStages**: `PostProcessStageCollection`

Post processing effects applied to the final render.

***

### postRender

> `readonly` **postRender**: `Event`

Gets the event that will be raised immediately after the scene is rendered. Subscribers to the event
receive the Scene instance as the first parameter and the current time as the second parameter.

***

### postUpdate

> `readonly` **postUpdate**: `Event`

Gets the event that will be raised immediately after the scene is updated and before the scene is rendered.
Subscribers to the event receive the Scene instance as the first parameter and the current time as the second
parameter.

***

### preRender

> `readonly` **preRender**: `Event`

Gets the event that will be raised after the scene is updated and immediately before the scene is rendered.
Subscribers to the event receive the Scene instance as the first parameter and the current time as the second
parameter.

***

### preUpdate

> `readonly` **preUpdate**: `Event`

Gets the event that will be raised before the scene is updated or rendered. Subscribers to the event
receive the Scene instance as the first parameter and the current time as the second parameter.

***

### primitives

> `readonly` **primitives**: `PrimitiveCollection`

Gets the collection of primitives.

***

### renderError

> `readonly` **renderError**: `Event`

Gets the event that will be raised when an error is thrown inside the `render` function.
The Scene instance and the thrown error are the only two parameters passed to the event handler.
By default, errors are not rethrown after this event is raised, but that can be changed by setting
the `rethrowRenderErrors` property.

***

### requestRenderMode

> **requestRenderMode**: `boolean`

When `true`, rendering a frame will only occur when needed as determined by changes within the scene.
Enabling improves performance of the application, but requires using [Scene#requestRender](#requestrender)
to render a new frame explicitly in this mode. This will be necessary in many cases after making changes
to the scene in other parts of the API.

***

### rethrowRenderErrors

> **rethrowRenderErrors**: `boolean`

Exceptions occurring in `render` are always caught in order to raise the
`renderError` event. If this property is true, the error is rethrown
after the event is raised. If this property is false, the `render` function
returns normally after raising the event.

***

### sampleHeightSupported

> `readonly` **sampleHeightSupported**: `boolean`

Returns `true` if the [Scene#sampleHeight](#sampleheight) and [Scene#sampleHeightMostDetailed](#sampleheightmostdetailed) functions are supported.

***

### scene3DOnly

> `readonly` **scene3DOnly**: `boolean`

Gets whether or not the scene is optimized for 3D only viewing.

***

### screenSpaceCameraController

> `readonly` **screenSpaceCameraController**: `ScreenSpaceCameraController`

Gets the controller for camera input handling.

***

### shadowMap

> **shadowMap**: `ShadowMap`

The shadow map for the scene's light source. When enabled, models, primitives, and the globe may cast and receive shadows.

***

### skyAtmosphere

> **skyAtmosphere**: `SkyAtmosphere` \| `undefined`

The sky atmosphere drawn around the globe.

***

### skyBox

> **skyBox**: `SkyBox` \| `undefined`

The SkyBox used to draw the stars.

***

### specularEnvironmentMaps

> **specularEnvironmentMaps**: `string`

The url to the KTX2 file containing the specular environment map and convoluted mipmaps for image-based lighting of PBR models.

***

### specularEnvironmentMapsSupported

> `readonly` **specularEnvironmentMapsSupported**: `boolean`

Returns `true` if specular environment maps are supported.

***

### sphericalHarmonicCoefficients

> **sphericalHarmonicCoefficients**: [`Cartesian3`](Daisy.Cartesian3.md)[]

The spherical harmonic coefficients for image-based lighting of PBR models.

***

### splitPosition

> **splitPosition**: `number`

Gets or sets the position of the splitter within the viewport. Valid values are between 0.0 and 1.0.

***

### sun

> **sun**: `Sun` \| `undefined`

The Sun.

***

### sunBloom

> **sunBloom**: `boolean`

Uses a bloom filter on the sun when enabled.

***

### terrainProvider

> **terrainProvider**: `TerrainProvider`

The terrain provider providing surface geometry for the globe.

***

### terrainProviderChanged

> `readonly` **terrainProviderChanged**: `Event`

Gets an event that's raised when the terrain provider is changed

***

### useDepthPicking

> **useDepthPicking**: `boolean`

When `true`, enables picking using the depth buffer.

***

### useWebVR

> **useWebVR**: `boolean`

When `true`, splits the scene into two viewports with steroscopic views for the left and right eyes.
Used for cardboard and WebVR.

***

### verticalExaggeration

> **verticalExaggeration**: `number`

The vertical exaggeration of the scene.
When set to 1.0, no exaggeration is applied.

***

### verticalExaggerationRelativeHeight

> **verticalExaggerationRelativeHeight**: `number`

The reference height for vertical exaggeration of the scene.
When set to 0.0, the exaggeration is applied relative to the ellipsoid surface.

***

### defaultLogDepthBuffer

> `static` **defaultLogDepthBuffer**: `any`

Use this to set the default value for [Scene#logarithmicDepthBuffer](#logarithmicdepthbuffer) in newly constructed Scenes
This property relies on fragmentDepth being supported.

## Methods

### cartesianToCanvasCoordinates()

> **cartesianToCanvasCoordinates**(`position`, `result?`): [`Cartesian2`](Daisy.Cartesian2.md) \| `undefined`

Transforms a position in cartesian coordinates to canvas coordinates. This is commonly used to place an
HTML element at the same screen position as an object in the scene.

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position in cartesian coordinates.

##### result?

[`Cartesian2`](Daisy.Cartesian2.md)

An optional object to return the input position transformed to canvas coordinates.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md) \| `undefined`

The modified result parameter or a new Cartesian2 instance if one was not provided. This may be `undefined` if the input position is near the center of the ellipsoid.

#### Example

```ts
// Output the canvas position of longitude/latitude (0, 0) every time the mouse moves.
const scene = widget.scene;
const position = Daisy.Cartesian3.fromDegrees(0.0, 0.0);
const handler = new Daisy.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function(movement) {
 console.log(scene.cartesianToCanvasCoordinates(position));
}, Daisy.ScreenSpaceEventType.MOUSE_MOVE);
```

***

### clampToHeight()

> **clampToHeight**(`cartesian`, `objectsToExclude?`, `width?`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`

Clamps the given cartesian position to the scene geometry along the geodetic surface normal. Returns the
clamped position or `undefined` if there was no scene geometry to clamp to. May be used to clamp
objects to the globe, 3D Tiles, or primitives in the scene.

This function only clamps to globe tiles and 3D Tiles that are rendered in the current view. Clamps to
all other primitives regardless of their visibility.


#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The cartesian position.

##### objectsToExclude?

`object`[]

A list of primitives, entities, or 3D Tiles features to not clamp to.

##### width?

`number`

Width of the intersection volume in meters.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

An optional object to return the clamped position.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`

The modified result parameter or a new Cartesian3 instance if one was not provided. This may be `undefined` if there was no scene geometry to clamp to.

#### Example

```ts
// Clamp an entity to the underlying scene geometry
const position = entity.position.getValue(Daisy.JulianDate.now());
entity.position = viewer.scene.clampToHeight(position);
```

***

### clampToHeightMostDetailed()

> **clampToHeightMostDetailed**(`cartesians`, `objectsToExclude?`, `width?`): `Promise`\<([`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`)[]\>

Initiates an asynchronous [Scene#clampToHeight](#clamptoheight) query for an array of [Cartesian3](Daisy.Cartesian3.md) positions
using the maximum level of detail for 3D Tilesets in the scene. Returns a promise that is resolved when
the query completes. Each position is modified in place. If a position cannot be clamped because no geometry
can be sampled at that location, or another error occurs, the element in the array is set to undefined.

#### Parameters

##### cartesians

[`Cartesian3`](Daisy.Cartesian3.md)[]

The cartesian positions to update with clamped positions.

##### objectsToExclude?

`object`[]

A list of primitives, entities, or 3D Tiles features to not clamp to.

##### width?

`number`

Width of the intersection volume in meters.

#### Returns

`Promise`\<([`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`)[]\>

A promise that resolves to the provided list of positions when the query has completed. Positions may become `undefined` if they cannot be clamped.

#### Example

```ts
const cartesians = [
 entities[0].position.getValue(Daisy.JulianDate.now()),
 entities[1].position.getValue(Daisy.JulianDate.now())
];
const promise = viewer.scene.clampToHeightMostDetailed(cartesians);
promise.then(function(updatedCartesians) {
 entities[0].position = updatedCartesians[0];
 entities[1].position = updatedCartesians[1];
}
```

***

### completeMorph()

> **completeMorph**(): `void`

Instantly completes an active transition.

#### Returns

`void`

***

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
scene = scene && scene.destroy();
```

***

### drillPick()

> **drillPick**(`windowPosition`, `limit?`, `width?`, `height?`): `any`[]

Returns a list of objects, each containing a `primitive` property, for all primitives at
a particular window coordinate position. Other properties may also be set depending on the
type of primitive and may be used to further identify the picked object. The primitives in
the list are ordered by their visual order in the scene (front to back).

#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### limit?

`number`

If supplied, stop drilling after collecting this many picks.

##### width?

`number`

Width of the pick rectangle.

##### height?

`number`

Height of the pick rectangle.

#### Returns

`any`[]

Array of objects, each containing 1 picked primitives.

#### Example

```ts
const pickedObjects = scene.drillPick(new Daisy.Cartesian2(100.0, 200.0));
```

***

### getCompressedTextureFormatSupported()

> **getCompressedTextureFormatSupported**(`format`): `boolean`

Determines if a compressed texture format is supported.

#### Parameters

##### format

`string`

The texture format. May be the name of the format or the WebGL extension name, e.g. s3tc or WEBGL_compressed_texture_s3tc.

#### Returns

`boolean`

Whether or not the format is supported.

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.



If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.

#### Returns

`boolean`

`true` if this object was destroyed; otherwise, `false`.

***

### morphTo2D()

> **morphTo2D**(`duration?`): `void`

Asynchronously transitions the scene to 2D.

#### Parameters

##### duration?

`number`

The amount of time, in seconds, for transition animations to complete.

#### Returns

`void`

***

### morphTo3D()

> **morphTo3D**(`duration?`): `void`

Asynchronously transitions the scene to 3D.

#### Parameters

##### duration?

`number`

The amount of time, in seconds, for transition animations to complete.

#### Returns

`void`

***

### morphToColumbusView()

> **morphToColumbusView**(`duration?`): `void`

Asynchronously transitions the scene to Columbus View.

#### Parameters

##### duration?

`number`

The amount of time, in seconds, for transition animations to complete.

#### Returns

`void`

***

### pick()

> **pick**(`windowPosition`, `width?`, `height?`): `any`

Returns an object with a `primitive` property that contains the first (top) primitive in the scene
at a particular window coordinate or `undefined` if nothing is at the location. Other properties may
potentially be set depending on the type of primitive and may be used to further identify the picked object.

When a feature of a 3D Tiles tileset is picked, `pick` returns a 3DTileFeature object.


#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### width?

`number`

Width of the pick rectangle.

##### height?

`number`

Height of the pick rectangle.

#### Returns

`any`

Object containing the picked primitive or `undefined` if nothing is at the location.

#### Example

```ts
// On mouse over, color the feature yellow.
handler.setInputAction(function(movement) {
 const feature = scene.pick(movement.endPosition);
 if (feature instanceof Daisy.3DTileFeature) {
 feature.color = Daisy.Color.YELLOW;
 }
}, Daisy.ScreenSpaceEventType.MOUSE_MOVE);
```

***

### pickAsync()

> **pickAsync**(`windowPosition`, `width?`, `height?`): `Promise`\<`object` \| `undefined`\>

Performs the same operation as Scene.pick but asynchonosly without blocking the main render thread.
Requires WebGL2 else using fallback.

#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### width?

`number`

Width of the pick rectangle.

##### height?

`number`

Height of the pick rectangle.

#### Returns

`Promise`\<`object` \| `undefined`\>

Object containing the picked primitive or `undefined` if nothing is at the location.

#### Example

```ts
// On mouse over, color the feature yellow.
handler.setInputAction(function(movement) {
 const feature = scene.pickAsync(movement.endPosition).then(function(feature) {
 if (feature instanceof Daisy.3DTileFeature) {
 feature.color = Daisy.Color.YELLOW;
 }
 });
}, Daisy.ScreenSpaceEventType.MOUSE_MOVE);
```

***

### pickMetadata()

> **pickMetadata**(`windowPosition`, `schemaId`, `className`, `propertyName`): `MetadataValue` \| `undefined`

Pick a metadata value at the given window position.

#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### schemaId

`string` \| `undefined`

The ID of the metadata schema to pick values
from. If this is `undefined`, then it will pick the values from the object
that match the given class- and property name, regardless of the schema ID.

##### className

`string`

The name of the metadata class to pick
values from

##### propertyName

`string`

The name of the metadata property to pick
values from

#### Returns

`MetadataValue` \| `undefined`

The metadata value, or `undefined` when
no matching metadata was found at the given position

***

### pickMetadataSchema()

> **pickMetadataSchema**(`windowPosition`): `MetadataSchema` \| `undefined`

Pick the schema of the metadata of the object at the given position

#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

#### Returns

`MetadataSchema` \| `undefined`

The metadata schema, or `undefined` if there is no object with
associated metadata at the given position.

***

### pickPosition()

> **pickPosition**(`windowPosition`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Returns the cartesian position reconstructed from the depth buffer and window position.

The position reconstructed from the depth buffer in 2D may be slightly different from those
reconstructed in 3D and Columbus view. This is caused by the difference in the distribution
of depth values of perspective and orthographic projection.


Set [Scene#pickTranslucentDepth](#picktranslucentdepth) to `true` to include the depth of
translucent primitives; otherwise, this essentially picks through translucent primitives.


#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object on which to restore the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The cartesian position.

***

### pickVoxel()

> **pickVoxel**(`windowPosition`, `width?`, `height?`): `VoxelCell` \| `undefined`

Returns a VoxelCell for the voxel sample rendered at a particular window coordinate,
or `undefined` if no voxel is rendered at that position.

#### Parameters

##### windowPosition

[`Cartesian2`](Daisy.Cartesian2.md)

Window coordinates to perform picking on.

##### width?

`number`

Width of the pick rectangle.

##### height?

`number`

Height of the pick rectangle.

#### Returns

`VoxelCell` \| `undefined`

Information about the voxel cell rendered at the picked position or `undefined` if no voxel is rendered at that position.

#### Example

```ts
On left click, report the value of the "color" property at that voxel sample.
handler.setInputAction(function(movement) {
 const voxelCell = scene.pickVoxel(movement.position);
 if (defined(voxelCell)) {
 console.log(voxelCell.getProperty("color"));
 }
}, Daisy.ScreenSpaceEventType.LEFT_CLICK);
```

***

### render()

> **render**(`time?`): `void`

Update and render the scene. It is usually not necessary to call this function
directly because [Widget](Daisy.Widget.md) will do it automatically.

#### Parameters

##### time?

[`JulianDate`](Daisy.JulianDate.md)

The simulation time at which to render.

#### Returns

`void`

***

### requestRender()

> **requestRender**(): `void`

Requests a new rendered frame when [Scene#requestRenderMode](#requestrendermode) is set to `true`.
The render rate will not exceed the [Widget#targetFrameRate](Daisy.Widget.md#targetframerate).

#### Returns

`void`

***

### sampleHeight()

> **sampleHeight**(`position`, `objectsToExclude?`, `width?`): `number` \| `undefined`

Returns the height of scene geometry at the given cartographic position or `undefined` if there was no
scene geometry to sample height from. The height of the input position is ignored. May be used to clamp objects to
the globe, 3D Tiles, or primitives in the scene.

This function only samples height from globe tiles and 3D Tiles that are rendered in the current view. Samples height
from all other primitives regardless of their visibility.


#### Parameters

##### position

[`Cartographic`](Daisy.Cartographic.md)

The cartographic position to sample height from.

##### objectsToExclude?

`object`[]

A list of primitives, entities, or 3D Tiles features to not sample height from.

##### width?

`number`

Width of the intersection volume in meters.

#### Returns

`number` \| `undefined`

The height. This may be `undefined` if there was no scene geometry to sample height from.

#### Example

```ts
const position = new Daisy.Cartographic(-1.31968, 0.698874);
const height = viewer.scene.sampleHeight(position);
console.log(height);
```

***

### sampleHeightMostDetailed()

> **sampleHeightMostDetailed**(`positions`, `objectsToExclude?`, `width?`): `Promise`\<([`Cartographic`](Daisy.Cartographic.md) \| `undefined`)[]\>

Initiates an asynchronous [Scene#sampleHeight](#sampleheight) query for an array of [Cartographic](Daisy.Cartographic.md) positions
using the maximum level of detail for 3D Tilesets in the scene. The height of the input positions is ignored.
Returns a promise that is resolved when the query completes. Each point height is modified in place.
If a height cannot be determined because no geometry can be sampled at that location, or another error occurs,
the height is set to `undefined`.

#### Parameters

##### positions

[`Cartographic`](Daisy.Cartographic.md)[]

The cartographic positions to update with sampled heights.

##### objectsToExclude?

`object`[]

A list of primitives, entities, or 3D Tiles features to not sample height from.

##### width?

`number`

Width of the intersection volume in meters.

#### Returns

`Promise`\<([`Cartographic`](Daisy.Cartographic.md) \| `undefined`)[]\>

A promise that resolves to the provided list of positions when the query has completed. Positions may become `undefined` if the height cannot be determined.

#### Example

```ts
const positions = [
 new Daisy.Cartographic(-1.31968, 0.69887),
 new Daisy.Cartographic(-1.10489, 0.83923)
];
const promise = viewer.scene.sampleHeightMostDetailed(positions);
promise.then(function(updatedPosition) {
 // positions[0].height and positions[1].height have been updated.
 // updatedPositions is just a reference to positions.
}
```

***

### setTerrain()

> **setTerrain**(`terrain`): `Terrain`

Update the terrain providing surface geometry for the globe.

#### Parameters

##### terrain

`Terrain`

The terrain provider async helper

#### Returns

`Terrain`

terrain The terrain provider async helper

#### Examples

```ts
// Use 底层 World Terrain
scene.setTerrain(Daisy.Terrain.fromWorldTerrain());
```

```ts
// Use a custom terrain provider
const terrain = new Daisy.Terrain(Daisy.TerrainProvider.fromUrl("https://myTestTerrain.com"));
scene.setTerrain(terrain);

terrain.errorEvent.addEventListener(error => {
 alert(`Encountered an error while creating terrain! ${error}`);
});
```
