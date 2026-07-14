[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Credit

# Class: Credit

A credit contains data pertaining to how to display attributions/credits for certain content on the screen.

## Example

```ts
// Create a credit with a tooltip, image and link
const credit = new Daisy.Credit('<a href="https://cesium.com/" target="_blank"></a>');
```

## Param

An string representing an html code snippet

## Param

If true, the credit will be visible in the main credit container. Otherwise, it will appear in a popover. All credits are displayed `inline`, if you have an image we recommend sizing it correctly to match the text or use css to `vertical-align` it.

## Constructors

### Constructor

> **new Credit**(`html`, `showOnScreen?`): `Credit`

#### Parameters

##### html

`string`

##### showOnScreen?

`boolean`

#### Returns

`Credit`

## Properties

### element

> `readonly` **element**: `HTMLElement`

Gets the credit element

***

### html

> `readonly` **html**: `string`

The credit content

***

### showOnScreen

> **showOnScreen**: `boolean`

Whether the credit should be displayed on screen or in a lightbox

## Methods

### equals()

> **equals**(`credit?`): `boolean`

Returns true if the credits are equal

#### Parameters

##### credit?

`Credit`

The credit to compare to.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### clone()

> `static` **clone**(`credit?`): `Credit`

Duplicates a Credit instance.

#### Parameters

##### credit?

`Credit`

The Credit to duplicate.

#### Returns

`Credit`

A new Credit instance that is a duplicate of the one provided. (Returns undefined if the credit is undefined)

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Returns true if the credits are equal

#### Parameters

##### left?

`Credit`

The first credit

##### right?

`Credit`

The second credit

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.
