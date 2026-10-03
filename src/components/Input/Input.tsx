import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.tokens.css';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

interface InputBaseProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'> {
  /** Height and padding scale. Defaults to `md`. */
  size?: InputSize;
  /** Helper text shown below the field. Linked via `aria-describedby`. */
  hint?: ReactNode;
  /** Error message. Marks the field invalid and replaces the hint. */
  error?: ReactNode;
  /** Stretches the field to fill its container. */
  fullWidth?: boolean;
}

interface LabelledInput extends InputBaseProps {
  label: ReactNode;
}

/** Without a visible label, an accessible name is required. */
interface UnlabelledInput extends InputBaseProps {
  label?: undefined;
  'aria-label': string;
}

export type InputProps = LabelledInput | UnlabelledInput;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    hint,
    error,
    fullWidth = false,
    type = 'text',
    id,
    required,
    className,
    'aria-describedby': describedBy,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;
  const describedByIds = [describedBy, message ? messageId : undefined].filter(Boolean).join(' ');

  const classes = [styles.root, fullWidth && styles.fullWidth, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </label>
      )}
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        className={[styles.control, styles[size], error && styles.invalid].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedByIds || undefined}
      />
      {message && (
        <p id={messageId} className={error ? styles.error : styles.hint}>
          {message}
        </p>
      )}
    </div>
  );
});
