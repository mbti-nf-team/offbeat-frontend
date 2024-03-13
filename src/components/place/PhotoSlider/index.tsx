import { useState } from 'react';

import { isEmpty } from '@nf-team/core';
import {
  AnimatePresence, motion, Variants, wrap,
} from 'framer-motion';

import Button from '@/components/common/Button';
import { NarrowArrowLeftIcon, NarrowArrowRightIcon } from '@/lib/assets/icons';

import styles from './index.module.scss';

type Props = {
  photoUrls: string[];
  placeName: string;
};

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

function PhotoSlider({ photoUrls, placeName }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, photoUrls.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      {!isEmpty(photoUrls) && (
        <div className={styles.placeImageWrapper}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                  return;
                }

                if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              width={382}
              height={382}
              className={styles.placeImage}
              src={photoUrls[imageIndex]}
              alt={`${placeName}-image-${imageIndex}`}
            />
          </AnimatePresence>
          <Button onlyIcon={<NarrowArrowLeftIcon />} onClick={() => paginate(-1)} color="ghost" className={styles.prev} />
          <Button onlyIcon={<NarrowArrowRightIcon />} onClick={() => paginate(1)} color="ghost" className={styles.next} />
        </div>
      )}
    </>
  );
}

export default PhotoSlider;
