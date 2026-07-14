<script>
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// SatelliteBeam — 卫星多方向传感器波束
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
const beamColors = {
    down: Daisy.Color.fromCssColorString("#35e8ff"),
    up: Daisy.Color.fromCssColorString("#91ff4d"),
    front: Daisy.Color.fromCssColorString("#ffae42"),
    back: Daisy.Color.fromCssColorString("#ff68c8"),
    left: Daisy.Color.fromCssColorString("#5aa7ff"),
    right: Daisy.Color.fromCssColorString("#ffd84a"),
    scan: Daisy.Color.fromCssColorString("#ffffff"),
};
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

const sat = new Daisy.PW.Satellite({
    name: "BeamDemo-SAT",
    tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
    enableSpg4Propagation: false, trajectory: { stepSeconds: 30 },
    point: { size: 1000, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
    label: { text: "BeamDemo-SAT", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
    path: { show: true, width: 2, color: Daisy.Color.CYAN.withAlpha(0.55), historySecond: 45 * 60, futureSecond: 45 * 60 },
});
sat.bindEngine(engine);

function addBeam(options) {
    try {
        sat.addSensor(options);
        return true;
    } catch (error) {
        __log?.(`[WARN] ${options?.name ?? "Beam"} 创建失败: ${error?.message ?? error}`);
        return false;
    }
}

let beamCount = 0;

beamCount += addBeam({
    name: "DownBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: 20,
    beamLength: 500000,
    color: beamColors.down.withAlpha(0.22),
    outline: true,
    outlineColor: beamColors.down,
}) ? 1 : 0;
beamCount += addBeam({
    name: "UpBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_UP,
    apertureDeg: 15,
    beamLength: 800000,
    color: beamColors.up.withAlpha(0.22),
    outline: true,
    outlineColor: beamColors.up,
}) ? 1 : 0;
beamCount += addBeam({
    name: "FrontBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_FRONT,
    apertureDeg: 18,
    beamLength: 420000,
    color: beamColors.front.withAlpha(0.22),
    outline: true,
    outlineColor: beamColors.front,
}) ? 1 : 0;
beamCount += addBeam({
    name: "BackBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_AFTER,
    apertureDeg: 18,
    beamLength: 420000,
    color: beamColors.back.withAlpha(0.22),
    outline: true,
    outlineColor: beamColors.back,
}) ? 1 : 0;
beamCount += addBeam({
    name: "LeftBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_LEFT,
    apertureDeg: 18,
    beamLength: 420000,
    color: beamColors.left.withAlpha(0.24),
    outline: true,
    outlineColor: beamColors.left,
}) ? 1 : 0;
beamCount += addBeam({
    name: "RightBeam",
    type: Daisy.PW.SensorType.Cylinder,
    emitDirection: Daisy.EmitDirection.TO_RIGHT,
    apertureDeg: 18,
    beamLength: 420000,
    color: beamColors.right.withAlpha(0.24),
    outline: true,
    outlineColor: beamColors.right,
}) ? 1 : 0;

// 三种棱锥波束：通过横向和纵向开角展示方形、宽矩形和窄矩形截面。
beamCount += addBeam({
    name: "SquareBeam",
    type: Daisy.PW.SensorType.Pyramid,
    emitDirection: Daisy.EmitDirection.TO_FRONT,
    apertureDeg: { xDeg: 12, yDeg: 12 },
    beamLength: 520000,
    color: Daisy.Color.fromCssColorString("#b58cff").withAlpha(0.26),
    outline: true,
    outlineColor: Daisy.Color.fromCssColorString("#d8c6ff"),
    outlineWidth: 1.5,
}) ? 1 : 0;
beamCount += addBeam({
    name: "RectangleBeam",
    type: Daisy.PW.SensorType.Pyramid,
    emitDirection: Daisy.EmitDirection.TO_AFTER,
    apertureDeg: { xDeg: 28, yDeg: 10 },
    beamLength: 620000,
    color: Daisy.Color.fromCssColorString("#ff7b9c").withAlpha(0.24),
    outline: true,
    outlineColor: Daisy.Color.fromCssColorString("#ffc0d0"),
    outlineWidth: 1.5,
}) ? 1 : 0;
beamCount += addBeam({
    name: "NarrowRectangleBeam",
    type: Daisy.PW.SensorType.Pyramid,
    emitDirection: Daisy.EmitDirection.TO_RIGHT,
    apertureDeg: { xDeg: 5, yDeg: 22 },
    beamLength: 700000,
    color: Daisy.Color.fromCssColorString("#ff944d").withAlpha(0.24),
    outline: true,
    outlineColor: Daisy.Color.fromCssColorString("#ffd0a8"),
    outlineWidth: 1.5,
}) ? 1 : 0;
beamCount += addBeam({
    name: "GroundScan",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 24, yDeg: 48 },
    beamLength: 1_000_000,
    beamAttitudeDeg: (time) => {
        const elapsed = Daisy.JulianDate.secondsDifference(time, start);
        const phase = (elapsed / (18 * 60)) * Math.PI * 2;
        return {
            azimuthDeg: 90 + (elapsed / (18 * 60)) * 360,
            elevationDeg: -18 + Math.sin(phase) * 6,
            rollDeg: 0,
        };
    },
    color: beamColors.scan.withAlpha(0.14),
    outline: true,
    outlineColor: beamColors.scan.withAlpha(0.86),
}) ? 1 : 0;

engine.camera.followTarget(sat, { view: { distance: 2000000, pitchDeg: -30 } });
__log(`卫星波束已创建: ${beamCount}/10`);
</script>
