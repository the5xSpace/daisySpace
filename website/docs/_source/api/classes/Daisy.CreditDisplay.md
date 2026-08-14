[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / CreditDisplay

# Class: CreditDisplay

The credit display is responsible for displaying credits on screen.

## Examples

```ts
// Add a credit with a tooltip, image and link to display onscreen
const credit = new Daisy.Credit(`<a href="https://cesium.com/" target="_blank"></a>`, true);
viewer.creditDisplay.addStaticCredit(credit);
```

```ts
// Add a credit with a plaintext link to display in the lightbox
const credit = new Daisy.Credit('<a href="https://cesium.com/" target="_blank"></a>');
viewer.creditDisplay.addStaticCredit(credit);
```

## Param

The HTML element where credits will be displayed

## Param

The string to separate text credits

## Param

The HTML element that will contain the credits popup

## Constructors

### Constructor

> **new CreditDisplay**(`container`, `delimiter?`, `viewport?`): `CreditDisplay`

#### Parameters

##### container

`HTMLElement`

##### delimiter?

`string`

##### viewport?

`HTMLElement`

#### Returns

`CreditDisplay`

## Properties

### container

> **container**: `HTMLElement`

The HTML element where credits will be displayed.

***

### cesiumCredit

> `static` **cesiumCredit**: [`Credit`](Daisy.Credit.md)

Gets or sets the logo credit.

## Methods

### addCreditToNextFrame()

> **addCreditToNextFrame**(`credit`): `void`

Adds a [Credit](Daisy.Credit.md) that will show on screen or in the lightbox until
the next frame. This is mostly for internal use. Use [CreditDisplay.addStaticCredit](#addstaticcredit) to add a persistent credit to the screen.

#### Parameters

##### credit

[`Credit`](Daisy.Credit.md)

The credit to display in the next frame.

#### Returns

`void`

***

### addStaticCredit()

> **addStaticCredit**(`credit`): `void`

Adds a [Credit](Daisy.Credit.md) that will show on screen or in the lightbox until removed with [CreditDisplay.removeStaticCredit](#removestaticcredit).

#### Parameters

##### credit

[`Credit`](Daisy.Credit.md)

The credit to added

#### Returns

`void`

#### Examples

```ts
// Add a credit with a tooltip, image and link to display onscreen
const credit = new Daisy.Credit(`<a href="https://cesium.com/" target="_blank"></a>`, true);
viewer.creditDisplay.addStaticCredit(credit);
```

```ts
// Add a credit with a plaintext link to display in the lightbox
const credit = new Daisy.Credit('<a href="https://cesium.com/" target="_blank"></a>');
viewer.creditDisplay.addStaticCredit(credit);
```

***

### beginFrame()

> **beginFrame**(): `void`

Resets the credit display to a beginning of frame state, clearing out current credits.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Destroys the resources held by this object. Destroying an object allows for deterministic
release of resources, instead of relying on the garbage collector to destroy this object.



Once an object is destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception. Therefore,
assign the return value (`undefined`) to the object as done in the example.

#### Returns

`void`

***

### endFrame()

> **endFrame**(): `void`

Sets the credit display to the end of frame state, displaying credits from the last frame in the credit container.

#### Returns

`void`

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.




#### Returns

`boolean`

`true` if this object was destroyed; otherwise, `false`.

***

### removeStaticCredit()

> **removeStaticCredit**(`credit`): `void`

Removes a static credit shown on screen or in the lightbox.

#### Parameters

##### credit

[`Credit`](Daisy.Credit.md)

The credit to be removed.

#### Returns

`void`

***

### update()

> **update**(): `void`

Updates the credit display before a new frame is rendered.

#### Returns

`void`
