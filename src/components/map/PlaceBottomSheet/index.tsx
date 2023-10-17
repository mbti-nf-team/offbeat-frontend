import { BottomSheet } from 'react-spring-bottom-sheet';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, isEmpty } from '@nf-team/core';
import { InfiniteData } from '@tanstack/react-query';

import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import useGetSearchBlog from '@/hooks/queries/useGetSearchBlog';
import { InfiniteRefState } from '@/lib/types';
import { TextSearchPlace } from '@/lib/types/google.maps';
import { SelectedPlace } from '@/lib/types/search';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import { targetFalseThenValue } from '@/utils';

import PlaceBottomSheetItem from '../PlaceBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  places?: InfiniteData<TextSearchPlace>;
  refState: InfiniteRefState<HTMLDivElement>;
  isSuccess: boolean;
};

function PlaceBottomSheet({ places, refState, isSuccess }: Props) {
  const placesResult = checkEmpty(places?.pages.flatMap((value) => value.results));
  const isZeroResult = isSuccess && (
    isEmpty(placesResult) || places?.pages?.[0].status === Status.ZERO_RESULTS
  );

  const {
    onOpenPlaceDetailWindow, isOpenPlaceDetailWindow,
  } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow', 'isOpenPlaceDetailWindow']);

  // TODO - 마이그레이션
  const {
    data: placesWithSearchResult, isFetching, isSuccess: isSuccessPlacesWithSearchResult,
  } = useGetSearchBlog<false>({
    placesResult,
    includePost: false,
    enabled: !isEmpty(placesResult),
  });

  const onClickPlaceItem = (
    selectedPlaceForm: SelectedPlace,
  ) => onOpenPlaceDetailWindow(selectedPlaceForm);

  return (
    <BottomSheet
      open={!isOpenPlaceDetailWindow
        && (isZeroResult || isSuccessPlacesWithSearchResult || isFetching)}
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
          {isFetching && (
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
