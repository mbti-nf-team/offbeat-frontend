'use client';

import useToastStore from 'stores/toast';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

function Toast() {
  const { isRender, message } = useToastStore((state) => ({
    isRender: state.isRender, message: state.message,
  }), shallow);

  if (!isRender) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>{message}</div>
  );
}

export default Toast;
