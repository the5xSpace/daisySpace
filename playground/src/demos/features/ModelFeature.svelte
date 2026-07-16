<script>
// =============================================================================
// ModelFeature Demo — 模型组件平台编队展示
//
// 本示例演示如何使用 ModelFeature 创建和控制 3D 模型：
// 1. 创建平台和模型实体
// 2. 配置模型参数（缩放、轮廓、颜色混合等）
// 3. 基于 glTF 节点名选择关键部件
// 4. 节点级机械旋转动画
// 5. 节点交互（鼠标悬停、点击）
//
// 关键 API：
// - Daisy.ModelFeature: 模型组件
//   - url: 模型文件路径（glTF/glb）
//   - scale: 缩放比例
//   - minimumPixelSize: 最小像素大小
//   - silhouetteSize/silhouetteColor: 轮廓大小/颜色
//   - colorBlendMode/colorBlendAmount: 颜色混合模式/程度
//   - distanceDisplayCondition: 距离显示条件
// - modelFeature.getNodeNames(): 获取模型节点名列表
// - modelFeature.transformNode(nodeName): 变换节点
//   - setRotationAxisAngleDeg: 设置轴角旋转
//   - setRotationHprDeg: 设置航向/俯仰/滚转旋转
//   - setColorOverlay: 设置颜色叠加
//   - setOpacity: 设置透明度
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
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0,
    maxLevel: 3,
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

