<script>
// =============================================================================
// 多传感器覆盖场景
// -----------------------------------------------------------------------------
// 展示如何创建多传感器卫星并结合过境窗口控制波束和链路的自动激活。
// 关键 API:
//   - Daisy.PW.Satellite        : 创建卫星实体
//   - Daisy.PW.GroundStation    : 创建地面站实体
//   - sat.getTransits()         : 获取过境窗口（返回毫秒时间戳）
//   - sat.addSensor()           : 为卫星添加传感器
//   - site.addLink()            : 为地面站添加链路
//   - link.flow.activeWhen      : 设置链路激活时间窗口
// =============================================================================

// ── 1. 组件属性与时间系统 ─────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 设置场景时间范围并启动播放
// API: engine.setSceneTime(startTime, stopTime, loop)
const startTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T05:30:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T14:30:00Z"));
engine.setSceneTime(startTime, stopTime, true);  // 第三参数是 loop
engine.setCurrentTime(Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z")));
engine.setMultiplier(20);  // 20倍速播放
engine.setLoop(true);      // 启用循环
engine.play();

// ── 2. 创建卫星实体 ──────────────────────────────────────────────────────────
// 使用 STARLINK-1008 的 TLE 数据创建卫星
const sat = new Daisy.PW.Satellite({
    name: "MultiSensor-SAT",
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
    enableSpg4Propagation: false,  // 禁用 SPG4 传播
    trajectory: { stepSeconds: 30 },
    point: { size: 1000, color: Daisy.Color.WHITE, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 42 },
    text: { text: "MultiSensor-SAT", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
    path: { show: true, width: 2, color: Daisy.Color.CYAN.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
});
sat.bindEngine(engine);  // 绑定卫星到引擎

// ── 3. 创建地面站实体 ────────────────────────────────────────────────────────
// 北京地面站，经纬度 (116.33, 40.052)
const site = new Daisy.PW.GroundStation({
    name: "Beijing-GS",
    position: Daisy.Cartesian3.fromDegrees(116.33, 40.052, 100),
    stationModel: false,  // 不显示3D模型
    point: { size: 1000, color: Daisy.Color.RED, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    text: { text: "Beijing" },
});
site.bindEngine(engine);  // 绑定地面站到引擎

// ── 4. 过境预报计算 ──────────────────────────────────────────────────────────
// 获取卫星过境窗口，返回值是毫秒时间戳（不是 ISO 字符串）
// API: sat.getTransits({ startTime, endTime, observerLocation, minElevationDeg, maxTransits })
const transits = sat.getTransits({
    startTime, endTime: stopTime,
    observerLocation: [40.052, 116.33, 0],  // 观测站位置 [纬度, 经度, 高度]
    minElevationDeg: 10,                     // 最小仰角10度
    maxTransits: 12,                         // 最多返回12个过境窗口
});

// 将过境窗口转换为 JulianDate 格式
const passSlots = transits.map((it) => ({
    start: Daisy.JulianDate.fromDate(new Date(it.start)),  // it.start 是毫秒时间戳
    end: Daisy.JulianDate.fromDate(new Date(it.end)),
}));

// 创建传感器跟踪计划：每个过境窗口对应一个跟踪目标
const trackPlan = passSlots.map((slot) => ({ start: slot.start, end: slot.end, target: sat }));

__log(`过境窗口: ${transits.length} 次`);

// ── 5. 添加多波束传感器 ──────────────────────────────────────────────────────
// 宽波束传感器：25度孔径，400公里波束长度
// link.flow.activeWhen: 仅在过境窗口内激活波束流光
sat.addSensor({
    name: "Beam-Wide",
    type: Daisy.PW.SensorType.Cylinder,  // 圆柱形波束
    apertureDeg: 25,                      // 孔径25度
    beamLength: 400_000,                  // 波束长度400公里
    color: Daisy.Color.CYAN.withAlpha(0.2),
    outline: true,
    outlineColor: Daisy.Color.CYAN,
    link: { track: trackPlan, flow: { activeWhen: passSlots } },  // 过境窗口内激活
});

// 窄波束传感器：15度孔径，600公里波束长度
sat.addSensor({
    name: "Beam-Narrow",
    type: Daisy.PW.SensorType.Cylinder,
    apertureDeg: 15,
    beamLength: 600_000,
    color: Daisy.Color.GOLD.withAlpha(0.15),
    outline: true,
    outlineColor: Daisy.Color.GOLD,
    link: { track: trackPlan, flow: { activeWhen: passSlots } },
});

// ── 6. 创建上行链路 ──────────────────────────────────────────────────────────
// 地面站到卫星的链路，仅在过境窗口内显示
// API: site.addLink({ name, target, color, width, direction, speed, show })
site.addLink({
    name: "Uplink",
    target: sat,           // 链路目标：卫星
    color: Daisy.Color.CYAN,
    width: 2,
    direction: "forward",  // 正向流光（地面站 -> 卫星）
    speed: 1.0,
    show: passSlots,       // 仅在过境窗口内显示
});

// ── 7. 相机跟随卫星 ──────────────────────────────────────────────────────────
// API: engine.camera.followTarget(target, { view: { distance, pitchDeg } })
engine.camera.followTarget(sat, { view: { distance: 2000000, pitchDeg: -30 } });
__log("多传感器覆盖演示：过境窗口内自动激活波束和链路");
</script>
