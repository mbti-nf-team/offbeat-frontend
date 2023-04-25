'use client';

import { PropsWithChildren, ReactNode } from 'react';

import clsx from 'clsx';
import useActionKeyEvent from 'hooks/useActionKeyEvent';

import styles from './index.module.scss';

type Color = 'highlight' | 'done' | 'positive' | 'danger' | 'active' | 'attention' | 'relate';

type Props = {
  onClick?: () => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  type?: 'default' | 'reverse';
  color: Color;
  size?: 'small' | 'medium';
};

function Label({
  onClick, prefixIcon, suffixIcon, color, type = 'default', size = 'medium', children,
}: PropsWithChildren<Props>) {
  const onKeyDown = useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], () => {
    onClick?.();
  });

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={clsx(styles.labelWrapper, {
        [styles.button]: !!onClick,
        [styles[size]]: size,
        [styles[type]]: type,
        [styles[`default-${size}`]]: type === 'default',
        [styles[`default-${color}`]]: type === 'default',
        [styles[`reverse-${color}`]]: type === 'reverse',
      })}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {prefixIcon && (
        <div className={clsx(styles.iconWrapper, styles.prefixIcon)}>{prefixIcon}</div>
      )}
      <div>
        {children}
      </div>
      {suffixIcon && (
        <div className={clsx(styles.iconWrapper, styles.suffixIcon)}>{suffixIcon}</div>
      )}
    </div>
  );
}

export default Label;