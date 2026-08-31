---
title: Scenario 入门：用数据驱动场景
---

# Scenario 入门：用数据驱动场景

如果你要构建一个可以保存、再次打开、交给其他应用继续编辑的空间场景，建议先把场景写成 **Scenario**，再让 Runtime 把它加载成可渲染的 SDK 对象。

本指南从 SDK 使用者的角度介绍四件事：Scenario 是什么、它解决什么问题、一次加载和编辑是怎样运作的，以及如何把它和 `daisySpace-Editor` 配合起来。读完后，你应该能够选择合适的入口，加载一个 `.daisydata` 场景，并用命令或语义路径更新它。

## Scenario 是什么

Scenario 是一份可序列化的场景定义。它描述场景中有哪些对象、对象有哪些组件和视觉表现、对象之间有哪些 Link、使用了哪些资源，以及场景的时间和环境配置。

可以把它理解成“场景的源数据”，而不是已经创建好的 `Engine`、`Entity` 或 `Feature` 实例：

```text
ScenarioDefinitionV1
  -- describes --> saveable scene data
        |
        | load
        v
Runtime Adapter
  -- creates and updates --> daisy-space-sdk Engine / Entity / Feature / PW
```

这样做有一个重要好处：保存的是稳定、可传输的数据，运行时对象则在加载时创建，在更新或卸载时由 Runtime 管理。相同的 Scenario 可以被 Editor、预览应用、测试程序或其他 SDK 应用重复使用。

## Scenario 解决什么问题

直接操作 SDK 对象很适合即时交互，但当场景需要进入产品流程时，通常还需要解决下面的问题：

- SDK 实例不能直接作为可靠的项目文件保存，也不适合跨进程或跨应用传输。
- Editor、Runtime、自动化测试和业务服务需要围绕同一份场景定义协作。
- 用户编辑需要稳定的对象 ID、校验、撤销重做和冲突检查。
- 场景需要连同资源一起打包、校验完整性，并在另一个 Runtime 中恢复。

Scenario 把“场景是什么”从“当前有哪些 SDK 实例”中分离出来。你可以保存 Scenario，也可以只在当前会话中更新 Runtime；是否持久化，由应用决定。

## 相关包如何协作

入门时通常只需要记住下面几层：

| 包 | 你可以把它理解为 |
|------|------|
| `@daisyspace/scenario-contracts` | Scenario 的 JSON Schema 和 TypeScript 类型 |
| `@daisyspace/scenario-core` | 构造和应用数据变更、解析路径、校验、撤销重做 |
| `@daisyspace/daisydata` | 读取和导出 `.daisydata` 容器、Manifest 与资源 |
| `daisy-space-runtime` | 对外提供 Runtime、Scenario Session 和数据 Session |
| `@daisyspace/runtime-adapter` | 把 Scenario 变化翻译成 Runtime 的 patch 或重建动作 |
| `daisy-space-sdk` | 创建 Engine、Entity、Feature、PW，并负责实际渲染 |

大多数应用不需要直接调用每一层。常见选择是：用 `daisy-space-runtime` 加载和运行场景，用 `@daisyspace/scenario-core` 创建编辑命令；只有需要自定义资源解析或 Runtime 适配时，才进一步接触 `@daisyspace/runtime-adapter`。

## Scenario 的运行流程

### 加载流程

Runtime 加载 Scenario 时，会先把来源解析成定义或 `.daisydata` 字节，再完成校验和授权，最后创建 SDK 对象：

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

`ScenarioSource` 可以是 URL 字符串、`URL`、`Blob`、`ArrayBuffer` 或内存中的 `ScenarioDefinitionV1`。字符串和 `URL` 会按 Package 来源读取；生产场景通常使用 `.daisydata`，开发和测试可以直接传入内存对象。

Schema 在这里负责判断数据结构、类型和必需字段是否正确。它不会执行渲染，也不会直接调用 SDK。真正创建对象的是 Runtime Adapter，真正执行渲染的是 `daisy-space-sdk`。

### 编辑流程

一次持久化编辑大致经过下面的路径：

```text
user intent
  -> ScenarioCommand or semantic path update
  -> ScenarioChangeSet
  -> apply and validate the next Scenario
  -> Runtime Adapter chooses patch or rebuild
  -> daisy-space-sdk updates the rendered objects
  -> persist the updated Scenario when needed
```

