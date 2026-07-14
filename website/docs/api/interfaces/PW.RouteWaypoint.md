[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RouteWaypoint

# Interface: RouteWaypoint

单个航点定义

## Properties

### icon?

> `optional` **icon?**: `string`

自定义图标 URL（不传则使用内置标记图标）

***

### label?

> `optional` **label?**: `string`

主标题（显示在标签第一行）

***

### popoverContent?

> `optional` **popoverContent?**: `string`

Popover 内容（HTML 字符串），不传则不创建 Popover

***

### position

> **position**: `Cartesian3`

航点世界坐标（WGS-84）

***

### subtitle?

> `optional` **subtitle?**: `string`

副标题（显示在标签第二行，更小的字号）
