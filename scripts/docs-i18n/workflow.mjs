import { access, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { hashText, localizeMarkdownLinks, validateDocumentStructure } from "./markdown.mjs";
import { createLocaleRecord, sourceWorkBlocks } from "./state.mjs";

const MANIFEST_VERSION = 1;
const LOCALES = ["zh", "en"];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function listMarkdownFiles(root, current = "") {
  const directory = path.join(root, current);
  if (!(await exists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relative = path.join(current, entry.name);
    if (entry.isDirectory()) files.push(...await listMarkdownFiles(root, relative));
    else if (entry.isFile() && /\.mdx?$/i.test(entry.name)) files.push(relative.replaceAll("\\", "/"));
  }
  return files;
}

async function readJson(file, fallback) {
  if (!(await exists(file))) return fallback;
  return JSON.parse(await readFile(file, "utf8"));
}

async function writeAtomic(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp-${process.pid}`;
  await writeFile(temporary, value, "utf8");
  await rename(temporary, file);
}

async function writeIfChanged(file, value) {
  if (await exists(file)) {
    if (await readFile(file, "utf8") === value) return false;
  }
  await writeAtomic(file, value);
  return true;
}

async function loadState(i18nDir) {
  const manifestPath = path.join(i18nDir, "manifest.json");
  const glossaryPath = path.join(i18nDir, "glossary.json");
  const glossaryText = await readFile(glossaryPath, "utf8");
  const manifest = await readJson(manifestPath, {
    version: MANIFEST_VERSION,
    sourceLocale: "zh-CN",
    glossaryHash: hashText(glossaryText),
    files: {},
  });
  if (manifest.version !== MANIFEST_VERSION) {
    throw new Error(`unsupported documentation manifest version ${manifest.version}`);
  }
  return { manifest, manifestPath, glossaryHash: hashText(glossaryText) };
}

function sourcePath(docsDir, file) {
  return path.join(docsDir, "_source", ...file.split("/"));
}

function targetPath(docsDir, locale, file) {
  return path.join(docsDir, locale, ...file.split("/"));
}

export async function prepareDocuments({ docsDir, i18nDir = null, files: requestedFiles = null } = {}) {
  const sourceDir = path.join(docsDir, "_source");
  if (!(await exists(sourceDir))) throw new Error(`documentation source directory not found: ${sourceDir}`);
  const scoped = requestedFiles !== null && requestedFiles !== undefined;
  const allFiles = scoped ? null : await listMarkdownFiles(sourceDir);
  const files = scoped ? requestedFiles : allFiles;
  const existingFiles = [];
  const deletedFiles = [];
  const unknownFiles = [];
  const manifestFiles = scoped && i18nDir
    ? (await loadState(i18nDir)).manifest.files
    : {};
  for (const file of files) {
    if (await exists(sourcePath(docsDir, file))) existingFiles.push(file);
    else {
      const hasTarget = await Promise.all(
        LOCALES.map((locale) => exists(targetPath(docsDir, locale, file))),
      );
      if (manifestFiles[file] || hasTarget.some(Boolean)) deletedFiles.push(file);
      else unknownFiles.push(file);
    }
  }
  if (unknownFiles.length > 0) {
    throw new Error(`documentation source file not found: ${unknownFiles.join(", ")}`);
  }
  const sourceSet = allFiles ? new Set(allFiles) : null;
  let updatedZh = 0;
  let createdEn = 0;
  let removedTargets = 0;

  for (const file of existingFiles) {
    const sourceMarkdown = await readFile(sourcePath(docsDir, file), "utf8");
    if (await writeIfChanged(targetPath(docsDir, "zh", file), sourceMarkdown)) updatedZh += 1;
    const englishFile = targetPath(docsDir, "en", file);
    if (!(await exists(englishFile))) {
      await writeAtomic(englishFile, localizeMarkdownLinks(sourceMarkdown, "en"));
      createdEn += 1;
    }
  }

  if (scoped) {
    for (const file of deletedFiles) {
      for (const locale of LOCALES) {
        const output = targetPath(docsDir, locale, file);
        if (await exists(output)) {
          await rm(output, { force: true });
          removedTargets += 1;
        }
      }
    }
  } else if (sourceSet) {
    for (const locale of LOCALES) {
      for (const file of await listMarkdownFiles(path.join(docsDir, locale))) {
        if (!sourceSet.has(file)) {
          await rm(targetPath(docsDir, locale, file), { force: true });
          removedTargets += 1;
        }
      }
    }
  }
  return { files: files.length, updatedZh, createdEn, removedTargets };
}

export async function acceptDocuments({
  docsDir,
  i18nDir,
  allowPending = false,
  sourceCommit = null,
  files: requestedFiles = null,
} = {}) {
  await prepareDocuments({ docsDir, i18nDir, files: requestedFiles });
  const state = await loadState(i18nDir);
  const scoped = requestedFiles !== null && requestedFiles !== undefined;
  const allFiles = scoped ? null : await listMarkdownFiles(path.join(docsDir, "_source"));
  const files = scoped ? requestedFiles : allFiles;

  // A scoped accept updates only the requested manifest entries. This keeps a
  // slow or incomplete document from blocking already translated batches.
  const nextManifest = scoped
    ? {
        ...state.manifest,
        sourceLocale: "zh-CN",
        glossaryHash: state.glossaryHash,
        sourceCommit: sourceCommit ?? state.manifest.sourceCommit ?? null,
        files: { ...state.manifest.files },
      }
    : {
        version: MANIFEST_VERSION,
        sourceLocale: "zh-CN",
        glossaryHash: state.glossaryHash,
        sourceCommit,
        files: {},
      };
  let pendingBlocks = 0;

  for (const file of files) {
    if (!(await exists(sourcePath(docsDir, file)))) {
      delete nextManifest.files[file];
      continue;
    }
    const sourceMarkdown = await readFile(sourcePath(docsDir, file), "utf8");
    const locales = {};
    for (const locale of LOCALES) {
      const targetMarkdown = await readFile(targetPath(docsDir, locale, file), "utf8");
      locales[locale] = createLocaleRecord({ file, locale, sourceMarkdown, targetMarkdown });
    }
    pendingBlocks += locales.en.blocks.filter((block) => block.status === "pending").length;
    nextManifest.files[file] = { sourceHash: hashText(sourceMarkdown), locales };
  }

  if (!allowPending && pendingBlocks > 0) {
    throw new Error(`${pendingBlocks} pending translations remain; Codex must finish docs/en before acceptance`);
  }
  await writeAtomic(state.manifestPath, `${JSON.stringify(nextManifest)}\n`);
  return { files: files.length, pendingBlocks, scoped, manifest: nextManifest };
}

export async function checkDocuments({
  docsDir,
  i18nDir,
  allowPending = false,
  allowDeleted = false,
  files: requestedFiles = null,
} = {}) {
  const state = await loadState(i18nDir);
  if (state.manifest.glossaryHash !== state.glossaryHash) {
    throw new Error("glossary changed; rerun docs:accept after Codex reviews terminology");
  }
  const scoped = requestedFiles !== null && requestedFiles !== undefined;
  const sourceFiles = scoped
    ? requestedFiles
    : await listMarkdownFiles(path.join(docsDir, "_source"));
  const sourceSet = new Set(sourceFiles);
  const errors = [];
  let pendingBlocks = 0;

  for (const file of sourceFiles) {
    if (!(await exists(sourcePath(docsDir, file)))) {
      if (!allowDeleted) {
        errors.push(`documentation source file not found: ${file}`);
        continue;
      }
      if (state.manifest.files[file]) errors.push(`manifest contains deleted source ${file}`);
      for (const locale of LOCALES) {
        if (await exists(targetPath(docsDir, locale, file))) {
          errors.push(`unexpected target ${locale}/${file}`);
        }
      }
      continue;
    }
    const sourceMarkdown = await readFile(sourcePath(docsDir, file), "utf8");
    const entry = state.manifest.files[file];
    if (!entry) {
      errors.push(`manifest is missing ${file}`);
      continue;
    }
    if (entry.sourceHash !== hashText(sourceMarkdown)) errors.push(`source hash mismatch for ${file}`);
    for (const locale of LOCALES) {
      const output = targetPath(docsDir, locale, file);
      const record = entry.locales?.[locale];
      if (!record || !(await exists(output))) {
        errors.push(`missing ${locale}/${file}`);
        continue;
      }
      const targetMarkdown = await readFile(output, "utf8");
      if (hashText(targetMarkdown) !== record.targetHash) {
        errors.push(`target hash mismatch for ${locale}/${file}`);
        continue;
      }
      try {
        createLocaleRecord({ file, locale, sourceMarkdown, targetMarkdown });
      } catch (error) {
        errors.push(error.message);
      }
      pendingBlocks += (record.blocks ?? []).filter((block) => block.status === "pending").length;
    }
  }

  if (!scoped) {
    for (const file of Object.keys(state.manifest.files)) {
      if (!sourceSet.has(file)) errors.push(`manifest contains deleted source ${file}`);
    }
    for (const locale of LOCALES) {
      for (const file of await listMarkdownFiles(path.join(docsDir, locale))) {
        if (!sourceSet.has(file)) errors.push(`unexpected target ${locale}/${file}`);
      }
    }
  }
  if (!allowPending && pendingBlocks > 0) errors.push(`${pendingBlocks} pending translations remain`);
  if (errors.length > 0) throw new Error(errors.join("\n"));
  return { files: sourceFiles.length, pendingBlocks, scoped };
}

export async function diffDocuments({ docsDir, i18nDir, files: requestedFiles = null } = {}) {
  const state = await loadState(i18nDir);
  const scoped = requestedFiles !== null && requestedFiles !== undefined;
  const current = scoped
    ? requestedFiles
    : await listMarkdownFiles(path.join(docsDir, "_source"));
  const currentSet = new Set(current);
  const files = [];

  for (const file of current) {
    if (!(await exists(sourcePath(docsDir, file)))) {
      const hasTarget = await Promise.all(
        LOCALES.map((locale) => exists(targetPath(docsDir, locale, file))),
      );
      if (state.manifest.files[file] || hasTarget.some(Boolean)) {
        files.push({
          file,
          status: "deleted",
          sourceChanged: true,
          targetChanged: true,
          validationError: null,
          pendingBlocks: 0,
          pendingCharacters: 0,
          blocks: [],
        });
      } else {
        throw new Error(`documentation source file not found: ${file}`);
      }
      continue;
    }
    const sourceMarkdown = await readFile(sourcePath(docsDir, file), "utf8");
    const previous = state.manifest.files[file];
    const englishFile = targetPath(docsDir, "en", file);
    const targetMarkdown = await exists(englishFile) ? await readFile(englishFile, "utf8") : null;
    const sourceChanged = !previous || previous.sourceHash !== hashText(sourceMarkdown);
    const targetChanged = !previous || targetMarkdown == null ||
      previous.locales?.en?.targetHash !== hashText(targetMarkdown);
    const hasPendingTranslation = previous?.locales?.en?.blocks?.some(
      (block) => block.status === "pending",
    ) ?? false;
    if (!sourceChanged && !targetChanged && !hasPendingTranslation) continue;
    let blocks = sourceWorkBlocks(sourceMarkdown, file, previous?.locales?.en);
    let validationError = null;
    let currentRecord = null;

    if (targetMarkdown != null) {
      try {
        currentRecord = createLocaleRecord({ file, locale: "en", sourceMarkdown, targetMarkdown });
      } catch (error) {
        validationError = error.message;
      }
    }

    if (currentRecord) {
      const previousById = new Map((previous?.locales?.en?.blocks ?? []).map((block) => [block.id, block]));
      const previousByIndex = new Map((previous?.locales?.en?.blocks ?? []).map((block) => [block.index, block]));
      const currentByIndex = new Map(currentRecord.blocks.map((block) => [block.index, block]));
      blocks = blocks.filter((task) => {
        const currentBlock = currentByIndex.get(task.index);
        if (!currentBlock || currentBlock.status === "pending") return true;
        const oldBlock = previousById.get(task.id) ?? previousByIndex.get(task.index);
        return oldBlock ? currentBlock.targetHash === oldBlock.targetHash : false;
      });
    }

    if (sourceChanged || targetChanged || blocks.length > 0 || validationError) {
      let status = "needs-agent";
      if (!validationError && blocks.length === 0) status = "ready-to-accept";
      else if (!sourceChanged && targetChanged) status = "in-progress";
      else if (!sourceChanged && !targetChanged) status = "pending";
      files.push({
        file,
        status,
        sourceChanged,
        targetChanged,
        validationError,
        pendingBlocks: blocks.length,
        pendingCharacters: blocks.reduce((total, block) => total + block.preview.length, 0),
        blocks,
      });
    }
  }

  if (!scoped) {
    for (const file of Object.keys(state.manifest.files)) {
      if (!currentSet.has(file)) files.push({
        file,
        status: "deleted",
        sourceChanged: true,
        targetChanged: true,
        validationError: null,
        pendingBlocks: 0,
        pendingCharacters: 0,
        blocks: [],
      });
    }
  }
  return {
    sourceCommit: state.manifest.sourceCommit ?? null,
    scoped,
    modifiedFiles: files.length,
    pendingBlocks: files.reduce((total, file) => total + file.pendingBlocks, 0),
    pendingCharacters: files.reduce((total, file) => total + file.pendingCharacters, 0),
    files,
  };
}

export async function finishDocuments({
  docsDir,
  i18nDir,
  files,
  sourceCommit = null,
} = {}) {
  if (!files?.length) {
    throw new Error("docs:finish requires at least one document path");
  }

  await prepareDocuments({ docsDir, i18nDir, files });
  const report = await diffDocuments({ docsDir, i18nDir, files });
  const incomplete = report.files.filter((file) => file.pendingBlocks > 0 || file.validationError);
  if (incomplete.length > 0) {
    const details = incomplete.map((file) => {
      const pending = `pending=${file.pendingBlocks} characters=${file.pendingCharacters}`;
      return file.validationError
        ? `${file.file}: ${pending} validation=${file.validationError}`
        : `${file.file}: ${pending}`;
    });
    throw new Error(["documentation translation is incomplete", ...details].join("\n"));
  }

  const accepted = await acceptDocuments({
    docsDir,
    i18nDir,
    files,
    sourceCommit,
  });
  const checked = await checkDocuments({ docsDir, i18nDir, files, allowDeleted: true });
  return { files: files.length, pendingBlocks: 0, report, accepted, checked };
}
