<script>
// =============================================================================
// CustomMaterial.svelte - 自定义 Shader / Material Demo
// -----------------------------------------------------------------------------
// 本文件演示用户侧如何只通过 Daisy API 编写自定义材质：
//   - Daisy GLSL 字符串：MaterialFactory.Custom / Shader 自动识别并转换
//   - Daisy.ShaderParams: 将动态 Entity 状态绑定为 uniform
//   - Daisy.MaterialFactory.Custom(): 一次性材质实例
//   - Daisy.Shader + Daisy.shaderManager: 注册复用型材质
//   - Daisy.Color.*: 颜色与 uniform 不暴露底层品牌
// =============================================================================
let { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

const texturedVertexFormat = Daisy.VertexFormat.POSITION_NORMAL_AND_ST ?? Daisy.VertexFormat.DEFAULT;

const pulseSource = `
daisy_material daisy_getMaterial(daisy_materialInput inParams)
{
    daisy_material material = daisy_getDefaultMaterial(inParams);
    vec2 uv = inParams.uv - vec2(0.5);
    float dist = length(uv);
    float rings = abs(fract(dist * 3.0 - phaseTime * 0.62) - 0.5);
    float wave = smoothstep(0.22, 0.02, rings);
    float core = smoothstep(0.34, 0.0, dist);
    vec3 color = mix(baseColor.rgb, pulseColor.rgb, max(wave, core * 0.65));
    material.diffuse = color;
    material.emission = pulseColor.rgb * wave * 0.42;
    material.alpha = opacity * (0.32 + max(wave, core) * 0.68);
    return material;
}
`;

const sweepShaderType = "DaisyPlaygroundPatrolSweep";

class PatrolSweepShader extends Daisy.Shader {
    type = sweepShaderType;
    uniforms = {
        baseColor: Daisy.Color.BLUE.withAlpha(0.36),
        sweepColor: Daisy.Color.ORANGE,
        gridColor: Daisy.Color.CYAN.withAlpha(0.44),
        targetColor: Daisy.Color.YELLOW,
        targetPosition: Daisy.Cartesian3.ZERO,
        opacity: 0.82,
    };
    glsl = `
daisy_material daisy_getMaterial(daisy_materialInput inParams)
{
    daisy_material material = daisy_getDefaultMaterial(inParams);
    vec2 uv = inParams.uv;
    vec2 centered = uv - vec2(0.5);
    float angle = atan(centered.y, centered.x);
    float normalizedAngle = fract(angle / daisy_twoPi + 1.0);
    float scan = fract(daisy_frameNumber / 130.0);
    float beam = smoothstep(0.18, 0.0, abs(normalizedAngle - scan));
    float grid = max(step(0.965, fract(uv.x * 12.0)), step(0.965, fract(uv.y * 8.0)));
    vec3 targetDirectionEC = daisy_directionTo(inParams, targetPosition);
    float targetLight = max(dot(inParams.normalEC, targetDirectionEC), 0.0);
    vec3 base = mix(baseColor.rgb, gridColor.rgb, grid * 0.55);
    vec3 color = mix(base, sweepColor.rgb, beam);
    color = mix(color, targetColor.rgb, targetLight * 0.42);
    material.diffuse = color;
    material.emission = sweepColor.rgb * beam * 0.48
        + gridColor.rgb * grid * 0.16
        + targetColor.rgb * targetLight * 0.18;
    material.alpha = opacity * (0.38 + beam * 0.62 + grid * 0.18);
    return material;
}
`;
}

Daisy.shaderManager.registerShader(new PatrolSweepShader());
Daisy.shaderManager.boot();

try {
    engine.setTerrainDetectionEnabled?.(false);
    engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
    engine.geoLayer.setGlobeOptions({
        baseColor: Daisy.Color.fromCssColorString("#152238"),
        showGroundAtmosphere: true,
        depthTestAgainstTerrain: false,
    });
} catch {
}

const customEntity = engine.createEntity("CustomMaterial-Instance");
customEntity.position = Daisy.Cartesian3.fromDegrees(116.05, 39.82, 0);
customEntity.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.SELF_ENTITY,
    semiMajorAxis: 135000,
    semiMinorAxis: 135000,
    height: 5200,
    vertexFormat: texturedVertexFormat,
    material: Daisy.MaterialFactory.Custom("DaisyPlaygroundPulse", {
        baseColor: Daisy.Color.BLUE.withAlpha(0.42),
        pulseColor: Daisy.Color.CYAN,
        phaseTime: Daisy.ShaderParams.timeSeconds(engine),
        opacity: 0.86,
    }, pulseSource),
    outline: true,
    outlineColor: Daisy.Color.CYAN.withAlpha(0.7),
}));

