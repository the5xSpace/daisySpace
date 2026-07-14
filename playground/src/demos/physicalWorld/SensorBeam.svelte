<script>
// =============================================================================
// SensorBeam Demo — 传感器波束跟踪卫星
//
// 本示例演示如何创建传感器波束并跟踪卫星：
// 1. 创建卫星对象
// 2. 创建地面站
// 3. 计算卫星过境窗口
// 4. 添加传感器波束
// 5. 配置波束跟踪目标
//
// 关键 API：
// - Daisy.PW.Satellite: 卫星对象
// - Daisy.PW.GroundStation: 地面站对象
// - sat.getTransits(): 计算卫星过境窗口
// - site.addSensor(): 添加传感器组件
// - link: 链路配置
//   - track: 跟踪计划
//   - flow: 流动配置
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 设置场景时间 ──────────────────────────────────────────────────
// 场景时间：2026-04-20 06:00:00，前后各 1/3 小时
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const startTime = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stopTime = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

// ── 2. 创建卫星对象 ──────────────────────────────────────────────────
// Daisy.PW.Satellite: 卫星对象
// - name: 卫星名称
// - tle: 两行根数（TLE）格式的轨道参数
// - enableSpg4Propagation: 是否启用 SGP4 实时轨道传播
// - trajectory: 轨迹配置
// - point: 点标记配置
// - label: 标签配置
// - path: 路径配置
const sat = new Daisy.PW.Satellite({
    name: "TrackSAT",
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
    enableSpg4Propagation: false, trajectory: { stepSeconds: 30 },
    point: { size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    label: { text: "TrackSAT", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
    path: { show: true, width: 2, color: Daisy.Color.CYAN.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
});

// bindEngine: 绑定引擎，使卫星生效
sat.bindEngine(engine);

// ── 3. 创建地面站 ──────────────────────────────────────────────────
// Daisy.PW.GroundStation: 地面站对象
// - name: 地面站名称
// - position: 位置坐标（Cartesian3.fromDegrees）
// - stationModel: 是否显示 3D 模型
// - point: 点标记配置
// - label: 标签配置
const site = new Daisy.PW.GroundStation({
    name: "Beijing-GS",
    position: Daisy.Cartesian3.fromDegrees(116.33, 40.052, 100),
    stationModel: false,
    point: { size: 1000, color: Daisy.Color.RED, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "Beijing" },
});

// bindEngine: 绑定引擎，使地面站生效
site.bindEngine(engine);

// ── 4. 计算卫星过境窗口 ──────────────────────────────────────────────
// getTransits: 计算卫星过境窗口
// - startTime: 查询开始时间
// - endTime: 查询结束时间
// - observerLocation: 观测者位置 [纬度, 经度, 高度]
// - minElevationDeg: 最小仰角（度）
// - maxTransits: 最大过境次数
// 返回值：过境窗口数组，每个元素包含 start 和 end 时间（毫秒时间戳）
const transits = sat.getTransits({
    startTime, endTime: stopTime,
    observerLocation: [40.052, 116.33, 0],
    minElevationDeg: 10, maxTransits: 12,
});
const passSlots = transits.map((it) => ({
    start: Daisy.JulianDate.fromDate(new Date(it.start)),
    end: Daisy.JulianDate.fromDate(new Date(it.end)),
}));

// previewTime: 预览时间
// 如果有过境窗口，跳转到第一个窗口的中间时间
const previewTime = passSlots.length
    ? Daisy.JulianDate.addSeconds(
        passSlots[0].start,
        Math.max(1, Daisy.JulianDate.secondsDifference(passSlots[0].end, passSlots[0].start) * 0.5),
        new Daisy.JulianDate(),
    )
    : now;
engine.setCurrentTime(previewTime);

// activeWindow: 活动窗口
// trackPlan: 跟踪计划
const activeWindow = { start: startTime, end: stopTime };
const trackPlan = [{ ...activeWindow, target: sat }];

// ── 5. 添加传感器波束 ──────────────────────────────────────────────
// addSensor: 添加传感器组件
// - name: 传感器名称
// - type: 传感器类型（Cylinder/Rectangular 等）
// - emitDirection: 发射方向（TO_UP/TO_GROUND 等）
// - apertureDeg: 孔径角（度）
// - beamLength: 波束长度（米）
// - color: 波束颜色
// - outline: 是否显示轮廓
// - outlineColor: 轮廓颜色
// - link: 链路配置
//   - track: 跟踪计划（定义波束指向目标）
//   - flow: 流动配置（定义流动动画何时激活）
site.addSensor({
    name: "GS-Track",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_UP,
    apertureDeg: 30,
    beamLength: 500000,
    color: Daisy.Color.CYAN.withAlpha(0.3),
    outline: true,
    outlineColor: Daisy.Color.CYAN,
    link: { track: trackPlan, flow: { activeWhen: [activeWindow] } },
});

// ── 6. 相机飞行到目标 ──────────────────────────────────────────────
// flyToTarget: 相机飞行到目标位置
// - targets: 目标数组（支持多个实体）
// - offset: HeadingPitchRange 对象
engine.camera.flyToTarget([site.entity, sat.entity].filter(Boolean), {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-40), 5000000),
});
__log(`过境窗口: ${transits.length} 次，已定位到可见窗口预览传感器波束`);
</script>
