import type { DemoDefinition } from "../../infra/types";

export const spg4ParseDemo: DemoDefinition = {
    id: "pw-spg4-parse", title: "SGP4 轨道解析与外推", subtitle: "parseOrbitMetadata · parseOrbitElements · parseTle · observeAt",
    problem: "展示 SGP4 模型轨道解析能力：TLE 解析为 OrbitMetadata/OrbitElements，observeAt 即时外推输出 LLA / TEME / ECI 三坐标系。",
    module: "physicalWorld", tags: ["sgp4", "tle", "parse", "observe", "ephemeris"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./Spg4Parse.svelte?raw").then((m) => m.default),
    component: () => import("./Spg4Parse.svelte"),
};
export const spg4EphemerisDemo: DemoDefinition = {
    id: "pw-spg4-ephemeris", title: "SGP4 星历采样", subtitle: "ephemeris · 多步长 · LLA / TEME / ECI 同步展示",
    problem: "展示 ephemeris 星历采样：五档步长 (10s~10min) 可切换，一次性呈现经纬度高程 / TEME / ECI 三坐标系逗号分隔序列。",
    module: "physicalWorld", tags: ["sgp4", "ephemeris", "sampling", "coordinates"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./Spg4Ephemeris.svelte?raw").then((m) => m.default),
    component: () => import("./Spg4Ephemeris.svelte"),
};
export const spg4ForecastDemo: DemoDefinition = {
    id: "pw-spg4-forecast", title: "SGP4 过境与窗口预报", subtitle: "findTransits · satelliteVisibilityWindows · visibilityWindows",
    problem: "展示 SGP4 时间窗预报能力：过境计算（STARLINK / ISS）、双星交汇互视（STARLINK-1008 ↔ QIANFAN-1）、地面可见窗口。",
    module: "physicalWorld", tags: ["sgp4", "transit", "conjunction", "visibility", "window"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./Spg4Forecast.svelte?raw").then((m) => m.default),
    component: () => import("./Spg4Forecast.svelte"),
};
export const satelliteBeamDemo: DemoDefinition = {
    id: "pw-satellite-beam", title: "卫星波束展示", subtitle: "多方向传感器 + 动态扫描波束",
    problem: "展示卫星传感器的多方向波束（前/后/左/右/上/下视）和动态扫描效果。",
    module: "physicalWorld", tags: ["satellite", "sensor", "beam", "scan"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./SatelliteBeam.svelte?raw").then((m) => m.default),
    component: () => import("./SatelliteBeam.svelte"),
};
export const satelliteConstellationDemo: DemoDefinition = {
    id: "pw-satellite-constellation", title: "星座批量创建", subtitle: "批量创建多颗卫星",
    problem: "展示如何批量创建与管理星座级卫星对象。",
    module: "physicalWorld", tags: ["satellite", "constellation", "batch"], difficulty: "advanced", preset: "earth-timeline",
    code: () => import("./SatelliteConstellation.svelte?raw").then((m) => m.default),
    component: () => import("./SatelliteConstellation.svelte"),
};
export const starlinkConstellationDemo: DemoDefinition = {
    id: "pw-starlink-constellation", title: "Starlink 大型星座", subtitle: "Daisy.PW.Satellite + hover 轨迹线 + 调速 / 帧率 / 时间轴",
    problem: "读取压缩星历文本，批量创建 Starlink 星座卫星对象；普通卫星低频保活，hover/click 卫星显示大标签与轨迹线，便于大规模实体交互性能测试。",
    module: "physicalWorld", tags: ["satellite", "starlink", "constellation", "benchmark", "webgpu"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./StarlinkConstellation.svelte?raw").then((m) => m.default),
    component: () => import("./StarlinkConstellation.svelte"),
};
export const groundStationDemo: DemoDefinition = {
    id: "pw-ground-station", title: "地面站", subtitle: "天线模型 + 盘旋目标 + 跟踪波束",
    problem: "展示地面站如何驱动天线模型、持续跟踪空中目标，并用链路表达测控/遥测能力。",
    module: "physicalWorld", tags: ["ground-station", "ground", "station"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./GroundStation.svelte?raw").then((m) => m.default),
    component: () => import("./GroundStation.svelte"),
};
export const sensorBeamDemo: DemoDefinition = {
    id: "pw-sensor-beam", title: "传感器波束", subtitle: "Sensor 波束可视化",
    problem: "展示传感器波束的基础绘制与朝向配置。",
    module: "physicalWorld", tags: ["sensor", "beam"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./SensorBeam.svelte?raw").then((m) => m.default),
    component: () => import("./SensorBeam.svelte"),
};
export const sensorCoverageDemo: DemoDefinition = {
    id: "pw-sensor-coverage", title: "传感器覆盖", subtitle: "覆盖区域合并绘制",
    problem: "展示多时刻覆盖区域如何采样、绘制和合并。",
    module: "physicalWorld", tags: ["sensor", "coverage", "merge"], difficulty: "advanced", preset: "earth-timeline",
    code: () => import("./SensorCoverage.svelte?raw").then((m) => m.default),
    component: () => import("./SensorCoverage.svelte"),
};
export const linkCommunicationDemo: DemoDefinition = {
    id: "pw-link-communication", title: "链路通信", subtitle: "Link 静态/动态/流动箭头",
    problem: "展示链路窗口、流动箭头和传输方向的组合表达。",
    module: "physicalWorld", tags: ["link", "communication", "flow"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./LinkCommunication.svelte?raw").then((m) => m.default),
    component: () => import("./LinkCommunication.svelte"),
};
export const groundTrackDemo: DemoDefinition = {
    id: "pw-ground-track", title: "星下点", subtitle: "GroundTrackComponent",
    problem: "展示轨迹投影到地表后的星下点表达方式。",
    module: "physicalWorld", tags: ["groundtrack", "subpoint"], difficulty: "basic", preset: "earth-timeline",
    code: () => import("./GroundTrack.svelte?raw").then((m) => m.default),
    component: () => import("./GroundTrack.svelte"),
};
export const orbitElementsViewDemo: DemoDefinition = {
    id: "pw-orbit-elements-view", title: "轨道根数几何", subtitle: "OrbitElementsViewComponent",
    problem: "展示轨道根数几何视图如何辅助理解轨道状态。",
    module: "physicalWorld", tags: ["orbit", "elements", "geometry"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./OrbitElementsView.svelte?raw").then((m) => m.default),
    component: () => import("./OrbitElementsView.svelte"),
};
export const aircraftDemo: DemoDefinition = {
    id: "pw-aircraft", title: "飞行器", subtitle: "Aircraft 对象",
    problem: "展示机载对象如何挂载位置、轨迹和可视化特征。",
    module: "physicalWorld", tags: ["aircraft", "plane"], difficulty: "basic", preset: "earth-timeline",
    code: () => import("./Aircraft.svelte?raw").then((m) => m.default),
    component: () => import("./Aircraft.svelte"),
};
export const vehicleVesselDemo: DemoDefinition = {
    id: "pw-vehicle-vessel", title: "车船对象", subtitle: "Vehicle / Vessel",
    problem: "展示地面车辆和海上载具的基础对象建模方式。",
    module: "physicalWorld", tags: ["vehicle", "vessel", "ship"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./VehicleVessel.svelte?raw").then((m) => m.default),
    component: () => import("./VehicleVessel.svelte"),
};
export const freeObjectDemo: DemoDefinition = {
    id: "pw-free-object", title: "自由对象", subtitle: "FreeObject 通用载荷平台",
    problem: "展示自由对象如何承载模型、路径、传感器、碰撞球与弹窗，并用汽车场景串起多种装配方式。",
    module: "physicalWorld", tags: ["free", "object", "vehicle", "payload"], difficulty: "intermediate", preset: "earth-timeline",
    code: () => import("./FreeObject.svelte?raw").then((m) => m.default),
    component: () => import("./FreeObject.svelte"),
};
export const moonDemo: DemoDefinition = {
    id: "pw-moon", title: "月球", subtitle: "Moon 椭球+晨昏线+网格",
    problem: "展示月球场景的观测方式和天体辅助层。",
    module: "physicalWorld", tags: ["moon", "celestial"], difficulty: "intermediate", preset: "moon",
    code: () => import("./Moon.svelte?raw").then((m) => m.default),
    component: () => import("./Moon.svelte"),
};
export const constellationDemo: DemoDefinition = {
    id: "pw-constellation", title: "星座容器", subtitle: "Constellation.addSatellite / bindEngine / allSensors",
    problem: "展示 Daisy.PW.Constellation 容器的基本用法：创建卫星、添加星座、绑定引擎、聚合数据。",
    module: "physicalWorld", tags: ["constellation", "container", "satellite"], difficulty: "basic", preset: "earth-basic",
    code: () => import("./Constellation.svelte?raw").then((m) => m.default),
    component: () => import("./Constellation.svelte"),
};

export const routeDemo: DemoDefinition = {
    id: "pw-route", title: "飞行航路组件", subtitle: "RouteComponent · 航点+图标+标签+Popover · 大圆弧连线",
    problem: "演示 RouteComponent 的基本用法：通过 FreeObject 挂载航路组件，定义起点/途经点/终点，每个航点含图标、标题/副标题标签、鼠标悬停 Popover 弹窗。",
    module: "physicalWorld", tags: ["route", "waypoint", "routecomponent", "nav"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./RouteDemo.svelte?raw").then((m) => m.default),
    component: () => import("./RouteDemo.svelte"),
};

export const openSkyFlightsDemo: DemoDefinition = {
    id: "pw-opensky-flights", title: "OpenSky 实时航班", subtitle: "OpenSky Network API · 全球航班状态向量 · 30s 自动刷新",
    problem: "调用 OpenSky Network REST API 获取当前所有航班状态向量（icao24/callsign/位置/高度/速度），以彩色点标记+呼号标签展示在地球上，颜色编码海拔高度，每 30 秒自动刷新。",
    module: "physicalWorld", tags: ["opensky", "flight", "adsb", "aircraft", "realtime"], difficulty: "intermediate", preset: "earth-basic",
    code: () => import("./OpenSkyFlights.svelte?raw").then((m) => m.default),
    component: () => import("./OpenSkyFlights.svelte"),
};

export const rocketLaunchDemo: DemoDefinition = {
    id: "pw-rocket-launch", title: "火箭主动段弹道仿真", subtitle: "AscentTrajectoryBuilder · 多级火箭 · 重力转弯 · 大气阻力",
    problem: "使用 AscentTrajectoryBuilder 生成火箭主动段弹道轨迹，配备 Saturn V 3D 模型和实时参数面板。支持单级/双级、偏转程序、大气阻力可调。",
    module: "physicalWorld", tags: ["rocket", "launch", "ascent", "gravity-turn", "trajectory"], difficulty: "advanced", preset: "earth-basic",
    code: () => import("./RocketLaunchDemo.svelte?raw").then((m) => m.default),
    component: () => import("./RocketLaunchDemo.svelte"),
};

export const marsDemo: DemoDefinition = {
    id: "pw-mars", title: "火星", subtitle: "Mars 椭球+大气+网格",
    problem: "展示火星场景的观测方式和大气/网格组合。",
    module: "physicalWorld", tags: ["mars", "celestial"], difficulty: "intermediate", preset: "mars",
    code: () => import("./Mars.svelte?raw").then((m) => m.default),
    component: () => import("./Mars.svelte"),
};

export const physicalWorldDemos: DemoDefinition[] = [
    spg4ParseDemo, spg4EphemerisDemo, spg4ForecastDemo, satelliteBeamDemo, satelliteConstellationDemo, starlinkConstellationDemo, groundStationDemo,
    sensorBeamDemo, sensorCoverageDemo, linkCommunicationDemo,
    groundTrackDemo, orbitElementsViewDemo, aircraftDemo,
    vehicleVesselDemo, freeObjectDemo, moonDemo, marsDemo,
    constellationDemo, routeDemo, rocketLaunchDemo,
];
