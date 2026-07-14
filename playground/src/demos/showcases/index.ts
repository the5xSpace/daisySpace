import type { DemoDefinition } from "../../infra/types";
export const satToGroundLinkDemo: DemoDefinition = {
    id: "scene-sat-ground-link", title: "卫星-站链路", subtitle: "卫星与地面站链路通信场景",
    problem: "把卫星、地面站、窗口期和流动链路组合成一个完整通信场景。",
    module: "showcases", tags: ["scene", "link"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./SatToGroundLink.svelte?raw").then((m) => m.default),
    component: () => import("./SatToGroundLink.svelte"),
};
export const multiSensorCoverageDemo: DemoDefinition = {
    id: "scene-multi-sensor-coverage", title: "多传感器覆盖", subtitle: "多传感器覆盖合并场景",
    problem: "把多个传感器的覆盖结果合并成一个工作流场景。",
    module: "showcases", tags: ["scene", "sensor", "coverage"], difficulty: "advanced", preset: "earth-timeline",
    code: () => import("./MultiSensorCoverage.svelte?raw").then((m) => m.default),
    component: () => import("./MultiSensorCoverage.svelte"),
};
export const constellationOverviewDemo: DemoDefinition = {
    id: "scene-constellation", title: "星座概览", subtitle: "多卫星星座场景",
    problem: "展示星座对象如何以概览形式聚合、浏览和分析。",
    module: "showcases", tags: ["scene", "constellation"], difficulty: "advanced", preset: "earth-timeline",
    code: () => import("./ConstellationOverview.svelte?raw").then((m) => m.default),
    component: () => import("./ConstellationOverview.svelte"),
};
export const earthMoonHandoffDemo: DemoDefinition = {
    id: "scene-earth-moon", title: "地月切换", subtitle: "地球-月球场景切换",
    problem: "展示如何在地球和月球场景之间切换观察重心。",
    module: "showcases", tags: ["scene", "earth", "moon"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./EarthMoonHandoff.svelte?raw").then((m) => m.default),
    component: () => import("./EarthMoonHandoff.svelte"),
};
export const showcasesDemos: DemoDefinition[] = [satToGroundLinkDemo, multiSensorCoverageDemo, constellationOverviewDemo, earthMoonHandoffDemo];
