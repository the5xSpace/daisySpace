[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyMaterialDescriptor

# Type Alias: DaisyMaterialDescriptor

> **DaisyMaterialDescriptor** = `{ kind: "daisy-material"; type: string }`

Daisy material descriptor, can be directly passed to features or components that support `DMaterial`.

## Properties

### kind

> **kind**: `"daisy-material"`

Stable identification tag for the material description.

***

### source?

> `optional` **source?**: [`MaterialShaderSource`](MaterialShaderSource.md)

Custom material source code; resolved by registered material type when not set.

***

### translucent?

> `optional` **translucent?**: `boolean`

Whether to treat as a translucent material. Default `true`.

***

### type

> **type**: `string`

Built-in or registered material type identifier.

***

### uniforms?

> `optional` **uniforms?**: `Record`\<`string`, `unknown`\>

Material uniform parameters.
