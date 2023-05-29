'use client';

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
  placeDetails: PlacesWithSearchResult<true>;
};

function PlaceDetailWindow({
  isVisible, onClose, placeDetails, isLoading,
}: Props) {
  console.log(placeDetails.searchBlogPost);

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
              className={styles.placeDetailBody}
            >
              <Spinner isLoading={isVisible && isLoading} size="large" />
              {!isLoading && (
                <>
                  <h1>{placeDetails?.name}</h1>
                  <div>{placeDetails?.formatted_address}</div>
                  <div>{`별점: ${placeDetails?.rating}`}</div>
                  <div>{`평점 수: ${placeDetails?.user_ratings_total}`}</div>
                  <div>{`웹사이트: ${placeDetails?.website}`}</div>
                  <div>{`구글 맵 이동: ${placeDetails?.url}`}</div>
                  <div>
                    {placeDetails?.photos?.map((photo) => (
                      <img key={photo.getUrl()} src={photo.getUrl()} height="100px" width="100px" alt="이미지" />
                    ))}
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <h4>리뷰</h4>
                    {placeDetails?.reviews?.map((review) => (
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