因此，数据更新和渲染更新是两个相互衔接的步骤：先得到一份新的 Scenario，再根据变化的字段决定是局部更新对象，还是重建更大的运行时结构。

## 快速开始

下面的示例使用本地开发能力加载一个 `.daisydata` 文件。正式环境应把开发授权替换为应用自己的 `authorizer`，并按部署方式配置资源地址。

先准备 Runtime 容器：

```html
<div id="daisy-container"></div>
```

然后创建 Runtime、加载 Scenario，并提交一次属性编辑：

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

`runtime.loadScenario()` 也可以接收内存中的 Scenario 定义：

```typescript
const session = await runtime.loadScenario(scenario)
```

如果需要观察加载进度，可以监听 `loadProgress`；如果只想读取当前定义，可以使用 `session.definition`。它返回的是数据快照，适合显示、比较或交给项目存储，不是可直接操作的 SDK 实例。

## 编辑 Scenario

### 用 Command 表达用户意图

`ScenarioCommand` 适合表达一次完整的用户操作，例如“隐藏卫星”“创建传感器”或“删除 Link”。它包含：

- `id`：这次命令的稳定标识。
- `label`：用于历史记录或界面显示的描述。
- `changeSet`：要应用的变更。
- `inverseChangeSet`：撤销这次变更所需的逆向变更。

最常用的属性编辑入口是 `updateEntityCommand()`：

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

`changes` 是面向调用方的字段对象。`updateEntityCommand()` 会根据字段当前是否存在，把它转换成底层的 `add`、`replace` 或 `remove`。稳定的 `id` 不能通过普通属性编辑修改。

如果要把同一条命令同步到渲染 Runtime，可以把它的 `changeSet` 交给当前 `ScenarioSession`：

```typescript
const result = await session.apply(command.changeSet)
```

应用需要决定谁拥有当前 Scenario 的主状态。使用 `ScenarioHistory` 时，通常由它管理编辑历史；使用 `ScenarioSession` 或 `DaisyDataSession` 时，则由 Session 管理运行时和数据提交。不要让多个状态容器在没有同步策略的情况下各自修改同一份定义。

### ChangeSet 的底层形式

`ScenarioOperation` 只有三种底层操作：

| 操作 | 含义 | 需要的字段 |
|------|------|------|
| `add` | 在对象字段或数组位置新增值 | `path`、`value` |
| `remove` | 删除已有字段或数组元素 | `path`、`oldValue` |
| `replace` | 用新值替换已有值 | `path`、`oldValue`、`value` |

`path` 使用 JSON Pointer，例如 `/objects/0/show`。`oldValue` 用来确认文档仍处于预期状态，也让 Runtime 和历史系统可以识别冲突并构造逆向 ChangeSet。

ChangeSet 没有 `read` 操作。读取通过 Scenario 快照、`DaisyDataSession.getPath()` 或 Runtime Session 的对象句柄完成；只有改变数据时才会产生 ChangeSet。

## 用语义路径更新数据

如果不想自己查找数组下标或拼 JSON Pointer，可以使用 `daisy-space-runtime` 的 `DaisyDataSession`。它允许你用稳定对象 ID 和语义路径更新数据，再由内部的 Path Update Driver 转换成 ChangeSet。

例如，把对象 `sat-1` 的名称改掉：

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

常用语义操作包括：

- `set`：设置字段；字段不存在时生成 `add`，存在时生成 `replace`。
- `unset`：删除字段，生成 `remove`。
- `insert` / `remove`：操作数组元素。
- `increment` / `decrement`：对已有的数值字段生成 `replace`。

`updatePath()` 默认先把请求放入队列。`flushUpdates()` 会解析路径、构造 ChangeSet、应用到 Runtime，并在 Runtime 接受后提交新的文档和 revision。没有接入 Runtime 时，它仍然可以作为纯数据编辑会话使用。

需要同步渲染时，在打开 Session 时传入 Runtime 容器和授权配置：

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

这里的 `runtimeAuthorizer` 应由宿主应用提供；开发示例可以复用前面 `createDevelopmentCapabilityContext()` 的配置。需要保存为 Package 时，可以在更新成功后调用 `dataSession.export()`，得到新的 `.daisydata` 字节和 Manifest。

