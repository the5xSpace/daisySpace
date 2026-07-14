<script>
// =============================================================================
// ParticleSystemWorkbench Demo — 粒子系统工作台
//
// 本示例演示如何使用 ParticleFeature 创建和配置粒子系统：
// 1. 创建粒子发射器（多种形状：圆盘、盒体、锥体、球体等）
// 2. 配置粒子参数（发射率、速度、生命周期、质量等）
// 3. 粒子笔刷（火焰、烟雾、星芒等）
// 4. 粒子变换（平移、旋转、缩放）
// 5. 重力效果
//
// 关键 API：
// - Daisy.ParticleFeature: 粒子组件
//   - image: 粒子图片（支持 canvas 生成）
//   - emitter: 发射器（Daisy.createParticleEmitter）
//   - emissionRate: 发射率（个/秒）
//   - minimumSpeed/maximumSpeed: 最小/最大速度
//   - particleLife: 粒子生命周期
//   - mass: 质量
//   - gravity: 重力配置
//   - startScale/endScale: 出生/消亡缩放
//   - startColor/endColor: 出生/消亡颜色
//   - loop: 是否循环
//   - followEntity: 是否跟随实体
// - Daisy.createParticleEmitter: 创建发射器
//   - type: 发射器类型（circle/box/cone/sphere等）
//   - direction: 发射方向
//   - emitFrom: 发射位置（volume/shell/edge）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const C2 = Daisy.Cartesian2;
const Color = Daisy.Color;
const MathCesium = Daisy.Math;

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

const hostEntity = engine.createEntity("ParticleFeature-Host");
const orbitCenterLon = 116.4;
const orbitCenterLat = 39.9;
const orbitAltitude = 20;
let orbitPlaying = $state(true);
let orbitLon = orbitCenterLon - 0.004;
const orbitLat = orbitCenterLat;
const orbitStartLon = orbitLon;
const orbitEndLon = orbitCenterLon + 0.012;
const hostSpeedMetersPerSecond = 8;
const metersPerDegreeLon = 111320 * Math.cos(MathCesium.toRadians(orbitLat));
const particleDefaultDirection = new C3(0.0, 0.0, 1.0);
const speedBoost = 1.1;
let lastOrbitUpdateTime;

function hostPosition(lonDeg) {
    return C3.fromDegrees(
        lonDeg,
        orbitLat,
        orbitAltitude + Math.sin((lonDeg - orbitStartLon) * 80) * 1.5,
    );
}

hostEntity.position = hostPosition(orbitLon);
hostEntity.addFeature(new Daisy.CubeFeature({
    bottomX: 3, bottomY: 3, topX: 3, topY: 3, height: 3,
    color: Color.fromRgba(0x69d7ff66),
    outline: true, outlineColor: Color.fromRgba(0xbfe9ffff), outlineWidth: 1, show: true,
}));

// ── 粒子图片生成 ──
function makeParticleImage(kind, tint) {
    const canvas = document.createElement("canvas");
    canvas.width = 96; canvas.height = 96;
    const ctx2d = canvas.getContext("2d");
    const cx = 48, cy = 48;
    ctx2d.clearRect(0, 0, 96, 96);
    if (kind === "square") { ctx2d.fillStyle = tint; ctx2d.fillRect(20, 20, 56, 56); return canvas; }
    const gradient = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, 44);
    if (kind === "flame") {
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.22, "rgba(255,226,120,0.96)");
        gradient.addColorStop(0.52, tint);
        gradient.addColorStop(1, "rgba(255,80,20,0)");
    } else if (kind === "smoke") {
        gradient.addColorStop(0, "rgba(255,255,255,0.72)");
        gradient.addColorStop(0.35, tint);
        gradient.addColorStop(1, "rgba(120,140,155,0)");
    } else if (kind === "star") {
        ctx2d.save(); ctx2d.translate(cx, cy);
        ctx2d.fillStyle = tint; ctx2d.beginPath();
        for (let i = 0; i < 10; i += 1) {
            const r = i % 2 === 0 ? 42 : 13;
            const a = -Math.PI / 2 + i * Math.PI / 5;
            ctx2d.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx2d.closePath(); ctx2d.fill(); ctx2d.restore();
        return canvas;
    } else {
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.34, tint);
        gradient.addColorStop(1, "rgba(40,190,255,0)");
    }
    ctx2d.fillStyle = gradient;
    ctx2d.fillRect(0, 0, 96, 96);
    return canvas;
}

const imageKinds = {
    spark: () => makeParticleImage("spark", "rgba(90,220,255,0.95)"),
    flame: () => makeParticleImage("flame", "rgba(255,130,40,0.9)"),
    smoke: () => makeParticleImage("smoke", "rgba(160,185,200,0.52)"),
    star: () => makeParticleImage("star", "rgba(255,245,160,0.88)"),
    square: () => makeParticleImage("square", "rgba(80,235,180,0.72)"),
};
const imageCache = new Map();
function getParticleImage(kind) {
    if (!imageCache.has(kind)) imageCache.set(kind, imageKinds[kind]().toDataURL("image/png"));
    return imageCache.get(kind);
}

