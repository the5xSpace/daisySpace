[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchStrategy

# Type Alias: RuntimePatchStrategy

> **RuntimePatchStrategy** = `"patch"` \| `"requiresRecreate"` \| `"unsupported"`

Runtime patch bridge primitives.

The bridge deliberately does not know about Engine, Entity, Feature, or
Cesium. A host supplies a target resolver and explicitly registers the
semantic fields that it is willing to mutate.
