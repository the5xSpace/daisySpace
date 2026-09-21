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
        maximumScale: cfg.minPx * 40,
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

function pickNodeByPatterns(nodeNames, patterns) {
    for (var i = 0; i < patterns.length; i++) {
        for (var j = 0; j < nodeNames.length; j++) {
            if (patterns[i].test(nodeNames[j])) return nodeNames[j];
        }
    }
    return nodeNames.length > 0 ? nodeNames[0] : undefined;
}

function pickNodesByPattern(nodeNames, pattern) {
    var out = [];
    for (var i = 0; i < nodeNames.length; i++) {
        if (pattern.test(nodeNames[i])) out.push(nodeNames[i]);
    }
    return out;
}

function logUsefulNodes(modelName, nodeNames, pickedNodes) {
    __log(modelName + " useful nodes: " + (pickedNodes.length > 0 ? pickedNodes.join(", ") : "(none)"));
    __log("  all nodes: " + nodeNames.join(", "));
}

function setupNodeAnimations() {
    nodeAnimations = [];

    // daisy-satellite: 太阳翼肩部摆动 + 载荷雷达跟踪
    var s0Nodes = featureList[0].getNodeNames();
    var solarNodes = pickNodesByPattern(s0Nodes, /solar_array_.*_shoulder/i);
    if (solarNodes.length === 0) solarNodes = pickNodesByPattern(s0Nodes, /solar_array/i);
    if (solarNodes.length === 0) solarNodes = s0Nodes.slice(0, Math.min(2, s0Nodes.length));
    logUsefulNodes(models[0].name, s0Nodes, solarNodes);
    for (var j = 0; j < solarNodes.length; j++) {
        nodeAnimations.push({
            feature: featureList[0],
            node: solarNodes[j],
            mode: "panel-swing",
            axis: "y",
            speed: 36 + j * 8,
            phase: j * Math.PI,
        });
    }
    var radarAz = pickNodeByPatterns(s0Nodes, [/^radar_azimuth$/i, /radar_azimuth/i]);
    if (radarAz) {
        nodeAnimations.push({ feature: featureList[0], node: radarAz, mode: "spin-axis", axis: "z", speed: 18 });
    }

    // daisy-fixed-ground-station: 天线方位/俯仰扫描
    var s1Nodes = featureList[1].getNodeNames();
    var antennaAz = pickNodeByPatterns(s1Nodes, [/^azimuth$/i, /azimuth/i]);
    var antennaEl = pickNodeByPatterns(s1Nodes, [/^elevation$/i, /elevation/i]);
    logUsefulNodes(models[1].name, s1Nodes, [antennaAz, antennaEl].filter(Boolean));
    if (antennaAz) {
        nodeAnimations.push({
            feature: featureList[1],
            node: antennaAz,
            mode: "radar-track",
            yawSpeed: 28,
            pitchMin: 0,
            pitchMax: 0,
            pitchSpeed: 0.65,
            forcePitch: false,
        });
    }
    if (antennaEl) {
        nodeAnimations.push({
            feature: featureList[1],
            node: antennaEl,
            mode: "radar-pitch",
            pitchMin: -10,
            pitchMax: 22,
            pitchSpeed: 0.65,
            axis: "x",
        });
    }

    // daisy-rocket: 芯级/助推器轻微旋转，展示可动部件
    var s2Nodes = featureList[2].getNodeNames();
    var rocketTargets = pickNodesByPattern(s2Nodes, /booster_/i);
    if (rocketTargets.length === 0) rocketTargets = pickNodesByPattern(s2Nodes, /core_stage/i);
    if (rocketTargets.length === 0) rocketTargets = s2Nodes.slice(0, Math.min(2, s2Nodes.length));
    logUsefulNodes(models[2].name, s2Nodes, rocketTargets);
    for (var ri = 0; ri < rocketTargets.length; ri++) {
        nodeAnimations.push({
            feature: featureList[2],
            node: rocketTargets[ri],
            mode: "spin-axis",
            axis: "y",
            speed: 6 + ri * 1.2,
        });
    }

    // daisy-aircraft: 副翼/方向舵摆动
    var s3Nodes = featureList[3].getNodeNames();
    var surfaceTargets = pickNodesByPattern(s3Nodes, /aileron_|elevator_|rudder/i);
    if (surfaceTargets.length === 0) surfaceTargets = s3Nodes.slice(0, Math.min(3, s3Nodes.length));
    logUsefulNodes(models[3].name, s3Nodes, surfaceTargets);
    for (var si = 0; si < surfaceTargets.length; si++) {
        var name = surfaceTargets[si] || "";
        nodeAnimations.push({
            feature: featureList[3],
            node: surfaceTargets[si],
            mode: "panel-swing",
            axis: /rudder/i.test(name) ? "z" : "x",
            speed: 40 + si * 10,
            phase: si * 0.8,
        });
    }

    __log("节点动画: " + nodeAnimations.length + " 个旋转目标");
    for (var k = 0; k < nodeAnimations.length; k++) {
        var a = nodeAnimations[k];
        if (a.mode === "radar-track" || a.mode === "radar-pitch") {
            __log("  " + models[featureList.indexOf(a.feature)].name + " / " + a.node + " -> antenna scan");
        } else {
            __log("  " + models[featureList.indexOf(a.feature)].name + " / " + a.node + " -> rotate " + a.axis + " @ " + a.speed + " deg/s");
        }
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

function updateAnimations() {
    var t = (performance.now() - startMs) / 1000;

    if (!rotating) return;
    for (var i = 0; i < nodeAnimations.length; i++) {
        var anim = nodeAnimations[i];
        if (anim.mode === "radar-track") {
            var yawDeg = t * anim.yawSpeed;
            var pitchMid = (anim.pitchMin + anim.pitchMax) / 2;
            var pitchAmp = (anim.pitchMax - anim.pitchMin) / 2;
            var pitchDeg = pitchMid + Math.sin(t * anim.pitchSpeed * Math.PI * 2) * pitchAmp;
            anim.feature.transformNode(anim.node).setRotationHprDeg(yawDeg, pitchDeg, 0);
            continue;
        }

        if (anim.mode === "radar-pitch") {
            var mid = (anim.pitchMin + anim.pitchMax) / 2;
            var amp = (anim.pitchMax - anim.pitchMin) / 2;
            var pDeg = mid + Math.sin(t * anim.pitchSpeed * Math.PI * 2) * amp;
            var pAxis = anim.axis === "x" ? Daisy.Cartesian3.UNIT_X : Daisy.Cartesian3.UNIT_Y;
            anim.feature.transformNode(anim.node).setRotationAxisAngleDeg(pAxis, pDeg);
            continue;
        }

        if (anim.mode === "panel-swing") {
            var swingDeg = Math.sin(t * 1.2 + (anim.phase || 0)) * 120;
            var swingAxis = anim.axis === "x" ? Daisy.Cartesian3.UNIT_X
                : anim.axis === "y" ? Daisy.Cartesian3.UNIT_Y
                : Daisy.Cartesian3.UNIT_Z;
            anim.feature.transformNode(anim.node).setRotationAxisAngleDeg(swingAxis, swingDeg);
            continue;
        }

        var angle = t * anim.speed;
        var axis = anim.axis === "x" ? Daisy.Cartesian3.UNIT_X
                 : anim.axis === "y" ? Daisy.Cartesian3.UNIT_Y
                 : Daisy.Cartesian3.UNIT_Z;
        if (anim.mode === "spin-model-heading") {
            anim.feature.transformer.setRotation({ heading: angle, pitch: 0, roll: 0 });
            continue;
        }
        if (anim.node) {
            anim.feature.transformNode(anim.node).setRotationAxisAngleDeg(axis, angle);
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
            __log(models[idx].name + ": " + nodeNames.length + " nodes, " + anims.length + " animations (glTF)");
            __log("  nodes: " + nodeNames.join(", "));
            __log("  builtin animation: " + models[idx].animation);

            // 播放内置目录动画（如 solar_array_fold / antenna_scan）
            var target = models[idx].animation;
            var matched = anims.filter(function (a) { return a.name === target; });
            if (matched.length > 0) {
                featureList[idx].playAnimation({
                    name: target,
                    loop: Daisy.ModelAnimationLoop.REPEAT,
                    multiplier: 1.0,
                });
            }

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
