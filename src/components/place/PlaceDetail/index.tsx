'use client';

import { useCallback, useMemo, useRef } from 'react';

import { notFound, useRouter } from 'next/navigation';

import { Language, Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, checkNumber } from '@nf-team/core';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Accordion from '@/components/common/Accordion';
import Button from '@/components/common/Button';
import ResultCard from '@/components/common/ResultCard';
import ReviewCard from '@/components/common/ReviewCard';
import Spinner from '@/components/common/Spinner';
import StarRating from '@/components/common/StarRating';
import useRemoveFavoritePlaceMutation from '@/hooks/apis/mutations/useRemoveFavoritePlaceMutation';
import useSaveFavoritePlaceMutation from '@/hooks/apis/mutations/useSaveFavoritePlaceMutation';
import useGetPlace from '@/hooks/apis/queries/useGetPlace';
import useGetSearchPlace from '@/hooks/apis/queries/useGetSearchPlace';
import useActivityLog from '@/hooks/useActivityLog';
import useHideOnScroll from '@/hooks/useHideOnScroll';
import {
  ArchiveOutlineIcon, ArchiveSolidIcon, CloseIcon, ShareIcon,
} from '@/lib/assets/icons';
import { User } from '@/lib/types/auth';
import { EventName } from '@/lib/types/event';
import useToastStore from '@/stores/toast';
import { bottomToUpVariants } from '@/styles/framerVariants';

import PhotoSlider from '../PhotoSlider';

import styles from './index.module.scss';

const NAVER_MAX_REVIEW_COUNT = 1000;
const GOOGLE_MAX_REVIEW_COUNT = 4;

type Props = {
  placeId?: string;
  onClose: () => void;
  user: User | null;
  isModal?: boolean;
};

