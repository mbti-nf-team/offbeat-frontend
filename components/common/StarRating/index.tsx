import { useMemo } from 'react';

import clsx from 'clsx';

import {
  EmptyStarIcon, FillStarIcon, HalfStarIcon, PixelEmptyStar, PixelFillStar, PixelHalfStar,
} from 'lib/assets/icons';
import { checkNumberValue, generateArrayOfNumber } from 'utils';

import styles from './index.module.scss';

type Props = {
  rating?: number;
  maxRating?: number;
  type: 'list' | 'detail'
  className?: string;
};

function StarRating({
  rating, maxRating = 5, type, className,
}: Props) {
  const numberRating = checkNumberValue(rating);
  const fillStarCount = Math.floor(numberRating);

  const detailClassName = clsx({
    [styles.detailStar]: type === 'detail',
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
    <div className={className}>
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
