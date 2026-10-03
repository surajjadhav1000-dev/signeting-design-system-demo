import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Input } from './Input';

describe('Input', () => {
  it('renders a text input named by its label', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('accepts typing and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Name'), 'Ada');
    expect(screen.getByLabelText('Name')).toHaveValue('Ada');
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('links the hint via aria-describedby', () => {
    render(<Input label="Email" hint="Used for receipts" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Used for receipts');
  });

  it('marks the field invalid and shows the error instead of the hint', () => {
    render(<Input label="Email" hint="Used for receipts" error="Enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Enter a valid email');
    expect(screen.queryByText('Used for receipts')).not.toBeInTheDocument();
  });

  it('keeps a consumer aria-describedby alongside the message', () => {
    render(<Input label="Email" hint="Hint" aria-describedby="extra" />);
    expect(screen.getByLabelText('Email').getAttribute('aria-describedby')).toMatch(/^extra .+/);
  });

  it('is required with a decorative asterisk', () => {
    render(<Input label="Email" required />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not accept input when disabled', async () => {
    render(<Input label="Email" disabled />);
    await userEvent.type(screen.getByLabelText('Email'), 'x');
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });

  it('uses aria-label when there is no visible label', () => {
    render(<Input aria-label="Search" />);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('respects a custom id and type', () => {
    render(<Input label="Password" id="pw" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('id', 'pw');
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('forwards ref to the input and extra props', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} label="Email" data-qa="x" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('data-qa', 'x');
  });

  it.each(['sm', 'md', 'lg'] as const)('has no axe violations (%s)', async (size) => {
    const { container } = render(<Input label="Email" size={size} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with hint, error, required, or disabled', async () => {
    const { container } = render(
      <>
        <Input label="A" hint="Hint" />
        <Input label="B" error="Bad" />
        <Input label="C" required />
        <Input label="D" disabled />
        <Input aria-label="E" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
