import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from './Button';

describe('Button', () => {
  it('renders a native button with type="button" by default', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates with Enter and Space', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('loading blocks clicks, sets aria-busy, and stays focusable', async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    await userEvent.tab();
    expect(button).toHaveFocus();
    await userEvent.click(button);
    await userEvent.keyboard('{Enter}');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('hides decorative icons from assistive tech', () => {
    render(<Button leftIcon={<svg data-testid="i" />}>Save</Button>);
    expect(screen.getByTestId('i').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('icon-only button is named by aria-label', () => {
    render(<Button aria-label="Close" leftIcon={<svg />} />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('forwards ref and extra props', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref} data-qa="x" type="submit">Go</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveAttribute('data-qa', 'x');
    expect(ref.current).toHaveAttribute('type', 'submit');
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'has no axe violations (%s)',
    async (variant) => {
      const { container } = render(<Button variant={variant}>Label</Button>);
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it('has no axe violations when disabled or loading', async () => {
    const { container } = render(
      <>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
