[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RuntimePatchMutation

# Interface: RuntimePatchMutation

## Properties

### diagnostics?

> `readonly` `optional` **diagnostics?**: readonly [`RuntimePatchDiagnosticInput`](RuntimePatchDiagnosticInput.md)[]

***

### rollback?

> `readonly` `optional` **rollback?**: () => `void`

Optional rollback for an already-created render/resource snapshot.

#### Returns

`void`
