import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceResult } from 'lib/types/google.maps';

import Button from 'components/common/button';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
  isZeroResult?: boolean;
};

function PlaceBottomSheet({ placesResult, isZeroResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (placesResult.length || isZeroResult) {
      setOpen(true);
    }
  }, [placesResult, isZeroResult]);

  return (
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
          <Button type="button">다시 검색하기</Button>
        </div>
      ) : (
        <div className={styles.placeList}>
          {placesResult.map((place) => (
            <PlaceBottomSheetItem key={place.place_id} place={place} />
          ))}
        </div>
      )}
    </BottomSheet>
  );
}

export default PlaceBottomSheet;
