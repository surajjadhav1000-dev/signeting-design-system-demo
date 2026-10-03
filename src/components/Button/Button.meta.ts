import type { ComponentMeta } from '../../meta.types';

export const buttonMeta = {
  component: {
    name: 'Button',
    category: 'atoms',
    type: 'interactive',
    description: 'Triggers an action. Use a link for navigation.',
    path: 'src/components/Button/Button.tsx',
    figma: { nodeId: null },
  },

  props: {
    variant: {
      type: 'ButtonVariant',
      default: 'primary',
      values: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style, chosen by emphasis.',
    },
    size: {
      type: 'ButtonSize',
      default: 'md',
      values: ['sm', 'md', 'lg'],
      description: 'Height and padding scale.',
    },
    loading: {
      type: 'boolean',
      default: false,
      description: 'Shows a spinner, sets aria-busy, ignores clicks. Focus is kept.',
    },
    fullWidth: { type: 'boolean', default: false, description: 'Fills its container.' },
    leftIcon: { type: 'ReactNode', default: null, description: 'Decorative icon before the label (aria-hidden).' },
    rightIcon: { type: 'ReactNode', default: null, description: 'Decorative icon after the label (aria-hidden).' },
    type: {
      type: "'button' | 'submit' | 'reset'",
      default: 'button',
      values: ['button', 'submit', 'reset'],
      description: 'Native button type. Submit must be explicit.',
    },
    children: { type: 'ReactNode', description: 'Visible label. Omit only for icon-only, which requires aria-label.' },
    'aria-label': { type: 'string', description: 'Required when there are no children.' },
  },

  variants: {
    axes: {
      variant: ['primary', 'secondary', 'ghost', 'danger'],
      size: ['sm', 'md', 'lg'],
    },
    purpose: {
      'variant.primary': 'The single main call-to-action in a view.',
      'variant.secondary': 'Alternative or cancel action beside a primary.',
      'variant.ghost': 'Low-emphasis action, e.g. in toolbars or dense UI.',
      'variant.danger': 'Destructive or irreversible action, usually behind a confirmation.',
      'size.sm': 'Compact contexts: toolbars, table rows, icon-only.',
      'size.md': 'Default for most UI.',
      'size.lg': 'Prominent hero or standalone calls-to-action.',
    },
  },

  relationships: {
    commonPartners: ['form', 'dialog footer', 'toolbar', 'card footer'],
    triggers: ['click'],
    blocksWhen: [
      { when: 'loading', effect: 'click is prevented and onClick is not called; stays focusable' },
      { when: 'disabled', effect: 'not focusable; no events' },
    ],
    role: 'button (native <button>)',
    keyboardSupport: 'Enter and Space activate.',
    screenReader:
      'Announced by its text. Icon-only requires aria-label. Loading exposes aria-busy and aria-disabled. Icons are aria-hidden.',
  },

  tokens: {
    color: {
      'primary.bg': '--sg-button-primary-bg',
      'primary.bg-hover': '--sg-button-primary-bg-hover',
      'primary.bg-active': '--sg-button-primary-bg-active',
      'primary.fg': '--sg-button-primary-fg',
      'secondary.bg': '--sg-button-secondary-bg',
      'secondary.bg-hover': '--sg-button-secondary-bg-hover',
      'secondary.bg-active': '--sg-button-secondary-bg-active',
      'secondary.fg': '--sg-button-secondary-fg',
      'ghost.bg-hover': '--sg-button-ghost-bg-hover',
      'ghost.bg-active': '--sg-button-ghost-bg-active',
      'ghost.fg': '--sg-button-ghost-fg',
      'danger.bg': '--sg-button-danger-bg',
      'danger.bg-hover': '--sg-button-danger-bg-hover',
      'danger.bg-active': '--sg-button-danger-bg-active',
      'danger.fg': '--sg-button-danger-fg',
      disabledBg: '--sg-disabled-bg',
      disabledFg: '--sg-disabled-fg',
      focusRing: '--sg-focus-ring-color',
    },
    spacing: {
      'height.sm': '--sg-button-height-sm',
      'height.md': '--sg-button-height-md',
      'height.lg': '--sg-button-height-lg',
      'gap.icon': '--sg-space-2',
      'padding.sm': '--sg-space-3',
      'padding.md': '--sg-space-4',
      'padding.lg': '--sg-space-5',
    },
    typography: {
      family: '--sg-font-family',
      'size.sm': '--sg-font-size-sm',
      'size.md': '--sg-font-size-md',
      'size.lg': '--sg-font-size-lg',
      weight: '--sg-font-weight-semibold',
    },
    border: {
      radius: '--sg-radius-md',
      'secondary.color': '--sg-button-secondary-border',
      focusRingWidth: '--sg-focus-ring-width',
      focusRingOffset: '--sg-focus-ring-offset',
    },
    motion: {
      transition: '--sg-duration-fast',
    },
  },

  aiHints: {
    priority: 'high',
    keywords: ['button', 'cta', 'submit', 'action', 'save', 'cancel', 'delete', 'confirm', 'loading', 'icon button'],
    selectionCriteria: {
      'main action in a view': 'variant="primary" (only one per view)',
      'cancel or alternative action': 'variant="secondary"',
      'low-emphasis action in toolbars or dense UI': 'variant="ghost"',
      'destructive or irreversible action': 'variant="danger"',
      'request in flight': 'loading, not disabled',
      'no visible text': 'icon-only with aria-label',
      'navigates to another page': 'do not use Button; use a link',
    },
    usage: {
      useCases: [
        'primary-action',
        'form-submission',
        'secondary-or-cancel-action',
        'destructive-confirmation',
        'low-emphasis-toolbar-action',
        'async-action-with-pending-state',
      ],
      commonPatterns: [
        { name: 'primary-action', composition: '<Button>Save changes</Button>' },
        { name: 'secondary-action', composition: '<Button variant="secondary">Cancel</Button>' },
        { name: 'form-submit', composition: '<Button type="submit">Create account</Button>' },
        { name: 'async-submit', composition: '<Button type="submit" loading={isSaving}>Save</Button>' },
        { name: 'destructive-action', composition: '<Button variant="danger">Delete project</Button>' },
        { name: 'with-icon', composition: '<Button leftIcon={<PlusIcon />}>Add item</Button>' },
        {
          name: 'icon-only',
          composition: '<Button variant="ghost" size="sm" aria-label="Close" leftIcon={<CloseIcon />} />',
        },
        { name: 'full-width', composition: '<Button fullWidth>Continue</Button>' },
      ],
      antiPatterns: [
        {
          scenario: 'Using Button for navigation to another page or route',
          reason: 'No href: breaks open-in-new-tab, middle-click and link semantics for assistive tech.',
          alternative: "Use an anchor or the router's Link component.",
        },
        {
          scenario: 'Icon-only button without aria-label',
          reason: 'No accessible name. TypeScript rejects it via the IconOnlyButton type.',
          alternative: 'Add aria-label, or add visible text as children.',
        },
        {
          scenario: 'Multiple variant="primary" buttons in one view',
          reason: 'Dilutes hierarchy so the main action is no longer obvious.',
          alternative: 'One primary; use secondary or ghost for the rest.',
        },
        {
          scenario: 'variant="danger" for non-destructive emphasis',
          reason: 'Red signals data loss; misuse trains users to ignore it.',
          alternative: 'Use primary or secondary.',
        },
        {
          scenario: 'Meaning carried only by leftIcon/rightIcon',
          reason: 'Icons are aria-hidden, so screen readers will not announce them.',
          alternative: 'Put the meaning in the text label.',
        },
        {
          scenario: 'Using disabled to show a pending request',
          reason: 'A disabled button leaves the tab order and drops focus.',
          alternative: 'Use loading, which keeps focus.',
        },
        {
          scenario: 'Relying on the default type to submit a form',
          reason: 'type defaults to "button", so the form will not submit.',
          alternative: 'Pass type="submit" explicitly.',
        },
        {
          scenario: 'Nesting interactive elements (links, buttons) in children',
          reason: 'Invalid HTML and unpredictable keyboard behavior.',
          alternative: 'Keep children to text and inline content.',
        },
      ],
    },
  },
} satisfies ComponentMeta;
