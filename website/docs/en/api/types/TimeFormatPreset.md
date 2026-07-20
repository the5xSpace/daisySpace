[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatPreset

# Type Alias: TimeFormatPreset

> **TimeFormatPreset** = `"utc"` \| `"bjt"` \| `"t0"` \| `"cesium"` \| `"iso"` \| `"iso-ms"` \| `"date"` \| `"time"` \| `"time-ms"` \| `"date-time"` \| `"date-time-ms"`

Time format preset.

`utc` and `bjt` output date-time with timezone name, `t0` outputs cumulative seconds relative to the reference time;
Other presets select common date, time, or ISO-style formats. Legacy compatibility presets still work,
new code should prefer the semantically clear `utc`, `bjt`, or specific format presets.
