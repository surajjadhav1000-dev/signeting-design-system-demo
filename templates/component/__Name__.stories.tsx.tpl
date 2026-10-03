import type { Meta, StoryObj } from '@storybook/react-vite';
import { __Name__ } from './__Name__';

const meta = {
  title: 'Components/__Name__',
  component: __Name__,
  args: { children: '__Name__' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default'] },
  },
} satisfies Meta<typeof __Name__>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

// TODO: add one story per variant, size and state so each has a visual test surface.
