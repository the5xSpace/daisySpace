[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObjectConfig

# Type Alias: FreeObjectConfig

> **FreeObjectConfig** = [`BaseObjectConfigBase`](PW.BaseObjectConfigBase.md) & `object`

FreeObject configuration at the semantic layer.

Features:
- Organized as optional Features such as model, text, image, and path.
- Pass `false` to any field to disable or remove that Feature type.
- Some fields accept arrays to mount multiple Features of the same type at once, such as multiple images or polylines.

## Type Declaration

### arrowPoint?

> `optional` **arrowPoint?**: [`ArrowPointerOptions`](ArrowPointerOptions.md) \| [`ArrowPointerOptions`](ArrowPointerOptions.md)[] \| `false`

Arrow-pointer configuration, either one item or multiple items.
- `false`: removes the arrow pointer.

### collisionBall?

> `optional` **collisionBall?**: [`FreeObjectCollisionBallOptions`](PW.FreeObjectCollisionBallOptions.md) \| `false`

Collision-ball configuration.
- `false`: removes the collision ball.

### cube?

> `optional` **cube?**: [`CubeOptions`](../interfaces/CubeOptions.md) \| [`CubeOptions`](../interfaces/CubeOptions.md)[] \| `false`

Cube configuration, either one item or multiple items.
- `false`: removes the cube.

### image?

> `optional` **image?**: [`ImageOptions`](ImageOptions.md) \| [`ImageOptions`](ImageOptions.md)[] \| `false`

Image configuration, either one item or multiple items.
- `false`: removes the image.

### model?

> `optional` **model?**: [`ModelOptions`](../interfaces/ModelOptions.md) \| `false`

Model configuration.
- `false`: removes the model.

### name?

> `optional` **name?**: `string`

Object name, written to the host Entity name.

### path?

> `optional` **path?**: `Parameters`\<[`Entity`](../classes/Entity.md)\[`"setPath"`\]\>\[`0`\] \| `false`

Path configuration, corresponding to Entity.setPath.
- `false`: removes the path.

### point?

> `optional` **point?**: [`PointComOptions`](../interfaces/PointComOptions.md) \| [`PointComOptions`](../interfaces/PointComOptions.md)[] \| `false`

Point-feature configuration, either one item or multiple items.
- `false`: removes the point Feature.

### polyline?

> `optional` **polyline?**: [`PolylineOptions`](PolylineOptions.md) \| [`PolylineOptions`](PolylineOptions.md)[] \| `false`

Polyline-feature configuration, either one item or multiple items.
- `false`: removes the polyline.

### popover?

> `optional` **popover?**: [`PopoverOptions`](../interfaces/UI.PopoverOptions.md) \| `false`

Popover configuration for a floating information panel.
- `false`: removes the popover.

### position?

> `optional` **position?**: [`ObjectPositon`](PW.ObjectPositon.md)

Initial position.

#### Default

```ts
Daisy.Cartesian3.ZERO
```

### sensor?

> `optional` **sensor?**: \[\]

Sensor configuration, reserved for future use.

FreeObject does not process this field directly. Use the Vehicle/Aircraft addSensor API instead.

### text?

> `optional` **text?**: [`TextOptions`](../interfaces/TextOptions.md) \| [`TextOptions`](../interfaces/TextOptions.md)[] \| `false`

Text configuration, either one item or multiple items.
- `false`: removes the text.
