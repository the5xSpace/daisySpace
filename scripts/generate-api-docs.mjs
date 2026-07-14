import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptFile = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(scriptFile), "..");
const apiOutDir = path.join(root, "website", "docs", "api");
const apiIndexFile = path.join(root, "website", "docs", ".vitepress", "api-index.json");

export function firstPositionalArg(args) {
  return args.find((arg) => arg !== "--");
}

async function assertFile(filePath, label) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`${label} not found: ${filePath}`);
  }
}

async function resolveSdkRoot(sdkPath) {
  if (!sdkPath?.trim()) {
    throw new Error("SDK path is required. Usage: pnpm docs:api -- <relative-sdk-path>");
  }

  const sdkRoot = path.resolve(root, sdkPath);
  await assertFile(path.join(sdkRoot, "package.json"), "SDK package.json");
  await assertFile(path.join(sdkRoot, "typedoc.json"), "SDK typedoc.json");
  await assertFile(path.join(sdkRoot, "src", "sdk"), "SDK source directory");
  await assertFile(
    path.join(sdkRoot, "scripts", "run-build-step.mjs"),
    "SDK documentation build script",
  );

  const packageJson = JSON.parse(await readFile(path.join(sdkRoot, "package.json"), "utf8"));
  if (packageJson.name !== "daisy-space-sdk") {
    throw new Error(`Expected package "daisy-space-sdk", found "${packageJson.name ?? "unknown"}" at ${sdkRoot}`);
  }

  return sdkRoot;
}

function runSdkDocs(sdkRoot) {
  const buildScript = path.join(sdkRoot, "scripts", "run-build-step.mjs");
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [buildScript, "docs"], {
      cwd: sdkRoot,
      stdio: "inherit",
      shell: false,
      env: {
        ...process.env,
        DAISY_DOCS_OUT_DIR: apiOutDir,
        DAISY_DOCS_API_INDEX_FILE: apiIndexFile,
      },
    });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`SDK documentation build exited with signal ${signal}`));
      } else if (code !== 0) {
        reject(new Error(`SDK documentation build exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

export async function generateApiDocs(sdkPath) {
  const sdkRoot = await resolveSdkRoot(sdkPath);
  console.log(`[docs:api] SDK: ${sdkRoot}`);
  console.log(`[docs:api] output: ${apiOutDir}`);
  await runSdkDocs(sdkRoot);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === scriptFile;
if (isMain) {
  generateApiDocs(firstPositionalArg(process.argv.slice(2))).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
