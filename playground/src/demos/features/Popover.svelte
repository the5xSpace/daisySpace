<script>
// =============================================================================
// PopoverFeature Demo — 弹出层组件
//
// 本示例演示 PopoverFeature 的四种锚点方向（top/bottom/left/right）
// 和三种触发模式（always/click/hover），以及距离门限控制：
// 1. always: 常驻遥测，始终保持打开
// 2. click: 点击实体打开，ESC/外部点击关闭
// 3. hover: 鼠标悬停显示，离开后延迟隐藏
// 4. distance: 距离门限，超过门限时隐藏
//
// 关键 API：
// - new Daisy.UI.PopoverFeature({ content, anchor, mode, maxDistance, ... })
//   - mode: "always" | "click" | "hover"
//   - anchor: "top" | "bottom" | "left" | "right"
//   - maxDistance: 最大可见距离（米）
// - feature.show() / feature.hide() — API 控制显示/隐藏
// - listener: onShow(reason) / onHide(reason) — 监听状态变更
// =============================================================================

let { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

const C2 = Daisy.Cartesian2;
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

const reasonLabels = {
    initial: "初始化",
    api: "API 控制",
    "entity-selected": "实体选中",
    "entity-unselected": "实体取消",
    "outside-click": "外部点击",
    escape: "ESC 关闭",
    "hover-enter": "悬停进入",
    "hover-leave": "悬停离开",
    "entity-hidden": "实体隐藏",
    "missing-position": "无坐标",
    distance: "距离隐藏",
    occluded: "地球遮挡",
    offscreen: "屏幕外",
    rendered: "已渲染",
    destroy: "已销毁",
    "content-click": "内容点击",
    "marker-click": "点标记点击",
    "camera-focus": "相机聚焦",
    "range-inside": "门限内",
    "range-outside": "门限外",
    "range-enabled": "距离限制启用",
    "range-disabled": "距离限制关闭",
};

const targetSpecs = [
    {
        id: "always",
        name: "Telemetry",
        title: "常驻遥测",
        mode: "always",
        anchor: "top",
        lon: 115.82,
        lat: 39.58,
        color: "#5b8cff",
        accent: Color.fromCssColorString("#5b8cff"),
        maxDistance: 9_000_000,
        summary: "默认保持打开；外部点击不会关闭，点蓝色目标或按钮可重新打开。",
        detail: "用于常驻提示或任务面板，适合一直挂在实体附近的轻量信息。",
    },
    {
        id: "click",
        name: "Station",
        title: "点击详情",
        mode: "click",
        anchor: "bottom",
        lon: 117.04,
        lat: 39.86,
        color: "#24d18f",
        accent: Color.fromCssColorString("#24d18f"),
        maxDistance: 9_000_000,
        summary: "点击实体打开，再点实体、ESC 或空白区域关闭。",
        detail: "这个目标用于验证 selected / unselected 语义，以及外部关闭后的再次点击是否仍然顺滑。",
    },
    {
        id: "hover",
        name: "Hover",
        title: "悬停预览",
        mode: "hover",
        anchor: "left",
        lon: 116.18,
        lat: 40.72,
        color: "#ffb11f",
        accent: Color.fromCssColorString("#ffb11f"),
        maxDistance: 9_000_000,
        summary: "鼠标进入实体显示，离开实体和弹窗后延迟隐藏。",
        detail: "用于快速预览。弹窗自身也会保持 hover，方便用户移动进去点击内容。",
    },
    {
        id: "distance",
        name: "Range",
        title: "距离门限",
        mode: "always",
        anchor: "right",
        lon: 117.46,
        lat: 40.72,
        color: "var(--color-error)",
        accent: Color.fromCssColorString("#f4616e"),
        maxDistance: 900_000,
        summary: "请求保持 open；相机超过门限时只隐藏真实 DOM。",
        detail: "用于验证 requested visible 与 rendered visible 的区别，避免用户误以为 show() 失效。",
    },
];

const targets = [];
let selectedId = $state("click");
let distanceLimitKm = $state(900);
let distanceLimitEnabled = $state(true);
let eventRows = $state([]);
let statusRows = $state(targetSpecs.map((spec) => ({
    id: spec.id,
    title: spec.title,
    mode: spec.mode,
    color: spec.color,
    requested: spec.mode === "always",
    rendered: false,
    reason: "initial",
    distanceKm: 0,
    activated: false,
    hovered: false,
})));
let sequence = 0;
let contentClickCount = $state(0);
let removePostRender = undefined;

function reasonText(reason) {
    return reasonLabels[reason] ?? reason;
}

function statusFor(id) {
    return statusRows.find((row) => row.id === id) ?? statusRows[0];
}

function selectedTarget() {
    return targets.find((target) => target.id === selectedId) ?? targets[0];
}

function distanceKmFor(target) {
    const cameraPosition = engine.camera.getPosition();
    const position = target?.entity.getCurrentPosition();
    if (!cameraPosition || !position) return 0;
    const distance = engine.viewDistanceStrategy?.computeCameraToPositionDistance?.(cameraPosition, position, {
        celestialEllipsoid: target.entity.celestialEllipsoid,
        time: engine.clock?.currentTime,
    }) ?? Daisy.Cartesian3.distance(cameraPosition, position);
    return Number.isFinite(distance) ? distance / 1000 : 0;
}

function rangeTarget() {
    return targets.find((item) => item.id === "distance");
}

function pushEvent(target, reason, rendered, requested) {
    const row = {
        id: ++sequence,
        target: target.title,
        color: target.color,
        reason,
        rendered,
        requested,
        time: new Date().toLocaleTimeString(),
    };
    eventRows = [row, ...eventRows].slice(0, 12);
    __log(`[Popover] ${target.title}: ${reasonText(reason)} / requested=${requested ? "open" : "closed"} / rendered=${rendered ? "visible" : "hidden"}`);
}

function setStatus(id, patch) {
    statusRows = statusRows.map((row) => row.id === id ? { ...row, ...patch } : row);
}

function createPopoverContent(spec) {
    const root = document.createElement("div");
    root.className = "popover-card";
    root.innerHTML = `
        <div class="popover-kicker">${spec.mode.toUpperCase()} / ${spec.anchor}</div>
        <div class="popover-title">${spec.title}</div>
        <div class="popover-copy">${spec.detail}</div>
        <div class="popover-meta">
            <span>${spec.name}</span>
            <span>${spec.lon.toFixed(2)}E, ${spec.lat.toFixed(2)}N</span>
        </div>
        <button class="popover-action" type="button">记录内容点击</button>
    `;
    const button = root.querySelector("button");
    button?.addEventListener("click", (event) => {
        event.stopPropagation();
        contentClickCount += 1;
        pushEvent(spec, "content-click", statusFor(spec.id).rendered, statusFor(spec.id).requested);
    });
    return root;
}

function makeTarget(spec) {
    const entity = engine.createEntity(spec.title);
    entity.position = C3.fromDegrees(spec.lon, spec.lat, 0);

    const point = new Daisy.PointFeature({
        name: `${spec.id}-point`,
        sizePx: spec.id === "distance" ? 18 : 16,
        color: spec.accent,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    });
    entity.addFeature(point);

    entity.addFeature(new Daisy.UI.TextFeature({
        name: `${spec.id}-label`,
        text: `${spec.name}\n${spec.title}`,
        font: "12px Segoe UI, sans-serif",
        fillColor: Color.WHITE,
        style: Daisy.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        outlineColor: Color.BLACK,
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.55),
        backgroundPadding: new C2(7, 5),
        pixelOffset: new C2(0, -32),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    }));

    const popover = new Daisy.UI.PopoverFeature({
        element: createPopoverContent(spec),
        anchorPosition: spec.anchor,
        trigger: spec.mode,
        show: true,
        closeOnOutsideClick: spec.mode !== "always",
        closeOnEsc: spec.mode !== "always",
        hoverDelayMs: 260,
        maxDistance: spec.maxDistance,
        fixedWidth: 238,
        gap: 10,
        backgroundColor: "rgba(12, 16, 24, 0.94)",
        color: "#f4f7fb",
    });
    popover.onVisibilityChange((event) => {
        setStatus(spec.id, {
            requested: event.visible,
            rendered: event.rendered,
            reason: event.reason,
        });
        pushEvent(spec, event.reason, event.rendered, event.visible);
    });
    entity.addFeature(popover);

    entity.onSelected(() => {
        selectedId = spec.id;
        if (spec.mode === "always" && !popover.visible) {
            popover.show("api");
        }
        setStatus(spec.id, { activated: true });
    });
    entity.onUnSelected(() => {
        if (spec.mode === "always" && !popover.visible) {
            popover.show("api");
        }
        setStatus(spec.id, { activated: false });
    });
    point.onMouseEnter(() => setStatus(spec.id, { hovered: true }));
    point.onMouseLeave(() => setStatus(spec.id, { hovered: false }));
    point.onClick(() => {
        selectedId = spec.id;
        if (spec.mode === "always" && !popover.visible) {
            popover.show("api");
        }
        pushEvent(spec, "marker-click", statusFor(spec.id).rendered, statusFor(spec.id).requested);
    });

    return { ...spec, entity, popover, point };
}

