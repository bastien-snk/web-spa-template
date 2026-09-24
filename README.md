# Web SPA Template

Personal Vite SPA template for modular web applications.

## Development

```sh
bun install
cp .env.example .env
bun run dev
```

`VITE_API_URL` is the browser-facing base URL for the application API. Configure the generated SDK and Better Auth client in `src/integrations/api` and `src/integrations/auth` when deriving an application.

## Checks

```sh
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
```

## Deployment

The included Docker and nginx configuration is optional. It provides a static SPA container with a runtime `/api/` proxy. Projects deployed to Vercel, Render, Railway, or another provider can ignore these files.

Every push to `main` publishes the verified container image to GitHub Container Registry as `ghcr.io/<owner>/<repository>:latest` and `ghcr.io/<owner>/<repository>:sha-<commit>`. The package is private by default. The container requires `BACKEND_API_UPSTREAM` at runtime for nginx to proxy `/api/` requests.

## Template upgrades

Applications retain this repository as the `web-spa-template` remote. Upgrade only to a tagged template release, directly on the current branch, in a dedicated conventional commit such as `chore(template): upgrade to v0.2.0`. Resolve application-specific conflicts, then run the full checks.

## Architecture

See [AGENTS.md](AGENTS.md) and [docs/architecture.md](docs/architecture.md).