const emitterTypes = ["circle", "box", "cone", "diamond", "wave", "vibration", "orbit", "sphere", "point", "line", "rectangle", "ring", "cylinder", "hemisphere", "torus", "spiral", "crown"];
const emitterLabels = { circle: "圆盘", box: "盒体", cone: "锥体", diamond: "菱形", wave: "波浪", vibration: "振动", orbit: "环绕", sphere: "球体", point: "点源", line: "线段", rectangle: "矩形", ring: "圆环", cylinder: "圆柱", hemisphere: "半球", torus: "环面", spiral: "螺旋", crown: "冠状" };
const imageLabels = { spark: "电光", flame: "火焰", smoke: "烟雾", star: "星芒", square: "方片" };
const emitFromLabels = { volume: "体内随机", shell: "外壳表面", edge: "边缘" };
const axisLabels = { x: "X 轴", y: "Y 轴", z: "Z 轴" };
const THUMB_SIZE = 42;
const attitudeQuickPresets = [
    { label: "+Z", hdg: 0, ptc: 0, rol: 0 },
    { label: "-Z", hdg: 0, ptc: 180, rol: 0 },
    { label: "+X", hdg: 0, ptc: -90, rol: 0 },
    { label: "-X", hdg: 0, ptc: 90, rol: 0 },
    { label: "+Y", hdg: 0, ptc: 0, rol: -90 },
    { label: "-Y", hdg: 0, ptc: 0, rol: 90 },
];

// ── 响应式状态 ──
let emitterType = $state("cone");
let emitFrom = $state("volume");
let image = $state("flame");
let startColor = $state("#ff7a2f");
let endColor = $state("#68c9ff");
let emissionRate = $state(151);
let minSpeed = $state(63);
let maxSpeed = $state(22);
let particleLife = $state(1.55);
let mass = $state(1);
let gravityEnabled = $state(false);
let gravityAcceleration = $state(9.80665);
let startScale = $state(0.1);
let endScale = $state(2.25);
let imageSize = $state(15);
let sizeInMeters = $state(true);
let loop = $state(true);
let followEntity = $state(true);
let showAttitudeSphere = $state(true);
let emitterHdg = $state(0);
let emitterPtc = $state(90);
let emitterRol = $state(0);
let radius = $state(4);
let innerRadius = $state(4);
let outerRadius = $state(22);
let width = $state(36);
let height = $state(28);
let depth = $state(24);
let angleDeg = $state(10);
let arcDeg = $state(360);
let radiusThickness = $state(1);
let turns = $state(2.4);
let amplitude = $state(12);
let frequency = $state(2);
let phaseStepDeg = $state(18);
let planarRotationDeg = $state(0);
let orbitClockwise = $state(false);
let rectangleRotXDeg = $state(0);
let rectangleRotYDeg = $state(0);
let axis = $state("x");
let tx = $state(0);
let ty = $state(0);
let tz = $state(0);
let heading = $state(0);
let pitch = $state(0);
let roll = $state(0);
let sx = $state(1);
let sy = $state(1);
let sz = $state(1);

let showCodePreview = $state(false);
let particleCount = $state(0);

function cssColor(value, alpha) {
    const color = Color.fromCssColorString(value);
    return new Color(color.red, color.green, color.blue, alpha);
}

function buildEmitterConfig() {
    const arc = MathCesium.toRadians(arcDeg);
    const direction = particleDefaultDirection;
    switch (emitterType) {
        case "circle": return { type: "circle", radius, arc, radiusThickness, emitFrom, direction };
        case "box": return { type: "box", dimensions: new C3(width, height, depth), emitFrom, direction };
        case "cone": return { type: "cone", angle: MathCesium.toRadians(angleDeg), radius, arc, radiusThickness, emitFrom, direction };
        case "diamond": return { type: "diamond", width, height, rotation: MathCesium.toRadians(planarRotationDeg), emitFrom, direction };
        case "wave": return { type: "wave", length: width, amplitude, width: depth, frequency, phaseStep: MathCesium.toRadians(phaseStepDeg), direction };
        case "vibration": return { type: "vibration", amplitude, radius, axis, phaseStep: MathCesium.toRadians(phaseStepDeg), direction };
        case "orbit": return { type: "orbit", radius, height, phaseStep: MathCesium.toRadians(phaseStepDeg), clockwise: orbitClockwise, direction };
        case "sphere": return { type: "sphere", radius, arc, radiusThickness, emitFrom };
        case "point": return { type: "point", direction };
        case "line": return { type: "line", length: width, axis, direction };
        case "rectangle": return { type: "rectangle", width, height, rotation: new C3(MathCesium.toRadians(rectangleRotXDeg), MathCesium.toRadians(rectangleRotYDeg), 0), direction };
        case "ring": return { type: "ring", innerRadius, outerRadius, direction };
        case "cylinder": return { type: "cylinder", radius, height };
        case "hemisphere": return { type: "hemisphere", radius, direction };
        case "torus": return { type: "torus", majorRadius: radius, tubeRadius: Math.max(1000, innerRadius) };
        case "spiral": return { type: "spiral", radius, height, turns };
        case "crown": return { type: "crown", radius, height: height * 0.18 };
        default: return { type: "circle", radius };
    }
}

const particleFeature = new Daisy.ParticleFeature({
    image: getParticleImage(image),
    emitter: Daisy.createParticleEmitter(buildEmitterConfig()),
    emitterDirection: { heading: emitterHdg, pitch: emitterPtc, roll: emitterRol },
    emissionRate,
    minimumSpeed: Math.min(minSpeed, maxSpeed) * speedBoost,
    maximumSpeed: Math.max(minSpeed, maxSpeed) * speedBoost,
    particleLife,
    mass,
    gravity: gravityEnabled ? { acceleration: gravityAcceleration } : false,
    startScale,
    endScale,
    startColor: cssColor(startColor, 0.95),
    endColor: cssColor(endColor, 0.05),
    imageSize: new C2(imageSize, imageSize),
    sizeInMeters,
    loop,
    followEntity,
});
hostEntity.addFeature(particleFeature);
hostEntity.setBodyAxis({
    length: 16, axisWidth: 1, showSphere: showAttitudeSphere,
    showLabels: true, showWireframe: false, labelPrefix: "+",
    distanceDisplayCondition: engine.viewDistanceStrategy.getViewDistance().MEDIUM,
});

