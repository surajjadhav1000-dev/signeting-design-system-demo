/**
 * Canonical contract for component metadata.
 *
 * Every component exports a `<Component>.meta.ts` typed as `ComponentMeta`,
 * so missing or malformed metadata fails `npm run typecheck`.
 */

export type ComponentCategory = 'atoms' | 'molecules' | 'organisms';

export type ComponentType =
  | 'interactive'
  | 'display'
  | 'container'
  | 'input'
  | 'navigation';

/** Definition of a single component prop. */
export interface PropDef {
  /** TypeScript-level type as written, e.g. `'sm' | 'md' | 'lg'` or `ReactNode`. */
  type: string;
  required?: boolean;
  default?: string | number | boolean | null;
  description?: string;
  /** Allowed values for enum-like props. */
  values?: readonly string[];
}

export interface ComponentMeta {
  component: {
    name: string;
    category: ComponentCategory;
    type: ComponentType;
    description: string;
    /** Source path, relative to the repo root. */
    path: string;
    figma?: { nodeId: string | null };
  };

  props: Record<string, PropDef>;

  variants: {
    /** Variant axes and their allowed values, e.g. `{ variant: ['primary', 'ghost'] }`. */
    axes: Record<string, readonly string[]>;
    /** What each value is for, keyed `axis.value`, e.g. `'variant.primary'`. */
    purpose: Record<`${string}.${string}`, string>;
    invalidCombinations?: { axes: Record<string, string>; reason: string }[];
  };

  relationships: {
    /** Contexts/providers required above this component. */
    requires?: string[];
    mustBeChildOf?: string[];
    mustBeParentOf?: string[];
    optionalSibling?: string[];
    commonPartners?: string[];
    /** Events emitted. */
    triggers?: string[];
    blocksWhen?: { when: string; effect: string }[];
    /** State that descendants can read. */
    exposesState?: string[];
    /** ARIA role. */
    role: string;
    keyboardSupport: string;
    screenReader: string;
  };

  tokens: {
    color?: Record<string, string>;
    spacing?: Record<string, string>;
    typography?: Record<string, string>;
    border?: Record<string, string>;
    motion?: Record<string, string>;
    elevation?: Record<string, string>;
  };

  aiHints: {
    priority: 'high' | 'medium' | 'low';
    keywords: string[];
    /** Situation → guidance on choosing this component or one of its variants. */
    selectionCriteria: Record<string, string>;
    usage: {
      useCases: string[];
      commonPatterns: { name: string; composition: string }[];
      antiPatterns: { scenario: string; reason: string; alternative: string }[];
    };
  };
}
