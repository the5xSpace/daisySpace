/**
 * 扫描 website/docs/_source/api/ 目录，生成统一的 API 符号 → URL 索引 JSON。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_DIR = path.resolve(__dirname, "../_source/api");
const OUT_FILE = path.resolve(__dirname, "api-index.json");

const CATEGORY_TO_URL: Record<string, string> = {
    classes: "/api/classes",
    enums: "/api/enums",
    interfaces: "/api/interfaces",
    types: "/api/types",
    functions: "/api/functions",
    variables: "/api/variables",
};

type IndexEntry = { name: string; url: string };

function scanCategory(category: string): IndexEntry[] {
    const dir = path.join(API_DIR, category);
    if (!fs.existsSync(dir)) return [];
    const baseUrl = CATEGORY_TO_URL[category];
    if (!baseUrl) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md") && f !== "index.md")
        .map((f) => {
            const name = f.replace(/\.md$/, "");
            return { name, url: `${baseUrl}/${name}` };
        });
}

/** 短名黑名单：去掉 Daisy. 前缀后的别名若在此集合中，不生成。 */
const ALIAS_BLACKLIST = new Set([
    "Color",             // 通用颜色词
    "Material",          // 通用材质词
    "LabelStyle",        // 太短/通用
    "Rectangle",         // 通用几何词
    "Particle",          // 通用物理词
    "ShadowMode",        // 通用
    "HorizontalOrigin",   // 太通用
    "VerticalOrigin",     // 太通用
    "ArcType",           // 通用
    "Axis",              // 通用
    "Utils",             // 通用
]);

/** 主黑名单：即使完整名也不纳入索引 */
const MAIN_BLACKLIST = new Set([
    "index", "DataSource", "Resource", "Layer", "Widget",
    "OBB",
]);

function getShortAlias(name: string): string | undefined {
    return name.match(/^[A-Z][A-Za-z0-9_]*\.([A-Z][A-Za-z0-9_]*)$/)?.[1];
}

/**
 * 为一层命名空间类型生成短名别名。
 * 例如 Daisy.Cartesian3 → Cartesian3，PW.LinkTimeRange → LinkTimeRange。
 */
function expandNamespaceAliases(entries: IndexEntry[]): IndexEntry[] {
    const extra: IndexEntry[] = [];
    for (const e of entries) {
        const short = getShortAlias(e.name);
        if (!short) continue;
        if (ALIAS_BLACKLIST.has(short)) continue;
        extra.push({ name: short, url: e.url });
    }
    return extra;
}

function filterEntries(entries: IndexEntry[]): IndexEntry[] {
    const seen = new Set<string>();
    return entries.filter((e) => {
        if (MAIN_BLACKLIST.has(e.name)) return false;
        if (e.name.length < 3) return false;
        if (seen.has(e.name)) return false;
        seen.add(e.name);
        return true;
    });
}

function main() {
    const categories = ["classes", "enums", "interfaces", "types", "functions", "variables"];
    const allEntries: IndexEntry[] = [];

    for (const cat of categories) {
        allEntries.push(...scanCategory(cat));
    }

    // 给一层命名空间类型增加短名 alias
    const aliases = expandNamespaceAliases(allEntries);
    allEntries.push(...aliases);

    const filtered = filterEntries(allEntries);

    // 按名称长度降序排列，确保长名称优先匹配
    filtered.sort((a, b) => b.name.length - a.name.length);

    const index: Record<string, string> = {};
    for (const e of filtered) {
        index[e.name] = e.url;
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), "utf-8");
    console.log(`[api-index] 已生成 ${Object.keys(index).length} 条索引 → ${OUT_FILE}`);
}

main();
