[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoLayerManager

# Class: GeoLayerManager

Geographic resource manager for the engine's main scene.

## Example

```ts
const engine = await Daisy.Engine.create("daisyContainer");
engine.geoLayer.setBaseImagery({
 type: Daisy.GeoImageryType.XYZ,
 url: "https://example.com/tiles/{z}/{x}/{y}.png",
});
```

## Constructors

### Constructor

> **new GeoLayerManager**(`viewer`): `GeoLayerManager`

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`GeoLayerManager`

## Methods

### addImagery()

> **addImagery**(`options`): `string`

Add an imagery layer

#### Parameters

##### options

[`GeoImageryOptions`](../types/GeoImageryOptions.md)

#### Returns

`string`

#### Example

```ts
const id = engine.geoLayer.addImagery({
 type: Daisy.GeoImageryType.XYZ,
 url: "https://example.com/overlay/{z}/{x}/{y}.png",
});
```

***

### addImageryProvider()

> **addImageryProvider**(`provider`, `options?`): `string`

Add a caller-created imagery provider, suitable for runtime-generated single-image overlay layers.

#### Parameters

##### provider

`ImageryProvider` \| `SingleTileImageryProvider`

Imagery provider instance.

##### options?

[`GeoImageryProviderLayerOptions`](../interfaces/GeoImageryProviderLayerOptions.md)

Layer display parameters.

#### Returns

`string`

Layer identifier, can be used to later adjust the layer order or remove the layer.

#### Example

```ts
const provider = new Daisy.SingleTileImageryProvider({
 url: canvas.toDataURL("image/png"),
 rectangle: Daisy.Rectangle.fromDegrees(west, south, east, north),
});
const id = engine.geoLayer.addImageryProvider(provider, { alpha: 0.8 });
engine.geoLayer.raiseLayerToTop(id);
```

***

### clearImagery()

> **clearImagery**(): `void`

Clear all imagery layers

#### Returns

`void`

#### Example

```ts
engine.geoLayer.clearImagery();
```

***

### destroy()

> **destroy**(): `void`

Destroy the geographic layer manager and release imagery, terrain, and sky resources.

#### Returns

`void`

***

### raiseLayerToTop()

> **raiseLayerToTop**(`id`): `void`

Move the specified imagery layer to the top of all imagery layers.

#### Parameters

##### id

`string`

#### Returns

`void`

***

### removeImagery()

> **removeImagery**(`id`): `void`

Remove an imagery layer

#### Parameters

##### id

`string`

#### Returns

`void`

#### Example

```ts
engine.geoLayer.removeImagery(id);
```

***

### removeImageryLayer()

> **removeImageryLayer**(`id`): `void`

Remove the imagery layer created by `addImageryProvider` and release its resources.

#### Parameters

##### id

`string`

#### Returns

`void`

***

### setBaseImagery()

> **setBaseImagery**(`options`): `string`

Set the base imagery layer; the existing base layer will be replaced and released.

#### Parameters

##### options

[`GeoImageryOptions`](../types/GeoImageryOptions.md)

#### Returns

`string`

#### Example

```ts
engine.geoLayer.setBaseImagery({
 type: Daisy.GeoImageryType.WMTS,
 url: "https://example.com/wmts",
 layer: "vector",
 tileMatrixSetID: "default",
 minLevel: 1,
 maxLevel: 18,
});
```

***

### setCelestialVisibility()

> **setCelestialVisibility**(`options`): `void`

Set the display state of celestial bodies (sun, moon, sky box).

#### Parameters

##### options

[`GeoCelestialVisibilityOptions`](../interfaces/GeoCelestialVisibilityOptions.md)

Celestial display configuration

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setCelestialVisibility({ sun: true, moon: true, skyBox: true });
```

***

### setEarthTransparency()

> **setEarthTransparency**(`alphaOrOptions`): `void`

Set the Earth transparency.

#### Parameters

##### alphaOrOptions

`number` \| [`GeoEarthTransparencyOptions`](../types/GeoEarthTransparencyOptions.md)

#### Returns

`void`

#### Remarks

- `alpha` is the most common entry point, `0` means fully transparent, `1` means fully opaque
- By default, the ground atmosphere is also disabled to avoid a foggy overlay on the transparent Earth

#### Example

```ts
engine.geoLayer.setEarthTransparency(0.25);
engine.geoLayer.setEarthTransparency({ alpha: 0.15, showGroundAtmosphere: false });
```

***

### setFog()

> **setFog**(`options`): `void`

Set scene fog parameters.
Fog is used to enhance depth perception; distant terrain gradually blends into the background color.

#### Parameters

##### options

[`GeoFogOptions`](../interfaces/GeoFogOptions.md)

Fog configuration options, all fields optional, only sets the provided properties.

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setFog({ enabled: true, density: 1.8e-4 });
engine.geoLayer.setFog({ enabled: true, density: 8.0e-5, screenSpaceErrorFactor: 6000 });
```

***

### setGlobeOptions()

> **setGlobeOptions**(`options`): `void`

Set globe display properties.

#### Parameters

##### options

[`GeoGlobeOptions`](../interfaces/GeoGlobeOptions.md)

Globe configuration options; all fields optional, only sets the provided properties.

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setGlobeOptions({ show: true, baseColor: Daisy.Color.BLACK });
engine.geoLayer.setGlobeOptions({ depthTestAgainstTerrain: true, enableLighting: true });
```

***

### setSky()

> **setSky**(`options`): `void`

Set sky effect

#### Parameters

##### options

[`GeoSkyOptions`](../types/GeoSkyOptions.md)

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
```

***

### setTerrain()

> **setTerrain**(`options`): `void`

Set terrain

#### Parameters

##### options

[`GeoTerrainOptions`](../types/GeoTerrainOptions.md)

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
```
