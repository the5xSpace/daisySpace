<script>
// =============================================================================
// 地月切换场景
// -----------------------------------------------------------------------------
// 展示如何在地球和月球视角之间切换，演示天体切换和相机控制。
// 关键 API:
//   - Daisy.PW.Moon            : 创建月球实体
//   - moon.bindEngine()        : 绑定月球到引擎
//   - engine.switchToCelestial(): 切换到天体视角
//   - engine.camera.flyToTarget(): 飞行到目标
//   - moon.setCameraLockInitialized(): 初始化相机锁定
//   - moon.resumeCameraLock()  : 恢复相机锁定
//   - Daisy.CelestialMarkerWidget: 天体标记组件
// =============================================================================

// ── 1. 组件属性与月球初始化 ────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 创建月球实体并绑定到引擎
// lockCamera: true 表示月球视角下相机自动锁定月球
const moon = new Daisy.PW.Moon({ name: "Moon", lockCamera: true });
moon.bindEngine(engine);
moon.entity.show = false;  // 初始隐藏月球实体

// ── 2. 天体标记组件 ──────────────────────────────────────────────────────────
// 添加天体标记，显示太阳和火星位置
// API: new Daisy.CelestialMarkerWidget({ sun, mars, ... })
const markerWidget = engine.addWidget(new Daisy.CelestialMarkerWidget({
    sun: true,   // 显示太阳标记
    mars: true,  // 显示火星标记
}));

// 飞行动画持续时间（秒）
const flyDuration = 2.0;
// 飞行代号，用于取消过期的飞行动画
let flyGeneration = 0;

// ── 3. 切换到月球视角 ────────────────────────────────────────────────────────
function switchToMoon() {
    // 第一步：抑制月球网格和锁定，避免视觉冲突
    moon.setGridSuppressShow(true);   // 隐藏月球网格
    moon.setSuppressLock(true);       // 暂停相机锁定
    moon.entity.show = false;         // 临时隐藏月球实体
    
    // 增加飞行代号，用于取消之前的飞行动画
    const gen = ++flyGeneration;
    
    requestAnimationFrame(() => {
        moon.entity.show = true;  // 在下一帧显示月球
        
        // 第二步：飞行到月球附近
        // offset: HeadingPitchRange 设置观察角度和距离
        engine.camera.flyToTarget(moon, {
            duration: flyDuration,
            offset: new Daisy.HeadingPitchRange(
                Daisy.Math.toRadians(45),   // 航向角45度
                Daisy.Math.toRadians(-30),  // 俯仰角-30度（向下看）
                5_000_000                   // 距离5000公里
            ),
        }).then(() => {
            // 第三步：飞行完成后切换到月球坐标系
            if (gen !== flyGeneration) return;  // 检查是否被新飞行取消
            engine.switchToCelestial(moon);     // 切换到月球视角
            moon.setSuppressLock(false);        // 恢复相机锁定
            moon.setGridSuppressShow(false);    // 恢复网格显示
            moon.setCameraLockInitialized(true); // 标记相机锁定已初始化
            moon.resumeCameraLock();            // 恢复相机锁定
        }).catch(() => {
            // 飞行被取消时也执行切换
            if (gen !== flyGeneration) return;
            engine.switchToCelestial(moon);
            moon.setSuppressLock(false);
            moon.setGridSuppressShow(false);
            moon.setCameraLockInitialized(true);
            moon.resumeCameraLock();
        });
    });
    __log("已切换到月球视角");
}

// ── 4. 切换到地球视角 ────────────────────────────────────────────────────────
function switchToEarth() {
    // 切换到地球坐标系（传入 undefined 表示地球）
    engine.switchToCelestial(undefined);
    moon.entity.show = false;  // 隐藏月球实体
    
    // 飞行到北京上空，高度5000公里
    requestAnimationFrame(() => {
        engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116, 40, 5000000), { duration: flyDuration });
    });
    __log("已切换到地球视角");
}

// ── 5. 资源清理 ──────────────────────────────────────────────────────────────
// 注册清理函数，卸载 demo 时移除天体标记组件
registerCleanup(() => {
    engine.removeWidget(markerWidget, true);  // true 表示彻底销毁
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="地月切换场景" width="220px">
        <h4>地月切换场景</h4>
        <button onclick={switchToMoon}>切换到月球视角</button>
        <button onclick={switchToEarth}>切换到地球视角</button>
    </DemoPanel>
<style>
h4 { margin: 0 0 4px; color: var(--panel-text-bright); font-size: 13px; }
button { background: var(--panel-btn-bg); border: 1px solid var(--panel-border); color: var(--panel-text); padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
button:hover { background: var(--panel-btn-bg); }
</style>
