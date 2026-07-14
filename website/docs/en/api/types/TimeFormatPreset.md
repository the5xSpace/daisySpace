[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeFormatPreset

# Type Alias: TimeFormatPreset

> **TimeFormatPreset** = `"utc"` \| `"bjt"` \| `"t0"` \| `"cesium"` \| `"iso"` \| `"iso-ms"` \| `"date"` \| `"time"` \| `"time-ms"` \| `"date-time"` \| `"date-time-ms"`

时间格式预设。

`utc` 与 `bjt` 输出带时区名称的日期时间，`t0` 输出相对参考时刻的累计秒；
其余预设用于选择常见的日期、时间或 ISO 风格格式。历史兼容预设仍可使用，
新代码建议优先选择语义明确的 `utc`、`bjt` 或具体格式预设。
