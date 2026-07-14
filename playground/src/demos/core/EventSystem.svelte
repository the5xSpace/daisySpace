<script>
// =============================================================================
// EventSystem Demo — 事件系统演示
//
// 本示例演示 Daisy 引擎的事件系统架构，包括：
// 1. Engine 全局事件（SPACE_ENTITY_CLICK/HOVER 等）
// 2. Feature 组件事件（click/dblclick/hover 等）
// 3. Entity 实体事件（聚合 Feature 事件）
// 4. 事件冒泡与 stopPropagation 控制
// 5. 生命周期事件（beforeRegister/afterRegister/destroy 等）
//
// 关键 API：
// - engine.eventHandle: 获取事件处理器
// - eventHandle.addClickSpaceEntityListener(): 添加全局点击监听
// - feature.onClick(): 添加 Feature 级别点击监听
// - feature.enableSubmitToEntity(): 启用事件向 Entity 提交
// - entity.onClick(): 添加 Entity 级别点击监听
// - feature.onBeforeRegister/onAfterRegister/onDestroy(): 生命周期事件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C = Daisy.Color;
const C2 = Daisy.Cartesian2;
const C3 = Daisy.Cartesian3;

__log("=== 事件系统 Demo：Engine / Entity / Feature 事件链路 ===");

// ── 1. 初始化场景时间 ──────────────────────────────────────────────────
// JulianDate.now() 获取当前系统时间
// addSeconds(time, seconds, result) 在时间上增加秒数
// setSceneTime(start, stop, loop) 设置场景时间范围
const now = Daisy.JulianDate.now();
engine.setSceneTime(now, Daisy.JulianDate.addSeconds(now, 3600, new Daisy.JulianDate()), true);
engine.setMultiplier(1);
engine.play();

// ── 2. 获取事件系统 ──────────────────────────────────────────────────
// engine.eventHandle: 获取事件处理器
// eventHandle.eventManager: 获取事件管理器（支持自定义事件）
const eventHandle = engine.eventHandle;
const eventManager = eventHandle.eventManager;

let eventRows = $state([]);
let currentPick = $state("等待拾取");
let activeTarget = $state("无");
let lifecycleEnabled = $state(true);
let engineListening = $state(true);
let featureListening = $state(true);
let submitToEntity = $state(true);
let stopFeaturePropagation = $state(false);
let recordHoverEvents = $state(false);
let dynamicFeatureOn = $state(false);
let sequence = 0;
let dynamicFeature;

let stats = $state({
    engine: 0,
    feature: 0,
    entity: 0,
    lifecycle: 0,
    custom: 0,
});

// ── 3. 事件目标配置 ──────────────────────────────────────────────────
// 定义三个不同的事件处理模式：
// - alpha: 只看 Engine 全局拾取
// - bravo: Feature 独立响应事件
// - charlie: Feature 事件向 Entity 聚合提交
const targetSpecs = [
    {
        key: "alpha",
        title: "Alpha",
        mode: "Engine 全局拾取",
        lon: 115.7,
        color: C.LIME,
        description: "只看 ViewerEventHandle 如何把屏幕输入解析成 Daisy 拾取结果。",
    },
    {
        key: "bravo",
        title: "Bravo",
        mode: "Feature 独立响应",
        lon: 116.7,
        color: C.CYAN,
        description: "PointFeature / LabelFeature 自己监听 click、hover、dblclick。",
    },
    {
        key: "charlie",
        title: "Charlie",
        mode: "Feature 提交到 Entity",
        lon: 117.7,
        color: C.ORANGE,
        description: "Feature 事件先命中自身，再向 Entity 聚合提交。",
    },
];

const targets = [];

// ── 4. 辅助函数 ──────────────────────────────────────────────────────
// shortId: 缩短 ID 显示，避免太长
// describePick: 描述拾取结果，包含实体名、组件类型、组件 ID
function shortId(id) {
    if (!id) return "-";
    const text = String(id);
    return text.length > 14 ? `${text.slice(0, 6)}...${text.slice(-5)}` : text;
}

