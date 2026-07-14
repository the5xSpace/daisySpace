<script lang="ts">
    import ErrorIndicator from "./ErrorIndicator.svelte";
    import ErrorModal from "./ErrorModal.svelte";

    let modalVisible = false;
</script>

<div class="fixed bottom-4 right-4 z-[1000] pointer-events-none">
    <div class="pointer-events-auto">
        <ErrorIndicator onClick={() => { modalVisible = true; }} />
    </div>
</div>
<ErrorModal bind:visible={modalVisible} />
