[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObjectCollisionBallOptions

# Type Alias: FreeObjectCollisionBallOptions

> **FreeObjectCollisionBallOptions** = [`BaseObjectTransformTimeline`](PW.BaseObjectTransformTimeline.md) & `object`

Collision ball configuration for simple visual collision body and collision state display.

## Type Declaration

### collisionColor?

> `optional` **collisionColor?**: `Daisy.Color`

Collision state color.

### color?

> `optional` **color?**: `Daisy.Color`

Default color (no collision).

### enableCollision?

> `optional` **enableCollision?**: `boolean`

Whether to enable collision detection (depends on the host entity's collision implementation).

#### Default

```ts
false
```

### enableCollisionStateShow?

> `optional` **enableCollisionStateShow?**: `boolean`

Whether to automatically switch color display based on collision state.

#### Default

```ts
false
```

### outlineColor?

> `optional` **outlineColor?**: `Daisy.Color`

Outline color.

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width (pixels).

### radius

> **radius**: `number`

Radius (meters).

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```
