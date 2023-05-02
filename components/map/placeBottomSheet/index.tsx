import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceResult } from 'lib/types/google.maps';

import Button from 'components/common/button';
import PlaceDetailWindow from 'components/detail/PlaceDetailWindow';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
  isZeroResult?: boolean;
};

function PlaceBottomSheet({ placesResult, isZeroResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // TODO - 삭제
  // const { data: placesWithSearchResult } = useGetSearchBlog({
  //   placesResult,
  //   enabled: !!placesResult?.length && !isZeroResult,
  // });

  const openDetailWindow = () => setIsVisible(true);
  const closeDetailWindow = () => setIsVisible(false);

  useEffect(() => {
    if (placesResult.length || isZeroResult) {
      setOpen(true);
    }
  }, [placesResult, isZeroResult]);

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
            {placesResult.map((place) => (
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
