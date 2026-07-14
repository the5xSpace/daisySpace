[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimePointTask

# Class: TimePointTask\<Ctx\>

时间点任务 — 在仿真时间到达 `timeJulianTime` 时触发一次回调。

与 [TimeTask](TimeTask.md) 不同，时间点任务没有区间概念，只在到达指定时间点时触发一次。
触发后状态变为 `triggered`，不会重复触发。

## Example

```ts
// 创建一个在 T+300s 时触发的一次性事件
const triggerTime = Daisy.JulianDate.addSeconds(sceneStart, 300, new Daisy.JulianDate());

const pointTask = new Daisy.TimePointTask({
 id: "explosion",
 name: "爆炸事件",
 timeJulianTime: triggerTime,
 onTrigger: (curTime, ctx, getOffset) => {
 console.log("爆炸触发！偏移:", Math.round(getOffset()), "s");
 },
});

engine.timeSchedule.addPoint(pointTask);
```

## Type Parameters

### Ctx

`Ctx` = `unknown`

## Constructors

### Constructor

> **new TimePointTask**\<`Ctx`\>(`options`): `TimePointTask`\<`Ctx`\>

创建时间点任务。

#### Parameters

##### options

任务配置

###### id?

`string`

任务唯一标识（可选，默认自动生成）

###### name?

`string`

任务显示名称（可选，用于 UI 展示）

###### onTrigger?

`TimePointTaskHandler`\<`Ctx`\>

触发回调（可选）

###### timeJulianTime

`JulianDate`

触发时间点

#### Returns

`TimePointTask`\<`Ctx`\>

## Properties

### id?

> `optional` **id?**: `string`

任务唯一标识（未指定时自动生成 GUID）

***

### name?

> `optional` **name?**: `string`

任务显示名称（可选，用于 UI 展示）

***

### onTrigger?

> `optional` **onTrigger?**: `TimePointTaskHandler`\<`Ctx`\>

到达触发时间点时的回调（仅触发一次）

***

### status

> **status**: `TimePointTaskStatus` = `"idle"`

当前任务状态（由 TimeSchedule 管理，外部请勿直接修改）

***

### timeJulianTime

> **timeJulianTime**: `JulianDate`

触发时间点（JulianDate）
