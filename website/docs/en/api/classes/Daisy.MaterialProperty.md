[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / MaterialProperty

# Class: MaterialProperty

The interface for all Property objects that represent [Material](Daisy.Material.md) uniforms.
This type defines an interface and cannot be instantiated directly.

## Constructors

### Constructor

> **new MaterialProperty**(): `MaterialProperty`

#### Returns

`MaterialProperty`

## Properties

### definitionChanged

> `readonly` **definitionChanged**: `Event`

Gets the event that is raised whenever the definition of this property changes.
The definition is considered to have changed if a call to getValue would return
a different result for the same time.

***

### isConstant

> `readonly` **isConstant**: `boolean`

Gets a value indicating if this property is constant. A property is considered
constant if getValue always returns the same result for the current definition.

## Methods

### equals()

> **equals**(`other?`): `boolean`

Compares this property to the provided property and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### other?

`Property`

The other property.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### getType()

> **getType**(`time`): `string`

Gets the [Material](Daisy.Material.md) type at the provided time.

#### Parameters

##### time

[`JulianDate`](Daisy.JulianDate.md)

The time for which to retrieve the type.

#### Returns

`string`

The type of material.

***

### getValue()

> **getValue**(`time?`, `result?`): `any`

Gets the value of the property at the provided time.

#### Parameters

##### time?

[`JulianDate`](Daisy.JulianDate.md)

The time for which to retrieve the value. If omitted, the current system time is used.

##### result?

`any`

The object to store the value into, if omitted, a new instance is created and returned.

#### Returns

`any`

The modified result parameter or a new instance if the result parameter was not supplied.
