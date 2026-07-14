<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { subscribeDaisyErrors, markAllErrorsRead } from "daisy-space-sdk";
    import type { DaisyErrorEntry } from "daisy-space-sdk";

    export let onClick: () => void = () => {};

    let unreadCount = 0;
    let errors: DaisyErrorEntry[] = [];
    let unsubscribe: (() => void) | null = null;

    onMount(() => {
        unsubscribe = subscribeDaisyErrors((latest, count) => {
            errors = latest;
            unreadCount = count;
        });
    });

    onDestroy(() => {
        if (unsubscribe) unsubscribe();
    });

    function handleClick() {
        markAllErrorsRead();
        onClick();
    }

    $: hasErrors = errors.length > 0;
    $: pulse = unreadCount > 0;
</script>

{#if hasErrors}
    <button
        class="relative flex items-center justify-center w-10 h-10 border border-error/25 rounded-xl cursor-pointer backdrop-blur-md transition-all duration-200
            bg-error-soft text-error
            hover:bg-error-muted hover:border-error/40 hover:scale-105 hover:shadow-[var(--shadow-glow-error)]
            active:scale-95
            {pulse ? 'animate-pulse-glow' : ''}"
        on:click={handleClick}
        title={unreadCount > 0 ? `${unreadCount} 条未读错误，点击查看` : "查看错误详情"}
    >
        <svg class="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        {#if unreadCount > 0}
            <span class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-[4px] rounded-full bg-error text-white text-[10px] font-bold leading-[18px] text-center shadow-[0_0_10px_rgba(244,97,110,0.5)]">
                {unreadCount > 99 ? "99+" : unreadCount}
            </span>
        {/if}
    </button>
{/if}

<style>
    @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(244, 97, 110, 0.35); }
        50% { box-shadow: 0 0 0 12px rgba(244, 97, 110, 0); }
    }
    .animate-pulse-glow {
        animation: pulse-glow 2.2s ease-in-out infinite;
    }
</style>
