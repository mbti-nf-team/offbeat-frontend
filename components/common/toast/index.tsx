'use client';

import { useEffect, useRef } from 'react';

import { motion, Variants } from 'framer-motion';
import useToastStore from 'stores/toast';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

const logoVariants: Variants = {
  none: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
};

function Toast() {
  const {
    isRender, message, closeToast, delay,
  } = useToastStore((state) => ({
    isRender: state.isRender,
    message: state.message,
    delay: state.delay,
    closeToast: state.closeToast,
  }), shallow);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isRender) {
      timer.current = setTimeout(() => {
        closeToast();
        timer.current = null;
      }, delay);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isRender, delay]);

  return (
    <motion.div
      animate={isRender ? 'visible' : 'none'}
      variants={logoVariants}
      className={styles.toastContainer}
    >
      {message}
    </motion.div>
  );
}

export default Toast;
