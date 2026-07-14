<script>
// =============================================================================
// MaterialsGallery.svelte - 材质浏览器 Demo
// -----------------------------------------------------------------------------
// 本文件是 Daisy 材质系统的完整展示：
//   - 40+ 种材质的实时预览
//   - 按载体分类（点、线、面、柱体、地形）
//   - 按类型分组（常规材质、高级材质、线材质、地形材质）
//   - 每个材质显示代码示例，可一键复制
//
// 关键 API：
//   - Daisy.MaterialFactory.Solid({ color, alpha })
//   - Daisy.MaterialFactory.Builtin(type, uniforms)
//   - Daisy.MaterialFactory.SpiralFlow(config)
//   - Daisy.MaterialFactory.DownEmitDiffuse(config)
//   - Daisy.MaterialFactory.NeonScan(config)
//   - Daisy.MaterialFactory.RadialPulse(config)
//   - Daisy.MaterialFactory.RingSweep(config)
//   - Daisy.MaterialFactory.PolylineArrow(config)
//   - Daisy.MaterialFactory.DaisyNoiseField(config)
//   - Daisy.MaterialFactory.DaisyGridGlow(config)
//   - ... 更多高级材质
//
// 载体类型说明：
//   - point: PointFeature（使用 color，不接收 material）
//   - line: PolylineFeature（线材质）
//   - surface: Ellipse、Polygon、Rectangle（面材质）
//   - solid: Cylinder、Box、Ellipsoid（立体几何材质）
//   - terrain: 地形专用材质
// =============================================================================


const { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

// ── 1. 常量定义 ─────────────────────────────────────────────────────────
// C3: Cartesian3 简写
// Color: 颜色工具
// Material: MaterialFactory 简写
// texturedVertexFormat: 带纹理坐标的顶点格式（用于材质预览）
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;
const Material = Daisy.MaterialFactory;
const texturedVertexFormat = Daisy.VertexFormat.POSITION_NORMAL_AND_ST ?? Daisy.VertexFormat.DEFAULT;

// 预览区域中心坐标（北京附近）
const centerLon = 116.28;
const centerLat = 39.84;

// 载体类型定义
// carrierOrder: 载体显示顺序
// carrierLabels: 载体中文标签
const carrierOrder = ["point", "line", "surface", "solid", "terrain"];
const carrierLabels = {
    point: "点",
    line: "线",
    surface: "面",
    solid: "柱体",
    terrain: "地形",
};
const carrierNotes = {
    point: "PointFeature 使用 color，不接收 material 描述。",
    line: "PolylineFeature / 线要素材质。",
    surface: "Ellipse、Polygon、Rectangle 等面要素材质。",
    solid: "Cylinder、Box、Ellipsoid 等立体几何材质。",
    terrain: "地形专用材质，不套到普通几何预览。",
};
const groupLabels = {
    builtin: "常规材质",
    daisy: "高级材质",
    line: "线材质",
    terrain: "地形材质",
};
const groupFilters = [
    { id: "all", label: "全部" },
    { id: "builtin", label: "常规" },
    { id: "daisy", label: "高级" },
    { id: "line", label: "线" },
    { id: "terrain", label: "地形" },
];
const carrierFilters = [
    { id: "all", label: "全部" },
    { id: "point", label: "点" },
    { id: "line", label: "线" },
    { id: "surface", label: "面" },
    { id: "solid", label: "柱体" },
    { id: "terrain", label: "地形" },
];

function makeGradientCanvas(colors) {
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 12;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    colors.forEach(([stop, color]) => gradient.addColorStop(stop, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
}

function makePatternCanvas(kind) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 128, 128);

    if (kind === "rings") {
        for (let r = 12; r < 94; r += 16) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 + r / 180})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(64, 64, r, 0, Math.PI * 2);
            ctx.stroke();
        }
        return canvas;
    }

    if (kind === "normal") {
        const data = ctx.createImageData(128, 128);
        for (let y = 0; y < 128; y += 1) {
            for (let x = 0; x < 128; x += 1) {
                const i = (y * 128 + x) * 4;
                data.data[i] = 128 + Math.round(Math.sin(x * 0.2) * 58);
                data.data[i + 1] = 128 + Math.round(Math.cos(y * 0.22) * 58);
                data.data[i + 2] = 255;
                data.data[i + 3] = 255;
            }
        }
        ctx.putImageData(data, 0, 0);
        return canvas;
    }

    for (let y = 0; y < 128; y += 16) {
        for (let x = 0; x < 128; x += 16) {
            ctx.fillStyle = ((x + y) / 16) % 2 === 0 ? "#14b8a6" : "#1e293b";
            ctx.fillRect(x, y, 16, 16);
        }
    }
    ctx.strokeStyle = "rgba(250,204,21,.92)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(8, 112);
    ctx.lineTo(120, 16);
    ctx.stroke();
    return canvas;
}

function makeMaterialPreview(type, uniforms, source, translucent = true) {
    return Material.Custom(
        `DaisyPreview${type}`,
        uniforms,
        source,
        translucent,
    );
}

function makeChannelPreviewMaterial(type, image, source, translucent = true) {
    return makeMaterialPreview(type, {
        image: image.toDataURL("image/png"),
        repeat: new Daisy.Cartesian2(2.0, 2.0),
        colorA: Color.fromCssColorString("#082f49").withAlpha(0.88),
        colorB: Color.fromCssColorString("#5eb8ff").withAlpha(0.92),
        accent: Color.fromCssColorString("#facc15").withAlpha(0.96),
    }, source, translucent);
}

// ── 2. 生成纹理图像 ─────────────────────────────────────────────────────────
// 使用 Canvas 2D 动态生成各种纹理图像，用于材质预览
// defaultImage: 棋盘格纹理（用于贴图材质）
// ringsImage: 环形纹理（用于透明遮罩、法线贴图等）
// normalImage: 法线贴图（模拟表面光照起伏）
// rampImage: 渐变色带（用于高度渐变等）
const defaultImage = makePatternCanvas("tile");
const ringsImage = makePatternCanvas("rings");
const normalImage = makePatternCanvas("normal");
const rampImage = makeGradientCanvas([
    [0, "#1d4ed8"],   // 蓝色
    [0.38, "#22c55e"], // 绿色
    [0.72, "#facc15"], // 黄色
    [1, "#ef4444"],    // 红色
]);
// 地形参数
// terrainBaseHeight: 基础高度（米）
// terrainMaxHeight: 最大高度（米）
// terrainCenter: 地形中心坐标
// terrainBounds: 地形边界（经纬度范围）
const terrainBaseHeight = 52;
const terrainMaxHeight = 1800;
const terrainCenter = { lon: 116.4, lat: 39.9, height: 520 };
const terrainBounds = { west: 116.24, east: 116.56, south: 39.76, north: 40.02 };
// terrainElevationRampImage: 高度渐变色带（绿-黄-白）
// terrainSlopeRampImage: 坡度渐变色带（深绿-浅绿-白）
// terrainAspectRampImage: 坡向渐变色带（红-橙-绿-青-蓝-紫-红，360°循环）
// heightsImage: 高度图（黑白渐变）
const terrainElevationRampImage = makeGradientCanvas([
    [0, "#244634"],   // 深绿
    [0.34, "#5f734f"], // 橄榄绿
    [0.62, "#b9aa8d"], // 米色
    [0.84, "#d7ccb3"], // 浅米色
    [1, "#f8fafc"],    // 白色
]);
const terrainSlopeRampImage = makeGradientCanvas([
    [0, "#1f3f2c"],
    [0.48, "#7f8f61"],
    [0.74, "#c9b17c"],
    [1, "#f1f5f9"],
]);
const terrainAspectRampImage = makeGradientCanvas([
    [0, "#ef4444"],    // 红（北）
    [0.17, "#f59e0b"], // 橙（东北）
    [0.34, "#22c55e"], // 绿（东）
    [0.5, "#06b6d4"],  // 青（南）
    [0.67, "#3b82f6"], // 蓝（西南）
    [0.84, "#a855f7"], // 紫（西）
    [1, "#ef4444"],    // 红（西北）
]);
const heightsImage = makeGradientCanvas([[0, "#050505"], [1, "#ffffff"]]);
const terrainOverlaySize = 384;
const terrainOverlayAlpha = 0.78;
const terrainContourSpacing = 180;
const terrainSlopeMax = 0.095;
// 载体类型快捷定义
const surfaceSolid = ["surface", "solid"];  // 面 + 立体
const surfaceOnly = ["surface"];            // 仅面
const lineOnly = ["line"];                   // 仅线
const terrainOnly = ["terrain"];             // 仅地形

