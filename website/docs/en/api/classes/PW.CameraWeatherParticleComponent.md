[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CameraWeatherParticleComponent

# Class: CameraWeatherParticleComponent

Camera weather particle component.

This component is a physical-world wrapper around ParticleFeature, suitable for natural particles such as rain, snow, fog, and clouds:
- Particles belong to world space and can have velocity, a lifetime, and natural dispersion.
- The component places the emitter volume in front of the camera, maintaining a localized weather effect as the user moves closer or farther away.
- It is not intended for rocket flames or aircraft contrails. Flame bodies are strongly host-bound, focused targets and should use the
  CapsuleParticleFeature or JetEngine `capsule-sprite` rendering pipeline.

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Extended by

- [`WeatherParticleComponent`](PW.WeatherParticleComponent.md)

## Constructors

### Constructor

> **new CameraWeatherParticleComponent**(`options?`): `CameraWeatherParticleComponent`

#### Parameters

##### options?

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md) = `{}`

#### Returns

`CameraWeatherParticleComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`constructor`](PW.BaseComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

Optional component-level Transformer.

Recommended for representing an "installation/physical reference" transform rather than polluting Entity.transformer.

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`transformer`](PW.BaseComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"CameraWeatherParticleComponent"`

Component type identifier. Subclasses must override it.

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register().
- Can also be specified manually by the application to align with an external system id.

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register().
- Can also be specified manually by the application to align with an external system id.

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`id`](PW.BaseComponent.md#id)

***

### name

#### Get Signature

> **get** **name**(): `string`

Sets the component name, used for lookup and management by name.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Sets the component name, used for lookup and management by name.

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`name`](PW.BaseComponent.md#name)

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

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`registered`](PW.BaseComponent.md#registered)

## Methods

### destroy()

> **destroy**(): `void`

Destroys the component and its internal resources.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### register()

> **register**(`object`): `CameraWeatherParticleComponent`

Registers the component on a physical object.

Subclasses usually create or bind an internal rendering adapter (Feature) or initialize resources here.

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`CameraWeatherParticleComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

Resets temporary state retained across time loops.

When simulation time moves backward or loops back to its start, the host object calls this method so the component can clear frame-spanning caches.

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

***

### setEnabled()

> **setEnabled**(`enabled`): `this`

#### Parameters

##### enabled

`boolean`

#### Returns

`this`

***

### setIntensity()

> **setIntensity**(`intensity`): `this`

#### Parameters

##### intensity

`number`

#### Returns

`this`

***

### setPreset()

> **setPreset**(`preset`): `this`

#### Parameters

##### preset

[`WeatherParticlePreset`](../types/PW.WeatherParticlePreset.md)

#### Returns

`this`

***

### unregister()

> **unregister**(): `void`

Unregisters the component from the physical object without destroying the component instance; useful for temporarily disabling it.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

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

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
