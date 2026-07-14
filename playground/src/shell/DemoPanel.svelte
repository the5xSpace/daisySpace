<script lang="ts">
  let {
    fill = false,
    title = "面板",
    initialMinimized = false,
    top = "12px",
    left = "12px",
    right = undefined as string | undefined,
    bottom = undefined as string | undefined,
    width = "auto",
    padding = "10px",
    children,
  }: {
    title?: string;
    initialMinimized?: boolean;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    fill?: boolean;
    padding?: string;
    children?: import("svelte").Snippet;
  } = $props();

  let minimized = $state(false);
  let zIndex = $state(1000);
  let offsetX = $state(0);
  let offsetY = $state(0);
  let initMouseX = 0;
  let initMouseY = 0;
  let initOffsetX = 0;
  let initOffsetY = 0;
  let isDragging = false;
  let panelEl: HTMLDivElement | undefined;

  $effect(() => {
    minimized = initialMinimized;
  });

  let baseStyle = $derived.by(() => {
    if (fill) {
      return "position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:" + zIndex + ";";
    }
    let s = "position:absolute;";
    const dragged = offsetX !== 0 || offsetY !== 0;
    s += "top:" + (dragged ? offsetY + "px" : top) + ";";
    if (right && !offsetX) {
      s += "right:" + right + ";";
    } else {
      s += "left:" + (dragged ? offsetX + "px" : left) + ";";
    }
    if (bottom && !dragged) s += "bottom:" + bottom + ";";
    s += "width:" + width + ";";
    s += "height:auto;";
    s += "z-index:" + zIndex + ";";
    return s;
  });

  function onAnchorDown(e: PointerEvent) {
    if (!panelEl) return;
    var parent = panelEl.parentElement;
    if (!parent) return;
    var pr = parent.getBoundingClientRect();
    var cr = panelEl.getBoundingClientRect();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDragging = true;
    zIndex = 2000;
    initMouseX = e.clientX;
    initMouseY = e.clientY;
    initOffsetX = cr.left - pr.left;
    initOffsetY = cr.top - pr.top;
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging || !panelEl) return;
    var parent = panelEl.parentElement;
    if (!parent) return;
    var pr = parent.getBoundingClientRect();
    var cr = panelEl.getBoundingClientRect();
    var panelW = cr.width;
    var panelH = cr.height;
    var pad = 4;
    var maxX = pr.width - panelW - pad;
    var maxY = pr.height - panelH - pad;
    offsetX = Math.max(pad, Math.min(maxX, initOffsetX + e.clientX - initMouseX));
    offsetY = Math.max(pad, Math.min(maxY, initOffsetY + e.clientY - initMouseY));
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging || !panelEl) return;
    isDragging = false;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  }

  function toggleMin() { minimized = !minimized; }
  function bringToFront() { zIndex = 1500; }
</script>

<div bind:this={panelEl} class="demo-panel" style={baseStyle} onpointerdown={bringToFront} role="dialog" tabindex="-1">
  <div class="panel-header">
    <span class="drag-anchor" style="cursor:move" onpointerdown={onAnchorDown} onpointermove={onPointerMove} onpointerup={onPointerUp}
      role="button" tabindex="-1" title="拖动面板">⋮</span>
    <span class="panel-title">{title}</span>
    <button class="minimize-btn" onclick={toggleMin} title={minimized ? "展开" : "最小化"}>{minimized ? "▣" : "−"}</button>
  </div>
  {#if !minimized}
    <div class="panel-body" style="padding:{padding}">{#if children}{@render children()}{/if}</div>
  {/if}
</div>

<style>
  .demo-panel {
    pointer-events: auto;
    color: var(--ds-overlay-text, #eef6ff);
    background: var(--ds-overlay-bg, rgba(5,12,20,0.84));
    border: 1px solid var(--ds-overlay-border, rgba(110,177,255,0.2));
    border-radius: 12px;
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 36px rgba(0,0,0,0.32);
    overflow: hidden;
    user-select: text;
    max-width: calc(100vw - 24px);
    max-height: calc(100% - 15px);
    display: flex;
    flex-direction: column;
  }
  .demo-panel:hover { border-color: var(--ds-overlay-accent, rgba(110,177,255,0.35)); }
  .panel-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 10px;
    min-height: 34px;
    cursor: default;
    user-select: none;
    border-bottom: 1px solid var(--ds-overlay-border, rgba(110,177,255,0.1));
  }
  .drag-anchor {
    flex-shrink: 0;
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px;
    font-size: 13px; line-height: 1;
    color: var(--ds-overlay-text-muted, #7aa2c7);
    background: var(--ds-overlay-card-bg, rgba(110,177,255,0.12));
    cursor: move;
    transition: all 0.15s;
    user-select: none;
    touch-action: none;
  }
  .drag-anchor:hover { background: var(--ds-overlay-accent-warm-muted, rgba(110,177,255,0.2)); color: var(--ds-overlay-text-bright, #b3d4ff); }
  .drag-anchor:active { cursor: move; background: var(--ds-overlay-accent-warm-hover, rgba(110,177,255,0.3)); }
  .panel-title {
    flex: 1;
    font-size: 12px; font-weight: 700;
    color: var(--ds-overlay-text, #dbeafe);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    line-height: 1;
  }
  .minimize-btn {
    flex-shrink: 0;
    width: 22px; height: 22px;
    display: flex; align-items: center; justify-content: center;
    border: none; border-radius: 5px;
    font-size: 14px; line-height: 1;
    color: var(--ds-overlay-text-muted, #7aa2c7);
    background: transparent;
    cursor: pointer; padding: 0;
    transition: all 0.15s;
  }
  .minimize-btn:hover { background: var(--ds-overlay-btn-bg, rgba(110,177,255,0.15)); color: var(--ds-overlay-text-bright, #b3d4ff); }
  .panel-body {
    padding: 10px;
    overflow: auto;
    flex: 1;
    min-height: 0;
    max-height: calc(100% - 48px);
    /* Theme variable cascade for child content */
    --panel-text: var(--ds-overlay-text, #eef6ff);
    --panel-text-bright: var(--ds-overlay-text-bright, #dbeafe);
    --panel-text-muted: var(--ds-overlay-text-muted, #91a4b7);
    --panel-text-label: var(--ds-overlay-text-label, #7aa2c7);
    --panel-bg-card: var(--ds-overlay-card-bg, rgba(110,177,255,0.06));
    --panel-bg-embed: var(--ds-overlay-embed-bg, rgba(110,177,255,0.04));
    --panel-border: var(--ds-overlay-border, rgba(110,177,255,0.15));
    --panel-accent: var(--ds-overlay-accent, #4da8ff);
    --panel-btn-bg: var(--ds-overlay-btn-bg, rgba(110,177,255,0.08));
    --panel-btn-text: var(--ds-overlay-btn-text, #c7d3df);
    --panel-btn-primary-bg: var(--ds-overlay-btn-primary-bg, rgba(77,168,255,0.15));
    --panel-btn-primary-text: var(--ds-overlay-btn-primary-text, #eef6ff);
    --panel-btn-primary-border: var(--ds-overlay-btn-primary-border, rgba(77,168,255,0.25));
  }
</style>
