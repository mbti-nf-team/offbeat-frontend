'use client';

import {
  memo, PropsWithChildren, useRef, useState,
} from 'react';

import { useActionKeyEvent } from '@nf-team/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <div className={clsx(styles.accordionWrapper, wrapperClassName)}>
      <motion.div
        layout
        ref={ref}
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
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            onAnimationComplete={(definition: { height: 'auto' | number; }) => {
              if (definition.height === 'auto') {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            animate={{ height: 'auto' }}
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(Accordion);
