<script>
    /**
     * SGP4 过境与窗口预报
     * 展示 findTransits · satelliteVisibilityWindows · visibilityWindows
     */
    let { daisy: Daisy, __log } = $props();

    const SCENE_DATE = new Date("2026-04-20T12:00:00Z");

    const fmt = (v, digits = 3) => v == null ? "—" : (Number.isFinite(v) ? v.toFixed(digits) : String(v));
    const fmtTs = (ts) => ts ? new Date(ts).toISOString().replace("T", " ").slice(0, 19) : "—";

    const tleSl = `STARLINK-1008\n1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990\n2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`;
    const tleIss = `ISS (ZARYA)\n1 25544U 98067A   26110.50000000  .00016839  00000-0  30650-3 0  9999\n2 25544  51.6411  12.2347 0004715  52.3029  57.9229 15.50039934440941`;
    const tleQf = `QIANFAN-1\n1 60379U 24140A   26110.56333470  .00000026  00000+0  20818-4 0  9997\n2 60379  88.9678 285.9224 0017010 196.8745 163.1842 13.51003321 84741`;

    const bj = [39.9, 116.4, 0.05];
    const t0 = new Date("2026-04-20T00:00:00Z");
    const t1 = new Date("2026-04-21T00:00:00Z");

    let r1 = $state(""), r2 = $state(""), r3 = $state(""), r4 = $state("");

    function runTransit(tle, label) {
        const ts = Daisy.Spg4.findTransits(tle, bj, t0, t1, 10, 10);
        let h = `<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">找到 ${ts.length} 次过境</div>`;
        if (ts.length === 0) return h + `<div style="color:var(--color-error);">无</div>`;
        for (let i = 0; i < ts.length; i++) {
            const t = ts[i];
            h += `<div style="margin-top:6px;padding:6px 8px;background:var(--ds-overlay-btn-bg);border-radius:6px;">
  <div style="color:var(--color-accent-soft);">#${i+1} ${fmtTs(t.start)} → ${fmtTs(t.end)}</div>
  <div>峰值仰角: ${fmt(t.maxElevation,1)}° | 方位: ${fmt(t.apexAzimuth,1)}° | 持续: ${fmt(t.duration/1000,1)}s</div>
  <div>方位范围: ${fmt(t.minAzimuth,1)}° ~ ${fmt(t.maxAzimuth,1)}°</div></div>`;
        }
        return h;
    }

    function runConjunction() {
        const ws = Daisy.Spg4.satelliteVisibilityWindows(tleSl, tleQf, t0, t1, 60);
        let h = `<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">找到 ${ws.length} 个互视窗口</div>`;
        if (ws.length === 0) { r3 = h + `<div style="color:var(--color-error);">无</div>`; return; }
        const totalSec = ws.reduce((s, w) => s + (w[1] - w[0]) / 1000, 0);
        h += `<div style="font-size:11px;color:var(--color-accent-soft);margin-bottom:6px;">总互视时长: ${(totalSec/60).toFixed(1)} 分钟 (${(totalSec/86400*100).toFixed(1)}%)</div>`;
        for (let i = 0; i < Math.min(ws.length, 10); i++) {
            const w = ws[i];
            h += `<div style="margin-top:4px;padding:4px 8px;background:var(--ds-overlay-btn-bg);border-radius:4px;">
  <span style="color:var(--color-accent-soft);">#${i+1}:</span> ${fmtTs(w[0])} → ${fmtTs(w[1])} <span style="color:var(--ds-overlay-accent-warm);">(${fmt((w[1]-w[0])/1000,0)}s)</span></div>`;
        }
        if (ws.length > 10) h += `<div style="color:var(--ds-overlay-text-label);">… (共${ws.length}个窗口)</div>`;
        r3 = h;
    }

    function runVisWindow() {
        const ws = Daisy.Spg4.visibilityWindows(tleSl, bj, t0, t1);
        let h = `<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">找到 ${ws.length} 个可见窗口</div>`;
        if (ws.length === 0) { r4 = h + `<div style="color:var(--color-error);">无</div>`; return; }
        const totalSec = ws.reduce((s, w) => s + (w[1] - w[0]) / 1000, 0);
        h += `<div style="font-size:11px;color:var(--color-accent-soft);margin-bottom:6px;">总可见时长: ${(totalSec/60).toFixed(1)} 分钟 (${(totalSec/86400*100).toFixed(1)}%)</div>`;
        for (let i = 0; i < Math.min(ws.length, 10); i++) {
            const w = ws[i];
            h += `<div style="margin-top:4px;padding:4px 8px;background:var(--ds-overlay-btn-bg);border-radius:4px;">
  <span style="color:var(--color-accent-soft);">#${i+1}:</span> ${fmtTs(w[0])} → ${fmtTs(w[1])} <span style="color:var(--ds-overlay-accent-warm);">(${fmt((w[1]-w[0])/1000,0)}s)</span></div>`;
        }
        if (ws.length > 10) h += `<div style="color:var(--ds-overlay-text-label);">… (共${ws.length}个窗口)</div>`;
        r4 = h;
    }

    __log?.("SGP4 过境与窗口预报 — 点击卡片按钮查看计算结果");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="SGP4 预报">
    <div class="spg4-wrap">
        <div class="header">
        <h1>SGP4 过境与窗口预报</h1>
        <p>findTransits · satelliteVisibilityWindows · visibilityWindows</p>
        <div class="warning">
            ⚠ SGP4 输出为 <b>TEME</b> 坐标系（真赤道平春分点），非 J2000/GCRF。<br />
            场景时间已锁定: <b>{SCENE_DATE.toISOString()}</b> — 与 TLE 历元（26110）对齐。
        </div>
    </div>

    <!-- Card 1: STARLINK transit -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">🛰 过境预报 — findTransits (STARLINK-1008)</div>
            <div class="card-desc">TLE + 观测站 + 时间范围 + 最低仰角 → 预报过境事件及参数</div>
        </div>
        <div class="card-input">
            <div>TLE: <span class="hl-yellow">STARLINK-1008</span> (NORAD 44714) | 观测站: 北京 | 最低仰角: 10°</div>
            <div class="dim">外推: {t0.toISOString().slice(0,16)} ~ {t1.toISOString().slice(0,16)} (24h)</div>
        </div>
        <div class="card-actions"><button class="card-btn" onclick={() => r1 = runTransit(tleSl, 'STARLINK')}>▶ 计算 STARLINK 过境</button></div>
        {#if r1}<div class="card-result">{@html r1}</div>{/if}
    </div>

    <!-- Card 2: ISS transit -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">🛰 过境预报 — findTransits (ISS)</div>
            <div class="card-desc">使用 ISS TLE 计算北京过境</div>
        </div>
        <div class="card-input">
            <div>TLE: <span class="hl-blue">ISS</span> (NORAD 25544) | 观测站: 北京 | 最低仰角: 10°</div>
            <div class="dim">外推: {t0.toISOString().slice(0,16)} ~ {t1.toISOString().slice(0,16)} (24h)</div>
        </div>
        <div class="card-actions"><button class="card-btn" onclick={() => r2 = runTransit(tleIss, 'ISS')}>▶ 计算 ISS 过境</button></div>
        {#if r2}<div class="card-result">{@html r2}</div>{/if}
    </div>

    <!-- Card 3: Conjunction -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">🔗 交汇预报 — satelliteVisibilityWindows（双星互视）</div>
            <div class="card-desc">STARLINK-1008 ↔ QIANFAN-1 互视时间窗口</div>
        </div>
        <div class="card-input">
            <div>A: <span class="hl-yellow">STARLINK-1008</span> (i=53.2°, LEO) | B: <span class="hl-blue">QIANFAN-1</span> (i=89.0°, LEO)</div>
            <div class="dim">外推: {t0.toISOString().slice(0,16)} ~ {t1.toISOString().slice(0,16)} | 步长: 60s</div>
        </div>
        <div class="card-actions"><button class="card-btn" onclick={runConjunction}>▶ 计算互视窗口</button></div>
        {#if r3}<div class="card-result">{@html r3}</div>{/if}
    </div>

    <!-- Card 4: Visibility Window -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">🪟 窗口计算 — visibilityWindows</div>
            <div class="card-desc">TLE + 观测站 → 地面可见窗口</div>
        </div>
        <div class="card-input">
            <div>TLE: <span class="hl-yellow">STARLINK-1008</span> | 观测站: 北京</div>
        </div>
        <div class="card-actions"><button class="card-btn" onclick={runVisWindow}>▶ 计算可见窗口</button></div>
        {#if r4}<div class="card-result">{@html r4}</div>{/if}
    </div>
    </div>
</DemoPanel>

<style>
    
    .spg4-wrap {
        max-width: 960px;
        margin: 0 auto;
        padding: 32px 24px 64px;
    }
    .header { margin-bottom:32px; }
    .header h1 { font-size:26px;font-weight:700;color:var(--ds-overlay-accent-warm);margin:0 0 6px; }
    .header p { font-size:14px;color:var(--ds-overlay-text-muted);margin:0; }
    .warning { margin-top:10px;padding:8px 12px;background:var(--ds-overlay-accent-warm-muted);border:1px solid var(--ds-overlay-accent-warm-border);border-radius:6px;font-size:12px;color:var(--ds-overlay-accent-warm);line-height:1.5; }
    .card { margin-bottom:20px;border-radius:12px;overflow:hidden;border:1px solid var(--ds-overlay-border);background:var(--ds-overlay-card-bg); }
    .card-head { padding:16px 20px;border-bottom:1px solid var(--ds-overlay-border); }
    .card-title { font-size:15px;font-weight:600;color:var(--ds-overlay-text); }
    .card-desc { font-size:12px;color:var(--ds-overlay-text-muted);margin-top:2px; }
    .card-input { padding:12px 20px;font-size:11px;color:var(--ds-overlay-text-muted); }
    .dim { color:var(--ds-overlay-text-label);margin-top:4px; }
    .card-actions { padding:0 20px 12px; }
    .card-btn { cursor:pointer;padding:8px 20px;border-radius:6px;border:1px solid var(--ds-overlay-accent-warm);background:var(--ds-overlay-accent-warm-muted);color:var(--ds-overlay-accent-warm);font-size:13px;font-weight:500;transition:background .15s; }
    .card-btn:hover { background:var(--ds-overlay-accent-warm-hover); }
    .card-result { margin:0 20px 16px;padding:14px 16px;border-radius:8px;background:var(--ds-overlay-embed-bg);border:1px solid var(--ds-overlay-border);font-family:Consolas,Menlo,monospace;font-size:12px;line-height:1.5;max-height:360px;overflow:auto; }
    .hl-yellow { color:var(--ds-overlay-accent-warm); }
    .hl-blue { color:var(--color-accent-soft); }
</style>
