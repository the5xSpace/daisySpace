<script>
// =============================================================================
// ModelFeature Demo — 内置模型库平台编队展示
//
// 本示例演示如何使用 ModelFeature 创建和控制 3D 模型：
// 1. 通过 resolveDaisyModelAsset() 加载 Daisy 内置模型
// 2. 配置模型参数（缩放、轮廓、颜色混合等）
// 3. 基于 glTF 控制节点选择关键部件
// 4. 节点级机械旋转动画 + 内置 glTF 动画
// 5. 节点交互（鼠标悬停、点击）
//
// 关键 API：
// - Daisy.resolveDaisyModelAsset(kind): 解析内置模型 URL / 控制节点 / 动画名
// - Daisy.ModelFeature: 模型组件
//   - url: 模型文件路径（glTF/glb）
//   - scale: 缩放比例
//   - minimumPixelSize: 最小像素大小
//   - silhouetteSize/silhouetteColor: 轮廓大小/颜色
//   - colorBlendMode/colorBlendAmount: 颜色混合模式/程度
//   - distanceDisplayCondition: 距离显示条件
// - modelFeature.getNodeNames(): 获取模型节点名列表
// - modelFeature.transformNode(nodeName): 变换节点
// - modelFeature.playAnimation(): 播放内置动画
// - entity.setBodyAxis: 设置体轴可视化
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和常量定义 ──────────────────────────────────────────────
var baseLon = 116.0;
var baseLat = 39.0;
var platformAlt = 2200000; // 平台高度 2200km
var modelBaseAlt = 2200400; // 模型高度 2200.4km

// 设置天空盒和基础图层
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Cesium });
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
    minLevel: 0,
    maxLevel: 2,
    tilingScheme: "geographic",
});

// ── 2. 创建黄色平台 ──────────────────────────────────────────────
var platformEntity = engine.createEntity("Platform");
platformEntity.position = Daisy.Cartesian3.fromDegrees(baseLon, baseLat, platformAlt);
platformEntity.addFeature(new Daisy.CubeFeature({
    topX: 14000, topY: 6000,
    bottomX: 14000, bottomY: 6000,
    height: 400,
    material: Daisy.Color.GOLD.withAlpha(0.65),
    outline: true,
    outlineColor: Daisy.Color.DARKGOLDENROD,
    outlineWidth: 2,
    emitDirection: Daisy.EmitDirection.TO_UP,
}));

// ── 3. 内置模型配置（DaisyModelLibrary） ──────────────────────────
// 不再使用外部/NASA GLB，统一走 SDK 内置轻量模型。
var modelPlan = [
    { kind: "satellite",           lon: baseLon - 0.0525, silhouette: Daisy.Color.CYAN,    minPx: 80 },
    { kind: "fixedGroundStation",  lon: baseLon - 0.0175, silhouette: Daisy.Color.ORANGE,  minPx: 90 },
    { kind: "rocket",              lon: baseLon + 0.0175, silhouette: Daisy.Color.LIME,    minPx: 100 },
    { kind: "aircraft",            lon: baseLon + 0.0525, silhouette: Daisy.Color.HOTPINK, minPx: 120 },
];

var models = modelPlan.map(function (item) {
    var asset = Daisy.resolveDaisyModelAsset(item.kind);
    return {
        name: asset.id,
        kind: item.kind,
        lon: item.lon,
        url: asset.modelUrl,
        scale: 1,
        silhouette: item.silhouette,
        altOffset: 1800,
        minPx: item.minPx,
        animation: asset.animation,
        controlNodes: asset.controlNodes.slice(),
    };
});

var ddc = new Daisy.DistanceDisplayCondition(0, 120000000);
var entityList = [];
var featureList = [];

