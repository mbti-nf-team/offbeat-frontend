'use client';

import { motion, Variants } from 'framer-motion';
import { PlacesWithSearchResult } from 'lib/types/google.maps';

import DelayRenderComponent from 'components/common/DelayRenderComponent';
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
  placeDetails: PlacesWithSearchResult<true>;
};

function PlaceDetailWindow({ isVisible, onClose, placeDetails }: Props) {
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
            <button type="button" onClick={onClose}>닫기</button>
            <div style={{
              background: 'white',
              padding: 15,
            }}
            >
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
            </div>
          </div>
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default PlaceDetailWindow;
