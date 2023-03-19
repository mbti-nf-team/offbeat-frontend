import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceGeometry } from 'lib/types/google.maps';
import styled from 'styled-components';
import { titleLargeFont, titleSmallFont } from 'styles/fontStyles';

type Props = {
  placeResult: PlaceGeometry[];
};

function PlaceBottomSheet({ placeResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onDismiss = () => setOpen(false);

  useEffect(() => {
    if (placeResult.length) {
      setOpen(true);
    }
  }, [placeResult]);

  return (
    <BottomSheet
      open={open}
      blocking={false}
      onDismiss={onDismiss}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 10,
        maxHeight / 4,
        maxHeight * 0.6,
      ]}
      expandOnContentDrag
    >
      <PlaceList>
        {placeResult.map(({
          name, place_id, rating, user_ratings_total,
        }) => (
          <PlaceItem key={place_id}>
            <div className="place-name">{name}</div>
            <PlaceRatingWrapper>
              <div className="place-rating">{rating}</div>
              <div className="place-user-ratings-total">{`(${user_ratings_total})`}</div>
            </PlaceRatingWrapper>
            <div className="naver-search-total">네이버 검색결과 500개</div>
          </PlaceItem>
        ))}
      </PlaceList>
    </BottomSheet>
  );
}

export default PlaceBottomSheet;

const PlaceList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

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

  & > div.place-rating {
    ${titleSmallFont({ fontWeight: 600 })};
  }

  & > div.place-user-ratings-total {
    ${titleSmallFont({ fontWeight: 500 })};
    color: ${({ theme }) => theme.gray500};
  }
`;
