[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / createDisposableDetachMaterial

# Function: createDisposableDetachMaterial()

> **createDisposableDetachMaterial**(): `Material`

创建一个组件移除时使用的临时材质。

线对象从集合移除时会销毁自身挂载的材质。Feature 销毁只应解除组件对业务材质的引用，
不能销毁外部传入或多处共享的材质。

## Returns

`Material`