for (var i = 0; i < models.length; i++) {
    var cfg = models[i];
    var entity = engine.createEntity(cfg.name);
    entity.position = Daisy.Cartesian3.fromDegrees(cfg.lon, baseLat, modelBaseAlt + (cfg.altOffset || 0));
    entityList.push(entity);

    var feature = new Daisy.ModelFeature({
        url: cfg.url,
        scale: cfg.scale,
        minimumPixelSize: cfg.minPx,
        // 内置模型已是 1:1 米制，maximumScale 仅作远距放大保护
        maximumScale: cfg.kind === "fixedGroundStation" ? 1800 : 800,
        distanceDisplayCondition: ddc,
        silhouetteSize: 2,
        silhouetteColor: cfg.silhouette,
        colorBlendMode: Daisy.ColorBlendMode.HIGHLIGHT,
        colorBlendAmount: 0.35,
        backFaceCulling: false,
    });
    entity.addFeature(feature);
    featureList.push(feature);

    entity.addFeature(new Daisy.UI.TextFeature({
        text: cfg.name,
        font: "13px sans-serif",
        fillColor: Daisy.Color.WHITE,
        outlineColor: Daisy.Color.BLACK,
        outlineWidth: 2,
        showBackground: true,
        backgroundColor: Daisy.Color.BLACK.withAlpha(0.5),
        backgroundPadding: new Daisy.Cartesian2(6, 3),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        offsetPx: new Daisy.Cartesian2(0, 80),
    }));
}

// ── 主相机：固定跟随视角 ──
var viewDistance = 15000;
var viewHeading = 18;
var viewPitch = -28;

function applyMainCameraView() {
    engine.camera.followTarget(platformEntity, {
        view: { distance: viewDistance, headingDeg: viewHeading, pitchDeg: viewPitch },
    });
}

// ── 节点机械旋转动画（按内置 controlNodes） ──
var nodeAnimations = [];

function pickExactNodes(loadedNames, wantedNames) {
    var loaded = {};
    for (var i = 0; i < loadedNames.length; i++) loaded[loadedNames[i]] = true;
    var out = [];
    for (var j = 0; j < wantedNames.length; j++) {
        if (loaded[wantedNames[j]]) out.push(wantedNames[j]);
    }
    return out;
}

function logUsefulNodes(modelIndex, nodeNames, pickedNodes) {
    __log(models[modelIndex].name + " useful nodes: " + (pickedNodes.length > 0 ? pickedNodes.join(", ") : "(none)"));
    __log("  catalog controlNodes: " + models[modelIndex].controlNodes.join(", "));
}