function describePick(e) {
    if (!e) return "无";
    const node = e.nodeName ? ` / node=${e.nodeName}` : "";
    return `${e.entity?.name || e.entityId} / ${e.comType || "-"} / ${shortId(e.comId)}${node}`;
}

// pushEvent: 将事件推送到事件流，同时更新统计
function pushEvent(layer, title, detail, tone = layer) {
    const row = {
        id: ++sequence,
        layer,
        title,
        detail,
        tone,
        time: new Date().toLocaleTimeString(),
    };
    eventRows = [row, ...eventRows].slice(0, 34);
    if (stats[layer] !== undefined) stats[layer] += 1;
    __log(`[${layer}] ${title} - ${detail}`);
}

// ── 5. 创建 Feature 组件 ──────────────────────────────────────────────
// makeLabel: 创建标签组件
// - text: 显示文本（支持换行符）
// - font: 字体样式
// - fillColor: 填充颜色
// - style: 标签样式（FILL_AND_OUTLINE）
// - outlineWidth/outlineColor: 轮廓宽度和颜色
// - showBackground: 显示背景
// - backgroundColor: 背景颜色（withAlpha 设置透明度）
// - backgroundPadding: 背景内边距
// - pixelOffset: 像素偏移量
// - disableDepthTestDistance: 禁用深度测试的距离（无穷大 = 始终显示）
function makeLabel(title, mode, color) {
    return new Daisy.UI.LabelFeature({
        name: `${title}-label`,
        text: `${title}\n${mode}`,
        font: "13px Segoe UI, sans-serif",
        fillColor: color,
        style: Daisy.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        outlineColor: C.BLACK,
        showBackground: true,
        backgroundColor: C.BLACK.withAlpha(0.64),
        backgroundPadding: new C2(8, 5),
        pixelOffset: new C2(0, -34),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    });
}

// makePulsePoint: 创建点标记组件
// - name: 组件名称
// - sizePx: 点大小（像素）
// - color: 填充颜色
// - outlineColor: 轮廓颜色
// - outlineWidth: 轮廓宽度
// - disableDepthTestDistance: 禁用深度测试的距离
function makePulsePoint(color, name, size = 18) {
    return new Daisy.PointFeature({
        name,
        sizePx: size,
        color,
        outlineColor: C.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    });
}

// ── 6. 绑定 Feature 事件 ──────────────────────────────────────────────
// bindFeatureEvents: 为 Feature 绑定事件监听
// - onClick: 点击事件
// - onDblClick: 双击事件
// - onMouseEnter: 鼠标进入事件
// - onMouseLeave: 鼠标离开事件
// - e.stopPropagation(): 阻止事件冒泡到 Entity
// - e.isPropagationStopped(): 检查事件是否已停止冒泡
function bindFeatureEvents(target) {
    const point = target.point;
    const label = target.label;
    const onPointClick = (e) => {
        activeTarget = target.title;
        if (target.key === "charlie" && stopFeaturePropagation) {
            e.stopPropagation();
            pushEvent("feature", `${target.title}.point click`, `${describePick(e)} / stopPropagation() 已调用`, "blocked");
            return;
        }
        pushEvent("feature", `${target.title}.point click`, `${describePick(e)} / propagation=${e.isPropagationStopped() ? "stopped" : "open"}`, target.key);
    };
    const onPointDblClick = (e) => {
        activeTarget = target.title;
        if (target.key === "charlie" && stopFeaturePropagation) {
            e.stopPropagation();
            pushEvent("feature", `${target.title}.point dblclick`, `${describePick(e)} / stopPropagation() 已调用`, "blocked");
            return;
        }
        pushEvent("feature", `${target.title}.point dblclick`, `${describePick(e)} / propagation=${e.isPropagationStopped() ? "stopped" : "open"}`, target.key);
    };
    const onPointEnter = (e) => {
        activeTarget = target.title;
        if (!recordHoverEvents) return;
        pushEvent("feature", `${target.title}.point mouseenter`, describePick(e), target.key);
    };
    const onPointLeave = (e) => {
        if (!recordHoverEvents) return;
        pushEvent("feature", `${target.title}.point mouseleave`, describePick(e), target.key);
    };
    const onLabelClick = (e) => {
        activeTarget = target.title;
        if (target.key === "charlie" && stopFeaturePropagation) {
            e.stopPropagation();
            pushEvent("feature", `${target.title}.label click`, `${describePick(e)} / stopPropagation() 已调用`, "blocked");
            return;
        }
        pushEvent("feature", `${target.title}.label click`, `${describePick(e)} / propagation=${e.isPropagationStopped() ? "stopped" : "open"}`, target.key);
    };

    target.featureHandlers = { onPointClick, onPointDblClick, onPointEnter, onPointLeave, onLabelClick };
    point.onClick(onPointClick).onDblClick(onPointDblClick).onMouseEnter(onPointEnter).onMouseLeave(onPointLeave);
    label.onClick(onLabelClick);
}

