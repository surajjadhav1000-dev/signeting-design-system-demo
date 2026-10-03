# Agent instructions

This is an agentic design system: every component carries machine-readable metadata so AI
can pick and use components correctly. Humans and agents follow the same rules.

## Adding a component

1. Scaffold from the template. Never hand-create a component folder.

   ```bash
   npm run new-component -- <PascalCaseName>
   ```

   This copies `templates/component/` to `src/components/<Name>/`.

2. Replace every placeholder. The template ships with `TODO` text and a placeholder `variant`
   axis; the contract test fails until all `TODO`s are gone.

3. Implement the component in `<Name>.tsx` (+ `<Name>.module.css`). Style only with tokens.

4. Fill in `<Name>.meta.ts` (typed `ComponentMeta` from `src/meta.types.ts`). It must describe
   the code as written: props, variants, relationships and a11y, tokens, and `aiHints`.

5. Put component-scoped tokens in `<Name>.tokens.css`, prefixed `--sg-<kebab-name>-*`.
   Reuse shared primitives from `src/tokens/tokens.css`; add new primitives there only if shared.

6. Add one story per variant, size and state in `<Name>.stories.tsx`.

7. Add behavior and axe tests in `<Name>.test.tsx` covering every variant, state and interaction
   listed in the metadata.

8. Export the component, its types and `<name>Meta` from `index.ts`.

9. Run `npm run typecheck && npm test`. Both must pass. Optionally `npm run build-storybook`.

## Required files per component

```
<Name>/
  <Name>.tsx            implementation
  <Name>.meta.ts        ComponentMeta + aiHints
  <Name>.tokens.css     component-scoped tokens
  <Name>.module.css     styles
  <Name>.stories.tsx    visual test surface
  <Name>.test.tsx       behavior tests
  index.ts              single canonical export
```

`src/components/components.contract.test.ts` enforces this for every folder in
`src/components/`: required files exist, metadata matches the folder and code, variant axes
match props, every referenced token is defined in CSS, aiHints are complete, no `TODO` remains.

## Changing a component

If you change props, variants, tokens or behavior, update `<Name>.meta.ts` in the same change.
Metadata that disagrees with the code is a bug.

## Rules

- Changing the metadata schema (`src/meta.types.ts`) or the template is a contract change: update
  every existing component and this file in the same change.
- Keep `meta.aiHints.selectionCriteria` and `antiPatterns` concrete: they are what AI reads to
  choose between components.
