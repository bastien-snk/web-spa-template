---
name: review
description: Review frontend pages, components, and pull-request changes for product fit, shadcn design-system consistency, modular-monolith boundaries, i18n, data-state coverage, and good UX. Use when asked to audit, review, or quality-check UI work before merge or release.
---

# UI Review

Read project instructions, the relevant page brief, design system, architecture, and changed files. Report concrete findings first, ordered by severity. Do not modify code unless asked.

Check:

- product scope, visual hierarchy, shadcn reuse, and clear status/mode/risk presentation;
- loading, empty, error, pending, unauthorized, responsive, and accessible states;
- absence of direct HTTP or cache policy in UI;
- feature-boundary imports, tenant-aware query keys, and mutation invalidation;
- English/French coverage and absence of locale-formatted cache views;
- absence of JavaScript-number financial calculations;
- that backend authorization and risk controls remain authoritative.

Include only applicable sections: Findings, Questions/assumptions, What looks good, and Verification gaps.