// ── 3. 模型配置 ──────────────────────────────────────────────
var models = [
    { name: "ChandraXrayObservatory",              lon: baseLon - 0.0525, url: Daisy.BuildModuleUrl.getUrl("models/ChandraXrayObservatory.glb"),               scale: 94,  silhouette: Daisy.Color.CYAN,    altOffset: 1800 },
    { name: "GammaRayObservatory",                  lon: baseLon - 0.0175, url: Daisy.BuildModuleUrl.getUrl("models/GammaRayObservatory.glb"),                   scale: 714, silhouette: Daisy.Color.ORANGE,  altOffset: 1800 },
    { name: "RadarSatellite1RADARSAT1",         lon: baseLon + 0.0175, url: Daisy.BuildModuleUrl.getUrl("models/RadarSatellite1RADARSAT1.glb"),         scale: 20,  silhouette: Daisy.Color.LIME,    altOffset: 1800 },
    { name: "LunarReconnaissanceOrbiterA",       lon: baseLon + 0.0525, url: Daisy.BuildModuleUrl.getUrl("models/LunarReconnaissanceOrbiterA.glb"),       scale: 4.5,  silhouette: Daisy.Color.HOTPINK, altOffset: 1800 },
];

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
        minimumPixelSize: 150,
        maximumScale: cfg.scale * 4,
        distanceDisplayCondition: ddc,
        silhouetteSize: 2,
        silhouetteColor: cfg.silhouette,
        colorBlendMode: Daisy.ColorBlendMode.HIGHLIGHT,
        colorBlendAmount: 0.35,
        backFaceCulling: false,
    });
    entity.addFeature(feature);
    featureList.push(feature);

    entity.addFeature(new Daisy.UI.LabelFeature({
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

// ── 节点机械旋转动画 ──
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

    // Chandra: 让 foil / panel 类节点做摆动，模拟太阳翼展开
    var s0Nodes = featureList[0].getNodeNames();
    var s0Targets = pickNodesByPattern(s0Nodes, /foil_|panel/i);
    if (s0Targets.length === 0) s0Targets = pickNodesByPattern(s0Nodes, /AO_HRMA|_root/i);
    if (s0Targets.length === 0) s0Targets = s0Nodes.slice(0, Math.min(3, s0Nodes.length));
    logUsefulNodes(models[0].name, s0Nodes, s0Targets);
    for (var j = 0; j < s0Targets.length; j++) {
        nodeAnimations.push({
            feature: featureList[0],
            node: s0Targets[j],
            mode: "panel-swing",
            axis: "y",
            speed: 36 + j * 8,
            phase: j * Math.PI,
        });
    }

    // GammaRayObservatory: 让 Pivot 节点持续沿着 head 方向转头
    var cameraNodes = featureList[1].getNodeNames();
    var cameraHead = pickNodeByPatterns(cameraNodes, [/^Pivot-/i, /Pivot/i, /LWO/i]);
    logUsefulNodes(models[1].name, cameraNodes, cameraHead ? [cameraHead] : []);
    nodeAnimations.push({ feature: featureList[1], node: cameraHead || null, mode: cameraHead ? "spin-axis" : "spin-model-heading", axis: "z", speed: 22 });

    // RADARSAT-1: 让主节点持续扫描，并周期性改变俯仰角，看起来像在跟踪
    var rNodes = featureList[2].getNodeNames();
    var radarTarget = pickNodeByPatterns(rNodes, [/mesh_0_0/i, /mesh_0_1/i, /mesh_0/i, /dish/i, /scan/i]);
    logUsefulNodes(models[2].name, rNodes, radarTarget ? [radarTarget] : []);
    if (radarTarget) {
        nodeAnimations.push({
            feature: featureList[2],
            node: radarTarget,
            mode: "radar-track",
            yawSpeed: 28,
            pitchMin: -10,
            pitchMax: 22,
            pitchSpeed: 0.65,
        });
    }

    // Lunar Reconnaissance Orbiter: 找几个 Layer / Pivot 节点绕 Z 轴慢速旋转（层叠展开）
    var s3Nodes = featureList[3].getNodeNames();
    var s3Targets = pickNodesByPattern(s3Nodes, /Layer_[0-4]|Pivot-Layer_[0-4]/i);
    if (s3Targets.length === 0) s3Targets = pickNodesByPattern(s3Nodes, /Layer/i);
    if (s3Targets.length === 0) s3Targets = s3Nodes.slice(0, Math.min(3, s3Nodes.length));
    logUsefulNodes(models[3].name, s3Nodes, s3Targets);
    for (var si = 0; si < s3Targets.length; si++) {
        nodeAnimations.push({ feature: featureList[3], node: s3Targets[si], mode: "spin-axis", axis: "z", speed: 4 + si * 1.5 });
    }

    __log("节点动画: " + nodeAnimations.length + " 个旋转目标");
    for (var k = 0; k < nodeAnimations.length; k++) {
        var a = nodeAnimations[k];
        if (a.mode === "radar-track") {
            __log("  " + models[featureList.indexOf(a.feature)].name + " / " + a.node + " -> tracking yaw @ " + a.yawSpeed + " deg/s, pitch " + a.pitchMin + "~" + a.pitchMax + " deg");
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

        if (anim.mode === "panel-swing") {
            var swingDeg = Math.sin(t * 1.2 + (anim.phase || 0)) * 120;
            anim.feature.transformNode(anim.node).setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Z, swingDeg);
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

// ── 模型加载后初始化节点动画 ──
var loadCount = 0;
for (var li = 0; li < featureList.length; li++) {
    (function (idx) {
        featureList[idx].onload(function () {
            var nodeNames = featureList[idx].getNodeNames();
            var anims = featureList[idx].getAnimationInfos();
            __log(models[idx].name + ": " + nodeNames.length + " nodes, " + anims.length + " animations (glTF)");
            __log("  nodes: " + nodeNames.join(", "));

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

__log("模型平台编队: 4 模型 + 14km×6km 黄色平台");
__log("相机: 固定主视角 | 模型: 轻微悬浮 | 节点: 自转 / 扫描 / 俯仰跟踪");
__log("所有模型均无 glTF 骨骼动画，动画由节点旋转实现");
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
            <button onclick={() => setModelShow(0, false)}>隐藏 Chandra</button>
            <button onclick={() => setModelShow(0, true)}>显示 Chandra</button>
            <button onclick={() => setModelShow(2, false)}>隐藏 RADARSAT-1</button>
            <button onclick={() => setModelShow(2, true)}>显示 RADARSAT-1</button>
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
