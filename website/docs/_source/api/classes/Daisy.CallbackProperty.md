[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / CallbackProperty

# Class: CallbackProperty

A Property whose value is lazily evaluated by a callback function.

## Param

**callback**

The function to be called when the property is evaluated.

## Param

**isConstant**

`true` when the callback function returns the same value every time, `false` if the value will change.

## Constructors

### Constructor

> **new CallbackProperty**(`callback`, `isConstant`): `CallbackProperty`

#### Parameters

##### callback

[`Callback`](../types/Daisy.CallbackProperty.Callback.md)

##### isConstant

`boolean`

#### Returns

`CallbackProperty`

## Properties

### definitionChanged

> `readonly` **definitionChanged**: `Event`

Gets the event that is raised whenever the definition of this property changes.
The definition is changed whenever setCallback is called.

***

### isConstant

> `readonly` **isConstant**: `boolean`

Gets a value indicating if this property is constant.

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

### getValue()

> **getValue**(`time?`, `result?`): `any`

Gets the value of the property.

#### Parameters

##### time?

[`JulianDate`](Daisy.JulianDate.md)

The time for which to retrieve the value. If omitted, the current system time is used.

##### result?

`any`

The object to store the value into, if omitted, a new instance is created and returned.

#### Returns

`any`

The modified result parameter or a new instance if the result parameter was not supplied or is unsupported.

***

### setCallback()

> **setCallback**(`callback`, `isConstant`): `void`

Sets the callback to be used.

#### Parameters

##### callback

[`Callback`](../types/Daisy.CallbackProperty.Callback.md)

The function to be called when the property is evaluated.

##### isConstant

`boolean`

`true` when the callback function returns the same value every time, `false` if the value will change.

#### Returns

`void`
