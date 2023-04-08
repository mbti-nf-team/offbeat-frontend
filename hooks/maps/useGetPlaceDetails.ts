import { useCallback, useState } from 'react';

import { useGoogleMap } from '@react-google-maps/api';
import { PlaceResult } from 'lib/types/google.maps';

const hasPlaceLocation = (
  placeDetail: google.maps.places.PlaceResult | null,
): placeDetail is PlaceResult => Boolean(placeDetail?.geometry?.location);

function useGetPlaceDetails():
[PlaceResult | null, (placeId: string) => void, () => void] {
  const map = useGoogleMap();
  const [
    placeDetailsState, setPlaceDetailsState,
  ] = useState<PlaceResult | null>(null);

  const onGetPlaceDetails = useCallback((placeId: string) => {
    if (!map) {
      return;
    }

    const service = new google.maps.places.PlacesService(map);

    service.getDetails({ placeId }, (placeDetail, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && hasPlaceLocation(placeDetail)) {
        setPlaceDetailsState(placeDetail);
      }
    });
  }, [map]);

  const resetPlaceDetails = () => setPlaceDetailsState(null);

  return [placeDetailsState, onGetPlaceDetails, resetPlaceDetails];
}

export default useGetPlaceDetails;
