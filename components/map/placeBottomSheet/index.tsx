import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { useQuery } from '@tanstack/react-query';
import { fetchAllSettledSearchBlogs } from 'lib/apis/search';
import { PlaceResult } from 'lib/types/google.maps';
import { SelectedPlace } from 'lib/types/search';

import Button from 'components/common/button';
import PlaceDetailWindowContainer from 'components/detail/PlaceDetailWindowContainer';
import { checkEmpty } from 'utils';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
  isZeroResult?: boolean;
};

function PlaceBottomSheet({ placesResult, isZeroResult }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPlaceState, setSelectedPlaceState] = useState<SelectedPlace>({
    placeId: undefined,
    placeName: undefined,
  });

  const placeName = placesResult.map((place) => place.name);

  const { data: placesWithSearchResult, isSuccess } = useQuery(
    [placeName, false],
    () => fetchAllSettledSearchBlogs<false>({ placeName }),
    {
      enabled: !!placesResult?.length && !isZeroResult,
      select: (searchBlogPosts) => placesResult.map((place, index) => ({
        ...place,
        searchBlogPost: searchBlogPosts[index],
      })),
    },
  );

  const onClickPlaceItem = (
    selectedPlaceForm: SelectedPlace,
  ) => setSelectedPlaceState(selectedPlaceForm);

  useEffect(() => {
    if (isSuccess || isZeroResult) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [isSuccess, isZeroResult]);

  return (
    <>
      <BottomSheet
        open={isOpen}
        blocking={false}
        defaultSnap={({ maxHeight }) => (isZeroResult ? 168 : maxHeight / 2)}
        snapPoints={({ maxHeight }) => (isZeroResult ? [168] : [
          maxHeight - maxHeight / 8,
          maxHeight / 2,
          maxHeight * 0.2,
        ])}
        expandOnContentDrag={false}
      >
        {isZeroResult ? (
          <div className={styles.zeroResultBox}>
            <div>검색 결과가 없습니다.</div>
            <Button type="button" size="small" color="highlight">
              다시 검색하기
            </Button>
          </div>
        ) : (
          <div className={styles.placeList}>
            {checkEmpty(placesWithSearchResult).map((place) => (
              <PlaceBottomSheetItem key={place.place_id} place={place} onClick={onClickPlaceItem} />
            ))}
          </div>
        )}
      </BottomSheet>
      <PlaceDetailWindowContainer
        placeName={selectedPlaceState?.placeName}
        placeId={selectedPlaceState?.placeId}
      />
    </>
  );
}

export default PlaceBottomSheet;
