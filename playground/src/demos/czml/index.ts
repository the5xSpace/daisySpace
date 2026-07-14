import type { DemoDefinition } from "../../infra/types";

export const czmlImportDemo: DemoDefinition = {
    id: "czml-import",
    title: "CZML 示例",
    subtitle: "CZML 数据导入与渲染",
    problem: "展示同一份 CZML 数据在 Daisy 模式与 CzmlImporter 的 Cesium 回退模式下的渲染差异，默认左右分屏对比，也可聚焦单侧查看。",
    module: "czml",
    tags: ["czml", "import"],
    difficulty: "intermediate",
    
    preset: "earth-timeline",
    code: () => import("./CzmlImport.svelte?raw").then((m) => m.default),
    component: () => import("./CzmlImport.svelte"),
};

export const czmlDemos: DemoDefinition[] = [czmlImportDemo];
