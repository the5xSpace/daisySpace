[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ParticleBurst

# Class: ParticleBurst

Represents a burst of [Particle](Daisy.Particle.md)s from a [ParticleSystem](Daisy.ParticleSystem.md) at a given time in the systems lifetime.

## Param

An object with the following properties:

## Param

The time in seconds after the beginning of the particle system's lifetime that the burst will occur.

## Param

The minimum number of particles emmitted in the burst.

## Param

The maximum number of particles emitted in the burst.

## Constructors

### Constructor

> **new ParticleBurst**(`options?`): `ParticleBurst`

#### Parameters

##### options?

###### maximum?

`number`

###### minimum?

`number`

###### time?

`number`

#### Returns

`ParticleBurst`

## Properties

### complete

> **complete**: `boolean`

`true` if the burst has been completed; `false` otherwise.

***

### maximum

> **maximum**: `number`

The maximum number of particles emitted.

***

### minimum

> **minimum**: `number`

The minimum number of particles emitted.

***

### time

> **time**: `number`

The time in seconds after the beginning of the particle system's lifetime that the burst will occur.
