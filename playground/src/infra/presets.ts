/**
 * 场景预设 — 可复用的 Engine + GeoLayer 初始化模板
 */
import * as Daisy from "daisy-space-sdk";
import { initSdkBaseUrl } from "./runtime";

export type { PresetId } from "./types";

export interface ScenePreset {
    id: string;
    label: string;
    setup: (container: HTMLElement | string) => Promise<Daisy.Engine>;
}

/** 最小地球场景（本地 XYZ + 无时间轴） */
export const earthBasic: ScenePreset = {
    id: "earth-basic",
    label: "地球基础",
    setup: async (container) => {
        initSdkBaseUrl();
        const engine = await Daisy.Engine.create(container);
        engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
        engine.geoLayer.clearImagery();
        engine.geoLayer.setBaseImagery({
            type: Daisy.GeoImageryType.XYZ,
            url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
            minLevel: 0,
            maxLevel: 3,
        });
        return engine;
    },
};

/** 地球 + 时间轴 + 控制面板 */
export const earthWithTimeline: ScenePreset = {
    id: "earth-timeline",
    label: "地球+时间轴",
    setup: async (container) => {
        initSdkBaseUrl();
        const engine = await Daisy.Engine.create(container, {
            timeline: true,
            simulationTimeWidget: true,
            controlPanel: {
                mode: "standard",
                preset: "leftBottom",
                layout: "column",
                draggable: true,
                customize: ["play_pause", "stop", "speed", "speedSlider", "loop", "step", "2d_3d"],
            },
        });
        engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
        engine.geoLayer.clearImagery();
        engine.geoLayer.setBaseImagery({
            type: Daisy.GeoImageryType.XYZ,
            url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
            minLevel: 0,
            maxLevel: 3,
        });
        return engine;
    },
};

/** 月球场景 */
export const moonScene: ScenePreset = {
    id: "moon",
    label: "月球",
    setup: async (container) => {
        initSdkBaseUrl();
        const engine = await Daisy.Engine.create(container);
        const moon = new Daisy.PW.Moon({ name: "Moon", lockCamera: true });
        engine.switchToCelestial(moon);
        moon.bindEngine(engine);
        return engine;
    },
};

/** 火星场景 */
export const marsScene: ScenePreset = {
    id: "mars",
    label: "火星",
    setup: async (container) => {
        initSdkBaseUrl();
        const engine = await Daisy.Engine.create(container);
        const mars = new Daisy.PW.Mars({ name: "Mars", lockCamera: true });
        engine.switchToCelestial(mars);
        mars.bindEngine(engine);
        return engine;
    },
};

/** 预设注册表 */
export const presets: Record<string, ScenePreset> = {
    "earth-basic": earthBasic,
    "earth-timeline": earthWithTimeline,
    moon: moonScene,
    mars: marsScene,
};

/** 获取预设 */
export function getPreset(id: string): ScenePreset | undefined {
    return presets[id];
}
