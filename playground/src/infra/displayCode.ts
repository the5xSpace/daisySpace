import type { DemoDefinition } from "./types";

// ── 代码分离结果 ──
export interface SplitCode {
    /** SDK 核心代码（不含 UI 面板控制代码） */
    daisyCode: string;
    /** 独立的 UI 控制代码 */
    uiCode: string;
    /** 是否有 UI 代码需要分离展示 */
    hasUi: boolean;
    /** 是否为 Svelte 组件（三段分离） */
    isSvelte: boolean;
    /** Svelte script 部分（仅 isSvelte=true 时有效） */
    svelteScript: string;
    /** Svelte template 部分（仅 isSvelte=true 时有效） */
    svelteTemplate: string;
    /** Svelte style 部分（仅 isSvelte=true 时有效） */
    svelteStyle: string;
    /** 纯 JS 版本（Svelte 语法已转换，可直接复制使用） */
    jsCode: string;
    /** TypeScript 版本（含类型标注） */
    tsCode: string;
    /** 是否有模板代码（用于 UI 隐藏空标签） */
    hasTemplate: boolean;
    /** 是否有样式代码（用于 UI 隐藏空标签） */
    hasStyle: boolean;
}

/** 将 Svelte 源码拆分为 script / template / style 三段 */
function splitSvelte(source: string): { script: string; template: string; style: string } {
    let script = "";
    let template = "";
    let style = "";

    // 提取 <script>...</script>
    const scriptMatch = source.match(/<script[\s>][\s\S]*?<\/script>/);
    if (scriptMatch) {
        const raw = scriptMatch[0];
        // 去掉 <script> 和 </script> 标签，保留内部内容
        script = raw.replace(/^<script[^>]*>\s*\n?/, "").replace(/\s*<\/script>\s*$/, "").trim();
    }

    // 提取 <style>...</style>
    const styleMatch = source.match(/<style[\s>][\s\S]*?<\/style>/);
    if (styleMatch) {
        const raw = styleMatch[0];
        style = raw.replace(/^<style[^>]*>\s*\n?/, "").replace(/\s*<\/style>\s*$/, "").trim();
    }

    // 提取 template：script 之后、style 之前的部分
    const scriptEnd = scriptMatch ? source.indexOf(scriptMatch[0]) + scriptMatch[0].length : 0;
    const styleStart = styleMatch ? source.indexOf(styleMatch[0]) : source.length;
    template = source.slice(scriptEnd, styleStart).trim();

    return { script, template, style };
}

/** 过滤仅用于 Playground 运行壳层、对用户示例无意义的脚本导入。 */
function filterPlaygroundOnlyImports(script: string): string {
    return script.replace(
        /^[ \t]*import\s+DemoPanel\s+from\s+["'][^"'\r\n]*\/shell\/DemoPanel\.svelte["'];?[ \t]*(?:\r?\n|$)/gm,
        "",
    ).trim();
}

const SCRIPT_HEADER = `// ═══════════════════════════════════════════════════════════════
// ⚠ 本示例以 Svelte 5 组件格式编写，仅用于 Playground 内部运行演示
//    以下几点请特别注意，不要误认为是 Daisy SDK 自身的能力：
//
// 1. $props() 是 Svelte 5 组件接收参数的语法，不是 Daisy SDK 的 API
//    → 在你的项目中，请直接 import 所需模块，例如：
//      import { Engine, PW, Spg4, ... } from "daisy-space-sdk";
//
// 2. engine / daisy / container / log 等变量由 Playground 框架自动注入
//    → 在你的项目中，需要自行创建 Engine 实例，例如：
//      const engine = await Engine.create(container);
//
// 3. $state() 是 Svelte 5 的响应式状态语法，不是 Daisy SDK 的 API
//    → 在你的项目中，按自己框架（React / Vue / 原生 JS）的方式管理状态即可
//
// 4. registerCleanup 是 Playground 框架提供的清理注册器
//    → 在你的项目中，需要自行管理资源清理（如 engine.destroy()）
// ═══════════════════════════════════════════════════════════════
`;

