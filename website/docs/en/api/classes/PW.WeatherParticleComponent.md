[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / WeatherParticleComponent

# Class: WeatherParticleComponent

Camera weather-particle component.

This component is the physical-world wrapper for ParticleFeature and is suited to natural particles such as rain, snow, fog, and clouds:
- Particles belong to world space and can have velocity, a lifetime, and natural spreading.
- The component places the emitter volume in front of the camera so local weather remains visible as the user moves closer or farther away.
- It is not intended for rocket exhaust or aircraft contrails. Exhaust is strongly host-bound and focused on a target, so use CapsuleParticleFeature or JetEngine's `capsule-sprite` rendering pipeline.

## Extends

- [`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md)

## Constructors

### Constructor

> **new WeatherParticleComponent**(`options?`): `WeatherParticleComponent`

#### Parameters

##### options?

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md) = `{}`

#### Returns

`WeatherParticleComponent`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`constructor`](PW.CameraWeatherParticleComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

Component-level Transformer (optional).

Recommended for representing installation or physical-reference transforms instead of modifying Entity.transformer.

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`transformer`](PW.CameraWeatherParticleComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"WeatherParticleComponent"`

Component type identifier. Subclasses must override it.

#### Overrides

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`type`](PW.CameraWeatherParticleComponent.md#type)

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register()
- Can also be specified manually to align with an external system id

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register()
- Can also be specified manually to align with an external system id

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`id`](PW.CameraWeatherParticleComponent.md#id)

***

### name

#### Get Signature

> **get** **name**(): `string`

Sets the component name for lookup and management by name.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Sets the component name for lookup and management by name.

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`name`](PW.CameraWeatherParticleComponent.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

##### Returns

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

##### Parameters

###### value

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

##### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`options`](PW.CameraWeatherParticleComponent.md#options)

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`registered`](PW.CameraWeatherParticleComponent.md#registered)

## Methods

### destroy()

> **destroy**(): `void`

Destroys the component and its internal resources.

#### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`destroy`](PW.CameraWeatherParticleComponent.md#destroy)

***

### register()

> **register**(`object`): [`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md)

Registers the component with a physical object.

Subclasses typically create or bind an internal rendering adapter (Feature) or initialize resources here.

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md)

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`register`](PW.CameraWeatherParticleComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

Resets temporary state preserved across time cycles.

When simulation time moves backward or loops to its start, the host object calls this method so the component can clear cross-frame caches.

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`resetTemporalState`](PW.CameraWeatherParticleComponent.md#resettemporalstate)

***

### setEnabled()

> **setEnabled**(`enabled`): `this`

#### Parameters

##### enabled

`boolean`

#### Returns

`this`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`setEnabled`](PW.CameraWeatherParticleComponent.md#setenabled)

***

### setIntensity()

> **setIntensity**(`intensity`): `this`

#### Parameters

##### intensity

`number`

#### Returns

`this`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`setIntensity`](PW.CameraWeatherParticleComponent.md#setintensity)

***

### setPreset()

> **setPreset**(`preset`): `this`

#### Parameters

##### preset

[`WeatherParticlePreset`](../types/PW.WeatherParticlePreset.md)

#### Returns

`this`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`setPreset`](PW.CameraWeatherParticleComponent.md#setpreset)

***

### unregister()

> **unregister**(): `void`

Unloads the component from the physical object without destroying the component instance, which can be used for temporary disabling.

#### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`unregister`](PW.CameraWeatherParticleComponent.md#unregister)

***

### update()

> **update**(`spaceObject`, `_time`): `void`

Updates every frame, driven by simulation time.

#### Parameters

##### spaceObject

[`Entity`](Entity.md)

##### \_time

`JulianDate`

#### Returns

`void`

#### Inherited from

[`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md).[`update`](PW.CameraWeatherParticleComponent.md#update)
