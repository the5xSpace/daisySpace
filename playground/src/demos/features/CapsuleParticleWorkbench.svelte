<script>
import DemoPanel from "../../shell/DemoPanel.svelte";

// =============================================================================
// CapsuleParticleWorkbench Demo — 胶囊粒子工作台
//
// 胶囊粒子与世界粒子的边界：
// - CapsuleParticleFeature：单个世界锚定贴图片面播放预生成 canvas 帧，适合
//   火箭喷焰、飞机尾焰、姿控喷口等强绑定宿主、需要连续主体形态的效果。
// - ParticleFeature：Cesium ParticleSystem 逐粒子积分，适合雨雪、烟雾、水流、
//   风尘等离开宿主后仍属于世界空间的自然粒子。
//
// 本示例只聚焦单个胶囊粒子的贴图生成、姿态和局部偏移，避免无关布局干扰判断。
// =============================================================================

let { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();
engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
});

const originLon = 116.397;
const originLat = 39.904;
const originAlt = 180;
let orbitPhase = 0;
let orbitPlaying = $state(true);

const emitter2DPresets = {
    "rocket-flame": {
        totalParticles: 420,
        emissionRate: 260,
        sourceVarianceX: 0.082,
        sourceVarianceY: 0.014,
        angle: 90,
        angleVariance: 16,
        speed: 0.82,
        speedVariance: 0.2,
        life: 1.05,
        lifeVariance: 0.24,
        radialAcceleration: 0.04,
        tangentialAcceleration: 0.035,
        gravityY: -0.025,
        particleRadius: 0.078,
        particleRadiusVariance: 0.032,
        startScale: 1.32,
        endScale: 0.34,
        colorVariance: 0.09,
        stretch: 1.72,
        blendMode: "additive",
    },
    "jet-flame": {
        totalParticles: 210,
        emissionRate: 160,
        sourceVarianceX: 0.032,
        sourceVarianceY: 0.008,
        angle: 90,
        angleVariance: 6,
        speed: 1.04,
        speedVariance: 0.12,
        life: 0.78,
        lifeVariance: 0.16,
        radialAcceleration: 0.015,
        tangentialAcceleration: 0.01,
        gravityY: -0.015,
        particleRadius: 0.034,
        particleRadiusVariance: 0.012,
        startScale: 1.05,
        endScale: 0.08,
        colorVariance: 0.055,
        stretch: 2.45,
        blendMode: "additive",
    },
    "energy-plume": {
        totalParticles: 300,
        emissionRate: 210,
        sourceVarianceX: 0.075,
        sourceVarianceY: 0.016,
        angle: 90,
        angleVariance: 22,
        speed: 0.7,
        speedVariance: 0.2,
        life: 1.05,
        lifeVariance: 0.32,
        radialAcceleration: 0.075,
        tangentialAcceleration: 0.12,
        gravityY: -0.01,
        particleRadius: 0.047,
        particleRadiusVariance: 0.02,
        startScale: 1.08,
        endScale: 0.16,
        colorVariance: 0.12,
        stretch: 1.85,
        blendMode: "additive",
    },
    "soft-plume": {
        totalParticles: 340,
        emissionRate: 150,
        sourceVarianceX: 0.1,
        sourceVarianceY: 0.02,
        angle: 90,
        angleVariance: 28,
        speed: 0.44,
        speedVariance: 0.16,
        life: 1.35,
        lifeVariance: 0.38,
        radialAcceleration: 0.035,
        tangentialAcceleration: 0.06,
        gravityY: 0.018,
        particleRadius: 0.071,
        particleRadiusVariance: 0.032,
        startScale: 1,
        endScale: 0.34,
        colorVariance: 0.09,
        stretch: 1.25,
        blendMode: "normal",
    },
    "linear-streak": {
        totalParticles: 140,
        emissionRate: 120,
        sourceVarianceX: 0.018,
        sourceVarianceY: 0.006,
        angle: 90,
        angleVariance: 3,
        speed: 1.18,
        speedVariance: 0.1,
        life: 0.72,
        lifeVariance: 0.12,
        radialAcceleration: 0,
        tangentialAcceleration: 0,
        gravityY: -0.01,
        particleRadius: 0.026,
        particleRadiusVariance: 0.008,
        startScale: 0.95,
        endScale: 0.05,
        colorVariance: 0.045,
        stretch: 3.4,
        blendMode: "additive",
    },
};
const initialEmitter2D = emitter2DPresets["rocket-flame"];

