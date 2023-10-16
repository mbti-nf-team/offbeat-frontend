import { memo, useMemo } from 'react';

import { MarkerF } from '@react-google-maps/api';

import { PlaceResult } from '@/lib/types/google.maps';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

type Props = {
  place: PlaceResult;
};

function PlaceResultMarker({ place }: Props) {
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);

  const icon = useMemo(() => ({
    url: '/images/map.marker.v2.png',
    size: new google.maps.Size(34, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(34, 40),
  } as google.maps.Icon), []);

  const onClickMarker = () => onOpenPlaceDetailWindow({
    placeId: place?.place_id,
    placeName: place?.name,
  });

  return (
    <MarkerF
      icon={icon}
      onClick={onClickMarker}
      title={place.name}
      position={place.geometry?.location}
    />
  );
}

export default memo(PlaceResultMarker);