const TEMPLATE_HEADER = `<!-- ⚠ 以下为 Svelte 5 模板语法（{#if} / {#each} / {@html} 等）
     这不是 Daisy SDK 的 API，仅用于 Playground 内部运行演示
     你的项目中请使用自己框架的模板语法 -->
`;

// ── svelteToJs 辅助函数 ──

/** 找到从 pos 处开括号对应的闭括号位置，未找到返回 -1 */
function findMatchingOpen(s: string, pos: number, open: string, close: string): number {
    let depth = 1;
    let i = pos;
    while (i < s.length && depth > 0) {
        if (s[i] === open) depth++;
        else if (s[i] === close) depth--;
        if (depth > 0) i++;
    }
    return depth === 0 ? i : -1;
}

/** 将字符串 body 的公共缩进剥离 */
function stripIndent(body: string): string {
    const lines = body.split("\n");
    const nonEmptyLines = lines.filter(l => l.trim().length > 0);
    if (nonEmptyLines.length === 0) return "";
    const minIndent = Math.min(...nonEmptyLines.map(l => l.length - l.trimStart().length));
    return lines.map(l => l.length >= minIndent ? l.slice(minIndent) : l.trim()).join("\n").trim();
}

/** 将 Svelte 组件 script 转换为 JS / TS 代码 */
function svelteToCode(script: string, ts: boolean): string {
    let result = script;

    // ── 规则 F: Svelte import 语句处理 ──
    result = result.replace(
        /^import\s+\{([^}]*)\}\s+from\s+["']svelte["'];?\s*$/gm,
        (_m, imports: string) => {
            const names = imports.split(",").map((s: string) => s.trim()).filter(Boolean);
            return `// ${names.join(", ")} 是 Svelte 生命周期/API 函数，在你的项目中按框架方式处理`;
        },
    );

    // ── 规则 A: $props() 解构 → import + 创建代码 ──
    let hasDaisyImport = false;
    let hasCleanupProp = false;
    let hasEngineProp = false;
    let hasContainerProp = false;

    result = result.replace(
        /^(\s*)(let|const)\s+\{([^}]+)\}\s*=\s*\$props\(\);?\s*$/gm,
        (_m, indent: string, _kw: string, destructured: string) => {
            const items = destructured.split(",").map((s: string) => s.trim()).filter(Boolean);
            const unknownLines: string[] = [];

            const padLines = (lines: string[]) => lines.map((line) => line ? `${indent}${line}` : line);

            for (const item of items) {
                const aliasMatch = item.match(/^(\w+)\s*:\s*(\w+)$/);
                const localName = aliasMatch ? aliasMatch[2] : item;
                const propName = aliasMatch ? aliasMatch[1] : item;

                if (propName === "daisy" || localName === "Daisy") { hasDaisyImport = true; continue; }
                if (propName === "registerCleanup") { hasCleanupProp = true; continue; }
                if (propName === "log" || localName === "__log") continue;
                if (propName === "engine" || localName === "engine") { hasEngineProp = true; continue; }
                if (propName === "container" || localName === "container") { hasContainerProp = true; continue; }
                unknownLines.push(`// props: ${item}`);
            }

            const parts: string[] = [];
            if (hasDaisyImport) parts.push('import * as Daisy from "daisy-space-sdk";');

            // 生成 engine 创建过程
            if (hasEngineProp || hasContainerProp) {
                parts.push("");
                parts.push('// 获取容器 DOM（替换为你的容器 ID）');
                parts.push('const container = document.getElementById("app");');
                if (hasEngineProp) {
                    parts.push("");
                    parts.push("// 创建引擎实例");
                    parts.push(ts
                        ? "const engine: Daisy.Engine = await Daisy.Engine.create(container);"
                        : "const engine = await Daisy.Engine.create(container);");
                }
            }

            if (unknownLines.length > 0) {
                if (parts.length > 0) parts.push("");
                parts.push(...unknownLines);
            }
            if (hasCleanupProp) {
                if (parts.length > 0) parts.push("");
                parts.push("// 如需销毁资源，请执行：");
                parts.push("//   engine.destroy();");
            }
            return padLines(parts).join("\n");
        },
    );

    // ── 替换 __log(...) / __log?.(...) 调用为 console.log(...) ──
    result = result.replace(/\b__log\?\.\(/g, "console.log(");
    result = result.replace(/\b__log\(/g, "console.log(");

    // ── 规则 E: registerCleanup(...) → 注释提示 ──
    {
        let idx = result.indexOf("registerCleanup(");
        while (idx !== -1) {
            const lineStart = result.lastIndexOf("\n", idx) + 1;
            const indent = result.substring(lineStart).match(/^\s*/)?.[0] ?? "";

            // 定位箭头函数体的开括号
            let braceStart = result.indexOf("{", idx);
            if (braceStart === -1) break;
            const braceEnd = findMatchingOpen(result, braceStart + 1, "{", "}");
            if (braceEnd === -1) break;

            const body = result.substring(braceStart + 1, braceEnd);
            const dedented = stripIndent(body);
            const bodyLines = dedented.split("\n");

            const commentLines = [
                `${indent}// 如需销毁请执行：`,
                ...bodyLines.map(l => `${indent}//   ${l.trim()}`),
            ];

            // 定位 registerCleanup(...); 的结尾
            let stmtEnd = result.indexOf(";", braceEnd);
            if (stmtEnd === -1) stmtEnd = braceEnd;
            else stmtEnd += 1;
            // 包含尾随换行
            if (result[stmtEnd] === "\n") stmtEnd += 1;
            else if (result[stmtEnd] === "\r" && result[stmtEnd + 1] === "\n") stmtEnd += 2;

            result = result.substring(0, lineStart) + commentLines.join("\n") + "\n" + result.substring(stmtEnd);
            idx = result.indexOf("registerCleanup(", lineStart + commentLines.join("\n").length);
        }
    }

    // ── 规则 B: $state(...) → 值 ──
    {
        let idx = result.indexOf("$state(");
        while (idx !== -1) {
            const argStart = idx + 7; // 跳过 "$state("
            const argEnd = findMatchingOpen(result, argStart, "(", ")");
            if (argEnd === -1) break;
            const inner = result.substring(argStart, argEnd);
            result = result.substring(0, idx) + inner + result.substring(argEnd + 1);
            idx = result.indexOf("$state(", idx + inner.length);
        }
    }

    // ── 规则 D: $derived(...) → 内联表达式 + 注释 ──
    {
        let idx = result.indexOf("$derived(");
        while (idx !== -1) {
            const lineStart = result.lastIndexOf("\n", idx) + 1;
            const indent = result.substring(lineStart).match(/^\s*/)?.[0] ?? "";

            const argStart = idx + 9; // 跳过 "$derived("
            const argEnd = findMatchingOpen(result, argStart, "(", ")");
            if (argEnd === -1) break;
            const inner = result.substring(argStart, argEnd);

            const comment = `${indent}// 派生值（每次使用时重新计算）:\n`;
            result = result.substring(0, lineStart) + comment + result.substring(lineStart, idx) + inner + result.substring(argEnd + 1);
            idx = result.indexOf("$derived(", lineStart + comment.length + inner.length);
        }
    }

    // ── 规则 C: $effect(...) → 注释化回调体 ──
    {
        let idx = result.indexOf("$effect(");
        while (idx !== -1) {
            const lineStart = result.lastIndexOf("\n", idx) + 1;
            const indent = result.substring(lineStart).match(/^\s*/)?.[0] ?? "";

            const braceStart = result.indexOf("{", idx);
            if (braceStart === -1) break;
            const braceEnd = findMatchingOpen(result, braceStart + 1, "{", "}");
            if (braceEnd === -1) break;

            const body = result.substring(braceStart + 1, braceEnd);
            const dedented = stripIndent(body);
            const bodyLines = dedented.split("\n");

            const commentLines = [
                `${indent}// 响应式副作用（在你的项目中，状态变化时需手动调用）:`,
                ...bodyLines.map(l => `${indent}//   ${l.trim()}`),
            ];

            // 定位 $effect(...); 的结尾
            let stmtEnd = result.indexOf(";", braceEnd);
            if (stmtEnd === -1) stmtEnd = braceEnd + 2; // 跳过 ");"
            else stmtEnd += 1;
            if (result[stmtEnd] === "\n") stmtEnd += 1;
            else if (result[stmtEnd] === "\r" && result[stmtEnd + 1] === "\n") stmtEnd += 2;

            result = result.substring(0, lineStart) + commentLines.join("\n") + "\n" + result.substring(stmtEnd);
            idx = result.indexOf("$effect(", lineStart + commentLines.join("\n").length);
        }
    }

    // ── 规则 G: 代码头部说明 ──
    const headerLines = [
        "// ═══════════════════════════════════════════════════════",
        ts
            ? "// 以下为 TypeScript 版本，可直接复制使用"
            : "// 以下为纯 JavaScript 版本，可直接复制使用",
    ];
    if (ts) {
        headerLines.push("//");
        headerLines.push("// 说明：Daisy SDK 导出了完整的 .d.ts 类型定义，");
        headerLines.push("// import * as Daisy 后 IDE 会自动推断 Daisy.xxx 的类型。");
        headerLines.push("// 示例中业务逻辑部分的类型标注（如函数参数）未做额外添加，");
        headerLines.push("// 请根据你自己项目的规范酌情补充。");
    }
    if (hasEngineProp || hasContainerProp) {
        // engine 创建代码已内联生成，头部只需简短说明
        headerLines.push("// ═══════════════════════════════════════════════════════");
    } else if (hasDaisyImport) {
        headerLines.push("// 在你的项目中：");
        headerLines.push('//   1. import * as Daisy from "daisy-space-sdk";');
        headerLines.push("//   2. 本示例直接使用 Daisy 静态 API，不需要 Engine 初始化");
        headerLines.push("//   按需管理状态和 UI（本示例不含 UI 面板代码）");
        headerLines.push("// ═══════════════════════════════════════════════════════");
    } else {
        headerLines.push("// ═══════════════════════════════════════════════════════");
    }
    result = headerLines.join("\n") + "\n" + result;

    return result;
}

/**
 * 构建分离后的展示代码。
 * - daisyCode: SDK 核心代码（初始化 + Engine + 业务逻辑，不含 UI 面板代码）
 * - uiCode: UI 控制代码（面板创建 + 按钮/开关 + 面板销毁）
 * - hasUi: 是否有需要分离展示的 UI 代码
 */
export function buildDisplayCode(_demo: DemoDefinition, demoCode: string): SplitCode {
    const {script: rawScript, template, style} = splitSvelte(demoCode);
    const script = filterPlaygroundOnlyImports(rawScript);
    return {
        daisyCode: script || "// （无 script 代码）",
        uiCode: "",
        hasUi: false,
        isSvelte: true,
        svelteScript: script ? SCRIPT_HEADER + script : "// （无 script 代码）",
        svelteTemplate: template ? TEMPLATE_HEADER + template : "<!-- （无模板代码） -->",
        svelteStyle: style || "/* （无样式代码） */",
        jsCode: script ? svelteToCode(script, false) : "// （无 script 代码）",
        tsCode: script ? svelteToCode(script, true) : "// （无 script 代码）",
        hasTemplate: !!template,
        hasStyle: !!style,
    };
}