let emitterPreset = $state("rocket-flame");
let particleImageMode = $state("generated");
let power = $state(0.9);
let length = $state(145);
let radius = $state(12);
let frameRate = $state(24);
let frameCount = $state(24);
let turbulence = $state(0.82);
let color = $state("#00ffee");
let coreColor = $state("blue");
let tailColor = $state("#3aa0ff");
let directionPreset = $state("-X");
let heading = $state(0);
let pitch = $state(0);
let roll = $state(0);
let offsetX = $state(-26);
let offsetY = $state(0);
let offsetZ = $state(0);
let visualScaleMode = $state("none");
let showAxis = $state(true);
let hostSpeed = $state(0.7);
let cameraFollow = $state(true);
let powerAffectsSize = $state(true);
let powerAffectsAlpha = $state(true);
let powerAffectsPlayback = $state(true);
let powerAffectsVisibility = $state(true);
let totalParticles = $state(initialEmitter2D.totalParticles);
let emissionRate = $state(initialEmitter2D.emissionRate);
let sourceVarianceX = $state(initialEmitter2D.sourceVarianceX);
let sourceVarianceY = $state(initialEmitter2D.sourceVarianceY);
let emitterAngle = $state(initialEmitter2D.angle);
let emitterAngleVariance = $state(initialEmitter2D.angleVariance);
let emitterSpeed = $state(initialEmitter2D.speed);
let emitterSpeedVariance = $state(initialEmitter2D.speedVariance);
let particleLife = $state(initialEmitter2D.life);
let particleLifeVariance = $state(initialEmitter2D.lifeVariance);
let radialAcceleration = $state(initialEmitter2D.radialAcceleration);
let tangentialAcceleration = $state(initialEmitter2D.tangentialAcceleration);
let gravityY = $state(initialEmitter2D.gravityY);
let particleRadius = $state(initialEmitter2D.particleRadius);
let particleRadiusVariance = $state(initialEmitter2D.particleRadiusVariance);
let particleStartScale = $state(initialEmitter2D.startScale);
let particleEndScale = $state(initialEmitter2D.endScale);
let colorVariance = $state(initialEmitter2D.colorVariance);
let particleStretch = $state(initialEmitter2D.stretch);
let blendMode = $state(initialEmitter2D.blendMode);

let lastParticleImageCacheKey = "";
let cachedParticleImage = undefined;
let showCodePreview = $state(false);
let codePreviewText = $state("");
let copyStatus = $state("复制代码");
let copyStatusTimer = 0;

const previewCameraView = {
    distance: 360,
    pitchDeg: -18,
    headingDeg: 210,
};

function hostPosition(phase) {
    return C3.fromDegrees(
        originLon + Math.cos(phase) * 0.004,
        originLat + Math.sin(phase) * 0.0022,
        originAlt + Math.sin(phase * 1.7) * 36,
    );
}

function directionVector(preset = directionPreset) {
    if (preset === "+X") return new C3(1, 0, 0);
    if (preset === "+Y") return new C3(0, 1, 0);
    if (preset === "-Y") return new C3(0, -1, 0);
    if (preset === "+Z") return new C3(0, 0, 1);
    if (preset === "-Z") return new C3(0, 0, -1);
    return new C3(-1, 0, 0);
}

function createParticleImage(mode, mainColor, edgeColor) {
    if (mode === "generated" || typeof document === "undefined") return undefined;
    const key = `${mode}|${mainColor}|${edgeColor}`;
    if (key === lastParticleImageCacheKey) return cachedParticleImage;
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    canvas.height = 96;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const cx = canvas.width * 0.5;
    const cy = canvas.height * 0.5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    if (mode === "halo-card") {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 42);
        glow.addColorStop(0, mainColor);
        glow.addColorStop(0.42, edgeColor);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 42, 0, Math.PI * 2);
        ctx.fill();
    } else {
        const beam = ctx.createLinearGradient(16, cy, 80, cy);
        beam.addColorStop(0, "rgba(0,0,0,0)");
        beam.addColorStop(0.38, mainColor);
        beam.addColorStop(0.72, edgeColor);
        beam.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 36, 9, -0.28, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    lastParticleImageCacheKey = key;
    cachedParticleImage = canvas;
    return cachedParticleImage;
}

function applyEmitterPreset(nextPreset) {
    const preset = emitter2DPresets[nextPreset] ?? emitter2DPresets["rocket-flame"];
    emitterPreset = nextPreset;
    totalParticles = preset.totalParticles;
    emissionRate = preset.emissionRate;
    sourceVarianceX = preset.sourceVarianceX;
    sourceVarianceY = preset.sourceVarianceY;
    emitterAngle = preset.angle;
    emitterAngleVariance = preset.angleVariance;
    emitterSpeed = preset.speed;
    emitterSpeedVariance = preset.speedVariance;
    particleLife = preset.life;
    particleLifeVariance = preset.lifeVariance;
    radialAcceleration = preset.radialAcceleration;
    tangentialAcceleration = preset.tangentialAcceleration;
    gravityY = preset.gravityY;
    particleRadius = preset.particleRadius;
    particleRadiusVariance = preset.particleRadiusVariance;
    particleStartScale = preset.startScale;
    particleEndScale = preset.endScale;
    colorVariance = preset.colorVariance;
    particleStretch = preset.stretch;
    blendMode = preset.blendMode;
}

