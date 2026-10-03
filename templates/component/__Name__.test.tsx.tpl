import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { __Name__ } from './__Name__';

describe('__Name__', () => {
  it('renders its children', () => {
    render(<__Name__>Content</__Name__>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards ref and extra props', () => {
    const ref = createRef<HTMLDivElement>();
    render(<__Name__ ref={ref} data-qa="x">Content</__Name__>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('data-qa', 'x');
  });

  it('has no axe violations', async () => {
    const { container } = render(<__Name__>Content</__Name__>);
    expect(await axe(container)).toHaveNoViolations();
  });

  // TODO: add behavior tests for every variant, state and interaction in the metadata.
});