// ── 3. 材质定义数组 ─────────────────────────────────────────────────────────
// materials: 所有材质的定义数组
// 每个材质包含：
//   id: 唯一标识
//   name: 显示名称
//   group: 分组（builtin/daisy/line/terrain）
//   supports: 支持的载体类型
//   desc: 描述文字
//   create: 创建材质的函数
//   code: 代码示例（用于复制）
const materials = [
    {
        id: "solid-color",
        name: "Solid / Color",
        group: "builtin",
        supports: ["point", "surface", "solid"],
        desc: "普通纯色与透明度，是点、面、立体几何最稳定的基础材质。",
        pointColor: "#38bdf8",
        create: () => Material.Solid({ color: "#38bdf8", alpha: 0.74 }),
        code: 'Daisy.MaterialFactory.Solid({ color: "#38bdf8", alpha: 0.74 })',
    },
    {
        id: "image",
        name: "Image",
        group: "builtin",
        supports: surfaceSolid,
        desc: "图片贴图材质，适合面与带纹理坐标的立体几何。",
        create: () => Material.Builtin("image", { image: defaultImage, repeat: 3 }),
        code: 'Daisy.MaterialFactory.Builtin("image", { image, repeat: 3 })',
    },
    {
        id: "diffuse-map",
        name: "DiffuseMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "漫反射贴图，主要影响基础颜色。",
        create: () => Material.Builtin("diffuseMap", { image: defaultImage, repeat: 2 }),
        code: 'Daisy.MaterialFactory.Builtin("diffuseMap", { image, repeat: 2 })',
    },
    {
        id: "alpha-map",
        name: "AlphaMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "透明遮罩贴图，用纹理通道控制可见区域。",
        create: () => Material.Builtin("alphaMap", { image: ringsImage, repeat: 2 }),
        previewCreate: () => makeChannelPreviewMaterial("AlphaMap", ringsImage, `
            daisy_material daisy_getMaterial(daisy_materialInput materialInput)
            {
                daisy_material material = daisy_getDefaultMaterial(materialInput);
                vec2 uv = fract(repeat * materialInput.uv);
                float mask = texture(image, uv).b;
                float ring = smoothstep(0.22, 0.92, mask);
                vec4 color = mix(colorA, colorB, ring);
                material.diffuse = color.rgb;
                material.emission = color.rgb * 0.18;
                material.alpha = mix(0.22, 0.96, ring);
                return material;
            }
        `),
        code: 'Daisy.MaterialFactory.Builtin("alphaMap", { image, repeat: 2 })',
    },
    {
        id: "specular-map",
        name: "SpecularMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "高光遮罩贴图，用于区分反光强度。",
        create: () => Material.Builtin("specularMap", { image: ringsImage, repeat: 2 }),
        previewCreate: () => makeChannelPreviewMaterial("SpecularMap", ringsImage, `
            daisy_material daisy_getMaterial(daisy_materialInput materialInput)
            {
                daisy_material material = daisy_getDefaultMaterial(materialInput);
                vec2 uv = fract(repeat * materialInput.uv);
                float mask = texture(image, uv).g;
                float highlight = smoothstep(0.24, 0.9, mask);
                vec4 color = mix(colorA, accent, highlight);
                material.diffuse = color.rgb * 0.72;
                material.emission = accent.rgb * highlight * 0.45;
                material.specular = mix(0.08, 1.0, highlight);
                material.shininess = 0.92;
                material.alpha = 0.94;
                return material;
            }
        `, false),
        code: 'Daisy.MaterialFactory.Builtin("specularMap", { image, repeat: 2 })',
    },
    {
        id: "emission-map",
        name: "EmissionMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "自发光贴图，适合强调发光纹理和信号区域。",
        create: () => Material.Builtin("emissionMap", { image: defaultImage, repeat: 2 }),
        code: 'Daisy.MaterialFactory.Builtin("emissionMap", { image, repeat: 2 })',
    },
    {
        id: "bump-map",
        name: "BumpMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "凹凸扰动材质，需要法线与纹理坐标才能看出质感。",
        create: () => Material.Builtin("bumpMap", { image: ringsImage, repeat: 2, strength: 0.45 }),
        previewCreate: () => makeChannelPreviewMaterial("BumpMap", ringsImage, `
            daisy_material daisy_getMaterial(daisy_materialInput materialInput)
            {
                daisy_material material = daisy_getDefaultMaterial(materialInput);
                vec2 uv = fract(repeat * materialInput.uv);
                float c = texture(image, uv).g;
                float dx = texture(image, fract(uv + vec2(0.012, 0.0))).g - c;
                float dy = texture(image, fract(uv + vec2(0.0, 0.012))).g - c;
                float shade = clamp(0.56 + (dx - dy) * 3.8, 0.12, 1.0);
                vec4 color = mix(colorA, colorB, smoothstep(0.18, 0.86, c));
                material.diffuse = color.rgb * shade;
                material.emission = color.rgb * 0.1;
                material.alpha = 0.96;
                return material;
            }
        `, false),
        code: 'Daisy.MaterialFactory.Builtin("bumpMap", { image, repeat: 2, strength: 0.45 })',
    },
    {
        id: "normal-map",
        name: "NormalMap",
        group: "builtin",
        supports: surfaceSolid,
        desc: "法线贴图扰动，用于伪造表面光照起伏。",
        create: () => Material.Builtin("normalMap", { image: normalImage, repeat: 2, strength: 0.55 }),
        previewCreate: () => makeChannelPreviewMaterial("NormalMap", normalImage, `
            daisy_material daisy_getMaterial(daisy_materialInput materialInput)
            {
                daisy_material material = daisy_getDefaultMaterial(materialInput);
                vec3 n = texture(image, fract(repeat * materialInput.uv)).rgb * 2.0 - 1.0;
                vec3 light = normalize(vec3(-0.45, 0.55, 0.72));
                float shade = clamp(dot(normalize(n), light) * 0.5 + 0.5, 0.12, 1.0);
                vec3 color = mix(colorA.rgb, colorB.rgb, shade);
                material.diffuse = color;
                material.emission = color * 0.12;
                material.alpha = 0.96;
                return material;
            }
        `, false),
        code: 'Daisy.MaterialFactory.Builtin("normalMap", { image: normalMap, repeat: 2, strength: 0.55 })',
    },
    {
        id: "grid",
        name: "Grid",
        group: "builtin",
        supports: surfaceSolid,
        desc: "规则网格材质，适合网格面、区域边界和体表辅助线。",
        create: () => Material.Builtin("grid", { color: "#facc15", cellAlpha: 0.18, lineCount: 8 }),
        code: 'Daisy.MaterialFactory.Builtin("grid", { color: "#facc15", cellAlpha: 0.18, lineCount: 8 })',
    },
    {
        id: "stripe",
        name: "Stripe",
        group: "builtin",
        supports: surfaceSolid,
        desc: "条纹材质，适合方向性纹理和扫描基底。",
        create: () => Material.Builtin("stripe", { evenColor: "#fb7185", oddColor: "#1f2937", repeat: 10 }),
        code: 'Daisy.MaterialFactory.Builtin("stripe", { evenColor: "#fb7185", oddColor: "#1f2937", repeat: 10 })',
    },
    {
        id: "checkerboard",
        name: "Checkerboard",
        group: "builtin",
        supports: surfaceSolid,
        desc: "棋盘格材质，适合纹理坐标调试和规则填充。",
        create: () => Material.Builtin("checkerboard", { lightColor: "#f8fafc", darkColor: "#2563eb", repeat: 5 }),
        code: 'Daisy.MaterialFactory.Builtin("checkerboard", { lightColor: "#f8fafc", darkColor: "#2563eb", repeat: 5 })',
    },
    {
        id: "dot",
        name: "Dot",
        group: "builtin",
        supports: surfaceSolid,
        desc: "点阵材质，适合离散采样、遮罩和低密度填充。",
        create: () => Material.Builtin("dot", { lightColor: "#fef08a", darkColor: "#0f172a", repeat: 10 }),
        code: 'Daisy.MaterialFactory.Builtin("dot", { lightColor: "#fef08a", darkColor: "#0f172a", repeat: 10 })',
    },
    {
        id: "water",
        name: "Water",
        group: "builtin",
        supports: surfaceOnly,
        desc: "水面法线动画，普通面可预览，体表不作为推荐用法。",
        create: () => Material.Builtin("water", { normalMap: normalImage, frequency: 1400, animationSpeed: 0.018, amplitude: 4 }),
        code: 'Daisy.MaterialFactory.Builtin("water", { normalMap, frequency: 1400, animationSpeed: 0.018, amplitude: 4 })',
    },
    {
        id: "rim-lighting",
        name: "RimLighting",
        group: "builtin",
        supports: surfaceSolid,
        desc: "边缘光材质，适合强调轮廓和外沿。",
        create: () => Material.Builtin("rimLighting", { color: "#1e293b", rimColor: "#a7f3d0", width: 0.35 }),
        code: 'Daisy.MaterialFactory.Builtin("rimLighting", { color: "#1e293b", rimColor: "#a7f3d0", width: 0.35 })',
    },
    {
        id: "fade",
        name: "Fade",
        group: "builtin",
        supports: surfaceSolid,
        desc: "方向渐隐材质，适合区域过渡和视觉淡出。",
        create: () => Material.Builtin("fade", {
            fadeInColor: "rgba(34,211,238,0.96)",
            fadeOutColor: "rgba(15,23,42,0.08)",
            maximumDistance: 0.36,
            time: { x: 0.5, y: 0.5 },
            fadeDirection: { x: 1, y: 1 },
            repeat: false,
        }),
        code: 'Daisy.MaterialFactory.Builtin("fade", { fadeInColor: "#22d3ee", fadeOutColor: "rgba(15,23,42,0.08)", maximumDistance: 0.36, fadeDirection: { x: 1, y: 1 } })',
    },
    {
        id: "spiral-flow",
        name: "SpiralFlow",
        group: "daisy",
        supports: surfaceOnly,
        desc: "螺旋轴向流动，适合圆形区域和能量扩散面。",
        create: () => Material.SpiralFlow({ color: "#155e75", spiralColor: "#facc15", speed: 1.2, count: 7, thickness: 0.28, opacity: 0.72 }),
        code: 'Daisy.MaterialFactory.SpiralFlow({ color: "#155e75", spiralColor: "#facc15", count: 7 })',
    },
    {
        id: "down-emit-diffuse",
        name: "DownEmitDiffuse",
        group: "daisy",
        supports: surfaceOnly,
        desc: "从中心向下扩散的能量面，适合投影式区域表达。",
        create: () => Material.DownEmitDiffuse({ color: "#166534", bottomColor: "#22c55e", speed: 0.8, diffusionRadius: 0.46, diffusionWidth: 0.08, opacity: 0.66 }),
        code: 'Daisy.MaterialFactory.DownEmitDiffuse({ color: "#166534", bottomColor: "#22c55e" })',
    },
    {
        id: "neon-scan",
        name: "NeonScan",
        group: "daisy",
        supports: surfaceOnly,
        desc: "霓虹斜向扫描，适合雷达扫掠和状态高亮面。",
        create: () => Material.NeonScan({ baseColor: "#164e63", neonColor: "#7dd3fc", speed: 1.0, bandWidth: 0.18, glowSize: 0.42, opacity: 0.78 }),
        code: 'Daisy.MaterialFactory.NeonScan({ baseColor: "#164e63", neonColor: "#7dd3fc" })',
    },
    {
        id: "radial-pulse",
        name: "RadialPulse",
        group: "daisy",
        supports: surfaceOnly,
        desc: "中心径向脉冲，适合告警范围和传播效果。",
        create: () => Material.RadialPulse({ color: "#0f766e", pulseColor: "#f8fafc", speed: 1.0, ringWidth: 0.09, opacity: 0.7 }),
        code: 'Daisy.MaterialFactory.RadialPulse({ color: "#0f766e", pulseColor: "#f8fafc" })',
    },
    {
        id: "ring-sweep",
        name: "RingSweep",
        group: "daisy",
        supports: surfaceOnly,
        desc: "角向环形扫描，适合圆盘形态的扫描光束。",
        create: () => Material.RingSweep({ color: "#312e81", sweepColor: "#fb923c", speed: 1.0, width: 0.16, opacity: 0.72 }),
        code: 'Daisy.MaterialFactory.RingSweep({ color: "#312e81", sweepColor: "#fb923c" })',
    },
    {
        id: "daisy-noise-field",
        name: "NoiseField",
        group: "daisy",
        supports: surfaceSolid,
        desc: "fbm 噪声场，适合云雾、能量面和体表扰动。",
        create: () => Material.DaisyNoiseField({ colorA: "#06b6d4", colorB: "#84cc16", scale: 8, contrast: 0.42 }),
        code: 'Daisy.MaterialFactory.DaisyNoiseField({ colorA: "#06b6d4", colorB: "#84cc16", scale: 8 })',
    },
    {
        id: "daisy-grid-glow",
        name: "GridGlow",
        group: "daisy",
        supports: surfaceSolid,
        desc: "发光网格脉冲，适合面网格、柱体外壳和扫描框。",
        create: () => Material.DaisyGridGlow({ baseColor: "#020617", lineColor: "#38bdf8", cellCount: { x: 9, y: 7 }, lineWidth: 0.03 }),
        code: 'Daisy.MaterialFactory.DaisyGridGlow({ baseColor: "#020617", lineColor: "#38bdf8", cellCount: { x: 9, y: 7 } })',
    },
    {
        id: "daisy-contour-bands",
        name: "ContourBands",
        group: "daisy",
        supports: surfaceSolid,
        desc: "等值线分层，适合高度、强度或分级区域表达。",
        create: () => Material.DaisyContourBands({ lowColor: "#14532d", highColor: "#fde047", bandCount: 10, slope: 0.55 }),
        code: 'Daisy.MaterialFactory.DaisyContourBands({ lowColor: "#14532d", highColor: "#fde047", bandCount: 10 })',
    },
    {
        id: "daisy-cellular",
        name: "Cellular",
        group: "daisy",
        supports: surfaceSolid,
        desc: "细胞边界纹理，适合分块区域和非均匀边界。",
        create: () => Material.DaisyCellular({ baseColor: "#1e293b", edgeColor: "#fb7185", cellCount: 8 }),
        code: 'Daisy.MaterialFactory.DaisyCellular({ baseColor: "#1e293b", edgeColor: "#fb7185", cellCount: 8 })',
    },
    {
        id: "daisy-heatmap",
        name: "Heatmap",
        group: "daisy",
        supports: surfaceSolid,
        desc: "径向热力图，适合强度中心、覆盖范围和风险分布。",
        create: () => Material.DaisyHeatmap({ coldColor: "#2563eb", midColor: "#22c55e", hotColor: "#f97316", radius: 0.72 }),
        code: 'Daisy.MaterialFactory.DaisyHeatmap({ coldColor: "#2563eb", midColor: "#22c55e", hotColor: "#f97316" })',
    },
    {
        id: "daisy-scanline",
        name: "Scanline",
        group: "daisy",
        supports: surfaceSolid,
        desc: "扫描线闪烁，适合屏幕、雷达、面板式材质。",
        create: () => Material.DaisyScanline({ baseColor: "#111827", scanColor: "#a78bfa", density: 20, thickness: 0.14 }),
        code: 'Daisy.MaterialFactory.DaisyScanline({ baseColor: "#111827", scanColor: "#a78bfa", density: 20 })',
    },
    {
        id: "daisy-turbulence",
        name: "Turbulence",
        group: "daisy",
        supports: surfaceSolid,
        desc: "湍流噪声能量，适合不稳定云团和流体感表面。",
        create: () => Material.DaisyTurbulence({ colorA: "#082f49", colorB: "#2dd4bf", scale: 6.5, intensity: 0.72 }),
        code: 'Daisy.MaterialFactory.DaisyTurbulence({ colorA: "#082f49", colorB: "#2dd4bf", scale: 6.5 })',
    },
    {
        id: "daisy-marble",
        name: "Marble",
        group: "daisy",
        supports: surfaceSolid,
        desc: "噪声扭曲云纹，适合地质、能量云和装饰性体表。",
        create: () => Material.DaisyMarble({ baseColor: "#1f2937", veinColor: "#e5e7eb", frequency: 20, warp: 1.9 }),
        code: 'Daisy.MaterialFactory.DaisyMarble({ baseColor: "#1f2937", veinColor: "#e5e7eb", frequency: 20 })',
    },
    {
        id: "daisy-sdf-rings",
        name: "SdfRings",
        group: "daisy",
        supports: surfaceSolid,
        desc: "SDF 同心环，适合精确脉冲、靶心和波纹。",
        create: () => Material.DaisySdfRings({ ringColor: "#fbbf24", count: 9, width: 0.07 }),
        code: 'Daisy.MaterialFactory.DaisySdfRings({ ringColor: "#fbbf24", count: 9, width: 0.07 })',
    },
    {
        id: "daisy-halftone",
        name: "Halftone",
        group: "daisy",
        supports: surfaceSolid,
        desc: "半调网点，适合密度表达和图形化遮罩。",
        create: () => Material.DaisyHalftone({ paperColor: "#f8fafc", inkColor: "#2563eb", density: 17 }),
        code: 'Daisy.MaterialFactory.DaisyHalftone({ paperColor: "#f8fafc", inkColor: "#2563eb", density: 17 })',
    },
    {
        id: "daisy-warped-stripes",
        name: "WarpedStripes",
        group: "daisy",
        supports: surfaceSolid,
        desc: "域扭曲条纹，适合流向、风场和不规则条带。",
        create: () => Material.DaisyWarpedStripes({ colorA: "#312e81", colorB: "#f472b6", frequency: 24, warpStrength: 0.36 }),
        code: 'Daisy.MaterialFactory.DaisyWarpedStripes({ colorA: "#312e81", colorB: "#f472b6", frequency: 24 })',
    },
    {
        id: "daisy-aurora",
        name: "Aurora",
        group: "daisy",
        supports: surfaceSolid,
        desc: "极光帘幕，适合垂直流动和能量幕墙感材质。",
        create: () => Material.DaisyAurora({ lowColor: "#14b8a6", highColor: "#c084fc", waviness: 0.09 }),
        code: 'Daisy.MaterialFactory.DaisyAurora({ lowColor: "#14b8a6", highColor: "#c084fc" })',
    },
    {
        id: "daisy-circuit",
        name: "Circuit",
        group: "daisy",
        supports: surfaceSolid,
        desc: "电路线脉冲，适合数据链路、电子设备和科技体表。",
        create: () => Material.DaisyCircuit({ traceColor: "#34d399", cells: { x: 11, y: 8 } }),
        code: 'Daisy.MaterialFactory.DaisyCircuit({ traceColor: "#34d399", cells: { x: 11, y: 8 } })',
    },
    {
        id: "daisy-topo-ripple",
        name: "TopoRipple",
        group: "daisy",
        supports: surfaceSolid,
        desc: "等值线叠加雷达波，适合地形感扫描和热区传播。",
        create: () => Material.DaisyTopoRipple({ lineColor: "#fde047", bands: 10, rippleCount: 5 }),
        code: 'Daisy.MaterialFactory.DaisyTopoRipple({ lineColor: "#fde047", bands: 10, rippleCount: 5 })',
    },
    {
        id: "daisy-matrix-rain",
        name: "MatrixRain",
        group: "daisy",
        supports: surfaceSolid,
        desc: "码流雨滴，适合数据流和矩阵式信息面。",
        create: () => Material.DaisyMatrixRain({ rainColor: "#84cc16", columns: 24, rows: 15 }),
        code: 'Daisy.MaterialFactory.DaisyMatrixRain({ rainColor: "#84cc16", columns: 24, rows: 15 })',
    },
    {
        id: "daisy-dither-fade",
        name: "DitherFade",
        group: "daisy",
        supports: surfaceSolid,
        desc: "Bayer 点阵渐隐，适合低成本透明过渡和扫描遮罩。",
        create: () => Material.DaisyDitherFade({ colorA: "#0ea5e9", colorB: "#f87171", radial: 0.42 }),
        code: 'Daisy.MaterialFactory.DaisyDitherFade({ colorA: "#0ea5e9", colorB: "#f87171", radial: 0.42 })',
    },
    {
        id: "daisy-advanced-water",
        name: "AdvancedWater",
        group: "daisy",
        supports: surfaceOnly,
        desc: "高级拟态水面，5 层波浪、cross 法线、菲涅尔效应、Blinn-Phong 高光、波峰波谷明暗。",
        create: () => Material.DaisyAdvancedWater({ baseColor: "#001432", surfaceColor: "#006496", waveSpeed: 0.8, waveFrequency: 12.0 }),
        code: 'Daisy.MaterialFactory.DaisyAdvancedWater({ baseColor: "#001432", surfaceColor: "#006496", waveSpeed: 0.8 })',
    },
    {
        id: "polyline-arrow",
        name: "PolylineArrow",
        group: "line",
        supports: lineOnly,
        desc: "方向箭头线材质，适合航迹、流向和路径方向。",
        create: () => Material.Builtin("polylineArrow", { color: "#fde047" }),
        code: 'Daisy.MaterialFactory.Builtin("polylineArrow", { color: "#fde047" })',
    },
    {
        id: "polyline-dash",
        name: "PolylineDash",
        group: "line",
        supports: lineOnly,
        desc: "虚线节奏材质，适合规划路径和非实体链路。",
        create: () => Material.Builtin("polylineDash", { color: "#38bdf8", gapColor: "rgba(15,23,42,0.2)", dashLength: 18 }),
        code: 'Daisy.MaterialFactory.Builtin("polylineDash", { color: "#38bdf8", dashLength: 18 })',
    },
    {
        id: "polyline-glow",
        name: "PolylineGlow",
        group: "line",
        supports: lineOnly,
        desc: "线光晕材质，适合高亮链路和能量线路。",
        create: () => Material.Builtin("polylineGlow", { color: "#22d3ee", glowPower: 0.22, taperPower: 0.8 }),
        code: 'Daisy.MaterialFactory.Builtin("polylineGlow", { color: "#22d3ee", glowPower: 0.22 })',
    },
    {
        id: "polyline-outline",
        name: "PolylineOutline",
        group: "line",
        supports: lineOnly,
        desc: "描边线材质，适合复杂背景上的路径可读性。",
        create: () => Material.Builtin("polylineOutline", { color: "#fb7185", outlineColor: "#ffffff", outlineWidth: 2 }),
        code: 'Daisy.MaterialFactory.Builtin("polylineOutline", { color: "#fb7185", outlineColor: "#ffffff", outlineWidth: 2 })',
    },
    {
        id: "daisy-arrow-flow",
        name: "Daisy Arrow Flow",
        group: "line",
        supports: lineOnly,
        desc: "Daisy 流动箭头线材质，适合动态流向和数据传输。",
        create: () => Material.PolylineArrow({ color: "#34d399", speed: 1.5, arrowSize: 24 }),
        code: 'Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5, arrowSize: 24 })',
    },
    {
        id: "elevation-contour",
        name: "ElevationContour",
        group: "terrain",
        supports: terrainOnly,
        desc: "地形等高线材质，绑定 globe/terrain 使用。",
        previewMode: "elevation-contour",
        create: () => Material.Builtin("elevationContour", { contourColor: "rgba(248,250,252,0.96)", spacing: 450, width: 1.4 }),
        code: 'Daisy.MaterialFactory.Builtin("elevationContour", { contourColor: "rgba(248,250,252,0.96)", spacing: 450, width: 1.4 })',
    },
    {
        id: "elevation-ramp",
        name: "ElevationRamp",
        group: "terrain",
        supports: terrainOnly,
        desc: "地形高度渐变材质，普通面/柱体不推荐套用。",
        previewMode: "elevation-ramp",
        create: () => Material.Builtin("elevationRamp", { image: terrainElevationRampImage, minimumHeight: 0, maximumHeight: terrainMaxHeight }),
        code: 'Daisy.MaterialFactory.Builtin("elevationRamp", { image: rampImage, minimumHeight: 0, maximumHeight: 1800 })',
    },
    {
        id: "slope-ramp",
        name: "SlopeRamp",
        group: "terrain",
        supports: terrainOnly,
        desc: "地形坡度渐变材质，依赖地形法线和坡度信息。",
        previewMode: "slope-ramp",
        useTerrainOverlay: true,
        previewNote: "当前预览由组件对 CustomHeightmap 高程做中心差分，模拟 terrain vertex normals 后按坡度上色。",
        create: () => Material.Builtin("slopeRamp", { image: terrainSlopeRampImage }),
        code: 'Daisy.MaterialFactory.Builtin("slopeRamp", { image: rampImage })',
    },
    {
        id: "aspect-ramp",
        name: "AspectRamp",
        group: "terrain",
        supports: terrainOnly,
        desc: "地形坡向渐变材质，依赖 terrain 的坡向计算。",
        previewMode: "aspect-ramp",
        useTerrainOverlay: true,
        previewNote: "当前预览由组件对 CustomHeightmap 高程做中心差分，模拟坡向角后按方位上色。",
        create: () => Material.Builtin("aspectRamp", { image: terrainAspectRampImage }),
        code: 'Daisy.MaterialFactory.Builtin("aspectRamp", { image: rampImage })',
    },
    {
        id: "elevation-band",
        name: "ElevationBand",
        group: "terrain",
        supports: terrainOnly,
        desc: "地形高度分带材质，通过高度/颜色贴图映射。",
        previewMode: "elevation-band",
        useTerrainOverlay: true,
        previewNote: "当前预览用同一份 CustomHeightmap 高程生成离散分带，模拟高度/颜色贴图 packing 后的效果。",
        create: () => Material.Builtin("elevationBand", { heights: heightsImage, colors: rampImage }),
        code: 'Daisy.MaterialFactory.Builtin("elevationBand", { heights: heightsImage, colors: rampImage })',
    },
    {
        id: "water-mask",
        name: "WaterMask",
        group: "terrain",
        supports: terrainOnly,
        desc: "地表水陆遮罩材质，适合 globe/terrain 场景。",
        previewMode: "water-mask",
        useTerrainOverlay: true,
        previewNote: "当前预览用低洼谷地与边缘汇水规则生成 waterMask，模拟带水陆遮罩的地形效果。",
        create: () => Material.Builtin("waterMask", { waterColor: "#2563eb", landColor: "#16a34a" }),
        code: 'Daisy.MaterialFactory.Builtin("waterMask", { waterColor: "#2563eb", landColor: "#16a34a" })',
    },
];

