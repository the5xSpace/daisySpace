[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [UI](../modules/UI.md) / PopoverVisibilityChangeEvent

# Interface: PopoverVisibilityChangeEvent

## Properties

### entity?

> `optional` **entity?**: [`Entity`](../classes/Entity.md)

Bound entity, if registered.

***

### feature

> **feature**: [`PopoverFeature`](../classes/UI.PopoverFeature.md)

Source feature.

***

### reason

> **reason**: [`PopoverVisibilityChangeReason`](../types/UI.PopoverVisibilityChangeReason.md)

Why the state changed.

***

### rendered

> **rendered**: `boolean`

Whether the DOM is actually rendered in the current frame.
Whether the DOM is actually visible in the current frame; distance, occlusion, and off-screen conditions may cause it to be false.

***

### visible

> **visible**: `boolean`

Whether the popover is requested to be open.
由触发器/API 决定的“请求显示”状态。
