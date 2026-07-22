# GPU General-Purpose Computing

DaisySpace-Sdk ships a built-in WebGL2-based GPGPU pipeline. It performs general-purpose GPU computation via an off-screen WebGL context and shaders, with no WebGPU dependency.

## Architecture

```
GpuDeviceManager（设备管理器，单例）
  └── GPUComposer（gpu-io 计算调度器）
        ├── GPULayer（纹理化输入/输出）
        ├── GPUProgram（fragment shader 程序）
        └── step({ program, input, output })（执行计算）
```

The underlying layer is the [gpu-io](https://github.com/amandaghassaei/gpu-io) library. It encodes `Float32Array` data as WebGL textures, runs parallel computation in a fragment shader, then reads results back to the CPU.

## GpuDeviceManager

[GpuDeviceManager](/en/api/classes/GpuDeviceManager) is the device-level manager, exposing static methods:

```typescript
import * as Daisy from "daisy-space-sdk"

// 检测浏览器是否支持
if (!Daisy.GpuDeviceManager.isSupported()) {
    console.warn("当前浏览器不支持 WebGL2，无法使用 GPU 计算")
    return
}

// 创建 composer（返回单例，首次调用时初始化）
const composer = await Daisy.GpuDeviceManager.createComposer()

// 获取已有 composer（不创建新实例）
const existing = Daisy.GpuDeviceManager.getComposer()

// 销毁（释放 offscreen WebGL 上下文）
Daisy.GpuDeviceManager.destroy()
```

`createComposer()` internally creates a hidden `<canvas>` element and initializes `GPUComposer`; all subsequent GPU computations share the same context.

## GPUComposer

`GPUComposer` is the compute-scheduling core. Because it is already managed by `GpuDeviceManager`, direct instantiation is usually unnecessary. Create one manually only when an isolated context is needed:

```typescript
import { GPUComposer } from "gpu-io"

const canvas = document.createElement("canvas")
canvas.width = 4; canvas.height = 4
const composer = new GPUComposer({ canvas })
```

## GPUProgram

`GPUProgram` compiles a fragment shader and manages uniform variables:

```typescript
import { GPUProgram, FLOAT } from "gpu-io"

const program = new GPUProgram(composer, {
    name: "my-kernel",
    fragmentShader: `
        in vec2 v_uv;
        uniform float u_scale;
        uniform sampler2D u_inputA;
        uniform sampler2D u_inputB;
        out vec4 out_result;
        void main() {
            float a = texture(u_inputA, v_uv).r;
            float b = texture(u_inputB, v_uv).r;
            float val = u_scale * (a + b);
            out_result = vec4(val, val, val, 1.0);
        }
    `,
    uniforms: [
        { name: "u_scale", value: 0, type: FLOAT },
    ],
})

// 运行时设置 uniform
program.setUniform("u_scale", 2.5, FLOAT)
```

### Built-in Texture Naming Convention

The input/output `GPULayer` objects passed to GPUComposer `step()` are auto-bound in order:
- The 0th input layer is bound as `u_input` (alias when there is a single input) or is determined by its `name` property
- Access it in the shader via `texture(layerSamplerName, v_uv)`
- The output layer writes to `out_result` (`out vec4`)

## GPULayer

`GPULayer` wraps a JavaScript typed array as a GPU texture:

```typescript
import { GPULayer, FLOAT, NEAREST, CLAMP_TO_EDGE } from "gpu-io"

const W = 4, H = 1
const data = new Float32Array([1, 2, 3, 4])

// 输入层（含数据）
const inputLayer = new GPULayer(composer, {
    name: "inputA",
    type: FLOAT,              // 数据类型
    numComponents: 1,         // 每像素分量数（1=R, 4=RGBA）
    dimensions: [W, H],       // 纹理尺寸 [width, height]
    filter: NEAREST,          // 采样方式（NEAREST 保证逐像素精确）
    wrapX: CLAMP_TO_EDGE,     // 边界处理
    wrapY: CLAMP_TO_EDGE,
    array: data,              // 初始数据（Float32Array）
})

// 输出层（不传 array，由 shader 写入）
const outputLayer = new GPULayer(composer, {
    name: "output",
    type: FLOAT,
    numComponents: 4,
    dimensions: [W, H],
    filter: NEAREST,
    wrapX: CLAMP_TO_EDGE,
    wrapY: CLAMP_TO_EDGE,
})
```

### Key Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Layer name (corresponds to the sampler uniform name in the shader) |
| `type` | GPULayerType | Data type (`FLOAT` / `BYTE` / `UNSIGNED_BYTE`, etc.) |
| `numComponents` | `number` | Components per pixel (1 / 2 / 3 / 4) |
| `dimensions` | `[number, number]` | Texture width and height |
| `array` | TypedArray | Input data (omit for output layers) |
| `filter` | FilterMode | `NEAREST` (exact) or `LINEAR` (interpolated) |
| `wrapX` / `wrapY` | WrapMode | `CLAMP_TO_EDGE` / `REPEAT`, etc. |

## Executing Computation

```typescript
// 执行一次 GPU 计算
composer.step({
    program,                    // GPUProgram 实例
    input: [inputLayer],        // 输入层数组
    output: outputLayer,        // 输出层
})

// 读回结果到 CPU
const raw = await outputLayer.getValuesAsync()
const resultArray = new Float32Array(raw.buffer ?? raw)
```

`step()` is synchronous (submits a GPU command), while `getValuesAsync()` is asynchronous (requires `gl.readPixels`).

## Complete Example: GPU Parallel Vector Operations

```typescript
import { GPUComposer, GPULayer, GPUProgram, FLOAT, NEAREST, CLAMP_TO_EDGE } from "gpu-io"

async function gpuVectorAdd(scalar: number, arrA: Float32Array, arrB: Float32Array) {
    // 1. 检测支持
    if (!Daisy.GpuDeviceManager.isSupported()) {
        // CPU 回退
        return arrA.map((a, i) => scalar * (a + arrB[i]))
    }

    // 2. 创建 composer
    const composer = await Daisy.GpuDeviceManager.createComposer()

    // 3. 编译 shader
    const program = new GPUProgram(composer, {
        name: "vector-add",
        fragmentShader: `
            in vec2 v_uv;
            uniform float u_scalar;
            uniform sampler2D u_inputA;
            uniform sampler2D u_inputB;
            out vec4 out_result;
            void main() {
                float a = texture(u_inputA, v_uv).r;
                float b = texture(u_inputB, v_uv).r;
                float val = u_scalar * (a + b);
                out_result = vec4(val, 0.0, 0.0, 1.0);
            }
        `,
        uniforms: [{ name: "u_scalar", value: 0, type: FLOAT }],
    })

    const N = arrA.length
    const layerA = new GPULayer(composer, {
        name: "inputA", type: FLOAT, numComponents: 1,
        dimensions: [N, 1], filter: NEAREST,
        wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
        array: arrA,
    })
    const layerB = new GPULayer(composer, {
        name: "inputB", type: FLOAT, numComponents: 1,
        dimensions: [N, 1], filter: NEAREST,
        wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
        array: arrB,
    })
    const output = new GPULayer(composer, {
        name: "output", type: FLOAT, numComponents: 1,
        dimensions: [N, 1], filter: NEAREST,
        wrapX: CLAMP_TO_EDGE, wrapY: CLAMP_TO_EDGE,
    })

    // 4. 设置参数并执行
    program.setUniform("u_scalar", scalar, FLOAT)
    composer.step({ program, input: [layerA, layerB], output })

    // 5. 读回结果
    const raw = await output.getValuesAsync()
    return new Float32Array(raw.buffer ?? raw)
}

// 使用
const result = await gpuVectorAdd(3.0,
    new Float32Array([1, 2, 3, 4]),
    new Float32Array([5, 6, 7, 8]))
// result = [18.0, 24.0, 30.0, 36.0] = 3 × [6, 8, 10, 12]
```

## Suitable Scenarios

| Scenario | Advantage |
|----------|------------|
| Constellation coverage analysis | Parallelize footprint computation for thousands of satellites |
| Particle simulation | Large-scale particle position / velocity updates |
| Terrain analysis | Raster operations such as elevation queries and slope computation |
| General-purpose vector operations | Element-wise add / subtract / multiply / divide on large arrays |

> **Note**: GPU compute is best for highly data-parallel tasks. For small datasets (< a few hundred elements), use the CPU directly — GPU upload / read-back overhead may exceed the computation benefit.

---

> **Related API**: [GpuDeviceManager](/en/api/classes/GpuDeviceManager)
