import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { checkEmpty } from '@nf-team/core';
import { shallow } from 'zustand/shallow';

import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import useGetSearchBlog from '@/hooks/queries/useGetSearchBlog';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { PlaceResult } from '@/lib/types/google.maps';
import { SelectedPlace } from '@/lib/types/search';
import usePlaceStore from '@/stores/place';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import { targetFalseThenValue } from '@/utils';

import PlaceBottomSheetItem from '../PlaceBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
  isZeroResult?: boolean;
};

function PlaceBottomSheet({ placesResult, isZeroResult }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { placePagination } = usePlaceStore((state) => ({
    placePagination: state.pagination,
  }));

  const refState = useIntersectionObserver<HTMLDivElement>({
    isRoot: true,
    fetchNextPage: placePagination?.fetchNextPage,
    hasNextPage: placePagination?.hasNextPage,
  });

  const {
    onOpenPlaceDetailWindow, isOpenPlaceDetailWindow,
  } = usePlaceDetailWindowStore((state) => ({
    onOpenPlaceDetailWindow: state.onOpenPlaceDetailWindow,
    isOpenPlaceDetailWindow: state.isOpenPlaceDetailWindow,
  }), shallow);

  const { data: placesWithSearchResult, isSuccess } = useGetSearchBlog<false>({
    placesResult,
    includePost: false,
    enabled: !!placesResult?.length && !isZeroResult,
  });

  const onClickPlaceItem = (
    selectedPlaceForm: SelectedPlace,
  ) => onOpenPlaceDetailWindow(selectedPlaceForm);

  useEffect(() => {
    if (placesResult?.length || isZeroResult) {
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
  }, [placesResult?.length, isZeroResult]);

  return (
    <BottomSheet
      open={isOpen && !isOpenPlaceDetailWindow}
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
          {isSuccess ? checkEmpty(placesWithSearchResult).map((place, index) => (
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
          )) : (
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
