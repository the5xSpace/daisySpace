<script>
// =============================================================================
// LiteController.svelte - 精简控制面板 Demo
// -----------------------------------------------------------------------------
// 本文件演示 ControlPanelWidget 的精简模式（mode: "lite"）：
//   - 只显示最常用的控制按钮（播放/暂停、时间倍速等）
//   - 适合小屏幕或不需要完整控制的场景
//
// 关键 API：
//   - engine.addWidget(new Daisy.ControlPanelWidget(options))
//     · options.mode: "lite" | "standard"  // 精简模式 | 标准模式
//     · options.panelOptions: {
//         preset: "rightBottom" | "leftBottom" | "rightTop" | "leftTop",
//         layout: "row" | "column",  // 布局方向
//         draggable: true | false     // 是否可拖拽
//       }
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 添加精简控制面板 ─────────────────────────────────────────────────────────
// ControlPanelWidget: 控制面板组件
// mode: "lite" - 精简模式，只显示播放/暂停、时间倍速等基本控件
// preset: "rightBottom" - 预设位置：右下角
// layout: "row" - 水平布局
// draggable: true - 允许拖拽移动
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "lite",
    panelOptions: {
        preset: "rightBottom",
        layout: "row",
        draggable: true,
    },
}));
__log("Lite control panel added via ControlPanelWidget");
</script>
