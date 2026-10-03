import type { ComponentMeta } from '../../meta.types';

// TODO: every value below is a placeholder. Replace all of it before shipping.
// The contract test (components.contract.test.ts) checks this against the code and CSS.
export const __camel__Meta = {
  component: {
    name: '__Name__',
    category: 'atoms', // atoms | molecules | organisms
    type: 'display', // interactive | display | container | input | navigation
    description: 'TODO: one sentence on what it is and when to use it.',
    path: 'src/components/__Name__/__Name__.tsx',
    figma: { nodeId: null },
  },

  props: {
    variant: {
      type: '__Name__Variant',
      default: 'default',
      values: ['default'],
      description: 'Visual style.',
    },
    children: { type: 'ReactNode', description: 'Content.' },
  },

  variants: {
    axes: {
      variant: ['default'],
    },
    purpose: {
      'variant.default': 'TODO: when to use this variant.',
    },
  },

  relationships: {
    role: 'TODO: ARIA role, or "none (generic container)"',
    keyboardSupport: 'TODO: keys and behavior, or "Not focusable."',
    screenReader: 'TODO: what assistive tech announces.',
  },

  tokens: {
    color: {
      'default.bg': '--__kebab__-default-bg',
      'default.fg': '--__kebab__-default-fg',
    },
    spacing: {
      padding: '--__kebab__-padding',
    },
  },

  aiHints: {
    priority: 'medium',
    keywords: ['TODO'],
    selectionCriteria: {
      'TODO: situation': 'TODO: guidance (variant, or when to use something else)',
    },
    usage: {
      useCases: ['TODO'],
      commonPatterns: [{ name: 'basic', composition: '<__Name__>Content</__Name__>' }],
      antiPatterns: [
        { scenario: 'TODO: what not to do', reason: 'TODO: why', alternative: 'TODO: what instead' },
      ],
    },
  },
} satisfies ComponentMeta;
