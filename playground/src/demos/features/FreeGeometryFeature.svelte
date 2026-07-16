<script>
// =============================================================================
// FreeGeometry Demo — 自定义组件
//
// 演示 FreeGeometryFeature 创建自定义 3D 几何：
// 1. 低多边形小熊（组合 UV 球体拼成）
// 2. 正二十面体（数学多面体）
// 3. 钻石星（双锥体）
//
// 关键 API：
// - Daisy.FreeGeometryFeature
//   - geometry: DaisyGeometryDescriptor（positions + indices）
//   - material: DMaterial（颜色/透明度）
//   - wireframe: 线框模式，可运行时切换
//   - outline: 轮廓线
//   - autoNormals: 法线自动计算（默认 flat）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

engine.setMultiplier(1);
engine.setUpdateMaxFps(false);
engine.play();

engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0, maxLevel: 3,
});
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.SkyBox, sources: {
    positiveX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/px.png"),
    negativeX: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nx.png"),
    positiveY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/py.png"),
    negativeZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/nz.png"),
    positiveZ: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/pz.png"),
    negativeY: Daisy.BuildModuleUrl.getUrl("static/assets/SkyBox/default/ny.png"),
}});

// ── Shape Generators ──────────────────────────────────────────────

const SHAPE_SCALE = 1000;

