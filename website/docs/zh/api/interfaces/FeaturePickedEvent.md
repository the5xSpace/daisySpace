[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeaturePickedEvent

# Interface: FeaturePickedEvent

## Extends

- `ClickSpaceEntityResult`

## Properties

### comId

> **comId**: `string`

拾取到的组件/要素标识（可能包含 `__` 分隔信息）

#### Inherited from

`ClickSpaceEntityResult.comId`

***

### comType

> **comType**: `string`

组件类型（如 `Entity` 或 Feature 的 type）

#### Inherited from

`ClickSpaceEntityResult.comType`

***

### entity

> **entity**: [`Entity`](../classes/Entity.md)

Daisy 实体对象

#### Inherited from

`ClickSpaceEntityResult.entity`

***

### entityId

> **entityId**: `string`

Daisy 实体 ID

#### Inherited from

`ClickSpaceEntityResult.entityId`

***

### feature

> **feature**: [`FeatureEventHandleHost`](../types/FeatureEventHandleHost.md)

***

### isPropagationStopped

> **isPropagationStopped**: () => `boolean`

#### Returns

`boolean`

***

### nodeId?

> `optional` **nodeId?**: `number`

可选：当拾取到模型节点时，提供 glTF 节点索引

#### Inherited from

`ClickSpaceEntityResult.nodeId`

***

### nodeName?

> `optional` **nodeName?**: `string`

可选：当拾取到模型节点时，提供节点名

#### Inherited from

`ClickSpaceEntityResult.nodeName`

***

### propagationStopped

> **propagationStopped**: `boolean`

***

### stopPropagation

> **stopPropagation**: () => `void`

#### Returns

`void`
