# design system

## Foundation

- Use Tailwind CSS and shadcn/ui with Radix primitives and the `radix-mira` style.
- Use Zinc as the neutral foundation and primary-action colour, Inter for UI and headings, and Lucide for icons. Burnt orange is reserved for strategy-context accents; do not use either colour as a data-series signal.
- Support both light and dark themes. Dark mode may be visually expressive, while preserving legibility, contrast, and accessible interaction states in both themes.
- Use colour intentionally and semantically; third-party provider marks retain their official colours.
- Use a muted sidebar surface so the main application canvas and elevated cards retain clear visual meaning.
- Prefer existing shadcn components before creating a new primitive.
- Keep the interface clear and trustworthy for both professional operators and less technical investors. Present a useful summary before deeper operational detail.
- Desktop-first; responsive layouts must retain hierarchy on smaller screens.

## Hierarchy

- Use tables for comparable operational data and cards for headline metrics.
- Summary first, inspection on demand.
- Make status, mode, scope, and timestamps unambiguous.

## Risk

- Use red only for risk, failure, or destructive actions.
- Use green for a healthy or completed state, never as a claim of profitability.

## Copy and locale

- Use concise English source copy; French is a first-class locale.
- Do not bake translated labels or formatted money into cached view models.
