<script>
// =============================================================================
// 天体标记组件
// -----------------------------------------------------------------------------
// 展示 CelestialMarkerWidget 的使用，支持动态开关各种天体标记。
// 当相机距离天体超过 9 万公里时，显示小圆点 + 标签标记方位。
// 关键 API:
//   - Daisy.CelestialMarkerWidget : 天体标记组件
//   - Daisy.CelestialMarkerBody   : 内置天体枚举
//   - widget.setEnabledBodies()   : 运行时更新启用列表
//   - widget.custom               : 自定义标记目标
//   - engine.addWidget()          : 添加组件
//   - engine.removeWidget()       : 移除组件
// =============================================================================

// ── 1. 组件属性与状态 ────────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 天体开关状态
let moonEnabled = $state(true);    // 月球标记
let sunEnabled = $state(true);     // 太阳标记
let marsEnabled = $state(true);    // 火星标记
let earthEnabled = $state(false);  // 地球标记（默认关闭）
let customEnabled = $state(false); // 自定义目标标记
let markerWidget = $state(null);   // 当前组件实例
let activeBodyCount = $state(3);   // 当前启用的内置天体数量

function getEnabledBodies() {
    const bodies = [];
    if (sunEnabled) bodies.push(Daisy.CelestialMarkerBody.Sun);
    if (moonEnabled) bodies.push(Daisy.CelestialMarkerBody.Moon);
    if (marsEnabled) bodies.push(Daisy.CelestialMarkerBody.Mars);
    if (earthEnabled) bodies.push(Daisy.CelestialMarkerBody.Earth);
    return bodies;
}

function syncEnabledBodies() {
    if (!markerWidget) return;
    const bodies = getEnabledBodies();
    markerWidget.setEnabledBodies(bodies);
    activeBodyCount = bodies.length;
    __log(`CelestialMarkerWidget: 已启用 ${activeBodyCount} 个内置天体，关闭的天体不会计算星历`);
}

// ── 2. 创建/重建标记组件 ────────────────────────────────────────────────────
// 自定义目标集合变化时重建组件；内置天体开关直接更新 enabledBodies。
function createMarker() {
    // 销毁旧组件
    if (markerWidget) {
        engine.removeWidget(markerWidget, true);
        markerWidget = null;
    }
    
    // 构建组件选项。enabledBodies 是完整列表，不会叠加 SDK 默认值。
    const opts = {
        enabledBodies: getEnabledBodies(),
    };
    
    // 自定义标记示例：添加国际空间站标记
    // custom 数组中每个元素需要 label、color 和 getPosition 函数
    if (customEnabled) {
        opts.custom = [
            {
                label: "国际空间站",
                color: Daisy.Color.fromCssColorString("#22c55e"),
                // getPosition(t) 返回 t 时刻的位置 ECEF 坐标
                getPosition: (t) => Daisy.Utils.getMoonPositionECEF(t) ?? Daisy.Cartesian3.ZERO,
            },
        ];
    }
    
    // 创建并添加组件
    const w = new Daisy.CelestialMarkerWidget(opts);
    markerWidget = engine.addWidget(w);
    activeBodyCount = getEnabledBodies().length;
    __log(`CelestialMarkerWidget: 已启用 ${activeBodyCount} 个内置天体，自定义目标=${customEnabled}`);
}

// ── 3. 初始化 ──────────────────────────────────────────────────────────────
// 初始创建标记组件
createMarker();

// ── 4. 相机定位 ──────────────────────────────────────────────────────────────
// 飞行到北京上空，高度80000公里，可以看到天体标记
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.39, 39.9, 80000000));

__log("CelestialMarkerWidget: 天体标记演示已创建，拉远相机查看标记效果");

// ── 5. 资源清理 ──────────────────────────────────────────────────────────────
registerCleanup(() => {
    if (markerWidget) {
        engine.removeWidget(markerWidget, true);
        markerWidget = null;
    }
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="天体标记组件">
    <h2>天体标记组件</h2>
    <p class="desc">默认显示太阳、月球和火星；关闭后对应天体不会继续计算或更新星历。</p>
    <div class="controls">
        <label class="toggle">
            <input type="checkbox" bind:checked={earthEnabled} onchange={syncEnabledBodies} />
            <span class="dot" style="background:#2a9df4"></span>
            地球
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={moonEnabled} onchange={syncEnabledBodies} />
            <span class="dot" style="background:#cccccc"></span>
            月球
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={sunEnabled} onchange={syncEnabledBodies} />
            <span class="dot" style="background:#ffd166"></span>
            太阳
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={marsEnabled} onchange={syncEnabledBodies} />
            <span class="dot" style="background:#ff6f61"></span>
            火星
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={customEnabled} onchange={createMarker} />
            <span class="dot" style="background:#22c55e"></span>
            自定义目标
        </label>
    </div>
    <p class="status">当前启用 {activeBodyCount} 个内置天体</p>
</DemoPanel>

<style>
h2 {
        margin: 0 0 8px;
        font-size: 16px;
    }
    .desc {
        margin: 0 0 12px;
        color: #aaa;
        font-size: 12px;
    }
    .controls {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }
    .toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }
    .toggle input {
        cursor: pointer;
    }
    .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    .status {
        margin: 12px 0 0;
        color: #7dd3fc;
        font-size: 12px;
    }
</style>
