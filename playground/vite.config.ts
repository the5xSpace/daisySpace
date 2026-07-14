import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from "node:url";
import path from "node:path";
import fs from "node:fs";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const sdkDistPath = path.resolve(playgroundRoot, "node_modules/daisy-space-sdk/dist");
const sdkAssetBasePath = "/playground/daisy-sdk/";
const sdkAssetDirectories = new Set(
  fs.readdirSync(sdkDistPath, {withFileTypes: true})
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name),
);

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
      server.middlewares.use(sdkAssetBasePath, (req: any, res: any, next: any) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        try {
          const url = decodeURIComponent((req.url ?? "").split("?", 1)[0]).replace(/^\//, "");
          const [directory] = url.split("/");
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
    fs: {allow: [workspaceRoot]},
    ...(playgroundPort ? {hmr: {clientPort: sitePort ?? playgroundPort}} : {}),
  },
  worker: {format: "es"},
});
