import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'you@example.com' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const column = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 } as const;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={column}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
};

export const WithHint: Story = {
  args: { hint: "We'll only use this to send receipts." },
};

export const WithError: Story = {
  args: { defaultValue: 'not-an-email', error: 'Enter a valid email address.' },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'locked@example.com' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const WithoutVisibleLabel: Story = {
  args: { label: undefined, 'aria-label': 'Search', placeholder: 'Search…', type: 'search' },
};
