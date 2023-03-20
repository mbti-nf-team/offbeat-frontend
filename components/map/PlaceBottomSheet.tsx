import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { PlaceGeometry } from 'lib/types/google.maps';
import styled from 'styled-components';

import PlaceBottomSheetItem from './PlaceBottomSheetItem';

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
      blocking={false}
      onDismiss={onDismiss}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 10,
        maxHeight / 4,
        maxHeight * 0.6,
      ]}
      expandOnContentDrag
    >
      <PlaceList>
        {placeResult.map((placeGeometry) => (
          <PlaceBottomSheetItem key={placeGeometry.place_id} placeGeometry={placeGeometry} />
        ))}
      </PlaceList>
    </BottomSheet>
  );
}

export default PlaceBottomSheet;

const PlaceList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;
