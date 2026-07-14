import type { DemoDefinition } from "../../infra/types";
export const controlPanelDemo: DemoDefinition = {
    id: "widgets-control-panel", title: "控制面板", subtitle: "ControlPanelWidget 控制面板",
    module: "widgets", tags: ["widget", "control"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./ControlPanel.svelte?raw").then((m) => m.default),
    component: () => import("./ControlPanel.svelte"),
};
export const widgetsComboDemo: DemoDefinition = {
    id: "widgets-combo", title: "控件集合", subtitle: "仿真时间 / 帧率监控 / 时间轴",
    problem: "展示 SimulationTime、FrameRate、NativeTimeline 三个 Widget 的组合使用，支持通过控制面板切换各组件的显示/隐藏。",
    module: "widgets", tags: ["widget", "time", "fps", "timeline"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./Widgets.svelte?raw").then((m) => m.default),
    component: () => import("./Widgets.svelte"),
};
export const earthGridDemo: DemoDefinition = {
    id: "widgets-earth-grid", title: "地球网格", subtitle: "EarthGridLayers 经纬度网格",
    module: "widgets", tags: ["widget", "grid"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./EarthGrid.svelte?raw").then((m) => m.default),
    component: () => import("./EarthGrid.svelte"),
};
export const celestialGridDemo: DemoDefinition = {
    id: "widgets-celestial-grid", title: "天球网格", subtitle: "CelestialGeodeticGrid / CelestialSphereGrid",
    module: "widgets", tags: ["widget", "celestial"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./CelestialGrid.svelte?raw").then((m) => m.default),
    component: () => import("./CelestialGrid.svelte"),
};
export const eclipticPlaneDemo: DemoDefinition = {
    id: "widgets-ecliptic-plane", title: "黄道面", subtitle: "EclipticPlaneLayers",
    module: "widgets", tags: ["widget", "ecliptic"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./EclipticPlane.svelte?raw").then((m) => m.default),
    component: () => import("./EclipticPlane.svelte"),
};
export const equatorialPlaneDemo: DemoDefinition = {
    id: "widgets-equatorial-plane", title: "赤道面", subtitle: "EquatorialPlaneLayers",
    module: "widgets", tags: ["widget", "equatorial"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./EquatorialPlane.svelte?raw").then((m) => m.default),
    component: () => import("./EquatorialPlane.svelte"),
};
export const celestialMarkerDemo: DemoDefinition = {
    id: "widgets-celestial-marker", title: "天体标记", subtitle: "CelestialMarkerWidget 远距离天体方位标记",
    problem: "当相机距离天体超过 3 万公里时，显示小圆点 + 标签标记天体方位，支持 Earth / Moon / Sun / Mars。",
    module: "widgets", tags: ["widget", "celestial", "marker"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./CelestialMarker.svelte?raw").then((m) => m.default),
    component: () => import("./CelestialMarker.svelte"),
};
export const sunConeDemo: DemoDefinition = {
    id: "widgets-sun-cone", title: "日锥", subtitle: "SunConeLayer 本影与半影",
    problem: "在 3D 中观察本影、半影并判断移动物体的太阳遮挡状态。",
    module: "widgets", tags: ["layer", "sun", "shadow", "3d"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./SunCone.svelte?raw").then((m) => m.default),
    component: () => import("./SunCone.svelte"),
};
export const widgetsDemos: DemoDefinition[] = [controlPanelDemo, widgetsComboDemo, earthGridDemo, celestialGridDemo, eclipticPlaneDemo, equatorialPlaneDemo, celestialMarkerDemo, sunConeDemo];
