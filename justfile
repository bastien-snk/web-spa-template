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

upgrade-template VERSION:
    test -z "$$(git status --porcelain)"
    git fetch web-spa-template "refs/tags/{{VERSION}}:refs/tags/{{VERSION}}"
    git merge --no-ff "refs/tags/{{VERSION}}" -m "chore(template): upgrade to {{VERSION}}"