function applyTransform() {
    particleFeature.transformer.setTranslation(new C3(tx, ty, tz));
    particleFeature.transformer.setRotation({ heading, pitch, roll });
    particleFeature.transformer.setScale(new C3(sx, sy, sz));
}

function applyParticleOptions({ rebuildEmitter = false, clear = false } = {}) {
    const speedMin = Math.min(minSpeed, maxSpeed) * speedBoost;
    const speedMax = Math.max(minSpeed, maxSpeed) * speedBoost;
    particleFeature.options = Object.assign({}, particleFeature.options, {
        image: getParticleImage(image),
        emitterDirection: { heading: emitterHdg, pitch: emitterPtc, roll: emitterRol },
        emissionRate,
        minimumSpeed: speedMin,
        maximumSpeed: speedMax,
        particleLife,
        mass,
        gravity: gravityEnabled ? { acceleration: gravityAcceleration } : false,
        startScale,
        endScale,
        startColor: cssColor(startColor, 0.95),
        endColor: cssColor(endColor, 0.05),
        imageSize: new C2(imageSize, imageSize),
        sizeInMeters,
        loop,
        followEntity,
    });
    if (rebuildEmitter) {
        particleFeature.setEmitter(Daisy.createParticleEmitter(buildEmitterConfig()));
    }
    if (clear) {
        particleFeature.clearParticles();
    }
    applyTransform();
}

// ── $effect: 同步粒子系统参数 ──
// 简单参数变更（不需要 rebuild emitter）
let prevSimple = { image, emitterHdg, emitterPtc, emitterRol, emissionRate, minSpeed, maxSpeed, particleLife, mass, gravityEnabled, gravityAcceleration, startScale, endScale, startColor, endColor, imageSize, sizeInMeters, loop, followEntity };
let prevTransform = { tx, ty, tz, heading, pitch, roll, sx, sy, sz };

$effect(() => {
    const simple = { image, emitterHdg, emitterPtc, emitterRol, emissionRate, minSpeed, maxSpeed, particleLife, mass, gravityEnabled, gravityAcceleration, startScale, endScale, startColor, endColor, imageSize, sizeInMeters, loop, followEntity };
    const transform = { tx, ty, tz, heading, pitch, roll, sx, sy, sz };
    applyParticleOptions();
    prevSimple = simple;
    prevTransform = transform;
});

// ── 发射器几何变更需要 rebuild ──
let prevEmitter = { emitterType, emitFrom, radius, innerRadius, outerRadius, width, height, depth, angleDeg, arcDeg, radiusThickness, turns, amplitude, frequency, phaseStepDeg, planarRotationDeg, orbitClockwise, rectangleRotXDeg, rectangleRotYDeg, axis };

$effect(() => {
    const cur = { emitterType, emitFrom, radius, innerRadius, outerRadius, width, height, depth, angleDeg, arcDeg, radiusThickness, turns, amplitude, frequency, phaseStepDeg, planarRotationDeg, orbitClockwise, rectangleRotXDeg, rectangleRotYDeg, axis };
    applyParticleOptions({ rebuildEmitter: true, clear: true });
    prevEmitter = cur;
});

function onEmitterTypeChange(e) {
    emitterType = e.target.value;
    __log(`发射器：${emitterLabels[emitterType] || emitterType}`);
}

function resetTransform() {
    tx = 0; ty = 0; tz = 0; heading = 0; pitch = 0; roll = 0; sx = 1; sy = 1; sz = 1;
    applyParticleOptions();
}

// ── 代码预览生成 ──
function formatCodeNumber(value) {
    return Number.isInteger(value) ? `${value}` : `${Number(value).toFixed(6)}`.replace(/\.?0+$/, "");
}
function formatCodeBoolean(value) { return value ? "true" : "false"; }
function formatCodeString(value) { return JSON.stringify(value); }
function formatCodeVector3(x, y, z) { return `new C3(${formatCodeNumber(x)}, ${formatCodeNumber(y)}, ${formatCodeNumber(z)})`; }
function formatCodeVector2(x, y) { return `new C2(${formatCodeNumber(x)}, ${formatCodeNumber(y)})`; }
function formatCodeColor(cssValue, alpha) { return `cssColor(${formatCodeString(cssValue)}, ${formatCodeNumber(alpha)})`; }

