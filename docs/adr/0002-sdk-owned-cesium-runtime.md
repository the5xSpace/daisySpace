# ADR 0002: SDK-owned Cesium runtime

## Status

Accepted on 2026-07-14.

## Context

Daisy uses Cesium as an implementation detail. Requiring applications to add
`vite-plugin-cesium` externalized the SDK's Cesium imports to `window.Cesium`.
This made Daisy fail when the host did not create that global and made Daisy
silently share mutable Cesium state when the host loaded a different version.

Cesium also loads workers, data, widget styles, and third-party files by URL.
Those files cannot be emitted automatically by every possible application
bundler from a JavaScript import alone.

## Decision

The Daisy SDK bundles its pinned Cesium JavaScript into the ESM and UMD builds.
SDK code must not read, assign, or patch `window.Cesium`, `globalThis.Cesium`, or
the host's `CESIUM_BASE_URL`. A host application may load its own Cesium version;
the two runtimes remain separate.

The SDK distribution includes its matching Cesium `Workers`, `Assets`,
`Widgets`, and `ThirdParty` directories under `dist/cesium`. Daisy configures
only its internal `buildModuleUrl` instance and injects its own widget stylesheet.
`Engine.setEngineBaseUrl()` remains the explicit override for custom hosting.

The open-source Playground publishes these files from the installed SDK package
at `/playground/cesium/` in development and copies them into its production
artifact. Applications must not install or configure `vite-plugin-cesium` for
Daisy.

## Consequences

- Importing Daisy no longer depends on a host global named `Cesium`.
- A host-owned Cesium runtime can coexist without prototype or base-URL changes.
- Daisy's JavaScript bundle is larger because it owns its rendering runtime.
- Deployments must make the SDK's `dist/cesium` directory reachable, or configure
  `Engine.setEngineBaseUrl()` to a compatible hosted copy.
- A future Daisy-owned bundler adapter or CDN default may automate static asset
  publication for external applications; it must preserve the same isolation
  boundary.
