import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceGeometry } from 'lib/types/google.maps';

import PlaceBottomSheetItem from '../placeBottomSheetItem';

import styles from './index.module.scss';

type Props = {
  placeResult: PlaceGeometry[];
};

function PlaceBottomSheet({ placeResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (placeResult.length) {
      setOpen(true);
    }
  }, [placeResult]);

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
        {placeResult.map((placeGeometry) => (
          <PlaceBottomSheetItem key={placeGeometry.place_id} placeGeometry={placeGeometry} />
        ))}
      </div>
    </BottomSheet>
  );
}

export default PlaceBottomSheet;