function buildEmitterCode() {
    const direction = "new C3(0.0, 0.0, 1.0)";
    const arc = `MathCesium.toRadians(${formatCodeNumber(arcDeg)})`;
    switch (emitterType) {
        case "circle": return `Daisy.createParticleEmitter({ type: "circle", radius: ${formatCodeNumber(radius)}, arc: ${arc}, radiusThickness: ${formatCodeNumber(radiusThickness)}, emitFrom: ${formatCodeString(emitFrom)}, direction: ${direction} })`;
        case "box": return `Daisy.createParticleEmitter({ type: "box", dimensions: ${formatCodeVector3(width, height, depth)}, emitFrom: ${formatCodeString(emitFrom)}, direction: ${direction} })`;
        case "cone": return `Daisy.createParticleEmitter({ type: "cone", angle: MathCesium.toRadians(${formatCodeNumber(angleDeg)}), radius: ${formatCodeNumber(radius)}, arc: ${arc}, radiusThickness: ${formatCodeNumber(radiusThickness)}, emitFrom: ${formatCodeString(emitFrom)}, direction: ${direction} })`;
        case "diamond": return `Daisy.createParticleEmitter({ type: "diamond", width: ${formatCodeNumber(width)}, height: ${formatCodeNumber(height)}, rotation: MathCesium.toRadians(${formatCodeNumber(planarRotationDeg)}), emitFrom: ${formatCodeString(emitFrom)}, direction: ${direction} })`;
        case "wave": return `Daisy.createParticleEmitter({ type: "wave", length: ${formatCodeNumber(width)}, amplitude: ${formatCodeNumber(amplitude)}, width: ${formatCodeNumber(depth)}, frequency: ${formatCodeNumber(frequency)}, phaseStep: MathCesium.toRadians(${formatCodeNumber(phaseStepDeg)}), direction: ${direction} })`;
        case "vibration": return `Daisy.createParticleEmitter({ type: "vibration", amplitude: ${formatCodeNumber(amplitude)}, radius: ${formatCodeNumber(radius)}, axis: ${formatCodeString(axis)}, phaseStep: MathCesium.toRadians(${formatCodeNumber(phaseStepDeg)}), direction: ${direction} })`;
        case "orbit": return `Daisy.createParticleEmitter({ type: "orbit", radius: ${formatCodeNumber(radius)}, height: ${formatCodeNumber(height)}, phaseStep: MathCesium.toRadians(${formatCodeNumber(phaseStepDeg)}), clockwise: ${formatCodeBoolean(orbitClockwise)}, direction: ${direction} })`;
        case "sphere": return `Daisy.createParticleEmitter({ type: "sphere", radius: ${formatCodeNumber(radius)}, arc: ${arc}, radiusThickness: ${formatCodeNumber(radiusThickness)}, emitFrom: ${formatCodeString(emitFrom)} })`;
        case "point": return `Daisy.createParticleEmitter({ type: "point", direction: ${direction} })`;
        case "line": return `Daisy.createParticleEmitter({ type: "line", length: ${formatCodeNumber(width)}, axis: ${formatCodeString(axis)}, direction: ${direction} })`;
        case "rectangle": return `Daisy.createParticleEmitter({ type: "rectangle", width: ${formatCodeNumber(width)}, height: ${formatCodeNumber(height)}, rotation: ${formatCodeVector3(MathCesium.toRadians(rectangleRotXDeg), MathCesium.toRadians(rectangleRotYDeg), 0)}, direction: ${direction} })`;
        case "ring": return `Daisy.createParticleEmitter({ type: "ring", innerRadius: ${formatCodeNumber(innerRadius)}, outerRadius: ${formatCodeNumber(outerRadius)}, direction: ${direction} })`;
        case "cylinder": return `Daisy.createParticleEmitter({ type: "cylinder", radius: ${formatCodeNumber(radius)}, height: ${formatCodeNumber(height)} })`;
        case "hemisphere": return `Daisy.createParticleEmitter({ type: "hemisphere", radius: ${formatCodeNumber(radius)}, direction: ${direction} })`;
        case "torus": return `Daisy.createParticleEmitter({ type: "torus", majorRadius: ${formatCodeNumber(radius)}, tubeRadius: ${formatCodeNumber(Math.max(1000, innerRadius))} })`;
        case "spiral": return `Daisy.createParticleEmitter({ type: "spiral", radius: ${formatCodeNumber(radius)}, height: ${formatCodeNumber(height)}, turns: ${formatCodeNumber(turns)} })`;
        case "crown": return `Daisy.createParticleEmitter({ type: "crown", radius: ${formatCodeNumber(radius)}, height: ${formatCodeNumber(height * 0.18)} })`;
        default: return `Daisy.createParticleEmitter({ type: "circle", radius: ${formatCodeNumber(radius)} })`;
    }
}

function buildParticleFeatureCode() {
    const speedMin = Math.min(minSpeed, maxSpeed) * speedBoost;
    const speedMax = Math.max(minSpeed, maxSpeed) * speedBoost;
    const imageTint = {
        spark: "rgba(90,220,255,0.95)", flame: "rgba(255,130,40,0.9)",
        smoke: "rgba(160,185,200,0.52)", star: "rgba(255,245,160,0.88)", square: "rgba(80,235,180,0.72)",
    }[image] || "rgba(255,255,255,1)";

    const preamble = [
        `function makeParticleImage(kind, tint) {`, `    /* ... canvas image generation ... */`, `}`, "",
        `function cssColor(value, alpha) {`, `    const color = Color.fromCssColorString(value);`, `    return new Color(color.red, color.green, color.blue, alpha);`, `}`, "",
        `const particleImage = makeParticleImage(${formatCodeString(image)}, ${formatCodeString(imageTint)}).toDataURL("image/png");`, "",
    ];

    return [
        `const C3 = Daisy.Cartesian3;`, `const C2 = Daisy.Cartesian2;`, `const MathCesium = Daisy.Math;`, `const Color = Daisy.Color;`, "",
        ...preamble,
        `hostEntity.addFeature(new Daisy.ParticleFeature({`,
        `    image: particleImage,`,
        `    emitter: ${buildEmitterCode()},`,
        `    emitterDirection: { heading: ${formatCodeNumber(emitterHdg)}, pitch: ${formatCodeNumber(emitterPtc)}, roll: ${formatCodeNumber(emitterRol)} },`,
        `    emissionRate: ${formatCodeNumber(emissionRate)},`,
        `    minimumSpeed: ${formatCodeNumber(speedMin)},`,
        `    maximumSpeed: ${formatCodeNumber(speedMax)},`,
        `    particleLife: ${formatCodeNumber(particleLife)},`,
        `    mass: ${formatCodeNumber(mass)},`,
        `    gravity: ${gravityEnabled ? `{ acceleration: ${formatCodeNumber(gravityAcceleration)} }` : "false"},`,
        `    startScale: ${formatCodeNumber(startScale)},`,
        `    endScale: ${formatCodeNumber(endScale)},`,
        `    startColor: cssColor(${formatCodeString(startColor)}, 0.95),`,
        `    endColor: cssColor(${formatCodeString(endColor)}, 0.05),`,
        `    imageSize: ${formatCodeVector2(imageSize, imageSize)},`,
        `    sizeInMeters: ${formatCodeBoolean(sizeInMeters)},`,
        `    loop: ${formatCodeBoolean(loop)},`,
        `    followEntity: ${formatCodeBoolean(followEntity)},`,
        `}));`,
    ].join("\n");
}

