<script lang="ts">
    import { onDestroy } from "svelte";
    import { mount, unmount } from "svelte";
    import { createEngine, destroyEngine, Daisy } from "../infra/runtime";
    import { getPreset } from "../infra/presets";
    import type { DemoDefinition, DemoCleanup } from "../infra/types";

    let { demo = null, logs = $bindable([]) }: { demo: DemoDefinition | null; logs: string[] } = $props();

    let container: HTMLElement;
    let engine: Daisy.Engine | null = null;
    let cleanupTasks: DemoCleanup[] = [];
    let error = $state<string | null>(null);
    let svelteComponent: Record<string, any> | null = null;
    let loading = $state(false);
    let currentDemoId: string | null = null;
    let _resizeObserver: ResizeObserver | null = null;
    let loadVersion = 0;

    function registerCleanup(fn: DemoCleanup) {
        if (typeof fn === "function") {
            cleanupTasks.push(fn);
        }
    }

    function isCurrent(d: DemoDefinition) {
        return d.id === currentDemoId;
    }

    async function runDemo(d: DemoDefinition) {
        logs = [];
        error = null;
        cleanupTasks = [];
        svelteComponent = null;
        loading = true;

        try {
            if (d.preset) {
                const preset = getPreset(d.preset);
                if (preset) {
                    engine = await preset.setup(container);
                    if (!isCurrent(d)) return;
                }
            }
            if (!engine) {
                engine = await createEngine(container);
                if (!isCurrent(d)) return;
                engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
                engine.geoLayer.clearImagery();
                engine.geoLayer.setBaseImagery({
                    type: Daisy.GeoImageryType.XYZ,
                    url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
                    minLevel: 0,
                    maxLevel: 2,
                    tilingScheme: "geographic",
                });
            }

            const activeEngine = engine;
            if (!activeEngine) {
                throw new Error("Failed to initialize demo engine");
            }

            if (d.component) {
                const mod = await d.component();
                if (!isCurrent(d)) return;
                const DemoComponent = mod.default;
                svelteComponent = mount(DemoComponent, {
                    target: container,
                    props: {
                        engine: activeEngine,
                        daisy: Daisy,
                        container,
                        log: (msg: string) => {
                            logs = [...logs, msg];
                        },
                        registerCleanup,
                        __log: (msg: string) => {
                            logs = [...logs, msg];
                        },
                    },
                });
                loading = false;
                return;
            }
        } catch (e: any) {
            if (!isCurrent(d)) return;
            error = e?.message || String(e);
            logs = [...logs, `[ERROR] ${error}`];
            console.error("[DemoRunner]", e);
            try {
                await destroyEngine(engine);
            } catch (destroyError) {
                console.warn("[DemoRunner] destroy after error failed:", destroyError);
            }
            engine = null;
        }
        loading = false;
    }

    async function stopDemo() {
        const currentTasks = cleanupTasks.slice();
        const currentEngine = engine;
        const currentSvelteComp = svelteComponent;

        cleanupTasks = [];
        engine = null;
        svelteComponent = null;

        if (_resizeObserver) {
            _resizeObserver.disconnect();
            _resizeObserver = null;
        }

        if (currentSvelteComp) {
            try {
                unmount(currentSvelteComp);
            } catch (e) {
                console.warn("[DemoRunner] svelte unmount error:", e);
            }
        }

        try {
            await destroyEngine(currentEngine);
        } catch (e) {
            console.warn("[DemoRunner] destroy error:", e);
        }

        for (let i = currentTasks.length - 1; i >= 0; i--) {
            try {
                await currentTasks[i]();
            } catch (e) {
                console.warn("[DemoRunner] cleanup task error:", e);
            }
        }

        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }

    async function waitForContainerSize() {
        const maxFrames = 120;
        for (let i = 0; i < maxFrames; i++) {
            if (container.clientWidth > 0 && container.clientHeight > 0) {
                return;
            }
            await new Promise(resolve => requestAnimationFrame(resolve));
        }
    }

    function attachResizeObserver() {
        if (_resizeObserver) {
            _resizeObserver.disconnect();
        }
        if (!container || !engine) return;
        _resizeObserver = new ResizeObserver(() => {
            engine?.resize();
        });
        _resizeObserver.observe(container);
    }

    async function loadDemo(d: DemoDefinition) {
        if (d.id === currentDemoId) return;
        const version = ++loadVersion;
        await stopDemo();
        if (version !== loadVersion) return;
        currentDemoId = d.id;
        await waitForContainerSize();
        if (version !== loadVersion || !isCurrent(d)) return;
        await runDemo(d);
        const loadedEngine = engine;
        if (loadedEngine && version === loadVersion && isCurrent(d)) {
            await new Promise(r => requestAnimationFrame(r));
            if (loadedEngine === engine && version === loadVersion && isCurrent(d)) {
                loadedEngine.resize();
            }
        }
        if (version === loadVersion && isCurrent(d)) {
            attachResizeObserver();
        }
    }

    $effect(() => {
        if (demo) {
            loadDemo(demo);
        }
    });

    onDestroy(() => {
        stopDemo();
    });
</script>

<style>
    :global(.cesium-viewer),
    :global(.cesium-viewer > .cesium-widget),
    :global(.cesium-viewer > .cesium-widget > .cesium-widget-mainPanel),
    :global(.cesium-viewer canvas) {
        width: 100% !important;
        height: 100% !important;
    }
</style>

<div class="absolute inset-0 min-h-0 bg-bg-root">
    <!-- Canvas container -->
    <div class="absolute inset-0 min-h-0" bind:this={container}></div>

    <!-- Loading overlay -->
    {#if loading}
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 animate-fade-in">
            <div class="flex flex-col items-center gap-3">
                <div class="w-8 h-8 rounded-full border-2 border-accent/25 border-t-accent animate-spin"></div>
                <span class="text-[11px] text-txt-tertiary">加载中…</span>
            </div>
        </div>
    {/if}

    <!-- Error banner -->
    {#if error}
        <div class="absolute bottom-4 left-4 right-4 bg-[rgba(20,8,8,0.95)] border border-error/35 rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-up backdrop-blur-md shadow-[var(--shadow-glow-error)]">
            <div class="flex items-center justify-center w-7 h-7 rounded-lg bg-error-muted shrink-0">
                <svg class="w-3.5 h-3.5 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            </div>
            <div class="flex-1 min-w-0">
                <p class="m-0 text-[12px] font-medium text-error leading-tight">运行错误</p>
                <p class="m-0 text-[11px] text-txt-secondary leading-tight mt-0.5 font-mono break-all">{error}</p>
            </div>
        </div>
    {/if}
</div>
