import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceGeometry } from 'lib/types/google.maps';

type Props = {
  placeResult: PlaceGeometry[];
};

function PlaceBottomSheet({ placeResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onDismiss = () => setOpen(false);

  useEffect(() => {
    if (placeResult.length) {
      setOpen(true);
    }
  }, [placeResult]);

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
    >
      <div>
        {placeResult.map(({
          name, place_id, rating, user_ratings_total,
        }) => (
          <div key={place_id}>
            <div>{name}</div>
            <div>{rating}</div>
            <div>{user_ratings_total}</div>
          </div>
        ))}
      </div>
    </BottomSheet>

  );
}

export default PlaceBottomSheet;
