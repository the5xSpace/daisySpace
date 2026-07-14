[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoundBoxOptions

# Interface: BoundBoxOptions

盒子数据

## Properties

### collisionColor?

> `optional` **collisionColor?**: `Color`

激活状态颜色

#### Default

```ts
Color.RED.withAlpha(0.5)
```

***

### collisionScale?

> `optional` **collisionScale?**: `number`

碰撞态可视壳缩放倍数，只影响渲染，不影响碰撞检测。

#### Remarks

`collisionVisualScale` 的语义化别名；两者同时传入时以 `collisionVisualScale` 为准。

***

### collisionVisualMode?

> `optional` **collisionVisualMode?**: `"none"` \| `"highlight"`

碰撞状态可视化模式。

- `none`：只触发碰撞事件，不改变外观
- `highlight`：碰撞时使用 collisionColor 高亮，分离后恢复

#### Default

```ts
'none'
```

***

### collisionVisualScale?

> `optional` **collisionVisualScale?**: `number`

碰撞态可视壳缩放倍数，只影响渲染，不影响碰撞检测。

#### Default

```ts
1.08
```

***

### color?

> `optional` **color?**: `Color`

盒子颜色

#### Default

```ts
Color.GREEN.withAlpha(0.3)
```

***

### detectCollision?

> `optional` **detectCollision?**: `boolean`

是否参与碰撞检测。

#### Remarks

`enableCollision` 的语义化别名；两者同时传入时以 `enableCollision` 为准。

***

### dimensions

> **dimensions**: `Cartesian3`

盒子尺寸（单位：米），长/宽/高。

#### Default

```ts
new Cartesian3(100, 100, 100)
```

***

### enableCollision?

> `optional` **enableCollision?**: `boolean`

启用碰撞检测

#### Default

```ts
false
```

***

### enableCollisionStateShow?

> `optional` **enableCollisionStateShow?**: `boolean`

启用激活(碰撞过程)状态

#### Default

```ts
false
```

***

### outlineColor?

> `optional` **outlineColor?**: `Color`

边框颜色

#### Default

```ts
Color.BLACK
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

边框宽度（像素）

#### Default

```ts
2
```

***

### shape?

> `optional` **shape?**: `"rect"` \| `"ball"`

形状

- `rect`：盒体（BoxGeometry）
- `ball`：球体（EllipsoidGeometry）

#### Default

```ts
'ball'
```

***

### show?

> `optional` **show?**: `boolean`

是否显示

#### Default

```ts
true
```

***

### visible?

> `optional` **visible?**: `boolean`

是否显示碰撞壳。

#### Remarks

`show` 的语义化别名；两者同时传入时以 `show` 为准，便于兼容旧代码。

***

### visualScale?

> `optional` **visualScale?**: `number`

可视壳缩放倍数，只影响渲染，不影响碰撞检测。

当包围盒与被包裹实体尺寸完全一致时，略微放大可避免透明面和线框被实体表面覆盖。

#### Default

```ts
1.01
```
