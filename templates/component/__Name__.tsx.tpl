import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import './__Name__.tokens.css';
import styles from './__Name__.module.css';

// TODO: replace this placeholder variant axis with the component's real variants,
// and keep `__Name__.meta.ts` in sync (the contract test checks it).
export type __Name__Variant = 'default';

export interface __Name__Props extends HTMLAttributes<HTMLDivElement> {
  /** Visual style. Defaults to `default`. */
  variant?: __Name__Variant;
}

export const __Name__ = forwardRef<HTMLDivElement, __Name__Props>(function __Name__(
  { variant = 'default', className, children, ...rest },
  ref,
) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(' ');

  return (
    <div {...rest} ref={ref} className={classes}>
      {children}
    </div>
  );
});
