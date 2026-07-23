[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ParticleSystem

# Class: ParticleSystem

A ParticleSystem manages the updating and display of a collection of particles.

## Param

**options**

Object with the following properties:

## Param

**options.show**

Whether to display the particle system.

## Param

**options.updateCallback**

The callback function to be called each frame to update a particle.

## Param

**options.emitter**

The particle emitter for this system.

## Param

**options.modelMatrix**

The 4x4 transformation matrix that transforms the particle system from model to world coordinates.

## Param

**options.emitterModelMatrix**

The 4x4 transformation matrix that transforms the particle system emitter within the particle systems local coordinate system.

## Param

**options.emissionRate**

The number of particles to emit per second.

## Param

**options.bursts**

An array of [ParticleBurst](Daisy.ParticleBurst.md), emitting bursts of particles at periodic times.

## Param

**options.loop**

Whether the particle system should loop its bursts when it is complete.

## Param

**options.scale**

Sets the scale to apply to the image of the particle for the duration of its particleLife.

## Param

**options.startScale**

The initial scale to apply to the image of the particle at the beginning of its life.

## Param

**options.endScale**

The final scale to apply to the image of the particle at the end of its life.

## Param

**options.color**

Sets the color of a particle for the duration of its particleLife.

## Param

**options.startColor**

The color of the particle at the beginning of its life.

## Param

**options.endColor**

The color of the particle at the end of its life.

## Param

**options.image**

The URI, HTMLImageElement, or HTMLCanvasElement to use for the billboard.

## Param

**options.imageSize**

If set, overrides the minimumImageSize and maximumImageSize inputs that scale the particle image's dimensions in pixels.

## Param

**options.minimumImageSize**

Sets the minimum bound, width by height, above which to randomly scale the particle image's dimensions in pixels.

## Param

**options.maximumImageSize**

Sets the maximum bound, width by height, below which to randomly scale the particle image's dimensions in pixels.

## Param

**options.sizeInMeters**

Sets if the size of particles is in meters or pixels. `true` to size the particles in meters; otherwise, the size is in pixels.

## Param

**options.speed**

If set, overrides the minimumSpeed and maximumSpeed inputs with this value.

## Param

**options.minimumSpeed**

Sets the minimum bound in meters per second above which a particle's actual speed will be randomly chosen.

## Param

**options.maximumSpeed**

Sets the maximum bound in meters per second below which a particle's actual speed will be randomly chosen.

## Param

**options.lifetime**

How long the particle system will emit particles, in seconds.

## Param

**options.particleLife**

If set, overrides the minimumParticleLife and maximumParticleLife inputs with this value.

## Param

**options.minimumParticleLife**

Sets the minimum bound in seconds for the possible duration of a particle's life above which a particle's actual life will be randomly chosen.

## Param

**options.maximumParticleLife**

Sets the maximum bound in seconds for the possible duration of a particle's life below which a particle's actual life will be randomly chosen.

## Param

**options.mass**

Sets the minimum and maximum mass of particles in kilograms.

## Param

**options.minimumMass**

Sets the minimum bound for the mass of a particle in kilograms. A particle's actual mass will be chosen as a random amount above this value.

## Param

**options.maximumMass**

Sets the maximum mass of particles in kilograms. A particle's actual mass will be chosen as a random amount below this value.

## Constructors

### Constructor

> **new ParticleSystem**(`options?`): `ParticleSystem`

#### Parameters

##### options?

###### bursts?

[`ParticleBurst`](Daisy.ParticleBurst.md)[]

###### color?

[`Color`](Daisy.Color.md)

###### emissionRate?

`number`

###### emitter?

[`ParticleEmitter`](Daisy.ParticleEmitter.md)

###### emitterModelMatrix?

[`Matrix4`](Daisy.Matrix4.md)

###### endColor?

[`Color`](Daisy.Color.md)

###### endScale?

`number`

###### image?

`any`

###### imageSize?

[`Cartesian2`](Daisy.Cartesian2.md)

###### lifetime?

`number`

###### loop?

`boolean`

###### mass?

`number`

###### maximumImageSize?

[`Cartesian2`](Daisy.Cartesian2.md)

###### maximumMass?

`number`

###### maximumParticleLife?

`number`

###### maximumSpeed?

`number`

###### minimumImageSize?

[`Cartesian2`](Daisy.Cartesian2.md)

###### minimumMass?

`number`

###### minimumParticleLife?

`number`

###### minimumSpeed?

`number`

###### modelMatrix?

[`Matrix4`](Daisy.Matrix4.md)

###### particleLife?

`number`

###### scale?

`number`

###### show?

`boolean`

###### sizeInMeters?

`boolean`

###### speed?

`number`

###### startColor?

[`Color`](Daisy.Color.md)

###### startScale?

`number`

###### updateCallback?

[`updateCallback`](../types/Daisy.ParticleSystem.updateCallback.md)

#### Returns

`ParticleSystem`

## Properties

### bursts

> **bursts**: [`ParticleBurst`](Daisy.ParticleBurst.md)[]

An array of [ParticleBurst](Daisy.ParticleBurst.md), emitting bursts of particles at periodic times.

***

### complete

> **complete**: `Event`

Fires an event when the particle system has reached the end of its lifetime.

***

### emissionRate

> **emissionRate**: `number`

The number of particles to emit per second.

***

### emitter

> **emitter**: [`ParticleEmitter`](Daisy.ParticleEmitter.md)

The particle emitter for this

***

### emitterModelMatrix

> **emitterModelMatrix**: [`Matrix4`](Daisy.Matrix4.md)

The 4x4 transformation matrix that transforms the particle system emitter within the particle systems local coordinate system.

***

### endColor

> **endColor**: [`Color`](Daisy.Color.md)

The color of the particle at the end of its life.

***

### endScale

> **endScale**: `number`

The final scale to apply to the image of the particle at the end of its life.

***

### image

> **image**: `any`

The URI, HTMLImageElement, or HTMLCanvasElement to use for the billboard.

***

### isComplete

> **isComplete**: `boolean`

When `true`, the particle system has reached the end of its lifetime; `false` otherwise.

***

### lifetime

> **lifetime**: `number`

How long the particle system will emit particles, in seconds.

***

### loop

> **loop**: `boolean`

Whether the particle system should loop it's bursts when it is complete.

***

### maximumImageSize

> **maximumImageSize**: [`Cartesian2`](Daisy.Cartesian2.md)

Sets the maximum bound, width by height, below which to randomly scale the particle image's dimensions in pixels.

***

### maximumMass

> **maximumMass**: `number`

Sets the maximum mass of particles in kilograms.

***

### maximumParticleLife

> **maximumParticleLife**: `number`

Sets the maximum bound in seconds for the possible duration of a particle's life below which a particle's actual life will be randomly chosen.

***

### maximumSpeed

> **maximumSpeed**: `number`

Sets the maximum bound in meters per second below which a particle's actual speed will be randomly chosen.

***

### minimumImageSize

> **minimumImageSize**: [`Cartesian2`](Daisy.Cartesian2.md)

Sets the minimum bound, width by height, above which to randomly scale the particle image's dimensions in pixels.

***

### minimumMass

> **minimumMass**: `number`

Sets the minimum mass of particles in kilograms.

***

### minimumParticleLife

> **minimumParticleLife**: `number`

Sets the minimum bound in seconds for the possible duration of a particle's life above which a particle's actual life will be randomly chosen.

***

### minimumSpeed

> **minimumSpeed**: `number`

Sets the minimum bound in meters per second above which a particle's actual speed will be randomly chosen.

***

### modelMatrix

> **modelMatrix**: [`Matrix4`](Daisy.Matrix4.md)

The 4x4 transformation matrix that transforms the particle system from model to world coordinates.

***

### show

> **show**: `boolean`

Whether to display the particle system.

***

### sizeInMeters

> **sizeInMeters**: `boolean`

Gets or sets if the particle size is in meters or pixels. `true` to size particles in meters; otherwise, the size is in pixels.

***

### startColor

> **startColor**: [`Color`](Daisy.Color.md)

The color of the particle at the beginning of its life.

***

### startScale

> **startScale**: `number`

The initial scale to apply to the image of the particle at the beginning of its life.

***

### updateCallback

> **updateCallback**: [`updateCallback`](../types/Daisy.ParticleSystem.updateCallback.md)

An array of force callbacks. The callback is passed a [Particle](Daisy.Particle.md) and the difference from the last time

## Methods

### destroy()

> **destroy**(): `void`

Destroys the WebGL resources held by this object. Destroying an object allows for deterministic
release of WebGL resources, instead of relying on the garbage collector to destroy this object.



Once an object is destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception. Therefore,
assign the return value (`undefined`) to the object as done in the example.

#### Returns

`void`

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.



If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.

#### Returns

`boolean`

`true` if this object was destroyed; otherwise, `false`.
