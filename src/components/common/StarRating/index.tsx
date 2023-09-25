import { useMemo } from 'react';

import { checkNumber, generateArrayOfNumber } from '@nf-team/core';
import clsx from 'clsx';

import {
  EmptyStarIcon, FillStarIcon, HalfStarIcon, PixelEmptyStar, PixelFillStar, PixelHalfStar,
} from '@/lib/assets/icons';

import styles from './index.module.scss';

type Props = {
  rating?: number;
  maxRating?: number;
  type: 'list' | 'detail'
  className?: string;
  size?: 'large' | 'small';
};

function StarRating({
  rating, maxRating = 5, type, className, size = 'large',
}: Props) {
  const numberRating = checkNumber(rating);
  const fillStarCount = Math.floor(numberRating);

  const detailClassName = clsx({
    [styles[size]]: type === 'detail',
  });

  const EmptyStar = {
    list: EmptyStarIcon,
    detail: PixelEmptyStar,
  }[type];

  const HalfStar = {
    list: HalfStarIcon,
    detail: PixelHalfStar,
  }[type];

  const FillStar = {
    list: FillStarIcon,
    detail: PixelFillStar,
  }[type];

  const extraStar = useMemo(() => {
    const onlyDecimal = Number((numberRating % 1).toFixed(1));

    if (onlyDecimal < 0.3) {
      return <EmptyStar className={detailClassName} data-testid="decimal-empty-star" />;
    }

    if (onlyDecimal >= 0.3 && onlyDecimal < 0.8) {
      return <HalfStar className={detailClassName} data-testid="decimal-half-star" />;
    }

    return <FillStar className={detailClassName} data-testid="decimal-fill-star" />;
  }, [numberRating, type, detailClassName]);

  return (
    <div className={clsx(styles.starRatingWrapper, className)}>
      {generateArrayOfNumber(fillStarCount).map((key) => (
        <FillStar key={key} className={detailClassName} />
      ))}
      {fillStarCount < maxRating && extraStar}
      {generateArrayOfNumber(maxRating - (fillStarCount + 1)).map((key) => (
        <EmptyStar key={key} className={detailClassName} />
      ))}
    </div>
  );
}

export default StarRating;