function PlaceDetail({
  placeId, onClose, user, isModal,
}: Props) {
  const router = useRouter();
  const {
    data: placesWithSearchResult, isFetching: isLoading, isSuccess,
  } = useGetSearchPlace({ placeId });

  const { data: place } = useGetPlace(placeId);

  const { mutate: saveFavoritePlaceMutate } = useSaveFavoritePlaceMutation();
  const { mutate: removeFavoritePlaceMutate } = useRemoveFavoritePlaceMutation();

  const placeDetail = placesWithSearchResult?.result;

  if ((isSuccess && placesWithSearchResult.status !== Status.OK)) {
    notFound();
  }

  const { sendEvent } = useActivityLog();
  const placeDetailWindowRef = useRef<HTMLDivElement>(null);

  const { renderToast } = useToastStore(['renderToast']);
  const { hide, onScroll } = useHideOnScroll({
    rootRef: isModal ? placeDetailWindowRef : undefined, disabled: false,
  });

  const isVisibleLoading = isLoading || !placeDetail;

  const googleReviewCount = checkNumber(placeDetail?.reviews?.length);
  const koreanReviewCount = checkEmpty(placeDetail?.reviews).filter(({
    language, original_language,
  }) => (original_language ? original_language === Language.ko : language === Language.ko)).length;
  const blogCount = checkNumber(placeDetail?.searchBlogPost?.total_count);

  const goToExternalLink = (eventName: EventName) => (url?: string) => sendEvent({
    name: eventName,
    action: 'click',
    value: {
      url,
    },
  });

  const onClickArchive = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!placeDetail?.country?.short_name
      || !placeDetail?.place_id
      || !placeDetail?.geometry?.location.lat
      || !placeDetail?.geometry?.location.lng) {
      return;
    }

    if (place?.is_favorite) {
      removeFavoritePlaceMutate(placeDetail.place_id);
      return;
    }

    saveFavoritePlaceMutate({
      country_code: placeDetail.country.short_name,
      google_place_id: placeDetail.place_id,
      latitude: placeDetail.geometry.location.lat,
      longitude: placeDetail.geometry.location.lng,
    });
  };

  const onClickShare = useCallback(async () => {
    try {
      const shareUrl = `${process.env.NEXT_PUBLIC_ORIGIN}/place/${placeDetail?.place_id}`;

      await navigator.clipboard.writeText(shareUrl);

      sendEvent({
        name: 'share_place_detail',
        action: 'click',
        type: 'success',
        value: {
          url: shareUrl,
          placeId: placeDetail?.place_id,
          placeName: placeDetail?.name,
        },
      });

      renderToast('URL을 복사했습니다.', { type: 'success' });
    } catch (error) {
      sendEvent({
        name: 'share_place_detail',
        action: 'click',
        type: 'error',
        value: {
          error,
          placeId: placeDetail?.place_id,
          placeName: placeDetail?.name,
        },
      });

      renderToast('URL 복사에 실패했습니다.', { type: 'error' });
    }
  }, [placeDetail?.place_id, placeDetail?.name]);

  const displayDetailInfoText = useMemo(() => {
    if (googleReviewCount < 3) {
      return '별점이 없어 방문자 비율을 구분하기 어려워요.';
    }

    if (blogCount > NAVER_MAX_REVIEW_COUNT) {
      return '한국의 분위기를 한몸에 느낄 수 있어요.\n여행지에서 K-바이브를 느끼고 싶다면, 방문 필수!';
    }

    if (koreanReviewCount >= GOOGLE_MAX_REVIEW_COUNT || blogCount > 100) {
      return '한국인들에게 입소문 난 장소지만\n현지인들에게도 인기 만점 스팟!';
    }

    if (koreanReviewCount <= 1 || blogCount <= 10) {
      return '여기는 ✌진짜✌ 로컬 스팟!\n구글에 한국인 리뷰를 남겨보세요.';
    }

    return '현지인 리뷰 비중이 높아요.';
  }, [blogCount, koreanReviewCount, googleReviewCount]);

  return (
    <>
      <div
        ref={placeDetailWindowRef}
        onScroll={onScroll}
        className={styles.placeDetailContentsWrapper}
      >
        <div
          className={clsx(styles.headerButtonWrapper, styles.closeButtonWrapper)}
        >
          <Button
            type="button"
            color="ghost"
            size="medium"
            onClick={onClose}
            hasPseudoSelectorStyle={false}
            onlyIcon={<CloseIcon />}
          />
        </div>
        <div
          className={clsx(styles.headerButtonWrapper, styles.archiveButtonWrapper)}
        >
          <Button
            type="button"
            color="ghost"
            size="medium"
            onClick={onClickArchive}
            hasPseudoSelectorStyle={false}
            disabled={isVisibleLoading}
            onlyIcon={(
              <>
                {place?.is_favorite ? (
                  <ArchiveSolidIcon
                    className={clsx(isVisibleLoading && styles.disabledIcon)}
                  />
                ) : (
                  <ArchiveOutlineIcon
                    className={clsx(isVisibleLoading && styles.disabledIcon)}
                  />
                )}
              </>
            )}
          />
        </div>
        <div
          className={clsx(styles.headerButtonWrapper, styles.shareButtonWrapper)}
        >
          <Button
            type="button"
            color="ghost"
            size="medium"
            onClick={onClickShare}
            hasPseudoSelectorStyle={false}
            disabled={isVisibleLoading}
            onlyIcon={
              <ShareIcon className={clsx(isVisibleLoading && styles.disabledIcon)} />
            }
          />
        </div>
        <div
          className={clsx(styles.placeDetailBody, {
            [styles.loading]: isVisibleLoading,
          })}
        >
          <Spinner isLoading={isVisibleLoading} size="medium" />
          {!isVisibleLoading && (
          <>
            <h1 className={styles.bodyHeader}>{placeDetail?.name}</h1>
            <PhotoSlider
              photoUrls={placeDetail.photoUrls}
              placeName={placeDetail?.name}
            />
            <div className={styles.ratingWrapper}>
              <StarRating rating={placeDetail?.rating} type="detail" />
              <div className={styles.ratingText}>
                {placeDetail?.rating ? checkNumber(placeDetail?.rating).toFixed(1) : '별점 없음'}
              </div>
            </div>
            <div className={styles.recommendDescription}>
              {displayDetailInfoText}
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
                    isKoreanReview={review?.original_language
                      ? review.original_language === Language.ko
                      : review.language === Language.ko}
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
                    onClickCard={goToExternalLink('go_to_naver_blog')}
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
            onClick={() => goToExternalLink('go_to_google_map')(placeDetail?.url)}
            color="highlight"
            width="calc(100% - 80px)"
          >
            Google로 이동
          </Button>
        </motion.div>
      )}
    </>
  );
}

export default PlaceDetail;