function smoothstep(edge0, edge1, value) {
    const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

function localTerrainHeight(lon, lat) {
    if (
        lon < terrainBounds.west ||
        lon > terrainBounds.east ||
        lat < terrainBounds.south ||
        lat > terrainBounds.north
    ) {
        return 0;
    }

    const u = (lon - terrainBounds.west) / (terrainBounds.east - terrainBounds.west);
    const v = (lat - terrainBounds.south) / (terrainBounds.north - terrainBounds.south);
    const edgeFade =
        smoothstep(0, 0.14, u) *
        smoothstep(0, 0.14, v) *
        smoothstep(0, 0.14, 1 - u) *
        smoothstep(0, 0.14, 1 - v);
    const ridge =
        Math.sin(u * Math.PI * 5.4 + v * 2.2) * 0.32 +
        Math.sin((u - v) * Math.PI * 6.2 + 0.8) * 0.22 +
        Math.cos((u + v) * Math.PI * 4.1) * 0.16;
    const valley =
        Math.exp(-(((u - 0.56) * (u - 0.56)) / 0.035 + ((v - 0.48) * (v - 0.48)) / 0.09)) * 0.32;
    const height01 = Math.max(0, 0.5 + ridge - valley);
    return terrainBaseHeight + edgeFade * height01 * (terrainMaxHeight - terrainBaseHeight);
}

function parseHexColor(color) {
    const hex = color.replace("#", "");
    const value = Number.parseInt(hex.length === 3
        ? hex.split("").map((char) => char + char).join("")
        : hex, 16);
    return [
        (value >> 16) & 255,
        (value >> 8) & 255,
        value & 255,
    ];
}

function interpolateColor(stops, value) {
    const t = Math.min(1, Math.max(0, value));
    for (let i = 1; i < stops.length; i += 1) {
        const [stop, color] = stops[i];
        const [prevStop, prevColor] = stops[i - 1];
        if (t <= stop) {
            const local = stop === prevStop ? 0 : (t - prevStop) / (stop - prevStop);
            const a = parseHexColor(prevColor);
            const b = parseHexColor(color);
            return [
                Math.round(a[0] + (b[0] - a[0]) * local),
                Math.round(a[1] + (b[1] - a[1]) * local),
                Math.round(a[2] + (b[2] - a[2]) * local),
            ];
        }
    }
    return parseHexColor(stops[stops.length - 1][1]);
}

function terrainGradient(lon, lat) {
    const metersPerDegreeLat = 111320;
    const metersPerDegreeLon = metersPerDegreeLat * Math.cos(Daisy.Math.toRadians(lat));
    const stepLon = (terrainBounds.east - terrainBounds.west) / terrainOverlaySize;
    const stepLat = (terrainBounds.north - terrainBounds.south) / terrainOverlaySize;
    const west = localTerrainHeight(lon - stepLon, lat);
    const east = localTerrainHeight(lon + stepLon, lat);
    const south = localTerrainHeight(lon, lat - stepLat);
    const north = localTerrainHeight(lon, lat + stepLat);
    return {
        dx: (east - west) / (2 * stepLon * metersPerDegreeLon),
        dy: (north - south) / (2 * stepLat * metersPerDegreeLat),
    };
}

function terrainWaterMask(lon, lat, height, slope) {
    const u = (lon - terrainBounds.west) / (terrainBounds.east - terrainBounds.west);
    const v = (lat - terrainBounds.south) / (terrainBounds.north - terrainBounds.south);
    const basin = Math.exp(-(((u - 0.56) * (u - 0.56)) / 0.018 + ((v - 0.47) * (v - 0.47)) / 0.06));
    const channel = Math.exp(-Math.pow((v - 0.24) - Math.sin(u * Math.PI * 2.8) * 0.035, 2) / 0.0009);
    return Math.max(
        smoothstep(760, 160, height) * smoothstep(0.12, 0.015, slope) * 0.9,
        basin * 0.95,
        channel * 0.86,
    );
}

function drawTerrainLegend(ctx, mode, width, height) {
    const x = width - 18;
    const y = 28;
    const h = height - 56;
    const gradient = ctx.createLinearGradient(0, y + h, 0, y);
    if (mode === "aspect-ramp") {
        [
            [0, "#ef4444"], [0.17, "#f59e0b"], [0.34, "#22c55e"],
            [0.5, "#06b6d4"], [0.67, "#3b82f6"], [0.84, "#a855f7"], [1, "#ef4444"],
        ].forEach(([stop, color]) => gradient.addColorStop(stop, color));
    } else if (mode === "water-mask") {
        gradient.addColorStop(0, "#16a34a");
        gradient.addColorStop(1, "#2563eb");
    } else {
        [
            [0, "#244634"], [0.34, "#5f734f"], [0.62, "#b9aa8d"],
            [0.84, "#d7ccb3"], [1, "#f8fafc"],
        ].forEach(([stop, color]) => gradient.addColorStop(stop, color));
    }
    ctx.fillStyle = "rgba(2, 6, 23, 0.58)";
    ctx.fillRect(x - 5, y - 5, 14, h + 10);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, 6, h);
}

