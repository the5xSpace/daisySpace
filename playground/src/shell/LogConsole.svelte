<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let logs: string[] = [];

    let consoleEl: HTMLElement | null = null;
    let copyLabel = "复制";
    let copyTimer: ReturnType<typeof setTimeout> | null = null;

    const dispatch = createEventDispatcher();

    $: if (consoleEl) {
        // Auto-scroll to bottom when new logs arrive
        const el = consoleEl;
        const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
        if (isNearBottom || logs.length === 0) {
            requestAnimationFrame(() => {
                if (!el || !el.isConnected) return;
                el.scrollTop = el.scrollHeight;
            });
        }
    }

    async function copyLogs() {
        try {
            await navigator.clipboard.writeText(logs.join("\n"));
            copyLabel = "已复制";
        } catch {
            copyLabel = "复制失败";
        }
        if (copyTimer) clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { copyLabel = "复制"; }, 1500);
    }

    function clearLogs() {
        dispatch("clear");
    }
</script>

<div class="console-root w-full h-full flex flex-col bg-bg-inset">
    <!-- Console Header -->
    <div class="console-head flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
            <div class="flex items-center gap-2 text-txt-tertiary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
                <span class="text-[12px] font-semibold">控制台</span>
            </div>
            {#if logs.length > 0}
                <span class="log-count">{logs.length}</span>
            {/if}
        </div>
        <div class="flex items-center gap-1">
            <button
                class="icon-action danger"
                on:click={clearLogs}
                disabled={logs.length === 0}
                title="清空控制台"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
            <button
                class="text-action"
                on:click={copyLogs}
                disabled={logs.length === 0}
            >
                {copyLabel}
            </button>
        </div>
    </div>

    <!-- Console Content -->
    <div
        class="console-body flex-1 overflow-y-auto font-mono text-[11px] leading-[1.55]"
        bind:this={consoleEl}
    >
        {#if logs.length === 0}
            <div class="flex flex-col items-center justify-center h-full text-txt-tertiary gap-2 select-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="opacity-20">
                    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
                </svg>
                <span class="text-[12px] opacity-40">暂无输出</span>
            </div>
        {:else}
            {#each logs as log, i (i)}
                <div class="log-line whitespace-pre-wrap break-all py-[2px] {log.startsWith('[ERROR]') ? 'text-error' : 'text-txt-secondary'}">
                    {log}
                </div>
            {/each}
        {/if}
    </div>
</div>

<style>
    .console-root {
        background:
            linear-gradient(180deg, rgba(var(--ds-txt-rgb), 0.015), transparent 72px),
            var(--color-bg-inset);
    }
    .console-head {
        min-height: 42px;
        padding: 6px 10px 6px 14px;
        border-bottom: 1px solid var(--color-border-subtle);
        background: rgba(var(--ds-txt-rgb), 0.018);
    }
    .log-count {
        min-width: 22px;
        padding: 2px 7px;
        border-radius: 999px;
        color: var(--color-txt-tertiary);
        background: rgba(var(--ds-txt-rgb), 0.04);
        font-size: 10px;
        line-height: 1.1;
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
    .icon-action,
    .text-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 28px;
        border: 1px solid transparent;
        border-radius: 7px;
        color: var(--color-txt-tertiary);
        background: transparent;
        cursor: pointer;
        transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
    }
    .icon-action {
        width: 28px;
    }
    .text-action {
        padding: 0 9px;
        font-size: 11px;
        font-weight: 600;
    }
    .icon-action:hover,
    .text-action:hover {
        color: var(--color-accent);
        border-color: rgba(77, 168, 255, 0.12);
        background: rgba(77, 168, 255, 0.07);
    }
    .icon-action.danger:hover {
        color: var(--color-error);
        border-color: rgba(244, 97, 110, 0.12);
        background: rgba(244, 97, 110, 0.07);
    }
    .icon-action:disabled,
    .text-action:disabled {
        opacity: 0.24;
        cursor: default;
        background: transparent;
        border-color: transparent;
        color: var(--color-txt-tertiary);
    }
    .console-body {
        padding: 12px 16px 16px;
    }
    .log-line {
        margin-bottom: 4px;
        padding: 3px 8px;
        border-left: 2px solid rgba(62, 207, 142, 0.25);
        border-radius: 4px;
        background: rgba(var(--ds-txt-rgb), 0.018);
        transition: color 0.15s ease;
    }
    .log-line.text-error {
        border-left-color: rgba(244, 97, 110, 0.5);
        background: rgba(244, 97, 110, 0.05);
    }
    .log-line:first-child {
        animation: log-enter 0.3s var(--ease-smooth);
    }
    @keyframes log-enter {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
