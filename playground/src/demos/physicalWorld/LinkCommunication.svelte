<script>
// =============================================================================
// LinkCommunication Demo — 链路通信可视化
//
// 本示例演示如何：
// 1. 创建卫星对象（Satellite）并配置 TLE 轨道
// 2. 创建地面站（GroundStation）并设置位置和标签
// 3. 计算卫星过境窗口（getTransits）
// 4. 创建链路（Link）表达上行/下行通信
// 5. 使用 TimeTask 和 TaskTimeLineWidget 可视化过境事件
//
// 关键 API：
// - Daisy.PW.Satellite: 卫星对象，支持 TLE/SGP4 轨道传播
// - Daisy.PW.GroundStation: 地面站对象
// - sat.getTransits(): 计算卫星过境窗口
// - site.addLink(): 添加链路（上行/下行）
// - sat.addLink(): 添加链路（下行）
// - schedule.add(): 添加时间任务到调度器
// - Daisy.TaskTimeLineWidget: 时间线进度可视化组件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 获取时间线调度器，用于管理过境事件时间窗口
const schedule = engine.timeSchedule;

// ── 1. 设置场景时间范围 ──────────────────────────────────────────────────
// 场景时间：2026-04-20 05:00:00 到 09:00:00（共 4 小时）
// 使用 JulianDate.addHours() 计算相对时间
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const startTime = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stopTime = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime);