function createTerrainOverlayCanvas(mode) {
    const canvas = document.createElement("canvas");
    canvas.width = terrainOverlaySize;
    canvas.height = terrainOverlaySize;
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(canvas.width, canvas.height);
    const elevationStops = [
        [0, "#244634"], [0.34, "#5f734f"], [0.62, "#b9aa8d"],
        [0.84, "#d7ccb3"], [1, "#f8fafc"],
    ];
    const slopeStops = [[0, "#1f3f2c"], [0.48, "#7f8f61"], [0.74, "#c9b17c"], [1, "#f1f5f9"]];
    const aspectStops = [
        [0, "#ef4444"], [0.17, "#f59e0b"], [0.34, "#22c55e"],
        [0.5, "#06b6d4"], [0.67, "#3b82f6"], [0.84, "#a855f7"], [1, "#ef4444"],
    ];
    const bandStops = [[0, "#17412f"], [0.2, "#2f6c43"], [0.4, "#798d55"], [0.6, "#c8a45e"], [0.8, "#d7c29d"], [1, "#f8fafc"]];

    for (let row = 0; row < canvas.height; row += 1) {
        const lat = terrainBounds.north - (row / (canvas.height - 1)) * (terrainBounds.north - terrainBounds.south);
        for (let col = 0; col < canvas.width; col += 1) {
            const lon = terrainBounds.west + (col / (canvas.width - 1)) * (terrainBounds.east - terrainBounds.west);
            const height = localTerrainHeight(lon, lat);
            const height01 = Math.min(1, Math.max(0, (height - terrainBaseHeight) / (terrainMaxHeight - terrainBaseHeight)));
            const gradient = terrainGradient(lon, lat);
            const slope = Math.sqrt(gradient.dx * gradient.dx + gradient.dy * gradient.dy);
            let color;
            let alpha = 226;

            if (mode === "slope-ramp") {
                color = interpolateColor(slopeStops, Math.min(1, slope / terrainSlopeMax));
            } else if (mode === "aspect-ramp") {
                const aspect = (Math.atan2(gradient.dy, -gradient.dx) + Math.PI * 2) % (Math.PI * 2);
                color = interpolateColor(aspectStops, aspect / (Math.PI * 2));
            } else if (mode === "elevation-band") {
                const band = Math.floor(height01 * 7) / 6;
                color = interpolateColor(bandStops, band);
                alpha = 236;
            } else {
                const water = terrainWaterMask(lon, lat, height, slope);
                const land = interpolateColor(elevationStops, height01 * 0.8);
                const waterColor = [37, 99, 235];
                color = [
                    Math.round(land[0] * (1 - water) + waterColor[0] * water),
                    Math.round(land[1] * (1 - water) + waterColor[1] * water),
                    Math.round(land[2] * (1 - water) + waterColor[2] * water),
                ];
                alpha = Math.round(205 + water * 50);
            }

            const i = (row * canvas.width + col) * 4;
            image.data[i] = color[0];
            image.data[i + 1] = color[1];
            image.data[i + 2] = color[2];
            image.data[i + 3] = alpha;
        }
    }
    ctx.putImageData(image, 0, 0);
    drawTerrainLegend(ctx, mode, canvas.width, canvas.height);
    return canvas;
}

