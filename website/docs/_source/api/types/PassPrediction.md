[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PassPrediction

# Type Alias: PassPrediction

> **PassPrediction** = `{ aos: OrbitState; aosAzimuthDeg: number; durationSeconds: number; los: OrbitState; losAzimuthDeg: number; maxElevationDeg: number; minElevationDeg: number; observer: ObserverDefinition; satId: string; tca: OrbitState; timeBasis: "UTC" }`

过境预报（三点报：进站/最高点/出站）。

解释：
- `aos`: Acquisition of Signal，卫星从低于 `minElevationDeg` 上升到满足阈值的时刻（进站）
- `tca`: Time of Closest Approach，这里用于“最大仰角”发生时刻（最高点）
- `los`: Loss of Signal，卫星从满足阈值下降到低于阈值的时刻（出站）

注意：
- 当前实现使用等步长采样 + 二分/三分细化，适合快速分析与可视窗口推断

## Properties

### aos

> **aos**: [`OrbitState`](OrbitState.md)

***

### aosAzimuthDeg

> **aosAzimuthDeg**: `number`

***

### durationSeconds

> **durationSeconds**: `number`

***

### los

> **los**: [`OrbitState`](OrbitState.md)

***

### losAzimuthDeg

> **losAzimuthDeg**: `number`

***

### maxElevationDeg

> **maxElevationDeg**: `number`

***

### minElevationDeg

> **minElevationDeg**: `number`

***

### observer

> **observer**: [`ObserverDefinition`](ObserverDefinition.md)

***

### satId

> **satId**: `string`

***

### tca

> **tca**: [`OrbitState`](OrbitState.md)

***

### timeBasis

> **timeBasis**: `"UTC"`
