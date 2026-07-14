[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Spg4

# Variable: Spg4

> `const` **Spg4**: `SPG4`

SGP4 工具单例。

提供：
- TLE 获取（CelesTrak）与本地缓存
- 轨道源归一化（TLE / OMM XML / JSON GP）
- 基于 `jspredict-dc` 的 SGP4 传播（位置/星历/过境）

## Example

```ts
const tleText = await Spg4.loadTleData(25544, 6 * 3600);
const now = new Date();
const pos = Spg4.observeAt(tleText, undefined, now);
```
