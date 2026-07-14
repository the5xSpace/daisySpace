<script>
// =============================================================================
// GpuCompute Demo — GPU 计算测试
//
// 验证 gpu-io 的 GPUComposer/GPULayer/GPUProgram 管线是否正常运行，
// 以及 GpuDeviceManager 的 offscreen context 创建是否成功。
//
// 测试流程：
// 1. 检查浏览器是否支持 gpu-io（GpuDeviceManager.isSupported）
// 2. 创建 offscreen WebGL2 composer
// 3. 编译 fragment shader，传入两个 Float32Array
// 4. 执行 GPU 计算：out = 3 * inputA + 7 * inputB
// 5. 读取结果并验证
//
// 关键 API：
// - Daisy.GpuDeviceManager.isSupported() — 检查浏览器支持
// - Daisy.GpuDeviceManager.createComposer() — 创建 GPU 计算器
// - new GPUProgram(composer, { fragmentShader, uniforms })
// - new GPULayer(composer, { type, dimensions, array })
// - composer.step({ program, input, output })
// =============================================================================

import { GPUComposer, GPULayer, GPUProgram, FLOAT, NEAREST, CLAMP_TO_EDGE } from "gpu-io";

let { engine: _engine, daisy: Daisy, container: _container, log: __log, registerCleanup } = $props();

const { GpuDeviceManager } = Daisy;

let status = $state("initializing...");
let result = $state("");
let supported = $state(false);
let costMs = $state(0);

async function runGpuTest() {
    supported = GpuDeviceManager.isSupported();
    if (!supported) {
        status = "gpu-io not supported in this browser";
        return;
    }

    status = "creating composer...";
    let composer;
    try {
        composer = await GpuDeviceManager.createComposer();
    } catch (e) {
        status = `composer failed: ${e}`;
        return;
    }

    status = "compiling shader...";
    try {
        const program = new GPUProgram(composer, {
            name: "gpu-compute-demo",
            fragmentShader: `
                in vec2 v_uv;
                uniform float u_a;
                uniform float u_b;
                out vec4 out_result;
                void main() {
                    float x = v_uv.x;
                    float y = v_uv.y;
                    float val = u_a * x + u_b * y;
                    out_result = vec4(val, val * val, x * y, 1.0);
                }
            `,
            uniforms: [
                { name: "u_a", value: 0, type: FLOAT },
                { name: "u_b", value: 0, type: FLOAT },
            ],
        });

        const W = 4, H = 1;
        const inputA = new Float32Array([1, 2, 3, 4]);
        const inputB = new Float32Array([5, 6, 7, 8]);

        const layerA = new GPULayer(composer, {
            name: "inputA", type: FLOAT, numComponents: 1,
            dimensions: [W, H], filter: NEAREST, wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
            array: inputA,
        });
        const layerB = new GPULayer(composer, {
            name: "inputB", type: FLOAT, numComponents: 1,
            dimensions: [W, H], filter: NEAREST, wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
            array: inputB,
        });
        const output = new GPULayer(composer, {
            name: "output", type: FLOAT, numComponents: 4,
            dimensions: [W, H], filter: NEAREST, wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
        });

        program.setUniform("u_a", 3, FLOAT);
        program.setUniform("u_b", 7, FLOAT);

        status = "dispatching...";
        const t0 = performance.now();
        composer.step({ program, input: [layerA, layerB], output });
        const raw = await output.getValuesAsync();
        costMs = performance.now() - t0;

        const outArr = new Float32Array(raw.buffer ?? raw);
        let lines = "";
        for (let i = 0; i < W; i++) {
            const val = 3 * inputA[i] + 7 * inputB[i];
            lines += `pixel[${i}] = (${outArr[i*4].toFixed(1)}, ${outArr[i*4+1].toFixed(1)}, ${outArr[i*4+2].toFixed(1)}), expected first=${val.toFixed(1)}\n`;
        }
        result = lines;

        layerA.dispose();
        layerB.dispose();
        output.dispose();

        status = "done";
    } catch (e) {
        status = `error: ${e?.message ?? e}`;
    }
}

runGpuTest();
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="GPU 计算测试">
    <div class="head">
        <div class="eyebrow">gpu-io Compute</div>
        <h2>GPU 计算测试</h2>
    </div>

    <div class="status-row">
        <span class="label">状态</span>
        <span class="value">{status}</span>
    </div>
    <div class="status-row">
        <span class="label">支持</span>
        <span class="value">{supported ? "✅" : "❌"}</span>
    </div>
    <div class="status-row">
        <span class="label">耗时</span>
        <span class="value">{costMs.toFixed(2)} ms</span>
    </div>

    {#if result}
        <pre class="result">{result}</pre>
    {/if}
</DemoPanel>

<style>
.head { margin-bottom: 12px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 16px; line-height: 1.2; }
    .status-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
    .status-row .label { color: var(--ds-overlay-text-label); }
    .status-row .value { color: var(--panel-text-bright); font-variant-numeric: tabular-nums; }
    .result { margin-top: 10px; padding: 8px; border-radius: 6px; background: var(--ds-overlay-embed-bg); font-size: 11px; line-height: 1.6; white-space: pre-wrap; }
</style>
