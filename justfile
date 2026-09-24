dev:
    bun run dev

build:
    bun run build

lint:
    bun run lint

typecheck:
    bun run typecheck

test:
    bun run test

add-component COMPONENT:
    bunx --bun shadcn@latest add {{COMPONENT}}
