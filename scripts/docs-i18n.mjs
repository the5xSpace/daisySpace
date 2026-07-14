import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  acceptDocuments,
  checkDocuments,
  diffDocuments,
  prepareDocuments,
} from "./docs-i18n/workflow.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = path.join(root, "website", "docs");
const i18nDir = path.join(root, "website", "i18n");

function gitSourceRevision() {
  const result = spawnSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });
  if (result.status !== 0) return null;
  const revision = result.stdout.trim();
  const dirty = spawnSync("git", ["status", "--porcelain=v1", "--", "website/docs/_source"], {
    cwd: root,
    encoding: "utf8",
    shell: false,
  }).stdout.trim() !== "";
  return dirty ? `${revision}+dirty` : revision;
}

function gitDocumentationChanges(sourceCommit) {
  const base = sourceCommit?.split("+")[0];
  const result = spawnSync("git", base
    ? ["diff", "--name-status", "--find-renames", base, "--", "website/docs/_source"]
    : ["status", "--porcelain=v1", "--", "website/docs/_source"], {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });
  const status = spawnSync("git", ["status", "--porcelain=v1", "--", "website/docs/_source"], {
    cwd: root,
    encoding: "utf8",
    shell: false,
  });
  return [...new Set([result.stdout, status.stdout]
    .flatMap((value) => value.split(/\r?\n/))
    .map((value) => value.trim())
    .filter(Boolean))];
}

function hasFlag(name) {
  return process.argv.slice(3).includes(name);
}

function optionValue(name, args = process.argv.slice(3)) {
  const assignment = args.find((argument) => argument.startsWith(`${name}=`));
  if (assignment) return assignment.slice(name.length + 1);
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value`);
  return value;
}

function normalizeDocumentationFile(file) {
  return file?.replaceAll("\\", "/").replace(/^\.\//, "");
}

function selectDiffReport(report, file) {
  if (!file) return report;
  const normalized = normalizeDocumentationFile(file);
  const files = report.files.filter((entry) => entry.file === normalized);
  return {
    ...report,
    modifiedFiles: files.length,
    pendingBlocks: files.reduce((total, entry) => total + entry.pendingBlocks, 0),
    pendingCharacters: files.reduce((total, entry) => total + entry.pendingCharacters, 0),
    files,
  };
}

function compactValue(value) {
  return String(value ?? "").replace(/[\r\n\t]+/g, " ").trim();
}

export function formatDiffReport(report, { details = false, file = null } = {}) {
  const selected = selectDiffReport(report, file);
  if (details || file) return JSON.stringify(selected, null, 2);

  const lines = [
    `[docs:i18n] diff: files=${selected.modifiedFiles} pending=${selected.pendingBlocks} ` +
      `characters=${selected.pendingCharacters}`,
    `sourceCommit\t${compactValue(selected.sourceCommit ?? "none")}`,
    `gitChanges\t${selected.gitChanges?.length ?? 0}`,
    "status\tpendingBlocks\tpendingCharacters\tfile\tvalidationError",
  ];
  for (const entry of selected.files) {
    lines.push([
      entry.status,
      entry.pendingBlocks,
      entry.pendingCharacters,
      entry.file,
      compactValue(entry.validationError),
    ].join("\t"));
  }
  return lines.join("\n");
}

function printSummary(label, result) {
  console.log(`[docs:i18n] ${label}: files=${result.files ?? result.modifiedFiles ?? 0} ` +
    `pending=${result.pendingBlocks ?? 0}`);
}

export async function run(command = process.argv[2]) {
  if (command === "prepare") {
    const result = await prepareDocuments({ docsDir });
    printSummary("prepared", result);
    return result;
  }
  if (command === "diff") {
    const report = await diffDocuments({ docsDir, i18nDir });
    report.gitBase = report.sourceCommit;
    report.gitChanges = gitDocumentationChanges(report.sourceCommit);
    console.log(formatDiffReport(report, {
      details: hasFlag("--details"),
      file: optionValue("--file"),
    }));
    return report;
  }
  if (command === "accept") {
    const result = await acceptDocuments({
      docsDir,
      i18nDir,
      allowPending: hasFlag("--allow-pending"),
      sourceCommit: gitSourceRevision(),
    });
    printSummary("accepted", result);
    return result;
  }
  if (command === "check") {
    const result = await checkDocuments({
      docsDir,
      i18nDir,
      allowPending: hasFlag("--allow-pending"),
    });
    printSummary("check passed", result);
    return result;
  }
  if (command === "init") {
    await prepareDocuments({ docsDir });
    const result = await acceptDocuments({
      docsDir,
      i18nDir,
      allowPending: true,
      sourceCommit: gitSourceRevision(),
    });
    printSummary("initialized", result);
    return result;
  }
  throw new Error(
    "Usage: node ./scripts/docs-i18n.mjs <init|prepare|diff|accept|check> " +
      "[--allow-pending] [--file <relative-doc-path>] [--details]",
  );
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  run().catch((error) => {
    console.error(`[docs:i18n] ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  });
}
