[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PreviewHostSpec

# Type Alias: PreviewHostSpec

> **PreviewHostSpec** = \{ `id?`: `string`; `kind`: `"entity"`; `name?`: `string`; `position?`: `Daisy.Cartesian3`; \} \| \{ `createObject?`: [`PreviewBaseObjectFactory`](PreviewBaseObjectFactory.md); `id?`: `string`; `kind`: `"base-object"`; `name?`: `string`; `position?`: `Daisy.Cartesian3`; \}

## Union Members

### Type Literal

\{ `id?`: `string`; `kind`: `"entity"`; `name?`: `string`; `position?`: `Daisy.Cartesian3`; \}

***

### Type Literal

\{ `createObject?`: [`PreviewBaseObjectFactory`](PreviewBaseObjectFactory.md); `id?`: `string`; `kind`: `"base-object"`; `name?`: `string`; `position?`: `Daisy.Cartesian3`; \}

#### createObject?

> `readonly` `optional` **createObject?**: [`PreviewBaseObjectFactory`](PreviewBaseObjectFactory.md)

不传时使用最轻量的 FreeObject；受限组件应提供兼容的具体对象工厂。

#### id?

> `readonly` `optional` **id?**: `string`

#### kind

> `readonly` **kind**: `"base-object"`

#### name?

> `readonly` `optional` **name?**: `string`

#### position?

> `readonly` `optional` **position?**: `Daisy.Cartesian3`