// unbindFeatureEvents: 解绑 Feature 事件监听
// - offClick/offDblClick/offMouseEnter/offMouseLeave: 移除事件监听
function unbindFeatureEvents(target) {
    const h = target.featureHandlers;
    if (!h) return;
    target.point.offClick(h.onPointClick).offDblClick(h.onPointDblClick).offMouseEnter(h.onPointEnter).offMouseLeave(h.onPointLeave);
    target.label.offClick(h.onLabelClick);
}

function setFeatureListeners(enabled) {
    for (const target of targets) {
        if (enabled) bindFeatureEvents(target);
        else unbindFeatureEvents(target);
    }
    featureListening = enabled;
    pushEvent("custom", "Feature 监听切换", enabled ? "已开启 Feature 自身 click/hover/dblclick" : "已关闭 Feature 自身监听");
}

function setSubmitToEntity(enabled) {
    for (const target of targets) {
        const shouldSubmit = target.key === "charlie" && enabled;
        target.point.enableSubmitToEntity(shouldSubmit);
        target.label.enableSubmitToEntity(shouldSubmit);
        if (target.dynamic) target.dynamic.enableSubmitToEntity(shouldSubmit);
    }
    submitToEntity = enabled;
    pushEvent("custom", "Feature -> Entity 提交切换", enabled ? "Charlie 的 Feature 会提交到 Entity" : "已关闭向上提交");
}

// ── 7. 绑定 Entity 事件 ──────────────────────────────────────────────
// bindEntityEvents: 为 Entity 绑定事件监听
// - onClick: 点击事件（聚合自 Feature）
// - onDblClick: 双击事件
// - onEnter: 鼠标进入事件
// - onLeave: 鼠标离开事件
// - e.featureType: 来源 Feature 类型
// - e.comType: 组件类型
function bindEntityEvents(target) {
    const entity = target.entity;
    const onClick = (e) => {
        activeTarget = target.title;
        pushEvent("entity", `${target.title} entity click`, `from=${e.featureType || e.comType || "Entity"} / ${describePick(e)}`, target.key);
    };
    const onDblClick = (e) => {
        activeTarget = target.title;
        pushEvent("entity", `${target.title} entity dblclick`, `from=${e.featureType || e.comType || "Entity"} / ${describePick(e)}`, target.key);
    };
    const onEnter = (e) => {
        activeTarget = target.title;
        if (!recordHoverEvents) return;
        pushEvent("entity", `${target.title} entity mouseenter`, `from=${e.featureType || e.comType || "Entity"}`, target.key);
    };
    const onLeave = (e) => {
        if (!recordHoverEvents) return;
        pushEvent("entity", `${target.title} entity mouseleave`, `from=${e.featureType || e.comType || "Entity"}`, target.key);
    };
    target.entityHandlers = { onClick, onDblClick, onEnter, onLeave };
    entity.onClick(onClick).onDblClick(onDblClick).onMouseEnter(onEnter).onMouseLeave(onLeave);
}

