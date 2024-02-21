import { useCallback, useRef } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { defaultSnapProps, SnapPointProps } from 'react-spring-bottom-sheet/dist/types';

import { isEmpty } from '@nf-team/core';
import { useUpdateEffect } from '@nf-team/react';

import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import CurrentLocationButton from '@/components/map/CurrentLocationButton';
import { InfiniteRefState } from '@/lib/types';
import { PlacesWithSearchResult } from '@/lib/types/search';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import { targetFalseThenValue } from '@/utils';

import PlaceBottomSheetItem from '../PlaceBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  places: PlacesWithSearchResult<false>[];
  refState: InfiniteRefState<HTMLDivElement>;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  selectedPlaceId?: string;
  setSelectedPlaceId: (placeId: string) => void;
};

function PlaceBottomSheet({
  places, refState, isSuccess, isFetching, isFetchingNextPage, selectedPlaceId, setSelectedPlaceId,
}: Props) {
  const sheetRef = useRef<BottomSheetRef>(null);

  const filteredPlaces = selectedPlaceId
    ? places.filter((place) => place.place_id === selectedPlaceId) : places;
  const isZeroResult = isSuccess && isEmpty(filteredPlaces);

  const {
    onOpenPlaceDetailWindow, isOpenPlaceDetailWindow,
  } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow', 'isOpenPlaceDetailWindow']);

  const onClickPlaceItem = (placeId: string) => {
    if (filteredPlaces.length === 1) {
      onOpenPlaceDetailWindow({ placeId });
      return;
    }

    setSelectedPlaceId(placeId);
  };

  const getDefaultSnap = useCallback(({ maxHeight }: defaultSnapProps) => {
    if (filteredPlaces.length === 1) {
      return 148;
    }

    if (isZeroResult) {
      return 168;
    }

    return maxHeight / 2;
  }, [isZeroResult, filteredPlaces.length]);

  const getSnapPoints = useCallback(({ maxHeight }: SnapPointProps) => {
    if (filteredPlaces.length === 1) {
      return [148];
    }

    if (isZeroResult) {
      return [168];
    }

    return [
      maxHeight - maxHeight / 8,
      maxHeight / 2,
      148,
    ];
  }, [isZeroResult, filteredPlaces.length]);

  useUpdateEffect(() => {
    if (filteredPlaces.length === 1) {
      sheetRef.current?.snapTo(148);
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
        open={!isOpenPlaceDetailWindow
          && (isZeroResult || isSuccess || isFetching)}
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
          <div className={styles.placeList} ref={refState.wrapperRef}>
            {filteredPlaces.map((place, index, array) => (
              <PlaceBottomSheetItem
                key={place.place_id}
                wrapperRef={
                  targetFalseThenValue(
                    !(array.length - 1 === index && !selectedPlaceId),
                  )(refState.lastItemRef)
                }
                place={place}
                onClick={onClickPlaceItem}
              />
            ))}
            {(isFetchingNextPage || isFetching) && (
            <div className={styles.loadingWrapper}>
              <Spinner isLoading />
            </div>
            )}
          </div>
        )}
      </BottomSheet>
    </>
  );
}

export default PlaceBottomSheet;
