<script>
// =============================================================================
// Mars Demo — 火星椭球体场景
//
// 本示例演示如何创建火星椭球体场景：
// 1. 创建 Mars 对象
// 2. 切换到火星场景
// 3. 绑定引擎
// 4. 添加天体标记
//
// 关键 API：
// - Daisy.PW.Mars: 火星椭球体对象
// - lockCamera: 是否锁定相机
// - engine.switchToCelestial(): 切换到天体场景
// - bindEngine(engine): 绑定引擎
// - CelestialMarkerWidget: 天体标记组件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 创建火星椭球体 ──────────────────────────────────────────────
// Daisy.PW.Mars: 火星椭球体对象
// - name: 天体名称
// - lockCamera: 是否锁定相机（true = 相机始终面向火星）
const mars = new Daisy.PW.Mars({ name: "Mars", lockCamera: true });

// switchToCelestial: 切换到天体场景
// 引擎将使用火星作为主要天体
engine.switchToCelestial(mars);

// bindEngine: 绑定引擎，使火星生效
mars.bindEngine(engine);

// ── 2. 添加天体标记 ──────────────────────────────────────────────
// CelestialMarkerWidget: 天体标记组件
// - sun: 是否显示太阳标记
// - moon: 是否显示月球标记
// - earth: 是否显示地球标记
const markerWidget = engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,
    moon: true,
    earth: true,
}));

__log("Mars 椭球体场景已创建，拉远视角可看到天体标记");

// registerCleanup: 注册清理回调
// 当 demo 销毁时自动执行，移除天体标记组件
registerCleanup(() => {
    engine.removeWidget(markerWidget, true);
});
</script>
