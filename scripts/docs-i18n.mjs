import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  acceptDocuments,
  checkDocuments,
  diffDocuments,
  finishDocuments,
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

function gitNullSeparated(args) {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: "buffer",
    shell: false,
  });
  if (result.status !== 0) return null;
  return result.stdout
    .toString("utf8")
    .split("\0")
    .map((value) => value.trim())
    .filter(Boolean);
}

function manifestState() {
  try {
    return JSON.parse(readFileSync(path.join(i18nDir, "manifest.json"), "utf8"));
  } catch {
    return null;
  }
}

export function documentationFileFromRepositoryPath(file) {
  const normalized = file.replaceAll("\\", "/");
  for (const prefix of ["website/docs/_source/", "website/docs/en/"]) {
    if (normalized.startsWith(prefix) && /\.mdx?$/i.test(normalized)) {
      return normalized.slice(prefix.length);
    }
  }
  return null;
}

export function changedDocumentationFiles() {
  const manifest = manifestState();
  const base = manifest?.sourceCommit?.split("+")[0] ?? null;
  if (!base) return null;
  const pathspec = ["--", "website/docs/_source", "website/docs/en", "website/i18n/glossary.json"];
  const committed = gitNullSeparated([
    "diff",
    "--name-only",
    "--no-renames",
    "-z",
    base,
    "HEAD",
    ...pathspec,
  ]);
  const unstaged = gitNullSeparated([
    "diff",
    "--name-only",
    "--no-renames",
    "-z",
    ...pathspec,
  ]);
  const staged = gitNullSeparated([
    "diff",
    "--cached",
    "--name-only",
    "--no-renames",
    "-z",
    ...pathspec,
  ]);
  const untracked = gitNullSeparated([
    "ls-files",
    "--others",
    "--exclude-standard",
    "-z",
    ...pathspec,
  ]);
  if ([committed, unstaged, staged, untracked].some((files) => files === null)) return null;
  const changed = [...committed, ...unstaged, ...staged, ...untracked];
  if (changed.includes("website/i18n/glossary.json")) return null;
  return [...new Set(changed.map(documentationFileFromRepositoryPath).filter((file) => file !== null))]
    .filter(
      (file) =>
        existsSync(path.join(docsDir, "_source", ...file.split("/"))) ||
        Boolean(manifest.files?.[file]) ||
        existsSync(path.join(docsDir, "zh", ...file.split("/"))) ||
        existsSync(path.join(docsDir, "en", ...file.split("/"))),
    )
    .sort();
}

function hasFlag(name) {
  return process.argv.slice(3).includes(name);
}

function normalizeDocumentationFile(file) {
  return file?.replaceAll("\\", "/").replace(/^\.\//, "");
}

export function documentationFiles(args = process.argv.slice(3)) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--file") {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) throw new Error("--file requires a value");
      values.push(normalizeDocumentationFile(value));
      index += 1;
    } else if (argument.startsWith("--file=")) {
      values.push(normalizeDocumentationFile(argument.slice("--file=".length)));
    } else if (argument !== "--" && !argument.startsWith("--")) {
      values.push(normalizeDocumentationFile(argument));
    }
  }
  return [...new Set(values)];
}

export function incrementalDocumentationFiles(args = process.argv.slice(3), changed = undefined) {
  const explicit = documentationFiles(args);
  if (explicit.length > 0) return explicit;
  if (args.includes("--all")) return null;
  return changed ?? changedDocumentationFiles();
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

function compactValue(value, maxLength = 180) {
  const compact = String(value ?? "").replace(/[\r\n\t]+/g, " ").trim();
  return compact.length <= maxLength ? compact : `${compact.slice(0, maxLength - 3)}...`;
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
    const result = await prepareDocuments({
      docsDir,
      i18nDir,
      files: incrementalDocumentationFiles(),
    });
    printSummary("prepared", result);
    return result;
  }
  if (command === "diff") {
    const files = incrementalDocumentationFiles();
    const report = await diffDocuments({ docsDir, i18nDir, files });
    report.gitBase = report.sourceCommit;
    report.gitChanges = gitDocumentationChanges(report.sourceCommit);
    console.log(formatDiffReport(report, {
      details: hasFlag("--details"),
      file: files?.length === 1 ? files[0] : null,
    }));
    return report;
  }
  if (command === "accept") {
    const result = await acceptDocuments({
      docsDir,
      i18nDir,
      allowPending: hasFlag("--allow-pending"),
      sourceCommit: gitSourceRevision(),
      files: incrementalDocumentationFiles(),
    });
    printSummary("accepted", result);
    return result;
  }
  if (command === "check") {
    const result = await checkDocuments({
      docsDir,
      i18nDir,
      allowPending: hasFlag("--allow-pending"),
      files: documentationFiles(),
    });
    printSummary("check passed", result);
    return result;
  }
  if (command === "finish") {
    const result = await finishDocuments({
      docsDir,
      i18nDir,
      files: documentationFiles(),
      sourceCommit: gitSourceRevision(),
    });
    printSummary("finished", result);
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
    "Usage: node ./scripts/docs-i18n.mjs <init|prepare|diff|accept|check|finish> " +
      "[relative-doc-path]... [--file <relative-doc-path>]... [--all] [--allow-pending] [--details]",
  );
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  run().catch((error) => {
    console.error(`[docs:i18n] ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  });
}
