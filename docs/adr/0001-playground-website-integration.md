# ADR 0001: Playground and website integration

## Status

Accepted on 2026-07-14.

## Context

The website and Playground are separate Vite applications in one workspace. The
published site should use one origin and one deployable artifact, while local
development needs hot reload for both applications. Copying a stale Playground
build during development makes integration slow and can hide asset-path errors.

## Decision

Production uses static composition. `build:site` builds the Playground with the
`/playground/` base path, copies its complete `dist` directory into the VitePress
public directory, and then builds the website.

Development uses two servers. `dev:site` generates API documentation, starts the
Playground on port 5174, starts VitePress on port 5173, and enables a VitePress
proxy from `/playground/` to the Playground server. Playground HMR connects
directly to port 5174.

## Alternatives

- Rebuild and copy Playground files before every website start: simple, but no
  Playground HMR and easy to become stale.
- Merge Playground into VitePress components: one server, but tightly couples
  the applications and makes the full-screen sandbox harder to maintain.
- Deploy Playground separately: independent releases, but adds cross-origin and
  version-coordination overhead that is unnecessary for the current project.

## Consequences

Production remains a single static artifact without runtime proxy dependencies.
Local integrated development requires both ports 5173 and 5174 to be available.
If either dev server exits, `dev:site` stops the other process and reports the
failure.
