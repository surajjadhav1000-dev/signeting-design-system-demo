import type { ComponentMeta } from '../../meta.types';

export const inputMeta = {
  component: {
    name: 'Input',
    category: 'molecules',
    type: 'input',
    description:
      'Single-line text field with label, hint and error message. Use for short free-form text; use a select, checkbox or radio for choosing from options.',
    path: 'src/components/Input/Input.tsx',
    figma: { nodeId: null },
  },

  props: {
    size: {
      type: 'InputSize',
      default: 'md',
      values: ['sm', 'md', 'lg'],
      description: 'Height and padding scale.',
    },
    label: {
      type: 'ReactNode',
      description: 'Visible label, linked to the input. Omit only with aria-label.',
    },
    'aria-label': { type: 'string', description: 'Required when there is no visible label.' },
    hint: { type: 'ReactNode', description: 'Helper text below the field, linked via aria-describedby.' },
    error: {
      type: 'ReactNode',
      description: 'Error message. Sets aria-invalid and replaces the hint.',
    },
    fullWidth: { type: 'boolean', default: false, description: 'Fills its container.' },
    type: {
      type: 'string',
      default: 'text',
      description: 'Native input type: text, email, password, search, tel, url, number.',
    },
    required: { type: 'boolean', default: false, description: 'Native required, plus a decorative asterisk on the label.' },
    disabled: { type: 'boolean', default: false, description: 'Native disabled; not focusable.' },
    placeholder: { type: 'string', description: 'Example value only. Never a substitute for a label.' },
    id: { type: 'string', description: 'Defaults to a generated id.' },
  },

  variants: {
    axes: {
      size: ['sm', 'md', 'lg'],
    },
    purpose: {
      'size.sm': 'Dense UI: filters, table toolbars.',
      'size.md': 'Default for forms.',
      'size.lg': 'Prominent standalone fields, e.g. a hero search or sign-in.',
    },
  },

  relationships: {
    commonPartners: ['Button', 'form', 'dialog', 'card'],
    triggers: ['change', 'input', 'focus', 'blur'],
    blocksWhen: [{ when: 'disabled', effect: 'not focusable; no input or events' }],
    role: 'textbox (native <input>; role varies with type, e.g. searchbox, spinbutton)',
    keyboardSupport: 'Tab focuses. Standard text editing keys. Enter submits the enclosing form.',
    screenReader:
      'Announced by its label. Hint or error is read as the description. Invalid state is announced via aria-invalid. The required asterisk is hidden; required is announced natively.',
  },

  tokens: {
    color: {
      bg: '--sg-input-bg',
      fg: '--sg-input-fg',
      placeholder: '--sg-input-placeholder',
      border: '--sg-input-border',
      'border-hover': '--sg-input-border-hover',
      'border-focus': '--sg-input-border-focus',
      'border-error': '--sg-input-border-error',
      label: '--sg-input-label-fg',
      hint: '--sg-input-hint-fg',
      error: '--sg-input-error-fg',
      disabledBg: '--sg-disabled-bg',
      disabledFg: '--sg-disabled-fg',
      focusRing: '--sg-focus-ring-color',
    },
    spacing: {
      'height.sm': '--sg-input-height-sm',
      'height.md': '--sg-input-height-md',
      'height.lg': '--sg-input-height-lg',
      'gap.label': '--sg-space-1',
      'padding.sm': '--sg-space-3',
      'padding.md': '--sg-space-4',
      'padding.lg': '--sg-space-5',
    },
    typography: {
      family: '--sg-font-family',
      'size.sm': '--sg-font-size-sm',
      'size.md': '--sg-font-size-md',
      'size.lg': '--sg-font-size-lg',
      labelWeight: '--sg-font-weight-semibold',
    },
    border: {
      radius: '--sg-radius-md',
      focusRingWidth: '--sg-focus-ring-width',
      focusRingOffset: '--sg-focus-ring-offset',
    },
    motion: {
      transition: '--sg-duration-fast',
    },
  },

  aiHints: {
    priority: 'high',
    keywords: ['input', 'text field', 'textbox', 'form field', 'email', 'password', 'search', 'label', 'validation', 'error'],
    selectionCriteria: {
      'short free-form text (name, email, search)': 'Input with the matching type',
      'choose one from a few options': 'do not use Input; use a radio group or select',
      'long or multi-line text': 'do not use Input; use a textarea',
      'field has validation failure': 'pass error; do not just recolor',
      'field has no visible label (e.g. search)': 'pass aria-label and a descriptive placeholder',
      'dense toolbar or table filter': 'size="sm"',
    },
    usage: {
      useCases: [
        'form-text-field',
        'email-and-password-entry',
        'search-field',
        'inline-validation',
        'required-field',
      ],
      commonPatterns: [
        { name: 'basic', composition: '<Input label="Name" />' },
        { name: 'email', composition: '<Input label="Email" type="email" placeholder="you@example.com" />' },
        { name: 'with-hint', composition: '<Input label="Username" hint="3 to 20 characters." />' },
        { name: 'with-error', composition: '<Input label="Email" error="Enter a valid email address." />' },
        { name: 'required', composition: '<Input label="Name" required />' },
        { name: 'search-no-label', composition: '<Input aria-label="Search" type="search" placeholder="Search…" />' },
        { name: 'full-width', composition: '<Input label="Address" fullWidth />' },
        {
          name: 'form-row',
          composition: '<form><Input label="Email" type="email" required /><Button type="submit">Subscribe</Button></form>',
        },
      ],
      antiPatterns: [
        {
          scenario: 'Using placeholder instead of a label',
          reason: 'Placeholder disappears on input and is not a reliable accessible name.',
          alternative: 'Pass label, or aria-label if the label must be hidden.',
        },
        {
          scenario: 'Showing validation only by color, without an error message',
          reason: 'Color alone is not accessible and gives no way to fix the problem.',
          alternative: 'Pass error with a specific, actionable message.',
        },
        {
          scenario: 'Using Input for multi-line text',
          reason: 'Single-line control; text will be clipped.',
          alternative: 'Use a textarea.',
        },
        {
          scenario: 'Using Input to choose from a small fixed set of options',
          reason: 'Free text invites invalid values and extra validation.',
          alternative: 'Use a radio group, checkbox or select.',
        },
        {
          scenario: 'Passing both a hint and error as separate, stacked messages',
          reason: 'The error replaces the hint by design; one message keeps the description unambiguous.',
          alternative: 'Pass error when invalid, hint otherwise.',
        },
        {
          scenario: 'Using disabled for a field the user can read but not edit',
          reason: 'Disabled fields leave the tab order and are skipped by assistive tech.',
          alternative: 'Use readOnly.',
        },
        {
          scenario: 'Reusing one id across several Inputs',
          reason: 'Breaks label and description links.',
          alternative: 'Omit id to use the generated one.',
        },
      ],
    },
  },
} satisfies ComponentMeta;
