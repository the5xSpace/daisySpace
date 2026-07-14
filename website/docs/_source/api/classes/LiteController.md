[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / LiteController

# Class: LiteController

精简模式控制器。

仅包含浮动控制面板，不包含键盘快捷键等高级控制组件。
适用于对 UI 复杂度要求较低的场景。

## Constructors

### Constructor

> **new LiteController**(`daisy`, `mount`): `LiteController`

创建精简控制器。

#### Parameters

##### daisy

`DaisyUIManager`

DaisyUIManager 实例。

##### mount

`HTMLElement`

挂载 DOM 容器。

#### Returns

`LiteController`

## Properties

### root

> **root**: `HTMLDivElement`

控制器根 DOM 元素。

## Methods

### destroy()

> **destroy**(): `void`

销毁控制器并释放资源。

#### Returns

`void`