for (const spec of targetSpecs) {
    targets.push(makeTarget(spec));
}

function refreshDistanceTelemetry() {
    statusRows = statusRows.map((row) => {
        const target = targets.find((item) => item.id === row.id);
        return {
            ...row,
            requested: target?.popover.visible ?? row.requested,
            rendered: target?.popover.renderedVisible ?? row.rendered,
            reason: target?.popover.lastVisibilityReason ?? row.reason,
            distanceKm: target ? distanceKmFor(target) : row.distanceKm,
            activated: target?.entity.activated ?? row.activated,
            hovered: target?.entity.hovered ?? row.hovered,
        };
    });
}

removePostRender = engine.onPostRender(refreshDistanceTelemetry);

function focusTarget(id = selectedId) {
    const target = targets.find((item) => item.id === id);
    if (!target) return;
    selectedId = id;
    if (target.mode === "always" && !target.popover.visible) {
        target.popover.show("api");
    }
    engine.camera.flyToTarget(C3.fromDegrees(target.lon, target.lat, 820_000), { duration: 0.55 });
    pushEvent(target, "camera-focus", statusFor(id).rendered, statusFor(id).requested);
}

function overview() {
    engine.camera.flyToTarget(C3.fromDegrees(116.62, 40.15, 2_350_000), { duration: 0.7 });
    __log("[Popover] 相机回到四目标总览");
}

