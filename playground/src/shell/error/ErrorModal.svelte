<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { subscribeDaisyErrors, clearDaisyErrors, markErrorRead } from "daisy-space-sdk";
    import type { DaisyErrorEntry } from "daisy-space-sdk";

    export let visible = false;

    let errors: DaisyErrorEntry[] = [];
    let unsubscribe: (() => void) | null = null;
    let copiedId: string | null = null;
    let copyTimer: ReturnType<typeof setTimeout> | null = null;

    onMount(() => {
        unsubscribe = subscribeDaisyErrors((latest) => {
            errors = latest;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
        if (copyTimer) clearTimeout(copyTimer);
    });

    function close() {
        visible = false;
    }

    function handleBackdrop(e: MouseEvent) {
        if (e.target === e.currentTarget) close();
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") close();
    }

    function formatTime(ts: number): string {
        const d = new Date(ts);
        return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
    }

    function copyError(err: DaisyErrorEntry) {
        const text = `[${err.source}] ${err.title}\n${err.message}${err.stack ? "\n\n" + err.stack : ""}`;
        navigator.clipboard.writeText(text).then(() => {
            markErrorRead(err.id);
            copiedId = err.id;
            if (copyTimer) clearTimeout(copyTimer);
            copyTimer = setTimeout(() => { copiedId = null; }, 1200);
        });
    }

    function clearAll() {
        clearDaisyErrors();
    }

    $: sortedErrors = [...errors].sort((a, b) => b.timestamp - a.timestamp);
</script>

{#if visible}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        class="fixed inset-0 bg-black/65 backdrop-blur-md flex items-center justify-center z-[2000] animate-fade-in"
        on:click={handleBackdrop}
        on:keydown={handleKeydown}
    >
        <div
            class="flex flex-col w-[700px] max-w-[92vw] h-[540px] max-h-[85vh] bg-[rgba(14,17,27,0.98)] border border-error/12 rounded-2xl shadow-[var(--shadow-lg)] animate-scale-in overflow-hidden"
            role="dialog"
            aria-modal="true"
        >
            <!-- ═══════════ Header ═══════════ -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-border-subtle shrink-0">
                <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-error-soft ring-1 ring-error/10">
                        <svg class="w-4 h-4 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="m-0 text-[14px] font-semibold text-txt">错误日志</h3>
                        <span class="text-[11px] text-txt-tertiary">{errors.length} 条记录</span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    {#if errors.length > 0}
                        <button
                            class="flex items-center justify-center w-8 h-8 border border-border-default rounded-lg bg-transparent text-txt-tertiary cursor-pointer transition-all duration-150 hover:bg-error-soft hover:text-error hover:border-error/20"
                            on:click={clearAll}
                            title="清空全部"
                        >
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    {/if}
                    <button
                        class="flex items-center justify-center w-8 h-8 border border-border-default rounded-lg bg-transparent text-txt-tertiary cursor-pointer transition-all duration-150 hover:bg-bg-elevated hover:text-txt"
                        on:click={close}
                        title="关闭"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- ═══════════ Content ═══════════ -->
            <div class="flex-1 overflow-hidden p-4">
                {#if sortedErrors.length === 0}
                    <div class="flex flex-col items-center justify-center h-full text-txt-tertiary gap-4">
                        <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-bg-elevated">
                            <svg class="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <line x1="12" y1="9" x2="12" y2="13"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                        </div>
                        <div class="text-center">
                            <p class="m-0 text-[13px] font-medium text-txt-secondary">暂无错误记录</p>
                            <p class="m-0 mt-1 text-[11px]">运行过程中出现的错误将在此显示</p>
                        </div>
                    </div>
                {:else}
                    <div class="h-full overflow-y-auto flex flex-col gap-2.5 pr-1">
                        {#each sortedErrors as err (err.id)}
                            <div
                                class="error-card px-4 py-3.5 rounded-xl bg-bg-elevated border border-border-subtle transition-all duration-150 hover:border-border-emph {err.read ? '' : 'border-l-[3px] border-l-error bg-error-soft/40'}"
                            >
                                <!-- Card Header -->
                                <div class="flex items-center justify-between mb-2.5">
                                    <div class="flex items-center gap-2">
                                        <span class="px-2 py-px rounded-md bg-error-soft text-error text-[10px] font-semibold uppercase tracking-wider">{err.source}</span>
                                        <span class="text-txt-tertiary text-[10px] font-mono tabular-nums">{formatTime(err.timestamp)}</span>
                                        {#if !err.read}
                                            <span class="w-1.5 h-1.5 rounded-full bg-error animate-[breathe_2s_ease-in-out_infinite]"></span>
                                        {/if}
                                    </div>
                                    <button
                                        class="inline-flex items-center gap-1 px-2 py-[3px] border border-transparent rounded-md bg-transparent text-txt-tertiary text-[10px] cursor-pointer transition-all duration-150 hover:text-accent hover:bg-accent-subtle
                                            {copiedId === err.id ? '!text-success' : ''}"
                                        on:click={() => copyError(err)}
                                        title="复制错误信息"
                                    >
                                        {#if copiedId === err.id}
                                            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                            <span>已复制</span>
                                        {:else}
                                            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                            <span>复制</span>
                                        {/if}
                                    </button>
                                </div>

                                <!-- Error Title -->
                                <div class="text-[13px] font-semibold text-txt mb-1.5 break-all">{err.title}</div>

                                <!-- Error Message -->
                                <div class="text-[12px] text-txt-secondary leading-relaxed whitespace-pre-wrap break-all">{err.message}</div>

                                <!-- Stack Trace -->
                                {#if err.stack}
                                    <pre class="mt-3 px-3.5 py-3 rounded-lg bg-bg-inset border border-border-subtle overflow-x-auto max-h-[180px] overflow-y-auto">
                                        <code class="font-mono text-[11px] text-txt-tertiary leading-relaxed whitespace-pre">{err.stack}</code>
                                    </pre>
                                {/if}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
