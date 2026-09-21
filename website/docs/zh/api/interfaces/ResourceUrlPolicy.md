[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ResourceUrlPolicy

# Interface: ResourceUrlPolicy

资源加载 URL 的最小安全策略。

SDK 允许相对路径与常见浏览器资源协议，但不会把任意协议交给
fetch、 provider 或动态 script 标签处理。

## Properties

### allowBlob?

> `optional` **allowBlob?**: `boolean`

是否允许 blob: URL；编辑器生成的临时资源默认需要它。

***

### allowData?

> `optional` **allowData?**: `boolean`

是否允许 data: URL；模型和内存资源默认需要它。

***

### allowProtocolRelative?

> `optional` **allowProtocolRelative?**: `boolean`

是否允许 //host/path 形式的协议相对 URL。