function toggleSelected() {
    const target = selectedTarget();
    target.popover.toggle("api");
}

function showSelected() {
    const target = selectedTarget();
    target.popover.show("api");
}

function hideSelected() {
    const target = selectedTarget();
    target.popover.hide("api");
}

function openAll() {
    for (const target of targets) {
        target.popover.show("api");
    }
}

function closeAll() {
    for (const target of targets) {
        target.popover.hide("api");
    }
}

function applyDistanceLimit(value) {
    distanceLimitKm = value;
    const target = rangeTarget();
    if (!target) return;
    target.popover.options = {
        ...target.popover.options,
        maxDistance: distanceLimitEnabled ? distanceLimitKm * 1000 : 9_000_000,
    };
    engine.triggerUpdateOnce?.();
}

function toggleDistanceLimit() {
    distanceLimitEnabled = !distanceLimitEnabled;
    applyDistanceLimit(distanceLimitKm);
    const target = rangeTarget();
    if (target) {
        pushEvent(target, distanceLimitEnabled ? "range-enabled" : "range-disabled", statusFor("distance").rendered, statusFor("distance").requested);
    }
}

function focusDistanceInside() {
    const target = rangeTarget();
    if (!target) return;
    selectedId = "distance";
    target.popover.show("api");
    const height = Math.max(120_000, Math.min(distanceLimitKm * 350, 650_000));
    engine.camera.flyToTarget(C3.fromDegrees(target.lon, target.lat, height), { duration: 0.55 });
    engine.triggerUpdateOnce?.();
    pushEvent(target, "range-inside", statusFor("distance").rendered, statusFor("distance").requested);
}

function focusDistanceOutside() {
    const target = rangeTarget();
    if (!target) return;
    selectedId = "distance";
    target.popover.show("api");
    const height = Math.max(distanceLimitKm * 1000 + 1_200_000, 2_800_000);
    engine.camera.flyToTarget(C3.fromDegrees(target.lon, target.lat, height), { duration: 0.55 });
    engine.triggerUpdateOnce?.();
    pushEvent(target, "range-outside", statusFor("distance").rendered, statusFor("distance").requested);
}

