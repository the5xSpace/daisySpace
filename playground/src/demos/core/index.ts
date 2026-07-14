import type { DemoDefinition } from "../../infra/types";

export const engineCreate: DemoDefinition = {
    id: "core-engine-create", title: "Engine 创建", subtitle: "引擎初始化与基本配置",
    module: "core", tags: ["core", "engine"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./EngineCreate.svelte?raw").then((m) => m.default),
    component: () => import("./EngineCreate.svelte"),
};
export const timeSchedule: DemoDefinition = {
    id: "core-time-schedule", title: "任务调度", subtitle: "时间调度 + TaskTimeLineWidget + TaskGanttWidget",
    module: "core", tags: ["time", "widget", "task"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./TimeSchedule.svelte?raw").then((m) => m.default),
    component: () => import("./TimeSchedule.svelte"),
};
export const timeFormatWidgets: DemoDefinition = {
    id: "core-time-format-widgets", title: "时间格式化", subtitle: "全局/局部时间 Formatter + 绝对/本地/相对时",
    module: "core", tags: ["time", "widget", "formatter"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./TimeFormatWidgets.svelte?raw").then((m) => m.default),
    component: () => import("./TimeFormatWidgets.svelte"),
};
export const eventSystem: DemoDefinition = {
    id: "core-event-system", title: "事件系统", subtitle: "点击/悬停/自定义事件（交互式）",
    module: "core", tags: ["event", "click", "hover"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./EventSystem.svelte?raw").then((m) => m.default),
    component: () => import("./EventSystem.svelte"),
};
export const viewDistance: DemoDefinition = {
    id: "core-view-distance", title: "视距策略", subtitle: "LOD 显示控制（交互式）",
    module: "core", tags: ["lod", "distance"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./ViewDistance.svelte?raw").then((m) => m.default),
    component: () => import("./ViewDistance.svelte"),
};
export const lensFlare: DemoDefinition = {
    id: "core-lens-flare", title: "镜头光晕", subtitle: "默认启用 / 隐藏显示 / 参数调节",
    module: "core", tags: ["lens-flare", "post-process", "halo"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./LensFlare.svelte?raw").then((m) => m.default),
    component: () => import("./LensFlare.svelte"),
};

export const coreDemos: DemoDefinition[] = [
    engineCreate, lensFlare, timeSchedule, timeFormatWidgets, eventSystem, viewDistance,
];
