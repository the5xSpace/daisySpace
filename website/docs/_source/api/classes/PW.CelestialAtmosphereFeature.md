[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialAtmosphereFeature

# Class: CelestialAtmosphereFeature

天体大气层渲染特性

- 绑定到 Engine 后，会创建半透明大气球体并在每帧更新太阳方向
- 与 CelestialEllipsoid 和 Atmosphere 搭配使用

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

构造函数

#### Parameters

##### options

`Options`

大气渲染配置

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

绑定到 Engine 并创建渲染对象

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

兼容旧名：绑定到 Engine 并创建渲染对象。

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`void`

#### Deprecated

请使用 bindEngine

***

### destroy()

> **destroy**(): `void`

销毁并释放资源

#### Returns

`void`

#### Example

```ts
feature.destroy();
```

***

### setShow()

> **setShow**(`show`): `void`

设置显示/隐藏

#### Parameters

##### show

`boolean`

是否显示

#### Returns

`void`

#### Example

```ts
feature.setShow(false);
```