function buildEmitter2DOptions() {
    return {
        totalParticles,
        emissionRate,
        source: { x: 0.5, y: 0.94 },
        sourceVariance: { x: sourceVarianceX, y: sourceVarianceY },
        angle: emitterAngle,
        angleVariance: emitterAngleVariance,
        speed: emitterSpeed,
        speedVariance: emitterSpeedVariance,
        life: particleLife,
        lifeVariance: particleLifeVariance,
        radialAcceleration,
        tangentialAcceleration,
        gravity: { x: 0, y: gravityY },
        particleRadius,
        particleRadiusVariance,
        startScale: particleStartScale,
        endScale: particleEndScale,
        startColor: Color.fromCssColorString(coreColor),
        endColor: Color.fromCssColorString(tailColor),
        colorVariance,
        stretch: particleStretch,
        blendMode,
    };
}

function formatCodeNumber(value, precision = 4) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "0";
    if (Number.isInteger(n)) return String(n);
    return n.toFixed(precision).replace(/\.?0+$/, "");
}

function formatCodeString(value) {
    return JSON.stringify(String(value));
}

function formatCodeBoolean(value) {
    return value ? "true" : "false";
}

function formatCodeColor(value) {
    return `Color.fromCssColorString(${formatCodeString(value)})`;
}

function directionComponents(preset = directionPreset) {
    if (preset === "+X") return [1, 0, 0];
    if (preset === "+Y") return [0, 1, 0];
    if (preset === "-Y") return [0, -1, 0];
    if (preset === "+Z") return [0, 0, 1];
    if (preset === "-Z") return [0, 0, -1];
    return [-1, 0, 0];
}

function formatCodeVector3(x, y, z) {
    return `new C3(${formatCodeNumber(x)}, ${formatCodeNumber(y)}, ${formatCodeNumber(z)})`;
}

function buildParticleImageFactoryCode() {
    return [
        "function createCapsuleParticleImage(mode, mainColor, edgeColor) {",
        "    if (mode === \"generated\" || typeof document === \"undefined\") return undefined;",
        "    const canvas = document.createElement(\"canvas\");",
        "    canvas.width = 96;",
        "    canvas.height = 96;",
        "    const ctx = canvas.getContext(\"2d\");",
        "    if (!ctx) return undefined;",
        "    const cx = canvas.width * 0.5;",
        "    const cy = canvas.height * 0.5;",
        "    ctx.clearRect(0, 0, canvas.width, canvas.height);",
        "    ctx.globalCompositeOperation = \"lighter\";",
        "    if (mode === \"halo-card\") {",
        "        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 42);",
        "        glow.addColorStop(0, mainColor);",
        "        glow.addColorStop(0.42, edgeColor);",
        "        glow.addColorStop(1, \"rgba(0,0,0,0)\");",
        "        ctx.fillStyle = glow;",
        "        ctx.beginPath();",
        "        ctx.arc(cx, cy, 42, 0, Math.PI * 2);",
        "        ctx.fill();",
        "        return canvas;",
        "    }",
        "    const beam = ctx.createLinearGradient(16, cy, 80, cy);",
        "    beam.addColorStop(0, \"rgba(0,0,0,0)\");",
        "    beam.addColorStop(0.38, mainColor);",
        "    beam.addColorStop(0.72, edgeColor);",
        "    beam.addColorStop(1, \"rgba(0,0,0,0)\");",
        "    ctx.fillStyle = beam;",
        "    ctx.beginPath();",
        "    ctx.ellipse(cx, cy, 36, 9, -0.28, 0, Math.PI * 2);",
        "    ctx.closePath();",
        "    ctx.fill();",
        "    return canvas;",
        "}",
    ].join("\n");
}

function buildEmitter2DCode() {
    return [
        "    emitter2D: {",
        `        totalParticles: ${formatCodeNumber(totalParticles)},`,
        `        emissionRate: ${formatCodeNumber(emissionRate)},`,
        "        source: { x: 0.5, y: 0.94 },",
        `        sourceVariance: { x: ${formatCodeNumber(sourceVarianceX, 6)}, y: ${formatCodeNumber(sourceVarianceY, 6)} },`,
        `        angle: ${formatCodeNumber(emitterAngle)},`,
        `        angleVariance: ${formatCodeNumber(emitterAngleVariance)},`,
        `        speed: ${formatCodeNumber(emitterSpeed)},`,
        `        speedVariance: ${formatCodeNumber(emitterSpeedVariance)},`,
        `        life: ${formatCodeNumber(particleLife)},`,
        `        lifeVariance: ${formatCodeNumber(particleLifeVariance)},`,
        `        radialAcceleration: ${formatCodeNumber(radialAcceleration, 6)},`,
        `        tangentialAcceleration: ${formatCodeNumber(tangentialAcceleration, 6)},`,
        `        gravity: { x: 0, y: ${formatCodeNumber(gravityY, 6)} },`,
        `        particleRadius: ${formatCodeNumber(particleRadius, 6)},`,
        `        particleRadiusVariance: ${formatCodeNumber(particleRadiusVariance, 6)},`,
        `        startScale: ${formatCodeNumber(particleStartScale)},`,
        `        endScale: ${formatCodeNumber(particleEndScale)},`,
        `        startColor: ${formatCodeColor(coreColor)},`,
        `        endColor: ${formatCodeColor(tailColor)},`,
        `        colorVariance: ${formatCodeNumber(colorVariance)},`,
        `        stretch: ${formatCodeNumber(particleStretch)},`,
        `        blendMode: ${formatCodeString(blendMode)},`,
        "    },",
    ].join("\n");
}

