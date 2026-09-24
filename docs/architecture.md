# Frontend Architecture Spec — Route-first Modular Monolith

## 1. Scope and goals

This architecture keeps things easy to navigate, modular to evolve, and safe to operate:

- routes are discoverable at app level;
- UI is isolated from HTTP, caching, persistence, and analytics side effects;
- feature boundaries prevent cross-module spaghetti imports;
- complexity stays proportional to a React web application, not an enterprise imitation of backend DDD.

Non-goals: enforce DDD everywhere, duplicate backend authorization/risk logic, or introduce indirection without a concrete benefit.

## 2. State

### Server state

Backend data is cached, invalidated, and refetched by TanStack Query. Query options live in feature `model/queries` and `model/mutations`, never in React UI.

### Local UI state

Form values, modal state, local filter drafts, and temporary interaction state stay in the component or page whenever possible.

### Shared client UI state

Use a feature-scoped store only for cross-component client state that cannot be lifted sensibly. Global stores are exceptional.

## 3. Dependency rules

```text
feature ui -> feature model -> feature api -> SDK
feature model -> optional feature domain
feature domain -> nothing
```

Allowed dependencies:

- `ui/` imports its `model/`, `shared/ui/`, and approved presentational packages such as icon libraries only;
- `model/` imports `api/`, `domain/`, and shared utilities;
- `api/` adapts API contracts and operations from the local `@xyz/sdk` dependency;
- `domain/` contains pure reusable rules and types only.

Forbidden dependencies:

- UI imports from `api/`, the SDK, storage, or analytics;
- `model/` imports from `ui/`;
- deep imports into another feature;
- frontend-only rules treated as authorization or execution controls.

`shared/ui` is 100% domain-agnostic. Feature UI may use a feature facade hook, but never `fetch` or `useQuery` directly.

## 4. Naming

- Route folders: `kebab-case`.
- Non-component TypeScript files: `kebab-case`.
- React component files: `PascalCase` matching their exported component.
- Query keys use stable noun-first tuples such as `['organizations', organizationId, 'bots']`.

## 5. Project layout

```text
src/
  main.tsx                     # explicitly initializes integrations and renders React
  router.tsx                   # Router instance, built from routeTree.gen.ts
  routeTree.gen.ts             # generated and committed; never edit manually
  routes/                      # thin route wiring only
    -guards/                   # private reusable TanStack Router policies
      require-anonymous.ts
    __root.tsx
    login/
      index.tsx                # /login
  integrations/
    api/                  # init() configures the local SDK
    i18next/                   # init() discovers JSON translation namespaces
    tanstack-query/            # init() returns the QueryClient
  modules/
    auth/
  shared/
    lib/
    hooks/
    ui/
      shadcn/                  # CLI-generated, domain-agnostic primitives
```

Route files import a feature page and optionally compose an application layout. They contain no API implementation or page-specific business logic.

### Routing

TanStack Router uses the Vite plugin and file-based route generation. Path-oriented folders map to paths (`routes/login/index.tsx` maps to `/login`). `routeTree.gen.ts` is generated at development/build time but **is committed** because it is part of the application runtime; it must remain excluded from formatting and manual edits.

`src/routes/-guards/` contains reusable, private TanStack Router policies such as authentication guards. The `-` prefix excludes it from route generation. A guard may import a feature's public surface, but never feature internals, UI, or SDK operations. Route files apply these policies in one call (for example, `beforeLoad: requireAnonymous()`); feature modules do not own `model/routing` folders.

### Integrations and bootstrap

Integrations encapsulate third-party setup rather than feature behaviour. Each lives in `src/integrations/<name>/index.ts` and exports `init()`. `main.tsx` invokes each integration explicitly; there is no integration registry or aggregate initializer.

- `api/init()` configures the SDK singleton with the browser API origin and cookie credentials.
- `i18next/init()` discovers translation JSON files and resolves before React renders.
- `tanstack-query/init()` creates and returns the application `QueryClient`.

## 6. Feature module layout

```text
modules/orders/
  ui/
    pages/
      orders/
        OrdersPage.tsx
        components/            # private to this page
      order-detail/
        OrderDetailPage.tsx
        components/
    components/                # reused by two or more module pages

  model/
    facade/
      use-orders.ts
    queries/
      list-orders.ts
      get-order.ts
    mutations/
      cancel-order.ts
    stores/                    # feature-scoped only when required
    services/                  # feature application services
      order-search.ts
    present/
      present-order-view.ts
    types/
      views/
      errors/
    forms/
      create-order/
        schema.ts
        defaults.ts
        presenter.ts
        form.ts

  api/
    orders-api.ts              # adapter around the local SDK
    orders-api-error.ts

  domain/
    rules.ts                   # optional, pure only

  index.ts                     # public module surface
```