engine.camera.flyToTarget(C3.fromDegrees(116.62, 40.15, 2_350_000));
__log("PopoverFeature 工作台已创建：状态、触发原因、距离门限和弹窗内部交互均可观察。");

registerCleanup(() => {
    if (removePostRender) {
        try { removePostRender(); } catch {}
        removePostRender = undefined;
    }
    for (const target of targets) {
        try { engine.removeEntity(target.entity); } catch {}
    }
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="弹窗控制台" width="340px" padding="12px">
    <div class="po-head">
        <div class="po-eyebrow">PopoverFeature</div>
        <div class="po-title-row">
            <span class="po-title">交互状态工作台</span>
            <span class="po-live">LIVE</span>
        </div>
    </div>

    <div class="po-target-strip">
        {#each targets as target}
            {@const row = statusFor(target.id)}
            <button
                class:active={selectedId === target.id}
                class:rendered={row.rendered}
                type="button"
                onclick={() => focusTarget(target.id)}
                title={`聚焦 ${target.title}`}
            >
                <span class="po-dot" style={`--dot:${target.color}`}></span>
                <span>{target.name}</span>
                <small>{row.rendered ? "可见" : reasonText(row.reason)}</small>
            </button>
        {/each}
    </div>

    {#each [selectedTarget()] as selected}
        {@const selectedRow = statusFor(selected.id)}
        <div class="po-selected" style={`--accent:${selected.color}`}>
            <div class="po-sel-top">
                <span>{selected.mode.toUpperCase()} / {selected.anchor}</span>
                <strong>{selected.title}</strong>
            </div>
            <p>{selected.summary}</p>
            <div class="po-state-grid">
                <div><span>请求</span><strong>{selectedRow.requested ? "OPEN" : "CLOSED"}</strong></div>
                <div><span>DOM</span><strong>{selectedRow.rendered ? "VISIBLE" : "HIDDEN"}</strong></div>
                <div><span>原因</span><strong>{reasonText(selectedRow.reason)}</strong></div>
                <div><span>距离</span><strong>{selectedRow.distanceKm.toFixed(0)} km</strong></div>
            </div>
            <div class="po-actions">
                <button type="button" onclick={showSelected}>打开</button>
                <button type="button" onclick={hideSelected}>关闭</button>
                <button type="button" onclick={toggleSelected}>切换</button>
                <button type="button" onclick={() => focusTarget(selected.id)}>聚焦</button>
            </div>
        </div>
    {/each}

    <div class="po-distance">
        <div class="po-dist-head">
            <label><input type="checkbox" checked={distanceLimitEnabled} onchange={toggleDistanceLimit} /> 距离门限</label>
            <strong>{distanceLimitKm} km</strong>
        </div>
        <div class="po-dist-meter">
            <span>实时距离</span>
            <strong>{statusFor("distance").distanceKm.toFixed(0)} km</strong>
        </div>
        <input type="range" min="300" max="2200" step="100" value={distanceLimitKm} oninput={(event) => applyDistanceLimit(Number(event.target.value))} />
        <div class="po-dist-actions">
            <button type="button" onclick={focusDistanceInside}>飞入门限内</button>
            <button type="button" onclick={focusDistanceOutside}>飞出门限外</button>
        </div>
    </div>

    <div class="po-toolbar">
        <button type="button" onclick={overview}>总览</button>
        <button type="button" onclick={openAll}>全部打开</button>
        <button type="button" onclick={closeAll}>全部关闭</button>
    </div>
</DemoPanel>

<DemoPanel title="状态矩阵" width="500px" right="12px" padding="12px">
    <div class="po-mat-head">
        <span>状态矩阵</span>
        <small>内容点击 {contentClickCount}</small>
    </div>
    <div class="po-mat-grid">
        {#each statusRows as row}
            <article class:visible={row.rendered} style={`--accent:${row.color}`}>
                <div class="po-mat-title">
                    <span>{row.title}</span>
                    <i></i>
                </div>
                <div class="po-mat-line"><span>请求</span><strong>{row.requested ? "open" : "closed"}</strong></div>
                <div class="po-mat-line"><span>渲染</span><strong>{row.rendered ? "visible" : "hidden"}</strong></div>
                <div class="po-mat-line"><span>事件</span><strong>{reasonText(row.reason)}</strong></div>
                <div class="po-mat-line"><span>交互</span><strong>{row.activated ? "selected" : row.hovered ? "hover" : "idle"}</strong></div>
            </article>
        {/each}
    </div>
</DemoPanel>

<DemoPanel title="事件回放" width="500px" right="12px" bottom="12px" padding="12px">
    <div class="po-mat-head">
        <span>事件回放</span>
        <small>最新 12 条</small>
    </div>
    <div class="po-events">
        {#if eventRows.length === 0}
            <div class="po-empty">等待点击、悬停或键盘关闭事件</div>
        {:else}
            {#each eventRows as row}
                <div class="po-ev-row" style={`--accent:${row.color}`}>
                    <i></i>
                    <div>
                        <strong>{row.target}</strong>
                        <span>{reasonText(row.reason)} / {row.requested ? "open" : "closed"} / {row.rendered ? "visible" : "hidden"}</span>
                    </div>
                    <time>{row.time}</time>
                </div>
            {/each}
        {/if}
    </div>
</DemoPanel>

<style>
    :global(.popover-card) {
        display: grid;
        gap: 8px;
        font-family: "Segoe UI", "Microsoft YaHei", sans-serif;
    }

    :global(.popover-kicker) {
        color: var(--color-accent-soft);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
    }

    :global(.popover-title) {
        color: var(--panel-text-bright);
        font-size: 15px;
        font-weight: 800;
        line-height: 1.15;
    }

    :global(.popover-copy) {
        color: var(--panel-text-muted);
        font-size: 12px;
        line-height: 1.55;
    }

    :global(.popover-meta) {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        color: var(--panel-text-muted);
        font-size: 10px;
        border-top: 1px solid var(--panel-border);
        padding-top: 8px;
    }

    :global(.popover-action) {
        height: 28px;
        border: 1px solid var(--color-accent);
        border-radius: 6px;
        background: var(--color-accent-muted);
        color: var(--panel-text);
        font-size: 12px;
        cursor: pointer;
    }

    /* ── Panel 1: 控制台 ── */
    .po-head {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--panel-border);
    }
    .po-eyebrow {
        color: var(--color-accent);
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
    .po-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 2px;
    }
    .po-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--panel-text-bright);
    }
    .po-live {
        border: 1px solid var(--color-success);
        border-radius: 999px;
        padding: 2px 7px;
        color: var(--color-success);
        background: var(--color-success-muted);
        font-size: 10px;
        font-weight: 700;
    }

    .po-target-strip {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
        margin-bottom: 10px;
    }
    .po-target-strip button {
        min-height: 46px;
        padding: 7px;
        text-align: left;
        display: grid;
        grid-template-columns: 10px 1fr;
        column-gap: 6px;
        row-gap: 2px;
        align-items: center;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
        color: var(--panel-text);
        font-family: inherit;
        cursor: pointer;
        transition: all 0.12s;
    }
    .po-target-strip button.active {
        border-color: var(--color-accent);
        background: var(--color-accent-muted);
    }
    .po-target-strip button.rendered {
        box-shadow: inset 0 0 0 1px var(--color-success-muted);
    }
    .po-target-strip button:hover {
        border-color: var(--color-accent);
    }
    .po-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--dot);
        box-shadow: 0 0 10px var(--dot);
    }
    .po-target-strip span:not(.po-dot) {
        font-size: 12px;
        font-weight: 700;
    }
    .po-target-strip small {
        grid-column: 2;
        color: var(--panel-text-muted);
        font-size: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .po-selected {
        border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
        border-radius: 8px;
        padding: 10px;
        background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 12%, transparent), var(--panel-bg-card));
        margin-bottom: 10px;
    }
    .po-sel-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .po-sel-top span {
        color: color-mix(in srgb, var(--accent) 80%, white);
        font-size: 10px;
        font-weight: 700;
    }
    .po-sel-top strong {
        font-size: 14px;
        color: var(--panel-text-bright);
    }
    .po-selected p {
        margin: 8px 0 10px;
        color: var(--panel-text-muted);
        font-size: 12px;
        line-height: 1.5;
    }
    .po-state-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
    }
    .po-state-grid div {
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        padding: 6px;
        background: rgba(0,0,0,0.05);
    }
    .po-state-grid span {
        display: block;
        color: var(--panel-text-muted);
        font-size: 10px;
    }
    .po-state-grid strong {
        display: block;
        margin-top: 2px;
        font-size: 11px;
        color: var(--panel-text-bright);
    }
    .po-actions {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        margin-top: 8px;
    }
    .po-actions button {
        height: 28px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
        color: var(--panel-text);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.12s;
    }
    .po-actions button:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-muted);
    }

    .po-distance {
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        padding: 10px;
        background: var(--panel-bg-card);
        margin-bottom: 8px;
    }
    .po-dist-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .po-dist-head label {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--panel-text);
        font-size: 12px;
        cursor: pointer;
    }
    .po-dist-head strong {
        color: var(--color-error);
        font-size: 12px;
    }
    .po-dist-meter {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        padding: 6px;
        background: rgba(0,0,0,0.05);
        color: var(--panel-text-muted);
        font-size: 11px;
    }
    .po-dist-meter strong {
        color: var(--color-error);
        font-size: 11px;
    }
    .po-distance input[type="range"] {
        width: 100%;
        margin: 8px 0 0;
        accent-color: var(--color-error);
    }
    .po-dist-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        margin-top: 6px;
    }
    .po-dist-actions button {
        height: 28px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
        color: var(--panel-text);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.12s;
    }
    .po-dist-actions button:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-muted);
    }

    .po-toolbar {
        display: flex;
        gap: 5px;
    }
    .po-toolbar button {
        flex: 1;
        height: 28px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
        color: var(--panel-text);
        font-size: 12px;
        cursor: pointer;
        transition: all 0.12s;
    }
    .po-toolbar button:hover {
        border-color: var(--color-accent);
        background: var(--color-accent-muted);
    }

    /* ── Panel 2 & 3: 状态矩阵 + 事件回放 ── */
    .po-mat-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .po-mat-head span {
        font-size: 13px;
        font-weight: 700;
        color: var(--panel-text-bright);
    }
    .po-mat-head small {
        color: var(--panel-text-muted);
        font-size: 10px;
    }

    .po-mat-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
    }
    .po-mat-grid article {
        border: 1px solid var(--panel-border);
        border-radius: 7px;
        padding: 8px;
        background: var(--panel-bg-card);
        min-width: 0;
    }
    .po-mat-grid article.visible {
        border-color: color-mix(in srgb, var(--accent) 60%, transparent);
        background: color-mix(in srgb, var(--accent) 10%, var(--panel-bg-card));
    }
    .po-mat-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        margin-bottom: 6px;
    }
    .po-mat-title span {
        font-size: 11px;
        font-weight: 700;
        color: var(--panel-text-bright);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .po-mat-title i {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 10px var(--accent);
        flex: 0 0 auto;
    }
    .po-mat-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 20px;
    }
    .po-mat-line span {
        color: var(--panel-text-muted);
        font-size: 10px;
    }
    .po-mat-line strong {
        font-size: 11px;
        color: var(--panel-text);
        max-width: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: right;
    }

    .po-events {
        display: grid;
        gap: 6px;
        max-height: 240px;
        overflow: auto;
    }
    .po-ev-row {
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        padding: 6px 8px;
        background: var(--panel-bg-card);
    }
    .po-ev-row i {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 10px var(--accent);
        flex: 0 0 auto;
    }
    .po-ev-row div {
        min-width: 0;
        flex: 1;
    }
    .po-ev-row strong {
        display: block;
        font-size: 11px;
        color: var(--panel-text-bright);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .po-ev-row span {
        display: block;
        color: var(--panel-text-muted);
        font-size: 10px;
        margin-top: 1px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .po-ev-row time {
        color: var(--panel-text-muted);
        font-size: 10px;
        flex: 0 0 auto;
    }
    .po-empty {
        border: 1px dashed var(--panel-border);
        border-radius: 6px;
        padding: 14px;
        color: var(--panel-text-muted);
        text-align: center;
        font-size: 12px;
    }
</style>
