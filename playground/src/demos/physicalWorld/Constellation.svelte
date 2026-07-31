<script>
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });

const tles = [
    { name: "SAT-A", tle: `SAT-A\n1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990\n2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813` },
    { name: "SAT-B", tle: `SAT-B\n1 44715U 19074C   26110.25002315  .02219194  00000+0  53041-1 0  9991\n2 44715  53.1558 350.8432 0002025 106.0305 345.7371 15.37590305  5814` },
    { name: "SAT-C", tle: `SAT-C\n1 60379U 24140A   26110.56333470  .00000026  00000+0  20818-4 0  9997\n2 60379  88.9678 285.9224 0017010 196.8745 163.1842 13.51003321 84741` },
];

const constellation = new Daisy.PW.Constellation();
for (const data of tles) {
    const sat = new Daisy.PW.Satellite({
        name: data.name, tle: data.tle,
        enableSpg4Propagation: false, trajectory: { stepSeconds: 30 },
        point: { size: 800, color: Daisy.Color.CYAN, outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
        text: { text: data.name, font: "13px sans-serif", offsetPx: new Daisy.Cartesian2(0, -16), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
        path: { show: true, width: 1.5, color: Daisy.Color.CYAN.withAlpha(0.45), historySecond: 30 * 60, futureSecond: 30 * 60 },
    });
    constellation.addSatellite(sat);
}
constellation.bindEngine(engine);
registerCleanup(() => constellation.destroy());

engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.4, 40, 15000000));
__log?.("Constellation demo: " + constellation.satelliteCount + " satellites via Constellation.addSatellite");
__log?.("allSensors: " + constellation.allSensors.length + " (0 sensors added)");
</script>
