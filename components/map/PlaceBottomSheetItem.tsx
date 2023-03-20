import { useMemo } from 'react';

import { PlaceGeometry } from 'lib/types/google.maps';
import styled from 'styled-components';
import { titleLargeFont, titleSmallFont } from 'styles/fontStyles';

import { checkNumberValue, generateArrayOfNumber } from 'utils';

import EmptyStarIcon from 'lib/assets/icons/empty-star.svg';
import FillStarSvg from 'lib/assets/icons/fill-star.svg';
import HalfStarIcon from 'lib/assets/icons/half-star.svg';

type Props = {
  placeGeometry: PlaceGeometry;
};

const MAX_RATING = 5 as const;

function PlaceBottomSheetItem({ placeGeometry }: Props) {
  const { place_id, name, user_ratings_total } = placeGeometry;
  const rating = checkNumberValue(placeGeometry.rating);
  const fillStarCount = Math.floor(checkNumberValue(rating));

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

    return <FillStarSvg />;
  }, [rating]);

  return (
    <PlaceItem key={place_id}>
      <div className="place-name">{name}</div>
      <PlaceRatingWrapper>
        <div className="place-rating">{rating}</div>
        <div>
          {generateArrayOfNumber(fillStarCount).map((key) => (
            <FillStarSvg key={key} />
          ))}
          {extraStar}
          {generateArrayOfNumber(MAX_RATING - (fillStarCount + 1)).map((key) => (
            <EmptyStarIcon key={key} />
          ))}
        </div>
        <div className="place-user-ratings-total">{`(${user_ratings_total})`}</div>
      </PlaceRatingWrapper>
      <div className="naver-search-total">네이버 검색결과 500개</div>
    </PlaceItem>
  );
}

export default PlaceBottomSheetItem;

const PlaceItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 4px;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.gray200};

  & > div.place-name {
    ${titleLargeFont({ fontWeight: 600 })};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.black};
  }

  & > div.naver-search-total {
    ${titleSmallFont({ fontWeight: 500 })};
    color: ${({ theme }) => theme.gray500};
  }
`;

const PlaceRatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  & > div.place-rating {
    ${titleSmallFont({ fontWeight: 600 })};
  }

  & > div.place-user-ratings-total {
    ${titleSmallFont({ fontWeight: 500 })};
    color: ${({ theme }) => theme.gray500};
  }
`;