function setupNodeAnimations() {
    nodeAnimations = [];

    // daisy-satellite: 仅用目录 controlNodes，不再回退到任意节点
    var s0Nodes = featureList[0].getNodeNames();
    var solarNodes = pickExactNodes(s0Nodes, [
        "solar_array_left_shoulder",
        "solar_array_right_shoulder",
    ]);
    logUsefulNodes(0, s0Nodes, solarNodes);
    for (var j = 0; j < solarNodes.length; j++) {
        nodeAnimations.push({
            feature: featureList[0],
            node: solarNodes[j],
            mode: "panel-swing",
            axis: "y",
            speed: 24 + j * 6,
            phase: j * Math.PI,
            amplitudeDeg: 28,
        });
    }
    var radarAz = pickExactNodes(s0Nodes, ["radar_azimuth"])[0];
    var radarEl = pickExactNodes(s0Nodes, ["radar_elevation"])[0];
    if (radarAz) {
        // SDK 约定：方位轴通常为模型局部 Y
        nodeAnimations.push({
            feature: featureList[0],
            node: radarAz,
            mode: "axis-scan",
            axis: "y",
            speed: 18,
        });
    }
    if (radarEl) {
        nodeAnimations.push({
            feature: featureList[0],
            node: radarEl,
            mode: "axis-scan",
            axis: "x",
            speed: 0.55,
            minDeg: -8,
            maxDeg: 20,
        });
    }

    // daisy-fixed-ground-station: azimuth(Y) / elevation(X)，与 PW.GroundStation 默认一致
    var s1Nodes = featureList[1].getNodeNames();
    var antennaNodes = pickExactNodes(s1Nodes, ["azimuth", "elevation"]);
    logUsefulNodes(1, s1Nodes, antennaNodes);
    var antennaAz = pickExactNodes(s1Nodes, ["azimuth"])[0];
    var antennaEl = pickExactNodes(s1Nodes, ["elevation"])[0];
    if (antennaAz) {
        nodeAnimations.push({
            feature: featureList[1],
            node: antennaAz,
            mode: "axis-scan",
            axis: "y",
            speed: 28,
        });
    }
    if (antennaEl) {
        nodeAnimations.push({
            feature: featureList[1],
            node: antennaEl,
            mode: "axis-scan",
            axis: "x",
            speed: 0.65,
            minDeg: -10,
            maxDeg: 22,
        });
    }

    // daisy-rocket: 展示整流罩开合，而非无意义自转
    var s2Nodes = featureList[2].getNodeNames();
    var fairingNodes = pickExactNodes(s2Nodes, ["fairing_left", "fairing_right"]);
    logUsefulNodes(2, s2Nodes, fairingNodes);
    for (var ri = 0; ri < fairingNodes.length; ri++) {
        nodeAnimations.push({
            feature: featureList[2],
            node: fairingNodes[ri],
            mode: "panel-swing",
            axis: "z",
            speed: 12,
            phase: ri * Math.PI,
            amplitudeDeg: 35,
        });
    }

    // daisy-aircraft: 副翼/升降舵/方向舵小幅摆动
    var s3Nodes = featureList[3].getNodeNames();
    var surfaceTargets = pickExactNodes(s3Nodes, [
        "aileron_left", "aileron_right",
        "elevator_left", "elevator_right",
        "rudder",
    ]);
    logUsefulNodes(3, s3Nodes, surfaceTargets);
    for (var si = 0; si < surfaceTargets.length; si++) {
        var name = surfaceTargets[si] || "";
        nodeAnimations.push({
            feature: featureList[3],
            node: surfaceTargets[si],
            mode: "panel-swing",
            axis: /rudder/i.test(name) ? "y" : "x",
            speed: 30 + si * 6,
            phase: si * 0.7,
            amplitudeDeg: /rudder/i.test(name) ? 18 : 22,
        });
    }

    __log("节点动画: " + nodeAnimations.length + " 个旋转目标");
    for (var k = 0; k < nodeAnimations.length; k++) {
        var a = nodeAnimations[k];
        __log("  " + models[featureList.indexOf(a.feature)].name + " / " + a.node + " -> " + a.mode + " " + (a.axis || "") + (a.amplitudeDeg ? " ±" + a.amplitudeDeg + "°" : "") + (a.speed ? " @ " + a.speed : ""));
    }
}

var rotating = $state(true);
var explosionEnabled = $state(false);
var demoExplosionOptions = {
    factor: 1,
    minimumDistanceRatio: 0.32,
    indexDistanceFactor: 0.08,
    indexCurvePower: 1.2,
};
var startMs = performance.now();

function axisFromName(axis) {
    return axis === "x" ? Daisy.Cartesian3.UNIT_X
        : axis === "y" ? Daisy.Cartesian3.UNIT_Y
        : Daisy.Cartesian3.UNIT_Z;
}

function updateAnimations() {
    var t = (performance.now() - startMs) / 1000;

    if (!rotating) return;
    for (var i = 0; i < nodeAnimations.length; i++) {
        var anim = nodeAnimations[i];
        if (!anim.node) continue;

        if (anim.mode === "axis-scan") {
            var deg;
            if (anim.minDeg !== undefined && anim.maxDeg !== undefined) {
                var mid = (anim.minDeg + anim.maxDeg) / 2;
                var amp = (anim.maxDeg - anim.minDeg) / 2;
                deg = mid + Math.sin(t * anim.speed * Math.PI * 2) * amp;
            } else {
                deg = t * anim.speed;
            }
            anim.feature.transformNode(anim.node)
                .setRotationAxisAngleDeg(axisFromName(anim.axis || "y"), deg);
            continue;
        }

        if (anim.mode === "panel-swing") {
            var ampDeg = anim.amplitudeDeg || 24;
            var swingDeg = Math.sin(t * 1.2 + (anim.phase || 0)) * ampDeg;
            anim.feature.transformNode(anim.node)
                .setRotationAxisAngleDeg(axisFromName(anim.axis || "y"), swingDeg);
            continue;
        }

        if (anim.mode === "spin-axis") {
            anim.feature.transformNode(anim.node)
                .setRotationAxisAngleDeg(axisFromName(anim.axis || "z"), t * anim.speed);
        }
    }
}

