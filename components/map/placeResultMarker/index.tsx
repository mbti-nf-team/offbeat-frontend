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
    url: '/images/map.marker.png',
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
  } as google.maps.Icon), []);

  const onClickMarker = () => setSelectedPlaceState({
    placeId: place?.place_id,
    placeName: place?.name,
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
        placeId={selectedPlaceState?.placeId}
        placeName={selectedPlaceState?.placeName}
      />
    </>
  );
}

export default memo(PlaceResultMarker);
