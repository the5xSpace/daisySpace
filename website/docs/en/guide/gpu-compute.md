# GPU 通用计算

DaisySpace-Sdk 内置基于 WebGL2 的 GPGPU 管线，通过 offscreen WebGL 上下文 + 着色器实现通用 GPU 计算，无需依赖 WebGPU。

## 架构

```
GpuDeviceManager（设备管理器，单例）
  └── GPUComposer（gpu-io 计算调度器）
        ├── GPULayer（纹理化输入/输出）
        ├── GPUProgram（fragment shader 程序）
        └── step({ program, input, output })（执行计算）
```

底层基于 [gpu-io](https://github.com/amandaghassaei/gpu-io) 库，将 `Float32Array` 数据编码为 WebGL 纹理，通过 fragment shader 并行计算，再读回 CPU。

## GpuDeviceManager

[GpuDeviceManager](/en/api/classes/GpuDeviceManager) 是设备级管理者，提供静态方法：

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

`createComposer()` 内部创建隐藏 `<canvas>` 元素并初始化 `GPUComposer`，之后所有 GPU 计算共享同一上下文。

## GPUComposer

`GPUComposer` 是计算调度核心。由于已由 `GpuDeviceManager` 管理，通常不需要直接创建。手动创建用于独立上下文场景：

```typescript
import { GPUComposer } from "gpu-io"

const canvas = document.createElement("canvas")
canvas.width = 4; canvas.height = 4
const composer = new GPUComposer({ canvas })
```

## GPUProgram

`GPUProgram` 编译 fragment shader 并管理 uniform 变量：

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

### 内建纹理命名约定

GPUComposer 的 `step()` 传入的 input/output `GPULayer` 会按顺序自动绑定：
- 第 0 个 input layer 绑定为 `u_input`（单输入时的别名）或由 `name` 属性决定
- 可通过 `texture(layerSamplerName, v_uv)` 在 shader 中访问
- 输出 layer 写入 `out_result`（`out vec4`）

## GPULayer

`GPULayer` 将 JavaScript 数组封装为 GPU 纹理：

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

### 关键参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 层名称（对应 shader 中的 sampler uniform 名） |
| `type` | GPULayerType | 数据类型（`FLOAT` / `BYTE` / `UNSIGNED_BYTE` 等） |
| `numComponents` | `number` | 每像素分量数（1/2/3/4） |
| `dimensions` | `[number, number]` | 纹理宽高 |
| `array` | TypedArray | 输入数据（输出层不传） |
| `filter` | FilterMode | `NEAREST`（精确）或 `LINEAR`（插值） |
| `wrapX` / `wrapY` | WrapMode | `CLAMP_TO_EDGE` / `REPEAT` 等 |

## 执行计算

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

`step()` 是同步的（提交 GPU 命令），但 `getValuesAsync()` 是异步的（需要 `gl.readPixels`）。

## 完整示例：GPU 并行向量运算

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

## 适用场景

| 场景 | 优势 |
|------|------|
| 星座覆盖分析 | 数千颗卫星的 footprint 计算并行化 |
| 粒子模拟 | 大量粒子位置/速度更新 |
| 地形分析 | 高程查询、坡度计算等栅格运算 |
| 通用向量运算 | 大规模数组的加减乘除等 element-wise 操作 |

> **注意**：GPU 计算适合数据并行度高的任务。小规模数据（< 几百个元素）建议直接用 CPU，GPU 上传/读回的开销可能超过计算收益。

---

> **相关 API**：[GpuDeviceManager](/en/api/classes/GpuDeviceManager)
