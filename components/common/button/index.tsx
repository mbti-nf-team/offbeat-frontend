/* eslint-disable react/jsx-props-no-spreading */
import { HTMLProps, ReactElement, ReactNode } from 'react';

import Link from 'next/link';

import clsx from 'clsx';
import { ColorType } from 'lib/types';

import Spinner from '../Spinner';

import styles from './index.module.scss';

type ButtonSize = 'small' | 'medium';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType;
  size?: ButtonSize;
  isLoading?: boolean;
  isFloating?: boolean;
  children: ReactNode;
  width?: `${number}px`;
  type?: 'submit' | 'reset' | 'button';
}

function Button({
  href,
  color = 'highlight',
  size = 'medium',
  type = 'button',
  isLoading = false,
  isFloating = false,
  disabled,
  width,
  children,
  ...rest
}: Props): ReactElement {
  const htmlProps = rest as any;

  const className = clsx(styles.buttonWrapper, {
    [styles[size]]: size,
    [styles[color]]: color,
    [styles.floating]: isFloating,
  });

  if (href) {
    return (
      <Link
        href={href}
        color={color}
        size={size}
        className={className}
        style={{
          width,
        }}
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
      className={className}
      disabled={disabled || isLoading}
      style={{
        width,
      }}
      {...htmlProps}
    >
      {isLoading && width && <Spinner color="black" isLoading size={size} />}
      {isLoading && !width && (
        <>
          <Spinner color="black" isLoading size={size} />
          {children}
        </>
      )}
      {!isLoading && children}
    </button>
  );
}

export default Button;
