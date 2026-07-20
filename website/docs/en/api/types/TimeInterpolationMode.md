[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeInterpolationMode

# Type Alias: TimeInterpolationMode

> **TimeInterpolationMode** = `"step"` \| `"linear"` \| `"cubic"`

Interpolation mode for discrete sample sequences.

- `"step"`: step (suitable for boolean/enum types, holds the previous value within the interval)
- `"linear"`: linear interpolation (default, stable, no overshoot)
- `"cubic"`: cubic smooth interpolation (smoother, suitable for continuous parameters)
