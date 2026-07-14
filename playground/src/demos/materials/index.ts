import type { DemoDefinition } from "../../infra/types";

export const materialsGalleryDemo: DemoDefinition = {
    id: "materials-gallery",
    title: "内置材质展示",
    subtitle: "普通/面/线材质综合展示",
    module: "materials",
    tags: ["material", "solid", "surface", "polyline"],
    difficulty: "intermediate",
    preset: "earth-basic",
    code: () => import("./MaterialsGallery.svelte?raw").then((m) => m.default),
    component: () => import("./MaterialsGallery.svelte"),
};

export const customMaterialDemo: DemoDefinition = {
    id: "custom-material",
    title: "自定义材质",
    subtitle: "自定义 Shader 与自定义材质",
    module: "materials",
    tags: ["material", "shader", "custom", "surface"],
    difficulty: "advanced",
    preset: "earth-basic",
    code: () => import("./CustomMaterial.svelte?raw").then((m) => m.default),
    component: () => import("./CustomMaterial.svelte"),
};

export const materialsDemos: DemoDefinition[] = [materialsGalleryDemo, customMaterialDemo];