function createProceduralTerrain() {
    return new Daisy.CustomHeightmapTerrainProvider({
        width: 64,
        height: 64,
        callback: (x, y, level) => {
            const size = 64;
            const heights = new Float32Array(size * size);
            const n = Math.pow(2, level);
            for (let row = 0; row < size; row += 1) {
                for (let col = 0; col < size; col += 1) {
                    const lon = (x + col / (size - 1)) * (180 / n) - 180;
                    const lat = 90 - (y + row / (size - 1)) * (180 / n);
                    heights[row * size + col] = localTerrainHeight(lon, lat);
                }
            }
            return heights;
        },
    });
}

// ── 4. 响应式状态 ─────────────────────────────────────────────────────────
// selectedId: 当前选中的材质 ID
// groupFilter: 当前选中的分组过滤器
// carrierFilter: 当前选中的载体过滤器
// query: 搜索关键词
// copyLabel: 复制按钮文本（用于反馈）
let selectedId = $state("daisy-grid-glow");
let groupFilter = $state("all");
let carrierFilter = $state("all");
let query = $state("");
let copyLabel = $state("复制代码");
let copyTimer = 0;
let previewMode = "";  // 当前预览模式："objects" | "terrain"
let terrainOverlayLayerId = null;

// $derived: 派生状态，自动更新
// selectedMaterial: 当前选中的材质对象
let selectedMaterial = $derived(materials.find((item) => item.id === selectedId) ?? materials[0]);
// filteredMaterials: 根据过滤条件筛选的材质列表
let filteredMaterials = $derived(materials.filter((item) => {
    const q = query.trim().toLowerCase();
    const matchesGroup = groupFilter === "all" || item.group === groupFilter;
    const matchesCarrier = carrierFilter === "all" || item.supports.includes(carrierFilter);
    const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        groupLabels[item.group].toLowerCase().includes(q);
    return matchesGroup && matchesCarrier && matchesQuery;
}));

