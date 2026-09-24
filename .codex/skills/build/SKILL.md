---
name: build
description: Implement React web pages and UI features from approved briefs or mockups while preserving the modular-monolith architecture, shadcn design system, i18n, and API boundaries. Use when asked to build, scaffold, or modify frontend UI.
---

# UI Build

Read `AGENTS.md`, the architecture, design system, and the relevant approved page brief before implementation. If a requested product decision is missing, use `$design` or ask for it.

- Keep route files thin and place behavior in the relevant feature module.
- Keep UI free of HTTP, generated SDK calls, cache configuration, storage, and analytics side effects.
- Use feature query-options builders, facade hooks, tenant-aware keys, and explicit mutation invalidation.
- Use i18n for all copy; keep values semantic until locale-aware formatting at render time.
- Never calculate financial values with JavaScript `number`.
- Use existing shadcn and project patterns before introducing a new component.
- Make loading, empty, error, and permission states deliberate.

Run the relevant build, lint, and targeted tests; report verification and deferred decisions.
