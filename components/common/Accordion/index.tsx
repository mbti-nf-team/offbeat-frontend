'use client';

import { PropsWithChildren, useState } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import { ChevronRightIcon } from 'lib/assets/icons';

import { numberWithComma } from 'utils';

import styles from './index.module.scss';

type Props = {
  title: string;
  counter: number;
  counterColor?: 'positive' | 'danger';
};

const accordionVariants: Variants = {
  none: {
    opacity: 0,
    transform: 'translateY(-100%)',
    height: '0px',
    overflow: 'hidden',
    transitionEnd: {
      visibility: 'hidden',
    },
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    visibility: 'visible',
    paddingTop: '8px',
    paddingBottom: '40px',
    height: 'auto',
  },
};

function Accordion({
  title, counter, counterColor = 'positive', children,
}: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const onKeyDown = useActionKeyEvent<HTMLDivElement>(['Enter', 'NumpadEnter'], toggleOpen);

  return (
    <div className={styles.accordionWrapper}>
      <motion.div
        layout
        className={styles.accordionHeader}
        onClick={toggleOpen}
        tabIndex={0}
        role="menuitem"
        onKeyDown={onKeyDown}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ChevronRightIcon className={clsx(styles.chevronIcon, isOpen && styles.isOpenAccordion)} />
        <div className={styles.title}>
          {title}
        </div>
        <div className={clsx(styles.counter, [styles[counterColor]])}>
          {numberWithComma(counter)}
        </div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          layout
          animate={isOpen ? 'visible' : 'none'}
          initial="none"
          variants={accordionVariants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Accordion;