// previewFeatures: 当前预览的特征列表（用于清理）
// previewEntities: 当前预览的实体列表（用于清理）
let previewFeatures = [];
let previewEntities = [];

// previewAnchors: 各载体类型的预览锚点位置
// 点、面、线、球体分布在中心坐标周围，避免重叠
const previewAnchors = {
    point: { lon: centerLon - 2.0, lat: centerLat - 0.5, height: 92000 },
    surface: { lon: centerLon - 0.3, lat: centerLat + 0.3, height: 8200 },
    line: { lon: centerLon + 0.0, lat: centerLat - 1.0, height: 112000 },
    solid: { lon: centerLon + 2.0, lat: centerLat + 0.5, height: 118000 },
};

// ── 5. 辅助函数 ─────────────────────────────────────────────────────────
// supports: 检查材质是否支持指定载体
function supports(item, carrier) {
    return item.supports.includes(carrier);
}

function supportCount(carrier) {
    return materials.filter((item) => item.supports.includes(carrier)).length;
}

function supportText(item) {
    return item.supports.map((carrier) => `${carrierLabels[carrier]}可用`).join(" / ");
}

function carrierClass(item, carrier) {
    return supports(item, carrier) ? "support-on" : "support-off";
}

function createEntity(name, lon, lat, height) {
    const entity = engine.createEntity(name);
    entity.position = C3.fromDegrees(lon, lat, height);
    previewEntities.push(entity);
    return entity;
}

const pointEntity = createEntity("MaterialPreview-Point", previewAnchors.point.lon, previewAnchors.point.lat, previewAnchors.point.height);
const surfaceEntity = createEntity("MaterialPreview-Surface", previewAnchors.surface.lon, previewAnchors.surface.lat, previewAnchors.surface.height);
const lineEntity = createEntity("MaterialPreview-Line", previewAnchors.line.lon, previewAnchors.line.lat, previewAnchors.line.height);
const solidEntity = createEntity("MaterialPreview-Sphere", previewAnchors.solid.lon, previewAnchors.solid.lat, previewAnchors.solid.height);

function addPreview(entity, feature) {
    const created = entity.addFeature(feature);
    previewFeatures.push({ entity, id: created.id });
    return created;
}

function clearPreview() {
    previewFeatures.forEach(({ entity, id }) => {
        try {
            entity.removeFeatureById(id);
        } catch {
        }
    });
    previewFeatures = [];
}

function resetMainCamera() {
    try {
        engine.removeCelestial?.();
        engine.camera.removeTrackedDaisyEntity?.();
    } catch {
    }

    try {
        if (!engine.is3D?.()) {
            engine.morphTo3D?.();
        }
        engine.camera.unlockView?.();
        engine.completeMorph();
    } catch {
    }
}