Scopes:

- `shared/ui/*`: design system, never feature data;
- `modules/<feature>/ui/components`: feature-shared UI;
- `modules/<feature>/ui/pages/<route>/components`: page-private UI.

## 7. Types and presentation

### API contracts

Exact DTOs and requests come from the local `@xyz/sdk` dependency, generated from the backend OpenAPI contract. Do not duplicate or edit them in a feature.

Feature API adapters are the boundary between SDK contracts and the feature model. They translate SDK responses and transport errors into internal feature types before returning; SDK DTO types must not escape `api/` into `model/` or `ui/`.

### View types

Feature views are optimized for rendering and may contain derived semantic flags. They must not contain translated strings or locale-formatted values such as `totalFormatted`; query caches must remain valid when locale changes.

```ts
type OrderView = {
    id: string;
    submittedAt: string;
    quantity: DecimalString;
    limitPrice: DecimalString | null;
    currency: string;
    status: OrderStatus;
    canCancel: boolean;
};
```

### Feature services

`model/services/` is the shared home for feature application services: named operations over feature types that do not belong to an API adapter, query, mutation, form, or pure domain rule. For example, a service can parse and normalize browser-controlled route values, coordinate model-level state transitions, or derive feature capabilities. Services do not import React, SDK operations, or query-cache APIs.

Place a type beside the responsibility that owns it instead of collecting structurally similar inputs in a shared folder. Mutation variables live next to their mutation; API request and response mappings live in `api/`; route and page state such as `LoginSearch` live in `types/views/`. Matching object shapes alone are not a reason to share a type.

### Domain

Add `domain/` only for pure, reused and independently testable logic. Examples: state-machine presentation rules or display-safe order capabilities. Backend remains authoritative for permissions, risk, validation, and execution.

## 8. Queries, cache, and mutations

Each query file exports a Query Options builder so key, function, presentation, and cache policy stay together.

```ts
export const listOrdersQuery = (input: ListOrdersInput) =>
    queryOptions({
        queryKey: [
            'organizations',
            input.organizationId,
            'bots',
            input.botId,
            'orders',
            normalizeFilters(input.filters),
        ],
        queryFn: async () => presentOrders(await ordersApi.list(input)),
        staleTime: 30_000,
    });
```

Rules:

- Query keys include organization, bot, and normalized filters where relevant.
- Facade hooks are the UI entry point around Query Options.
- Mutations invalidate affected entity, list, and aggregate keys explicitly.
- Put background refresh intervals only on screens where freshness matters.
- Keep `PAPER` and `LIVE` in data scope and display, but do not create duplicate frontend workflows.

## 9. Forms

Use React Hook Form and Zod. A form folder contains:

- `schema.ts`: validation and inferred value type;
- `defaults.ts`: explicit RHF defaults and reset values;
- `presenter.ts`: form values to facade input;
- `form.ts`: RHF and resolver wiring.

Defaults remain separate from schemas because they are UX/context concerns, while validation is a rule.

## 10. i18n and financial formatting

Use i18next/react-i18next for English and French messages. English is the default.

- All visible copy uses message keys.
- Translation resources live in `src/integrations/i18next/locales/<locale>/<namespace>.json`; their relative JSON path is the namespace. For example, `en/auth/login.json` provides `auth/login`.
- Within a namespace, group messages by semantic section (`heading`, `actions`, `fields`, `errors`, `status`, `empty_state`) and use `snake_case` keys: `t('auth/login:actions.continue_with_google')`.
- Shared formatters use locale and user/organization preferences for dates, percentages, currencies, and quantities.
- Preserve backend decimal values and never calculate money with JavaScript `number`.
- Formatting happens at render time, not in a cached server-state presenter.

## 11. Prop drilling and contexts

Passing props one or two levels is normal. For deeper trees, prefer a page-local context or a feature facade hook at the component that owns the need. Do not use a global store as a shortcut.

## 12. Enforcement

Add lint-boundary rules as modules gain implementation:

- ban `modules/*/ui` imports from `modules/*/api` and `shared/api`;
- ban `model` imports from `ui`;
- permit cross-feature imports only through public `index.ts` exports;
- flag direct SDK imports outside a feature API adapter or SDK integration.

Review each screen against its page brief, `DESIGN.md`, loading/empty/error states, i18n, responsive behavior.
