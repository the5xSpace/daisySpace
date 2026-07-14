[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [ParticleSystem](../modules/Daisy.ParticleSystem.md) / updateCallback

# Type Alias: updateCallback

> **updateCallback** = (`particle`, `dt`) => `void`

A function used to modify attributes of the particle at each time step. This can include force modifications,
color, sizing, etc.

## Parameters

### particle

[`Particle`](../classes/Daisy.Particle.md)

The particle being updated.

### dt

`number`

The time in seconds since the last update.

## Returns

`void`

## Example

```ts
function applyGravity(particle, dt) {
 const position = particle.position;
 const gravityVector = Daisy.Cartesian3.normalize(position, new Daisy.Cartesian3());
 Daisy.Cartesian3.multiplyByScalar(gravityVector, GRAVITATIONAL_CONSTANT * dt, gravityVector);
 particle.velocity = Daisy.Cartesian3.add(particle.velocity, gravityVector, particle.velocity);
}
```
