<script>
// =============================================================================
// StandardController.svelte - 标准控制面板 Demo
// -----------------------------------------------------------------------------
// 本文件演示 ControlPanelWidget 的标准模式（mode: "standard"）：
//   - 显示完整的控制面板（播放/暂停、时间倍速、时间轴、设置等）
//   - 适合桌面端或需要完整控制的场景
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

// ── 1. 添加标准控制面板 ─────────────────────────────────────────────────────────
// ControlPanelWidget: 控制面板组件
// mode: "standard" - 标准模式，显示完整控制功能
// preset: "leftBottom" - 预设位置：左下角
// layout: "column" - 垂直布局
// draggable: true - 允许拖拽移动
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "standard",
    panelOptions: {
        preset: "leftBottom",
        layout: "column",
        draggable: true,
    },
}));
__log("Standard control panel added via ControlPanelWidget");
</script>