function buildCapsuleParticleCode() {
    const [dx, dy, dz] = directionComponents();
    return [
        "// 复制到 DaisySpace-Sdk playground/demo 环境中使用：需要已有 engine 与 Daisy。",
        "const C3 = Daisy.Cartesian3;",
        "const Color = Daisy.Color;",
        "",
        buildParticleImageFactoryCode(),
        "",
        "const capsuleHost = engine.createEntity(\"CapsuleParticle-Host\");",
        `capsuleHost.position = C3.fromDegrees(${formatCodeNumber(originLon, 6)}, ${formatCodeNumber(originLat, 6)}, ${formatCodeNumber(originAlt)});`,
        "capsuleHost.addFeature(new Daisy.CubeFeature({",
        "    bottomX: 72,",
        "    bottomY: 22,",
        "    topX: 72,",
        "    topY: 22,",
        "    height: 20,",
        "    color: Color.fromRgba(0x69d7ffaa),",
        "    outline: true,",
        "    outlineColor: Color.fromRgba(0xe8fbffff),",
        "    outlineWidth: 2,",
        "}));",
        "capsuleHost.setBodyAxis({",
        "    length: 150,",
        "    axisWidth: 3,",
        `    showLabels: ${formatCodeBoolean(showAxis)},`,
        "    showSphere: false,",
        "    showWireframe: false,",
        "    labelPrefix: \"+\",",
        "});",
        "",
        "const capsuleParticle = new Daisy.CapsuleParticleFeature({",
        "    name: \"capsule-workbench\",",
        `    position: ${formatCodeVector3(offsetX, offsetY, offsetZ)},`,
        `    localDirection: ${formatCodeVector3(dx, dy, dz)},`,
        `    emitterDirection: { heading: ${formatCodeNumber(heading)}, pitch: ${formatCodeNumber(pitch)}, roll: ${formatCodeNumber(roll)} },`,
        `    emitterPreset: ${formatCodeString(emitterPreset)},`,
        `    particleImage: createCapsuleParticleImage(${formatCodeString(particleImageMode)}, ${formatCodeString(color)}, ${formatCodeString(tailColor)}),`,
        buildEmitter2DCode(),
        `    color: ${formatCodeColor(color)},`,
        `    coreColor: ${formatCodeColor(coreColor)},`,
        `    tailColor: ${formatCodeColor(tailColor)},`,
        `    power: ${formatCodeNumber(power)},`,
        `    length: ${formatCodeNumber(length)},`,
        `    radius: ${formatCodeNumber(radius)},`,
        `    frameRate: ${formatCodeNumber(frameRate)},`,
        `    frameCount: ${formatCodeNumber(frameCount)},`,
        `    turbulence: ${formatCodeNumber(turbulence)},`,
        `    visualScaleMode: ${formatCodeString(visualScaleMode)},`,
        `    powerAffectsSize: ${formatCodeBoolean(powerAffectsSize)},`,
        `    powerAffectsAlpha: ${formatCodeBoolean(powerAffectsAlpha)},`,
        `    powerAffectsPlayback: ${formatCodeBoolean(powerAffectsPlayback)},`,
        `    powerAffectsVisibility: ${formatCodeBoolean(powerAffectsVisibility)},`,
        "    screenSpaceSizing: true,",
        "    minLengthPx: 128,",
        "    maxLengthPx: 360,",
        "    minRadiusPx: 16,",
        "    maxRadiusPx: 52,",
        "    disableDepthTestDistance: Number.POSITIVE_INFINITY,",
        "});",
        "capsuleHost.addFeature(capsuleParticle);",
        "",
        "engine.camera.followTarget(capsuleHost, {",
        "    view: { distance: 360, pitchDeg: -18, headingDeg: 210 },",
        "    installInputListeners: true,",
        "    arcRotate: { targetFrameMode: \"enu\", enableGroundCollisionSlide: false },",
        "});",
    ].join("\n");
}

function openCodePreview() {
    codePreviewText = buildCapsuleParticleCode();
    copyStatus = "复制代码";
    showCodePreview = true;
}

function closeCodePreview() {
    showCodePreview = false;
}

async function copyCode() {
    try {
        await navigator.clipboard.writeText(codePreviewText);
        copyStatus = "已复制";
    } catch {
        copyStatus = "复制失败";
    }
    clearTimeout(copyStatusTimer);
    copyStatusTimer = setTimeout(() => {
        copyStatus = "复制代码";
    }, 1600);
}

