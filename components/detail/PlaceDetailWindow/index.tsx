'use client';

import Image from 'next/image';

import { checkEmpty, checkNumber } from '@nft-team/core';
import { DelayRenderComponent, GlobalPortal } from '@nft-team/react';
import clsx from 'clsx';
import { motion, useIsomorphicLayoutEffect, Variants } from 'framer-motion';

import Accordion from 'components/common/Accordion';
import Button from 'components/common/Button';
import ResultCard from 'components/common/ResultCard';
import Spinner from 'components/common/Spinner';
import StarRating from 'components/common/StarRating';
import { CloseIcon } from 'lib/assets/icons';
import { PlacesWithSearchResult } from 'lib/types/google.maps';

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

const NAVER_MAX_REVIEW_COUNT = 1000;
const GOOGLE_MAX_REVIEW_COUNT = 4;

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

  useIsomorphicLayoutEffect(() => {
    if (isVisible) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [isVisible]);

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
              <Spinner isLoading={isVisibleLoading} size="medium" />
              {!isLoading && placeDetail && (
                <>
                  <h1 className={styles.bodyHeader}>{placeDetail?.name}</h1>
                  {placeDetail?.photos?.[0] && (
                    <div className={styles.placeImageWrapper}>
                      <Image
                        width={382}
                        height={382}
                        quality={100}
                        className={styles.placeImage}
                        src={placeDetail.photos[0].getUrl()}
                        alt={placeDetail?.name}
                      />
                    </div>
                  )}
                  <div className={styles.ratingWrapper}>
                    <StarRating rating={placeDetail?.rating} type="detail" />
                    <div className={styles.ratingText}>{placeDetail?.rating}</div>
                  </div>
                  <div className={styles.recommendDescription}>
                    {'고국의 맛과 분위기를 한몸에 느낄 수 있어요.\n 여행지에서 한국의 맛을 찾고싶다면, 방문 필수!'}
                  </div>
                  <Accordion
                    title="구글 리뷰"
                    counter={placeDetail?.user_ratings_total}
                    counterColor={checkEmpty(placeDetail?.reviews).filter(({ language }) => language === 'ko').length >= GOOGLE_MAX_REVIEW_COUNT ? 'danger' : 'positive'}
                    wrapperClassName={styles.reviewAccordionWrapper}
                  >
                    <div className={styles.reviewsWrapper}>
                      {placeDetail?.reviews?.map((review) => (
                        <a href={review.author_url} key={review.time} style={{ marginBottom: '10px' }}>
                          <div>{`작성자: ${review.author_name}`}</div>
                          <div>{`언어: ${review.language}`}</div>
                          <div>{review.relative_time_description}</div>
                          <div>{review.text}</div>
                        </a>
                      ))}
                    </div>
                  </Accordion>
                  {placeDetail?.searchBlogPost.status === 'fulfilled' && (
                    <Accordion
                      title="네이버 검색결과"
                      counterColor={checkNumber(placeDetail?.searchBlogPost.value.total_count) > NAVER_MAX_REVIEW_COUNT ? 'danger' : 'positive'}
                      counter={placeDetail?.searchBlogPost.value.total_count}
                      wrapperClassName={styles.reviewAccordionWrapper}
                    >
                      <div className={styles.reviewsWrapper}>
                        {placeDetail?.searchBlogPost.value.posts.map(({
                          title, description, link, thumbnail,
                        }) => (
                          <ResultCard
                            key={title}
                            title={title}
                            description={description}
                            url={link}
                            thumbnail={thumbnail}
                          />
                        ))}
                      </div>
                    </Accordion>
                  )}
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
