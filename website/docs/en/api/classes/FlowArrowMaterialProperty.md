[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FlowArrowMaterialProperty

# Class: FlowArrowMaterialProperty

Flow arrow material property

## Implements

- `MaterialProperty`

## Constructors

### Constructor

> **new FlowArrowMaterialProperty**(`options?`): `FlowArrowMaterialProperty`

#### Parameters

##### options?

[`FlowArrowMaterialOptions`](../interfaces/FlowArrowMaterialOptions.md) = `{}`

#### Returns

`FlowArrowMaterialProperty`

## Properties

### definitionChanged

> **definitionChanged**: `Event`\<(...`args`) => `void`\>

Gets the event that is raised whenever the definition of this property changes.
The definition is considered to have changed if a call to getValue would return
a different result for the same time.

#### Implementation of

`Daisy.MaterialProperty.definitionChanged`

***

### isConstant

> **isConstant**: `boolean` = `false`

Gets a value indicating if this property is constant. A property is considered
constant if getValue always returns the same result for the current definition.

#### Implementation of

`Daisy.MaterialProperty.isConstant`

## Accessors

### arrowColor

#### Get Signature

> **get** **arrowColor**(): `Color`

##### Returns

`Color`

#### Set Signature

> **set** **arrowColor**(`value`): `void`

##### Parameters

###### value

[`DColor`](../types/DColor.md)

##### Returns

`void`

***

### arrowSize

#### Get Signature

> **get** **arrowSize**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **arrowSize**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### color

#### Get Signature

> **get** **color**(): `Color`

##### Returns

`Color`

#### Set Signature

> **set** **color**(`value`): `void`

##### Parameters

###### value

[`DColor`](../types/DColor.md)

##### Returns

`void`

***

### direction

#### Get Signature

> **get** **direction**(): [`FlowDirection`](../types/FlowDirection.md)

##### Returns

[`FlowDirection`](../types/FlowDirection.md)

#### Set Signature

> **set** **direction**(`value`): `void`

##### Parameters

###### value

[`FlowDirection`](../types/FlowDirection.md)

##### Returns

`void`

***

### frequency

#### Get Signature

> **get** **frequency**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **frequency**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### speed

#### Get Signature

> **get** **speed**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **speed**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### equals()

> **equals**(`other`): `boolean`

Compares this property to the provided property and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### other

`any`

The other property.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

#### Implementation of

`Daisy.MaterialProperty.equals`

***

### getType()

> **getType**(`_time`): `string`

Gets the Material type at the provided time.

#### Parameters

##### \_time

`JulianDate`

#### Returns

`string`

The type of material.

#### Implementation of

`Daisy.MaterialProperty.getType`

***

### getValue()

> **getValue**(`time`, `result?`): `any`

Gets the value of the property at the provided time.

#### Parameters

##### time

`JulianDate`

The time for which to retrieve the value. If omitted, the current system time is used.

##### result?

`any`

The object to store the value into, if omitted, a new instance is created and returned.

#### Returns

`any`

The modified result parameter or a new instance if the result parameter was not supplied.

#### Implementation of

`Daisy.MaterialProperty.getValue`

***

### resetTime()

> **resetTime**(): `void`

#### Returns

`void`