let codePreviewText = $state("");
function openCodePreview() { codePreviewText = buildParticleFeatureCode(); showCodePreview = true; }
function closeCodePreview() { showCodePreview = false; }
async function copyCode() {
    try {
        await navigator.clipboard.writeText(codePreviewText);
    } catch {
        /* fallback */
    }
}

// ── 宿主运动 ──
const removePreRender = engine.onPreRender((time) => {
    if (!orbitPlaying) return;
    const deltaSeconds = lastOrbitUpdateTime
        ? MathCesium.clamp(Daisy.JulianDate.secondsDifference(time, lastOrbitUpdateTime), 0, 0.1)
        : 0;
    lastOrbitUpdateTime = Daisy.JulianDate.clone(time, lastOrbitUpdateTime || new Daisy.JulianDate());
    if (deltaSeconds <= 0) return;
    orbitLon += (hostSpeedMetersPerSecond * deltaSeconds) / metersPerDegreeLon;
    if (orbitLon > orbitEndLon) orbitLon = orbitStartLon;
    hostEntity.position = hostPosition(orbitLon);
});

// ── 粒子计数 ──
let lastParticleStatMs = 0;
const removePostRender = engine.onPostRender(() => {
    const nowMs = performance.now();
    if (nowMs - lastParticleStatMs < 250) return;
    lastParticleStatMs = nowMs;
    const system = particleFeature.cesiumParticleSystem;
    particleCount = system && system._particles ? system._particles.length : 0;
});

function followCamera() {
    engine.camera.followTarget(hostEntity, { view: { distance: 280, pitchDeg: -28, headingDeg: 35 } });
    engine.camera.setFrustumNear(0.1);
}
followCamera();
setTimeout(followCamera, 250);

registerCleanup(() => {
    removePreRender();
    removePostRender();
});

