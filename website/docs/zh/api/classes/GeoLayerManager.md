[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoLayerManager

# Class: GeoLayerManager

引擎主场景的地理资源管理器。

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

叠加一个影像图层

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

添加调用方创建的影像数据源，适用于运行时生成的单图覆盖层。

#### Parameters

##### provider

`ImageryProvider` \| `SingleTileImageryProvider`

影像数据源实例。

##### options?

[`GeoImageryProviderLayerOptions`](../interfaces/GeoImageryProviderLayerOptions.md)

图层显示参数。

#### Returns

`string`

图层标识，可用于后续调整层级或移除图层。

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

清空所有影像图层

#### Returns

`void`

#### Example

```ts
engine.geoLayer.clearImagery();
```

***

### destroy()

> **destroy**(): `void`

销毁地理层管理器并释放影像、地形与天空资源。

#### Returns

`void`

***

### raiseLayerToTop()

> **raiseLayerToTop**(`id`): `void`

将指定影像图层移动到所有影像图层的最上方。

#### Parameters

##### id

`string`

#### Returns

`void`

***

### removeImagery()

> **removeImagery**(`id`): `void`

移除影像图层

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

移除 `addImageryProvider` 创建的影像图层并释放其资源。

#### Parameters

##### id

`string`

#### Returns

`void`

***

### setBaseImagery()

> **setBaseImagery**(`options`): `string`

设置基础影像图层；已有基础图层会被替换并释放。

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

设置天体（太阳、月亮、天空盒）的显示状态。

#### Parameters

##### options

[`GeoCelestialVisibilityOptions`](../interfaces/GeoCelestialVisibilityOptions.md)

天体显示配置

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setCelestialVisibility({ sun: true, moon: true, skyBox: true });
```

***

### setEarthTransparency()

> **setEarthTransparency**(`alphaOrOptions`): `void`

设置地球透明度。

#### Parameters

##### alphaOrOptions

`number` \| [`GeoEarthTransparencyOptions`](../types/GeoEarthTransparencyOptions.md)

#### Returns

`void`

#### Remarks

- `alpha` 是最常用入口，`0` 代表完全透明，`1` 代表完全不透明
- 默认会同步关闭地表大气层，避免透明地球叠出一层雾感

#### Example

```ts
engine.geoLayer.setEarthTransparency(0.25);
engine.geoLayer.setEarthTransparency({ alpha: 0.15, showGroundAtmosphere: false });
```

***

### setFog()

> **setFog**(`options`): `void`

设置场景雾效参数。
雾效用于增强深度感知，远距离地形会逐渐融入背景色。

#### Parameters

##### options

[`GeoFogOptions`](../interfaces/GeoFogOptions.md)

雾效配置项，所有字段可选，仅设置传入的属性。

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

设置地表显示属性。

#### Parameters

##### options

[`GeoGlobeOptions`](../interfaces/GeoGlobeOptions.md)

地表配置项；所有字段可选，仅设置传入的属性。

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

设置天空效果

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

设置地形

#### Parameters

##### options

[`GeoTerrainOptions`](../types/GeoTerrainOptions.md)

#### Returns

`void`

#### Example

```ts
engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
```
