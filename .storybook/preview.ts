import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
};

export default preview;
