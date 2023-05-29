import { memo, useMemo, useState } from 'react';

import { MarkerF } from '@react-google-maps/api';
import { PlaceResult } from 'lib/types/google.maps';
import { SelectedPlace } from 'lib/types/search';

import PlaceDetailWindowContainer from 'components/detail/PlaceDetailWindowContainer';

type Props = {
  place: PlaceResult;
};

function PlaceResultMarker({ place }: Props) {
  const [, setMarker] = useState<google.maps.Marker>();
  const [selectedPlaceState, setSelectedPlaceState] = useState<SelectedPlace>({
    placeId: undefined,
    placeName: undefined,
  });

  const icon = useMemo(() => ({
    url: '/images/map.marker.v2.png',
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(32, 32),
  } as google.maps.Icon), []);

  const onClickMarker = () => setSelectedPlaceState({
    placeId: place?.place_id,
    placeName: place?.name,
  });

  const onClearPlace = () => setSelectedPlaceState({
    placeId: undefined,
    placeName: undefined,
  });

  return (
    <>
      <MarkerF
        icon={icon}
        onClick={onClickMarker}
        title={place.name}
        onLoad={(markerF) => setMarker(markerF)}
        onUnmount={() => setMarker(undefined)}
        position={place.geometry?.location as google.maps.LatLng}
      />
      <PlaceDetailWindowContainer
        onRestPlace={onClearPlace}
        placeId={selectedPlaceState?.placeId}
        placeName={selectedPlaceState?.placeName}
      />
    </>
  );
}

export default memo(PlaceResultMarker);
