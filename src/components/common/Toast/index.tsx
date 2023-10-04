'use client';

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { AnimationDefinition, motion, Variants } from 'framer-motion';
import { shallow } from 'zustand/shallow';

import { ErrorCircleIcon, SuccessCircleIcon } from '@/lib/assets/icons';
import useToastStore, { ToastStore } from '@/stores/toast';

import styles from './index.module.scss';

const logoVariants: Variants = {
  none: {
    opacity: 0,
    transform: 'translateY(100%)',
    transitionEnd: {
      visibility: 'hidden',
    },
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    visibility: 'visible',
  },
};

const toastSelector = (state: ToastStore) => ({
  isRender: state.isRender,
  type: state.type,
  message: state.message,
  delay: state.delay,
  closeToast: state.closeToast,
});

function Toast() {
  const {
    isRender, message, closeToast, delay, type,
  } = useToastStore(toastSelector, shallow);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);

  const handleAnimationComplete = useCallback((definition: AnimationDefinition) => {
    if (definition === 'none') {
      closeToast();
    }
  }, []);

  const icon = useMemo(() => ({
    error: <ErrorCircleIcon className={styles.toastIcon} />,
    success: <SuccessCircleIcon className={styles.toastIcon} />,
    info: <ErrorCircleIcon className={styles.toastIcon} />,
  }[type]), [type]);

  useEffect(() => {
    if (isOpenToast) {
      timer.current = setTimeout(() => {
        setIsOpenToast(false);
        timer.current = null;
      }, delay);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isOpenToast, delay]);

  useEffect(() => {
    if (isRender) {
      setIsOpenToast(true);
    }
  }, [isRender]);

  return (
    <motion.div
      animate={isOpenToast ? 'visible' : 'none'}
      initial="none"
      variants={logoVariants}
      className={styles.toastContainer}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className={styles.toastBox}>
        {icon}
        <div className={styles.toastMessage}>
          {message}
        </div>
      </div>
    </motion.div>
  );
}

export default Toast;
