import { useMemo } from 'react';

import useActionKeyEvent from 'hooks/useActionKeyEvent';
import { EmptyStarIcon, FillStarIcon, HalfStarIcon } from 'lib/assets/icons';
import { PlaceWithBlogPost } from 'lib/types/search';

import { checkNumberValue, generateArrayOfNumber, numberWithComma } from 'utils';

import styles from './index.module.scss';

type Props = {
  place: PlaceWithBlogPost<false>;
  onClick: () => void;
};

const MAX_RATING = 5;

function PlaceBottomSheetItem({ place, onClick }: Props) {
  const { name, user_ratings_total } = place;
  const rating = checkNumberValue(place.rating);
  const fillStarCount = Math.floor(checkNumberValue(rating));

  const onKeyDown = useActionKeyEvent<HTMLLIElement>(['Enter', 'NumpadEnter'], () => onClick);

  const extraStar = useMemo(() => {
    const onlyDecimal = Number((checkNumberValue(rating) % 1).toFixed(1));

    if (onlyDecimal < 0.3) {
      return (
        <EmptyStarIcon />
      );
    }

    if (onlyDecimal >= 0.3 && onlyDecimal < 0.8) {
      return (
        <HalfStarIcon />
      );
    }

    return <FillStarIcon />;
  }, [rating]);

  return (
    <li
      className={styles.placeItem}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="menuitem"
    >
      <div className={styles.placeName}>{name}</div>
      <div className={styles.placeRatingWrapper}>
        <div className={styles.placeRating}>{rating}</div>
        <div>
          {generateArrayOfNumber(fillStarCount).map((key) => (
            <FillStarIcon key={key} />
          ))}
          {fillStarCount < 5 && extraStar}
          {generateArrayOfNumber(MAX_RATING - (fillStarCount + 1)).map((key) => (
            <EmptyStarIcon key={key} />
          ))}
        </div>
        <div className={styles.placeUserRatingsTotal}>{`(${user_ratings_total})`}</div>
      </div>
      <div className={styles.naverSearchTotal}>{`네이버 검색결과 ${numberWithComma(place.total_count)}개`}</div>
    </li>
  );
}

export default PlaceBottomSheetItem;
