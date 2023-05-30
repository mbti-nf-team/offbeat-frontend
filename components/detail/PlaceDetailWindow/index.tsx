'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { CloseIcon } from 'lib/assets/icons';
import { PlacesWithSearchResult } from 'lib/types/google.maps';

import Button from 'components/common/button';
import DelayRenderComponent from 'components/common/DelayRenderComponent';
import GlobalPortal from 'components/common/GlobalPortal';
import Spinner from 'components/common/Spinner';

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
  isLoading: boolean;
  onClose: () => void;
  placeDetail: PlacesWithSearchResult<true> | null;
};

function PlaceDetailWindow({
  isVisible, onClose, placeDetail, isLoading,
}: Props) {
  console.log(placeDetail);

  const isVisibleLoading = isVisible && (isLoading || !placeDetail);

  return (
    <DelayRenderComponent isVisible={isVisible}>
      <GlobalPortal>
        <motion.div
          animate={isVisible ? 'visible' : 'none'}
          initial="none"
          variants={logoVariants}
          className={styles.placeDetailWindowWrapper}
        >
          <div className={styles.placeDetailContentsWrapper}>
            <div className={styles.header}>
              <Button
                type="button"
                color="ghost"
                size="medium"
                onClick={onClose}
                className={styles.closeButton}
                hasPseudoSelectorStyle={false}
                onlyIcon={<CloseIcon />}
              />
            </div>
            <div
              className={clsx(styles.placeDetailBody, {
                [styles.loading]: isVisibleLoading,
              })}
            >
              <Spinner isLoading={isVisibleLoading} size="large" />
              {!isLoading && placeDetail && (
                <>
                  <h1 className={styles.bodyHeader}>{placeDetail?.name}</h1>
                  {placeDetail?.photos?.[0] && (
                    <div className={styles.placeImageWrapper}>
                      <Image
                        width={0}
                        height={0}
                        quality={100}
                        sizes="100vw"
                        className={styles.placeImage}
                        src={placeDetail.photos[0].getUrl()}
                        alt={placeDetail?.name}
                      />
                    </div>
                  )}
                  <div>{`별점: ${placeDetail?.rating}`}</div>
                  <div>{placeDetail?.formatted_address}</div>
                  <div>{`평점 수: ${placeDetail?.user_ratings_total}`}</div>
                  <div>{`웹사이트: ${placeDetail?.website}`}</div>
                  <div>{`구글 맵 이동: ${placeDetail?.url}`}</div>
                  <div style={{ marginBottom: '10px' }}>
                    <h4>리뷰</h4>
                    {placeDetail?.reviews?.map((review) => (
                      <a href={review.author_url} key={review.time} style={{ marginBottom: '10px' }}>
                        <div>{`작성자: ${review.author_name}`}</div>
                        <div>{`언어: ${review.language}`}</div>
                        <div>{review.relative_time_description}</div>
                        <div>{review.text}</div>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default PlaceDetailWindow;
