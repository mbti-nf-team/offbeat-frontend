import { useCallback, useState } from 'react';

import { useGoogleMap } from '@react-google-maps/api';
import useRenderToast from 'hooks/useRenderToast';
import { PlaceResult } from 'lib/types/google.maps';

const hasPlaceLocation = (
  placeDetail: google.maps.places.PlaceResult | null,
): placeDetail is PlaceResult => Boolean(placeDetail?.geometry?.location);

function useGetPlaceDetails():
[PlaceResult | null, (placeId: string) => void, () => void] {
  const map = useGoogleMap();
  const renderToast = useRenderToast();
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
        return;
      }

      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        return;
      }

      renderToast('다시 시도해주세요.', { type: 'error' });
    });
  }, [map]);

  const resetPlaceDetails = () => setPlaceDetailsState(null);

  return [placeDetailsState, onGetPlaceDetails, resetPlaceDetails];
}

export default useGetPlaceDetails;
