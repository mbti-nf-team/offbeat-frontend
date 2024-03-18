import { checkNumber } from '@nf-team/core';
import { useActionKeyEvent } from '@nf-team/react';

import StarRating from '@/components/common/StarRating';
import { PlacesWithSearchResult } from '@/lib/types/search';
import { numberWithComma } from '@/utils';

import styles from './index.module.scss';

type Props = {
  place: PlacesWithSearchResult;
  onClick: (placeId: string) => void;
  wrapperRef?: ((node?: Element | null | undefined) => void);
};

function PlaceBottomSheetItem({ place, onClick, wrapperRef }: Props) {
  const { name, user_ratings_total } = place;
  const rating = checkNumber(place.rating);

  const onKeyDown = useActionKeyEvent<HTMLLIElement, [string]>(['Enter', 'NumpadEnter'], (_, id) => onClick(id));

  return (
    <li
      ref={wrapperRef}
      className={styles.placeItem}
      tabIndex={0}
      onClick={() => onClick(place.place_id)}
      onKeyDown={(e) => onKeyDown(e, place.place_id)}
      role="menuitem"
    >
      <div className={styles.placeName}>{name}</div>
      <div className={styles.placeRatingWrapper}>
        <div className={styles.placeRating}>{rating}</div>
        <StarRating rating={place?.rating} type="list" />
        <div className={styles.placeUserRatingsTotal}>{`(${checkNumber(user_ratings_total)})`}</div>
      </div>
      {place.searchBlogPost?.status === 'fulfilled' && (
        <div className={styles.searchTotal}>{`네이버 검색결과 ${numberWithComma(checkNumber(place.searchBlogPost?.value?.total_count))}개`}</div>
      )}
    </li>
  );
}

export default PlaceBottomSheetItem;
