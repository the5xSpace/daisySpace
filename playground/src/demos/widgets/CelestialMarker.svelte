<script>
// =============================================================================
// 天体标记组件
// -----------------------------------------------------------------------------
// 展示 CelestialMarkerWidget 的使用，支持动态开关各种天体标记。
// 当相机距离天体超过 9 万公里时，显示小圆点 + 标签标记方位。
// 关键 API:
//   - Daisy.CelestialMarkerWidget : 天体标记组件
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

// ── 2. 创建/重建标记组件 ────────────────────────────────────────────────────
// 每次开关变化时销毁旧组件并创建新组件
function createMarker() {
    // 销毁旧组件
    if (markerWidget) {
        engine.removeWidget(markerWidget, true);
        markerWidget = null;
    }
    
    // 构建组件选项
    const opts = {
        earth: earthEnabled,
        moon: moonEnabled,
        sun: sunEnabled,
        mars: marsEnabled,
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
    __log(`CelestialMarkerWidget: 地球=${earthEnabled} 月球=${moonEnabled} 太阳=${sunEnabled} 火星=${marsEnabled} 自定义=${customEnabled}`);
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
    <p class="desc">当相机距离天体超过 9 万公里时，显示小圆点 + 标签标记方位。</p>
    <div class="controls">
        <label class="toggle">
            <input type="checkbox" bind:checked={earthEnabled} onchange={createMarker} />
            <span class="dot" style="background:#2a9df4"></span>
            地球
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={moonEnabled} onchange={createMarker} />
            <span class="dot" style="background:#cccccc"></span>
            月球
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={sunEnabled} onchange={createMarker} />
            <span class="dot" style="background:#ffd166"></span>
            太阳
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={marsEnabled} onchange={createMarker} />
            <span class="dot" style="background:#ff6f61"></span>
            火星
        </label>
        <label class="toggle">
            <input type="checkbox" bind:checked={customEnabled} onchange={createMarker} />
            <span class="dot" style="background:#22c55e"></span>
            自定义目标
        </label>
    </div>
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
        display: flex;
        flex-direction: column;
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
</style>
