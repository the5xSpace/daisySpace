[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeTask

# Class: TimeTask\<Ctx\>

时间区间任务 — 在 `[startJulianTime, endJulianTime]` 区间内触发回调。

生命周期回调：
- `onEnter`：仿真时间**首次**进入区间时触发（仅一次）
- `onTick`：仿真时间在区间内时**每帧**触发
- `onLeave`：仿真时间**离开**区间时触发（仅一次）

所有回调都通过微任务队列调度，支持 `async` 回调，异常自动捕获不会中断调度器。

## Example

```ts
// 创建一个在 5~20 分钟区间内执行的观测窗口任务
const start = Daisy.JulianDate.addSeconds(sceneStart, 5 * 60, new Daisy.JulianDate());
const end = Daisy.JulianDate.addSeconds(sceneStart, 20 * 60, new Daisy.JulianDate());

const task = new Daisy.TimeTask({
 id: "observation",
 name: "观测窗口",
 startJulianTime: start,
 endJulianTime: end,
 onEnter: (curTime, ctx, getStartOffset) => {
 console.log("进入观测窗口，偏移:", Math.round(getStartOffset()), "s");
 },
 onTick: (curTime, ctx, getStartOffset, getEndOffset) => {
 // 每帧执行，可用于更新 UI 或检查条件
 },
 onLeave: (curTime, ctx, getStartOffset, getEndOffset) => {
 console.log("离开观测窗口");
 },
});

engine.timeSchedule.add(task);
```

## Type Parameters

### Ctx

`Ctx` = `unknown`

## Constructors

### Constructor

> **new TimeTask**\<`Ctx`\>(`options`): `TimeTask`\<`Ctx`\>

创建时间区间任务。

#### Parameters

##### options

任务配置

###### endJulianTime

`JulianDate`

区间结束时间

###### id?

`string`

任务唯一标识（可选，默认自动生成）

###### name?

`string`

任务显示名称（可选，用于 UI 展示）

###### onEnter?

`TimeTaskHandler`\<`Ctx`\>

进入区间回调（可选）

###### onLeave?

`TimeTaskHandler`\<`Ctx`\>

离开区间回调（可选）

###### onTick?

`TimeTaskHandler`\<`Ctx`\>

区间内每帧回调（可选）

###### startJulianTime

`JulianDate`

区间开始时间

#### Returns

`TimeTask`\<`Ctx`\>

## Properties

### endJulianTime

> **endJulianTime**: `JulianDate`

任务区间结束时间（JulianDate）

***

### id?

> `optional` **id?**: `string`

任务唯一标识（未指定时自动生成 GUID）

***

### name?

> `optional` **name?**: `string`

任务显示名称（可选，用于 UI 展示）

***

### onEnter?

> `optional` **onEnter?**: `TimeTaskHandler`\<`Ctx`\>

仿真时间首次进入区间时的回调

***

### onLeave?

> `optional` **onLeave?**: `TimeTaskHandler`\<`Ctx`\>

仿真时间离开区间时的回调

***

### onTick?

> `optional` **onTick?**: `TimeTaskHandler`\<`Ctx`\>

仿真时间在区间内时每帧触发的回调

***

### startJulianTime

> **startJulianTime**: `JulianDate`

任务区间开始时间（JulianDate）

***

### status

> **status**: `TimeTaskStatus` = `"idle"`

当前任务状态（由 TimeSchedule 管理，外部请勿直接修改）
