'use client';

import { PropsWithChildren } from 'react';

import {
  DelayRenderComponent, GlobalPortal, useIsomorphicLayoutEffect, useUnmount,
} from '@nf-team/react';
import { motion } from 'framer-motion';

import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import { bottomToUpVariants } from '@/styles/framerVariants';

import styles from './modal.module.scss';

function Modal({ children }: PropsWithChildren) {
  const { isOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['isOpenPlaceDetailWindow']);

  useIsomorphicLayoutEffect(() => {
    if (isOpenPlaceDetailWindow) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [isOpenPlaceDetailWindow]);

  useUnmount(() => {
    document.body.style.overflow = '';
  });

  return (
    <DelayRenderComponent isVisible={isOpenPlaceDetailWindow}>
      <GlobalPortal>
        <motion.div
          animate={isOpenPlaceDetailWindow ? 'visible' : 'none'}
          initial="none"
          variants={bottomToUpVariants}
          className={styles.placeDetailWindowWrapper}
        >
          {children}
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default Modal;