const orbitCenter = Daisy.Cartesian3.fromDegrees(116.66, 39.86, 28000);
const orbitFrame = Daisy.Transforms.eastNorthUpToFixedFrame(orbitCenter);
const orbitStart = Daisy.JulianDate.clone(engine.getCurrentTime());
const orbitLocal = new Daisy.Cartesian3();
const orbitResult = new Daisy.Cartesian3();
const targetEntity = engine.createEntity("CustomMaterial-MovingTarget");
targetEntity.position = new Daisy.CallbackProperty((time, result) => {
    const elapsed = Daisy.JulianDate.secondsDifference(time, orbitStart);
    const angle = elapsed * 0.22;
    Daisy.Cartesian3.fromElements(
        Math.cos(angle) * 155000,
        Math.sin(angle) * 105000,
        30000 + Math.sin(angle * 1.7) * 18000,
        orbitLocal,
    );
    return Daisy.Matrix4.multiplyByPoint(orbitFrame, orbitLocal, result ?? orbitResult);
}, false);
targetEntity.addFeature(new Daisy.SphereFeature({
    radius: 12000,
    material: Daisy.MaterialFactory.Solid({color: Daisy.Color.YELLOW}),
}));

const shaderEntity = engine.createEntity("CustomMaterial-RegisteredShader");
shaderEntity.position = Daisy.Cartesian3.fromDegrees(116.66, 39.86, 0);
shaderEntity.addFeature(new Daisy.RectangleFeature({
    rectangle: Daisy.Rectangle.fromDegrees(116.15, 39.42, 117.17, 40.28),
    height: 6200,
    vertexFormat: texturedVertexFormat,
    material: Daisy.MaterialFactory.Registered(sweepShaderType, {
        baseColor: Daisy.Color.BLUE.withAlpha(0.32),
        sweepColor: Daisy.Color.ORANGE,
        gridColor: Daisy.Color.CYAN.withAlpha(0.5),
        targetColor: Daisy.Color.YELLOW,
        targetPosition: Daisy.ShaderParams.entityPosition(targetEntity),
        opacity: 0.82,
    }),
    outline: true,
    outlineColor: Daisy.Color.ORANGE.withAlpha(0.74),
}));

requestAnimationFrame(() => {
    try {
        engine.camera.lookAt(
            Daisy.Cartesian3.fromDegrees(116.45, 39.86, 2000),
            new Daisy.HeadingPitchRange(
                Daisy.Math.toRadians(-12),
                Daisy.Math.toRadians(-58),
                520000,
            ),
        );
        engine.camera.unlockView?.();
        engine.triggerUpdateOnce?.();
    } catch {
    }
});

registerCleanup?.(() => {
    try {
        engine.removeEntity(customEntity);
        engine.removeEntity(shaderEntity);
        engine.removeEntity(targetEntity);
        engine.setTerrainDetectionEnabled?.(true);
    } catch {
    }
});

__log("CustomMaterial: Daisy GLSL 已绑定移动 Entity 的实时位置参数。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="自定义材质" width="360px" padding="14px">
    <div class="cm-panel">
        <div class="cm-row">
            <span class="cm-swatch pulse"></span>
            <div>
                <strong>MaterialFactory.Custom</strong>
                <p>Pulse rings / {Daisy.Color.CYAN.toCssColorString()}</p>
            </div>
        </div>
        <div class="cm-row">
            <span class="cm-swatch sweep"></span>
            <div>
                <strong>Shader + Registered</strong>
                <p>Patrol sweep / {Daisy.Color.ORANGE.toCssColorString()}</p>
            </div>
        </div>
        <div class="cm-row">
            <span class="cm-swatch target"></span>
            <div>
                <strong>ShaderParams.entityPosition</strong>
                <p>Moving target / {Daisy.Color.YELLOW.toCssColorString()}</p>
            </div>
        </div>
        <pre>{`Daisy.MaterialFactory.Custom(type, uniforms, source)\nDaisy.ShaderParams.entityPosition(target)`}</pre>
    </div>
</DemoPanel>

<style>
.cm-panel {
    display: grid;
    gap: 10px;
}
.cm-row {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    align-items: center;
}
.cm-row strong {
    display: block;
    color: var(--panel-text-bright);
    font-size: 13px;
    line-height: 1.2;
}
.cm-row p {
    margin: 3px 0 0;
    color: var(--panel-text-muted);
    font-size: 12px;
}
.cm-swatch {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1px solid var(--panel-border);
}
.cm-swatch.pulse {
    background: #22d3ee;
}
.cm-swatch.sweep {
    background: #fb923c;
}
.cm-swatch.target {
    background: #facc15;
}
.cm-panel pre {
    margin: 4px 0 0;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid var(--panel-border);
    background: var(--panel-bg-embed);
    color: var(--panel-text-bright);
    font-size: 12px;
    line-height: 1.5;
    white-space: pre-wrap;
}
</style>
