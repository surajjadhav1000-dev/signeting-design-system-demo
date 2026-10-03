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
- `src/components/Button/` — component, CSS Module, stories, MDX docs, tests, `Button.metadata.json`
