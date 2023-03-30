'use client';

import { motion, Variants } from 'framer-motion';
import useTimeout from 'hooks/useTimeout';
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
  const { isRender, message, closeToast } = useToastStore((state) => ({
    isRender: state.isRender,
    message: state.message,
    closeToast: state.closeToast,
  }), shallow);

  useTimeout(() => closeToast(), 3000);

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
