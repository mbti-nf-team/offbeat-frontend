import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceResult } from 'lib/types/google.maps';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placesResult: PlaceResult[];
};

function PlaceBottomSheet({ placesResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (placesResult.length) {
      setOpen(true);
    }
  }, [placesResult]);

  return (
    <BottomSheet
      open={open}
      blocking={false}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 8,
        maxHeight / 2,
        maxHeight * 0.2,
      ]}
      expandOnContentDrag
    >
      <div className={styles.placeList}>
        {placesResult.map((place) => (
          <PlaceBottomSheetItem key={place.place_id} place={place} />
        ))}
      </div>
    </BottomSheet>
  );
}

export default PlaceBottomSheet;
