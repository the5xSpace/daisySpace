[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureEventHandle

# Class: FeatureEventHandle

统一的 Feature 交互事件句柄。

- 对外提供傻瓜式 API：onClick / onDblClick / onMouseEnter / onMouseLeave
- 内部通过 ViewerEventHandle 的 SPACE_ENTITY_* 事件实现拾取分发
- 可选：把 Feature 事件向上提交到所属 Entity（Feature.enableSubmitToEntity）

## Constructors

### Constructor

> **new FeatureEventHandle**(`feature`): `FeatureEventHandle`

#### Parameters

##### feature

[`FeatureEventHandleHost`](../types/FeatureEventHandleHost.md)

#### Returns

`FeatureEventHandle`

## Methods

### destroy()

> **destroy**(): `void`

释放句柄并移除已安装的 ViewerEventHandle 监听。

#### Returns

`void`

void

***

### ensureInstalled()

> **ensureInstalled**(): `void`

确保事件监听已安装到 ViewerEventHandle。

当 Feature 自身有事件监听，或启用了向上提交时，会自动安装。

#### Returns

`void`

void

## Events

### offClick()

> **offClick**(`handler?`): `void`

取消监听 click 事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`void`

void
 click

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

取消监听 dblclick 事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`void`

void
 dblclick

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

取消监听 mouseenter 事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`void`

void
 mouseenter

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

取消监听 mouseleave 事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`void`

void
 mouseleave

***

### onClick()

> **onClick**(`handler`): `void`

监听 click 事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`void`

void
 click

***

### onDblClick()

> **onDblClick**(`handler`): `void`

监听 dblclick 事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`void`

void
 dblclick

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

监听 mouseenter 事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`void`

void
 mouseenter

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

监听 mouseleave 事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`void`

void
 mouseleave
