[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / classifySunOcclusion

# Function: classifySunOcclusion()

> **classifySunOcclusion**(`input`): [`SunOcclusionState`](../types/SunOcclusionState.md)

Determines the illumination state based on the apparent disk relationship between the light source and the occluding celestial body as seen from the observation point.

Returns `umbra` when the occluding body's disk fully covers the light source, `penumbra` when partially intersecting,
and `sunlit` otherwise.

## Parameters

### input

[`SunOcclusionInput`](../interfaces/SunOcclusionInput.md)

## Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)
