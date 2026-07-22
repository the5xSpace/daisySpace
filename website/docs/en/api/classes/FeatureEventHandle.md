[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureEventHandle

# Class: FeatureEventHandle

Unified Feature interaction event handle.

- Provides a foolproof external API: onClick / onDblClick / onMouseEnter / onMouseLeave
- Internally implements picking and dispatching through ViewerEventHandle SPACE_ENTITY_* events
- Optional: submits Feature events up to the owning Entity (Feature.enableSubmitToEntity)

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

Release the handle and remove installed ViewerEventHandle listeners.

#### Returns

`void`

void

***

### ensureInstalled()

> **ensureInstalled**(): `void`

Ensure event listeners are installed on ViewerEventHandle.

When the Feature itself has event listeners or has enabled upward submission, installation happens automatically.

#### Returns

`void`

void

## Events

### offClick()

> **offClick**(`handler?`): `void`

Remove click event listener.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not passed, removes all listeners for this event

#### Returns

`void`

void
 click

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

Remove dblclick event listener.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not passed, removes all listeners for this event

#### Returns

`void`

void
 dblclick

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

Remove mouseenter event listener.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not passed, removes all listeners for this event

#### Returns

`void`

void
 mouseenter

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

Remove mouseleave event listener.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not passed, removes all listeners for this event

#### Returns

`void`

void
 mouseleave

***

### onClick()

> **onClick**(`handler`): `void`

Listen for click event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`void`

void
 click

***

### onDblClick()

> **onDblClick**(`handler`): `void`

Listen for dblclick event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`void`

void
 dblclick

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

Listen for mouseenter event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`void`

void
 mouseenter

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

Listen for mouseleave event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`void`

void
 mouseleave
