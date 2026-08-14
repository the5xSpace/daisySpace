[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / LinkOptions

# Type Alias: LinkOptions

> **LinkOptions** = `{ target: LinkEndpoint }`

链路组件配置。

用于描述链路的目标端、显示计划以及传输线的基础表现。

## Example

```ts
site.addLink({
 name: "Uplink-A",
 target: relaySat,
 show: accessWindows,
 color: Daisy.Color.RED,
 material: Daisy.MaterialFactory.PolylineArrow({ color: Daisy.Color.RED, speed: 1.2 }),
 width: 3,
 direction: "forward",
});
```

## Properties

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

链路插值方式。默认使用直线连接。

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

是否将链路贴附到地表。默认 `false`。

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

链路线颜色。

***

### direction?

> `optional` **direction?**: [`LinkDirection`](PW.LinkDirection.md)

传输箭头的流动方向。

- `forward`：默认方向
- `reverse`：反向

***

### id?

> `optional` **id?**: `string`

注册前可提供的稳定业务 ID。

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

链路线材质，优先级高于 `color`、`speed` 和 `direction`。

- 可传颜色字符串或 Daisy 颜色对象，作为纯色线材质
- 可传自定义材质，例如 `MaterialFactory.PolylineArrow(...)`
- 不传时使用默认回退：内部会基于 `color`、`speed`、`direction` 自动生成
 箭头流动材质，通常已经足够适合常规链路展示，业务侧可以直接省略
 这个字段

***

### name?

> `optional` **name?**: `string`

链路名称。

***

### show?

> `optional` **show?**: [`LinkSchedule`](PW.LinkSchedule.md)

链路显示计划。

传入布尔值时表示始终显示或隐藏；
传入时间区间或时间区间数组时，仅在命中区间内显示。

***

### sourcePosition?

> `optional` **sourcePosition?**: `Daisy.Cartesian3`

可选固定起点坐标。

未设置时使用宿主物理对象的实体位置；设置后链路从该世界坐标开始绘制。

***

### speed?

> `optional` **speed?**: `number`

传输箭头的流动速度。

- 不传时默认 `0`
- 传 `0` 时仍会显示默认材质，但不额外增加流动感

***

### target

> **target**: [`LinkEndpoint`](PW.LinkEndpoint.md)

链路目标端。

可传入物理对象、实体、可解析为实体的包装对象，
也可直接传入固定点位。

***

### width?

> `optional` **width?**: `number`

链路线宽，单位为像素。默认 `2`。
