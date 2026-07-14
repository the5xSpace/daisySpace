import path from "node:path";

import { checkDocuments, prepareDocuments } from "./workflow.mjs";

export async function ensurePreparedDocumentation(root) {
  const docsDir = path.join(root, "website", "docs");
  const i18nDir = path.join(root, "website", "i18n");
  const prepared = await prepareDocuments({ docsDir });
  try {
    const result = await checkDocuments({ docsDir, i18nDir, allowPending: true });
    if (result.pendingBlocks > 0) {
      console.warn(
        `[docs:i18n] ${result.pendingBlocks} English blocks are pending; ` +
        "only accepted English files will be published.",
      );
    }
    return result;
  } catch (error) {
    console.warn(
      "[docs:i18n] English documentation is behind the current source; " +
      "stale English files will be excluded until an external agent updates and accepts them.",
    );
    return { files: prepared.files, pendingBlocks: null, staleEnglish: true };
  }
}
