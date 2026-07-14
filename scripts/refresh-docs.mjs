import path from "node:path";
import { fileURLToPath } from "node:url";

import { firstPositionalArg, generateApiDocs } from "./generate-api-docs.mjs";
import { ensurePreparedDocumentation } from "./docs-i18n/integration.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function refreshDocumentation(sdkPath) {
  await generateApiDocs(sdkPath);
  await ensurePreparedDocumentation(root);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  refreshDocumentation(firstPositionalArg(process.argv.slice(2))).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
