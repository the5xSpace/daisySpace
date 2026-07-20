[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / toCesiumMaterial

# Function: toCesiumMaterial()

> **toCesiumMaterial**(`material`): `Material` \| `undefined`

Converts a Daisy material input to an internal rendering material instance.

- String: creates an image material from a URL
- Material instance: clones as an independent instance to avoid shared object destruction
- Daisy color object: creates a solid color material

## Parameters

### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

Material description

## Returns

`Material` \| `undefined`
