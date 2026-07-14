<script>
    /**
     * SGP4 轨道解析与外推
     * 展示 parseOrbitMetadata / parseOrbitElements / parseTle / observeAt
     *
     * Daisy 由 DemoRunner 注入为 props
     */
    let { daisy: Daisy, __log } = $props();

    const SCENE_DATE = new Date("2026-04-20T12:00:00Z");

    // ── 辅助函数 ──
    const fmt = (v, digits = 3) => {
        if (v == null) return "—";
        return Number.isFinite(v) ? v.toFixed(digits) : String(v);
    };
    const fmtTs = (ts) => {
        if (!ts) return "—";
        return new Date(ts).toISOString().replace("T", " ").slice(0, 19);
    };
    const safeTleLines = (tle) => {
        const result = Daisy.Spg4.parseTle(tle);
        if (typeof result === "string") return result.split("\n");
        return String(tle).split("\n");
    };

    const tleSl = `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`;

    const tleQf = `QIANFAN-1
1 60379U 24140A   26110.56333470  .00000026  00000+0  20818-4 0  9997
2 60379  88.9678 285.9224 0017010 196.8745 163.1842 13.51003321 84741`;

    const bj = [39.9, 116.4, 0.05];
    const now = SCENE_DATE;

    // ── 卡片结果状态 ──
    let card1 = $state("");
    let card2 = $state("");
    let card3 = $state("");
    let card4 = $state("");

    function runCard1() {
        const meta = Daisy.Spg4.parseOrbitMetadata(tleSl);
        const elems = Daisy.Spg4.parseOrbitElements(tleSl);
        const norm = safeTleLines(tleSl);
        card1 = `
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">OrbitMetadata</div>
<div>格式: ${meta.format ?? "—"} | NORAD: ${meta.noradCatalogNumber ?? "—"}</div>
<div>名称: ${meta.name ?? "—"} | 国际编号: ${meta.internationalDesignator ?? "—"}</div>
<div>轨道分类: ${meta.orbitClass ?? "—"} | 深空: ${meta.isDeepSpace ? "是" : "否"}</div>
<div>中心体: ${meta.centerName ?? "—"} | 参考系: ${meta.referenceFrame ?? "—"}</div>
<div>历元: ${fmtTs(meta.epochMs)}</div>
<hr style="border-color:var(--ds-overlay-border);margin:8px 0;" />
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">parseOrbitElements</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;">
<div>半长轴 a: ${fmt(elems.semiMajorAxisKm, 3)} km</div>
<div>偏心率 e: ${fmt(elems.eccentricity, 6)}</div>
<div>倾角 i: ${fmt(elems.inclination, 4)}°</div>
<div>升交点赤经 Ω: ${fmt(elems.rightAscensionOfAscendingNode, 4)}°</div>
<div>近地点幅角 ω: ${fmt(elems.argumentOfPerigee, 4)}°</div>
<div>平近点角 M: ${fmt(elems.meanAnomaly, 4)}°</div>
<div>平运动: ${fmt(elems.meanMotion, 4)} rev/day</div>
<div>轨道周期: ${fmt(elems.orbitalPeriodSeconds, 2)} s</div>
<div>BSTAR: ${fmt(elems.bstar, 8)}</div>
</div>
<hr style="border-color:var(--ds-overlay-border);margin:8px 0;" />
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">parseTle (归一化)</div>
<pre style="margin:0;font-size:11px;color:var(--ds-overlay-text-muted);">${norm[0] || "—"}
${norm[1] || "—"}
${norm[2] || "—"}</pre>`;
    }

    function runCard2() {
        const eci = Daisy.Spg4.observeAt(tleSl, null, now);
        if (!eci) { card2 = `<div style="color:var(--color-error);">计算失败</div>`; return; }
        const obs = Daisy.Spg4.observeAt(tleSl, bj, now);
        const p = eci.eci?.position;
        const v = eci.eci?.velocity;
        let obsHtml = "";
        if (obs && obs.azimuth != null) {
            obsHtml = `
<div style="margin-top:8px;color:var(--color-accent-soft);">━━━ 观测者视角 (北京) ━━━</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;">
<div>方位角: ${fmt(obs.azimuth, 2)}°</div>
<div>仰角: ${fmt(obs.elevation, 2)}°</div>
<div>斜距: ${fmt(obs.rangeSat, 2)} km</div>
<div>覆盖半径: ${fmt(obs.footprint, 1)} km</div>
</div>`;
        } else {
            obsHtml = `<div style="margin-top:8px;color:var(--color-error);">当前时刻卫星对北京不可见</div>`;
        }
        card2 = `
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">🌐 经纬度高程 (WGS84)</div>
<div>纬度 ${fmt(eci.latitude, 4)}° &nbsp; 经度 ${fmt(eci.longitude, 4)}° &nbsp; 高度 ${fmt(eci.altitude, 3)} km &nbsp; ${eci.sunlit ? "☀" : "🌙"}</div>
<div style="margin-top:6px;color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">🛰 TEME (km / km/s) — SGP4 原生</div>
<div>位置: ${p ? `${fmt(p.x, 3)}, ${fmt(p.y, 3)}, ${fmt(p.z, 3)}` : "—"}</div>
<div>速度: ${v ? `${fmt(v.x, 6)}, ${fmt(v.y, 6)}, ${fmt(v.z, 6)}` : "—"}</div>
<div style="margin-top:6px;color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">⚡ ECI (km / km/s)</div>
<div>位置: ${p ? `${fmt(p.x, 3)}, ${fmt(p.y, 3)}, ${fmt(p.z, 3)}` : "—"}</div>
<div>速度: ${v ? `${fmt(v.x, 6)}, ${fmt(v.y, 6)}, ${fmt(v.z, 6)}` : "—"}</div>
${obsHtml}`;
    }

    function runCard3() {
        const eci = Daisy.Spg4.observeAt(tleQf, null, now);
        if (!eci) { card3 = `<div style="color:var(--color-error);">计算失败</div>`; return; }
        const obs = Daisy.Spg4.observeAt(tleQf, bj, now);
        const p = eci.eci?.position;
        const v = eci.eci?.velocity;
        let obsHtml = "";
        if (obs && obs.azimuth != null) {
            obsHtml = `
<div style="margin-top:8px;color:var(--color-accent-soft);">━━━ 观测者视角 (北京) ━━━</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;">
<div>方位角: ${fmt(obs.azimuth, 2)}°</div>
<div>仰角: ${fmt(obs.elevation, 2)}°</div>
<div>斜距: ${fmt(obs.rangeSat, 2)} km</div>
<div>覆盖半径: ${fmt(obs.footprint, 1)} km</div>
</div>`;
        } else {
            obsHtml = `<div style="margin-top:8px;color:var(--color-error);">当前时刻卫星对北京不可见</div>`;
        }
        card3 = `
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">🌐 经纬度高程 (WGS84)</div>
<div>纬度 ${fmt(eci.latitude, 4)}° &nbsp; 经度 ${fmt(eci.longitude, 4)}° &nbsp; 高度 ${fmt(eci.altitude, 3)} km &nbsp; ${eci.sunlit ? "☀" : "🌙"}</div>
<div style="margin-top:6px;color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">🛰 TEME (km / km/s)</div>
<div>位置: ${p ? `${fmt(p.x, 3)}, ${fmt(p.y, 3)}, ${fmt(p.z, 3)}` : "—"}</div>
<div>速度: ${v ? `${fmt(v.x, 6)}, ${fmt(v.y, 6)}, ${fmt(v.z, 6)}` : "—"}</div>
<div style="margin-top:6px;color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">⚡ ECI (km / km/s)</div>
<div>位置: ${p ? `${fmt(p.x, 3)}, ${fmt(p.y, 3)}, ${fmt(p.z, 3)}` : "—"}</div>
<div>速度: ${v ? `${fmt(v.x, 6)}, ${fmt(v.y, 6)}, ${fmt(v.z, 6)}` : "—"}</div>
${obsHtml}`;
    }

    function runCard4() {
        const meta = Daisy.Spg4.parseOrbitMetadata(tleQf);
        const elems = Daisy.Spg4.parseOrbitElements(tleQf);
        card4 = `
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">OrbitMetadata</div>
<div>格式: ${meta.format ?? "—"} | NORAD: ${meta.noradCatalogNumber ?? "—"}</div>
<div>名称: ${meta.name ?? "—"} | 轨道分类: ${meta.orbitClass ?? "—"}</div>
<div>历元: ${fmtTs(meta.epochMs)} | 深空: ${meta.isDeepSpace ? "是" : "否"}</div>
<hr style="border-color:var(--ds-overlay-border);margin:8px 0;" />
<div style="color:var(--ds-overlay-accent-warm);font-weight:600;margin-bottom:4px;">parseOrbitElements</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 16px;">
<div>半长轴 a: ${fmt(elems.semiMajorAxisKm, 3)} km</div>
<div>偏心率 e: ${fmt(elems.eccentricity, 6)}</div>
<div>倾角 i: ${fmt(elems.inclination, 4)}°</div>
<div>升交点赤经 Ω: ${fmt(elems.rightAscensionOfAscendingNode, 4)}°</div>
<div>近地点幅角 ω: ${fmt(elems.argumentOfPerigee, 4)}°</div>
<div>平近点角 M: ${fmt(elems.meanAnomaly, 4)}°</div>
<div>平运动: ${fmt(elems.meanMotion, 4)} rev/day</div>
<div>轨道周期: ${fmt(elems.orbitalPeriodSeconds, 2)} s</div>
</div>`;
    }

    __log?.("SGP4 轨道解析与外推 — 点击卡片按钮查看 API 调用结果");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="SGP4 解析">
    <div class="spg4-wrap">
        <div class="header">
        <h1>SGP4 轨道解析与外推</h1>
        <p>parseOrbitMetadata · parseOrbitElements · parseTle · observeAt</p>
        <div class="warning">
            ⚠ SGP4 输出为 <b>TEME</b> 坐标系（真赤道平春分点），非 J2000/GCRF。<br />
            场景时间已锁定: <b>{SCENE_DATE.toISOString()}</b> — 与 TLE 历元（26110）对齐。
        </div>
    </div>

    <!-- 卡片 1: STARLINK-1008 数据格式 -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">📋 数据格式 — parseOrbitMetadata / parseOrbitElements / parseTle</div>
            <div class="card-desc">输入 TLE 两行根数，解析轨道元数据、轨道根数、归一化 TLE</div>
        </div>
        <div class="card-input">
            <div class="tle-label">TLE: <span class="hl-yellow">STARLINK-1008</span> (NORAD 44714, 历元 26110)</div>
            <pre class="tle-pre">{tleSl}</pre>
        </div>
        <div class="card-actions">
            <button class="card-btn" onclick={runCard1}>▶ 解析 STARLINK-1008</button>
        </div>
        {#if card1}
            <div class="card-result">{@html card1}</div>
        {/if}
    </div>

    <!-- 卡片 2: 外推 STARLINK-1008 -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">📍 外推 — observeAt (STARLINK-1008)</div>
            <div class="card-desc">给定 TLE + 观测站坐标 + 时刻 → 输出 LLA / TEME / ECI 及观测者视角数据</div>
        </div>
        <div class="card-input">
            <div class="tle-label">TLE: <span class="hl-yellow">STARLINK-1008</span> (NORAD 44714, 历元 26110)</div>
            <div>观测站: 北京 (39.9°N, 116.4°E, 0.05km) | 外推时刻: <span class="hl-dim">{now.toISOString().slice(0, 19)}Z</span></div>
        </div>
        <div class="card-actions">
            <button class="card-btn" onclick={runCard2}>▶ 执行外推</button>
        </div>
        {#if card2}
            <div class="card-result">{@html card2}</div>
        {/if}
    </div>

    <!-- 卡片 3: 外推 QIANFAN-1 -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">📍 外推 — observeAt (QIANFAN-1)</div>
            <div class="card-desc">同样的 observeAt API，输入 QIANFAN-1 TLE → 输出 LLA / TEME / ECI 及观测数据</div>
        </div>
        <div class="card-input">
            <div class="tle-label">TLE: <span class="hl-blue">QIANFAN-1</span> (NORAD 60379, 历元 26110)</div>
            <div>观测站: 北京 (39.9°N, 116.4°E, 0.05km) | 外推时刻: <span class="hl-dim">{now.toISOString().slice(0, 19)}Z</span></div>
        </div>
        <div class="card-actions">
            <button class="card-btn" onclick={runCard3}>▶ 执行外推</button>
        </div>
        {#if card3}
            <div class="card-result">{@html card3}</div>
        {/if}
    </div>

    <!-- 卡片 4: QIANFAN-1 数据格式 -->
    <div class="card">
        <div class="card-head">
            <div class="card-title">📋 数据格式 — parseOrbitMetadata / parseOrbitElements (QIANFAN-1)</div>
            <div class="card-desc">解析 QIANFAN-1 TLE 的轨道元数据和轨道根数，展示不同轨道倾角（~89° 极轨）的差异</div>
        </div>
        <div class="card-input">
            <div class="tle-label">TLE: <span class="hl-blue">QIANFAN-1</span> (NORAD 60379, 历元 26110)</div>
            <pre class="tle-pre">{tleQf}</pre>
        </div>
        <div class="card-actions">
            <button class="card-btn" onclick={runCard4}>▶ 解析 QIANFAN-1</button>
        </div>
        {#if card4}
            <div class="card-result">{@html card4}</div>
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

    .header {
        margin-bottom: 32px;
    }
    .header h1 {
        font-size: 26px;
        font-weight: 700;
        margin: 0 0 6px;
        color: var(--ds-overlay-accent-warm);
    }
    .header p {
        font-size: 14px;
        color: var(--ds-overlay-text-muted);
        margin: 0;
    }
    .warning {
        margin-top: 10px;
        padding: 8px 12px;
        background: var(--ds-overlay-accent-warm-muted);
        border: 1px solid var(--ds-overlay-accent-warm-border);
        border-radius: 6px;
        font-size: 12px;
        color: var(--ds-overlay-accent-warm);
        line-height: 1.5;
    }

    .card {
        margin-bottom: 20px;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--ds-overlay-border);
        background: var(--ds-overlay-card-bg);
    }
    .card-head {
        padding: 16px 20px;
        border-bottom: 1px solid var(--ds-overlay-border);
    }
    .card-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--ds-overlay-text);
    }
    .card-desc {
        font-size: 12px;
        color: var(--ds-overlay-text-muted);
        margin-top: 2px;
    }

    .card-input {
        padding: 12px 20px;
        font-size: 11px;
        color: var(--ds-overlay-text-muted);
    }
    .tle-label {
        margin-bottom: 4px;
    }
    .tle-pre {
        margin: 0;
        padding: 8px 10px;
        background: var(--ds-overlay-embed-bg);
        border-radius: 6px;
        font-size: 11px;
        color: var(--ds-overlay-text-muted);
    }

    .card-actions {
        padding: 0 20px 12px;
    }
    .card-btn {
        cursor: pointer;
        padding: 8px 20px;
        border-radius: 6px;
        border: 1px solid var(--ds-overlay-accent-warm);
        background: var(--ds-overlay-accent-warm-muted);
        color: var(--ds-overlay-accent-warm);
        font-size: 13px;
        font-weight: 500;
        transition: background 0.15s;
    }
    .card-btn:hover {
        background: var(--ds-overlay-accent-warm-hover);
    }

    .card-result {
        margin: 0 20px 16px;
        padding: 14px 16px;
        border-radius: 8px;
        background: var(--ds-overlay-embed-bg);
        border: 1px solid var(--ds-overlay-border);
        font-family: Consolas, Menlo, monospace;
        font-size: 12px;
        line-height: 1.5;
        max-height: 360px;
        overflow: auto;
    }

    .hl-yellow { color: var(--ds-overlay-accent-warm); }
    .hl-blue { color: var(--color-accent-soft); }
    .hl-dim { color: var(--ds-overlay-text-muted); }
</style>
