import type { DemoDefinition } from "../../infra/types";
export const followTargetDemo: DemoDefinition = {
    id: "camera-follow-target", title: "相机跟随", subtitle: "followTarget / switchToCelestial",
    problem: "展示如何把相机跟随到实体或物理对象上，并切换观测目标。",
    module: "camera", tags: ["camera", "follow"], difficulty: "basic", preset: "earth-timeline",
    code: () => import("./FollowTarget.svelte?raw").then((m) => m.default),
    component: () => import("./FollowTarget.svelte"),
};
export const extraCameraPipDemo: DemoDefinition = {
    id: "camera-extra-camera-pip", title: "多机位分镜", subtitle: "ExtraCamera + PiP",
    problem: "展示主相机、卫星特写和测站分镜的多机位画中画联动。",
    module: "camera", tags: ["camera", "pip", "frustum"], difficulty: "advanced", preset: "earth-timeline",
    code: () => import("./ExtraCameraPip.svelte?raw").then((m) => m.default),
    component: () => import("./ExtraCameraPip.svelte"),
};
export const arcRotateCameraDemo: DemoDefinition = {
    id: "camera-arc-rotate", title: "ArcRotateCamera", subtitle: "环绕旋转相机",
    problem: "展示围绕目标的环绕旋转视角，用于静态观察和姿态查看。",
    module: "camera", tags: ["camera", "rotate"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./ArcRotateCamera.svelte?raw").then((m) => m.default),
    component: () => import("./ArcRotateCamera.svelte"),
};
export const cameraDemos: DemoDefinition[] = [followTargetDemo, extraCameraPipDemo, arcRotateCameraDemo];
