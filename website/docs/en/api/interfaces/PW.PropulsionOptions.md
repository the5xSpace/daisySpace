[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / PropulsionOptions

# Interface: PropulsionOptions

## Properties

### enabled?

> `optional` **enabled?**: `boolean`

Whether to enable the propulsion device.

***

### id?

> `optional` **id?**: `string`

Propulsion device id. Generated automatically by BaseComponent when not provided.

***

### name?

> `optional` **name?**: `string`

Propulsion device name, recommended as a business search key.

***

### particle?

> `optional` **particle?**: `false` \| [`PropulsionParticleOptions`](../types/PW.PropulsionParticleOptions.md)

Particle plume configuration. Set to false to disable visual effects and keep only the state component.

***

### position?

> `optional` **position?**: `Cartesian3`

Position of the propulsion device relative to the host entity's local coordinate system.

***

### power?

> `optional` **power?**: `number`

Thrust/eruption intensity, range 0~1. Currently only affects visualization.

***

### rotation?

> `optional` **rotation?**: [`Rotation`](../types/Rotation.md)

Mounting orientation of the propulsion device relative to the host entity's local coordinate system.

***

### scale?

> `optional` **scale?**: `Cartesian3`

Local scale of the propulsion device.
