<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { getPreset } from "../infra/presets";
    import { destroyEngine } from "../infra/runtime";
    import type { PresetId } from "../infra/types";
    import type * as Daisy from "daisy-space-sdk";

    export let presetId: PresetId | undefined = undefined;
    export let engine: Daisy.Engine | null = null;

    let container: HTMLElement;

    onMount(async () => {
        if (!presetId) return;
        const preset = getPreset(presetId);
        if (preset) {
            try {
                engine = await preset.setup(container);
            } catch (e) {
                console.error("[ScenePreview] preset setup failed:", e);
            }
        }
    });

    onDestroy(async () => {
        const currentEngine = engine;
        engine = null;
        void destroyEngine(currentEngine);
    });
</script>

<div class="scene-preview" bind:this={container}></div>

<style>
    .scene-preview {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000;
    }
</style>
