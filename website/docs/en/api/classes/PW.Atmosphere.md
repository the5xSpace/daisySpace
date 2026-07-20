[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Atmosphere

# Class: Atmosphere

Planetary atmosphere parameter container

- Encapsulates Rayleigh/Mie scattering, absorption, intensity, and other physical parameters
- Provides getUniforms to convert parameters into material uniforms for rendering
- Works with CelestialAtmosphereFeature to display atmospheric scattering effects in the scene

## Example

```ts
import { Atmosphere, CelestialAtmosphereFeature, CelestialEllipsoid } from "daisy-space-sdk";

// 定义火星大气参数
const atmosphere = new Atmosphere({
 planetRadius: Daisy.ELLIPSOID.MARS.maximumRadius,
 atmosphereRadius: Daisy.ELLIPSOID.MARS.maximumRadius + 80000,
 rayleighScaleHeight: 110000,
 mieScaleHeight: 1200,
 rayleighScattering: new Daisy.Cartesian3(1.0e-7, 1.1e-7, 1.2e-7),
 mieScattering: new Daisy.Cartesian3(8.0e-7, 7.0e-7, 6.0e-7),
 mieAnisotropy: 0.8,
 absorption: new Daisy.Cartesian3(0.0, 0.0004, 0.0006),
 intensity: 0,
 steps: 12,
});

// 绑定到特性并显示
const feature = new CelestialAtmosphereFeature({
 atmosphere,
 celestial: CelestialEllipsoid.Mars(),
 show: true,
});
feature.bindViewer(viewer);
```

## Constructors

### Constructor

> **new Atmosphere**(`options`): `Atmosphere`

Constructor

#### Parameters

##### options

[`AtmosphereOptions`](../types/PW.AtmosphereOptions.md)

Atmospheric physical parameters

#### Returns

`Atmosphere`

## Accessors

### options

#### Get Signature

> **get** **options**(): [`AtmosphereOptions`](../types/PW.AtmosphereOptions.md)

##### Returns

[`AtmosphereOptions`](../types/PW.AtmosphereOptions.md)

## Methods

### getUniforms()

> **getUniforms**(): [`AtmosphereUniforms`](../types/PW.AtmosphereUniforms.md)

Converts atmospheric physical parameters into material uniforms

#### Returns

[`AtmosphereUniforms`](../types/PW.AtmosphereUniforms.md)

An object that can be directly used in Daisy.Material fabric.uniforms

#### Example

```ts
const uniforms = atmosphere.getUniforms();
const material = new Daisy.Material({
 fabric: { type: "DaisyCelestialAtmosphere", uniforms }
});
```