function uvSphere(cx, cy, cz, r, lat, lon) {
    const positions = [];
    const indices = [];
    for (let i = 0; i <= lat; i++) {
        const theta = i * Math.PI / lat;
        const st = Math.sin(theta), ct = Math.cos(theta);
        for (let j = 0; j <= lon; j++) {
            const phi = j * 2 * Math.PI / lon;
            const sp = Math.sin(phi), cp = Math.cos(phi);
            positions.push(cx + r * st * cp, cy + r * ct, cz + r * st * sp);
        }
    }
    for (let i = 0; i < lat; i++) {
        for (let j = 0; j < lon; j++) {
            const a = i * (lon + 1) + j;
            const b = a + lon + 1;
            indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
    }
    return { positions, indices };
}

function mergeShapes(shapes) {
    const positions = [];
    const indices = [];
    let offset = 0;
    for (const s of shapes) {
        const vc = s.positions.length / 3;
        for (let i = 0; i < s.positions.length; i++) positions.push(s.positions[i]);
        for (const idx of s.indices) indices.push(idx + offset);
        offset += vc;
    }
    return { positions, indices };
}

function generateBear() {
    const body = uvSphere(0, -10, 0, 100, 8, 8);
    for (let i = 1; i < body.positions.length; i += 3) {
        body.positions[i] = -10 + (body.positions[i] + 10) * 1.15;
    }

    const head = uvSphere(0, 120, 0, 75, 6, 8);
    const earL = uvSphere(-50, 175, 0, 28, 4, 4);
    const earR = uvSphere(50, 175, 0, 28, 4, 4);

    const armL = uvSphere(-120, 20, 0, 30, 4, 6);
    for (let i = 1; i < armL.positions.length; i += 3) armL.positions[i] *= 0.5;
    const armR = uvSphere(120, 20, 0, 30, 4, 6);
    for (let i = 1; i < armR.positions.length; i += 3) armR.positions[i] *= 0.5;

    const legL = uvSphere(-55, -125, 0, 35, 4, 6);
    for (let i = 1; i < legL.positions.length; i += 3) legL.positions[i] *= 0.5;
    const legR = uvSphere(55, -125, 0, 35, 4, 6);
    for (let i = 1; i < legR.positions.length; i += 3) legR.positions[i] *= 0.5;

    return mergeShapes([body, head, earL, earR, armL, armR, legL, legR]);
}

function generateIcosahedron(r) {
    const phi = (1 + Math.sqrt(5)) / 2;
    const raw = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    const positions = [];
    for (const v of raw) {
        const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
        positions.push(v[0]/len*r, v[1]/len*r, v[2]/len*r);
    }
    const faces = [
        [0,1,5],[0,5,11],[0,11,10],[0,10,7],[0,7,1],
        [1,7,8],[1,8,9],[1,9,5],[2,3,6],[2,6,8],
        [2,8,7],[2,7,10],[2,10,11],[2,11,3],[3,11,5],
        [3,5,9],[3,9,4],[3,4,6],[4,9,8],[4,8,6]
    ];
    const indices = [];
    for (const f of faces) indices.push(f[0], f[1], f[2]);
    return { positions, indices };
}

function generateDiamond(r) {
    const h = r * 1.5;
    const baseR = r * 0.55;
    const segs = 8;
    const positions = [];
    const indices = [];
    positions.push(0, h, 0);
    positions.push(0, -h, 0);
    for (let i = 0; i < segs; i++) {
        const a = i * 2 * Math.PI / segs;
        positions.push(baseR * Math.cos(a), 0, baseR * Math.sin(a));
    }
    for (let i = 0; i < segs; i++) {
        indices.push(0, 2 + i, 2 + (i + 1) % segs);
        indices.push(1, 2 + (i + 1) % segs, 2 + i);
    }
    return { positions, indices };
}

function scaleGeometryDescriptor(descriptor, scale) {
    return {
        ...descriptor,
        positions: descriptor.positions.map((value) => value * scale),
    };
}

// ── Create Scene Objects ──────────────────────────────────────────

const shapes = [];

function createFreeShape(name, lon, lat, height, opts) {
    const entity = engine.createEntity(name);
    entity.position = C3.fromDegrees(lon, lat, height);
    const feature = new Daisy.FreeGeometryFeature(opts);
    entity.addFeature(feature);
    shapes.push({ feature, entity, name });
    return { entity, feature };
}

const bear = scaleGeometryDescriptor(generateBear(), SHAPE_SCALE);
createFreeShape("Low-Poly Bear", 114.5, 38, 1800000, {
    geometry: { positions: bear.positions, indices: bear.indices },
    material: Color.fromCssColorString("#A0714F").withAlpha(0.92),
    outline: true,
    outlineColor: "#5C3A1E",
    doubleSided: true,
});

const ico = scaleGeometryDescriptor(generateIcosahedron(160), SHAPE_SCALE);
createFreeShape("Icosahedron", 117.1, 38, 1800000, {
    geometry: { positions: ico.positions, indices: ico.indices },
    material: Color.fromCssColorString("#F4A261").withAlpha(0.85),
    outline: true,
    outlineColor: "#E76F51",
});

const diamond = scaleGeometryDescriptor(generateDiamond(130), SHAPE_SCALE);
createFreeShape("Diamond Star", 119.7, 38, 1800000, {
    geometry: { positions: diamond.positions, indices: diamond.indices },
    material: Color.fromCssColorString("#7B68EE").withAlpha(0.80),
    outline: true,
    outlineColor: "#E0B0FF",
});

// ── Wireframe Toggle ──────────────────────────────────────────────

let wireframe = $state(false);
let toggleKey = $state(0);

function onWireframeChange() {
    wireframe = !wireframe;
    for (const { feature, entity } of shapes) {
        feature.options = { ...feature.options, wireframe };
        feature.reCreate(entity);
    }
    toggleKey++;
}

// ── Camera & Cleanup ──────────────────────────────────────────────

engine.camera.flyToTarget(C3.fromDegrees(117.1, 38, 4300000));
__log("FreeGeometryFeature: 小熊 + 二十面体 + 钻石星已创建。切换线框查看几何结构。");

registerCleanup(() => {
    for (const { entity } of shapes) {
        try { engine.removeEntity(entity); } catch {}
    }
});

import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="自定义几何">
    <h2 class="fg-title">FreeGeometryFeature</h2>
    <p class="fg-desc">用顶点和索引自定义任意 3D 几何体</p>

    <div class="fg-shapes">
        <span class="fg-badge" style="background:rgba(160,113,79,0.3);color:#c9a07e">🐻 小熊</span>
        <span class="fg-badge" style="background:rgba(244,162,97,0.3);color:#f4c88a">🔷 二十面体</span>
        <span class="fg-badge" style="background:rgba(123,104,238,0.3);color:#b8a8ff">💎 钻石星</span>
    </div>

    <label class="fg-toggle" class:wireframe-active={wireframe}>
        <input type="checkbox" checked={wireframe} onchange={onWireframeChange} />
        <span class="fg-slider"></span>
        线框模式
    </label>

    {#if wireframe}
        <p class="fg-hint">当前为线框模式，显示三角形边缘</p>
    {:else}
        <p class="fg-hint">切换线框可观察几何体三角形结构</p>
    {/if}
</DemoPanel>

<style>
    h2.fg-title { margin: 0 0 2px; font-size: 15px; font-weight: 700; color: var(--panel-text); }
    p.fg-desc { margin: 0 0 10px; font-size: 11px; color: var(--panel-text-muted); }
    .fg-shapes { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
    .fg-badge { padding: 2px 8px; border-radius: 999px; font-size: 11px; line-height: 1.6; }
    .fg-toggle {
        display: flex; align-items: center; gap: 8px;
        cursor: pointer; font-size: 12px; color: var(--panel-text);
        margin-bottom: 8px;
    }
    .fg-toggle input { display: none; }
    .fg-slider {
        width: 36px; height: 20px; border-radius: 10px;
        background: var(--panel-border); transition: background 0.2s;
        position: relative; flex-shrink: 0;
    }
    .fg-slider::after {
        content: ""; position: absolute; top: 2px; left: 2px;
        width: 16px; height: 16px; border-radius: 50%;
        background: var(--panel-text); transition: transform 0.2s;
    }
    .fg-toggle.wireframe-active .fg-slider { background: var(--panel-accent); }
    .fg-toggle.wireframe-active .fg-slider::after { transform: translateX(16px); }
    .fg-hint { margin: 0; font-size: 10px; color: var(--panel-text-muted); font-style: italic; }
</style>