// ── 8. 生命周期事件 ──────────────────────────────────────────────────
// bindLifecycle: 为 Feature 绑定生命周期事件
// - onBeforeRegister: 注册前触发
// - onAfterRegister: 注册后触发
// - onRegister: 注册完成触发
// - onBeforeDestroy: 销毁前触发
// - onDestroy: 销毁时触发（清理事件）
function bindLifecycle(target, feature) {
    feature.onBeforeRegister(() => lifecycleEnabled && pushEvent("lifecycle", `${target.title}.${feature.name || feature.type} beforeRegister`, "Feature 即将注册", target.key));
    feature.onAfterRegister(() => lifecycleEnabled && pushEvent("lifecycle", `${target.title}.${feature.name || feature.type} afterRegister`, "Feature 已进入场景集合", target.key));
    feature.onRegister(() => lifecycleEnabled && pushEvent("lifecycle", `${target.title}.${feature.name || feature.type} register`, "Feature 注册完成", target.key));
    feature.onBeforeDestroy(() => lifecycleEnabled && pushEvent("lifecycle", `${target.title}.${feature.name || feature.type} beforeDestroy`, "Feature 即将销毁", target.key));
    feature.onDestroy(() => lifecycleEnabled && pushEvent("lifecycle", `${target.title}.${feature.name || feature.type} destroy`, "Feature 已销毁并清理事件", target.key));
}

// ── 9. 创建实体和 Feature ──────────────────────────────────────────
// 遍历 targetSpecs，为每个配置创建：
// 1. Entity 实体
// 2. PointFeature 点标记
// 3. LabelFeature 标签
// 4. 绑定生命周期事件
// 5. 添加 Feature 到 Entity
// 6. 绑定 Entity 事件
for (const spec of targetSpecs) {
    const entity = engine.createEntity(`Event-${spec.title}`);
    entity.position = C3.fromDegrees(spec.lon, 39.55, 180000);
    entity.customProperties = { eventDemoRole: spec.mode };

    const point = makePulsePoint(spec.color, `${spec.title}-point`, spec.key === "charlie" ? 23 : 19);
    const label = makeLabel(spec.title, spec.mode, spec.color);
    bindLifecycle(spec, point);
    bindLifecycle(spec, label);
    entity.addFeature(point);
    entity.addFeature(label);

    const target = { ...spec, entity, point, label, dynamic: undefined, featureHandlers: undefined, entityHandlers: undefined };
    targets.push(target);
    bindEntityEvents(target);
}

// ── 10. 初始化事件监听 ──────────────────────────────────────────────
// setFeatureListeners: 设置 Feature 事件监听
// setSubmitToEntity: 设置 Feature 事件向 Entity 提交
setFeatureListeners(true);
setSubmitToEntity(true);

// ── 11. 引擎全局事件监听 ──────────────────────────────────────────────
// addClickSpaceEntityListener: 添加全局点击监听
// addDoubleClickSpaceEntityListener: 添加全局双击监听
// addHoverSpaceEntityListener: 添加全局悬停监听
// addHoverOutSpaceEntityListener: 添加全局悬停离开监听
const onEngineClick = (e) => {
    currentPick = describePick(e);
    activeTarget = e.entity?.name?.replace("Event-", "") || e.entityId;
    pushEvent("engine", "SPACE_ENTITY_CLICK", describePick(e), "engine");
};
const onEngineDblClick = (e) => {
    currentPick = describePick(e);
    activeTarget = e.entity?.name?.replace("Event-", "") || e.entityId;
    pushEvent("engine", "SPACE_ENTITY_DOUBLE_CLICK", describePick(e), "engine");
};
const onEngineHover = (e) => {
    currentPick = describePick(e);
    activeTarget = e.entity?.name?.replace("Event-", "") || e.entityId;
    if (!recordHoverEvents) return;
    pushEvent("engine", "SPACE_ENTITY_HOVER", describePick(e), "engine");
};
const onEngineHoverOut = (e) => {
    if (!recordHoverEvents) return;
    pushEvent("engine", "SPACE_ENTITY_HOVER_OUT", describePick(e), "engine");
};
const onCustom = (payload) => {
    pushEvent("custom", payload.kind || "custom-event", payload.message || "自定义事件已触发");
};

