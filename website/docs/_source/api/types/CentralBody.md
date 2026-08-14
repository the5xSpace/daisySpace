[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CentralBody

# Type Alias: CentralBody

> **CentralBody** = `"earth"` \| `"moon"`

基于 `wasm-sgp4` 内核的高精度轨道分析器（JS/TS 层只做“分析 + 坐标/椭球对齐”）。

设计原则：
- 轨道动力学（SGP4 传播）全部在 `wasm-sgp4` 中完成
- JS/TS 层负责：时间统一（UTC）、坐标系转换（）、椭球几何、分析逻辑（过境/交汇/互视等）

坐标系约定：
- ECI：这里使用 `TEME`（与 SGP4 输出一致）
- ECEF：使用 的 `TEME -> PseudoFixed` 变换矩阵（见 `Daisy.Transforms.computeTemeToPseudoFixedMatrix`）
- LLA：使用 `Daisy.Ellipsoid.cartesianToCartographic` 输出经纬高（角度制）
- ENU：使用 `Daisy.Transforms.eastNorthUpToFixedFrame` 基于椭球建立局部 ENU

时间系统约定：
- 所有输入与输出时间均为 UTC（JS Date 的 epoch 毫秒 + `timeBasis: "UTC"` 标识）

## Example

```ts
import { HighPrecisionSGP4Analyzer } from "./sdk/index";

const analyzer = new HighPrecisionSGP4Analyzer();
await analyzer.init();

const tle = await analyzer.loadTleData(25544);

const nowUtc = new Date();
const state = await analyzer.computeStateAtTime(tle, nowUtc, {
 includeENU: true,
 observer: { longitudeDeg: 120, latitudeDeg: 30, height: 0 }
});

console.log(state.timeBasis, state.eci.frame, state.lla.longitudeDeg);
```
