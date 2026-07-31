<script>
// =============================================================================
// ConeOrientationControls Demo — 椎体旋转基准演示
//
// 本示例演示 EllipticalConeFeature 的三类 emitDirection 旋转基准：
// 1. TO_GROUND：以实体位置作为顶部发射点，椎体向地球方向延伸并绕该点旋转
// 2. CENTER：以实体位置和椎体中心重合的位置作为旋转点
// 3. TO_UP：以实体位置作为底部发射点，椎体向上延伸并绕该点旋转
//
// 关键 API：
// - Daisy.EllipticalConeFeature: 椭圆椎体组件
//   - topSemiMajorAxis/topSemiMinorAxis: 顶部半长轴/半短轴
//   - bottomSemiMajorAxis/bottomSemiMinorAxis: 底部半长轴/半短轴
//   - height: 椎体高度
//   - emitDirection: 发射方向（TO_GROUND/CENTER/TO_UP）
//   - material: 材质
//   - outline: 轮廓
// - transformer.setRotation: 设置旋转角度（heading/pitch/roll）
// - engine.onPreRender: 渲染前回调
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 椎体参数 ──────────────────────────────────────────────
const height = 900000; // 椎体高度 900km
const nearRadius = 1200; // 近端半径
const farMajor = 260000; // 远端半长轴
const farMinor = 120000; // 远端半短轴

// ── 2. 创建 TO_GROUND 模式椎体 ──────────────────────────────────────────────
const groundEntity = engine.createEntity("Cone-Rotation-TO_GROUND");
groundEntity.position = Daisy.Cartesian3.fromDegrees(108.0, 39.0, 1200000);
// 设置体轴可视化
groundEntity.setBodyAxis({
    length: 620000,
    axisWidth: 4,
    showLabels: true,
    labelPrefix: "G-",
    showSphere: true,
    showWireframe: true,
});
groundEntity.addFeature(new Daisy.PointFeature({
    size: 1500,
    color: Daisy.Color.RED,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,
}));
groundEntity.addFeature(new Daisy.UI.TextFeature({
    text: "TO_GROUND: 顶点在实体位置，向地球方向旋转",
    font: "13px sans-serif",
    offsetPx: new Daisy.Cartesian2(-132, -38),
    fillColor: Daisy.Color.RED,
    showBackground: true,
    backgroundColor: Daisy.Color.BLACK.withAlpha(0.58),
}));
// 创建 TO_GROUND 椎体
const groundCone = new Daisy.EllipticalConeFeature({
    name: "__groundRotatingCone",
    topSemiMajorAxis: nearRadius,
    topSemiMinorAxis: nearRadius,
    bottomSemiMajorAxis: farMajor,
    bottomSemiMinorAxis: farMinor,
    height,
    slices: 72,
    material: Daisy.Color.RED.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidth: 2,
    emitDirection: Daisy.EmitDirection.TO_GROUND, // 向地球方向发射
    autoLength: false,
    capTop: true,
    capBottom: true,
});
groundEntity.addFeature(groundCone);

// ── 3. 创建 CENTER 模式椎体 ──────────────────────────────────────────────
const centerEntity = engine.createEntity("Cone-Rotation-CENTER");
centerEntity.position = Daisy.Cartesian3.fromDegrees(116.0, 39.0, 1200000);
centerEntity.setBodyAxis({
    length: 620000,
    axisWidth: 4,
    showLabels: true,
    labelPrefix: "C-",
    showSphere: true,
    showWireframe: true,
});
centerEntity.addFeature(new Daisy.PointFeature({
    size: 1500,
    color: Daisy.Color.GOLD,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,
}));
centerEntity.addFeature(new Daisy.UI.TextFeature({
    text: "CENTER: 实体位置就是椎体中心，绕中心旋转",
    font: "13px sans-serif",
    offsetPx: new Daisy.Cartesian2(0, -38),
    fillColor: Daisy.Color.GOLD,
    showBackground: true,
    backgroundColor: Daisy.Color.BLACK.withAlpha(0.58),
}));
// 创建 CENTER 椎体
const centerCone = new Daisy.EllipticalConeFeature({
    name: "__centerRotatingCone",
    topSemiMajorAxis: farMajor,
    topSemiMinorAxis: farMinor,
    bottomSemiMajorAxis: nearRadius,
    bottomSemiMinorAxis: nearRadius,
    height,
    slices: 72,
    material: Daisy.Color.GOLD.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.YELLOW,
    outlineWidth: 2,
    emitDirection: Daisy.EmitDirection.CENTER, // 中心发射
    autoLength: false,
    capTop: true,
    capBottom: true,
});
centerEntity.addFeature(centerCone);

// ── 4. 创建 TO_UP 模式椎体 ──────────────────────────────────────────────
const upEntity = engine.createEntity("Cone-Rotation-TO_UP");
upEntity.position = Daisy.Cartesian3.fromDegrees(124.0, 39.0, 1200000);
upEntity.setBodyAxis({
    length: 620000,
    axisWidth: 4,
    showLabels: true,
    labelPrefix: "U-",
    showSphere: true,
    showWireframe: true,
});
upEntity.addFeature(new Daisy.PointFeature({
    size: 1500,
    color: Daisy.Color.LIME,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,
}));
upEntity.addFeature(new Daisy.UI.TextFeature({
    text: "TO_UP: 底点在实体位置，向上旋转",
    font: "13px sans-serif",
    offsetPx: new Daisy.Cartesian2(132, -38),
    fillColor: Daisy.Color.LIME,
    showBackground: true,
    backgroundColor: Daisy.Color.BLACK.withAlpha(0.58),
}));
// 创建 TO_UP 椎体
const upCone = new Daisy.EllipticalConeFeature({
    name: "__upRotatingCone",
    topSemiMajorAxis: farMajor,
    topSemiMinorAxis: farMinor,
    bottomSemiMajorAxis: nearRadius,
    bottomSemiMinorAxis: nearRadius,
    height,
    slices: 72,
    material: Daisy.Color.LIME.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.LIME,
    outlineWidth: 2,
    emitDirection: Daisy.EmitDirection.TO_UP, // 向上发射
    autoLength: false,
    capTop: true,
    capBottom: true,
});
upEntity.addFeature(upCone);