// attachEngineListeners: 绑定引擎全局事件
function attachEngineListeners() {
    eventHandle.addClickSpaceEntityListener(onEngineClick);
    eventHandle.addDoubleClickSpaceEntityListener(onEngineDblClick);
    eventHandle.addHoverSpaceEntityListener(onEngineHover);
    eventHandle.addHoverOutSpaceEntityListener(onEngineHoverOut);
}

// detachEngineListeners: 解绑引擎全局事件
// removeClickSpaceEntityListener: 移除点击监听
// removeDoubleClickSpaceEntityListener: 移除双击监听
// removeHoverSpaceEntityListener: 移除悬停监听
// removeHoverOutSpaceEntityListener: 移除悬停离开监听
function detachEngineListeners() {
    eventHandle.removeClickSpaceEntityListener(onEngineClick);
    eventHandle.removeDoubleClickSpaceEntityListener(onEngineDblClick);
    eventHandle.removeHoverSpaceEntityListener(onEngineHover);
    eventHandle.removeHoverOutSpaceEntityListener(onEngineHoverOut);
}

// ── 12. 初始化和清理 ──────────────────────────────────────────────────
// attachEngineListeners(): 绑定引擎全局事件
// eventManager.on(): 绑定自定义事件
attachEngineListeners();
eventManager.on("event-demo:custom", onCustom);

// toggleEngineListeners: 切换引擎全局事件监听
function toggleEngineListeners() {
    if (engineListening) detachEngineListeners();
    else attachEngineListeners();
    engineListening = !engineListening;
    pushEvent("custom", "Engine 全局监听切换", engineListening ? "已开启 SPACE_ENTITY_* 监听" : "已关闭 SPACE_ENTITY_* 监听");
}

// toggleFeatureListeners: 切换 Feature 事件监听
function toggleFeatureListeners() {
    setFeatureListeners(!featureListening);
}

// toggleSubmit: 切换 Feature 事件向 Entity 提交
function toggleSubmit() {
    setSubmitToEntity(!submitToEntity);
}

// triggerCustom: 触发自定义事件
// eventManager.trigger(): 触发自定义事件，传递 payload
function triggerCustom() {
    eventManager.trigger("event-demo:custom", {
        kind: "manual custom",
        message: `当前目标=${activeTarget}，当前拾取=${currentPick}`,
    });
}

// triggerScenario: 播放事件链路演示
// 模拟从 Cesium 屏幕输入到 Entity 聚合的完整事件流
function triggerScenario() {
    const steps = [
        "Engine 收到 Cesium 屏幕输入",
        "ViewerEventHandle 解析 entityId / comType / comId",
        "FeatureEventHandle 匹配 Feature id",
        "Feature 自身监听器执行",
        "Charlie 的 Feature 向 Entity 提交事件",
        "Entity 聚合事件响应业务逻辑",
    ];
    for (const [index, message] of steps.entries()) {
        eventManager.trigger("event-demo:custom", {
            kind: `pipeline step ${index + 1}`,
            message,
        });
    }
}

