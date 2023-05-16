import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { useQuery } from '@tanstack/react-query';
import { fetchNaverSearchBlog } from 'lib/apis/search';
import { PlaceResult } from 'lib/types/google.maps';

import Button from 'components/common/button';
import PlaceDetailWindow from 'components/detail/PlaceDetailWindow';
import { checkEmpty } from 'utils';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
  isZeroResult?: boolean;
};

function PlaceBottomSheet({ placesResult, isZeroResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const placeName = placesResult.map((place) => place.name);

  const { data: placesWithSearchResult, isSuccess } = useQuery(
    [placeName],
    () => Promise.allSettled([...placeName.map((keyword) => fetchNaverSearchBlog<false>({
      keyword,
    }))]),
    {
      enabled: !!placesResult?.length && !isZeroResult,
      select: (searchBlogPosts) => placesResult.map((place, index) => ({
        ...place,
        searchBlogPost: searchBlogPosts[index],
      })),
    },
  );

  const openDetailWindow = () => setIsVisible(true);
  const closeDetailWindow = () => setIsVisible(false);

  useEffect(() => {
    if (isSuccess || isZeroResult) {
      setOpen(true);
    }
  }, [isSuccess, isZeroResult]);

  return (
    <>
      <BottomSheet
        open={open}
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
              <PlaceBottomSheetItem key={place.place_id} place={place} onClick={openDetailWindow} />
            ))}
          </div>
        )}
      </BottomSheet>
      <PlaceDetailWindow isVisible={isVisible} onClose={closeDetailWindow} />
    </>
  );
}

export default PlaceBottomSheet;
