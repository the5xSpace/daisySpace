import type { DemoDefinition } from "../../infra/types";
export const imageryTypesDemo: DemoDefinition = {
    id: "geolayer-imagery-types", title: "影像源", subtitle: "XYZ / OSM / ArcGIS 影像配置",
    module: "geoLayer", tags: ["imagery", "xyz"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./ImageryTypes.svelte?raw").then((m) => m.default),
    component: () => import("./ImageryTypes.svelte"),
};
export const terrainDemo: DemoDefinition = {
    id: "geolayer-terrain", title: "地形", subtitle: "地形加载与配置",
    module: "geoLayer", tags: ["terrain", "dem"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./Terrain.svelte?raw").then((m) => m.default),
    component: () => import("./Terrain.svelte"),
};
export const skyDemo: DemoDefinition = {
    id: "geolayer-sky", title: "天空盒子", subtitle: "天空盒/大气效果",
    module: "geoLayer", tags: ["sky", "atmosphere"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./Sky.svelte?raw").then((m) => m.default),
    component: () => import("./Sky.svelte"),
};
export const nightTilesDemo: DemoDefinition = {
    id: "geolayer-night-tiles", title: "夜间瓦片", subtitle: "NightTileLayer 日夜影像",
    problem: "显示地球夜侧影像，可在 Daisy 内置离线瓦片与 NASA GIBS 在线瓦片之间切换。",
    module: "geoLayer", tags: ["imagery", "night", "2d", "3d"], difficulty: "intermediate", preset: "earth-basic",
    assets: ["NASA GIBS VIIRS CityLights 2012"],
    code: () => import("./NightTiles.svelte?raw").then((m) => m.default),
    component: () => import("./NightTiles.svelte"),
};
export const geoLayerDemos: DemoDefinition[] = [imageryTypesDemo, terrainDemo, skyDemo, nightTilesDemo];
