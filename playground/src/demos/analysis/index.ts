import type { DemoDefinition } from "../../infra/types";

export const beamProjectorDemo: DemoDefinition = {
    id: "analysis-beam-projector", title: "BeamProjector 波束投影", subtitle: "CPU 后端波束投影计算",
    problem: "展示 BeamProjector 的波束投影计算能力：从卫星矩阵 + 传感器参数生成地面 footprint。",
    module: "analysis", tags: ["beam", "projector", "footprint", "coverage", "cpu"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./BeamProjectorDemo.svelte?raw").then((m) => m.default),
    component: () => import("./BeamProjectorDemo.svelte"),
};

export const constellationCoverageDemo: DemoDefinition = {
    id: "analysis-constellation-coverage", title: "星座覆盖分析", subtitle: "Constellation + ConstellationCoverageAnalysis",
    problem: "展示 Constellation 容器 + ConstellationCoverageAnalysis 的覆盖分析能力：星座多星、覆盖网格、重访时间。",
    module: "analysis", tags: ["constellation", "coverage", "analysis", "revisit"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./ConstellationCoverageDemo.svelte?raw").then((m) => m.default),
    component: () => import("./ConstellationCoverageDemo.svelte"),
};

export const gpuComputeDemo: DemoDefinition = {
    id: "analysis-gpu-compute", title: "GPU 计算测试 (gpu-io)", subtitle: "gpu-io offscreen context + fragment shader + readPixels 管线验证",
    problem: "验证 gpu-io 的 GPUComposer / GPULayer / GPUProgram 管线是否正常运行，以及 GpuDeviceManager 的 offscreen context 创建是否成功。",
    module: "analysis", tags: ["gpu-io", "compute", "gpgpu", "infrastructure"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./GpuComputeDemo.svelte?raw").then((m) => m.default),
    component: () => import("./GpuComputeDemo.svelte"),
};

export const qianfanCoverageDemo: DemoDefinition = {
    id: "analysis-qianfan-coverage", title: "千帆星座覆盖分析", subtitle: "QIANFAN 164星 + 连续覆盖",
    problem: "千帆星座 164 颗卫星的时间窗覆盖分析。使用 TLE + SGP4 轨道传播 + ConstellationCoverageAnalysis，支持 6/12/24 小时范围、30/60/300 秒步长，并按每颗卫星连续覆盖显示结果。",
    module: "analysis", tags: ["qianfan", "constellation", "coverage", "tle", "sgp4", "continuous", "gpu-io"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./QianfanCoverage.svelte?raw").then((m) => m.default),
    component: () => import("./QianfanCoverage.svelte"),
};

export const analysisDemos: DemoDefinition[] = [beamProjectorDemo, constellationCoverageDemo, /* gpuComputeDemo, */ qianfanCoverageDemo];