__log("粒子系统工作台已创建：粒子附着在移动方块宿主上。");
__log("切换发射器标签并拖动滑块，可实时调整几何、系统、笔刷和 Feature 变换。");
__log("已显式启动 Engine 时钟，否则 Cesium ParticleSystem 的 dt 为 0 时粒子不会流动。");
__log("小姿态球使用 Entity 自带的 BodyAxis：蓝色 Z 轴对应默认 +Z 喷射方向。");
__log("循环发射表示粒子系统在生命周期结束后会重新开始发射；关闭后到寿命结束就停在那一轮。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="粒子系统" padding="0" width="450px">
    <div class="pw-panel">
        <div class="pw-head">
            <div class="pw-title">粒子系统工作台</div>
            <div class="pw-head-actions">
                <button class="pw-code-btn" onclick={openCodePreview}>查看代码</button>
                <div class="pw-status"><span>{emitterLabels[emitterType] || emitterType}</span> · <span>{particleCount} 个</span></div>
            </div>
        </div>

        <!-- 发射形状 -->
        <div class="pw-section">
            <div class="pw-shape-select">
                <label for="pw-emitter-type">发射形状</label>
                <select id="pw-emitter-type" value={emitterType} onchange={onEmitterTypeChange}>
                    {#each emitterTypes as t}
                        <option value={t}>{emitterLabels[t] || t}</option>
                    {/each}
                </select>
            </div>
        </div>

        <!-- 发射器几何 -->
        <div class="pw-section">
            <div class="section-title">发射器几何</div>
            <div class="control-grid">
                {#if ["circle", "cone", "sphere", "hemisphere", "cylinder", "torus", "spiral", "crown", "vibration", "orbit"].includes(emitterType)}
                    <div class="control"><label><span>半径(m)</span><output>{radius}</output></label><input type="range" min="1" max="120" step="1" bind:value={radius} /></div>
                {/if}
                {#if ["ring", "torus"].includes(emitterType)}
                    <div class="control"><label><span>内半径/管半径(m)</span><output>{innerRadius}</output></label><input type="range" min="1" max="80" step="1" bind:value={innerRadius} /></div>
                {/if}
                {#if emitterType === "ring"}
                    <div class="control"><label><span>外半径(m)</span><output>{outerRadius}</output></label><input type="range" min="2" max="160" step="1" bind:value={outerRadius} /></div>
                {/if}
                {#if ["box", "line", "rectangle", "diamond", "wave"].includes(emitterType)}
                    <div class="control"><label><span>宽度/长度(m)</span><output>{width}</output></label><input type="range" min="1" max="180" step="1" bind:value={width} /></div>
                {/if}
                {#if ["box", "rectangle", "diamond", "cylinder", "spiral", "crown", "orbit"].includes(emitterType)}
                    <div class="control"><label><span>高度(m)</span><output>{height}</output></label><input type="range" min="1" max="160" step="1" bind:value={height} /></div>
                {/if}
                {#if emitterType === "box"}
                    <div class="control"><label><span>深度(m)</span><output>{depth}</output></label><input type="range" min="1" max="160" step="1" bind:value={depth} /></div>
                {/if}
                {#if emitterType === "wave"}
                    <div class="control"><label><span>波面宽度(m)</span><output>{depth}</output></label><input type="range" min="0" max="160" step="1" bind:value={depth} /></div>
                {/if}
                {#if emitterType === "cone"}
                    <div class="control"><label><span>锥角(°)</span><output>{angleDeg}</output></label><input type="range" min="1" max="85" step="1" bind:value={angleDeg} /></div>
                {/if}
                {#if ["circle", "cone", "sphere"].includes(emitterType)}
                    <div class="control"><label><span>弧段(°)</span><output>{arcDeg}</output></label><input type="range" min="5" max="360" step="1" bind:value={arcDeg} /></div>
                    <div class="control"><label><span>半径厚度</span><output>{radiusThickness}</output></label><input type="range" min="0" max="1" step="0.01" bind:value={radiusThickness} /></div>
                {/if}
                {#if ["circle", "cone", "sphere", "box", "diamond"].includes(emitterType)}
                    <div class="control">
                        <label for="pw-emitFrom"><span>发射位置</span></label>
                        <select id="pw-emitFrom" bind:value={emitFrom}>
                            <option value="volume">体内随机</option>
                            <option value="shell">外壳表面</option>
                            <option value="edge">边缘</option>
                        </select>
                    </div>
                {/if}
                {#if ["wave", "vibration"].includes(emitterType)}
                    <div class="control"><label><span>振幅(m)</span><output>{amplitude}</output></label><input type="range" min="0" max="80" step="1" bind:value={amplitude} /></div>
                {/if}
                {#if emitterType === "wave"}
                    <div class="control"><label><span>波频</span><output>{frequency}</output></label><input type="range" min="0.25" max="8" step="0.05" bind:value={frequency} /></div>
                {/if}
                {#if ["wave", "vibration", "orbit"].includes(emitterType)}
                    <div class="control"><label><span>相位步进(°)</span><output>{phaseStepDeg}</output></label><input type="range" min="-180" max="180" step="1" bind:value={phaseStepDeg} /></div>
                {/if}
                {#if emitterType === "diamond"}
                    <div class="control"><label><span>平面旋转(°)</span><output>{planarRotationDeg}</output></label><input type="range" min="-180" max="180" step="1" bind:value={planarRotationDeg} /></div>
                {/if}
                {#if emitterType === "spiral"}
                    <div class="control"><label><span>螺旋圈数</span><output>{turns}</output></label><input type="range" min="0.25" max="8" step="0.05" bind:value={turns} /></div>
                {/if}
                {#if emitterType === "rectangle"}
                    <div class="control"><label><span>矩形X旋转(°)</span><output>{rectangleRotXDeg}</output></label><input type="range" min="-90" max="90" step="1" bind:value={rectangleRotXDeg} /></div>
                    <div class="control"><label><span>矩形Y旋转(°)</span><output>{rectangleRotYDeg}</output></label><input type="range" min="-90" max="90" step="1" bind:value={rectangleRotYDeg} /></div>
                {/if}
                {#if ["line", "vibration"].includes(emitterType)}
                    <div class="control">
                        <label for="pw-axis"><span>轴向</span></label>
                        <select id="pw-axis" bind:value={axis}>
                            <option value="x">X 轴</option>
                            <option value="y">Y 轴</option>
                            <option value="z">Z 轴</option>
                        </select>
                    </div>
                {/if}
            </div>
            {#if emitterType === "orbit"}
                <div class="switch-row">
                    <label><input type="checkbox" bind:checked={orbitClockwise} /> 顺时针环绕</label>
                </div>
            {/if}
        </div>

        <!-- 粒子系统 -->
        <div class="pw-section">
            <div class="section-title">粒子系统</div>
            <div class="subsection-title">发射方向</div>
            <div class="attitude-quicks">
                <span class="quick-label">快捷：</span>
                {#each attitudeQuickPresets as p}
                    <button
                        class="quick-preset"
                        class:active={emitterHdg === p.hdg && emitterPtc === p.ptc && emitterRol === p.rol}
                        onclick={() => { emitterHdg = p.hdg; emitterPtc = p.ptc; emitterRol = p.rol; }}
                        title={p.label}
                    >{p.label}</button>
                {/each}
            </div>
            <div class="control-grid three" style="margin-top: 4px;">
                <div class="control"><label><span>heading(°)</span><output>{emitterHdg}</output></label><input type="range" min="-180" max="180" step="1" bind:value={emitterHdg} /></div>
                <div class="control"><label><span>pitch(°)</span><output>{emitterPtc}</output></label><input type="range" min="-180" max="180" step="1" bind:value={emitterPtc} /></div>
                <div class="control"><label><span>roll(°)</span><output>{emitterRol}</output></label><input type="range" min="-180" max="180" step="1" bind:value={emitterRol} /></div>
            </div>
            <div class="control-grid" style="margin-top: 10px;">
                <div class="control"><label><span>发射率(个/秒)</span><output>{emissionRate}</output></label><input type="range" min="0" max="500" step="1" bind:value={emissionRate} /></div>
                <div class="control"><label><span>最小速度(m/s)</span><output>{minSpeed}</output></label><input type="range" min="-120" max="120" step="1" bind:value={minSpeed} /></div>
                <div class="control"><label><span>最大速度(m/s)</span><output>{maxSpeed}</output></label><input type="range" min="-120" max="120" step="1" bind:value={maxSpeed} /></div>
                <div class="control"><label><span>生命周期(s)</span><output>{particleLife}</output></label><input type="range" min="0.05" max="8" step="0.05" bind:value={particleLife} /></div>
                <div class="control"><label><span>质量(kg)</span><output>{mass}</output></label><input type="range" min="0.1" max="10" step="0.1" bind:value={mass} /></div>
                <div class="control"><label><span>重力加速度(m/s²)</span><output>{gravityAcceleration}</output></label><input type="range" min="0" max="30" step="0.05" bind:value={gravityAcceleration} disabled={!gravityEnabled} /></div>
            </div>
            <div class="switch-row">
                <label><input type="checkbox" bind:checked={loop} /> 循环发射</label>
                <label><input type="checkbox" bind:checked={followEntity} /> 跟随实体</label>
                <label><input type="checkbox" bind:checked={orbitPlaying} /> 宿主运动</label>
                <label><input type="checkbox" bind:checked={gravityEnabled} /> 局部重力</label>
            </div>
        </div>

        <!-- 粒子笔刷 -->
        <div class="pw-section">
            <div class="section-title">粒子笔刷</div>

            <div class="sprite-section-label">程序生成</div>
            <div class="sprite-grid">
                {#each Object.entries(imageLabels) as [k, v]}
                    <button
                        class="sprite-thumb"
                        class:active={image === k}
                        onclick={() => { image = k; }}
                        title={v}
                    >
                        <img src={getParticleImage(k)} alt={v} width={THUMB_SIZE} height={THUMB_SIZE} />
                        <span class="sprite-label">{v}</span>
                    </button>
                {/each}
            </div>

            <!-- 颜色和缩放参数 -->
            <div class="control-grid" style="margin-top: 10px;">
                <div class="control"><label for="pw-startColor"><span>出生颜色</span></label><input id="pw-startColor" type="color" bind:value={startColor} /></div>
                <div class="control"><label for="pw-endColor"><span>消亡颜色</span></label><input id="pw-endColor" type="color" bind:value={endColor} /></div>
                <div class="control"><label><span>出生缩放</span><output>{startScale}</output></label><input type="range" min="0.05" max="16" step="0.05" bind:value={startScale} /></div>
                <div class="control"><label><span>消亡缩放</span><output>{endScale}</output></label><input type="range" min="0.05" max="24" step="0.05" bind:value={endScale} /></div>
                <div class="control"><label><span>图片尺寸(px/m)</span><output>{imageSize}</output></label><input type="range" min="1" max="240" step="1" bind:value={imageSize} /></div>
            </div>
            <div class="switch-row">
                <label><input type="checkbox" bind:checked={sizeInMeters} /> 尺寸按米计算</label>
            </div>
        </div>

        <!-- Feature 变换 -->
        <div class="pw-section">
            <div class="section-title">Feature 变换</div>
            <div class="control-grid three">
                <div class="control"><label><span>X平移(m)</span><output>{tx}</output></label><input type="range" min="-120" max="120" step="1" bind:value={tx} /></div>
                <div class="control"><label><span>Y平移(m)</span><output>{ty}</output></label><input type="range" min="-120" max="120" step="1" bind:value={ty} /></div>
                <div class="control"><label><span>Z平移(m)</span><output>{tz}</output></label><input type="range" min="-80" max="120" step="1" bind:value={tz} /></div>
                <div class="control"><label><span>航向(°)</span><output>{heading}</output></label><input type="range" min="-180" max="180" step="1" bind:value={heading} /></div>
                <div class="control"><label><span>俯仰(°)</span><output>{pitch}</output></label><input type="range" min="-180" max="180" step="1" bind:value={pitch} /></div>
                <div class="control"><label><span>滚转(°)</span><output>{roll}</output></label><input type="range" min="-180" max="180" step="1" bind:value={roll} /></div>
                <div class="control"><label><span>X缩放</span><output>{sx}</output></label><input type="range" min="0.1" max="4" step="0.05" bind:value={sx} /></div>
                <div class="control"><label><span>Y缩放</span><output>{sy}</output></label><input type="range" min="0.1" max="4" step="0.05" bind:value={sy} /></div>
                <div class="control"><label><span>Z缩放</span><output>{sz}</output></label><input type="range" min="0.1" max="4" step="0.05" bind:value={sz} /></div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="pw-section">
            <div class="button-row">
                <button onclick={() => particleFeature.clearParticles()}>清空粒子</button>
                <button onclick={resetTransform}>重置变换</button>
            </div>
        </div>
    </div>
</DemoPanel>

{#if showCodePreview}
    <div class="pw-code-overlay">
        <div
            class="pw-code-backdrop"
            role="button"
            tabindex="0"
            aria-label="关闭代码预览"
            onclick={closeCodePreview}
            onkeydown={(event) => (event.key === "Enter" || event.key === " ") && closeCodePreview()}
        ></div>
        <div class="pw-code-panel" role="dialog">
            <div class="pw-code-head">
                <div>
                    <div class="pw-code-title">粒子代码预览</div>
                    <div class="pw-code-subtitle">包含 canvas 图片生成函数与固定参数配置，可直接复制使用。</div>
                </div>
                <button class="pw-code-close" onclick={closeCodePreview}>关闭</button>
            </div>
            <textarea class="pw-code-text" readonly>{codePreviewText}</textarea>
            <div class="pw-code-foot">
                <button class="pw-code-copy" onclick={copyCode}>复制代码</button>
            </div>
        </div>
    </div>
{/if}

<style>

.pw-panel {
    pointer-events: all;
    width: 100%;
    max-height: 100%;
    overflow: auto;
    color: var(--ds-overlay-text);
    background: var(--ds-overlay-bg);
    border: 1px solid var(--panel-border);
    border-radius: 0 0 8px 8px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.38);
    backdrop-filter: blur(12px);
    font: 12px/1.4 "Segoe UI", sans-serif;
}
.pw-panel * { box-sizing: border-box; }
.pw-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 12px 10px;
    border-bottom: 1px solid var(--panel-border);
}
.pw-title { font-size: 15px; font-weight: 700; color: var(--panel-text-bright); }
.pw-head-actions { display: flex; align-items: center; gap: 8px; }
.pw-status { color: var(--panel-accent); font-variant-numeric: tabular-nums; }
.pw-code-btn {
    min-height: 30px; padding: 0 10px; color: var(--panel-text-bright);
    background: linear-gradient(135deg, var(--panel-btn-bg), rgba(92, 132, 255, 0.16));
    border: 1px solid var(--panel-border); border-radius: 6px; cursor: pointer; white-space: nowrap;
}
.pw-code-btn:hover { background: linear-gradient(135deg, var(--panel-btn-bg), rgba(92, 132, 255, 0.24)); }
.pw-section {
    padding: 10px 12px 12px;
    border-bottom: 1px solid var(--panel-border);
}
.pw-section:last-child { border-bottom: 0; }
.section-title {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px; color: var(--panel-text); font-size: 12px; font-weight: 700; letter-spacing: 0.02em;
}
.pw-shape-select {
    display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 10px;
}
.pw-shape-select label { color: var(--panel-text-muted); font-size: 11px; }
.pw-shape-select select, .control select {
    width: 100%; min-height: 30px; color: var(--panel-text); background: var(--panel-bg-embed);
    border: 1px solid var(--panel-border); border-radius: 6px;
}
.control-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 10px; }
.control-grid.three { grid-template-columns: repeat(3, 1fr); }
.control { display: grid; gap: 4px; min-width: 0; }
.control label { display: flex; justify-content: space-between; color: var(--panel-text-muted); font-size: 11px; }
.control output { color: var(--panel-text); font-variant-numeric: tabular-nums; }
.control input[type="range"] { width: 100%; accent-color: var(--panel-accent); }
.control input[type="color"] {
    width: 100%; height: 28px; border: 1px solid var(--panel-border); border-radius: 6px; background: transparent;
}
.switch-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; }
.switch-row label { display: inline-flex; align-items: center; gap: 6px; color: var(--panel-text-muted); }
.button-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.button-row button {
    min-height: 30px; padding: 0 10px; color: var(--panel-text); background: var(--panel-btn-bg);
    border: 1px solid var(--panel-border); border-radius: 6px; cursor: pointer;
}
.button-row button:hover { background: var(--panel-btn-bg); }

.subsection-title {
    color: var(--panel-text); font-size: 11px; font-weight: 600; margin: 0 0 6px;
}
.attitude-quicks {
    display: flex; align-items: center; gap: 4px; flex-wrap: wrap;
}
.quick-label { color: var(--panel-text-muted); font-size: 10px; }
.quick-preset {
    min-height: 24px; padding: 0 6px; font-size: 10px;
    color: var(--panel-text); background: var(--panel-bg-card);
    border: 1px solid var(--panel-border); border-radius: 4px; cursor: pointer;
}
.quick-preset:hover { background: var(--panel-btn-bg); }
.quick-preset.active { background: var(--panel-accent); color: #fff; border-color: var(--panel-accent); }

.sprite-section-label {
    color: var(--panel-text-muted); font-size: 11px; font-weight: 600; margin: 0 0 6px;
    letter-spacing: 0.02em;
}
.sprite-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 4px;
}
.sprite-thumb {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 4px 2px; border-radius: 6px; cursor: pointer; border: 1px solid transparent;
    background: var(--panel-bg-card); transition: border-color 0.15s, background 0.15s;
}
.sprite-thumb:hover { background: var(--panel-btn-bg); border-color: var(--panel-border); }
.sprite-thumb.active { background: var(--panel-btn-bg); border-color: var(--panel-btn-bg); }
.sprite-thumb img { display: block; image-rendering: pixelated; }
.sprite-label {
    color: var(--panel-text-muted); font-size: 9px; line-height: 1.1; text-align: center;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;
}

/* 代码预览遮罩 */
.pw-code-overlay {
    position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; pointer-events: all;
}
.pw-code-backdrop {
    position: absolute; inset: 0; background: rgba(0, 0, 0, 0.35); backdrop-filter: blur(4px);
}
.pw-code-panel {
    position: relative; width: min(960px, calc(100vw - 32px)); height: min(82vh, 880px);
    display: grid; grid-template-rows: auto 1fr auto; gap: 10px; padding: 14px;
    color: var(--ds-overlay-text); background: var(--ds-overlay-bg);
    border: 1px solid var(--panel-border); border-radius: 12px;
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.18);
}
.pw-code-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.pw-code-title { font-size: 16px; font-weight: 700; color: var(--panel-text-bright); }
.pw-code-subtitle { margin-top: 4px; color: var(--panel-text-muted); font-size: 12px; }
.pw-code-close, .pw-code-copy {
    min-height: 32px; padding: 0 12px; color: var(--panel-text-bright);
    background: var(--panel-btn-bg); border: 1px solid var(--panel-border); border-radius: 6px; cursor: pointer;
}
.pw-code-close:hover, .pw-code-copy:hover { background: var(--panel-btn-bg); }
.pw-code-text {
    width: 100%; height: 100%; margin: 0; padding: 14px; color: var(--panel-text);
    background: var(--panel-bg-embed); border: 1px solid var(--panel-border);
    border-radius: 10px; resize: none; outline: none; overflow: auto;
    font: 12px/1.55 "Cascadia Mono", "Consolas", monospace; white-space: pre;
}
.pw-code-foot { display: flex; justify-content: flex-end; }
</style>
