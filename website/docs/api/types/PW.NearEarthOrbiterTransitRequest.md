[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterTransitRequest

# Type Alias: NearEarthOrbiterTransitRequest

> **NearEarthOrbiterTransitRequest** = `{ endTime: Daisy.JulianDate; observerLocation: \[number, number, number\]; startTime: Daisy.JulianDate }`

## Properties

### endTime

> **endTime**: `Daisy.JulianDate`

搜索结束时刻（仿真时间）

***

### maxTransits?

> `optional` **maxTransits?**: `number`

返回最大过境数量（可选）

***

### minElevationDeg?

> `optional` **minElevationDeg?**: `number`

最小仰角（度），默认 4

***

### observerLocation

> **observerLocation**: \[`number`, `number`, `number`\]

观测者位置（纬度/经度/海拔），单位：deg/deg/m，内部会自动兼容 km 写法。

***

### startTime

> **startTime**: `Daisy.JulianDate`

搜索开始时刻（仿真时间）
