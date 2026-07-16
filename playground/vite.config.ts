import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from "node:url";
import path from "node:path";
import fs from "node:fs";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const adjacentSdkRoot = path.resolve(playgroundRoot, "../../DaisySim");
const installedSdkRoot = path.resolve(playgroundRoot, "node_modules/daisy-space-sdk");
const configuredSdkRoot = process.env.DAISY_SDK_ROOT
  ? path.resolve(process.env.DAISY_SDK_ROOT)
  : undefined;

function hasSdkDist(packageRoot: string) {
  return fs.existsSync(path.join(packageRoot, "dist/index.js"));
}

const sdkPackageRoot = configuredSdkRoot
  ?? (hasSdkDist(adjacentSdkRoot) ? adjacentSdkRoot : installedSdkRoot);
const sdkDistPath = path.resolve(sdkPackageRoot, "dist");
const sdkEntryPath = path.resolve(sdkDistPath, "index.js");
const sdkAssetBasePath = "/playground/daisy-sdk/";

function getSdkAssetDirectories() {
  if (!fs.existsSync(sdkDistPath)) return new Set<string>();
  return new Set(
    fs.readdirSync(sdkDistPath, {withFileTypes: true})
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
  );
}

function configuredPort(value: string | undefined) {
  if (!value) return undefined;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid configured port: ${value}`);
  }
  return port;
}

const playgroundPort = configuredPort(process.env.DAISY_PLAYGROUND_PORT);
const sitePort = configuredPort(process.env.DAISY_SITE_PORT);

function sdkAssets() {
  return {
    name: "daisy-sdk-assets",
    configureServer(server: any) {
      const sdkRoot = path.resolve(sdkDistPath);
      let reloadTimer: ReturnType<typeof setTimeout> | undefined;
      const queueReload = () => {
        if (reloadTimer) clearTimeout(reloadTimer);
        reloadTimer = setTimeout(() => {
          server.moduleGraph.invalidateAll();
          server.ws.send({type: "full-reload", path: "*"});
        }, 250);
      };
      const isSdkDistFile = (file: string) => {
        const resolved = path.resolve(file);
        return resolved === sdkRoot || resolved.startsWith(`${sdkRoot}${path.sep}`);
      };
      server.watcher.add(path.join(sdkDistPath, "**/*"));
      server.watcher.on("change", (file: string) => {
        if (isSdkDistFile(file)) queueReload();
      });
      server.watcher.on("add", (file: string) => {
        if (isSdkDistFile(file)) queueReload();
      });
      server.watcher.on("unlink", (file: string) => {
        if (isSdkDistFile(file)) queueReload();
      });

      server.middlewares.use(sdkAssetBasePath, (req: any, res: any, next: any) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        try {
          const url = decodeURIComponent((req.url ?? "").split("?", 1)[0]).replace(/^\//, "");
          const [directory] = url.split("/");
          const sdkAssetDirectories = getSdkAssetDirectories();
          if (!sdkAssetDirectories.has(directory)) return next();
          const filePath = path.resolve(sdkDistPath, url);
          const sdkRoot = `${path.resolve(sdkDistPath)}${path.sep}`;
          if (!filePath.startsWith(sdkRoot)) return next();
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();
          const mimeMap: Record<string, string> = {
            ".js": "application/javascript",
            ".json": "application/json",
            ".wasm": "application/wasm",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".webp": "image/webp",
            ".svg": "image/svg+xml",
            ".css": "text/css",
            ".gltf": "model/gltf+json",
            ".glb": "model/gltf-binary",
            ".xml": "application/xml",
            ".txt": "text/plain; charset=utf-8",
            ".bin": "application/octet-stream",
          };
          res.setHeader("Content-Type", mimeMap[path.extname(filePath).toLowerCase()] ?? "application/octet-stream");
          res.setHeader("Cache-Control", "no-store");
          res.setHeader("Access-Control-Allow-Origin", "*");
          if (req.method === "HEAD") return res.end();
          fs.createReadStream(filePath).pipe(res);
        } catch {
          return next();
        }
      });
    },
    closeBundle() {
      const outputRoot = path.resolve(playgroundRoot, "dist/daisy-sdk");
      fs.rmSync(outputRoot, {recursive: true, force: true});
      const sdkAssetDirectories = getSdkAssetDirectories();
      for (const directory of sdkAssetDirectories) {
        fs.cpSync(
          path.join(sdkDistPath, directory),
          path.join(outputRoot, directory),
          {recursive: true, force: true},
        );
      }
    },
  };
}

export default defineConfig({
  root: playgroundRoot,
  base: "/playground/",
  publicDir: path.resolve(workspaceRoot, "public"),
  resolve: {
    alias: {
      "daisy-space-sdk": sdkEntryPath,
    },
  },
  optimizeDeps: {
    exclude: ["daisy-space-sdk"],
  },
  plugins: [
    sdkAssets(),
    svelte({
      // Demo modules intentionally run their setup script once when mounted.
      // Svelte 5 otherwise reports every captured setup value as a reactive-state warning.
      onwarn(warning: any, handler: (warning: any) => void) {
        const filename = typeof warning.filename === "string"
          ? warning.filename.replaceAll("\\", "/")
          : "";
        if (
          warning.code === "state_referenced_locally" &&
          filename.includes("src/demos/")
        ) {
          return;
        }
        handler(warning);
      },
    }),
    tailwindcss(),
  ],
  server: {
    ...(playgroundPort ? {host: "127.0.0.1", port: playgroundPort, strictPort: true} : {}),
    fs: {allow: [workspaceRoot, sdkPackageRoot]},
    ...(playgroundPort ? {hmr: {clientPort: sitePort ?? playgroundPort}} : {}),
  },
  worker: {format: "es"},
});
