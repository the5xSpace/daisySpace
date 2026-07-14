<script lang="ts">
    import { onMount, tick } from "svelte";
    import type { DemoDefinition, DemoModuleGroup } from "../infra/types";
    import { createEventDispatcher } from "svelte";

    export let modules: DemoModuleGroup[] = [];
    export let demos: DemoDefinition[] = [];
    export let activeDemoId: string | null = null;

    let collapsed: Record<string, boolean> = {};
    let navEl: HTMLElement | null = null;
    let lastScrolledDemoId: string | null = null;
    let scrollTimer: ReturnType<typeof globalThis.setTimeout> | null = null;
    let routeDemoId: string | null = null;
    let theme: "light" | "dark" = "dark";
    let hoveredDemoId: string | null = null;
    let showSiteMap = false;
    let siteMapQuery = "";
    const assetBaseUrl = import.meta.env.BASE_URL;

    const dispatch = createEventDispatcher<{ select: DemoDefinition }>();

    // ── Theme persistence ──
    function loadTheme(): "light" | "dark" {
        const stored = globalThis.localStorage?.getItem("ds-playground-theme");
        if (stored === "light" || stored === "dark") return stored;
        return globalThis.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }

    function applyTheme(t: "light" | "dark") {
        theme = t;
        globalThis.document.documentElement.classList.toggle("sidebar-theme-light", t === "light");
        globalThis.document.documentElement.classList.toggle("sidebar-theme-dark", t === "dark");
        try { globalThis.localStorage?.setItem("ds-playground-theme", t); } catch {}
    }

    function toggleTheme() {
        applyTheme(theme === "dark" ? "light" : "dark");
    }

    const difficultyLabel: Record<DemoDefinition["difficulty"], string> = {
        basic: "初",
        intermediate: "中",
        advanced: "高",
    };

    const difficultyDotColor: Record<string, string> = {
        basic: "#3ecf8e",
        intermediate: "#f0b94d",
        advanced: "#f4616e",
    };

    // █████████████████████████████████████████████████████████████████████
    //  Site map (modal) — filtered items
    // █████████████████████████████████████████████████████████████████████
    $: siteMapGroups = modules
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((m) => ({
            module: m,
            items: demos.filter((d) => d.module === m.id),
        }))
        .filter((g) => g.items.length > 0);

    $: siteMapFiltered = siteMapQuery
        ? siteMapGroups
              .map((g) => ({
                  ...g,
                  items: g.items.filter(
                      (d) =>
                          d.title.toLowerCase().includes(siteMapQuery.toLowerCase()) ||
                          d.subtitle.toLowerCase().includes(siteMapQuery.toLowerCase()) ||
                          d.tags.some((t) => t.toLowerCase().includes(siteMapQuery.toLowerCase()))
                  ),
              }))
              .filter((g) => g.items.length > 0)
        : siteMapGroups;

    // █████████████████████████████████████████████████████████████████████
    //  Sidebar — always shows full list (no inline filtering)
    // █████████████████████████████████████████████████████████████████████
    $: grouped = modules
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((m) => ({
            module: m,
            items: demos.filter((d) => d.module === m.id),
        }))
        .filter((g) => g.items.length > 0);

    $: currentDemoId = activeDemoId ?? routeDemoId;

    // ── Accordion: init all collapsed ──
    let inited = false;
    $: if (grouped.length && !inited) {
        inited = true;
        for (const g of grouped) {
            collapsed[g.module.id] = true;
        }
        collapsed = collapsed;
    }

    // ── Accordion toggle: only one module open at a time ──
    function toggle(moduleId: string) {
        const wasCollapsed = collapsed[moduleId];
        for (const key of Object.keys(collapsed)) {
            collapsed[key] = true;
        }
        collapsed[moduleId] = !wasCollapsed;
        collapsed = collapsed;
    }

    // ── Auto-expand parent module from route (called from onMount / popstate) ──
    function autoExpandFromRoute(id: string | null) {
        if (!id) return;
        const demo = demos.find((d) => d.id === id);
        if (!demo || collapsed[demo.module] === undefined) return;
        for (const key of Object.keys(collapsed)) {
            collapsed[key] = true;
        }
        collapsed[demo.module] = false;
        collapsed = collapsed;
    }

    function selectDemo(demo: DemoDefinition) {
        activeDemoId = demo.id;
        dispatch("select", demo);
    }

    function openSiteMap() {
        siteMapQuery = "";
        showSiteMap = true;
    }

    function closeSiteMap() {
        showSiteMap = false;
    }

    function highlightText(text: string, query: string): string {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${escaped})`, "gi");
        return text.replace(regex, '<mark class="sitemap-mark">$1</mark>');
    }

    function getRouteDemoId() {
        return new URLSearchParams(globalThis.location?.search).get("id") || null;
    }

    function formatModuleLabel(label: string) {
        const parts = label.split(/\s+/);
        return {
            title: parts[0] ?? label,
            caption: parts.slice(1).join(" "),
        };
    }

    function selectorSafeId(id: string) {
        return globalThis.CSS?.escape?.(id) ?? id.replace(/["\\]/g, "\\$&");
    }

    async function scrollActiveDemoIntoView() {
        if (!currentDemoId || !navEl || currentDemoId === lastScrolledDemoId) return;
        await tick();
        globalThis.requestAnimationFrame(() => {
            if (!currentDemoId || !navEl) return;
            const estimatedTop = estimateDemoTop(currentDemoId);
            if (estimatedTop !== null) {
                navEl.scrollTo({
                    top: Math.max(0, estimatedTop - navEl.clientHeight / 2 + 24),
                    behavior: "auto",
                });
            }
            const activeButton = navEl.querySelector<HTMLElement>(`[data-demo-id="${selectorSafeId(currentDemoId)}"]`);
            if (!activeButton) {
                lastScrolledDemoId = currentDemoId;
                return;
            }
            const navRect = navEl.getBoundingClientRect();
            const itemRect = activeButton.getBoundingClientRect();
            const centeredTop = navEl.scrollTop + itemRect.top - navRect.top - (navEl.clientHeight - itemRect.height) / 2;
            navEl.scrollTo({ top: Math.max(0, centeredTop), behavior: "auto" });
            lastScrolledDemoId = currentDemoId;
        });
    }

    function estimateDemoTop(id: string) {
        let top = 0;
        for (const group of grouped) {
            top += 40;
            if (collapsed[group.module.id]) {
                // still need to account for module header
                top += 0; // header already counted
            } else {
                const index = group.items.findIndex((demo) => demo.id === id);
                if (index >= 0) return top + index * 40;
                top += group.items.length * 40 + 6;
            }
        }
        return null;
    }

    function queueActiveDemoScroll() {
        if (scrollTimer) globalThis.clearTimeout(scrollTimer);
        scrollTimer = globalThis.setTimeout(() => {
            lastScrolledDemoId = null;
            scrollActiveDemoIntoView();
        }, 0);
    }

    $: if (currentDemoId && grouped.length && navEl) {
        queueActiveDemoScroll();
    }

    onMount(() => {
        applyTheme(loadTheme());
        routeDemoId = getRouteDemoId();
        autoExpandFromRoute(routeDemoId);
        const onPopState = () => {
            routeDemoId = getRouteDemoId();
            autoExpandFromRoute(routeDemoId);
            queueActiveDemoScroll();
        };
        globalThis.addEventListener("popstate", onPopState);
        queueActiveDemoScroll();
        const delayedScroll = globalThis.setTimeout(queueActiveDemoScroll, 120);
        return () => {
            if (scrollTimer) globalThis.clearTimeout(scrollTimer);
            globalThis.clearTimeout(delayedScroll);
            globalThis.removeEventListener("popstate", onPopState);
        };
    });
</script>

<aside class="sidebar">
    <!-- ═══════════ Brand ═══════════ -->
    <div class="brand-section">
        <img
            class="brand-logo"
            src={`${assetBaseUrl}logo/64x64@2x.png`}
            alt="DaisySpace"
            width="40"
            height="40"
        />
        <div class="brand-text">
            <div class="brand-title">DaisySpace <span class="brand-accent">Sdk</span></div>
            <p class="brand-subtitle">空天仿真 SDK 交互演示</p>
        </div>
    </div>

    <!-- ═══════════ Search (opens site map modal) ═══════════ -->
    <div class="search-section">
        <button class="search-btn" on:click={openSiteMap}>
            <svg class="search-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span class="search-btn-text">搜索示例…</span>
            <svg class="search-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
            </svg>
        </button>
    </div>

    <!-- ═══════════ Navigation ═══════════ -->
    <nav bind:this={navEl} class="nav-area">
        {#each grouped as { module, items } (module.id)}
            {@const moduleLabel = formatModuleLabel(module.label)}
            <div class="module-block">
                <!-- Module Header -->
                <button class="module-head" on:click={() => toggle(module.id)}>
                    <span class="module-bar"></span>
                    <span class="chevron-wrap">
                        <svg class="chevron {collapsed[module.id] ? '' : 'chevron-open'}" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                    <span class="module-icon">{@html module.icon}</span>
                    <span class="module-label">
                        <span class="module-title">{moduleLabel.title}</span>
                        {#if moduleLabel.caption}
                            <span class="module-caption">{moduleLabel.caption}</span>
                        {/if}
                    </span>
                    <span class="module-count">{items.length}</span>
                </button>

                <!-- Demo List (collapsible) -->
                <div class="demo-collapse {collapsed[module.id] ? 'demo-collapsed' : 'demo-expanded'}">
                    <div class="demo-list-inner">
                        {#each items as demo (demo.id)}
                            {@const isHovered = hoveredDemoId === demo.id}
                            {@const isActive = currentDemoId === demo.id}
                            <button
                                class="demo-item"
                                class:demo-active={isActive}
                                data-demo-id={demo.id}
                                on:click={() => selectDemo(demo)}
                                on:mouseenter={() => hoveredDemoId = demo.id}
                                on:mouseleave={() => hoveredDemoId = null}
                                title={demo.subtitle}
                            >
                                {#if isActive}
                                    <span class="active-bar"></span>
                                {/if}
                                <!-- Difficulty dot -->
                                <span class="diff-dot" style="background:{difficultyDotColor[demo.difficulty]}" title={difficultyLabel[demo.difficulty]}></span>
                                <!-- Title -->
                                <span class="demo-title">{demo.title}</span>
                                <!-- Subtitle (visible on hover/active) -->
                                <span class="demo-subtitle" class:subtitle-visible={isHovered || isActive}>{demo.subtitle}</span>
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </nav>

    <!-- ═══════════ Footer ═══════════ -->
    <div class="footer">
        <div class="footer-stats">
            <span>共 {demos.length} 个示例</span>
            <span class="footer-version">v0.1.0</span>
        </div>
        <button class="theme-toggle" on:click={toggleTheme} title={theme === 'dark' ? '切换亮色主题' : '切换暗色主题'}>
            {#if theme === 'dark'}
                <!-- Sun -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            {:else}
                <!-- Moon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            {/if}
        </button>
    </div>

    <!-- ═══════════ Site Map Modal ═══════════ -->
    {#if showSiteMap}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            class="sitemap-overlay"
            on:click|self={closeSiteMap}
            on:keydown={(e) => e.key === 'Escape' && closeSiteMap()}
            role="dialog"
            aria-modal="true"
            tabindex="-1"
        >
            <div class="sitemap-panel">
                <div class="sitemap-header">
                    <div class="sitemap-search-wrap">
                        <svg class="sitemap-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="text"
                            class="sitemap-search-input"
                            placeholder="搜索示例…"
                            bind:value={siteMapQuery}
                        />
                        {#if siteMapQuery}
                            <button class="sitemap-search-clear" on:click={() => siteMapQuery = ''} aria-label="清空搜索词">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                            </button>
                        {/if}
                    </div>
                    <button class="sitemap-close" on:click={closeSiteMap} aria-label="关闭">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="sitemap-body">
                    {#each siteMapFiltered as group}
                        <div class="sitemap-group">
                            <div class="sitemap-group-head">
                                <span class="sitemap-group-icon">{@html group.module.icon}</span>
                                <span class="sitemap-group-label">{@html highlightText(group.module.label, siteMapQuery)}</span>
                                <span class="sitemap-group-count">{group.items.length}</span>
                            </div>
                            {#each group.items as demo}
                                <button
                                    class="sitemap-item"
                                    class:sitemap-item-active={currentDemoId === demo.id}
                                    data-demo-id={demo.id}
                                    on:click={() => { selectDemo(demo); closeSiteMap(); }}
                                >
                                    <span class="diff-dot" style="background:{difficultyDotColor[demo.difficulty]}" title={difficultyLabel[demo.difficulty]}></span>
                                    <span class="sitemap-item-title">{@html highlightText(demo.title, siteMapQuery)}</span>
                                    <span class="sitemap-item-sub">{@html highlightText(demo.subtitle, siteMapQuery)}</span>
                                </button>
                            {/each}
                        </div>
                    {/each}
                    {#if siteMapFiltered.length === 0}
                        <div class="sitemap-empty">未找到匹配的示例</div>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</aside>

<style>
    /* ════════════════════════════════════════════════
       SIDEBAR — Compact + Light/Dark
       ════════════════════════════════════════════════ */

    /* ── Container ── */
    .sidebar {
        display: flex;
        flex-direction: column;
        width: 226px;
        min-width: 226px;
        height: 100vh;
        overflow: hidden;
        user-select: none;
        background: var(--color-bg-root);
        border-right: 1px solid var(--color-border-subtle);
        color: var(--color-txt);
    }

    /* ── Brand Section ── */
    .brand-section {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 16px 0 16px;
        flex-shrink: 0;
    }
    .brand-logo {
        display: block;
        width: 40px;
        height: 40px;
        object-fit: contain;
        border-radius: 6px;
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
    }
    .brand-text {
        min-width: 0;
    }
    .brand-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-txt);
        letter-spacing: -0.02em;
        line-height: 1.2;
    }
    .brand-accent {
        color: var(--color-accent);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-left: 2px;
    }
    .brand-subtitle {
        margin: 2px 0 0 0;
        font-size: 11px;
        color: var(--color-txt-tertiary);
        line-height: 1.3;
    }

    /* ── Search Section ── */
    .search-section {
        padding: 12px 12px 8px 12px;
        flex-shrink: 0;
    }
    .search-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 34px;
        padding: 0 10px;
        border: 1px solid var(--color-border-default);
        border-radius: 7px;
        background: var(--color-bg-surface);
        color: var(--color-txt-tertiary);
        font-family: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
    }
    .search-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-txt-secondary);
        background: var(--color-bg-hover);
    }
    .search-btn-icon {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        color: var(--color-txt-tertiary);
        transition: color 0.18s ease;
    }
    .search-btn:hover .search-btn-icon {
        color: var(--color-accent);
    }
    .search-btn-text {
        flex: 1;
        text-align: left;
        color: var(--color-txt-tertiary);
    }
    .search-btn-arrow {
        width: 10px;
        height: 10px;
        flex-shrink: 0;
        color: var(--color-txt-muted);
        opacity: 0.5;
        transition: opacity 0.18s ease;
    }
    .search-btn:hover .search-btn-arrow {
        opacity: 1;
        color: var(--color-accent);
    }

    /* ── Navigation Area ── */
    .nav-area {
        flex: 1;
        overflow-y: auto;
        padding: 4px 8px 8px 8px;
    }
    .nav-area::-webkit-scrollbar {
        width: 4px;
    }
    .nav-area::-webkit-scrollbar-thumb {
        background: var(--color-scrollbar);
        border-radius: 999px;
    }

    /* ── Module Block ── */
    .module-block {
        margin-bottom: 6px;
    }

    /* ── Module Head ── */
    .module-head {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 6px;
        padding: 8px 8px 8px 4px;
        border: 0;
        border-radius: 6px;
        color: var(--color-txt-secondary);
        background: transparent;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        font-size: 12px;
        transition: background 0.15s ease, color 0.15s ease;
    }
    .module-head:hover {
        color: var(--color-txt);
        background: var(--color-bg-hover);
    }

    /* Left accent bar */
    .module-bar {
        width: 3px;
        height: 16px;
        border-radius: 0 3px 3px 0;
        background: transparent;
        flex-shrink: 0;
        transition: background 0.2s ease;
    }
    .module-head:hover .module-bar {
        background: var(--color-accent);
    }

    .chevron-wrap {
        display: grid;
        place-items: center;
        width: 14px;
        height: 14px;
        flex-shrink: 0;
    }
    .chevron {
        color: var(--color-txt-tertiary);
        transition: transform 0.2s ease, color 0.15s ease;
    }
    .chevron-open {
        transform: rotate(90deg);
        color: var(--color-accent);
    }
    .module-icon {
        display: grid;
        place-items: center;
        width: 20px;
        height: 20px;
        border-radius: 5px;
        font-size: 11px;
        flex-shrink: 0;
        color: var(--color-accent);
        background: var(--color-accent-muted);
    }
    .module-label {
        display: flex;
        align-items: baseline;
        flex: 1;
        min-width: 0;
        gap: 5px;
    }
    .module-title {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--color-txt);
        white-space: nowrap;
    }
    .module-caption {
        font-size: 11px;
        font-weight: 500;
        color: var(--color-txt-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .module-count {
        font-variant-numeric: tabular-nums;
        min-width: 20px;
        padding: 1px 6px;
        border-radius: 999px;
        text-align: center;
        font-size: 10px;
        font-weight: 600;
        line-height: 1.4;
        color: var(--color-accent);
        background: var(--color-accent-muted);
        flex-shrink: 0;
    }

    /* ── Demo Collapse / Expand ── */
    .demo-collapse {
        overflow: hidden;
        transition: all 0.22s ease;
    }
    .demo-collapsed {
        max-height: 0;
        opacity: 0;
        pointer-events: none;
    }
    .demo-expanded {
        max-height: 2000px;
        opacity: 1;
    }
    .demo-list-inner {
        padding: 3px 0 3px 18px;
    }

    /* ── Demo Item (Compact: 36px) ── */
    .demo-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        height: 36px;
        padding: 0 8px 0 8px;
        margin-bottom: 1px;
        border: 0;
        border-radius: 6px;
        color: var(--color-txt-secondary);
        background: transparent;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        font-size: 12px;
        transition: background 0.15s ease, color 0.15s ease, transform 0.12s ease;
    }
    .demo-item:hover {
        color: var(--color-txt);
        background: var(--color-bg-hover);
    }
    .demo-active {
        color: var(--color-txt);
        background: var(--color-bg-active);
        box-shadow: inset 0 0 0 1px var(--color-accent-muted);
    }

    /* Active indicator */
    .active-bar {
        position: absolute;
        left: -18px;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 14px;
        border-radius: 0 3px 3px 0;
        background: var(--color-accent);
        box-shadow: 0 0 6px var(--color-accent-glow);
    }

    /* Difficulty dot (3px circle) */
    .diff-dot {
        width: 6px;
        height: 6px;
        min-width: 6px;
        border-radius: 50%;
        flex-shrink: 0;
        opacity: 0.6;
        transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .demo-item:hover .diff-dot,
    .demo-active .diff-dot {
        opacity: 1;
        transform: scale(1.15);
    }

    /* Demo title */
    .demo-title {
        font-weight: 500;
        color: inherit;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
        min-width: 0;
    }

    /* Subtitle — hidden by default, shown on hover/active */
    .demo-subtitle {
        font-size: 10px;
        color: var(--color-txt-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
        opacity: 0;
        max-width: 0;
        transition: opacity 0.2s ease, max-width 0.2s ease;
    }
    .subtitle-visible {
        opacity: 1;
        max-width: 120px;
    }

    /* ── Footer ── */
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: 10px 14px;
        border-top: 1px solid var(--color-border-subtle);
        background: var(--color-bg-surface);
    }
    .footer-stats {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        color: var(--color-txt-tertiary);
    }
    .footer-version {
        color: var(--color-txt-muted);
    }
    .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: 1px solid var(--color-border-default);
        border-radius: 6px;
        background: var(--color-bg-elevated);
        color: var(--color-txt-tertiary);
        cursor: pointer;
        transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
    }
    .theme-toggle:hover {
        color: var(--color-accent);
        border-color: var(--color-accent-muted);
        background: var(--color-accent-muted);
    }

    /* ════════════════════════════════════════════════
       SITE MAP MODAL
       ════════════════════════════════════════════════ */
    .sitemap-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 48px 24px;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(6px);
        animation: sitemap-fade-in 0.18s ease;
    }
    .sitemap-panel {
        width: 100%;
        max-width: 560px;
        max-height: calc(100vh - 96px);
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        background: var(--color-bg-root);
        border: 1px solid var(--color-border-default);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        animation: sitemap-slide-in 0.2s var(--ease-out-expo, ease-out);
    }
    .sitemap-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 12px 8px 12px;
        flex-shrink: 0;
        border-bottom: 1px solid var(--color-border-subtle);
    }
    .sitemap-search-wrap {
        position: relative;
        flex: 1;
    }
    .sitemap-search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        color: var(--color-txt-tertiary);
        pointer-events: none;
    }
    .sitemap-search-input {
        width: 100%;
        height: 38px;
        box-sizing: border-box;
        padding: 0 32px 0 34px;
        border: 1px solid var(--color-border-default);
        border-radius: 8px;
        background: var(--color-bg-surface);
        color: var(--color-txt);
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.18s ease;
    }
    .sitemap-search-input::placeholder {
        color: var(--color-txt-tertiary);
    }
    .sitemap-search-input:focus {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px var(--color-accent-muted);
    }
    .sitemap-search-clear {
        position: absolute;
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: none;
        background: var(--color-bg-hover);
        color: var(--color-txt-tertiary);
        cursor: pointer;
        transition: background 0.15s ease;
    }
    .sitemap-search-clear:hover {
        background: var(--color-bg-active);
        color: var(--color-txt-secondary);
    }
    .sitemap-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid var(--color-border-default);
        border-radius: 7px;
        background: transparent;
        color: var(--color-txt-tertiary);
        cursor: pointer;
        flex-shrink: 0;
        transition: color 0.15s ease, background 0.15s ease;
    }
    .sitemap-close:hover {
        color: var(--color-txt);
        background: var(--color-bg-hover);
    }

    /* ── Modal Body ── */
    .sitemap-body {
        flex: 1;
        overflow-y: auto;
        padding: 8px 12px 12px 12px;
    }
    .sitemap-body::-webkit-scrollbar {
        width: 4px;
    }
    .sitemap-body::-webkit-scrollbar-thumb {
        background: var(--color-scrollbar);
        border-radius: 999px;
    }

    /* ── Group ── */
    .sitemap-group {
        margin-bottom: 10px;
    }
    .sitemap-group-head {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 8px;
        border-radius: 6px;
        background: var(--color-bg-surface);
        margin-bottom: 2px;
    }
    .sitemap-group-icon {
        display: grid;
        place-items: center;
        width: 20px;
        height: 20px;
        font-size: 11px;
        flex-shrink: 0;
    }
    .sitemap-group-label {
        flex: 1;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--color-txt);
    }
    .sitemap-group-count {
        font-variant-numeric: tabular-nums;
        padding: 1px 6px;
        border-radius: 999px;
        text-align: center;
        font-size: 10px;
        font-weight: 600;
        line-height: 1.4;
        color: var(--color-accent);
        background: var(--color-accent-muted);
        flex-shrink: 0;
    }

    /* ── Items ── */
    .sitemap-item {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 36px;
        padding: 0 8px 0 12px;
        border: 0;
        border-radius: 6px;
        color: var(--color-txt-secondary);
        background: transparent;
        cursor: pointer;
        text-align: left;
        font-family: inherit;
        font-size: 13px;
        transition: background 0.12s ease, color 0.12s ease;
    }
    .sitemap-item:hover {
        color: var(--color-txt);
        background: var(--color-bg-hover);
    }
    .sitemap-item-active {
        color: var(--color-accent);
        background: var(--color-accent-muted);
    }
    .sitemap-item-title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
    }
    .sitemap-item-sub {
        font-size: 11px;
        color: var(--color-txt-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-width: 0;
    }

    /* ── Empty ── */
    .sitemap-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 16px;
        color: var(--color-txt-tertiary);
        font-size: 13px;
    }

    /* ── Highlight mark ── */
    :global(.sitemap-mark) {
        background: rgba(77, 168, 255, 0.25);
        color: var(--color-accent);
        border-radius: 2px;
        padding: 0 2px;
    }

    /* ── Animations ── */
    @keyframes sitemap-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes sitemap-slide-in {
        from { opacity: 0; transform: translateY(-8px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
</style>
