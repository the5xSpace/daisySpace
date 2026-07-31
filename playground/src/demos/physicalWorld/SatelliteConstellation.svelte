<script>
// =============================================================================
// SatelliteConstellation Demo — 星座批量创建
//
// 本示例演示如何批量创建卫星星座：
// 1. 定义多组 TLE 轨道参数
// 2. 循环创建卫星对象
// 3. 配置点标记、标签、路径
// 4. 绑定引擎
//
// 关键 API：
// - Daisy.PW.Satellite: 卫星对象
// - tle: 两行根数（TLE）格式的轨道参数
// - enableSpg4Propagation: 是否启用 SGP4 实时轨道传播
// - trajectory: 轨迹配置
// - point: 点标记配置
// - text: 标签配置
// - path: 路径配置
// - bindEngine(engine): 绑定引擎
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 设置场景时间 ──────────────────────────────────────────────────
// 场景时间：2026-04-20 06:00:00，前后各 1/3 小时
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

// ── 2. 定义 TLE 轨道参数 ──────────────────────────────────────────────
// tles: TLE 轨道参数列表
// 每个对象包含：
// - name: 卫星名称
// - tle: 两行根数（TLE）格式的轨道参数
const tles = [
    { name: "STARLINK-A", tle: `STARLINK-1008\n1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990\n2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813` },
    { name: "STARLINK-B", tle: `STARLINK-1009\n1 44715U 19074C   26110.25002315  .02219194  00000+0  53041-1 0  9991\n2 44715  53.1558 350.8432 0002025 106.0305 345.7371 15.37590305  5814` },
    { name: "QIANFAN-1", tle: `QIANFAN-1\n1 60379U 24140A   26110.56333470  .00000026  00000+0  20818-4 0  9997\n2 60379  88.9678 285.9224 0017010 196.8745 163.1842 13.51003321 84741` },
    { name: "QIANFAN-2", tle: `QIANFAN-2\n1 60380U 24140B   26110.56333470  .00000026  00000+0  20818-4 0  9998\n2 60380  88.9678 291.9224 0017010 196.8745 163.1842 13.51003321 84742` },
];

// ── 3. 批量创建卫星 ──────────────────────────────────────────────────
// 遍历 tles 数组，为每个 TLE 创建卫星对象
// - name: 卫星名称
// - tle: 两行根数（TLE）格式的轨道参数
// - enableSpg4Propagation: 是否启用 SGP4 实时轨道传播
// - trajectory: 轨迹配置
//   - stepSeconds: 采样步长（秒）
// - point: 点标记配置
// - text: 标签配置
// - path: 路径配置
for (const data of tles) {
    const sat = new Daisy.PW.Satellite({
        name: data.name, tle: data.tle,
        enableSpg4Propagation: false, trajectory: { stepSeconds: 30 },
        point: { size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
        text: { text: data.name, font: "13px sans-serif", offsetPx: new Daisy.Cartesian2(0, -16), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
        path: { show: true, width: 1.5, color: Daisy.Color.CYAN.withAlpha(0.45), historySecond: 30 * 60, futureSecond: 30 * 60 },
    });
    sat.bindEngine(engine);
    __log("卫星已创建: " + data.name);
}

// ── 4. 相机飞行到目标 ──────────────────────────────────────────────
// flyToTarget: 相机飞行到目标位置
// C3.fromDegrees(longitude, latitude, height): 创建经纬度坐标
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.4, 40, 15000000));
</script>