// simulateFeatureEvent: 模拟 Feature 事件
// 模拟 ViewerEventHandle 的拾取结果
// 如果启用了 stopPropagation，则阻止事件冒泡到 Entity
function simulateFeatureEvent(kind = "click") {
    const charlie = targets.find((t) => t.key === "charlie");
    if (!charlie) return;
    const payload = {
        comId: charlie.point.id,
        comType: charlie.point.type,
        entityId: charlie.entity.getId(),
        entity: charlie.entity,
    };
    currentPick = describePick(payload);
    activeTarget = charlie.title;
    pushEvent("engine", `SIMULATED_${kind.toUpperCase()}`, `${describePick(payload)} / 模拟 ViewerEventHandle 拾取结果`, "engine");
    if (stopFeaturePropagation) {
        pushEvent("feature", `Charlie.point ${kind}`, `${describePick(payload)} / stopPropagation() 已调用`, "blocked");
        pushEvent("custom", "传播已终止", "Entity 不会收到这次 Feature 事件");
        return;
    }
    pushEvent("feature", `Charlie.point ${kind}`, `${describePick(payload)} / propagation=open`, "charlie");
    charlie.entity.receiveFeatureEvent(kind, {
        ...payload,
        featureType: charlie.point.type,
        featureId: charlie.point.id,
        featureName: charlie.point.name,
    });
}

// toggleDynamicFeature: 切换动态 Feature
// 动态添加或移除 Charlie 实体的辅助点标记
function toggleDynamicFeature() {
    const charlie = targets.find((t) => t.key === "charlie");
    if (!charlie) return;
    if (dynamicFeatureOn && dynamicFeature) {
        charlie.entity.removeFeature(dynamicFeature);
        charlie.dynamic = undefined;
        dynamicFeature = undefined;
        dynamicFeatureOn = false;
        pushEvent("custom", "动态 Feature 移除", "Charlie 辅助点已移除，生命周期 destroy 已触发");
        return;
    }

    const feature = makePulsePoint(C.MAGENTA, "Charlie-dynamic-point", 13);
    feature.options = {
        ...feature.options,
        position: C3.fromElements(0, 0, 70000),
    };
    bindLifecycle(charlie, feature);
    feature.onClick((e) => {
        if (stopFeaturePropagation) {
            e.stopPropagation();
            pushEvent("feature", "Charlie.dynamic click", `${describePick(e)} / stopPropagation() 已调用`, "blocked");
            return;
        }
        pushEvent("feature", "Charlie.dynamic click", describePick(e), "charlie");
    });
    feature.enableSubmitToEntity(submitToEntity);
    charlie.entity.addFeature(feature);
    charlie.dynamic = feature;
    dynamicFeature = feature;
    dynamicFeatureOn = true;
    pushEvent("custom", "动态 Feature 添加", "Charlie 新增一个可拾取 PointFeature");
}

// clearEvents: 清空事件流
function clearEvents() {
    eventRows = [];
    stats = { engine: 0, feature: 0, entity: 0, lifecycle: 0, custom: 0 };
    currentPick = "等待拾取";
    activeTarget = "无";
}

// ── 13. 相机飞行和清理 ──────────────────────────────────────────────
// flyToTarget: 将相机飞行到目标位置
// C3.fromDegrees(longitude, latitude, height): 创建经纬度坐标
engine.camera.flyToTarget(C3.fromDegrees(116.7, 39.45, 1650000));
pushEvent("custom", "Demo ready", "默认聚焦 click/dblclick；需要观察 move/hover 时打开“记录 Hover”");

