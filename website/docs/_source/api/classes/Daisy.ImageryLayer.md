[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ImageryLayer

# Class: ImageryLayer

An imagery layer that displays tiled image data from a single imagery provider
on a Globe or 3DTileset.

## Examples

```ts
// Add an OpenStreetMaps layer
const imageryLayer = new Daisy.ImageryLayer(new Daisy.OpenStreetMapImageryProvider({
 url: "https://tile.openstreetmap.org/"
}));
scene.imageryLayers.add(imageryLayer);
```

```ts
// Add ion's default world imagery layer
const imageryLayer = Daisy.ImageryLayer.fromWorldImagery();
scene.imageryLayers.add(imageryLayer);
```

```ts
// Add a new transparent layer from ion
const imageryLayer = Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
imageryLayer.alpha = 0.5;
scene.imageryLayers.add(imageryLayer);
```

```ts
// Drape Bing Maps Aerial imagery over a 3D tileset
const tileset = await Daisy.3DTileset.fromUrl(
 "http://localhost:8002/tilesets/Seattle/tileset.json"
);
scene.primitives.add(tileset);

const imageryProvider = await Daisy.createWorldImageryAsync({
 style: Daisy.IonWorldImageryStyle.AERIAL,
});
const imageryLayer = new ImageryLayer(imageryProvider);
tileset.imageryLayers.add(imageryLayer);
```

## Param

The imagery provider to use.

## Param

An object describing initialization options

## Constructors

### Constructor

> **new ImageryLayer**(`imageryProvider?`, `options?`): `ImageryLayer`

#### Parameters

##### imageryProvider?

[`ImageryProvider`](Daisy.ImageryProvider.md)

##### options?

[`ConstructorOptions`](../types/Daisy.ImageryLayer.ConstructorOptions.md)

#### Returns

`ImageryLayer`

## Properties

### alpha

> **alpha**: `number`

The alpha blending value of this layer, with 0.0 representing fully transparent and
1.0 representing fully opaque.

***

### brightness

> **brightness**: `number`

The brightness of this layer. 1.0 uses the unmodified imagery color. Less than 1.0
makes the imagery darker while greater than 1.0 makes it brighter.

***

### colorToAlpha

> **colorToAlpha**: [`Color`](Daisy.Color.md)

Color value that should be set to transparent.

***

### colorToAlphaThreshold

> **colorToAlphaThreshold**: `number`

Normalized (0-1) threshold for color-to-alpha.

***

### contrast

> **contrast**: `number`

The contrast of this layer. 1.0 uses the unmodified imagery color. Less than 1.0 reduces
the contrast while greater than 1.0 increases it.

***

### cutoutRectangle

> **cutoutRectangle**: [`Rectangle`](Daisy.Rectangle.md)

Rectangle cutout in this layer of imagery.

***

### dayAlpha

> **dayAlpha**: `number`

The alpha blending value of this layer on the day side of the globe, with 0.0 representing fully transparent and
1.0 representing fully opaque. This only takes effect when Globe#enableLighting is `true`.

***

### errorEvent

> `readonly` **errorEvent**: `Event`\<[`ErrorEventCallback`](../types/Daisy.ImageryLayer.ErrorEventCallback.md)\>

Gets an event that is raised when the imagery provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of the thrown error.

***

### gamma

> **gamma**: `number`

The gamma correction to apply to this layer. 1.0 uses the unmodified imagery color.

***

### hue

> **hue**: `number`

The hue of this layer in radians. 0.0 uses the unmodified imagery color.

***

### imageryProvider

> `readonly` **imageryProvider**: [`ImageryProvider`](Daisy.ImageryProvider.md)

Gets the imagery provider for this layer. This should not be called before [ImageryLayer#ready](#ready) returns true.

***

### magnificationFilter

> **magnificationFilter**: `TextureMagnificationFilter`

The TextureMagnificationFilter to apply to this layer.
Possible values are TextureMagnificationFilter.LINEAR (the default)
and TextureMagnificationFilter.NEAREST.

To take effect, this property must be set immediately after adding the imagery layer.
Once a texture is loaded it won't be possible to change the texture filter used.

***

### minificationFilter

> **minificationFilter**: `TextureMinificationFilter`

The TextureMinificationFilter to apply to this layer.
Possible values are TextureMinificationFilter.LINEAR (the default)
and TextureMinificationFilter.NEAREST.

To take effect, this property must be set immediately after adding the imagery layer.
Once a texture is loaded it won't be possible to change the texture filter used.

***

### nightAlpha

> **nightAlpha**: `number`

The alpha blending value of this layer on the night side of the globe, with 0.0 representing fully transparent and
1.0 representing fully opaque. This only takes effect when Globe#enableLighting is `true`.

***

### ready

> `readonly` **ready**: `boolean`

Returns true when the terrain provider has been successfully created. Otherwise, returns false.

***

### readyEvent

> `readonly` **readyEvent**: `Event`\<[`ReadyEventCallback`](../types/Daisy.ImageryLayer.ReadyEventCallback.md)\>

Gets an event that is raised when the imagery provider has been successfully created. Event listeners
are passed the created instance of [ImageryProvider](Daisy.ImageryProvider.md).

***

### rectangle

> `readonly` **rectangle**: [`Rectangle`](Daisy.Rectangle.md)

Gets the rectangle of this layer. If this rectangle is smaller than the rectangle of the
[ImageryProvider](Daisy.ImageryProvider.md), only a portion of the imagery provider is shown.

***

### saturation

> **saturation**: `number`

The saturation of this layer. 1.0 uses the unmodified imagery color. Less than 1.0 reduces the
saturation while greater than 1.0 increases it.

***

### show

> **show**: `boolean`

Determines if this layer is shown.

***

### splitDirection

> **splitDirection**: [`SplitDirection`](../enums/Daisy.SplitDirection.md)

The [SplitDirection](../enums/Daisy.SplitDirection.md) to apply to this layer.

***

### DEFAULT\_APPLY\_COLOR\_TO\_ALPHA\_THRESHOLD

> `static` **DEFAULT\_APPLY\_COLOR\_TO\_ALPHA\_THRESHOLD**: `number`

This value is used as the default threshold for color-to-alpha if one is not provided
during construction or by the imagery provider.

***

### DEFAULT\_BRIGHTNESS

> `static` **DEFAULT\_BRIGHTNESS**: `number`

This value is used as the default brightness for the imagery layer if one is not provided during construction
or by the imagery provider. This value does not modify the brightness of the imagery.

***

### DEFAULT\_CONTRAST

> `static` **DEFAULT\_CONTRAST**: `number`

This value is used as the default contrast for the imagery layer if one is not provided during construction
or by the imagery provider. This value does not modify the contrast of the imagery.

***

### DEFAULT\_GAMMA

> `static` **DEFAULT\_GAMMA**: `number`

This value is used as the default gamma for the imagery layer if one is not provided during construction
or by the imagery provider. This value does not modify the gamma of the imagery.

***

### DEFAULT\_HUE

> `static` **DEFAULT\_HUE**: `number`

This value is used as the default hue for the imagery layer if one is not provided during construction
or by the imagery provider. This value does not modify the hue of the imagery.

***

### DEFAULT\_MAGNIFICATION\_FILTER

> `static` **DEFAULT\_MAGNIFICATION\_FILTER**: `TextureMagnificationFilter`

This value is used as the default texture magnification filter for the imagery layer if one is not provided
during construction or by the imagery provider.

***

### DEFAULT\_MINIFICATION\_FILTER

> `static` **DEFAULT\_MINIFICATION\_FILTER**: `TextureMinificationFilter`

This value is used as the default texture minification filter for the imagery layer if one is not provided
during construction or by the imagery provider.

***

### DEFAULT\_SATURATION

> `static` **DEFAULT\_SATURATION**: `number`

This value is used as the default saturation for the imagery layer if one is not provided during construction
or by the imagery provider. This value does not modify the saturation of the imagery.

***

### DEFAULT\_SPLIT

> `static` **DEFAULT\_SPLIT**: [`SplitDirection`](../enums/Daisy.SplitDirection.md)

This value is used as the default split for the imagery layer if one is not provided during construction
or by the imagery provider.

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
imageryLayer = imageryLayer && imageryLayer.destroy();
```

***

### getImageryRectangle()

> **getImageryRectangle**(): [`Rectangle`](Daisy.Rectangle.md)

Computes the intersection of this layer's rectangle with the imagery provider's availability rectangle,
producing the overall bounds of imagery that can be produced by this layer.

#### Returns

[`Rectangle`](Daisy.Rectangle.md)

A rectangle which defines the overall bounds of imagery that can be produced by this layer.

#### Example

```ts
// Zoom to an imagery layer.
const imageryRectangle = imageryLayer.getImageryRectangle();
scene.camera.flyTo({
 destination: rectangle
});
```

***

### isBaseLayer()

> **isBaseLayer**(): `boolean`

Gets a value indicating whether this layer is the base layer in the
ImageryLayerCollection. The base layer is the one that underlies all
others. It is special in that it is treated as if it has global rectangle, even if
it actually does not, by stretching the texels at the edges over the entire
globe.

#### Returns

`boolean`

true if this is the base layer; otherwise, false.

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

### fromProviderAsync()

> `static` **fromProviderAsync**(`imageryProviderPromise`, `options?`): `ImageryLayer`

Create a new imagery layer from an asynchronous imagery provider. The layer will handle any asynchronous loads or errors, and begin rendering the imagery layer once ready.

#### Parameters

##### imageryProviderPromise

`Promise`\<[`ImageryProvider`](Daisy.ImageryProvider.md)\>

A promise which resolves to a imagery provider

##### options?

[`ConstructorOptions`](../types/Daisy.ImageryLayer.ConstructorOptions.md)

An object describing initialization options

#### Returns

`ImageryLayer`

The created imagery layer.

#### Examples

```ts
// Create a new base layer
const viewer = new Daisy.Viewer("cesiumContainer", {
 baseLayer: Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
});
```

```ts
// Add a new transparent layer
const imageryLayer = Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
imageryLayer.alpha = 0.5;
viewer.imageryLayers.add(imageryLayer);
```

```ts
// Handle loading events
const imageryLayer = Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
viewer.imageryLayers.add(imageryLayer);

imageryLayer.readyEvent.addEventListener(provider => {
 imageryLayer.imageryProvider.errorEvent.addEventListener(error => {
 alert(`Encountered an error while loading imagery tiles! ${error}`);
 });
});

imageryLayer.errorEvent.addEventListener(error => {
 alert(`Encountered an error while creating an imagery layer! ${error}`);
});
```

***

### fromWorldImagery()

> `static` **fromWorldImagery**(`options`): `ImageryLayer`

Create a new imagery layer for ion's default global base imagery layer, currently Bing Maps. The layer will handle any asynchronous loads or errors, and begin rendering the imagery layer once ready.

#### Parameters

##### options

[`ConstructorOptions`](../types/Daisy.ImageryLayer.ConstructorOptions.md)

An object describing initialization options

#### Returns

`ImageryLayer`

The created imagery layer.

*

#### Examples

```ts
// Add a new transparent layer
const imageryLayer = Daisy.ImageryLayer.fromWorldImagery();
imageryLayer.alpha = 0.5;
viewer.imageryLayers.add(imageryLayer);
```

```ts
// Handle loading events
const imageryLayer = Daisy.ImageryLayer.fromWorldImagery();
viewer.imageryLayers.add(imageryLayer);

imageryLayer.readyEvent.addEventListener(provider => {
 imageryLayer.imageryProvider.errorEvent.addEventListener(error => {
 alert(`Encountered an error while loading imagery tiles! ${error}`);
 });
});

imageryLayer.errorEvent.addEventListener(error => {
 alert(`Encountered an error while creating an imagery layer! ${error}`);
});
```

```ts
// Create a new base layer
const viewer = new Daisy.Viewer("cesiumContainer", {
 baseLayer: Daisy.ImageryLayer.fromWorldImagery();
});
```
