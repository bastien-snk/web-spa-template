# Web SPA Template

Before modifying code, read `docs/code-style.md`. Before major structural changes, also read `docs/architecture.md`.

- Use React, TypeScript, Tailwind CSS, and shadcn/ui primitives.
- Keep routes thin and follow the route-first modular-monolith structure.
- Do not call HTTP, generated SDK functions, or configure TanStack Query from UI components.
- Use i18n for all user-facing copy. English is the default locale; French is required.
- Keep `shared/ui/shadcn` and other provider folders domain-agnostic.
- Keep cross-application UI under `shared/ui/app`; it must not import feature internals.
