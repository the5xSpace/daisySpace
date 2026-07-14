[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RouteComponentOptions

# Interface: RouteComponentOptions

RouteComponent 配置

## Properties

### arcType?

> `optional` **arcType?**: `ArcType`

连线插值方式

#### Default

```ts
ArcType.GEODESIC
```

***

### bezierSamples?

> `optional` **bezierSamples?**: `number`

每段贝塞尔曲线采样点数

#### Default

```ts
24
```

***

### bezierTension?

> `optional` **bezierTension?**: `number`

贝塞尔张力角（角度制），控制曲线上拱幅度

#### Default

```ts
5
```

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

是否贴地

#### Default

```ts
false
```

***

### curveType?

> `optional` **curveType?**: `"bezier"` \| `"geodesic"`

曲线类型

#### Default

```ts
"bezier"
```

***

### defaultIcon?

> `optional` **defaultIcon?**: `string`

默认图标 URL（内置标记 SVG）

***

### iconScale?

> `optional` **iconScale?**: `number`

图标缩放

#### Default

```ts
1.0
```

***

### labelColor?

> `optional` **labelColor?**: [`DColor`](../types/DColor.md)

标签填充色

#### Default

```ts
Color.WHITE
```

***

### labelFont?

> `optional` **labelFont?**: `string`

标签字体

#### Default

```ts
"13px sans-serif"
```

***

### labelOffsetY?

> `optional` **labelOffsetY?**: `number`

标签垂直偏移（像素，负值为上移）@default -32

***

### lineColor?

> `optional` **lineColor?**: [`DColor`](../types/DColor.md)

连线颜色

#### Default

```ts
cyan
```

***

### lineWidth?

> `optional` **lineWidth?**: `number`

连线宽度（像素）

#### Default

```ts
2
```

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

航线材质（DMaterial）。

支持 Daisy.Material（如 PolylineGlow/PolylineDash/PolylineArrow 动态材质）、
颜色字符串、Daisy.Color 或 DaisyMaterialDescriptor。
设置后覆盖 lineColor。

***

### popoverTrigger?

> `optional` **popoverTrigger?**: `"click"` \| `"always"` \| `"hover"`

Popover 触发方式

#### Default

```ts
"hover"
```

***

### showIcons?

> `optional` **showIcons?**: `boolean`

是否显示航点图标

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

是否显示航点标签

#### Default

```ts
true
```

***

### showLine?

> `optional` **showLine?**: `boolean`

是否显示连线

#### Default

```ts
true
```

***

### waypoints

> **waypoints**: [`RouteWaypoint`](PW.RouteWaypoint.md)[]

航路点列表（至少 2 个）