## 数据如何变成渲染更新

当 ChangeSet 进入 Runtime 后，Runtime Adapter 会根据受影响的路径和字段选择更新策略：

```text
ScenarioChangeSet
  -> next Scenario document
  -> update plan
  -> Runtime Adapter
  -> daisy-space-sdk patch or rebuild
```

常见策略可以这样理解：

| 更新策略 | 常见情况 | 运行时动作 |
|------|------|------|
| `patch` | 名称、显隐、位置、姿态，以及部分 Engine 或 Clock 字段 | 只更新已有对象或组件 |
| `rebuild-component` | Widget、Layer 或部分 Component/Visual 配置变化 | 重建受影响的 Component 或 Visual |
| `rebuild-object` | 轨道运动、采样运动、中心天体等需要重新建立对象图的变化 | 重建对象及其相关组件、视觉表现和 Link |
| `rebuild-runtime` | 环境、资源或影响整体依赖关系的变化 | 重建整个 Runtime |
| `unsupported` | 稳定 ID、类型或未授权路径不允许修改 | 拒绝更新并返回结构化问题 |

例如，修改 `show` 通常只需要局部 patch；修改轨道或采样星历，可能需要重建对象；资源或环境变化，可能需要重建整个 Runtime。这个选择由 Runtime Adapter 的更新规则决定，不是 Schema 在执行“渲染语句”。

局部更新失败时，Runtime 会返回 `issues`，并尽量恢复到更新前的定义。调用方应检查 `result.applied`，并根据 `issues` 决定提示用户、重试还是回滚。

## 和 `daisySpace-Editor` 协作

对于 SDK 使用者，最实用的理解是：`daisySpace-Editor` 是一个用于创建和维护 Scenario 的应用，而 Scenario 是 Editor、Runtime 与其他应用之间共享的数据边界。

你可以按下面的方式协作：

1. 在 Editor 中创建对象、组件、资源引用和时间线，并保存或导出 Scenario。
2. 在自己的 SDK 应用中用 `DaisyRuntime.loadScenario()` 加载同一份 Scenario 或 `.daisydata`。
3. 需要程序化编辑时，用 `@daisyspace/scenario-core` 创建 `ScenarioCommand`，或用 `DaisyDataSession.updatePath()`。
4. 把 ChangeSet 应用到 Runtime；需要长期保存时，再导出更新后的 Scenario Package。
5. 将导出的结果重新交给 Editor，继续使用属性面板、资源管理和历史操作。

Editor 内部的面板、表单、树、选择和项目存储属于应用层；Scenario 的结构、ChangeSet 的语义和 Runtime 的渲染适配属于公共 SDK 链路。作为使用者，你只需要围绕可保存的 Scenario 数据和公开的 Session/Command API 编写集成，不必复制一套对象同步逻辑。

## 哪些操作不一定修改 Scenario

时间播放、时间倍率、相机移动、选择、hover、2D/3D 模式和调试显示，通常是当前 Runtime 会话的即时状态，不一定应该写回 Scenario。

一个简单的判断标准是：

- 希望下次打开时恢复的场景内容，用 Scenario 字段和 ChangeSet 表达。
- 只影响当前预览或交互过程的状态，直接使用 Runtime 或 `daisy-space-sdk` 的实时 API。

这样既能保持场景文件稳定，也能让相机和交互状态保持即时响应。

## 如何选择入口

| 需求 | 推荐入口 |
|------|------|
| 临时创建几个对象并立即显示 | 直接使用 `daisy-space-sdk` |
| 加载可保存、可复用的场景 | `DaisyRuntime` + Scenario 或 `.daisydata` |
| 实现属性编辑、撤销重做和项目保存 | `@daisyspace/scenario-core` + `ScenarioHistory` |
| 按对象 ID 和字段路径更新，并同步 Runtime | `DaisyDataSession` |
| 只控制时间、相机、选择等即时状态 | Runtime / `daisy-space-sdk` 实时 API |

最后记住：Scenario 保存的是可序列化定义；`Engine`、`Entity`、`Feature`、Runtime Handle 和 Session 都是运行时对象。应用重新加载 Scenario 时，应让 Runtime 根据定义重新创建这些对象。