var removePreRender = engine.onPreRender(function () {
    updateAnimations();
});

// ── 模型加载后初始化节点动画 + 播放内置动画 ──
var loadCount = 0;
for (var li = 0; li < featureList.length; li++) {
    (function (idx) {
        featureList[idx].onload(function () {
            var nodeNames = featureList[idx].getNodeNames();
            var anims = featureList[idx].getAnimationInfos();
            var catalog = models[idx];
            __log(catalog.name + ": " + nodeNames.length + " nodes, " + anims.length + " animations (glTF)");
            __log("  catalog animation: " + catalog.animation);
            __log("  catalog controlNodes: " + catalog.controlNodes.join(", "));
            __log("  loaded nodes: " + nodeNames.join(", "));

            // 本示例以节点 transform 为主，避免与手动节点动画互相覆盖。
            // 需要播放内置动画时，可参考：
            // featureList[idx].playAnimation({ name: catalog.animation, loop: Daisy.ModelAnimationLoop.REPEAT });

            loadCount++;
            if (loadCount === models.length) {
                setupNodeAnimations();
            }
        });
    })(li);
}

// ── 节点交互 ──
function hookNodeInteractions(feature) {
    feature.onMouseEnter(function (e) {
        if (!e.nodeName) return;
        feature.transformNode(e.nodeName).setColorOverlay("rgba(0, 255, 255, 1)", 0.35);
        engine.triggerUpdateOnce();
    });
    feature.onMouseLeave(function (e) {
        if (!e.nodeName) return;
        feature.transformNode(e.nodeName).clearColorOverlay();
        engine.triggerUpdateOnce();
    });
    feature.onClick(function (e) {
        if (!e.nodeName) return;
        var node = feature.transformNode(e.nodeName);
        var nodes = feature.getNodes() || [];
        var current = null;
        for (var j = 0; j < nodes.length; j++) {
            if (nodes[j].name === e.nodeName) { current = nodes[j]; break; }
        }
        node.setOpacity(current && current.opacity === 0.25 ? 1.0 : 0.25);
        engine.triggerUpdateOnce();
    });
}
for (var hi = 0; hi < featureList.length; hi++) {
    hookNodeInteractions(featureList[hi]);
}

// ── 面板控制 ──
function toggleRotation() {
    rotating = !rotating;
    __log("节点旋转: " + (rotating ? "play" : "pause"));
}

function enableExplosionView() {
    explosionEnabled = true;
    rotating = false;
    for (var i = 0; i < featureList.length; i++) {
        featureList[i].enableExplosion(demoExplosionOptions);
    }
    engine.triggerUpdateOnce();
    __log("模型爆炸图: enabled via ModelFeature.enableExplosion(), factor=" + demoExplosionOptions.factor);
}

function disableExplosionView() {
    explosionEnabled = false;
    for (var i = 0; i < featureList.length; i++) {
        featureList[i].disableExplosion();
    }
    engine.triggerUpdateOnce();
    __log("模型爆炸图: disabled");
}

function setModelShow(idx, show) {
    featureList[idx].options = Object.assign({}, featureList[idx].options, { show });
}

function setColorBlendMode(mode) {
    var amount = mode === Daisy.ColorBlendMode.HIGHLIGHT ? 0.35
               : mode === Daisy.ColorBlendMode.MIX ? 0.5
               : undefined;
    for (var i = 0; i < featureList.length; i++) {
        var opts = { colorBlendMode: mode };
        if (amount !== undefined) opts.colorBlendAmount = amount;
        featureList[i].options = Object.assign({}, featureList[i].options, opts);
    }
    var modeName = mode === Daisy.ColorBlendMode.HIGHLIGHT ? "HIGHLIGHT"
                 : mode === Daisy.ColorBlendMode.MIX ? "MIX"
                 : "REPLACE";
    __log("颜色混合: " + modeName);
}