const hostEntity = engine.createEntity("CapsuleParticle-Host");
hostEntity.position = hostPosition(orbitPhase);
hostEntity.addFeature(new Daisy.CubeFeature({
    bottomX: 72,
    bottomY: 22,
    topX: 72,
    topY: 22,
    height: 20,
    color: Color.fromRgba(0x69d7ffaa),
    outline: true,
    outlineColor: Color.fromRgba(0xe8fbffff),
    outlineWidth: 2,
}));
hostEntity.setBodyAxis({
    length: 150,
    axisWidth: 3,
    showSphere: false,
    showLabels: true,
    showWireframe: false,
    labelPrefix: "+",
});

const capsuleFeature = new Daisy.CapsuleParticleFeature({
    name: "capsule-workbench",
    position: new C3(offsetX, offsetY, offsetZ),
    localDirection: directionVector(),
    emitterDirection: { heading, pitch, roll },
    emitterPreset,
    particleImage: createParticleImage(particleImageMode, color, tailColor),
    emitter2D: buildEmitter2DOptions(),
    color: Color.fromCssColorString(color),
    coreColor: Color.fromCssColorString(coreColor),
    tailColor: Color.fromCssColorString(tailColor),
    power,
    length,
    radius,
    frameRate,
    frameCount,
    turbulence,
    visualScaleMode,
    powerAffectsSize,
    powerAffectsAlpha,
    powerAffectsPlayback,
    powerAffectsVisibility,
    screenSpaceSizing: true,
    minLengthPx: 128,
    maxLengthPx: 360,
    minRadiusPx: 16,
    maxRadiusPx: 52,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
});
hostEntity.addFeature(capsuleFeature);

function applyOptions() {
    const particleImage = createParticleImage(particleImageMode, color, tailColor);
    capsuleFeature.options = {
        ...capsuleFeature.options,
        position: new C3(offsetX, offsetY, offsetZ),
        localDirection: directionVector(),
        emitterDirection: { heading, pitch, roll },
        emitterPreset,
        particleImage,
        emitter2D: buildEmitter2DOptions(),
        color: Color.fromCssColorString(color),
        coreColor: Color.fromCssColorString(coreColor),
        tailColor: Color.fromCssColorString(tailColor),
        power,
        length,
        radius,
        frameRate,
        frameCount,
        turbulence,
        visualScaleMode,
        powerAffectsSize,
        powerAffectsAlpha,
        powerAffectsPlayback,
        powerAffectsVisibility,
    };
    hostEntity.setBodyAxis({
        length: 150,
        axisWidth: 3,
        showSphere: false,
        showLabels: showAxis,
        showWireframe: false,
        labelPrefix: "+",
    });
}

$effect(() => {
    applyOptions();
});

const preRenderRemover = engine.onPreRender(() => {
    if (!orbitPlaying) return;
    orbitPhase += 0.006 * hostSpeed;
    hostEntity.position = hostPosition(orbitPhase);
});

function setCameraFollow(enabled) {
    cameraFollow = enabled;
    if (!enabled) {
        engine.camera.removeTrackedDaisyEntity?.();
        return;
    }
    engine.camera.followTarget(hostEntity, {
        view: previewCameraView,
        installInputListeners: true,
        arcRotate: {
            targetFrameMode: "enu",
            enableGroundCollisionSlide: false,
        },
    });
    engine.camera.setFrustumNear?.(0.1);
}

setCameraFollow(true);
const cameraFollowRefreshTimer = setTimeout(() => setCameraFollow(true), 250);

registerCleanup(() => {
    try { clearTimeout(copyStatusTimer); } catch {}
    try { clearTimeout(cameraFollowRefreshTimer); } catch {}
    try { preRenderRemover?.(); } catch {}
    try { engine.camera.removeTrackedDaisyEntity?.(); } catch {}
    try { engine.removeEntity?.(hostEntity); } catch {}
    try { hostEntity.destroy?.(); } catch {}
});

function resetDefaults() {
    emitterPreset = "rocket-flame";
    particleImageMode = "generated";
    power = 0.9;
    length = 145;
    radius = 12;
    frameRate = 12;
    frameCount = 24;
    turbulence = 0.82;
    color = "#ff8a24";
    coreColor = "#fff0c2";
    tailColor = "#3aa0ff";
    directionPreset = "-X";
    heading = 0;
    pitch = 0;
    roll = 0;
    offsetX = -44;
    offsetY = 0;
    offsetZ = 0;
    visualScaleMode = "none";
    hostSpeed = 0.7;
    powerAffectsSize = true;
    powerAffectsAlpha = true;
    powerAffectsPlayback = true;
    powerAffectsVisibility = true;
    applyEmitterPreset("rocket-flame");
    setCameraFollow(true);
    __log?.("胶囊粒子参数已重置");
}
</script>

