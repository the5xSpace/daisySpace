import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitepress";

import { autoApiLink } from "./auto-api-link";
import { createThemeConfig } from "./navigation";

const manifestFile = fileURLToPath(new URL("../../i18n/manifest.json", import.meta.url));
const glossaryFile = fileURLToPath(new URL("../../i18n/glossary.json", import.meta.url));
const docsRoot = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));

function configuredPort(value: string | undefined) {
  if (!value) return undefined;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid configured port: ${value}`);
  }
  return port;
}

const sitePort = configuredPort(process.env.DAISY_SITE_PORT);
const playgroundPort = configuredPort(process.env.DAISY_PLAYGROUND_PORT);
const playgroundProxyEnabled = process.env.DAISY_PLAYGROUND_PROXY === "true";

if (playgroundProxyEnabled && !playgroundPort) {
  throw new Error("DAISY_PLAYGROUND_PORT is required when the playground proxy is enabled");
}

function hashText(value: string) {
  return createHash("sha256").update(value.replace(/\r\n?/g, "\n"), "utf8").digest("hex");
}

function markdownFiles(root: string, current = ""): string[] {
  if (!existsSync(path.join(root, current))) return [];
  return readdirSync(path.join(root, current), { withFileTypes: true })
    .flatMap((entry) => {
      const relative = path.join(current, entry.name);
      if (entry.isDirectory()) return markdownFiles(root, relative);
      return entry.isFile() && /\.mdx?$/i.test(entry.name)
        ? [relative.replaceAll("\\", "/")]
        : [];
    })
    .sort();
}

const sourceFiles = markdownFiles(path.join(docsRoot, "_source"));
let chineseReady = sourceFiles.length > 0;
const englishManifestReady = manifest.glossaryHash === hashText(readFileSync(glossaryFile, "utf8"));
const englishReadyFiles = new Set<string>();

for (const file of sourceFiles) {
  const source = readFileSync(path.join(docsRoot, "_source", file), "utf8");
  const chineseFile = path.join(docsRoot, "zh", file);
  const englishFile = path.join(docsRoot, "en", file);
  chineseReady &&= existsSync(chineseFile) && readFileSync(chineseFile, "utf8") === source;
  const record = manifest.files?.[file];
  if (englishManifestReady && Boolean(
    record &&
    record.sourceHash === hashText(source) &&
    record.locales?.en?.status === "translated" &&
    !(record.locales.en.blocks ?? []).some((block: any) => block.status === "pending") &&
    existsSync(englishFile) &&
    record.locales.en.targetHash === hashText(readFileSync(englishFile, "utf8")),
  )) {
    englishReadyFiles.add(file);
  }
}

const englishLocaleReady = englishReadyFiles.has("index.md");
const unavailableEnglishFiles = sourceFiles
  .filter((file) => !englishReadyFiles.has(file))
  .map((file) => `en/${file}`);

if (!chineseReady) {
  throw new Error("Chinese documentation is stale. Run `pnpm docs:prepare` before VitePress.");
}

export default defineConfig({
  title: "Daisy Space SDK",
  description: "航天可视化仿真 SDK - 卫星轨道传播、传感器波束覆盖、链路通信、天体系统",
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcExclude: [
    "_source/**",
    ...(englishLocaleReady ? unavailableEnglishFiles : ["en/**"]),
  ],
  rewrites: (id) => id.startsWith("zh/") ? id.slice(3) : id,
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "Daisy Space SDK",
      description: "航天可视化仿真 SDK - 卫星轨道传播、传感器波束覆盖、链路通信、天体系统",
      themeConfig: createThemeConfig("zh"),
    },
    ...(englishLocaleReady ? {
      en: {
        label: "English",
        lang: "en-US",
        link: "/en/",
        title: "Daisy Space SDK",
        description: "Space visualization and simulation SDK for orbits, sensors, links, and celestial systems",
        themeConfig: createThemeConfig("en", englishReadyFiles),
      },
    } : {}),
  },
  head: [
    ["meta", { name: "theme-color", content: "#8b5cf6" }],
    ["link", { rel: "icon", type: "image/png", href: "/daisy-space-favicon.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      rel: "stylesheet",
    }],
  ],
  vite: {
    resolve: {
      alias: { "@": fileURLToPath(new URL("../", import.meta.url)) },
    },
    server: sitePort || playgroundProxyEnabled ? {
      ...(sitePort ? { host: "127.0.0.1", port: sitePort, strictPort: true } : {}),
      ...(playgroundProxyEnabled ? { proxy: {
        "/playground": {
          target: `http://127.0.0.1:${playgroundPort}`,
          changeOrigin: true,
          ws: true,
        },
      } } : {}),
    } : undefined,
  },
  markdown: {
    config: (md) => md.use(autoApiLink),
  },
});
