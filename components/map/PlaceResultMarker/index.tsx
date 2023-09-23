import { memo, useMemo, useState } from 'react';

import { MarkerF } from '@react-google-maps/api';
import { shallow } from 'zustand/shallow';

import { PlaceResult } from 'lib/types/google.maps';
import usePlaceDetailWindowStore from 'stores/placeDetailWindow';

type Props = {
  place: PlaceResult;
};

function PlaceResultMarker({ place }: Props) {
  const [, setMarker] = useState<google.maps.Marker>();
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore((state) => ({
    onOpenPlaceDetailWindow: state.onOpenPlaceDetailWindow,
  }), shallow);

  const icon = useMemo(() => ({
    url: '/images/map.marker.v2.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(32, 32),
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
      onLoad={(markerF) => setMarker(markerF)}
      onUnmount={() => setMarker(undefined)}
      position={place.geometry?.location as google.maps.LatLng}
    />
  );
}

export default memo(PlaceResultMarker);