// ── 2. 创建卫星对象 ──────────────────────────────────────────────────────
// Daisy.PW.Satellite: 卫星对象，支持 TLE/SGP4 轨道传播
// 参数说明：
//   - name: 卫星名称
//   - tle: 两行根数（Two-Line Element）格式的轨道参数
//   - enableSpg4Propagation: 是否启用 SGP4 轨道传播
//   - trajectory: 轨迹采样配置
//     - stepSeconds: 采样步长（秒）
//   - point: 点标记配置
//     - size: 大小（像素）
//     - color: 颜色
//     - outlineColor: 轮廓颜色
//     - outlineWidth: 轮廓宽度
//   - label: 标签配置
//     - text: 显示文本
//     - font: 字体样式
//     - offsetPx: 像素偏移量
//     - showBackground: 显示背景
//     - backgroundColor: 背景颜色
//   - path: 轨迹路径配置
//     - show: 是否显示
//     - width: 线宽
//     - color: 颜色
//     - historySecond: 历史轨迹显示时长（秒）
//     - futureSecond: 未来轨迹显示时长（秒）
const sat = new Daisy.PW.Satellite({
    name: "RelaySAT",
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
    enableSpg4Propagation: false, trajectory: { stepSeconds: 30 },
    point: { size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    label: { text: "RelaySAT", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
    path: { show: true, width: 2, color: Daisy.Color.CYAN.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
});
// bindEngine 将卫星绑定到引擎，使其参与场景渲染和时间更新
sat.bindEngine(engine);

// ── 3. 创建地面站对象 ──────────────────────────────────────────────────
// Daisy.PW.GroundStation: 地面站对象，用于表达地面测控站
// 参数说明：
//   - name: 地面站名称
//   - position: 位置坐标（Cartesian3.fromDegrees）
//   - stationModel: 是否显示 3D 模型
//   - point: 点标记配置（同 Satellite）
//   - label: 标签配置
//     - text: 显示文本
const site1 = new Daisy.PW.GroundStation({
    name: "Beijing-GS",
    position: Daisy.Cartesian3.fromDegrees(116.33, 40.052, 100),
    stationModel: false,
    point: { size: 1000, color: Daisy.Color.RED, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "Beijing" },
});
site1.bindEngine(engine);

const site2 = new Daisy.PW.GroundStation({
    name: "Shanghai-GS",
    position: Daisy.Cartesian3.fromDegrees(121.5, 31.2, 100),
    stationModel: false,
    point: { size: 1000, color: Daisy.Color.YELLOW, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "Shanghai" },
});
site2.bindEngine(engine);

// ── 4. 计算卫星过境窗口 ──────────────────────────────────────────────────
// sat.getTransits(): 计算卫星相对于地面站的过境窗口
// 参数说明：
//   - startTime: 查询起始时间
//   - endTime: 查询结束时间
//   - observerLocation: 观测者位置 [lat, lon, alt]
//   - minElevationDeg: 最小仰角（度），低于此角度的过境不计算
//   - maxTransits: 最大返回数量
// 返回值：
//   - start: 过境开始时间（ISO 字符串）
//   - end: 过境结束时间（ISO 字符串）
const transits1 = sat.getTransits({ startTime, endTime: stopTime, observerLocation: [40.052, 116.33, 0], minElevationDeg: 10, maxTransits: 12 });
const passSlots1 = transits1.map((it) => ({ start: Daisy.JulianDate.fromDate(new Date(it.start)), end: Daisy.JulianDate.fromDate(new Date(it.end)) }));
const trackPlan1 = passSlots1.map((slot) => ({ start: slot.start, end: slot.end, target: sat }));

const transits2 = sat.getTransits({ startTime, endTime: stopTime, observerLocation: [31.2, 121.5, 0], minElevationDeg: 10, maxTransits: 12 });
const passSlots2 = transits2.map((it) => ({ start: Daisy.JulianDate.fromDate(new Date(it.start)), end: Daisy.JulianDate.fromDate(new Date(it.end)) }));

// 合并两个地面站的过境窗口，并按时间排序
const allSlots = [
    ...passSlots1.map((s, i) => ({ ...s, label: `BJ 过境 #${i + 1}` })),
    ...passSlots2.map((s, i) => ({ ...s, label: `SH 过境 #${i + 1}` })),
].sort((a, b) => Daisy.JulianDate.secondsDifference(a.start, b.start));

// 跳转到第一个过境窗口开始前 30 秒
if (allSlots.length > 0) {
    const jumpTime = Daisy.JulianDate.addSeconds(allSlots[0].start, -30, new Daisy.JulianDate());
    engine.setCurrentTime(Daisy.JulianDate.greaterThan(jumpTime, startTime) ? jumpTime : startTime);
} else {
    engine.setCurrentTime(now);
}

// ── 5. 将过境窗口添加到时间调度器 ──────────────────────────────────────
// 遍历所有过境窗口，创建 TimeTask 并添加到 schedule
for (const slot of allSlots) {
    schedule.add(new Daisy.TimeTask({
        name: slot.label,
        startJulianTime: slot.start,
        endJulianTime: slot.end,
    }));
}

// ── 6. 创建时间线组件 ──────────────────────────────────────────────────
// TaskTimeLineWidget: 时间线进度可视化组件
// 参数说明：
//   - schedule: 时间调度器实例
//   - title: 组件标题
//   - width/height: 宽高（像素）
//   - minHeight: 最小高度
//   - maxScrollHeight: 最大滚动高度
//   - x/y: 位置偏移量（像素）
//   - onStepClick: 点击任务步骤时的回调
//     - task: 任务对象
//     - startJulianTime: 任务开始时间
const timelineWidget = new Daisy.TaskTimeLineWidget(schedule, {
    title: "链路通信事件",
    width: 360,
    height: 240,
    minHeight: 180,
    maxScrollHeight: 300,
    x: 12,
    y: 40,
    onStepClick: (task) => {
        // 点击时间线任务时，跳转到该任务的开始时间
        engine.setCurrentTime(task.startJulianTime);
    },
});
engine.addWidget(timelineWidget);

// ── 7. 创建传感器和链路 ──────────────────────────────────────────────────
// site.addSensor(): 为地面站添加传感器
// 参数说明：
//   - name: 传感器名称
//   - type: 传感器类型（Cylinder = 圆柱形）
//   - emitDirection: 发射方向（TO_UP = 向上）
//   - apertureDeg: 孔径角度（度）
//   - beamLength: 波束长度（米）
//   - color: 颜色（带透明度）
//   - outline: 是否显示轮廓
//   - outlineColor: 轮廓颜色
//   - link: 链路配置
//     - track: 跟踪计划
//     - flow: 流动配置
//       - activeWhen: 激活时间窗口
site1.addSensor({ name: "BJ-Track", type: Daisy.PW.SensorType.Cylinder, emitDirection: Daisy.EmitDirection.TO_UP, apertureDeg: 30, beamLength: 500000, color: Daisy.Color.CYAN.withAlpha(0.3), outline: true, outlineColor: Daisy.Color.CYAN, link: { track: trackPlan1, flow: { activeWhen: passSlots1 } } });

// site.addLink(): 为地面站添加上行链路
// 参数说明：
//   - name: 链路名称
//   - target: 目标对象（卫星）
//   - color: 颜色
//   - width: 线宽
//   - direction: 方向（forward = 上行）
//   - speed: 流动速度
//   - show: 显示时间窗口
site1.addLink({ name: "Uplink-BJ", target: sat, color: Daisy.Color.LIME, width: 2, direction: "forward", speed: 1.0, show: passSlots1 });

// sat.addLink(): 为卫星添加下行链路
// 参数说明同上，direction: reverse = 下行
sat.addLink({ name: "Downlink-BJ", target: site1, color: Daisy.Color.ORANGE, width: 2, direction: "reverse", speed: 1.0, show: passSlots1 });

// 为上海地面站添加上行链路
site2.addLink({ name: "Uplink-SH", target: sat, color: Daisy.Color.YELLOW, width: 2, direction: "forward", speed: 1.0, show: passSlots2 });

// ── 8. 启动引擎播放 ──────────────────────────────────────────────────────
// setMultiplier(20): 设置时间倍率为 20x
// setLoop(true): 启用循环播放
// play(): 启动引擎时间播放
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

// ── 9. 相机飞行到目标 ──────────────────────────────────────────────────
// flyToTarget(): 将相机飞行到目标位置
// 参数说明：
//   - targets: 目标数组（支持多个实体）
//   - offset: HeadingPitchRange 对象
//     - heading: 航向角（弧度）
//     - pitch: 俯仰角（弧度，负值=俯视）
//     - range: 距离（米）
engine.camera.flyToTarget([site1.entity, site2.entity, sat.entity].filter(Boolean), {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-40), 8000000),
});

// 输出过境信息
__log(`链路通信: BJ(${transits1.length}次) + SH(${transits2.length}次) → RelaySAT`);

// ── 10. 清理资源 ──────────────────────────────────────────────────────────
// registerCleanup 注册清理回调，当 demo 销毁时自动执行
registerCleanup(() => {
    // 从引擎移除时间线组件
    engine.removeWidget(timelineWidget);
    // 清空调度器中的所有任务
    schedule.clear();
});
// =============================================================================
</script>
