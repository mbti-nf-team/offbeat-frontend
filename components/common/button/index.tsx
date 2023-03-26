/* eslint-disable react/jsx-props-no-spreading */
import { HTMLProps, PropsWithChildren, ReactElement } from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import styles from './index.module.scss';

type ColorType = 'success' | 'outlined' | 'primary' | 'warning' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType;
  size?: ButtonSize;
  isLoading?: boolean;
}

function Button({
  color = 'outlined', size = 'medium', href, children, type = 'button', isLoading = false, disabled, ...rest
}: PropsWithChildren<Props>): ReactElement {
  const htmlProps = rest as any;

  const buttonClassName = clsx(styles.buttonWrapper, {
    [styles.size]: size,
    [styles.color]: color,
  });

  if (href) {
    return (
      <Link
        href={href}
        color={color}
        size={size}
        className={buttonClassName}
        {...htmlProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...htmlProps}
    >
      {children}
    </button>
  );
}

export default Button;