// registerCleanup: 注册清理回调
// 当 demo 销毁时自动执行，移除所有事件监听
registerCleanup(() => {
    detachEngineListeners();
    eventManager.off("event-demo:custom", onCustom);
    for (const target of targets) {
        unbindFeatureEvents(target);
        if (target.entityHandlers) {
            target.entity.offClick(target.entityHandlers.onClick);
            target.entity.offDblClick(target.entityHandlers.onDblClick);
            target.entity.offMouseEnter(target.entityHandlers.onEnter);
            target.entity.offMouseLeave(target.entityHandlers.onLeave);
        }
    }
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="事件控制台" width="360px" padding="12px">
    <div class="ev-head">
        <div class="ev-eyebrow">Daisy Event Flow</div>
        <div class="ev-title">事件控制台</div>
    </div>

    <div class="ev-status-cards">
        <div class="ev-stat">
            <span>当前命中</span>
            <strong>{currentPick}</strong>
        </div>
        <div class="ev-stat">
            <span>当前目标</span>
            <strong>{activeTarget}</strong>
        </div>
    </div>

    <div class="ev-section">
        <div class="ev-section-label">事件开关</div>
        <div class="ev-grid-2">
            <button class:active={engineListening} onclick={toggleEngineListeners}>Engine 全局</button>
            <button class:active={featureListening} onclick={toggleFeatureListeners}>Feature 自身</button>
            <button class:active={submitToEntity} onclick={toggleSubmit}>提交 Entity</button>
            <button class:active={recordHoverEvents} onclick={() => { recordHoverEvents = !recordHoverEvents; pushEvent("custom", "Hover 记录切换", recordHoverEvents ? "开始记录 mouseenter/mouseleave" : "停止记录 Hover，聚焦 click/dblclick"); }}>记录 Hover</button>
            <button class:active={stopFeaturePropagation} onclick={() => { stopFeaturePropagation = !stopFeaturePropagation; pushEvent("custom", "阻止冒泡切换", stopFeaturePropagation ? "Charlie Feature 将调用 stopPropagation()" : "Charlie Feature 恢复向 Entity 提交"); }}>阻止冒泡</button>
            <button class:active={lifecycleEnabled} onclick={() => lifecycleEnabled = !lifecycleEnabled}>生命周期</button>
        </div>
    </div>

    <div class="ev-section">
        <div class="ev-section-label">操作</div>
        <div class="ev-grid-2">
            <button onclick={() => simulateFeatureEvent("click")}>模拟 click</button>
            <button onclick={() => simulateFeatureEvent("dblclick")}>模拟 dblclick</button>
            <button onclick={triggerCustom}>触发自定义事件</button>
            <button onclick={triggerScenario}>播放事件链路</button>
            <button class:active={dynamicFeatureOn} onclick={toggleDynamicFeature}>{dynamicFeatureOn ? "移除动态 Feature" : "添加动态 Feature"}</button>
            <button onclick={clearEvents}>清空事件流</button>
        </div>
    </div>

    <div class="ev-section">
        <div class="ev-section-label">事件目标</div>
        <div class="ev-target-list">
            {#each targetSpecs as target}
                <article class={target.key}>
                    <b>{target.title}</b>
                    <span>{target.mode}</span>
                    <p>{target.description}</p>
                </article>
            {/each}
        </div>
    </div>
</DemoPanel>

<DemoPanel title="事件流" width="460px" right="12px" padding="0">
    <div class="ef-layout">
        <div class="ef-metrics">
            <div><span>Engine</span><b>{stats.engine}</b></div>
            <div><span>Feature</span><b>{stats.feature}</b></div>
            <div><span>Entity</span><b>{stats.entity}</b></div>
            <div><span>Lifecycle</span><b>{stats.lifecycle}</b></div>
            <div><span>Custom</span><b>{stats.custom}</b></div>
        </div>

        <div class="ef-head">
            <span>事件流</span>
            <small>{eventRows.length} 条</small>
        </div>

        <div class="ef-list">
            {#each eventRows as row}
                <div class="ef-row {row.tone}">
                    <div class="ef-row-top">
                        <span>{row.layer}</span>
                        <time>{row.time}</time>
                    </div>
                    <strong>{row.title}</strong>
                    <p>{row.detail}</p>
                </div>
            {/each}
        </div>
    </div>
</DemoPanel>

<style>
/* ── Panel 1: 事件控制台 ── */
.ev-head {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.ev-eyebrow {
    color: var(--panel-accent);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 600;
}
.ev-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--panel-text-bright);
    margin-top: 2px;
}
.ev-status-cards {
    display: grid;
    gap: 6px;
    margin-bottom: 10px;
}
.ev-stat {
    padding: 8px 10px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-card);
}
.ev-stat span {
    display: block;
    color: var(--panel-text-muted);
    font-size: 10px;
}
.ev-stat strong {
    display: block;
    margin-top: 2px;
    color: var(--panel-text-bright);
    overflow-wrap: anywhere;
    font-size: 13px;
}
.ev-section {
    margin-top: 8px;
}
.ev-section + .ev-section {
    padding-top: 8px;
    border-top: 1px solid var(--panel-border);
}
.ev-section-label {
    font-size: 10px;
    font-weight: 600;
    color: var(--panel-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
}
.ev-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
}
.ev-target-list {
    display: grid;
    gap: 6px;
}
.ev-target-list article {
    padding: 8px 10px;
    border-left: 3px solid var(--panel-accent);
    border-radius: 6px;
    background: var(--panel-bg-card);
}
.ev-target-list article.alpha { border-left-color: var(--color-success); }
.ev-target-list article.bravo { border-left-color: var(--panel-accent); }
.ev-target-list article.charlie { border-left-color: var(--color-warning); }
.ev-target-list b {
    display: block;
    font-size: 13px;
    color: var(--panel-text-bright);
}
.ev-target-list span {
    display: block;
    font-size: 11px;
    color: var(--panel-text-muted);
    margin-top: 2px;
}
.ev-target-list p {
    margin: 4px 0 0;
    color: var(--panel-text-muted);
    font-size: 12px;
    line-height: 1.4;
}

/* ── Panel 2: 事件流 ── */
.ef-layout {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
    overflow: hidden;
}
.ef-metrics {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: var(--panel-border);
}
.ef-metrics div {
    padding: 8px 6px;
    background: var(--panel-bg-embed);
}
.ef-metrics span {
    display: block;
    color: var(--panel-text-muted);
    font-size: 10px;
}
.ef-metrics b {
    display: block;
    margin-top: 2px;
    font-size: 17px;
    color: var(--panel-text-bright);
}
.ef-head {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    border-bottom: 1px solid var(--panel-border);
    color: var(--panel-text-bright);
    font-weight: 700;
    font-size: 13px;
}
.ef-head small {
    color: var(--panel-text-muted);
    font-weight: 500;
    font-size: 11px;
}
.ef-list {
    overflow: auto;
    padding: 8px;
    display: grid;
    align-content: start;
    gap: 6px;
}
.ef-row {
    border-radius: 6px;
    padding: 8px 10px;
    border: 1px solid var(--panel-border);
    background: var(--panel-bg-card);
}
.ef-row.engine { border-left: 3px solid var(--panel-accent); }
.ef-row.feature,
.ef-row.bravo { border-left: 3px solid var(--color-success); }
.ef-row.entity,
.ef-row.charlie { border-left: 3px solid var(--color-warning); }
.ef-row.lifecycle { border-left: 3px solid #a3c93a; }
.ef-row.custom { border-left: 3px solid var(--color-purple); }
.ef-row.alpha { border-left: 3px solid var(--color-success); }
.ef-row.engine-tone { border-left: 3px solid var(--panel-accent); }
.ef-row-top {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: var(--panel-text-muted);
    text-transform: uppercase;
    font-size: 10px;
}
.ef-row strong {
    display: block;
    margin-top: 3px;
    color: var(--panel-text-bright);
    font-size: 13px;
}
.ef-row p {
    margin: 3px 0 0;
    color: var(--panel-text-muted);
    overflow-wrap: anywhere;
    font-size: 12px;
}

/* ── Shared button styles ── */
button {
    min-height: 30px;
    border-radius: 6px;
    border: 1px solid var(--panel-border);
    color: var(--panel-text);
    background: var(--panel-btn-bg);
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    transition: all 0.12s;
}
button:hover {
    background: var(--color-accent-muted);
    border-color: var(--color-accent);
}
button.active {
    color: #ffffff;
    background: var(--panel-accent);
    border-color: var(--panel-accent);
}
</style>
