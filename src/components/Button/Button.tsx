import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Visual style. Defaults to `primary`. */
  variant?: ButtonVariant;
  /** Height and padding scale. Defaults to `md`. */
  size?: ButtonSize;
  /** Shows a spinner, sets `aria-busy`, and ignores clicks. Focus is kept. */
  loading?: boolean;
  /** Stretches the button to fill its container. */
  fullWidth?: boolean;
  /** Decorative icon before the label. Rendered `aria-hidden`. */
  leftIcon?: ReactNode;
  /** Decorative icon after the label. Rendered `aria-hidden`. */
  rightIcon?: ReactNode;
}

interface ButtonWithLabel extends ButtonBaseProps {
  children: ReactNode;
}

/** Without visible text, an accessible name is required. */
interface IconOnlyButton extends ButtonBaseProps {
  children?: undefined;
  'aria-label': string;
}

export type ButtonProps = ButtonWithLabel | IconOnlyButton;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    type = 'button',
    disabled,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    !children && styles.iconOnly,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={handleClick}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children && <span className={styles.label}>{children}</span>}
      {!loading && rightIcon && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});
