/* eslint-disable react/jsx-props-no-spreading */
import {
  HTMLProps, PropsWithChildren, ReactElement, ReactNode,
} from 'react';

import Link from 'next/link';

import clsx from 'clsx';

import { ColorType } from 'lib/types';

import Spinner from '../Spinner';

import styles from './index.module.scss';

type ButtonSize = 'small' | 'medium';

interface Props extends Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size'> {
  color?: ColorType | 'ghost';
  size?: ButtonSize;
  isLoading?: boolean;
  isFloating?: boolean;
  width?: `${number}px`;
  onlyIcon?: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  hasPseudoSelectorStyle?: boolean;
}

function Button({
  href,
  color = 'highlight',
  size = 'medium',
  type = 'button',
  isLoading = false,
  isFloating = false,
  hasPseudoSelectorStyle = true,
  disabled,
  width,
  onlyIcon,
  className,
  children,
  ...rest
}: PropsWithChildren<Props>): ReactElement {
  const htmlProps = rest as any;

  const buttonClassName = clsx(styles.buttonWrapper, {
    [styles[size]]: size,
    [styles[color]]: color,
    [styles.floating]: isFloating,
    [styles.hasIcon]: onlyIcon,
    [styles.hasPseudoSelectorStyle]: hasPseudoSelectorStyle,
  }, className);

  const buttonLabel = onlyIcon || children;

  if (href) {
    return (
      <Link
        href={href}
        color={color}
        size={size}
        className={buttonClassName}
        style={{
          width,
        }}
        {...htmlProps}
      >
        {buttonLabel}
      </Link>
    );
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={buttonClassName}
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
      {!isLoading && buttonLabel}
    </button>
  );
}

export default Button;