<DemoPanel title="胶囊粒子工作台" width="390px" padding="0">
  <div class="capsule-panel">
    <div class="actions">
      <button class="code" onclick={openCodePreview}>查看代码</button>
      <button class="reset" onclick={resetDefaults}>重置参数</button>
    </div>

    <div class="hero">
      <div class="eyebrow">Capsule Particle Plane</div>
      <div class="title">单胶囊粒子，稳定绑定宿主</div>
      <div class="desc">可验证发射器预设、粒子图片、HPR 姿态、局部偏移和核心颜色。</div>
    </div>

    <fieldset>
      <legend>粒子图片 / 发射器预设</legend>
      <div class="field-label">发射器预设</div>
      <select value={emitterPreset} onchange={(event) => applyEmitterPreset(event.currentTarget.value)}>
        <option value="rocket-flame">rocket-flame</option>
        <option value="jet-flame">jet-flame</option>
        <option value="energy-plume">energy-plume</option>
        <option value="soft-plume">soft-plume</option>
        <option value="linear-streak">linear-streak</option>
      </select>
      <div class="field-label">粒子图片</div>
      <select bind:value={particleImageMode}>
        <option value="generated">程序生成粒子</option>
        <option value="halo-card">圆形辉光图片</option>
        <option value="streak-card">线束拉丝图片</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>主体参数</legend>
      <label><span>强度</span><output>{power.toFixed(2)}</output></label>
      <input type="range" min="0" max="1" step="0.01" bind:value={power} />
      <div class="checks">
        <label class="inline"><input type="checkbox" bind:checked={powerAffectsVisibility} />强度控制显隐</label>
        <label class="inline"><input type="checkbox" bind:checked={powerAffectsSize} />强度控制尺寸</label>
        <label class="inline"><input type="checkbox" bind:checked={powerAffectsAlpha} />强度控制透明度</label>
        <label class="inline"><input type="checkbox" bind:checked={powerAffectsPlayback} />强度控制播放速度</label>
      </div>
      <label><span>长度(m)</span><output>{length}</output></label>
      <input type="range" min="30" max="260" step="1" bind:value={length} />
      <label><span>半径(m)</span><output>{radius}</output></label>
      <input type="range" min="2" max="36" step="0.5" bind:value={radius} />
      <label><span>湍动</span><output>{turbulence.toFixed(2)}</output></label>
      <input type="range" min="0" max="1.5" step="0.01" bind:value={turbulence} />
    </fieldset>

    <fieldset>
      <legend>2D 发射器</legend>
      <label><span>粒子数</span><output>{totalParticles}</output></label>
      <input type="range" min="40" max="700" step="10" bind:value={totalParticles} />
      <label><span>发射率</span><output>{emissionRate}</output></label>
      <input type="range" min="20" max="420" step="5" bind:value={emissionRate} />
      <label><span>源宽度方差</span><output>{sourceVarianceX.toFixed(3)}</output></label>
      <input type="range" min="0" max="0.2" step="0.001" bind:value={sourceVarianceX} />
      <label><span>源高度方差</span><output>{sourceVarianceY.toFixed(3)}</output></label>
      <input type="range" min="0" max="0.08" step="0.001" bind:value={sourceVarianceY} />
      <label><span>发射角</span><output>{emitterAngle}°</output></label>
      <input type="range" min="-180" max="180" step="1" bind:value={emitterAngle} />
      <label><span>角度方差</span><output>{emitterAngleVariance}°</output></label>
      <input type="range" min="0" max="90" step="1" bind:value={emitterAngleVariance} />
    </fieldset>

    <fieldset>
      <legend>运动 / 力场</legend>
      <label><span>速度</span><output>{emitterSpeed.toFixed(2)}</output></label>
      <input type="range" min="0.05" max="1.8" step="0.01" bind:value={emitterSpeed} />
      <label><span>速度方差</span><output>{emitterSpeedVariance.toFixed(2)}</output></label>
      <input type="range" min="0" max="0.8" step="0.01" bind:value={emitterSpeedVariance} />
      <label><span>寿命</span><output>{particleLife.toFixed(2)}s</output></label>
      <input type="range" min="0.1" max="2.4" step="0.01" bind:value={particleLife} />
      <label><span>寿命方差</span><output>{particleLifeVariance.toFixed(2)}</output></label>
      <input type="range" min="0" max="1.2" step="0.01" bind:value={particleLifeVariance} />
      <label><span>径向加速度</span><output>{radialAcceleration.toFixed(3)}</output></label>
      <input type="range" min="-0.3" max="0.3" step="0.001" bind:value={radialAcceleration} />
      <label><span>切向加速度</span><output>{tangentialAcceleration.toFixed(3)}</output></label>
      <input type="range" min="-0.35" max="0.35" step="0.001" bind:value={tangentialAcceleration} />
      <label><span>Y 重力</span><output>{gravityY.toFixed(3)}</output></label>
      <input type="range" min="-0.18" max="0.18" step="0.001" bind:value={gravityY} />
    </fieldset>

    <fieldset>
      <legend>粒子外观</legend>
      <label><span>粒子半径</span><output>{particleRadius.toFixed(3)}</output></label>
      <input type="range" min="0.006" max="0.13" step="0.001" bind:value={particleRadius} />
      <label><span>半径方差</span><output>{particleRadiusVariance.toFixed(3)}</output></label>
      <input type="range" min="0" max="0.08" step="0.001" bind:value={particleRadiusVariance} />
      <label><span>初始缩放</span><output>{particleStartScale.toFixed(2)}</output></label>
      <input type="range" min="0.05" max="2.5" step="0.01" bind:value={particleStartScale} />
      <label><span>结束缩放</span><output>{particleEndScale.toFixed(2)}</output></label>
      <input type="range" min="0.01" max="1.2" step="0.01" bind:value={particleEndScale} />
      <label><span>颜色方差</span><output>{colorVariance.toFixed(2)}</output></label>
      <input type="range" min="0" max="0.45" step="0.01" bind:value={colorVariance} />
      <label><span>速度拉伸</span><output>{particleStretch.toFixed(2)}</output></label>
      <input type="range" min="0.4" max="4.5" step="0.01" bind:value={particleStretch} />
      <select bind:value={blendMode}>
        <option value="additive">叠加混合 additive</option>
        <option value="normal">普通混合 normal</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>动画缓存</legend>
      <label><span>帧率</span><output>{frameRate}</output></label>
      <input type="range" min="2" max="24" step="1" bind:value={frameRate} />
      <label><span>预生成帧数</span><output>{frameCount}</output></label>
      <input type="range" min="4" max="32" step="1" bind:value={frameCount} />
    </fieldset>

    <fieldset>
      <legend>方向 / 姿态</legend>
      <div class="grid">
        {#each ["-X", "+X", "-Y", "+Y", "-Z", "+Z"] as item}
          <button class:active={directionPreset === item} onclick={() => directionPreset = item}>{item}</button>
        {/each}
      </div>
      <label><span>Yaw/Heading</span><output>{heading}°</output></label>
      <input type="range" min="-180" max="180" step="1" bind:value={heading} />
      <label><span>Pitch</span><output>{pitch}°</output></label>
      <input type="range" min="-180" max="180" step="1" bind:value={pitch} />
      <label><span>Roll</span><output>{roll}°</output></label>
      <input type="range" min="-180" max="180" step="1" bind:value={roll} />
    </fieldset>

    <fieldset>
      <legend>局部偏移</legend>
      <label><span>Offset X</span><output>{offsetX}m</output></label>
      <input type="range" min="-120" max="120" step="1" bind:value={offsetX} />
      <label><span>Offset Y</span><output>{offsetY}m</output></label>
      <input type="range" min="-80" max="80" step="1" bind:value={offsetY} />
      <label><span>Offset Z</span><output>{offsetZ}m</output></label>
      <input type="range" min="-80" max="80" step="1" bind:value={offsetZ} />
    </fieldset>

    <fieldset>
      <legend>宿主 / 比例尺</legend>
      <label class="inline"><input type="checkbox" bind:checked={orbitPlaying} />宿主运动</label>
      <label class="inline">
        <input
          type="checkbox"
          checked={cameraFollow}
          onchange={(event) => setCameraFollow(event.currentTarget.checked)}
        />镜头跟随
      </label>
      <label class="inline"><input type="checkbox" bind:checked={showAxis} />显示轴</label>
      <label><span>宿主速度</span><output>{hostSpeed.toFixed(1)}x</output></label>
      <input type="range" min="0.1" max="4" step="0.1" bind:value={hostSpeed} />
      <select bind:value={visualScaleMode}>
        <option value="none">世界锚定比例（推荐）</option>
        <option value="match-model">兼容模型视觉比例</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>颜色</legend>
      <label><span>主色</span><input type="color" bind:value={color} /></label>
      <label><span>核心色</span><input type="color" bind:value={coreColor} /></label>
      <label><span>尾色</span><input type="color" bind:value={tailColor} /></label>
    </fieldset>

  </div>
</DemoPanel>

{#if showCodePreview}
  <div class="capsule-code-overlay">
    <div
      class="capsule-code-backdrop"
      role="button"
      tabindex="0"
      aria-label="关闭代码预览"
      onclick={closeCodePreview}
      onkeydown={(event) => (event.key === "Enter" || event.key === " ") && closeCodePreview()}
    ></div>
    <div class="capsule-code-panel" role="dialog" aria-label="胶囊粒子代码预览">
      <div class="capsule-code-head">
        <div>
          <div class="capsule-code-title">胶囊粒子代码预览</div>
          <div class="capsule-code-subtitle">包含宿主、粒子图片函数、CapsuleParticleFeature 完整配置，复制后可复现当前工作台效果。</div>
        </div>
        <button class="capsule-code-close" onclick={closeCodePreview}>关闭</button>
      </div>
      <textarea class="capsule-code-text" readonly>{codePreviewText}</textarea>
      <div class="capsule-code-foot">
        <button class="capsule-code-copy" onclick={copyCode}>{copyStatus}</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .capsule-panel {
    display: grid;
    gap: 12px;
    max-height: min(840px, calc(100vh - 116px));
    padding: 12px;
    overflow-y: auto;
    color: var(--panel-text);
    background: var(--ds-overlay-bg);
    font-size: 12px;
  }
  .capsule-panel::-webkit-scrollbar {
    width: 8px;
  }
  .capsule-panel::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: var(--panel-btn-bg);
  }
  .hero {
    padding: 14px;
    border: 1px solid var(--panel-border);
    border-radius: 14px;
    background:
      radial-gradient(circle at 12% 0%, var(--ds-overlay-accent-warm-muted), transparent 40%),
      var(--panel-bg-card);
    box-shadow:
      inset 0 0 32px var(--ds-overlay-accent-warm-soft),
      0 14px 28px rgba(0, 0, 0, 0.12);
  }
  .eyebrow {
    color: var(--panel-accent);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .title {
    margin-top: 4px;
    font-size: 15px;
    font-weight: 700;
    color: var(--panel-text-bright);
  }
  .desc {
    margin-top: 5px;
    color: var(--panel-text-muted);
    line-height: 1.45;
  }
  fieldset {
    border: 1px solid var(--panel-border);
    border-radius: 12px;
    padding: 11px;
    background: var(--panel-bg-card);
    box-shadow: inset 0 1px 0 var(--panel-bg-embed);
  }
  legend {
    padding: 0 6px;
    color: var(--panel-accent);
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 6px;
  }
  label.inline {
    justify-content: flex-start;
    color: var(--panel-text-muted);
  }
  .field-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 6px;
    color: var(--panel-text-muted);
  }
  .checks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px 8px;
    margin-top: 6px;
  }
  output {
    color: var(--ds-overlay-accent-warm);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-weight: 700;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--ds-overlay-accent-warm);
  }
  input[type="color"] {
    width: 44px;
    height: 26px;
    border: 0;
    background: transparent;
  }
  select {
    width: 100%;
    margin-top: 8px;
    padding: 8px 9px;
    border: 1px solid var(--panel-border);
    border-radius: 8px;
    background: var(--panel-bg-embed);
    color: var(--panel-text);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
  button {
    border: 1px solid var(--panel-border);
    border-radius: 8px;
    padding: 7px 8px;
    background: var(--panel-btn-bg);
    color: var(--panel-btn-text);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
  }
  button:hover {
    border-color: var(--ds-overlay-accent-warm-border);
    background: var(--ds-overlay-accent-warm-muted);
    color: var(--panel-text-bright);
  }
  button.active {
    border-color: var(--ds-overlay-accent-warm-border);
    background: var(--ds-overlay-accent-warm-hover);
    color: var(--ds-overlay-accent-warm);
  }
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .code {
    width: 100%;
    border-color: var(--panel-border);
    background: linear-gradient(135deg, var(--panel-bg-embed), var(--ds-overlay-accent-warm-muted));
    color: var(--panel-text-bright);
    font-weight: 700;
  }
  .reset {
    width: 100%;
    border-color: var(--ds-overlay-accent-warm-border);
    background: var(--ds-overlay-accent-warm-muted);
    color: var(--ds-overlay-accent-warm);
    font-weight: 700;
  }

  .capsule-code-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    pointer-events: all;
  }
  .capsule-code-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(2, 8, 12, 0.54);
    backdrop-filter: blur(5px);
  }
  .capsule-code-panel {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 10px;
    width: min(980px, calc(100vw - 32px));
    height: min(82vh, 860px);
    padding: 14px;
    color: var(--panel-text);
    border: 1px solid var(--panel-border);
    border-radius: 14px;
    background:
      radial-gradient(circle at 12% 0%, var(--ds-overlay-accent-warm-muted), transparent 38%),
      var(--ds-overlay-bg);
    box-shadow: 0 28px 82px rgba(0, 0, 0, 0.42);
  }
  .capsule-code-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
  }
  .capsule-code-title {
    color: var(--panel-text-bright);
    font-size: 16px;
    font-weight: 800;
  }
  .capsule-code-subtitle {
    margin-top: 4px;
    color: var(--panel-text-muted);
    font-size: 12px;
    line-height: 1.45;
  }
  .capsule-code-close,
  .capsule-code-copy {
    min-height: 32px;
    padding: 0 12px;
    border: 1px solid var(--panel-border);
    border-radius: 8px;
    background: var(--panel-btn-bg);
    color: var(--panel-text-bright);
    cursor: pointer;
  }
  .capsule-code-close:hover,
  .capsule-code-copy:hover {
    border-color: var(--ds-overlay-accent-warm-border);
    background: var(--ds-overlay-accent-warm-muted);
  }
  .capsule-code-text {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 14px;
    resize: none;
    overflow: auto;
    outline: none;
    white-space: pre;
    color: var(--panel-text);
    border: 1px solid var(--panel-border);
    border-radius: 10px;
    background: var(--panel-bg-embed);
    font: 12px/1.56 "Cascadia Mono", "Consolas", monospace;
  }
  .capsule-code-foot {
    display: flex;
    justify-content: flex-end;
  }
</style>
