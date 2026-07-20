[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeaturePickedEvent

# Interface: FeaturePickedEvent

## Extends

- `ClickSpaceEntityResult`

## Properties

### comId

> **comId**: `string`

Picked component/feature identifier (may contain `__` separated info)

#### Inherited from

`ClickSpaceEntityResult.comId`

***

### comType

> **comType**: `string`

Component type (e.g., `Entity` or Feature type)

#### Inherited from

`ClickSpaceEntityResult.comType`

***

### entity

> **entity**: [`Entity`](../classes/Entity.md)

Daisy entity object

#### Inherited from

`ClickSpaceEntityResult.entity`

***

### entityId

> **entityId**: `string`

Daisy entity ID

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

Optional: glTF node index when a model node is picked

#### Inherited from

`ClickSpaceEntityResult.nodeId`

***

### nodeName?

> `optional` **nodeName?**: `string`

Optional: node name when a model node is picked

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
