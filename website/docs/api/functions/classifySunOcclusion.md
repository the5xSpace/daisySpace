[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / classifySunOcclusion

# Function: classifySunOcclusion()

> **classifySunOcclusion**(`input`): [`SunOcclusionState`](../types/SunOcclusionState.md)

根据观察点看到的光源与遮挡天体视圆关系判定光照状态。

当遮挡天体视圆完整覆盖光源时返回 `umbra`，部分相交时返回 `penumbra`，
否则返回 `sunlit`。

## Parameters

### input

[`SunOcclusionInput`](../interfaces/SunOcclusionInput.md)

## Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)
