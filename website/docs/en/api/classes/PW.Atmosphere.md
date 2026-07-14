[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Atmosphere

# Class: Atmosphere

行星大气参数容器

- 封装 Rayleigh/Mie 散射、吸收与强度等物理参数
- 提供 getUniforms 将参数转换为材质 uniforms，供渲染使用
- 与 CelestialAtmosphereFeature 搭配，在场景中显示大气层散射效果

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

构造函数

#### Parameters

##### options

[`AtmosphereOptions`](../types/PW.AtmosphereOptions.md)

大气物理参数

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

将大气物理参数转换为材质 uniforms

#### Returns

[`AtmosphereUniforms`](../types/PW.AtmosphereUniforms.md)

可直接用于 Daisy.Material fabric.uniforms 的对象

#### Example

```ts
const uniforms = atmosphere.getUniforms();
const material = new Daisy.Material({
 fabric: { type: "DaisyCelestialAtmosphere", uniforms }
});
```
