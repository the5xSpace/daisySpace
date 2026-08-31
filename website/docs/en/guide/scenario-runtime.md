---
title: "Scenario Guide: Data-Driven Scenes"
---

# Scenario Guide: Data-Driven Scenes

If you are building a space scene that can be saved, reopened, and handed to another application for continued editing, it is useful to describe the scene as a **Scenario** first, then let the Runtime load it into renderable SDK objects.

This guide introduces four things from an SDK user's perspective: what a Scenario is, what problem it solves, how one load and edit cycle works, and how to use it with `daisySpace-Editor`. By the end, you should be able to choose the right entry point, load a `.daisydata` scene, and update it with a command or a semantic path.

## What Is a Scenario

A Scenario is a serializable scene definition. It describes which objects are in the scene, which components and visual representations they have, which Links connect them, which resources they use, and how the scene's time and environment are configured.

Think of it as the “source data” for a scene, rather than already-created `Engine`, `Entity`, or `Feature` instances:

```text
ScenarioDefinitionV1
  -- describes --> saveable scene data
        |
        | load
        v
Runtime Adapter
  -- creates and updates --> daisy-space-sdk Engine / Entity / Feature / PW
```

The important benefit is that the saved form is stable and transferable, while runtime objects are created during loading and managed by the Runtime during updates and unloading. The same Scenario can be reused by the Editor, a preview application, a test program, or another SDK application.

## What Problem Does Scenario Solve

Direct SDK object manipulation is a good fit for immediate interaction. Once a scene becomes part of a product workflow, however, you usually also need to solve these problems:

- SDK instances cannot be saved reliably as project files or transferred cleanly across processes and applications.
- The Editor, Runtime, automated tests, and business services need to work around the same scene definition.
- User editing needs stable object IDs, validation, undo/redo, and conflict checks.
- A scene needs to be packaged with its resources, checked for integrity, and restored in another Runtime.

Scenario separates “what the scene is” from “which SDK instances currently exist”. You can save a Scenario, or update only the current Runtime session; the application decides whether to persist the result.

## How the Packages Work Together

When getting started, you usually only need to remember these layers:

| Package | You can think of it as |
|------|------|
| `@daisyspace/scenario-contracts` | The Scenario JSON Schema and TypeScript types |
| `@daisyspace/scenario-core` | Constructing and applying data changes, resolving paths, validation, and undo/redo |
| `@daisyspace/daisydata` | Reading and exporting `.daisydata` containers, Manifests, and resources |
| `daisy-space-runtime` | The public Runtime, Scenario Session, and data Session APIs |
| `@daisyspace/runtime-adapter` | Translating Scenario changes into Runtime patch or rebuild actions |
| `daisy-space-sdk` | Creating Engine, Entity, Feature, and PW objects and performing the actual rendering |

Most applications do not need to call every layer directly. A common choice is to use `daisy-space-runtime` to load and run scenes and `@daisyspace/scenario-core` to create editing commands. You only need to go deeper into `@daisyspace/runtime-adapter` when you need custom resource resolution or Runtime integration.

## Scenario Runtime Flow

### Loading Flow

When the Runtime loads a Scenario, it first resolves the source into a definition or `.daisydata` bytes, performs verification and authorization, and then creates the SDK objects:

```text
ScenarioSource
  -> resolve source
  -> verify / normalize / validate
  -> authorize
  -> load resources
  -> create Runtime Adapter
  -> build SDK objects
  -> ready
```

`ScenarioSource` can be a URL string, `URL`, `Blob`, `ArrayBuffer`, or an in-memory `ScenarioDefinitionV1`. Strings and `URL` values are read as Package sources. Production scenes generally use `.daisydata`, while development and tests can pass an in-memory object directly.

The Schema checks whether the data structure, types, and required fields are correct. It does not execute rendering or call the SDK directly. The Runtime Adapter creates the objects, and `daisy-space-sdk` performs the actual rendering.

### Editing Flow

A persistent edit generally follows this path:

```text
user intent
  -> ScenarioCommand or semantic path update
  -> ScenarioChangeSet
  -> apply and validate the next Scenario
  -> Runtime Adapter chooses patch or rebuild
  -> daisy-space-sdk updates the rendered objects
  -> persist the updated Scenario when needed
```

Data updates and rendering updates are therefore two connected steps: first produce a new Scenario, then decide from the changed fields whether to update an object locally or rebuild a larger runtime structure.

## Quick Start

The example below uses local development capabilities to load a `.daisydata` file. In production, replace the development authorizer with the application's own `authorizer` and configure resource URLs for the deployment environment.

First prepare a Runtime container:

```html
<div id="daisy-container"></div>
```

Then create the Runtime, load the Scenario, and submit a property edit:

```typescript
import {
  createDevelopmentCapabilityContext,
  DaisyRuntime,
} from "daisy-space-runtime"
import { updateEntityCommand } from "@daisyspace/scenario-core"

const runtime = await DaisyRuntime.create({
  container: "#daisy-container",
  assets: { baseUrl: "/sdk/" },
  authorizer: {
    authorize: () =>
      createDevelopmentCapabilityContext({
        audience: "daisyspace-runtime",
        entitlements: ["runtime:use"],
        sourceId: "docs",
      }),
  },
  allowDevelopmentCapabilities: true,
})

const session = await runtime.loadScenario("/scenarios/hello.daisydata")
console.log(session.id)

const command = updateEntityCommand(session.definition, {
  id: "edit:hide-object",
  label: "Hide object",
  entityId: "sat-1",
  changes: { show: false },
})

const result = await session.apply(command.changeSet)
if (!result.applied) {
  console.error(result.issues)
}

await runtime.unload()
await runtime.destroy()
```

`runtime.loadScenario()` can also receive an in-memory Scenario definition:

```typescript
const session = await runtime.loadScenario(scenario)
```

To observe loading progress, listen for `loadProgress`. To read the current definition, use `session.definition`. It returns a data snapshot suitable for display, comparison, or project storage; it is not an SDK instance that can be manipulated directly.

## Editing a Scenario

### Express User Intent with a Command

`ScenarioCommand` is suited to one complete user action, such as “hide a satellite”, “create a sensor”, or “delete a Link”. It contains:

- `id`: the stable identifier for the command.
- `label`: a description for history records or UI display.
- `changeSet`: the change to apply.
- `inverseChangeSet`: the inverse change required to undo it.

The most common property-editing entry point is `updateEntityCommand()`:

```typescript
import {
  ScenarioHistory,
  updateEntityCommand,
} from "@daisyspace/scenario-core"

const history = new ScenarioHistory(scenario)
const command = updateEntityCommand(history.value, {
  id: "edit:hide-satellite",
  label: "Hide satellite",
  entityId: "sat-1",
  changes: { show: false },
})

history.execute(command)
const editedScenario = history.value
history.undo()
history.redo()
```

`changes` is a field object designed for callers. `updateEntityCommand()` converts it into a low-level `add`, `replace`, or `remove` according to whether each field currently exists. A stable `id` cannot be changed through an ordinary property edit.

To synchronize the same command with a rendering Runtime, pass its `changeSet` to the current `ScenarioSession`:

```typescript
const result = await session.apply(command.changeSet)
```

The application should decide which object owns the current Scenario state. When using `ScenarioHistory`, it normally owns the edit history. When using `ScenarioSession` or `DaisyDataSession`, the Session owns Runtime and data submission. Do not let multiple state containers modify the same definition independently without a synchronization strategy.

### The Low-Level ChangeSet Form

`ScenarioOperation` has only three low-level operations:

| Operation | Meaning | Required fields |
|------|------|------|
| `add` | Add a value to an object field or array position | `path`, `value` |
| `remove` | Remove an existing field or array element | `path`, `oldValue` |
| `replace` | Replace an existing value with a new value | `path`, `oldValue`, `value` |

`path` uses JSON Pointer, such as `/objects/0/show`. `oldValue` confirms that the document is still in the expected state and allows the Runtime and history system to detect conflicts and construct an inverse ChangeSet.

A ChangeSet has no `read` operation. Read through a Scenario snapshot, `DaisyDataSession.getPath()`, or an object handle from the Runtime Session; a ChangeSet is produced only when data changes.

## Update Data with Semantic Paths

If you do not want to look up array indices or build JSON Pointers yourself, use `DaisyDataSession` from `daisy-space-runtime`. It lets you update data with a stable object ID and a semantic path, while the internal Path Update Driver converts the request into a ChangeSet.

For example, rename object `sat-1`:

```typescript
import { DaisyDataSession } from "daisy-space-runtime"

const dataSession = await DaisyDataSession.open({
  source: scenario,
})

const before = dataSession.getPath(
  { kind: "object", id: "sat-1" },
  "name",
)
console.log(before.value)

await dataSession.updatePath({
  target: { kind: "object", id: "sat-1" },
  path: "name",
  operation: "set",
  value: "Renamed Satellite",
})

const result = await dataSession.flushUpdates()
console.log(result.changeSet, result.documentRevision)
```

Common semantic operations include:

- `set`: Set a field; it produces `add` when the field is missing and `replace` when it exists.
- `unset`: Delete a field and produce `remove`.
- `insert` / `remove`: Operate on array elements.
- `increment` / `decrement`: Produce `replace` for an existing numeric field.

