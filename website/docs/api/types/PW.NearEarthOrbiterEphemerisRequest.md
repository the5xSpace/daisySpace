[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterEphemerisRequest

# Type Alias: NearEarthOrbiterEphemerisRequest

> **NearEarthOrbiterEphemerisRequest** = `{ endTime: Daisy.JulianDate; startTime: Daisy.JulianDate }`

星历计算请求参数（基于通用轨道源 + SGP4）。

## Example

```ts
const ephemeris = sat.calculateEphemeris({
 startTime: viewer.startTime,
 endTime: viewer.stopTime,
 intervalSeconds: 30,
});
```

## Properties

### endTime

> **endTime**: `Daisy.JulianDate`

采样结束时刻（仿真时间）

***

### intervalSeconds?

> `optional` **intervalSeconds?**: `number`

采样间隔（秒）；默认 60

***

### observerLocation?

> `optional` **observerLocation?**: \[`number`, `number`, `number`\]

观测者位置（经/纬/高），单位：deg/deg/m；默认 [0,0,0]

***

### startTime

> **startTime**: `Daisy.JulianDate`

采样开始时刻（仿真时间）
