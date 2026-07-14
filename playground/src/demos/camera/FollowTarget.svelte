<script>
// =============================================================================
// FollowTarget.svelte - 相机跟随 Demo
// -----------------------------------------------------------------------------
// 本文件演示相机跟随目标的基本功能：
//   - followTarget: 相机跟随实体移动
//   - switchToCelestial: 切换到天体观测模式（自由视角）
//   - TimePointTask: 时间点任务，在指定仿真时间触发回调
//
// 关键 API：
//   - engine.camera.followTarget(target, options)
//     · options.view: { distance, pitchDeg, headingDeg }
//     · distance: 跟随距离（米）
//     · pitchDeg: 俯仰角（度），负值为俯视
//     · headingDeg: 方位角（度）
//   - engine.switchToCelestial(undefined)  // 切换到天体自由视角
//   - engine.timeSchedule.addPoint(new Daisy.TimePointTask({ id, name, timeJulianTime, onTrigger }))
//     · id: 任务唯一标识
//     · name: 任务显示名称
//     · timeJulianTime: 触发时间（JulianDate）
//     · onTrigger: 触发时执行的回调函数
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化时间与场景 ─────────────────────────────────────────────────────────
// 设置仿真时间范围，20 倍速循环播放
// 轨道数据配置
const orbitData = {
    sceneTime: {
        startIso: "2026-04-20T05:30:00Z",
        currentIso: "2026-04-20T06:00:00Z",
        stopIso: "2026-04-20T14:30:00Z",
    },
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
};

const startTime = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.startIso));
const now = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.currentIso));
const stopTime = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.stopIso));
// setSceneTime(startTime, stopTime, loop): 设置场景时间范围
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(now);    // 设置当前仿真时间
engine.setMultiplier(20);      // 20 倍速
engine.setLoop(true);          // 循环播放
engine.play();

// ── 2. 创建卫星实体 ─────────────────────────────────────────────────────────
// 使用 Daisy.PW.Satellite 快捷方式创建卫星（一步到位）
// Daisy.PW.Satellite 自动处理 TLE 解析、SGP4 推算、轨迹生成等
const sat = new Daisy.PW.Satellite({
    name: "STARLINK-1008",
    tle: orbitData.tle,
    enableSpg4Propagation: false,   // 禁用实时 SGP4 推算（使用预计算轨迹）
    trajectory: { stepSeconds: 30 }, // 轨迹采样步长 30 秒
    point: { size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 42 },
    label: { text: "STARLINK-1008", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
    path: { show: true, width: 2, color: Daisy.Color.CYAN.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
});
// bindEngine: 将卫星绑定到引擎（必须调用才会显示）
sat.bindEngine(engine);
__log("卫星已创建");

// ── 3. 相机跟随卫星 ─────────────────────────────────────────────────────────
// followTarget: 相机跟随目标实体
//   view.distance: 跟随距离 5000m
//   view.pitchDeg: 俯仰角 -30°（俯视）
//   view.headingDeg: 方位角 0°（正北）
engine.camera.followTarget(sat, { view: { distance: 5000, pitchDeg: -30, headingDeg: 0 } });
__log("相机已跟随卫星，距离 5000m，俯仰 -30°");

// ── 4. 时间点任务：调整跟随视角 ─────────────────────────────────────────────────
// TimePointTask: 在指定仿真时间触发回调
//   timeJulianTime: 触发时间（当前时间 + 30 秒）
//   onTrigger: 触发时执行的回调
engine.timeSchedule.addPoint(new Daisy.TimePointTask({
    id: "adjust-view",
    name: "调整跟随视角",
    timeJulianTime: Daisy.JulianDate.addSeconds(now, 30, new Daisy.JulianDate()),
    onTrigger: () => {
        // 重新调用 followTarget 可动态更新跟随参数
        engine.camera.followTarget(sat, { view: { distance: 10000, pitchDeg: -60, headingDeg: 45 } });
        __log("[仿真+30s] 跟随视角已调整：距离 10000m，俯仰 -60°，方位 45°");
    },
}));

// ── 5. 时间点任务：切换到天体观测模式 ─────────────────────────────────────────────────
// switchToCelestial: 切换到天体自由视角（取消跟随）
//   参数 undefined 表示不锁定特定天体，用户可自由旋转视角
engine.timeSchedule.addPoint(new Daisy.TimePointTask({
    id: "observe-mode",
    name: "切换观测模式",
    timeJulianTime: Daisy.JulianDate.addSeconds(now, 60, new Daisy.JulianDate()),
    onTrigger: () => {
        engine.switchToCelestial(undefined);
        __log("[仿真+60s] 已切换为观测模式");
    },
}));

// ── 6. 启动日志 ─────────────────────────────────────────────────────────
__log("相机跟随示例已启动");
</script>