`updatePath()` puts the request in a queue by default. `flushUpdates()` resolves paths, builds a ChangeSet, applies it to the Runtime, and commits the new document and revision after the Runtime accepts it. Without a Runtime, it can still be used as a data-only editing session.

To synchronize rendering, pass the Runtime container and authorization configuration when opening the Session:

```typescript
const host = document.querySelector<HTMLElement>("#daisy-container")
if (!host) throw new Error("Runtime container not found")

const dataSession = await DaisyDataSession.open({
  source: scenario,
  runtime: { host },
  authorizer: runtimeAuthorizer,
  allowDevelopmentCapabilities: true,
})
```

The host application should provide `runtimeAuthorizer`; a development example can reuse the `createDevelopmentCapabilityContext()` configuration shown earlier. To save a Package, call `dataSession.export()` after a successful update to obtain new `.daisydata` bytes and a Manifest.

## How Data Becomes a Rendering Update

When a ChangeSet enters the Runtime, the Runtime Adapter chooses an update strategy from the affected paths and fields:

```text
ScenarioChangeSet
  -> next Scenario document
  -> update plan
  -> Runtime Adapter
  -> daisy-space-sdk patch or rebuild
```

The common strategies can be understood as follows:

| Update strategy | Typical cases | Runtime action |
|------|------|------|
| `patch` | Name, visibility, position, attitude, and some Engine or Clock fields | Update existing objects or components in place |
| `rebuild-component` | Widget, Layer, or some Component/Visual configuration changes | Rebuild the affected Component or Visual |
| `rebuild-object` | Orbit motion, sampled motion, central-body changes, or other changes that require a new object graph | Rebuild the Object and its related Components, Visuals, and Links |
| `rebuild-runtime` | Environment, resources, or changes affecting global dependencies | Rebuild the entire Runtime |
| `unsupported` | Stable IDs, types, or unauthorized paths that cannot be changed | Reject the update and return structured issues |

For example, changing `show` usually needs only a local patch. Changing orbit or sampled ephemeris may rebuild the object, while resource or environment changes may rebuild the entire Runtime. This choice is made by the Runtime Adapter's update rules; the Schema is not executing a “rendering statement”.

When a local update fails, the Runtime returns `issues` and tries to restore the definition from before the update. The caller should check `result.applied` and use `issues` to decide whether to notify the user, retry, or roll back.

## Working with `daisySpace-Editor`

For SDK users, the most useful way to think about it is this: `daisySpace-Editor` is an application for creating and maintaining Scenarios, while the Scenario is the shared data boundary between the Editor, the Runtime, and other applications.

You can work with them as follows:

1. Create objects, components, resource references, and timelines in the Editor, then save or export the Scenario.
2. In your SDK application, use `DaisyRuntime.loadScenario()` to load the same Scenario or `.daisydata` package.
3. For programmatic editing, create a `ScenarioCommand` with `@daisyspace/scenario-core`, or call `DaisyDataSession.updatePath()`.
4. Apply the ChangeSet to the Runtime. When the result needs to be saved, export the updated Scenario Package.
5. Give the exported result back to the Editor to continue using property panels, resource management, and history operations.

The Editor's panels, forms, tree, selection, and project storage are application-level concerns. The Scenario structure, ChangeSet semantics, and Runtime rendering adapter are the shared SDK path. As a user, you only need to integrate around serializable Scenario data and the public Session/Command APIs; you do not need to duplicate object synchronization logic.

## Operations That May Not Change the Scenario

Time playback, time multiplier, camera movement, selection, hover, 2D/3D mode, and debug display are usually immediate states of the current Runtime session and do not necessarily belong in the Scenario.

A simple rule of thumb is:

- Express scene content that should be restored on the next load as Scenario fields and ChangeSets.
- Use Runtime or `daisy-space-sdk` real-time APIs for state that only affects the current preview or interaction.

This keeps the scene file stable while allowing camera and interaction state to remain responsive.

## Choosing an Entry Point

| Need | Recommended entry point |
|------|------|
| Create a few objects temporarily and display them immediately | Use `daisy-space-sdk` directly |
| Load a saveable, reusable scene | `DaisyRuntime` + a Scenario or `.daisydata` |
| Implement property editing, undo/redo, and project persistence | `@daisyspace/scenario-core` + `ScenarioHistory` |
| Update by object ID and field path while synchronizing the Runtime | `DaisyDataSession` |
| Control only time, camera, selection, and other immediate state | Runtime / `daisy-space-sdk` real-time APIs |

Finally, remember: a Scenario stores serializable definitions. `Engine`, `Entity`, `Feature`, Runtime Handles, and Sessions are runtime objects. When an application loads a Scenario again, the Runtime should create those objects from the definition again.
