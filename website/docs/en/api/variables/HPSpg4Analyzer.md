[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / HPSpg4Analyzer

# Variable: HPSpg4Analyzer

> `const` **HPSpg4Analyzer**: `HighPrecisionSGP4Analyzer`

默认单例（模块加载后会自动 `init()`）。

## Example

```ts
import { HPSpg4Analyzer } from "./sdk/index";
await HPSpg4Analyzer.init()
const tle = await HPSpg4Analyzer.loadTleData(25544);
const state = await HPSpg4Analyzer.computeStateAtTime(tle, new Date());
console.log(state.lla.height);
```
