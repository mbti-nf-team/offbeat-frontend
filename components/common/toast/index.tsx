'use client';

import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { ControlsAnimationDefinition, motion, Variants } from 'framer-motion';
import useToastStore, { ToastStore } from 'stores/toast';
import { shallow } from 'zustand/shallow';

import ErrorIcon from 'lib/assets/icons/error.svg';

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

  const handleAnimationComplete = useCallback((definition: ControlsAnimationDefinition) => {
    if (definition === 'none') {
      closeToast();
    }
  }, []);

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
        {type === 'error' && (
          <ErrorIcon className={styles.toastIcon} />
        )}
        <div className={styles.toastMessage}>
          {message}
        </div>
      </div>
    </motion.div>
  );
}

export default Toast;
