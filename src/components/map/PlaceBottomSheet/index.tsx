import { BottomSheet } from 'react-spring-bottom-sheet';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, isEmpty } from '@nf-team/core';
import { InfiniteData } from '@tanstack/react-query';

import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import { InfiniteRefState } from '@/lib/types';
import { SearchPlaces, SelectedPlace } from '@/lib/types/search';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import { targetFalseThenValue } from '@/utils';

import PlaceBottomSheetItem from '../PlaceBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  places?: InfiniteData<SearchPlaces>;
  refState: InfiniteRefState<HTMLDivElement>;
  isSuccess: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
};

function PlaceBottomSheet({
  places, refState, isSuccess, isFetching, isFetchingNextPage,
}: Props) {
  const placesWithSearchResult = checkEmpty(places?.pages.flatMap((value) => value.results));
  const isZeroResult = isSuccess && (
    isEmpty(placesWithSearchResult) || places?.pages?.[0].status === Status.ZERO_RESULTS
  );

  const {
    onOpenPlaceDetailWindow, isOpenPlaceDetailWindow,
  } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow', 'isOpenPlaceDetailWindow']);

  const onClickPlaceItem = (
    selectedPlaceForm: SelectedPlace,
  ) => onOpenPlaceDetailWindow(selectedPlaceForm);

  return (
    <BottomSheet
      open={!isOpenPlaceDetailWindow
        && (isZeroResult || isSuccess || isFetching)}
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
        <div className={styles.placeList} ref={refState.wrapperRef}>
          {checkEmpty(placesWithSearchResult).map((place, index) => (
            <PlaceBottomSheetItem
              key={place.place_id}
              wrapperRef={
                targetFalseThenValue(
                  !(placesWithSearchResult.length - 1 === index),
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
  );
}

export default PlaceBottomSheet;
