/// <reference types="vite/client" />
import type { ComponentMeta } from '../meta.types';

/**
 * Contract for every component folder in src/components.
 * Adding a component without the full set (or with inconsistent metadata) fails here.
 */
const files = Object.keys(import.meta.glob('./*/*'));
const metaModules = import.meta.glob<Record<string, ComponentMeta>>('./*/*.meta.ts', { eager: true });
const cssSources = {
  ...import.meta.glob('../tokens/*.css', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('./*/*.tokens.css', { eager: true, query: '?raw', import: 'default' }),
} as Record<string, string>;
const allCss = Object.values(cssSources).join('\n');

const components = [...new Set(files.map((f) => f.split('/')[1]!))].sort();

const requiredFiles = (name: string) => [
  `${name}.tsx`,
  `${name}.meta.ts`,
  `${name}.tokens.css`,
  `${name}.stories.tsx`,
  `${name}.test.tsx`,
  'index.ts',
];

const metaFor = (name: string) => {
  const mod = metaModules[`./${name}/${name}.meta.ts`];
  const exported = Object.entries(mod ?? {}).filter(([key]) => key.endsWith('Meta'));
  return exported.length === 1 ? exported[0]![1] : undefined;
};

it('finds at least one component', () => {
  expect(components.length).toBeGreaterThan(0);
});

describe.each(components)('%s component contract', (name) => {
  it.each(requiredFiles(name))('has %s', (file) => {
    expect(files).toContain(`./${name}/${file}`);
  });

  it('exports exactly one *Meta object from its .meta.ts', () => {
    expect(metaFor(name)).toBeDefined();
  });

  describe('metadata', () => {
    const meta = () => metaFor(name)!;

    it('matches the folder and points at a real source file', () => {
      expect(meta().component.name).toBe(name);
      expect(meta().component.path).toBe(`src/components/${name}/${name}.tsx`);
      expect(files).toContain(`./${name}/${name}.tsx`);
    });

    it('declares every variant axis as a prop with matching values', () => {
      for (const [axis, values] of Object.entries(meta().variants.axes)) {
        expect(meta().props[axis]?.values, `prop "${axis}"`).toEqual(values);
      }
    });

    it('keys variant purposes by real axis.value pairs, covering all of them', () => {
      const expected = Object.entries(meta().variants.axes).flatMap(([axis, values]) =>
        values.map((v) => `${axis}.${v}`),
      );
      expect(Object.keys(meta().variants.purpose).sort()).toEqual(expected.sort());
    });

    it('only references tokens that are defined in CSS', () => {
      const referenced = Object.values(meta().tokens).flatMap((group) => Object.values(group ?? {}));
      expect(referenced.length).toBeGreaterThan(0);
      for (const token of referenced) {
        expect(token).toMatch(/^--sg-/);
        expect(allCss, token).toContain(`${token}:`);
      }
    });

    it('has complete aiHints', () => {
      const { aiHints, relationships } = meta();
      expect(aiHints.keywords.length).toBeGreaterThan(0);
      expect(Object.keys(aiHints.selectionCriteria).length).toBeGreaterThan(0);
      expect(aiHints.usage.useCases.length).toBeGreaterThan(0);
      expect(aiHints.usage.commonPatterns.length).toBeGreaterThan(0);
      expect(aiHints.usage.antiPatterns.length).toBeGreaterThan(0);
      expect(relationships.role).not.toBe('');
      expect(relationships.keyboardSupport).not.toBe('');
      expect(relationships.screenReader).not.toBe('');
    });
  });
});
