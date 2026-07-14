[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DataSource

# Enumeration: DataSource

轨道/位置数据的来源类型。

该枚举通常用于区分 TLE、开普勒根数、星历采样等不同的数据输入方式。

## Enumeration Members

### EPHEMERIS

> **EPHEMERIS**: `2`

星历数据

***

### KEPLER\_ELEMENT

> **KEPLER\_ELEMENT**: `1`

kepler元素

***

### LIVE\_UPDATE\_POSITION

> **LIVE\_UPDATE\_POSITION**: `3`

实时更新位置

***

### TLE

> **TLE**: `0`

tle 必须包含3行元素
