import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';

import { PlaceGeometry } from 'lib/types/google.maps';
import styled from 'styled-components';
import { titleLargeFont } from 'styles/fontStyles';

type Props = {
  placeResult: PlaceGeometry[];
};

const snapPoints = [-50, 0.5, 200, 0];
const initialSnap = 1;

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
          <PlaceList>
            {placeResult.map(({
              name, place_id, rating, user_ratings_total,
            }) => (
              <PlaceItem key={place_id}>
                <div className="place-name">{name}</div>
                <div>{rating}</div>
                <div>{user_ratings_total}</div>
              </PlaceItem>
            ))}
          </PlaceList>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>

  );
}

export default PlaceBottomSheetQ;

const PlaceList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

const PlaceItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 4px;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.gray200};

  & > div.place-name {
    ${titleLargeFont({ fontWeight: 600 })};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.black};
  }
`;
