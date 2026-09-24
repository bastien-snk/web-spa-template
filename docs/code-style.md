# Code style

## Formatting

Prettier is the source of truth. Use four-space indentation and semicolons. Run `bun run format` before handing off a change; `bun run lint` verifies formatting.

## Objects

Do not destructure objects in application code. Keep the source of each value explicit with named property access.

```ts
// Good
const session = await getSession();
const userId = session.user.id;

// Avoid
const { user } = await getSession();
const { id: userId } = user;
```

This rule applies to function parameters, local variables, and imports of object properties. Array destructuring is permitted when positional meaning is inherent and clear.

## Object literals

Do not use shorthand properties in object literals. Always write both the key and the value explicitly.

```ts
// Good
return { signInWithGoogle: signInWithGoogle };

// Avoid
return { signInWithGoogle };
```

Explicit properties keep object contracts easy to scan and prevent a value’s source from being hidden by its key.

## Naming

- Use `camelCase` for variables and functions.
- Use `PascalCase` for React components and TypeScript types.
- Use `kebab-case` for non-component filenames and route folders.
- Use `snake_case` for translation JSON keys.

## Imports

- Prefer absolute `@/` imports for application code.
- Use `import type` when an import is only used as a type.
- Keep module boundaries intact: import another feature only from its public `index.ts` surface.
