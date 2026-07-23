[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Particle

# Class: Particle

A particle emitted by a [ParticleSystem](Daisy.ParticleSystem.md).

## Param

**options**

An object with the following properties:

## Param

**options.mass**

The mass of the particle in kilograms.

## Param

**options.position**

The initial position of the particle in world coordinates.

## Param

**options.velocity**

The velocity vector of the particle in world coordinates.

## Param

**options.life**

The life of the particle in seconds.

## Param

**options.image**

The URI, HTMLImageElement, or HTMLCanvasElement to use for the billboard.

## Param

**options.startColor**

The color of a particle when it is born.

## Param

**options.endColor**

The color of a particle when it dies.

## Param

**options.startScale**

The scale of the particle when it is born.

## Param

**options.endScale**

The scale of the particle when it dies.

## Param

**options.imageSize**

The dimensions, width by height, to scale the particle image in pixels.

## Constructors

### Constructor

> **new Particle**(`options`): `Particle`

#### Parameters

##### options

###### endColor?

[`Color`](Daisy.Color.md)

###### endScale?

`number`

###### image?

`any`

###### imageSize?

[`Cartesian2`](Daisy.Cartesian2.md)

###### life?

`number`

###### mass?

`number`

###### position?

[`Cartesian3`](Daisy.Cartesian3.md)

###### startColor?

[`Color`](Daisy.Color.md)

###### startScale?

`number`

###### velocity?

[`Cartesian3`](Daisy.Cartesian3.md)

#### Returns

`Particle`

## Properties

### age

> **age**: `number`

Gets the age of the particle in seconds.

***

### endColor

> **endColor**: [`Color`](Daisy.Color.md)

The color of the particle when it dies.

***

### endScale

> **endScale**: `number`

The scale of the particle when it dies.

***

### image

> **image**: `any`

The image to use for the particle.

***

### imageSize

> **imageSize**: [`Cartesian2`](Daisy.Cartesian2.md)

The dimensions, width by height, to scale the particle image in pixels.

***

### life

> **life**: `number`

The life of the particle in seconds.

***

### mass

> **mass**: `number`

The mass of the particle in kilograms.

***

### normalizedAge

> **normalizedAge**: `number`

Gets the age normalized to a value in the range [0.0, 1.0].

***

### position

> **position**: [`Cartesian3`](Daisy.Cartesian3.md)

The positon of the particle in world coordinates.

***

### startColor

> **startColor**: [`Color`](Daisy.Color.md)

The color of the particle when it is born.

***

### startScale

> **startScale**: `number`

the scale of the particle when it is born.

***

### velocity

> **velocity**: [`Cartesian3`](Daisy.Cartesian3.md)

The velocity of the particle in world coordinates.
