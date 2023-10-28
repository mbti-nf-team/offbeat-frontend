'use client';

import { useCallback, useRef } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { checkEmpty, checkNumber } from '@nf-team/core';
import { DelayRenderComponent, GlobalPortal } from '@nf-team/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Accordion from '@/components/common/Accordion';
import Button from '@/components/common/Button';
import ResultCard from '@/components/common/ResultCard';
import ReviewCard from '@/components/common/ReviewCard';
import Spinner from '@/components/common/Spinner';
import StarRating from '@/components/common/StarRating';
import useHideOnScroll from '@/hooks/useHideOnScroll';
import useRenderToast from '@/hooks/useRenderToast';
import { paramsSerializer } from '@/lib/apis';
import { CloseIcon, ShareIcon } from '@/lib/assets/icons';
import { PlacesWithSearchResult } from '@/lib/types/search';
import { bottomToUpVariants } from '@/styles/framerVariants';

import styles from './index.module.scss';

const NAVER_MAX_REVIEW_COUNT = 1000;
const GOOGLE_MAX_REVIEW_COUNT = 4;

type Props = {
  isVisible: boolean;
  isLoading: boolean;
  onClose: () => void;
  placeDetail?: PlacesWithSearchResult<true>;
};

function PlaceDetailWindow({
  isVisible, onClose, placeDetail, isLoading,
}: Props) {
  const placeDetailWindowRef = useRef<HTMLDivElement>(null);

  const renderToast = useRenderToast();
  const params = useSearchParams();
  const { hide, onScroll } = useHideOnScroll({
    rootRef: placeDetailWindowRef, disabled: !isVisible,
  });

  const isVisibleLoading = isVisible && (isLoading || !placeDetail);

  const googleReviewCount = checkNumber(placeDetail?.reviews?.length);
  const koreanReviewCount = checkEmpty(placeDetail?.reviews).filter(({ language }) => language === 'ko').length;
  const blogCount = checkNumber(placeDetail?.searchBlogPost?.total_count);

  const onClickShare = useCallback(async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/maps?${paramsSerializer({
        country: params.get('country'),
        id: placeDetail?.place_id,
        name: placeDetail?.name,
      })}`;

      await navigator.clipboard.writeText(shareUrl);

      renderToast('URL을 복사했습니다.', { type: 'success' });
    } catch (error) {
      renderToast('URL 복사에 실패했습니다.', { type: 'error' });
    }
  }, [placeDetail?.place_id, placeDetail?.name]);

  const displayDetailInfoText = useCallback(() => {
    if (googleReviewCount < 3) {
      return '별점이 없어 방문자 비율을 구분하기 어려워요.';
    }

    if (blogCount > NAVER_MAX_REVIEW_COUNT) {
      return '고국의 맛과 분위기를 한몸에 느낄 수 있어요.\n 여행지에서 한국의 맛을 찾고싶다면, 방문 필수!';
    }

    if (koreanReviewCount >= GOOGLE_MAX_REVIEW_COUNT && blogCount > 100) {
      return '한국인 입맛에도 딱이지만,\n현지인들에게도 인기 만점!';
    }

    if (koreanReviewCount <= 1 && blogCount <= 10) {
      return '진짜 로컬 맛집!\n구글에 첫 한국인 리뷰를 남겨보세요.';
    }

    return '현지인 리뷰 비중이 높아요.';
  }, [blogCount, koreanReviewCount, googleReviewCount]);

  return (
    <DelayRenderComponent isVisible={isVisible}>
      <GlobalPortal>
        <motion.div
          animate={isVisible ? 'visible' : 'none'}
          initial="none"
          variants={bottomToUpVariants}
          className={styles.placeDetailWindowWrapper}
        >
          <div
            ref={placeDetailWindowRef}
            onScroll={onScroll}
            className={styles.placeDetailContentsWrapper}
          >
            <div className={styles.header}>
              <div className={styles.headerContentsWrapper}>
                <Button
                  type="button"
                  color="ghost"
                  size="medium"
                  onClick={onClose}
                  hasPseudoSelectorStyle={false}
                  onlyIcon={<CloseIcon />}
                />
                <Button
                  type="button"
                  color="ghost"
                  size="medium"
                  onClick={onClickShare}
                  hasPseudoSelectorStyle={false}
                  disabled={isLoading || !placeDetail}
                  onlyIcon={
                    <ShareIcon className={clsx((isLoading || !placeDetail) && styles.shareIcon)} />
                  }
                />
              </div>
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
                  {placeDetail?.thumbnail && (
                    <div className={styles.placeImageWrapper}>
                      <Image
                        width={382}
                        height={382}
                        quality={100}
                        className={styles.placeImage}
                        src={placeDetail.thumbnail}
                        alt={placeDetail?.name}
                      />
                    </div>
                  )}
                  <div className={styles.ratingWrapper}>
                    <StarRating rating={placeDetail?.rating} type="detail" />
                    <div className={styles.ratingText}>
                      {placeDetail?.rating ? checkNumber(placeDetail?.rating).toFixed(1) : '별점 없음'}
                    </div>
                  </div>
                  <div className={styles.recommendDescription}>
                    {displayDetailInfoText()}
                  </div>
                  <Accordion
                    title="구글 리뷰"
                    counter={placeDetail?.user_ratings_total}
                    counterColor={koreanReviewCount ? 'danger' : 'positive'}
                    wrapperClassName={styles.reviewAccordionWrapper}
                  >
                    <div className={styles.reviewWrapper}>
                      {placeDetail?.reviews?.map((review, index, array) => (
                        <ReviewCard
                          key={review.time}
                          author={review.author_name}
                          isLocalReview={review.language !== 'ko'}
                          profileUrl={review.profile_photo_url}
                          rating={review.rating}
                          review={review.text}
                          createdAt={review.relative_time_description}
                          hasSeparator={index !== array.length - 1}
                        />
                      ))}
                    </div>
                  </Accordion>
                  <Accordion
                    title="네이버 검색결과"
                    counterColor={blogCount ? 'danger' : 'positive'}
                    counter={checkNumber(placeDetail?.searchBlogPost?.total_count)}
                    wrapperClassName={styles.reviewAccordionWrapper}
                  >
                    <div className={styles.resultWrapper}>
                      {checkEmpty(placeDetail?.searchBlogPost?.posts).map(({
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
                </>
              )}
            </div>
          </div>
          {placeDetail?.url && (
            <motion.div
              animate={!hide ? 'visible' : 'none'}
              initial="none"
              variants={bottomToUpVariants}
              className={styles.buttonWrapper}
            >
              <Button
                isExternalLink
                href={placeDetail?.url}
                color="highlight"
                width="calc(100% - 80px)"
              >
                Google로 이동
              </Button>
            </motion.div>
          )}
        </motion.div>
      </GlobalPortal>
    </DelayRenderComponent>
  );
}

export default PlaceDetailWindow;
