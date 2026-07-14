# Open Source Site Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the public Playground and VitePress website into `daisySpace` while keeping `DaisySim` focused on the closed SDK source and release pipeline.

**Architecture:** `daisySpace` owns the website, Svelte Playground, public demo data, and static deployment assembly. The Playground consumes a released `daisy-space-sdk` package or local tarball; it never imports `DaisySim/src`. API Markdown is treated as a versioned SDK release artifact rather than generated from the closed source checkout.

**Tech Stack:** pnpm workspace, Vite 5, Svelte 5, VitePress, TypeScript, Cesium runtime assets, Daisy SDK package.

---

### Task 1: Create the public repository skeleton

**Files:**
- Create: `daisySpace/package.json`
- Create: `daisySpace/pnpm-workspace.yaml`
- Create: `daisySpace/README.md`
- Create: `daisySpace/.gitignore`

Copy the public website and Playground source trees, plus only the public assets required by the Playground. Do not copy generated `website/docs/api` or `website/docs/public/playground` output.

### Task 2: Make the Playground package-driven

**Files:**
- Create: `daisySpace/playground/package.json`
- Create: `daisySpace/playground/vite.config.ts`
- Modify: `daisySpace/playground/main.ts`
- Modify: `daisySpace/playground/src/infra/*`
- Modify: `daisySpace/playground/src/shell/error/*`
- Modify: `daisySpace/playground/src/demos/features/china*.ts`

Replace all imports from `DaisySim/src/sdk` with the public SDK package. Keep public SDK usage on the package root unless a documented subpath export is added by the SDK release.

### Task 3: Add website and Playground assembly

**Files:**
- Create: `daisySpace/website/package.json`
- Modify: `daisySpace/website/docs/.vitepress/config.ts`
- Modify: `daisySpace/website/docs/.vitepress/theme/index.ts`
- Create: `daisySpace/scripts/build-site.mjs`

Build the Playground first, copy its output to `website/docs/public/playground`, then build VitePress. Replace old repository links and source-path references with public repository links or SDK API links.

### Task 4: Verify the split

Run:

```text
pnpm --dir playground typecheck
pnpm --dir playground build
pnpm --dir website build
```

Also search the public repository for `DaisySim/src`, `src/sdk`, and old GitHub URLs. Remaining matches must be intentional documentation links or generated release metadata.