// ── 5. 响应式状态 ──────────────────────────────────────────────
let playing = $state(true);
let mode = $state("mixed");
let startMs = performance.now();

// ── 6. 动画函数 ──────────────────────────────────────────────
// animateCones: 椎体旋转动画
function animateCones() {
    const t = (performance.now() - startMs) / 1000;
    if (mode === "heading") {
        // 同轴 Heading 模式
        groundCone.transformer.setRotation({ heading: t * 38, pitch: 24, roll: 0 });
        centerCone.transformer.setRotation({ heading: t * 38, pitch: 24, roll: 0 });
        upCone.transformer.setRotation({ heading: t * 38, pitch: 24, roll: 0 });
        return;
    }
    if (mode === "pitch") {
        // 同轴 Pitch 模式
        groundCone.transformer.setRotation({ heading: 0, pitch: Math.sin(t * 1.2) * 55, roll: 0 });
        centerCone.transformer.setRotation({ heading: 0, pitch: Math.sin(t * 1.2) * 55, roll: 0 });
        upCone.transformer.setRotation({ heading: 0, pitch: Math.sin(t * 1.2) * 55, roll: 0 });
        return;
    }
    // 混合旋转模式
    groundCone.transformer.setRotation({
        heading: t * 32,
        pitch: 30 + Math.sin(t * 0.9) * 12,
        roll: 0,
    });
    centerCone.transformer.setRotation({
        heading: t * 44,
        pitch: 0,
        roll: t * 55,
    });
    upCone.transformer.setRotation({
        heading: t * 32,
        pitch: -30 + Math.sin(t * 0.9) * 12,
        roll: 0,
    });
}

// ── 7. 渲染前回调 ──────────────────────────────────────────────
const removePreRender = engine.onPreRender(() => {
    if (!playing) return;
    animateCones();
});

// ── 8. 控制函数 ──────────────────────────────────────────────
function togglePlay() {
    playing = !playing;
    __log(`Cone rotation animation: ${playing ? "play" : "pause"}`);
}

function setMode(m) {
    mode = m;
    startMs = performance.now();
    playing = true;
    __log(`Mode: ${m === "mixed" ? "mixed rotations" : m === "heading" ? "same heading axis" : "same pitch axis"}`);
}

function resetRotation() {
    playing = false;
    groundCone.transformer.setRotation({ heading: 0, pitch: 0, roll: 0 });
    centerCone.transformer.setRotation({ heading: 0, pitch: 0, roll: 0 });
    upCone.transformer.setRotation({ heading: 0, pitch: 0, roll: 0 });
    __log("Cone rotations reset");
}

// ── 9. 资源清理 ──────────────────────────────────────────────
registerCleanup(() => {
    removePreRender();
});

// ── 10. 初始化 ──────────────────────────────────────────────
animateCones();
__log("Created: TO_GROUND, CENTER, and TO_UP rotation pivot comparison.");
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.0, 36.5, 5200000));
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="椎体旋转基准">
        <div class="panel-head">
            <div>
                <div class="panel-kicker">BODY AXIS</div>
                <div class="panel-title">椎体旋转基准</div>
            </div>
            <div class="panel-chip">{playing ? "运行中" : "已暂停"}</div>
        </div>

        <div class="button-grid">
            <button class:active={playing} onclick={togglePlay}>播放 / 暂停</button>
            <button class:active={mode === "mixed"} onclick={() => setMode("mixed")}>混合旋转</button>
            <button class:active={mode === "heading"} onclick={() => setMode("heading")}>同轴 Heading</button>
            <button class:active={mode === "pitch"} onclick={() => setMode("pitch")}>同轴 Pitch</button>
            <button onclick={resetRotation}>重置姿态</button>
            <button onclick={() => engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.0, 36.5, 5200000))}>三模式视角</button>
            <button class="wide" onclick={() => engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.0, 32.5, 3600000))}>侧向看旋转点</button>
        </div>
    </DemoPanel>
<style>
.panel-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
}
.panel-kicker {
    color: var(--panel-text-label);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
}
.panel-title {
    color: var(--panel-text-bright);
    font-size: 15px;
    font-weight: 700;
    margin-top: 2px;
}
.panel-chip {
    flex: 0 0 auto;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    color: var(--panel-accent);
    background: rgba(77, 183, 235, 0.14);
    border: 1px solid rgba(116, 218, 255, 0.16);
    white-space: nowrap;
}
.button-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}
button {
    color: var(--panel-text);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--panel-bg-card);
    border-radius: 8px;
    padding: 8px 10px;
    cursor: pointer;
    font-size: 12px;
    line-height: 1.2;
    min-height: 34px;
    white-space: nowrap;
}
button:hover {
    background: rgba(255, 255, 255, 0.2);
}
button.active {
    background: rgba(77, 183, 235, 0.18);
    border-color: rgba(116, 218, 255, 0.34);
    color: var(--panel-accent);
}
.wide {
    grid-column: 1 / -1;
}
</style>
