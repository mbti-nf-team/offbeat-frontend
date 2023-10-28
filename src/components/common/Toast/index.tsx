'use client';

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { AnimationDefinition, motion } from 'framer-motion';

import { ErrorCircleIcon, SuccessCircleIcon } from '@/lib/assets/icons';
import useToastStore from '@/stores/toast';
import { bottomToUpVariants } from '@/styles/framerVariants';

import styles from './index.module.scss';

function Toast() {
  const {
    isRender, message, closeToast, delay, type,
  } = useToastStore(['closeToast', 'isRender', 'message', 'delay', 'type']);

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
      variants={bottomToUpVariants}
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
