import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';

import { PlaceResult } from 'lib/types/google.maps';

type Props = {
  placeResult: PlaceResult[];
};

const snapPoints = [-50, 0.5, 200, 0];
const initialSnap = 1;

// TODO - 추후 삭제
function PlaceBottomSheetQ({ placeResult }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onDismiss = () => setOpen(false);

  useEffect(() => {
    if (placeResult.length) {
      setOpen(true);
    }
  }, [placeResult]);

  return (
    <Sheet
      isOpen={open}
      onClose={onDismiss}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
      springConfig={{ stiffness: 150, damping: 20, mass: 1 }}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ul>
            {placeResult.map(({
              name, place_id, rating, user_ratings_total,
            }) => (
              <li key={place_id}>
                <div className="place-name">{name}</div>
                <div>{rating}</div>
                <div>{user_ratings_total}</div>
              </li>
            ))}
          </ul>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>

  );
}

export default PlaceBottomSheetQ;
