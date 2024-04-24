import { useCallback, useRef } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { defaultSnapProps, SnapPointProps } from 'react-spring-bottom-sheet/dist/types';

import { useRouter } from 'next/navigation';

import { isEmpty } from '@nf-team/core';
import { useUpdateEffect } from '@nf-team/react';

import Button from '@/components/common/Button';
import PlaceItem from '@/components/common/PlaceItem';
import Spinner from '@/components/common/Spinner';
import CurrentLocationButton from '@/components/map/CurrentLocationButton';
import { InfiniteRefState } from '@/lib/types';
import { PlacesWithSearchResult } from '@/lib/types/search';
import { targetFalseThenValue } from '@/utils';

import styles from './index.module.scss';

type Props = {
  places: PlacesWithSearchResult<false>[];
  refState: InfiniteRefState<HTMLUListElement>;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  selectedPlaceId?: string;
  setSelectedPlaceId: (placeId: string) => void;
};

const DEFAULT_SNAP_POINT = 340;
const ZERO_RESULT_SNAP_POINT = 168;

function PlaceBottomSheet({
  places, refState, isSuccess, isFetching, isFetchingNextPage, selectedPlaceId, setSelectedPlaceId,
}: Props) {
  const sheetRef = useRef<BottomSheetRef>(null);
  const router = useRouter();

  const filteredPlaces = selectedPlaceId
    ? places.filter((place) => place.place_id === selectedPlaceId) : places;
  const isZeroResult = isSuccess && isEmpty(filteredPlaces);

  const onClickPlaceItem = (placeId: string) => {
    if (filteredPlaces.length === 1) {
      router.push(`/place/${placeId}`);
      return;
    }

    setSelectedPlaceId(placeId);
  };

  const getDefaultSnap = useCallback(({ maxHeight }: defaultSnapProps) => {
    if (filteredPlaces.length === 1) {
      return DEFAULT_SNAP_POINT;
    }

    if (isZeroResult) {
      return ZERO_RESULT_SNAP_POINT;
    }

    return maxHeight / 2;
  }, [isZeroResult, filteredPlaces.length]);

  const getSnapPoints = useCallback(({ maxHeight }: SnapPointProps) => {
    if (filteredPlaces.length === 1) {
      return [DEFAULT_SNAP_POINT];
    }

    if (isZeroResult) {
      return [ZERO_RESULT_SNAP_POINT];
    }

    return [
      maxHeight - maxHeight / 8,
      maxHeight / 2,
      DEFAULT_SNAP_POINT,
      168,
    ];
  }, [isZeroResult, filteredPlaces.length]);

  useUpdateEffect(() => {
    if (filteredPlaces.length === 1) {
      sheetRef.current?.snapTo(DEFAULT_SNAP_POINT);
      return;
    }

    sheetRef.current?.snapTo(({ maxHeight }) => maxHeight / 2);
  }, [filteredPlaces]);

  return (
    <>
      <CurrentLocationButton
        isZeroResult={isZeroResult}
        placeResultCount={filteredPlaces.length}
      />
      <BottomSheet
        ref={sheetRef}
        open={isZeroResult || isSuccess || isFetching}
        blocking={false}
        defaultSnap={getDefaultSnap}
        snapPoints={getSnapPoints}
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
          <ul className={styles.placeList} ref={refState.wrapperRef}>
            {filteredPlaces.map((place, index, array) => (
              <PlaceItem
                key={place.place_id}
                wrapperRef={
                  targetFalseThenValue(
                    !(array.length - 1 === index && !selectedPlaceId),
                  )(refState.lastItemRef)
                }
                placeId={place.place_id}
                photoUrls={place.photoUrls}
                placeName={place.name}
                rating={place.rating}
                userRatingsTotal={place.user_ratings_total}
                isSavedPlace={false}
                searchBlogPost={place.searchBlogPost}
                onClick={onClickPlaceItem}
              />
            ))}
            {(isFetchingNextPage || isFetching) && (
              <div className={styles.loadingWrapper}>
                <Spinner isLoading />
              </div>
            )}
          </ul>
        )}
      </BottomSheet>
    </>
  );
}

export default PlaceBottomSheet;
