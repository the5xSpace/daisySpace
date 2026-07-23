[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorOptions

# Type Alias: SensorOptions

> **SensorOptions** = `object`

传感器组件配置（所有角度为 deg，距离为 m）。

说明：
- 角度/量程等支持 `TimeValue<T>`，可随仿真时间动态变化
- footprint 仅在 `emitDirection === TO_GROUND` 时可生成

## Properties

### apertureDeg?

> `optional` **apertureDeg?**: [`SensorApertureDeg`](PW.SensorApertureDeg.md)

传感器 aperture（角度制，支持随时间变化）。

支持三种输入方式：
- 常量：直接给一个角度值
- 回调：按仿真时间动态返回角度值
- 时间采样：给定一组离散采样点（可配置插值方式）

#### Example

```ts
// 1) 常量
apertureDeg: 15 // 单角度值，等价于 { xDeg: 15, yDeg: 15 }
apertureDeg: { xDeg: 10, yDeg: 6 } // 横纵角度分别为 10 和 6

// 2) 回调（按仿真时间动态计算）
apertureDeg: (time) => ({ xDeg: 10, yDeg: 6 })

// 3) 时间采样（离散点 + 插值）
apertureDeg: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: { xDeg: 10, yDeg: 6 } },
 { time: t1, value: { xDeg: 12, yDeg: 8 } },
 { time: t2, value: { xDeg: 14, yDeg: 10 } },
 ]
}
```

#### Default

```ts
{ xDeg: 10, yDeg: 6 }
```

***

### beamAttitudeDeg?

> `optional` **beamAttitudeDeg?**: [`TimeValue`](TimeValue.md)\<[`SensorBeamAttitudeDeg`](PW.SensorBeamAttitudeDeg.md)\>

波束姿态（角度制，支持随时间变化）。

支持三种输入方式：
- 常量：直接给一个姿态值
- 回调：按仿真时间动态返回姿态值
- 时间采样：给定一组离散采样点（可配置插值方式）

#### Example

```ts
// 1) 常量
beamAttitudeDeg: { azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 }

// 2) 回调（按仿真时间动态计算）
beamAttitudeDeg: (time) => ({ azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 })

// 3) 时间采样（离散点 + 插值）
beamAttitudeDeg: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: { azimuthDeg: 0, elevationDeg: -20, rollDeg: 0 } },
 { time: t1, value: { azimuthDeg: 30, elevationDeg: -30, rollDeg: 0 } },
 { time: t2, value: { azimuthDeg: 60, elevationDeg: -25, rollDeg: 0 } },
 ]
}
```

#### Default

```ts
{ azimuthDeg: 0, elevationDeg: 0, rollDeg: 0 }
```

***

### beamLength?

> `optional` **beamLength?**: [`TimeValue`](TimeValue.md)\<`number`\>

波束长度（米，支持随时间变化）。

支持三种输入方式：
- 常量：直接给一个数值
- 回调：按仿真时间动态返回数值
- 时间采样：给定一组离散采样点（可配置插值方式）

#### Example

```ts
1) 常量
range: 200_000

2) 回调（按仿真时间动态计算）
range: (time) => 200_000

3) 时间采样（离散点 + 插值）
range: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: 120_000 },
 { time: t1, value: 260_000 },
 { time: t2, value: 180_000 },
 ]
}
4) 还可通过创建时间计划，手动指定range，可避免手动计算时间符合度的成本
viewer.timeSchedule.add(new TimeTask({
 startJulianTime,
 endJulianTime,
 onEnter: () => {
 //会覆盖之前的range配置
 sensor.range = 200_000;
 }
 }))
```

#### Default

```ts
200000
```

***

### beamShow?

> `optional` **beamShow?**: [`TimeValue`](TimeValue.md)\<`boolean`\>

是否显示波束本体（支持随时间变化）。

语义：
- 仅控制传感器体积/波束绘制
- 不影响 footprint、range renderer 等附属绘制
- 若 `show=false`，仍视为整个传感器关闭

#### Default

```ts
true
```

***

### celestialEllipsoid?

> `optional` **celestialEllipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

传感器所在的天体椭球体（默认地球）。

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

颜色（当 material 未提供时作为默认材质来源）。

#### Default

```ts
Daisy.Color.CYAN.withAlpha(0.25)
```

***

### debugAutoLength?

> `optional` **debugAutoLength?**: `boolean` \| `number` \| \{ `throttleMs?`: `number`; \}

自动长度调试开关。

可传布尔值快速开启，也可传节流配置控制调试输出频率。

***

### emitDirection?

> `optional` **emitDirection?**: [`EmitDirection`](../enums/EmitDirection.md)

安装方向。
CENTER 基于对象中心点旋转，中部两端发射
TOP_CENTER 基于对象顶部中心点旋转 顶部作为发射点
BOTTOM_CENTER 基于对象底部中心点旋转,底部作为发射点
TO_GROUND 基于对象顶部中心点旋转，顶部发射至椭球，并自动转化GNU参考系，初始方向指向椭球表面，忽略对象长度，自动计算为椭球相交高度（地球可理解为离地高度）

#### Default

```ts
"EmitDirection.TO_GROUND"
```

***

### footPrint?

> `optional` **footPrint?**: [`BeamFootprint`](PW.BeamFootprint.md) \| `false`

波束 footprint 实时绘制配置。

传 `false` 时表示关闭 footprint 绘制。

***

### id?

> `optional` **id?**: `string`

注册前可提供的稳定业务 ID。

***

### link?

> `optional` **link?**: [`SensorLinkOptions`](PW.SensorLinkOptions.md)

链路组合配置。

语义：
- `link.track`：按时间段切换跟踪目标
- `link.flow`：控制波束流动材质效果

示例：
```ts
link: {
 track: [
 { start: t0, end: t1, target: satA.entity },
 { start: t1, end: t2, target: satB.entity },
 ],
 flow: {
 activeWhen: [{ start: t0, end: t1 }],
 direction: "reverse",
 speed: 1.2,
 },
}
```

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

材质（优先级高于 color）。

***

### name?

> `optional` **name?**: `string`

名称（可选）。

- 会同步写入 component.name
- 可用于调试与按名称查找组件

***

### outline?

> `optional` **outline?**: `boolean`

是否显示轮廓线。

#### Default

```ts
true
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

轮廓颜色。

#### Default

```ts
Daisy.Color.WHITE.withAlpha(0.5)
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓线宽（像素，最终会被 clamp 到设备支持范围）。

#### Default

```ts
1
```

***

### show?

> `optional` **show?**: [`TimeValue`](TimeValue.md)\<`boolean`\>

是否显示（支持随仿真时间变化）。

约定：
- 当 show 在当前时刻解析为 false 时，本传感器会停止计算（包括跟踪/对地投影等）
- 恢复为 true 后按当前配置继续工作

#### Example

```ts
sensor.options = {
 show: {
 interpolation: "step",
 samples: [
 { time: t0, value: false },
 { time: t1, value: true },
 ],
 },
};
```

#### Default

```ts
true
```

***

### slices?

> `optional` **slices?**: `number`

切片数量（越大越平滑，但开销更高）。

***

### throughGround?

> `optional` **throughGround?**: `boolean`

是否禁用“穿透地面/天体椭球”。

语义：
- true：禁止穿透（默认）。当波束朝向椭球并会与椭球相交时，波束长度会被限制到最近交点处
- false：允许穿透。波束长度按用户 `beamLength`（或跟踪目标距离）表达

说明：
该选项会强制启用 emitDirection = EmitDirection.TO_GROUND

#### Default

```ts
true
```

***

### type?

> `optional` **type?**: [`SensorType`](../enums/PW.SensorType.md)

体积类型。

#### Default

```ts
SensorType.EllipticalCone
```
