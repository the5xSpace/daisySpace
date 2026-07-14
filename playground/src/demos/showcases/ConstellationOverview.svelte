<script>
// =============================================================================
// 星座概览场景
// -----------------------------------------------------------------------------
// 展示如何创建多卫星星座并进行全局概览观察。
// 关键 API:
//   - Daisy.PW.Satellite        : 创建卫星实体
//   - satellite.bindEngine()    : 将卫星绑定到引擎
//   - engine.setSceneTime()     : 设置场景时间范围
//   - engine.setCurrentTime()   : 设置当前时间
//   - engine.camera.flyToTarget(): 飞行到目标位置
//   - satellite.groundTrack     : 显示星下点轨迹
// =============================================================================

// ── 1. 组件属性 ────────────────────────────────────────────────────────────────
// Svelte 5 props 解构：引擎、Daisy SDK、容器、日志函数、清理注册
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 2. 轨道数据配置 ──────────────────────────────────────────────────────────
// 定义场景时间范围和卫星 TLE 数据
const orbitData = {
    sceneTime: {
        startIso: "2026-04-20T05:30:00Z",
        currentIso: "2026-04-20T06:00:00Z",
        stopIso: "2026-04-20T14:30:00Z",
    },
    satellites: [
        {
            name: "STARLINK-1008-A",
            tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
        },
        {
            name: "QIANFAN-1",
            tle: `QIANFAN-1
1 60379U 24140A   26110.56333470  .00000026  00000+0  20818-4 0  9997
2 60379  88.9678 285.9224 0017010 196.8745 163.1842 13.51003321 84741`,
        },
    ],
};

// ── 3. 时间系统设置 ──────────────────────────────────────────────────────────
// 将 ISO 时间字符串转换为 JulianDate 并配置场景时间
// API: engine.setSceneTime(startTime, stopTime, loop) - 第三参数是 loop 不是 shouldAnimate
const startTime = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.startIso));
const currentTime = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.currentIso));
const stopTime = Daisy.JulianDate.fromDate(new Date(orbitData.sceneTime.stopIso));
engine.setSceneTime(startTime, stopTime, true);  // 设置时间范围并启用循环
engine.setCurrentTime(currentTime);               // 设置当前时间点
engine.setMultiplier(20);                          // 20倍速播放
engine.setLoop(true);                              // 启用时间循环
engine.play();                                     // 开始播放

// ── 4. 创建卫星星座 ──────────────────────────────────────────────────────────
// 循环创建5颗卫星，使用两种 TLE 数据交替分配
// API: Daisy.PW.Satellite({ name, tle, point, model, label, path, groundTrack })
const sats = [];
for (let i = 0; i < 5; i++) {
    const data = orbitData.satellites[i % orbitData.satellites.length];  // 交替使用两种 TLE
    const sat = new Daisy.PW.Satellite({
        name: `${data.name}-${i + 1}`,
        tle: data.tle,
        enableSpg4Propagation: false,            // 禁用 SPG4 传播，使用预计算轨迹
        trajectory: { stepSeconds: 30 },          // 轨迹采样步长30秒
        // 点击目标样式：大小800米，青色，黑色描边
        point: { size: 800, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
        // 3D模型：使用钱德拉X射线天文台模型
        model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 34 },
        // 标签样式：显示名称，带背景
        label: { text: `${data.name}-${i + 1}`, font: "13px sans-serif", offsetPx: new Daisy.Cartesian2(0, -16), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
        // 轨道路径：显示前后30分钟的轨迹
        path: { show: true, width: 1.5, color: Daisy.Color.CYAN.withAlpha(0.45), historySecond: 30 * 60, futureSecond: 30 * 60 },
        // 星下点轨迹：在地面显示卫星投影轨迹
        groundTrack: { show: true, width: 1, material: Daisy.Color.CYAN.withAlpha(0.4) },
    });
    sat.bindEngine(engine);  // 将卫星绑定到引擎，开始轨道计算
    sats.push(sat);
}

// ── 5. 相机定位 ──────────────────────────────────────────────────────────────
// 飞行到非洲上空，高度50000公里，俯瞰整个星座
// API: engine.camera.flyToTarget(position)
__log("5-satellite constellation overview");
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(0, 20, 50000000));  // 飞行到目标位置
</script>
