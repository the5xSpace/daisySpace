import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from "node:url";
import path from "node:path";
import fs from "node:fs";

const playgroundRoot = fileURLToPath(new URL(".", import.meta.url));
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const sdkCesiumPath = path.resolve(playgroundRoot, "node_modules/daisy-space-sdk/dist/cesium");

function sdkCesiumAssets() {
  return {
    name: "daisy-sdk-cesium-assets",
    configureServer(server: any) {
      server.middlewares.use("/playground/cesium/", (req: any, res: any, next: any) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        const url = decodeURIComponent((req.url ?? "").split("?", 1)[0]).replace(/^\//, "");
        const filePath = path.resolve(sdkCesiumPath, url);
        const sdkCesiumRoot = `${path.resolve(sdkCesiumPath)}${path.sep}`;
        if (!filePath.startsWith(sdkCesiumRoot)) return next();
        try {
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();
          const mimeMap: Record<string, string> = {
            ".js": "application/javascript",
            ".wasm": "application/wasm",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".svg": "image/svg+xml",
            ".css": "text/css",
          };
          res.setHeader("Content-Type", mimeMap[path.extname(filePath).toLowerCase()] ?? "application/octet-stream");
          res.setHeader("Access-Control-Allow-Origin", "*");
          fs.createReadStream(filePath).pipe(res);
        } catch {
          return next();
        }
      });
    },
    closeBundle() {
      const outputPath = path.resolve(playgroundRoot, "dist/cesium");
      fs.cpSync(sdkCesiumPath, outputPath, {recursive: true, force: true});
    },
  };
}

export default defineConfig({
  root: playgroundRoot,
  base: "/playground/",
  publicDir: path.resolve(workspaceRoot, "public"),
  plugins: [
    sdkCesiumAssets(),
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
    port: 5179,
    strictPort: true,
    fs: {allow: [workspaceRoot]},
    hmr: {clientPort: 5179},
  },
  worker: {format: "es"},
});
