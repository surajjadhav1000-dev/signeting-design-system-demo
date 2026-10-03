# signeting-design-system-demo
Experimental component library with design tokens, metadata, Storybook documentation, and tests.

## Getting started

```
npm install
npm run storybook        # preview at http://localhost:6006
npm test                 # Vitest + Testing Library + axe
npm run typecheck
npm run build-storybook
```

## Structure

- `src/tokens/` — design tokens (`tokens.css`, typed names in `tokens.ts`)
- `src/meta.types.ts` — `ComponentMeta`, the canonical metadata contract
- `src/components/<Name>/` — every component ships the full set: `<Name>.tsx`, `<Name>.meta.ts` (typed `ComponentMeta`), `<Name>.tokens.css`, `<Name>.stories.tsx`, `<Name>.test.tsx`, `index.ts`
- `templates/component/` + `npm run new-component -- <Name>` — scaffold for new components; see `AGENTS.md`
- `src/components/components.contract.test.ts` — fails if any component is missing a file or has inconsistent metadata
