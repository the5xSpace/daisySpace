<script lang="ts">
    import { onMount } from "svelte";
    import Sidebar from "./Sidebar.svelte";
    import DemoRunner from "./DemoRunner.svelte";
    import CodeEditor from "./CodeEditor.svelte";
    import LogConsole from "./LogConsole.svelte";
    import ErrorSystem from "./error/ErrorSystem.svelte";
    import { allDemos, findDemo, moduleGroups } from "../demos/registry";
    import { buildDisplayCode } from "../infra/displayCode";
    import type { DemoDefinition } from "../infra/types";

    let activeDemo: DemoDefinition | null = null;
    let activeDemoId: string | null = null;
    let daisyCode: string = "";
    let uiCode: string = "";
    let hasUi: boolean = false;
    let isSvelte: boolean = false;
    let svelteScript: string = "";
    let svelteTemplate: string = "";
    let svelteStyle: string = "";
    let jsCode: string = "";
    let hasTemplate: boolean = false;
    let hasStyle: boolean = false;
    let codeTab: "daisy" | "ui" | "script" | "template" | "css" | "js" = "daisy";
    let copyLabel = "复制";
    let copyTimer: ReturnType<typeof setTimeout> | null = null;
    let logs: string[] = [];
    let showCode = false;
    let showConsole = false;
    let sidePanelWidth = Math.max(340, Math.round(window.innerWidth / 2));
    let dragging = false;
    const assetBaseUrl = import.meta.env.BASE_URL;
    function getQueryDemoId(): string | null {
        return new URLSearchParams(location.search).get("id");
    }

    function navigateToDemo(demo: DemoDefinition) {
        history.pushState(null, "", `?id=${demo.id}`);
    }

    function applyQuery() {
        const id = getQueryDemoId();
        if (!id) return;
        const demo = findDemo(id);
        if (!demo || demo === activeDemo) return;
        activeDemo = demo;
        activeDemoId = demo.id;
        logs = [];
        loadCode(demo);
        scrollSidebarToDemo(demo.id);
    }

    function selectorSafeId(id: string) {
        return globalThis.CSS?.escape?.(id) ?? id.replace(/["\\]/g, "\\$&");
    }

    function scrollSidebarToDemo(id: string) {
        globalThis.setTimeout(() => {
            const nav = document.querySelector<HTMLElement>(".sidebar nav");
            const item = document.querySelector<HTMLElement>(`.sidebar [data-demo-id="${selectorSafeId(id)}"]`);
            if (!nav || !item) return;
            const navRect = nav.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            const nextTop = nav.scrollTop + itemRect.top - navRect.top - (nav.clientHeight - itemRect.height) / 2;
            nav.scrollTo({ top: Math.max(0, nextTop), behavior: "auto" });
        }, 80);
    }

    $: activeCodeText = isSvelte
        ? codeTab === "js" ? jsCode
          : codeTab === "script" ? svelteScript
          : codeTab === "template" ? svelteTemplate
          : svelteStyle
        : codeTab === "daisy" ? daisyCode : uiCode;

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(activeCodeText);
            copyLabel = "已复制";
            if (copyTimer) clearTimeout(copyTimer);
            copyTimer = setTimeout(() => { copyLabel = "复制"; }, 1500);
        } catch {
            copyLabel = "复制失败";
            if (copyTimer) clearTimeout(copyTimer);
            copyTimer = setTimeout(() => { copyLabel = "复制"; }, 1500);
        }
    }

    function onDragStart(e: MouseEvent) {
        dragging = true;
        e.preventDefault();
        const onMove = (ev: MouseEvent) => {
            const vw = window.innerWidth;
            const newWidth = vw - ev.clientX;
            sidePanelWidth = Math.max(280, Math.min(vw - 220, newWidth));
        };
        const onUp = () => {
            dragging = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }

    $: quickStartDemos = allDemos.slice(0, 6);

    const moduleIcons: Record<string, string> = {};
    for (const g of moduleGroups) {
        moduleIcons[g.id] = g.icon ?? "📦";
    }

    function handleSelect(demo: DemoDefinition) {
        activeDemo = demo;
        activeDemoId = demo.id;
        logs = [];
        loadCode(demo);
        navigateToDemo(demo);
        scrollSidebarToDemo(demo.id);
    }

    async function loadCode(demo: DemoDefinition) {
        try {
            const demoCode = await demo.code();
            const result = buildDisplayCode(demo, demoCode);
            daisyCode = result.daisyCode;
            uiCode = result.uiCode;
            hasUi = result.hasUi;
            isSvelte = result.isSvelte;
            svelteScript = result.svelteScript;
            svelteTemplate = result.svelteTemplate;
            svelteStyle = result.svelteStyle;
            jsCode = result.jsCode;
            hasTemplate = result.hasTemplate;
            hasStyle = result.hasStyle;
            codeTab = isSvelte ? "js" : "daisy";
        } catch (e) {
            daisyCode = "// Failed to load demo code";
            uiCode = "";
            hasUi = false;
            isSvelte = false;
            svelteScript = "";
            svelteTemplate = "";
            svelteStyle = "";
            jsCode = "";
            hasTemplate = false;
            hasStyle = false;
            codeTab = "daisy";
        }
    }

    onMount(() => {
        applyQuery();
        window.addEventListener("popstate", applyQuery);
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="flex w-screen h-screen overflow-hidden bg-bg-root text-txt font-sans text-[14px] leading-[1.55] antialiased"
    class:cursor-col-resize={dragging}
>
    <Sidebar
        bind:activeDemoId
        on:select={(e) => handleSelect(e.detail)}
        modules={moduleGroups}
        demos={allDemos}
    />

    <ErrorSystem />

    <main class="flex-1 flex flex-col overflow-hidden min-w-0">
        {#if activeDemo}
            <!-- ── Header Bar ── -->
        <header class="topbar relative flex items-center justify-between px-5 py-3 bg-bg-surface/80 border-b border-border-subtle backdrop-blur-lg shrink-0 z-10">
                <!-- Subtle top accent line -->
                <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent"></div>

                <div class="demo-info min-w-0 flex items-center gap-3">
                    <div class="demo-icon flex items-center justify-center text-accent shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                    </div>
                    <div class="min-w-0">
                        <h2 class="m-0 text-[15px] font-semibold text-txt tracking-tight truncate leading-[1.2]">{activeDemo.title}</h2>
                        <p class="m-0 text-[12px] text-txt-tertiary truncate max-w-[560px] leading-[1.25] mt-1">{activeDemo.subtitle}</p>
                    </div>
                </div>

                <!-- Right actions -->
                <div class="topbar-actions flex items-center gap-1.5 !px-3">
                    <button
                        class="panel-toggle group
                            {showCode
                                ? 'panel-toggle-active'
                                : ''}"
                        on:click={() => (showCode = !showCode)}
                        title="切换代码面板"
                    >
                        <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        <span>代码</span>
                    </button>
                    <button
                        class="panel-toggle group
                            {showConsole
                                ? 'panel-toggle-active'
                                : ''}"
                        on:click={() => (showConsole = !showConsole)}
                        title="切换控制台"
                    >
                        <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                        <span>控制台</span>
                    </button>
                </div>
            </header>

            <!-- ── Main Content Area ── -->
            <div class="flex-1 min-h-0 flex overflow-hidden">
                <!-- Demo viewport: always 100% w/h of remaining space -->
                <div class="flex-1 min-w-0 min-h-0 relative overflow-hidden">
                    <DemoRunner demo={activeDemo} bind:logs />
                </div>

                <!-- Side Panel -->
                {#if showCode || showConsole}
                    <!-- Drag Handle -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div
                        class="relative w-[5px] shrink-0 cursor-col-resize flex items-center justify-center group"
                        class:is-dragging={dragging}
                        on:mousedown={onDragStart}
                    >
                        <!-- Invisible hit area -->
                        <div class="absolute inset-y-0 -left-[6px] -right-[6px]"></div>
                        <!-- Visible grip -->
                        <div class="drag-grip absolute w-[3px] h-10 rounded-full transition-all duration-200 ease-out
                            {dragging ? 'bg-accent h-14 shadow-[var(--shadow-glow-accent)]' : 'bg-border-subtle group-hover:bg-accent/40 group-hover:h-12'}"
                        ></div>
                    </div>

                    <!-- Panel -->
                    <aside class="panel min-w-[340px] flex flex-col border-l border-border-subtle bg-bg-surface/60 backdrop-blur-sm" style="width:{sidePanelWidth}px">
                        {#if showCode}
                            <section class="code-panel flex-[2] overflow-hidden border-b border-border-subtle flex flex-col select-text">
                                <!-- Code Tabs Bar -->
                                <div class="panel-head flex items-center justify-between shrink-0">
                                    <div class="tab-strip">
                                        {#if isSvelte}
                                            <button class="tab-btn {codeTab === 'js' ? 'tab-active' : ''}" on:click={() => (codeTab = "js")}>
                                                <span>JS</span>
                                            </button>
                                            <button class="tab-btn {codeTab === 'script' ? 'tab-active' : ''}" on:click={() => (codeTab = "script")}>
                                                <span>SvelteScript</span>
                                            </button>
                                            {#if hasTemplate}
                                                <button class="tab-btn {codeTab === 'template' ? 'tab-active' : ''}" on:click={() => (codeTab = "template")}>
                                                    <span>Template</span>
                                                </button>
                                            {/if}
                                            {#if hasStyle}
                                                <button class="tab-btn {codeTab === 'css' ? 'tab-active' : ''}" on:click={() => (codeTab = "css")}>
                                                    <span>Style</span>
                                                </button>
                                            {/if}
                                        {:else if hasUi}
                                            <button class="tab-btn {codeTab === 'daisy' ? 'tab-active' : ''}" on:click={() => (codeTab = "daisy")}>
                                                <span>SDK</span>
                                            </button>
                                            <button class="tab-btn {codeTab === 'ui' ? 'tab-active' : ''}" on:click={() => (codeTab = "ui")}>
                                                <span>UI</span>
                                            </button>
                                        {:else}
                                            <span class="px-3 py-[5px] text-[11px] font-medium text-accent/70 bg-accent-subtle rounded-md cursor-default">SDK</span>
                                        {/if}
                                    </div>
                                    <button
                                        class="copy-button {copyLabel === '已复制' ? 'copy-success' : ''}"
                                        on:click={copyCode}
                                        title="复制代码"
                                    >
                                        {#if copyLabel === "已复制"}
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        {:else}
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                        {/if}
                                        <span>{copyLabel}</span>
                                    </button>
                                </div>
                                <!-- Code Content -->
                                <div class="flex-1 overflow-hidden">
                                    <CodeEditor
                                        code={activeCodeText}
                                        readOnly={true}
                                        language={isSvelte
                                            ? codeTab === "css" ? "css"
                                              : codeTab === "template" ? "html"
                                              : codeTab === "js" ? "js"
                                              : "ts"
                                            : "ts"}
                                    />
                                </div>
                            </section>
                        {/if}
                        {#if showConsole}
                            <section class="console-panel flex-1 min-h-[180px] overflow-hidden">
                                <LogConsole {logs} on:clear={() => { logs = []; }} />
                            </section>
                        {/if}
                    </aside>
                {/if}
            </div>
        {:else}
            <!-- ═══════════════ Welcome Screen ═══════════════ -->
            <div class="welcome-root">
                <!-- Ambient glow -->
                <div class="welcome-glow"></div>

                <div class="welcome-content">
                    <!-- ═══ Hero ═══ -->
                    <div class="hero-section">
                        <img
                            class="hero-logo"
                            src={`${assetBaseUrl}logo/128x128@2x.png`}
                            alt="DaisySpace"
                            width="112"
                            height="112"
                        />
                        <p class="hero-subtitle">空天仿真 SDK 交互演示平台</p>
                    </div>

                    <!-- ═══ Quick Start ═══ -->
                    <div class="quickstart-section">
                        <div class="quickstart-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            <span>快速开始</span>
                        </div>
                        <div class="quickstart-grid">
                            {#each quickStartDemos as demo (demo.id)}
                                {@const modIcon = moduleIcons[demo.module] ?? "📦"}
                                <button
                                    class="quick-card"
                                    on:click={() => handleSelect(demo)}
                                    title={demo.subtitle}
                                >
                                    <div class="quick-card-top">
                                        <span class="quick-badge">{@html modIcon}</span>
                                        <span class="quick-title">{demo.title}</span>
                                    </div>
                                    <p class="quick-desc">{demo.subtitle}</p>
                                </button>
                            {/each}
                        </div>
                    </div>

                    <!-- ═══ Stats ═══ -->
                    <div class="stats-bar">
                        <div class="stat-item">
                            <span class="stat-value">{moduleGroups.length}</span>
                            <span class="stat-label">功能模块</span>
                        </div>
                        <div class="stat-divider"></div>
                        <div class="stat-item">
                            <span class="stat-value">{allDemos.length}</span>
                            <span class="stat-label">交互示例</span>
                        </div>
                    </div>

                    <!-- ═══ Hint ═══ -->
                    <p class="welcome-hint">
                        在左侧搜索或从分类导航中选择，<br/>
                        探索引擎创建、实体操作、物理世界、材质效果、相机控制等核心能力
                    </p>
                </div>
            </div>
        {/if}
    </main>
</div>

<style>
    .topbar {
        min-height: 62px;
        background:
            linear-gradient(180deg, rgba(var(--ds-bg-surface-rgb), 0.94), rgba(var(--ds-bg-root-rgb), 0.9)),
            var(--color-bg-surface);
    }
    .demo-icon {
        width: 32px;
        height: 32px;
        border: 1px solid rgba(77, 168, 255, 0.16);
        border-radius: 8px;
        background: rgba(77, 168, 255, 0.07);
    }
    .panel-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 34px;
        padding: 0 11px;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--color-txt-tertiary);
        background: transparent;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.16s ease, background 0.16s ease, border-color 0.16s ease, transform 0.16s ease;
    }
    .panel-toggle:hover {
        color: var(--color-txt-secondary);
        background: rgba(var(--ds-txt-rgb), 0.04);
    }
    .panel-toggle-active {
        color: var(--color-accent);
        border-color: rgba(77, 168, 255, 0.14);
        background: rgba(77, 168, 255, 0.09);
    }
    .code-panel {
        background: var(--color-bg-inset);
    }
    .panel-head {
        min-height: 42px;
        padding: 6px 10px 6px 12px;
        border-bottom: 1px solid var(--color-border-subtle);
        background: rgba(var(--ds-txt-rgb), 0.018);
    }
    .tab-strip {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        padding: 3px;
        border-radius: 8px;
        background: rgba(var(--ds-txt-rgb), 0.035);
    }
    .copy-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 28px;
        padding: 0 9px;
        border: 1px solid transparent;
        border-radius: 7px;
        color: var(--color-txt-tertiary);
        background: transparent;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
    }
    .copy-button:hover {
        color: var(--color-accent);
        border-color: rgba(77, 168, 255, 0.12);
        background: rgba(77, 168, 255, 0.07);
    }
    .copy-button:active {
        transform: scale(0.97);
    }
    .copy-success {
        color: var(--color-success);
    }
    /* ── Tab Buttons ── */
    .tab-btn {
        height: 28px;
        padding: 0 11px;
        font-size: 11px;
        font-weight: 600;
        border-radius: 6px;
        transition: all 0.15s ease;
        cursor: pointer;
        background: transparent;
        color: var(--color-txt-tertiary);
        border: none;
    }
    .tab-btn:hover {
        color: var(--color-txt-secondary);
        background: rgba(var(--ds-txt-rgb), 0.04);
    }
    .tab-btn.tab-active {
        color: var(--color-accent);
        background: rgba(77, 168, 255, 0.1);
        box-shadow: 0 0 0 1px rgba(77, 168, 255, 0.08);
    }

    /* ── Drag Handle Glow ── */
    .drag-grip {
        box-shadow: 0 0 0 transparent;
        transition: background-color 0.2s ease, height 0.2s ease, box-shadow 0.2s ease;
    }
    .is-dragging .drag-grip {
        background: var(--color-accent);
        height: 3.5rem;
        box-shadow: var(--shadow-glow-accent);
    }
    .group:hover .drag-grip {
        background: rgba(77, 168, 255, 0.4);
        height: 3rem;
    }

    /* ── Panel entrance ── */
    .panel {
        animation: slide-in-panel 0.25s var(--ease-out-expo);
    }
    @keyframes slide-in-panel {
        from { opacity: 0; transform: translateX(16px); }
        to { opacity: 1; transform: translateX(0); }
    }

    /* ════════════════════════════════════════════
       WELCOME PAGE
       ════════════════════════════════════════════ */
    .welcome-root {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        position: relative;
        overflow: hidden;
        background:
            linear-gradient(165deg,
                var(--color-bg-root) 0%,
                var(--color-bg-base) 40%,
                var(--color-bg-surface) 100%
            );
    }
    .welcome-glow {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }
    .welcome-glow::before {
        content: "";
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(77, 168, 255, 0.04) 0%, transparent 60%);
        filter: blur(100px);
    }
    .welcome-glow::after {
        content: "";
        position: absolute;
        bottom: 10%;
        left: 40%;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(179, 142, 240, 0.03) 0%, transparent 60%);
        filter: blur(80px);
    }

    .welcome-content {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        padding: 24px 48px;
        max-width: 680px;
        animation: fade-in 0.4s var(--ease-smooth);
    }

    /* ── Hero ── */
    .hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .hero-logo {
        display: block;
        width: 112px;
        height: 112px;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: var(--shadow-md);
    }
    .hero-subtitle {
        font-size: 13px;
        color: var(--color-txt-secondary);
        margin: 4px 0 0 0;
        text-align: center;
    }

    /* ── Quick Start ── */
    .quickstart-section {
        width: 100%;
    }
    .quickstart-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 12px;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-txt-tertiary);
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }
    .quickstart-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
    }
    .quick-card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px 14px;
        border: 1px solid var(--color-border-default);
        border-radius: 10px;
        background: rgba(var(--ds-txt-rgb), 0.02);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        transition: background 0.18s ease, border-color 0.18s ease, transform 0.15s ease, box-shadow 0.18s ease;
    }
    .quick-card:hover {
        background: rgba(77, 168, 255, 0.05);
        border-color: rgba(77, 168, 255, 0.12);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    .quick-card:active {
        transform: translateY(0) scale(0.99);
    }
    .quick-card-top {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .quick-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        font-size: 11px;
        border-radius: 5px;
        background: rgba(77, 168, 255, 0.08);
        flex-shrink: 0;
    }
    .quick-title {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-txt);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .quick-desc {
        margin: 0;
        font-size: 10px;
        line-height: 1.4;
        color: var(--color-txt-tertiary);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* ── Stats ── */
    .stats-bar {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 14px 28px;
        border: 1px solid var(--color-border-subtle);
        border-radius: 10px;
        background: rgba(var(--ds-txt-rgb), 0.015);
    }
    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
    }
    .stat-value {
        font-size: 16px;
        font-weight: 700;
        color: var(--color-txt);
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
    }
    .stat-label {
        font-size: 10px;
        font-weight: 500;
        color: var(--color-txt-tertiary);
        letter-spacing: 0.04em;
    }
    .stat-divider {
        width: 1px;
        height: 28px;
        background: var(--color-border-subtle);
    }

    /* ── Hint ── */
    .welcome-hint {
        margin: 0;
        font-size: 12px;
        line-height: 1.6;
        color: var(--color-txt-tertiary);
        text-align: center;
        max-width: 420px;
    }
</style>
