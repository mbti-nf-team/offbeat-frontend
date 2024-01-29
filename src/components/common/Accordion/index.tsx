'use client';

import {
  memo, PropsWithChildren, useEffect, useRef, useState,
} from 'react';

import { useActionKeyEvent } from '@nf-team/react';
import clsx from 'clsx';

import { ChevronRightIcon } from '@/lib/assets/icons';
import { numberWithComma } from '@/utils';

import styles from './index.module.scss';

type Props = {
  title: string;
  counter?: number;
  counterColor?: 'positive' | 'danger';
  wrapperClassName?: string;
};

function Accordion({
  title, counter, counterColor = 'positive', wrapperClassName, children,
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (counter) {
      setIsOpen(!isOpen);
    }
  };

  const onKeyDown = useActionKeyEvent<HTMLDivElement>(['Enter', 'NumpadEnter'], toggleOpen);

  useEffect(() => {
    if (isOpen) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isOpen]);

  return (
    <div ref={ref} className={clsx(styles.accordionWrapper, wrapperClassName)}>
      <div
        tabIndex={0}
        role="menuitem"
        onClick={toggleOpen}
        onKeyDown={onKeyDown}
        className={clsx(styles.accordionHeader, !counter && styles.zeroResult)}
      >
        <ChevronRightIcon
          className={clsx(
            styles.chevronIcon,
            isOpen && styles.isOpenAccordion,
            !counter && styles.zeroResult,
          )}
        />
        <div
          className={styles.title}
        >
          {title}
        </div>
        <div className={clsx(styles.counter, [styles[counterColor]])}>
          {numberWithComma(counter)}
        </div>
      </div>
      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

export default memo(Accordion);
