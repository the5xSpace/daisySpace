# 控制面板

[ControlPanelWidget](/api/classes/ControlPanelWidget) 封装播放/暂停/调速控件和键盘控制，支持三种模式。

## 基本用法

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.ControlPanelWidget({ mode: "standard" }))
```

## 模式

| 模式 | 说明 |
|---|---|
| `"lite"` | 仅浮动控制面板，不含键盘控制 |
| `"standard"` | 浮动面板 + 键盘控制（Space 播放/暂停） |
| `"customize"` | 自定义按钮列表，通过 `panelOptions.customize` 指定 |

## 面板选项

```typescript
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "customize",
    panelOptions: {
        preset: "leftBottom",
        layout: "column",
        draggable: true,
        customize: ["play_pause", "stop", "speedSlider", "2d_3d"],
    },
}))
```

| 选项 | 类型 | 说明 |
|------|------|------|
| `preset` | string | 预设位置：`"leftTop"` / `"rightTop"` / `"leftBottom"` / `"rightBottom"` |
| `layout` | `"row"` \| `"column"` | 按钮排列方向 |
| `draggable` | `boolean` | 是否可拖拽 |
| `customize` | `string[]` | 需显示的按钮 ID 列表 |

### 可用按钮 ID

`play_pause` / `stop` / `speed` / `speedSlider` / `2d_3d`

## 独立控制器

`ControlPanelWidget` 内部使用以下组件，也可不通过 Widget 直接创建：

```typescript
// 精简版（仅浮动面板）
const lite = new Daisy.LiteController(engine.ui, document.getElementById("controls")!)

// 标准版（面板 + 键盘）
const standard = new Daisy.StandardController(engine.ui, document.getElementById("controls")!)
```

> **相关 API**：[ControlPanelWidget](/api/classes/ControlPanelWidget) · [LiteController](/api/classes/LiteController) · [StandardController](/api/classes/StandardController)