function setCameraDistance(dist) {
    viewDistance = dist;
    applyMainCameraView();
    __log("相机距离: " + (dist / 1000) + "km");
}

registerCleanup(function () {
    removePreRender();
});

__log("模型平台编队: 内置模型 4 个（satellite / fixedGroundStation / rocket / aircraft）");
__log("相机: 固定主视角 | 来源: DaisyModelLibrary | 动画: 控制节点 + 内置 glTF 动画");
applyMainCameraView();
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="模型组件" padding="12px" width="300px">
    <div class="panel-head-simple">
        <span class="panel-icon">🚀</span>
        <span class="panel-title-text">模型组件</span>
    </div>

    <div class="model-group">
        <div class="model-group-label">动画控制</div>
        <div class="btn-stack">
            <button onclick={toggleRotation}>暂停 / 恢复节点旋转</button>
        </div>
    </div>

    <div class="model-group">
        <div class="model-group-label">爆炸图</div>
        <div class="btn-grid-2">
            <button class:active={explosionEnabled} onclick={enableExplosionView}>启用爆炸图</button>
            <button class:active={!explosionEnabled} onclick={disableExplosionView}>取消爆炸图</button>
        </div>
    </div>

    <div class="model-group">
        <div class="model-group-label">模型显隐</div>
        <div class="btn-grid-2">
            <button onclick={() => setModelShow(0, false)}>隐藏卫星</button>
            <button onclick={() => setModelShow(0, true)}>显示卫星</button>
            <button onclick={() => setModelShow(2, false)}>隐藏火箭</button>
            <button onclick={() => setModelShow(2, true)}>显示火箭</button>
        </div>
    </div>

    <div class="model-group">
        <div class="model-group-label">颜色混合模式</div>
        <div class="btn-grid-3">
            <button onclick={() => setColorBlendMode(Daisy.ColorBlendMode.HIGHLIGHT)}>HIGHLIGHT</button>
            <button onclick={() => setColorBlendMode(Daisy.ColorBlendMode.MIX)}>MIX</button>
            <button onclick={() => setColorBlendMode(Daisy.ColorBlendMode.REPLACE)}>REPLACE</button>
        </div>
    </div>

    <div class="model-group">
        <div class="model-group-label">相机距离</div>
        <div class="btn-grid-3">
            <button onclick={() => setCameraDistance(8000)}>近 (8km)</button>
            <button onclick={() => setCameraDistance(15000)}>标准 (15km)</button>
            <button onclick={() => setCameraDistance(30000)}>远 (30km)</button>
        </div>
    </div>
</DemoPanel>
<style>
.panel-head-simple {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 8px; padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.panel-icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px;
    background: var(--color-accent-muted);
    font-size: 12px;
}
.panel-title-text {
    font-size: 13px; font-weight: 700;
    color: var(--panel-text-bright);
}
.model-group {
    margin-top: 6px;
    padding-top: 8px;
}
.model-group + .model-group {
    border-top: 1px solid var(--panel-border);
}
.model-group-label {
    font-size: 10px; font-weight: 600;
    color: var(--panel-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
}
.btn-stack {
    display: flex; flex-direction: column; gap: 5px;
}
.btn-grid-2 {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5px;
}
.btn-grid-3 {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;
}
button {
    width: 100%; min-height: 28px;
    background: var(--panel-bg-card);
    border: 1px solid var(--panel-border);
    color: var(--panel-text);
    padding: 5px 8px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 11px;
    transition: all 0.12s;
}
button:hover { background: var(--color-accent-muted); border-color: var(--color-accent); }
button.active {
    background: var(--color-accent-muted);
    border-color: var(--color-accent);
    color: var(--panel-text-bright);
}
</style>
