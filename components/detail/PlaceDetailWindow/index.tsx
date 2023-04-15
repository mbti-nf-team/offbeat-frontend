'use client';

import { motion, Variants } from 'framer-motion';

import GlobalPortal from 'components/common/GlobalPortal';

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

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

function PlaceDetailWindow({ isVisible, onClose }: Props) {
  return (
    <GlobalPortal>
      <motion.div
        animate={isVisible ? 'visible' : 'none'}
        initial="none"
        variants={logoVariants}
        className={styles.placeDetailWindowWrapper}
      >
        <div className={styles.placeDetailContentsWrapper}>
          <button type="button" onClick={onClose}>닫기</button>
          <div>
            contents
          </div>
        </div>
      </motion.div>
    </GlobalPortal>
  );
}

export default PlaceDetailWindow;
