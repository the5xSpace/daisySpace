[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObjectCollisionBallOptions

# Type Alias: FreeObjectCollisionBallOptions

> **FreeObjectCollisionBallOptions** = [`BaseObjectTransformTimeline`](PW.BaseObjectTransformTimeline.md) & `object`

碰撞球配置（用于简单的可视化碰撞体与碰撞状态展示）。

## Type Declaration

### collisionColor?

> `optional` **collisionColor?**: `Daisy.Color`

碰撞状态颜色。

### color?

> `optional` **color?**: `Daisy.Color`

默认颜色（未碰撞）。

### enableCollision?

> `optional` **enableCollision?**: `boolean`

是否启用碰撞检测（依赖宿主实体的碰撞实现）。

#### Default

```ts
false
```

### enableCollisionStateShow?

> `optional` **enableCollisionStateShow?**: `boolean`

是否根据碰撞状态自动切换颜色显示。

#### Default

```ts
false
```

### outlineColor?

> `optional` **outlineColor?**: `Daisy.Color`

轮廓颜色。

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓线宽（像素）。

### radius

> **radius**: `number`

半径（米）。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```
