<script>
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// VehicleVessel — 地面车辆 + 船舶
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(10);
engine.play();

const vehicle = new Daisy.PW.Vehicle({
    name: "Beijing-Taxi",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 0),
    point: { size: 1000, color: Daisy.Color.BLUE, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "Beijing-Taxi", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.5) },
});
vehicle.bindEngine(engine);

const vessel = new Daisy.PW.Vessel({
    name: "CargoShip",
    position: Daisy.Cartesian3.fromDegrees(121.5, 31.2, 0),
    point: { size: 1000, color: Daisy.Color.GREEN, outlineColor: Daisy.Color.WHITE, outlineWidth: 1 },
    label: { text: "CargoShip", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.5) },
});
vessel.bindEngine(engine);

engine.camera.flyToTarget([vehicle.entity, vessel.entity].filter(Boolean), {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-45), 5000000),
});
__log("Vehicle + Vessel 已创建");
</script>
