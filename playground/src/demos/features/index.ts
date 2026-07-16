import type { DemoDefinition } from "../../infra/types";

export const ellipticalConeDemo: DemoDefinition = {
    id: "features-elliptical-cone", title: "柱体/锥体组件", subtitle: "Cylinder / Prism / Cone",
    module: "features", tags: ["cone", "cylinder", "prism", "solid"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./EllipticalCone.svelte?raw").then((m) => m.default),
    component: () => import("./EllipticalCone.svelte"),
};
export const sphereFeatureDemo: DemoDefinition = {
    id: "features-sphere-feature", title: "球面组件", subtitle: "Sphere / Texture / Outline / Ellipsoid",
    module: "features", tags: ["sphere", "ellipsoid", "solid", "texture"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./SphereFeature.svelte?raw").then((m) => m.default),
    component: () => import("./SphereFeature.svelte"),
};
export const coneOrientationControls: DemoDefinition = {
    id: "features-cone-orientation-controls", title: "方向椎体交互控制", subtitle: "旋转动画 · 多方向 · 坐标轴可视化",
    module: "features", tags: ["cone", "orientation", "controls", "animation"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./ConeOrientationControls.svelte?raw").then((m) => m.default),
    component: () => import("./ConeOrientationControls.svelte"),
};
export const lineFeaturesDemo: DemoDefinition = {
    id: "features-line-features", title: "线性图形组件", subtitle: "Polyline / Dash / Glow / Arrow / Corridor / Wall",
    module: "features", tags: ["polyline", "dash", "glow", "arrow", "corridor", "wall", "line"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./LineFeatures.svelte?raw").then((m) => m.default),
    component: () => import("./LineFeatures.svelte"),
};
export const areaFeaturesDemo: DemoDefinition = {
    id: "features-area-features", title: "几何图形组件", subtitle: "Polygon / Ellipse",
    module: "features", tags: ["polygon", "ellipse", "area"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./AreaFeatures.svelte?raw").then((m) => m.default),
    component: () => import("./AreaFeatures.svelte"),
};
export const markerFeaturesDemo: DemoDefinition = {
    id: "features-marker-features", title: "标签组件", subtitle: "Point / Billboard / Label / Popover",
    module: "features", tags: ["point", "billboard", "label", "marker"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./MarkerFeatures.svelte?raw").then((m) => m.default),
    component: () => import("./MarkerFeatures.svelte"),
};
export const modelFeatureDemo: DemoDefinition = {
    id: "features-model-feature", title: "模型组件", subtitle: "Space Formation / Node Transform / Animation",
    module: "features", tags: ["model", "gltf", "glb", "space", "node", "animation"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./ModelFeature.svelte?raw").then((m) => m.default),
    component: () => import("./ModelFeature.svelte"),
};
export const arrowPointerDemo: DemoDefinition = {
    id: "features-arrow-pointer", title: "天体/目标/位置指向", subtitle: "ArrowPointerFeature",
    module: "features", tags: ["arrow", "pointer", "celestial"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./ArrowPointer.svelte?raw").then((m) => m.default),
    component: () => import("./ArrowPointer.svelte"),
};
export const trailPathDemo: DemoDefinition = {
    id: "features-trail-path", title: "轨迹尾迹", subtitle: "TrailPathFeature",
    module: "features", tags: ["trail", "path", "track"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./TrailPath.svelte?raw").then((m) => m.default),
    component: () => import("./TrailPath.svelte"),
};
export const particleSystemWorkbench: DemoDefinition = {
    id: "features-particle-system-workbench", title: "粒子系统工作台", subtitle: "发射器类型 · 寿命 · 速度 · 弹道 · 重力",
    module: "features", tags: ["particle", "workbench", "lab"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./ParticleSystemWorkbench.svelte?raw").then((m) => m.default),
    component: () => import("./ParticleSystemWorkbench.svelte"),
};
export const capsuleParticleWorkbench: DemoDefinition = {
    id: "features-capsule-particle-workbench", title: "胶囊粒子工作台", subtitle: "世界锚定 Sprite 面片 · 宿主绑定喷焰",
    module: "features", tags: ["capsule", "particle", "sprite", "flame", "workbench"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./CapsuleParticleWorkbench.svelte?raw").then((m) => m.default),
    component: () => import("./CapsuleParticleWorkbench.svelte"),
};
export const shaderPolygonDemo: DemoDefinition = {
    id: "features-shader-polygon", title: "Shader多边形", subtitle: "ShaderPolygonFeature",
    module: "features", tags: ["shader", "polygon", "custom"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./ShaderPolygon.svelte?raw").then((m) => m.default),
    component: () => import("./ShaderPolygon.svelte"),
};
export const shaderPolygonPerf: DemoDefinition = {
    id: "features-shader-polygon-perf", title: "Shader多边形压测", subtitle: "贴地polygon性能 · 数量/尺寸参数化",
    module: "features", tags: ["shader", "polygon", "performance", "stress"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./ShaderPolygonPerf.svelte?raw").then((m) => m.default),
    component: () => import("./ShaderPolygonPerf.svelte"),
};
export const tilesetFeatureDemo: DemoDefinition = {
    id: "features-tileset-feature", title: "3DTiles", subtitle: "TilesetFeature",
    module: "features", tags: ["3dtiles", "tileset"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./TilesetFeature.svelte?raw").then((m) => m.default),
    component: () => import("./TilesetFeature.svelte"),
};
export const boundBoxDemo: DemoDefinition = {
    id: "features-bound-box", title: "包围盒", subtitle: "BoundBoxFeature",
    module: "features", tags: ["boundbox", "bbox", "bounding"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./BoundBox.svelte?raw").then((m) => m.default),
    component: () => import("./BoundBox.svelte"),
};
export const popoverDemo: DemoDefinition = {
    id: "features-popover", title: "弹出层组件", subtitle: "PopoverFeature DOM Overlay",
    problem: "展示 PopoverFeature 的四种锚点方向（top/bottom/left/right）和三种触发模式（always/click/hover）。",
    module: "features", tags: ["popover", "overlay", "dom", "popup"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./Popover.svelte?raw").then((m) => m.default),
    component: () => import("./Popover.svelte"),
};
export const polylineTrackingDemo: DemoDefinition = {
    id: "features-polyline-tracking", title: "折线动态追踪", subtitle: "PolylineFeature pathway.trackTarget 自动跟踪",
    problem: "展示 PolylineFeature 通过 trackTarget / trackingTarget 自动补全 pathway，并让折线端点跟随动态 Entity 与静态中继点。",
    module: "features", tags: ["polyline", "tracking", "trackTarget", "pathway", "dynamic"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./PolylineTracking.svelte?raw").then((m) => m.default),
    component: () => import("./PolylineTracking.svelte"),
};

export const heatmapFeatureDemo: DemoDefinition = {
    id: "heatmap-feature", title: "热力覆盖图", subtitle: "合成覆盖栅格 + thermal 色标",
    problem: "展示 HeatmapFeature 将 CoverageGrid 渲染为热力图叠加在地球表面。",
    module: "features", tags: ["heatmap", "coverage", "grid", "visualization"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./HeatmapFeature.svelte?raw").then((m) => m.default),
    component: () => import("./HeatmapFeature.svelte"),
};

export const coverageAreaFeatureDemo: DemoDefinition = {
    id: "coverage-area-feature", title: "多色地面覆盖", subtitle: "不规则多边形 + 独立颜色 + 硬件加速填充",
    problem: "展示 CoverageAreaFeature 将多个不规则经纬度多边形以各自颜色栅格化为地面覆盖叠加在地球表面。利用 Canvas 2D fill 硬件加速，支持数百个复杂多边形高性能渲染。",
    module: "features", tags: ["coverage", "area", "grid", "step"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./CoverageAreaFeature.svelte?raw").then((m) => m.default),
    component: () => import("./CoverageAreaFeature.svelte"),
};

export const freeGeometryDemo: DemoDefinition = {
    id: "features-free-geometry", title: "自定义几何组件", subtitle: "小熊 / 二十面体 / 钻石星 · 线框切换",
    problem: "展示 FreeGeometryFeature 用顶点和索引自定义任意 3D 几何体。支持线框模式运行时切换。",
    module: "features", tags: ["freegeometry", "custom", "wireframe", "bear", "icosahedron"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./FreeGeometryFeature.svelte?raw").then((m) => m.default),
    component: () => import("./FreeGeometryFeature.svelte"),
};

export const geoJsonFeatureDemo: DemoDefinition = {
    id: "geojson-feature", title: "GeoJSON 绘制", subtitle: "URL/对象加载 + 回调转换 + 自动渲染",
    problem: "展示 GeoJsonFeature 从 URL 或内存加载 GeoJSON（FeatureCollection / Feature / MultiPolygon），提供回调让用户在渲染前修改多边形属性和选项，最终委托 CoverageAreaFeature 管线自动渲染为地面覆盖。",
    module: "features", tags: ["geojson", "load", "callback", "map"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./GeoJsonFeature.svelte?raw").then((m) => m.default),
    component: () => import("./GeoJsonFeature.svelte"),
};

export const featuresDemos: DemoDefinition[] = [
    ellipticalConeDemo, sphereFeatureDemo, coneOrientationControls, lineFeaturesDemo, areaFeaturesDemo,
    markerFeaturesDemo, modelFeatureDemo, arrowPointerDemo, trailPathDemo,
    particleSystemWorkbench, capsuleParticleWorkbench, shaderPolygonDemo, shaderPolygonPerf, tilesetFeatureDemo, boundBoxDemo, popoverDemo, polylineTrackingDemo,
    heatmapFeatureDemo, coverageAreaFeatureDemo, geoJsonFeatureDemo, freeGeometryDemo,
];
