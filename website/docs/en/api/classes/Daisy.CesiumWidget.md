[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Widget

# Class: Widget

A widget containing a scene.

## Example

```ts
// For each example, include a link to Widget.css stylesheet in HTML head,
// and in the body, include: 

// Widget with no terrain and default Bing Maps imagery provider.
const widget = new Daisy.Widget("cesiumContainer");

// Widget with ion imagery and 底层 World Terrain.
const widget2 = new Daisy.Widget("cesiumContainer", {
 baseLayer: Daisy.ImageryLayer.fromWorldTerrain(),
 terrain: Daisy.Terrain.fromWorldTerrain()
 skyBox: new Daisy.SkyBox({
 sources: {
 positiveX: "stars/TychoSkymapII.t3_08192x04096_80_px.jpg",
 negativeX: "stars/TychoSkymapII.t3_08192x04096_80_mx.jpg",
 positiveY: "stars/TychoSkymapII.t3_08192x04096_80_py.jpg",
 negativeY: "stars/TychoSkymapII.t3_08192x04096_80_my.jpg",
 positiveZ: "stars/TychoSkymapII.t3_08192x04096_80_pz.jpg",
 negativeZ: "stars/TychoSkymapII.t3_08192x04096_80_mz.jpg"
 }
 }),
 // Show Columbus View map with Web Mercator projection
 sceneMode: Daisy.SceneMode.COLUMBUS_VIEW,
 mapProjection: new Daisy.WebMercatorProjection()
});
```

## Param

The DOM element or ID that will contain the widget.

## Param

Object with the following properties:

## Param

The clock to use to control current time.

## Param

`true` if the clock should attempt to advance simulation time by default, `false` otherwise.

## Param

The default ellipsoid.

## Param

The bottommost imagery layer applied to the globe. If set to `false`, no imagery provider will be added.

## Param

The terrain provider.

## Param

A terrain object which handles asynchronous terrain provider. Can only specify if options.terrainProvider is undefined.

## Param

The skybox used to render the stars. When `undefined` and the WGS84 ellipsoid used, the default stars are used. If set to `false`, no skyBox, Sun, or Moon will be added.

## Param

Blue sky, and the glow around the Earth's limb. Enabled when the default ellipsoid used. Set to `false` to turn it off.

## Param

The initial scene mode.

## Param

When `true`, each geometry instance will only be rendered in 3D to save GPU memory.

## Param

If true and the configuration supports it, use order independent translucency.

## Param

The map projection to use in 2D and Columbus View modes.

## Param

The globe to use in the scene. If set to `false`, no globe will be added and the sky atmosphere will be hidden by default.

## Param

True if this widget should control the render loop, false otherwise.

## Param

If true, render at the browser's recommended resolution and ignore `window.devicePixelRatio`.

## Param

The target frame rate when using the default render loop.

## Param

If true, this widget will automatically display an HTML panel to the user containing the error, if a render loop error occurs.

## Param

If true, this widget will automatically track the clock settings of newly added DataSources, updating if the DataSource's clock changes. Set this to false if you want to configure the clock independently.

## Param

Context and WebGL creation properties passed to Scene.

## Param

The DOM element or ID that will contain the [CreditDisplay](Daisy.CreditDisplay.md). If not specified, the credits are added
 to the bottom of the widget itself.

## Param

The DOM element or ID that will contain the credit pop up created by the [CreditDisplay](Daisy.CreditDisplay.md). If not specified, it will appear over the widget itself.

## Param

The collection of data sources visualized by the widget. If this parameter is provided,
 the instance is assumed to be owned by the caller and will not be destroyed when the widget is destroyed.

## Param

Determines if shadows are cast by light sources.

## Param

Determines if the terrain casts or receives shadows from light sources.

## Param

Determines if the 2D map is rotatable or can be scrolled infinitely in the horizontal direction.

## Param

If true, the active element will blur when the widget's canvas is clicked. Setting this to false is useful for cases when the canvas is clicked only for retrieving position or an entity data without actually meaning to set the canvas to be the active element.

## Param

If true, rendering a frame will only occur when needed as determined by changes within the scene. Enabling improves performance of the application, but requires using Scene#requestRender to render a new frame explicitly in this mode. This will be necessary in many cases after making changes to the scene in other parts of the API. See [Performance with Explicit Rendering](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving).

## Param

If requestRenderMode is true, this value defines the maximum change in simulation time allowed before a render is requested. See [Performance with Explicit Rendering](https://cesium.com/blog/2018/01/24/cesium-scene-rendering-performance/|Improving).

## Param

If provided, this value controls the rate of multisample antialiasing. Typical multisampling rates are 2, 4, and sometimes 8 samples per pixel. Higher sampling rates of MSAA may impact performance in exchange for improved visual quality. This value only applies to WebGL2 contexts that support multisample render targets. Set to 1 to disable MSAA.

## Constructors

### Constructor

> **new Widget**(`container`, `options?`): `Widget`

#### Parameters

##### container

`string` \| `Element`

##### options?

###### automaticallyTrackDataSourceClocks?

`boolean`

###### baseLayer?

`false` \| [`ImageryLayer`](Daisy.ImageryLayer.md)

###### blurActiveElementOnCanvasFocus?

`boolean`

###### clock?

`Clock`

###### contextOptions?

`ContextOptions`

###### creditContainer?

`string` \| `Element`

###### creditViewport?

`string` \| `Element`

###### dataSources?

`DataSourceCollection`

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

###### globe?

`false` \| `Globe`

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

###### sceneMode?

`SceneMode`

###### shadows?

`boolean`

###### shouldAnimate?

`boolean`

###### showRenderLoopErrors?

`boolean`

###### skyAtmosphere?

`false` \| `SkyAtmosphere`

###### skyBox?

`false` \| `SkyBox`

###### targetFrameRate?

`number`

###### terrain?

`Terrain`

###### terrainProvider?

`TerrainProvider`

###### terrainShadows?

[`ShadowMode`](../enums/Daisy.ShadowMode.md)

###### useBrowserRecommendedResolution?

`boolean`

###### useDefaultRenderLoop?

`boolean`

#### Returns

`Widget`

## Properties

### allowDataSourcesToSuspendAnimation

> **allowDataSourcesToSuspendAnimation**: `boolean`

Gets or sets whether or not data sources can temporarily pause
animation in order to avoid showing an incomplete picture to the user.
For example, if asynchronous primitives are being processed in the
background, the clock will not advance until the geometry is ready.

***

### camera

> `readonly` **camera**: `Camera`

Gets the camera.

***

### canvas

> `readonly` **canvas**: `HTMLCanvasElement`

Gets the canvas.

***

### clock

> `readonly` **clock**: `Clock`

Gets the clock.

***

### clockTrackedDataSource

> **clockTrackedDataSource**: `DataSource`

Gets or sets the data source to track with the widget's clock.

***

### container

> `readonly` **container**: `Element`

Gets the parent container.

***

### creditContainer

> `readonly` **creditContainer**: `Element`

Gets the credit container.

***

### creditDisplay

> **creditDisplay**: [`CreditDisplay`](Daisy.CreditDisplay.md)

Manages the list of credits to display on screen and in the lightbox.

***

### creditViewport

> `readonly` **creditViewport**: `Element`

Gets the credit viewport

***

### dataSourceDisplay

> `readonly` **dataSourceDisplay**: `DataSourceDisplay`

Gets the display used for [DataSource](../enums/DataSource.md) visualization.

***

### dataSources

> `readonly` **dataSources**: `DataSourceCollection`

Gets the set of [DataSource](../enums/DataSource.md) instances to be visualized.

***

### ellipsoid

> `readonly` **ellipsoid**: [`Ellipsoid`](Daisy.Ellipsoid.md)

Gets the default ellipsoid for the scene.

***

### entities

> `readonly` **entities**: `EntityCollection`

Gets the collection of entities not tied to a particular data source.
This is a shortcut to [dataSourceDisplay.defaultDataSource.entities][Widget#dataSourceDisplay](#datasourcedisplay).

***

### imageryLayers

> `readonly` **imageryLayers**: `ImageryLayerCollection`

Gets the collection of image layers that will be rendered on the globe.

***

### resolutionScale

> **resolutionScale**: `number`

Gets or sets a scaling factor for rendering resolution. Values less than 1.0 can improve
performance on less powerful devices while values greater than 1.0 will render at a higher
resolution and then scale down, resulting in improved visual fidelity.
For example, if the widget is laid out at a size of 640x480, setting this value to 0.5
will cause the scene to be rendered at 320x240 and then scaled up while setting
it to 2.0 will cause the scene to be rendered at 1280x960 and then scaled down.

***

### scene

> `readonly` **scene**: `Scene`

Gets the scene.

***

### screenSpaceEventHandler

> `readonly` **screenSpaceEventHandler**: `ScreenSpaceEventHandler`

Gets the screen space event handler.

***

### targetFrameRate

> **targetFrameRate**: `number`

Gets or sets the target frame rate of the widget when `useDefaultRenderLoop`
is true. If undefined, the browser's requestAnimationFrame implementation
determines the frame rate. If defined, this value must be greater than 0. A value higher
than the underlying requestAnimationFrame implementation will have no effect.

***

### terrainProvider

> **terrainProvider**: `TerrainProvider`

The terrain provider providing surface geometry for the globe.

***

### trackedEntity

> **trackedEntity**: `Entity` \| `undefined`

Gets or sets the Entity instance currently being tracked by the camera.

***

### trackedEntityChanged

> `readonly` **trackedEntityChanged**: `Event`

Gets the event that is raised when the tracked entity changes.

***

### useBrowserRecommendedResolution

> **useBrowserRecommendedResolution**: `boolean`

Boolean flag indicating if the browser's recommended resolution is used.
If true, the browser's device pixel ratio is ignored and 1.0 is used instead,
effectively rendering based on CSS pixels instead of device pixels. This can improve
performance on less powerful devices that have high pixel density. When false, rendering
will be in device pixels. [Widget#resolutionScale](#resolutionscale) will still take effect whether
this flag is true or false.

***

### useDefaultRenderLoop

> **useDefaultRenderLoop**: `boolean`

Gets or sets whether or not this widget should control the render loop.
If true the widget will use requestAnimationFrame to
perform rendering and resizing of the widget, as well as drive the
simulation clock. If set to false, you must manually call the
`resize`, `render` methods as part of a custom
render loop. If an error occurs during rendering, Scene's
`renderError` event will be raised and this property
will be set to false. It must be set back to true to continue rendering
after the error.

## Methods

### destroy()

> **destroy**(): `void`

Destroys the widget. Should be called if permanently
removing the widget from layout.

#### Returns

`void`

***

### flyTo()

> **flyTo**(`target`, `options?`): `Promise`\<`boolean`\>

Flies the camera to the provided entity, entities, or data source.
If the data source is still in the process of loading or the visualization is otherwise still loading,
this method waits for the data to be ready before performing the flight.

The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
The heading and the pitch angles are defined in the local east-north-up reference frame.
The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
zero, a range will be computed such that the whole bounding sphere is visible.

In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
target will be the range. The heading will be determined from the offset. If the heading cannot be
determined from the offset, the heading will be north.

#### Parameters

##### target

`Entity` \| `Entity`[] \| `EntityCollection` \| `DataSource` \| `3DTileset` \| `TimeDynamicPointCloud` \| [`ImageryLayer`](Daisy.ImageryLayer.md) \| `Promise`\<`Entity` \| `Entity`[] \| `EntityCollection` \| `DataSource` \| `3DTileset` \| `TimeDynamicPointCloud` \| `VoxelPrimitive` \| [`ImageryLayer`](Daisy.ImageryLayer.md)\>

The entity, array of entities, entity collection, data source, 3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.

##### options?

Object with the following properties:

###### duration?

`number`

The duration of the flight in seconds.

###### maximumHeight?

`number`

The maximum height at the peak of the flight.

###### offset?

[`HeadingPitchRange`](Daisy.HeadingPitchRange.md)

The offset from the target in the local east-north-up reference frame centered at the target.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the flight was successful or false if the target is not currently visualized in the scene or the flight was cancelled. //TODO: Cleanup entity mentions

***

### isDestroyed()

> **isDestroyed**(): `boolean`

#### Returns

`boolean`

true if the object has been destroyed, false otherwise.

***

### render()

> **render**(): `void`

Renders the scene. This function is called automatically
unless `useDefaultRenderLoop` is set to false;

#### Returns

`void`

***

### resize()

> **resize**(): `void`

Updates the canvas size, camera aspect ratio, and viewport size.
This function is called automatically as needed unless
`useDefaultRenderLoop` is set to false.

#### Returns

`void`

***

### showErrorPanel()

> **showErrorPanel**(`title`, `message?`, `error?`): `void`

Show an error panel to the user containing a title and a longer error message,
which can be dismissed using an OK button. This panel is displayed automatically
when a render loop error occurs, if showRenderLoopErrors was not false when the
widget was constructed.

#### Parameters

##### title

`string`

The title to be displayed on the error panel. This string is interpreted as text.

##### message?

`string`

A helpful, user-facing message to display prior to the detailed error information. This string is interpreted as HTML.

##### error?

`string`

The error to be displayed on the error panel. This string is formatted using formatError and then displayed as text.

#### Returns

`void`

***

### zoomTo()

> **zoomTo**(`target`, `offset?`): `Promise`\<`boolean`\>

Asynchronously sets the camera to view the provided entity, entities, or data source.
If the data source is still in the process of loading or the visualization is otherwise still loading,
this method waits for the data to be ready before performing the zoom.

The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
The heading and the pitch angles are defined in the local east-north-up reference frame.
The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
zero, a range will be computed such that the whole bounding sphere is visible.

In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
target will be the range. The heading will be determined from the offset. If the heading cannot be
determined from the offset, the heading will be north.

#### Parameters

##### target

`Entity` \| `Entity`[] \| `EntityCollection` \| `DataSource` \| `3DTileset` \| `TimeDynamicPointCloud` \| [`ImageryLayer`](Daisy.ImageryLayer.md) \| `Promise`\<`Entity` \| `Entity`[] \| `EntityCollection` \| `DataSource` \| `3DTileset` \| `TimeDynamicPointCloud` \| `VoxelPrimitive` \| [`ImageryLayer`](Daisy.ImageryLayer.md)\>

The entity, array of entities, entity collection, data source, 3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.

##### offset?

[`HeadingPitchRange`](Daisy.HeadingPitchRange.md)

The offset from the center of the entity in the local east-north-up reference frame.

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the zoom was successful or false if the target is not currently visualized in the scene or the zoom was cancelled.
