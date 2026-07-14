/**
 * 全局 Demo 注册表 — 汇聚所有模块的 DemoDefinition
 */
import type { DemoDefinition, DemoModuleGroup } from "../infra/types";

// ── 模块分组 ──
import { coreDemos } from "./core";
import { featuresDemos } from "./features";
import { physicalWorldDemos } from "./physicalWorld";
import { geoLayerDemos } from "./geoLayer";
import { cameraDemos } from "./camera";
import { materialsDemos } from "./materials";
import { widgetsDemos } from "./widgets";
import { czmlDemos } from "./czml";
import { showcasesDemos } from "./showcases";
import { analysisDemos } from "./analysis";

// ── 模块分组定义 ──
export const moduleGroups: DemoModuleGroup[] = [
    { id: "core", label: "核心", icon: "⚙", order: 0 },
    { id: "physicalWorld", label: "物理世界", icon: "🌍", order: 1 },
    { id: "features", label: "功能组件", icon: "🎨", order: 2 },
    { id: "geoLayer", label: "地理图层", icon: "🗺", order: 3 },
    { id: "camera", label: "相机", icon: "📷", order: 4 },
    { id: "materials", label: "材质", icon: "✨", order: 5 },
    { id: "widgets", label: "控件", icon: "🧩", order: 6 },
    { id: "analysis", label: "覆盖分析", icon: "📊", order: 7 },
    { id: "czml", label: "CZML", icon: "📄", order: 8 },
    { id: "showcases", label: "综合场景", icon: "🎬", order: 9 },
];

export function getDemoProblem(demo: DemoDefinition): string {
    return demo.problem ?? demo.subtitle;
}

// ── 汇聚所有 Demo ──
export const allDemos: DemoDefinition[] = [
    ...coreDemos,
    ...physicalWorldDemos,
    ...featuresDemos,
    ...geoLayerDemos,
    ...cameraDemos,
    ...materialsDemos,
    ...widgetsDemos,
    ...analysisDemos,
    ...czmlDemos,
    ...showcasesDemos,
];

/** 按 ID 查找 Demo */
export function findDemo(id: string): DemoDefinition | undefined {
    return allDemos.find((d) => d.id === id);
}

/** 按模块过滤 Demo */
export function filterByModule(moduleId: string): DemoDefinition[] {
    return allDemos.filter((d) => d.module === moduleId);
}
