[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoundBoxOptions

# Interface: BoundBoxOptions

Bound box data

## Properties

### collisionColor?

> `optional` **collisionColor?**: `Color`

Active state color

#### Default

```ts
Color.RED.withAlpha(0.5)
```

***

### collisionScale?

> `optional` **collisionScale?**: `number`

Collision state visualization shell scale factor, only affects rendering, not collision detection.

#### Remarks

Semantic alias of `collisionVisualScale`; when both are provided, `collisionVisualScale` takes precedence.

***

### collisionVisualMode?

> `optional` **collisionVisualMode?**: `"none"` \| `"highlight"`

Collision state visualization mode.

- `none`: Only trigger collision events without changing appearance
- `highlight`: Use collisionColor to highlight on collision, restore after separation

#### Default

```ts
'none'
```

***

### collisionVisualScale?

> `optional` **collisionVisualScale?**: `number`

Collision state visualization shell scale factor, only affects rendering, not collision detection.

#### Default

```ts
1.08
```

***

### color?

> `optional` **color?**: `Color`

Box color

#### Default

```ts
Color.GREEN.withAlpha(0.3)
```

***

### detectCollision?

> `optional` **detectCollision?**: `boolean`

Whether to participate in collision detection.

#### Remarks

Semantic alias of `enableCollision`; when both are provided, `enableCollision` takes precedence.

***

### dimensions

> **dimensions**: `Cartesian3`

Box dimensions (in meters), length/width/height.

#### Default

```ts
new Cartesian3(100, 100, 100)
```

***

### enableCollision?

> `optional` **enableCollision?**: `boolean`

Enable collision detection

#### Default

```ts
false
```

***

### enableCollisionStateShow?

> `optional` **enableCollisionStateShow?**: `boolean`

Enable active (collision process) state

#### Default

```ts
false
```

***

### outlineColor?

> `optional` **outlineColor?**: `Color`

Outline color

#### Default

```ts
Color.BLACK
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width (pixels)

#### Default

```ts
2
```

***

### shape?

> `optional` **shape?**: `"rect"` \| `"ball"`

Shape

- `rect`: Box body (BoxGeometry)
- `ball`: Sphere (EllipsoidGeometry)

#### Default

```ts
'ball'
```

***

### show?

> `optional` **show?**: `boolean`

Whether to show

#### Default

```ts
true
```

***

### visible?

> `optional` **visible?**: `boolean`

Whether to show the collision shell.

#### Remarks

Semantic alias of `show`; when both are provided, `show` takes precedence for backward compatibility.

***

### visualScale?

> `optional` **visualScale?**: `number`

Visualization shell scale factor, only affects rendering, not collision detection.

When the bounding box matches the enclosed entity's dimensions exactly, a slight enlargement prevents transparent faces and wireframes from being occluded by the entity surface.

#### Default

```ts
1.01
```
