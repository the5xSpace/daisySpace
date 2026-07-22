[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialAtmosphereFeature

# Class: CelestialAtmosphereFeature

Celestial Atmosphere Rendering Feature

- When bound to an Engine, creates a semi-transparent atmosphere sphere and updates the sun direction each frame
- Used together with CelestialEllipsoid and Atmosphere

## Example

```ts
const atmosphere = new Atmosphere({
 planetRadius: Daisy.ELLIPSOID.MOON.maximumRadius,
 atmosphereRadius: Daisy.ELLIPSOID.MOON.maximumRadius + 80000,
 rayleighScaleHeight: 90000,
 mieScaleHeight: 1200,
 rayleighScattering: new Daisy.Cartesian3(1.0e-7, 1.1e-7, 1.2e-7),
 mieScattering: new Daisy.Cartesian3(8.0e-7, 7.0e-7, 6.0e-7),
 mieAnisotropy: 0.8,
 intensity: 0,
 steps: 12,
});

const feature = new CelestialAtmosphereFeature({
 atmosphere,
 celestial: CelestialEllipsoid.Moon(),
 show: true,
});
feature.bindViewer(viewer);
```

## Constructors

### Constructor

> **new CelestialAtmosphereFeature**(`options`): `CelestialAtmosphereFeature`

Constructor

#### Parameters

##### options

`Options`

Atmosphere rendering configuration

#### Returns

`CelestialAtmosphereFeature`

#### Example

```ts
const feature = new CelestialAtmosphereFeature({
 atmosphere,
 celestial: CelestialEllipsoid.Mars(),
 show: true,
});
```

## Methods

### bindEngine()

> **bindEngine**(`engine`): `void`

Binds to Engine and creates rendering objects

#### Parameters

##### engine

[`Engine`](Engine.md)

Daisy Engine

#### Returns

`void`

#### Example

```ts
feature.bindEngine(engine);
```

***

### ~~bindViewer()~~

> **bindViewer**(`viewer`): `void`

Compatibility alias: binds to Engine and creates rendering objects.

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`void`

#### Deprecated

Use bindEngine instead

***

### destroy()

> **destroy**(): `void`

Destroys and releases resources

#### Returns

`void`

#### Example

```ts
feature.destroy();
```

***

### setShow()

> **setShow**(`show`): `void`

Sets show/hide

#### Parameters

##### show

`boolean`

Whether to show

#### Returns

`void`

#### Example

```ts
feature.setShow(false);
```
