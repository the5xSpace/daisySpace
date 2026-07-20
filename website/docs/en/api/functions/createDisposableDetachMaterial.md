[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / createDisposableDetachMaterial

# Function: createDisposableDetachMaterial()

> **createDisposableDetachMaterial**(): `Material`

Creates a temporary material used when removing a component.

When a line object is removed from a collection, its attached material is destroyed. Feature destruction should only release the component's reference to the business material,
not destroy externally provided or shared materials.

## Returns

`Material`