function getObjectPreviewCameraTarget(item) {
    const activeAnchors = ["point", "surface", "line", "solid"]
        .filter((carrier) => supports(item, carrier))
        .map((carrier) => previewAnchors[carrier]);
    const anchors = activeAnchors.length ? activeAnchors : [previewAnchors.surface, previewAnchors.solid];
    const lon = anchors.reduce((sum, anchor) => sum + anchor.lon, 0) / anchors.length;
    const lat = anchors.reduce((sum, anchor) => sum + anchor.lat, 0) / anchors.length;
    const height = Math.max(...anchors.map((anchor) => anchor.height), 70000);
    return C3.fromDegrees(lon, lat, height);
}

function getObjectPreviewRange(item) {
    const activeCount = ["point", "surface", "line", "solid"].filter((carrier) => supports(item, carrier)).length;
    if (activeCount <= 1) return 420000;
    if (activeCount === 2) return 620000;
    return 760000;
}

function setObjectPreviewCamera(item = selectedMaterial) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            try {
                resetMainCamera();
                const target = getObjectPreviewCameraTarget(item);
                const offset = new Daisy.HeadingPitchRange(
                    Daisy.Math.toRadians(-6),
                    Daisy.Math.toRadians(-55),
                    getObjectPreviewRange(item),
                );
                engine.camera.lookAt(target, offset);
                engine.camera.unlockView();
                engine.triggerUpdateOnce?.();
            } catch {
            }
        });
    });
}

function removeTerrainOverlay() {
    if (!terrainOverlayLayerId) return;
    try {
        engine.geoLayer.removeImageryLayer(terrainOverlayLayerId);
    } catch {
    }
    terrainOverlayLayerId = null;
}

function applyTerrainOverlay(item) {
    removeTerrainOverlay();
    const canvas = createTerrainOverlayCanvas(item.previewMode ?? item.id);
    const provider = new Daisy.SingleTileImageryProvider({
        url: canvas.toDataURL("image/png"),
        tileWidth: canvas.width,
        tileHeight: canvas.height,
        rectangle: Daisy.Rectangle.fromDegrees(
            terrainBounds.west,
            terrainBounds.south,
            terrainBounds.east,
            terrainBounds.north,
        ),
    });
    terrainOverlayLayerId = engine.geoLayer.addImageryProvider(provider, {
        alpha: terrainOverlayAlpha,
        brightness: 1.08,
        contrast: 1.12,
    });
    engine.geoLayer.raiseLayerToTop(terrainOverlayLayerId);
}

function applyEarthImagery() {
    removeTerrainOverlay();
    engine.geoLayer.clearImagery?.();
    engine.geoLayer.setBaseImagery({
        type: Daisy.GeoImageryType.XYZ,
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        minLevel: 0,
        maxLevel: 19,
    });
    engine.geoLayer.setGlobeOptions({
        baseColor: Color.fromCssColorString("#2f3f2f"),
        showGroundAtmosphere: true,
    });
}

function applyObjectPreviewScene() {
    previewMode = "objects";
    try {
        removeTerrainOverlay();
        resetMainCamera();
        engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
        engine.geoLayer.setGlobeOptions({
            show: true,
            baseColor: Color.fromCssColorString("#1f2937"),
            showGroundAtmosphere: true,
            depthTestAgainstTerrain: false,
            material: null,
        });
    } catch {
    }
}

function applyTerrainPreviewScene(item) {
    if (previewMode !== "terrain") {
        previewMode = "terrain";
        requestAnimationFrame(() => {
            setTerrainPreviewCamera();
        });
    }

    try {
        engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Custom, provider: createProceduralTerrain() });
    } catch {
    }

    try {
        if (item.useTerrainOverlay) {
            engine.geoLayer.setGlobeOptions({ show: true, depthTestAgainstTerrain: false, material: null });
            applyTerrainOverlay(item);
        } else {
            removeTerrainOverlay();
            engine.geoLayer.setGlobeOptions({
                show: true,
                depthTestAgainstTerrain: false,
                material: item.create("terrain"),
            });
        }
    } catch {
    }

    requestAnimationFrame(() => {
        setTerrainPreviewCamera();
    });
}

function setTerrainPreviewCamera() {
    try {
        resetMainCamera();
        engine.camera.lookAt(
            C3.fromDegrees(terrainCenter.lon, terrainCenter.lat, terrainCenter.height),
            new Daisy.HeadingPitchRange(
                Daisy.Math.toRadians(-28),
                Daisy.Math.toRadians(-34),
                42000,
            ),
        );
        engine.camera.unlockView();
        engine.triggerUpdateOnce?.();
    } catch {
    }
}

function renderPreview(item = selectedMaterial) {
    clearPreview();
    const hasPoint = supports(item, "point");
    const hasLine = supports(item, "line");
    const hasSurface = supports(item, "surface");
    const hasSolid = supports(item, "solid");
    const createPreviewMaterial = (carrier) => item.previewCreate?.(carrier) ?? item.create(carrier);

    if (supports(item, "terrain")) {
        applyTerrainPreviewScene(item);
        engine.triggerUpdateOnce?.();
        return;
    }

    applyObjectPreviewScene();

    if (hasPoint) {
        addPreview(pointEntity, new Daisy.PointFeature({
            sizePx: 30,
            color: item.pointColor ?? "#38bdf8",
            outlineColor: "#e0f2fe",
            outlineWidth: 3,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }));
    }

    if (hasSurface) {
        const surfLon = previewAnchors.surface.lon;
        const surfLat = previewAnchors.surface.lat;
        const sw = surfLon - 1.1;
        const ss = surfLat - 0.8;
        const ne = surfLon + 1.1;
        const nn = surfLat + 0.8;
        addPreview(surfaceEntity, new Daisy.RectangleFeature({
            rectangle: Daisy.Rectangle.fromDegrees(sw, ss, ne, nn),
            height: 8200,
            material: createPreviewMaterial("surface"),
            vertexFormat: texturedVertexFormat,
        }));
    }

    if (hasLine) {
        addPreview(lineEntity, new Daisy.PolylineFeature({
            pathway: [
                C3.fromDegrees(centerLon - 0.46, centerLat - 0.62, 118000),
                C3.fromDegrees(centerLon + 0.06, centerLat - 0.44, 162000),
                C3.fromDegrees(centerLon + 0.62, centerLat - 0.64, 120000),
            ],
            width: 12,
            material: createPreviewMaterial("line"),
            arcType: Daisy.ArcType.NONE,
            clampToGround: false,
        }));
    }

    if (hasSolid) {
        addPreview(solidEntity, new Daisy.SphereFeature({
            radius: 50000,
            material: createPreviewMaterial("solid"),
            vertexFormat: texturedVertexFormat,
        }));
    }

    engine.triggerUpdateOnce?.();
    setObjectPreviewCamera(item);
}

function selectMaterial(id) {
    selectedId = id;
    renderPreview(materials.find((item) => item.id === id) ?? materials[0]);
}

function setGroupFilter(id) {
    groupFilter = id;
}

function setCarrierFilter(id) {
    carrierFilter = id;
}

async function copyCode() {
    try {
        await navigator.clipboard.writeText(selectedMaterial.code);
        copyLabel = "已复制";
    } catch {
        copyLabel = "复制失败";
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
        copyLabel = "复制代码";
    }, 1200);
}

try {
    engine.setTerrainDetectionEnabled?.(false);
    applyEarthImagery();
} catch {
}

engine.setUpdateMaxFps?.(false);
engine.play?.();
renderPreview(selectedMaterial);

registerCleanup?.(() => {
    clearTimeout(copyTimer);
    clearPreview();
    previewEntities.forEach((entity) => {
        try {
            engine.removeEntity(entity);
        } catch {
        }
    });
    try {
        engine.geoLayer.setGlobeOptions({ material: null });
        removeTerrainOverlay();
        engine.setTerrainDetectionEnabled?.(true);
        engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
    } catch {
    }
});

