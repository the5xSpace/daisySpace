[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / LiteController

# Class: LiteController

Lite mode controller.

Includes only the floating control panel, without advanced control components such as keyboard shortcuts.
Suitable for scenarios with low UI complexity requirements.

## Constructors

### Constructor

> **new LiteController**(`daisy`, `mount`): `LiteController`

Creates the lite controller.

#### Parameters

##### daisy

`DaisyUIManager`

DaisyUIManager instance.

##### mount

`HTMLElement`

Mount DOM container.

#### Returns

`LiteController`

## Properties

### root

> **root**: `HTMLDivElement`

Controller root DOM element.

## Methods

### destroy()

> **destroy**(): `void`

Destroys the controller and releases resources.

#### Returns

`void`
