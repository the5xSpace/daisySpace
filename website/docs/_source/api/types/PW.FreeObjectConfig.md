[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObjectConfig

# Type Alias: FreeObjectConfig

> **FreeObjectConfig** = [`BaseObjectConfigBase`](PW.BaseObjectConfigBase.md) & `object`

FreeObject 配置（语义层）。

特点：
- 以“可选 Feature”形式组织：model/text/image/path 等
- 每个字段可传 `false` 表示禁用/移除该类 Feature
- 部分字段支持数组：用于一次挂载多个同类 Feature（如多张图片、多条 polyline）

## Type Declaration

### arrowPoint?

> `optional` **arrowPoint?**: [`ArrowPointerOptions`](ArrowPointerOptions.md) \| [`ArrowPointerOptions`](ArrowPointerOptions.md)[] \| `false`

箭头指示器配置（单个或多个）。
- `false`：移除箭头指示器

### collisionBall?

> `optional` **collisionBall?**: [`FreeObjectCollisionBallOptions`](PW.FreeObjectCollisionBallOptions.md) \| `false`

碰撞球配置。
- `false`：移除碰撞球

### cube?

> `optional` **cube?**: [`CubeOptions`](../interfaces/CubeOptions.md) \| [`CubeOptions`](../interfaces/CubeOptions.md)[] \| `false`

立方体配置（单个或多个）。
- `false`：移除立方体

### image?

> `optional` **image?**: [`ImageOptions`](ImageOptions.md) \| [`ImageOptions`](ImageOptions.md)[] \| `false`

图片配置（单个或多个）。
- `false`：移除图片

### model?

> `optional` **model?**: [`ModelOptions`](../interfaces/ModelOptions.md) \| `false`

模型配置。
- `false`：移除模型

### name?

> `optional` **name?**: `string`

对象名称（会写入宿主 Entity name）。

### path?

> `optional` **path?**: `Parameters`\<[`Entity`](../classes/Entity.md)\[`"setPath"`\]\>\[`0`\] \| `false`

轨迹线配置（对应 Entity.setPath）。
- `false`：移除轨迹线

### point?

> `optional` **point?**: [`PointComOptions`](../interfaces/PointComOptions.md) \| [`PointComOptions`](../interfaces/PointComOptions.md)[] \| `false`

点要素配置（单个或多个）。
- `false`：移除点要素

### polyline?

> `optional` **polyline?**: [`PolylineOptions`](PolylineOptions.md) \| [`PolylineOptions`](PolylineOptions.md)[] \| `false`

折线要素配置（单个或多个）。
- `false`：移除折线

### popover?

> `optional` **popover?**: [`PopoverOptions`](../interfaces/UI.PopoverOptions.md) \| `false`

Popover 配置（悬浮信息框）。
- `false`：移除 popover

### position?

> `optional` **position?**: [`ObjectPositon`](PW.ObjectPositon.md)

初始位置。

#### Default

```ts
Daisy.Cartesian3.ZERO
```

### sensor?

> `optional` **sensor?**: \[\]

传感器配置（预留）。

当前 FreeObject 不直接处理该字段，推荐使用 Vehicle/Aircraft 的 addSensor API。

### text?

> `optional` **text?**: [`TextOptions`](../interfaces/TextOptions.md) \| [`TextOptions`](../interfaces/TextOptions.md)[] \| `false`

文本配置（单个或多个）。
- `false`：移除文本
