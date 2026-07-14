<script>
    /**
     * SGP4 星历采样
     * 展示 ephemeris — 多步长选择与三坐标系同步显示
     */
    let { daisy: Daisy, __log } = $props();

    const SCENE_DATE = new Date("2026-04-20T12:00:00Z");

    const fmt = (v, digits = 3) => v == null ? "—" : (Number.isFinite(v) ? v.toFixed(digits) : String(v));
    const fmtTs = (ts) => ts ? new Date(ts).toISOString().replace("T", " ").slice(0, 19) : "—";

    const tleSl = `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`;

    const bj = [39.9, 116.4, 0.05];
    const t0 = new Date("2026-04-20T00:00:00Z");
    const t1 = new Date("2026-04-21T00:00:00Z");

    const STEP_OPTIONS = [
        { label: "10 秒", value: 10 },
        { label: "30 秒", value: 30 },
        { label: "60 秒", value: 60 },
        { label: "5 分钟", value: 300 },
        { label: "10 分钟", value: 600 },
    ];

    let step = $state(600);
    let result = $state("");
    let ephemCache = [];

    function run() {
        if (ephemCache.length === 0 || step !== (ephemCache._step || 600)) {
            ephemCache = Daisy.Spg4.ephemeris(tleSl, bj, t0, t1, step * 1000);
            ephemCache._step = step;
        }
        let h = `<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:2px;">共 ${ephemCache.length} 个采样点 | 步长: ${step} 秒</div>`;
        h += `<div style="font-size:10px;color:var(--ds-overlay-text-muted);margin-bottom:4px;">🌐 LLA | 🛰 TEME | ⚡ ECI — 坐标均以逗号分隔，位置 km / 速度 km/s</div>`;
        h += `<table style="width:100%;border-collapse:collapse;font-size:10px;">`;
        h += `<tr style="color:var(--color-accent-soft);"><th style="text-align:left;">时间 (UTC)</th><th>🌐 LLA</th><th>🛰 TEME</th><th>⚡ ECI</th><th>仰角°</th></tr>`;
        const limit = Math.min(ephemCache.length, 36);
        for (let i = 0; i < limit; i++) {
            const r = ephemCache[i];
            const p = r.eci?.position, v = r.eci?.velocity;
            h += `<tr style="border-bottom:1px solid var(--ds-overlay-btn-bg);">
                <td>${fmtTs(r.timestamp).slice(11, 19)}</td>
                <td style="font-size:9px;">${fmt(r.latitude,2)},${fmt(r.longitude,2)},${fmt(r.altitude,1)}</td>
                <td style="font-size:9px;">${p?fmt(p.x,1):"—"},${p?fmt(p.y,1):"—"},${p?fmt(p.z,1):"—"}</td>
                <td style="font-size:9px;">${p?fmt(p.x,1):"—"},${p?fmt(p.y,1):"—"},${p?fmt(p.z,1):"—"}</td>
                <td style="text-align:right;">${fmt(r.elevation,1)}</td></tr>`;
        }
        if (ephemCache.length > 36) h += `<tr><td colspan="5" style="color:var(--ds-overlay-text-label);">…仅显示前 36 行 (共 ${ephemCache.length})</td></tr>`;
        h += `</table>`;
        result = h;
    }

    __log?.("SGP4 星历采样 — 切换步长后点击「生成星历表」按钮");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="SGP4 星历">
    <div class="spg4-wrap">
        <div class="header">
        <h1>SGP4 星历采样</h1>
        <p>ephemeris — 多步长选择 · 三坐标系（LLA / TEME / ECI）同步展示</p>
        <div class="warning">
            ⚠ SGP4 输出为 <b>TEME</b> 坐标系（真赤道平春分点），非 J2000/GCRF。<br />
            场景时间已锁定: <b>{SCENE_DATE.toISOString()}</b> — 与 TLE 历元（26110）对齐。
        </div>
    </div>

    <div class="card">
        <div class="card-head">
            <div class="card-title">📊 星历表 — ephemeris (STARLINK-1008)</div>
            <div class="card-desc">给定 TLE + 观测站 + 时间范围 + 步长 → LLA / TEME / ECI 三坐标系星历序列</div>
        </div>
        <div class="card-input">
            <div>TLE: <span class="hl-yellow">STARLINK-1008</span> (NORAD 44714) | 观测站: 北京 | {t0.toISOString().slice(0,16)}~{t1.toISOString().slice(0,16)}</div>
            <div class="step-row">
                <span>步长:</span>
                {#each STEP_OPTIONS as opt}
                    <button
                        class="step-btn"
                        class:active={step === opt.value}
                        onclick={() => { step = opt.value; ephemCache = []; }}
                    >{opt.label}</button>
                {/each}
            </div>
        </div>
        <div class="card-actions">
            <button class="card-btn" onclick={run}>▶ 生成星历表</button>
        </div>
        {#if result}
            <div class="card-result">{@html result}</div>
        {/if}
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
    .card-actions { padding:0 20px 12px; }
    .card-btn { cursor:pointer;padding:8px 20px;border-radius:6px;border:1px solid var(--ds-overlay-accent-warm);background:var(--ds-overlay-accent-warm-muted);color:var(--ds-overlay-accent-warm);font-size:13px;font-weight:500;transition:background .15s; }
    .card-btn:hover { background:var(--ds-overlay-accent-warm-hover); }
    .card-result { margin:0 20px 16px;padding:14px 16px;border-radius:8px;background:var(--ds-overlay-embed-bg);border:1px solid var(--ds-overlay-border);font-family:Consolas,Menlo,monospace;font-size:12px;line-height:1.5;max-height:420px;overflow:auto; }
    .step-row { display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:8px; }
    .step-btn { font-size:11px;padding:4px 10px;border-radius:4px;border:1px solid var(--ds-overlay-border);background:var(--ds-overlay-btn-bg);color:var(--ds-overlay-text-muted);cursor:pointer; }
    .step-btn.active { border-color:var(--ds-overlay-accent-warm);background:var(--ds-overlay-accent-warm-muted);color:var(--ds-overlay-accent-warm); }
    .hl-yellow { color:var(--ds-overlay-accent-warm); }
</style>
