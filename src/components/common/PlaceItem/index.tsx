'use client';

import Image from 'next/image';

import { checkNumber } from '@nf-team/core';
import { useActionKeyEvent } from '@nf-team/react';

import useRemoveFavoritePlaceMutation from '@/hooks/apis/mutations/useRemoveFavoritePlaceMutation';
import { ArchiveSolidIcon } from '@/lib/assets/icons';
import { NaverSearchBlog } from '@/lib/types/blog';
import { numberWithComma } from '@/utils';

import Button from '../Button';
import StarRating from '../StarRating';

import styles from './index.module.scss';

type Props<T> = {
  placeId: string;
  photoUrls: string[];
  placeName: string;
  rating: number;
  userRatingsTotal?: number;
  searchBlogPost?: T extends true ? PromiseSettledResult<NaverSearchBlog<true>> : undefined;
  isSavedPlace?: T;
  nation: T extends true ? string : undefined;
  address: T extends true ? string : undefined;
  distance: T extends true ? string : undefined;
  onClick?: (placeId: string) => void;
  wrapperRef?: ((node?: Element | null | undefined) => void);
  refetch: () => void;
};

function PlaceItem<T = boolean>({
  photoUrls, placeName, rating, userRatingsTotal, placeId,
  searchBlogPost, isSavedPlace, nation, address, distance, onClick, wrapperRef, refetch,
}: Props<T>) {
  const { mutate: removeFavoritePlaceMutate } = useRemoveFavoritePlaceMutation();
  const onKeyDown = useActionKeyEvent<HTMLLIElement, [string]>(['Enter', 'NumpadEnter'], (_, id) => onClick?.(id));

  const removeFavoritePlace = () => {
    removeFavoritePlaceMutate(placeId);
    refetch();
  };

  return (
    <li
      ref={wrapperRef}
      tabIndex={0}
      onClick={() => onClick?.(placeId)}
      onKeyDown={(e) => onKeyDown(e, placeId)}
      role="menuitem"
      className={styles.placeItem}
    >
      <div className={styles.photos}>
        {photoUrls.map((photo, index) => (
          <Image key={photo} src={photo} alt={`${placeName}-image-${index}`} width={160} height={160} className={styles.photo} />
        ))}
      </div>
      <div className={styles.placeInfoWrapper}>
        <div className={styles.placeName}>
          <div>{placeName}</div>
          {isSavedPlace && (
            <Button size="small" onClick={removeFavoritePlace} onlyIcon={<ArchiveSolidIcon />} color="ghost" />
          )}
        </div>
        <div className={styles.placeRatingWrapper}>
          <div className={styles.placeRating}>{rating}</div>
          <StarRating rating={checkNumber(rating)} type="list" />
          <div className={styles.placeUserRatingsTotal}>{`(${checkNumber(userRatingsTotal)})`}</div>
        </div>
        {searchBlogPost?.status === 'fulfilled' && (
          <div className={styles.searchTotal}>{`네이버 검색결과 ${numberWithComma(checkNumber(searchBlogPost?.value?.total_count))}개`}</div>
        )}
        {isSavedPlace && (
          <div className={styles.addressInfo}>
            <div className={styles.nation}>{nation}</div>
            <div>∙</div>
            <div className={styles.address}>{address}</div>
            <div>∙</div>
            <div className={styles.distance}>{distance}</div>
          </div>
        )}
      </div>
    </li>
  );
}

export default PlaceItem;
