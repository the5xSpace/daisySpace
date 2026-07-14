/**
 * auto-api-link — VitePress markdown-it 插件
 *
 * 在 token 树层面（core ruler）遍历所有 text 节点，将其中的 API 符号
 * 替换为指向 /api/ 文档的链接（target="_blank"）。
 *
 * 使用 core ruler 而非 renderer rules.text 的原因：
 * VitePress 的表格渲染管线和正文可能走不同的 text 渲染路径，
 * core ruler 在渲染前统一修改 token 树，确保表格 cell 和正文同等覆盖。
 */

import type MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INDEX_PATH = path.resolve(__dirname, "api-index.json");

let _terms: string[] | null = null;
let _index: Record<string, string> | null = null;
let _indexMtimeMs = 0;

function loadIndex(): { terms: string[]; index: Record<string, string> } {
    const stat = fs.statSync(INDEX_PATH);
    if (_terms && _index && _indexMtimeMs === stat.mtimeMs) {
        return { terms: _terms, index: _index };
    }

    const raw = fs.readFileSync(INDEX_PATH, "utf-8");
    _index = JSON.parse(raw) as Record<string, string>;
    _terms = Object.keys(_index).sort((a, b) => b.length - a.length);
    _indexMtimeMs = stat.mtimeMs;
    return { terms: _terms, index: _index };
}

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function linkifyText(content: string, localePrefix = ""): string {
    const { terms, index } = loadIndex();
    if (!/[A-Z]/.test(content)) return content;

    let result = content;

    for (const term of terms) {
        if (!result.includes(term)) continue;

        const url = `${localePrefix}${index[term]}`;
        // 排除后接泛型类型参数 \<T\> / &lt;T&gt; / <T> 的情况，避免 Vue 模板
        // 编译时把 <T> 误解析为未闭合的组件标签
        const regex = new RegExp(
            `(?<![\\w.])${escapeRegex(term)}(?![\\w.])(?!\\s*(?:\\\\<|<|&lt;))`,
            "g"
        );

        result = result.replace(regex, () => {
            return `<a href="${url}" target="_blank" class="api-link">${term}</a>`;
        });
    }

    return result;
}

function walk(tokens: Token[], localePrefix: string): void {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        const isTextLike = token.type === "text" || token.type === "code_inline";

        if (isTextLike) {
            const content = token.content;
            if (content.length < 3) { /* skip */ }
            else if (_insideLink(tokens, i)) { /* skip */ }
            else {
                const linked = linkifyText(content, localePrefix);
                if (linked !== content) {
                    const wasCode = token.type === "code_inline";
                    token.type = "html_inline";
                    token.content = wasCode ? `<code>${linked}</code>` : linked;
                }
            }
        }

        if (token.children && token.children.length > 0) {
            walk(token.children, localePrefix);
        }
    }
}

function _insideLink(tokens: Token[], idx: number): boolean {
    for (let d = 1; d <= 3; d++) {
        if (idx >= d && tokens[idx - d]?.type === "link_open") return true;
    }
    return false;
}

export function autoApiLink(md: MarkdownIt): void {
    md.core.ruler.push("api_links", (state) => {
        const sourcePath = String(state.env?.path ?? "").replaceAll("\\", "/");
        const localePrefix = sourcePath.startsWith("en/") || sourcePath.includes("/en/") ? "/en" : "";
        walk(state.tokens, localePrefix);
    });
}

export default autoApiLink;
