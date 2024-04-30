'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import {
  DelayRenderComponent, GlobalPortal, useBoolean, useIsomorphicLayoutEffect, useUnmount,
} from '@nf-team/react';
import { motion } from 'framer-motion';

import PlaceDetail from '@/components/place/PlaceDetail';
import { User } from '@/lib/types/auth';
import { bottomToUpVariants } from '@/styles/framerVariants';

import styles from './index.module.scss';

type Props = {
  placeId?: string;
  user: User | null;
};

function PlacePage({ placeId, user }: Props) {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useBoolean(false);

  const onDismiss = () => {
    onClose();

    setTimeout(() => {
      router.back();
    }, 300);
  };

  useIsomorphicLayoutEffect(() => {
    document.body.style.overflow = '';
  }, []);

  useUnmount(() => {
    document.body.style.overflow = 'hidden';
  });

  useEffect(() => {
    onOpen();
  }, []);

  return (

    <DelayRenderComponent isVisible={isOpen}>
      <GlobalPortal>
        <motion.div
          animate={isOpen ? 'visible' : 'none'}
          initial="none"
          variants={bottomToUpVariants}
          className={styles.placeDetailWindowWrapper}
        >
          <PlaceDetail isModal placeId={placeId} onClose={onDismiss} user={user} />
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default PlacePage;
