<script>
// =============================================================================
// 星地链路场景
// -----------------------------------------------------------------------------
// 展示过境预报驱动的传感器跟踪和双向数据流链路。
// 关键 API:
//   - Daisy.PW.Satellite        : 创建卫星实体
//   - Daisy.PW.GroundStation    : 创建地面站实体
//   - sat.getTransits()         : 获取过境窗口（返回毫秒时间戳）
//   - sat.addSensor()           : 为卫星添加向下传感器
//   - site.addSensor()          : 为地面站添加向上传感器
//   - sat.addLink() / site.addLink(): 创建双向数据流链路
//   - EmitDirection.TO_UP/TO_GROUND: 波束发射方向
// =============================================================================

// ── 1. 组件属性与时间系统 ─────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 设置场景时间范围
const startTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T05:30:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T14:30:00Z"));
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z")));
engine.setMultiplier(20);  // 20倍速播放
engine.setLoop(true);      // 启用循环
engine.play();

// ── 2. 创建卫星实体 ──────────────────────────────────────────────────────────
const sat = new Daisy.PW.Satellite({
    name: "LinkScene-SAT",
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
    enableSpg4Propagation: false,
    trajectory: { stepSeconds: 30 },
    point: { size: 1000, color: Daisy.Color.WHITE, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    model: { url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"), minimumPixelSize: 42 },
    label: { text: "STARLINK-1008", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -16), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.4) },
    path: { show: true, width: 2, color: Daisy.Color.LIME.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
    groundTrack: { show: true, width: 2, material: Daisy.Color.LIME.withAlpha(0.6) },  // 星下点轨迹
});
sat.bindEngine(engine);  // 绑定卫星到引擎

// ── 3. 创建地面站实体 ────────────────────────────────────────────────────────
const site = new Daisy.PW.GroundStation({
    name: "Beijing-GS",
    position: Daisy.Cartesian3.fromDegrees(116.33, 40.052, 100),
    stationModel: false,
    point: { size: 1000, color: Daisy.Color.RED, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "Beijing", font: "13px sans-serif", offsetPx: new Daisy.Cartesian2(0, -14), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.4) },
});
site.bindEngine(engine);  // 绑定地面站到引擎

// ── 4. 过境预报计算 ──────────────────────────────────────────────────────────
// 获取卫星过境窗口
// 注意: it.start 和 it.end 是毫秒时间戳，不是 ISO 字符串
const transits = sat.getTransits({
    startTime, endTime: stopTime,
    observerLocation: [40.052, 116.33, 0],  // 观测站位置 [纬度, 经度, 高度]
    minElevationDeg: 10,
    maxTransits: 12,
});

// 将过境窗口转换为 JulianDate 格式
const passSlots = transits.map((it) => ({
    start: Daisy.JulianDate.fromDate(new Date(it.start)),
    end: Daisy.JulianDate.fromDate(new Date(it.end)),
}));

// 创建两个跟踪计划：
// 1. 卫星传感器跟踪地面站
const trackPlan = passSlots.map((slot) => ({ start: slot.start, end: slot.end, target: sat }));
// 2. 地面站传感器跟踪卫星
const groundPoint = Daisy.Cartesian3.fromDegrees(116.33, 40.052, 0);
const groundTrackPlan = passSlots.map((slot) => ({ start: slot.start, end: slot.end, target: groundPoint }));

__log(`过境窗口: ${transits.length} 次`);

// ── 5. 地面站向上传感器 ──────────────────────────────────────────────────────
// 地面站向上发射波束，跟踪卫星
// API: site.addSensor({ name, type, emitDirection, apertureDeg, beamLength, link })
site.addSensor({
    name: "GS-Track",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_UP,  // 向上发射
    apertureDeg: 30,
    beamLength: 500_000,  // 波束长度500公里
    color: Daisy.Color.CYAN.withAlpha(0.3),
    outline: true,
    outlineColor: Daisy.Color.CYAN,
    link: { track: trackPlan, flow: { activeWhen: passSlots } },  // 过境窗口内激活
});

// ── 6. 卫星向下传感器 ──────────────────────────────────────────────────────
// 卫星向下发射波束，覆盖地面站
// throughGround: true 表示波束可以穿透地面（用于可视化）
sat.addSensor({
    name: "SAT->GS",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_GROUND,  // 向下发射
    apertureDeg: 25,
    beamLength: 500_000,
    throughGround: true,  // 允许波束穿透地面
    color: Daisy.Color.ORANGE.withAlpha(0.5),
    outline: true,
    outlineColor: Daisy.Color.ORANGE,
    link: { track: groundTrackPlan, flow: { activeWhen: passSlots } },
});

// ── 7. 双向数据流链路 ──────────────────────────────────────────────────────
// 上行链路：地面站 -> 卫星（绿色，正向流光）
site.addLink({
    name: "Uplink",
    target: sat,
    color: Daisy.Color.LIME,
    width: 2,
    direction: "forward",  // 正向流光
    speed: 1.0,
    show: passSlots,       // 仅在过境窗口内显示
});

// 下行链路：卫星 -> 地面站（橙色，反向流光）
sat.addLink({
    name: "Downlink",
    target: site,
    color: Daisy.Color.ORANGE,
    width: 2,
    direction: "reverse",  // 反向流光
    speed: 1.0,
    show: passSlots,
});

// ── 8. 相机定位 ──────────────────────────────────────────────────────────────
// 飞行到可以同时看到地面站和卫星的位置
// API: engine.camera.flyToTarget(entities[], { offset })
engine.camera.flyToTarget([site.entity, sat.entity].filter(Boolean), {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-40), 5_000_000),
});
__log("星地链路已创建: Beijing-GS <-> SAT");
</script>
