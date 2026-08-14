<script>
// =============================================================================
// SphereFeature Demo — 球体组件演示
//
// 本示例演示如何使用 SphereFeature 创建各种球体：
// 1. 标准球体
// 2. 透明球体
// 3. 纹理球体
// 4. 轮廓球体
// 5. 球体/椭球体对比
//
// 关键 API：
// - Daisy.SphereFeature: 球体组件
//   - radius: 球体半径
//   - material: 材质（颜色/纹理）
//   - outline: 是否显示轮廓
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度
//   - lighting: 是否受光照影响
// - Daisy.EllipsoidFeature: 椭球体组件
//   - dimensions: 三轴尺寸（Cartesian3）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();

engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
    minLevel: 0,
    maxLevel: 2,
    tilingScheme: "geographic",
});
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.SkyBox, sources: {
    positiveX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/px.png"),
    negativeX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nx.png"),
    positiveY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/py.png"),
    negativeZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nz.png"),
    positiveZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/pz.png"),
    negativeY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/ny.png"),
}});

const entities = [];

function createEntity(name, lon, lat, height) {
    const entity = engine.createEntity(name);
    entity.position = C3.fromDegrees(lon, lat, height || 0);
    entities.push(entity);
    return entity;
}

function addSphere(name, lon, lat, height, options) {
    const entity = createEntity(name, lon, lat, height);
    entity.addFeature(new Daisy.SphereFeature(options));
    return entity;
}

addSphere("Sphere-Solid", 88, 32, 900000, {
    radius: 520000,
    material: "#66e8ff",
    outline: true,
    outlineColor: "#ffffff",
    outlineWidth: 2,
});

addSphere("Sphere-Glass", 104, 32, 900000, {
    radius: 620000,
    material: Color.fromCssColorString("#2f9bff").withAlpha(0.28),
    outline: true,
    outlineColor: "#8df7ff",
    outlineWidth: 3,
    lighting: false,
});

addSphere("Sphere-Texture", 121, 32, 900000, {
    radius: 680000,
    material: Daisy.BuildModuleUrl.getUrl("static/assets/moonSmall.jpg"),
    outline: true,
    outlineColor: "#ffd166",
    outlineWidth: 2,
    lighting: true,
});

addSphere("Sphere-Outline", 138, 32, 900000, {
    radius: 520000,
    material: Color.fromCssColorString("#ff8fcf").withAlpha(0.16),
    outline: true,
    outlineColor: "#ffb3df",
    outlineWidth: 4,
    lighting: false,
});

const ellipsoid = createEntity("Sphere-Ellipsoid-Compare", 112, 18, 900000);
ellipsoid.addFeature(new Daisy.EllipsoidFeature({
    dimensions: new C3(1600000, 720000, 920000),
    material: Color.fromCssColorString("#aa66ff").withAlpha(0.28),
    outline: true,
    outlineColor: "#d18cff",
    outlineWidth: 3,
    lighting: false,
}));

const smallCluster = [
    [94, 18, 0.72, "#73fbd3"],
    [101, 15, 0.44, "#f7ff6a"],
    [124, 17, 0.56, "#ff9f43"],
    [132, 20, 0.38, "#ff6f61"],
];
for (let i = 0; i < smallCluster.length; i++) {
    const [lon, lat, scale, color] = smallCluster[i];
    addSphere("Sphere-Cluster-" + i, lon, lat, 700000 + i * 120000, {
        radius: 360000 * scale,
        material: Color.fromCssColorString(color).withAlpha(0.42),
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        lighting: false,
    });
}

engine.camera.flyToTarget(C3.fromDegrees(112, 26, 5200000));
__log("SphereFeature: 标准球、透明球、纹理球、轮廓球、球/椭球对比已创建");

registerCleanup(() => {
    for (const entity of entities) {
        try {
            engine.removeEntity(entity);
        } catch (err) {
            // ignore cleanup errors
        }
    }
});
</script>