__log("Materials Gallery: 交互改为材质浏览器；每个材质都有分类、适用载体、说明和 Daisy 调用代码。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="材质浏览器" width="330px" padding="0">
    <div class="mg-browser">
        <div class="mg-header">
            <div>
                <div class="mg-eyebrow">Materials Gallery</div>
                <div class="mg-title">Daisy 材质浏览器</div>
            </div>
            <div class="mg-count">{materials.length}</div>
        </div>

        <div class="mg-search">
            <input type="search" placeholder="搜索材质..." bind:value={query} aria-label="搜索材质" />
        </div>

        <div class="mg-filters">
            <div class="mg-filter-block">
                <div class="mg-filter-label">分类</div>
                <div class="mg-segmented">
                    {#each groupFilters as item}
                        <button type="button" class:active={groupFilter === item.id} onclick={() => setGroupFilter(item.id)}>
                            {item.label}
                        </button>
                    {/each}
                </div>
            </div>
            <div class="mg-filter-block">
                <div class="mg-filter-label">适用载体</div>
                <div class="mg-carrier">
                    {#each carrierFilters as item}
                        <button type="button" class:active={carrierFilter === item.id} onclick={() => setCarrierFilter(item.id)}>
                            <span>{item.label}</span>
                            {#if item.id !== "all"}
                                <b>{supportCount(item.id)}</b>
                            {/if}
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <div class="mg-list">
            {#each filteredMaterials as item}
                <button type="button" class:active={selectedId === item.id} onclick={() => selectMaterial(item.id)}>
                    <div class="mg-card-top">
                        <div>
                            <strong>{item.name}</strong>
                            <span>{groupLabels[item.group]}</span>
                        </div>
                        <div class="mg-badges">
                            {#each carrierOrder as carrier}
                                <i class={carrierClass(item, carrier)} title={carrierNotes[carrier]}>{carrierLabels[carrier]}</i>
                            {/each}
                        </div>
                    </div>
                    <p>{item.desc}</p>
                </button>
            {/each}
            {#if filteredMaterials.length === 0}
                <div class="mg-empty">没有匹配的材质</div>
            {/if}
        </div>
    </div>
</DemoPanel>

<DemoPanel title="材质详情" width="450px" right="12px" padding="14px">
    <div class="mg-detail-head">
        <div>
            <div class="mg-eyebrow">{groupLabels[selectedMaterial.group]}</div>
            <div class="mg-detail-name">{selectedMaterial.name}<span>{supportText(selectedMaterial)}</span></div>
        </div>
        <button type="button" class="mg-copy" onclick={copyCode}>{copyLabel}</button>
    </div>

    <p class="mg-desc">{selectedMaterial.desc}</p>
    {#if selectedMaterial.previewNote}
        <p class="mg-preview-note">{selectedMaterial.previewNote}</p>
    {/if}

    <pre class="mg-code">{selectedMaterial.code}</pre>
</DemoPanel>

<style>
/* ── Panel 1: 材质浏览器 ── */
.mg-browser {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
.mg-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 14px 10px;
    border-bottom: 1px solid var(--panel-border);
}
.mg-eyebrow {
    font-size: 10px;
    font-weight: 600;
    color: var(--color-accent-soft);
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.mg-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--panel-text-bright);
    margin-top: 1px;
}
.mg-count {
    min-width: 32px; height: 24px;
    display: grid; place-items: center;
    border-radius: 5px;
    background: var(--color-accent-muted);
    color: var(--panel-text-bright);
    font-weight: 700;
    font-size: 12px;
}
.mg-search {
    padding: 10px 14px 6px;
}
.mg-search input {
    width: 100%; height: 34px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    outline: none;
    background: var(--panel-bg-embed);
    color: var(--panel-text);
    padding: 0 10px;
    font-size: 13px;
}
.mg-search input:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-muted);
}
.mg-filters {
    padding: 4px 14px 6px;
}
.mg-filter-block {
    padding: 6px 0;
}
.mg-filter-block + .mg-filter-block {
    border-top: 1px solid var(--panel-border);
}
.mg-filter-label {
    margin-bottom: 6px;
    font-size: 11px;
    color: var(--panel-text-muted);
    font-weight: 500;
}
.mg-segmented,
.mg-carrier {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.mg-segmented button,
.mg-carrier button {
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-muted);
    cursor: pointer;
    font-size: 12px;
    transition: all 0.12s;
    font-family: inherit;
}
.mg-segmented button {
    height: 28px;
    padding: 0 10px;
}
.mg-carrier button {
    height: 28px;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}
.mg-carrier b {
    min-width: 17px; height: 17px;
    display: grid; place-items: center;
    border-radius: 4px;
    background: var(--panel-btn-bg);
    color: var(--panel-text-bright);
    font-size: 10px;
}
.mg-segmented button:hover,
.mg-carrier button:hover {
    border-color: var(--color-accent);
    color: var(--panel-text);
}
.mg-segmented button.active,
.mg-carrier button.active {
    border-color: var(--color-accent);
    background: var(--color-accent-muted);
    color: var(--panel-text);
}
.mg-list {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 4px 10px 10px;
}
.mg-list button {
    width: 100%;
    display: block;
    text-align: left;
    border: 1px solid transparent;
    border-radius: 7px;
    background: transparent;
    color: inherit;
    padding: 9px 10px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.12s;
}
.mg-list button + button {
    margin-top: 3px;
}
.mg-list button:hover {
    background: var(--panel-btn-bg);
}
.mg-list button.active {
    border-color: var(--color-accent-soft);
    background: var(--color-accent-muted);
}
.mg-card-top {
    display: flex;
    gap: 8px;
    justify-content: space-between;
    align-items: flex-start;
}
.mg-card-top strong {
    display: block;
    color: var(--panel-text);
    font-size: 13px;
    line-height: 1.25;
}
.mg-card-top span {
    display: block;
    margin-top: 2px;
    color: var(--panel-text-muted);
    font-size: 11px;
}
.mg-list button p {
    margin: 6px 0 0;
    color: var(--panel-text-muted);
    font-size: 12px;
    line-height: 1.4;
}
.mg-badges {
    display: flex;
    gap: 3px;
    flex-shrink: 0;
}
.mg-badges i {
    width: 22px; height: 20px;
    display: grid; place-items: center;
    border-radius: 4px;
    font-style: normal;
    font-size: 11px;
    font-weight: 700;
}
.mg-badges .support-on { background: var(--color-success-muted); color: var(--color-success); }
.mg-badges .support-off { background: var(--panel-bg-card); color: var(--panel-text-muted); }
.mg-empty {
    margin: 16px 6px;
    border: 1px dashed var(--panel-border);
    border-radius: 6px;
    color: var(--panel-text-muted);
    padding: 16px;
    text-align: center;
    font-size: 12px;
}

/* ── Panel 2: 材质详情 ── */
.mg-detail-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
}
.mg-detail-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--panel-text-bright);
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 2px;
}
.mg-detail-name span {
    color: var(--color-success);
    font-size: 12px;
    font-weight: 600;
}
.mg-copy {
    height: 30px;
    padding: 0 12px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-muted);
    cursor: pointer;
    font-size: 12px;
    flex-shrink: 0;
    font-family: inherit;
    transition: all 0.12s;
}
.mg-copy:hover {
    border-color: var(--color-accent);
    color: var(--panel-text);
}
.mg-desc {
    margin: 0 0 12px;
    color: var(--panel-text-muted);
    line-height: 1.55;
    font-size: 13px;
}
.mg-preview-note {
    margin: -4px 0 12px;
    border: 1px solid var(--color-warning-muted);
    border-radius: 6px;
    background: var(--color-warning-muted);
    color: var(--color-warning);
    padding: 8px 10px;
    font-size: 12px;
    line-height: 1.5;
}
.mg-code {
    margin: 0;
    padding: 12px;
    min-height: 100px;
    max-height: auto;
    overflow: auto;
    border-radius: 6px;
    border: 1px solid var(--panel-border);
    background: var(--panel-bg-embed);
    color: var(--panel-text-bright);
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 12px;
    line-height: 1.55;
}
</style>
