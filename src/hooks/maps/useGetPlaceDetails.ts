import { useCallback, useState } from 'react';

import { useGoogleMap } from '@react-google-maps/api';

import useRenderToast from '@/hooks/useRenderToast';
import { PlaceDetailResult } from '@/lib/types/google.maps';

const hasPlaceLocation = (
  placeDetail: google.maps.places.PlaceResult | null,
): placeDetail is PlaceDetailResult => Boolean(placeDetail?.geometry?.location);

function useGetPlaceDetails():
[PlaceDetailResult | null, (placeId: string) => void, () => void] {
  const map = useGoogleMap();
  const renderToast = useRenderToast();
  const [
    placeDetailsState, setPlaceDetailsState,
  ] = useState<PlaceDetailResult | null>(null);

  const onGetPlaceDetails = useCallback((placeId: string) => {
    if (!map) {
      return;
    }

    const service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId,
    }, (placeDetail, status) => {
      const copyPlaceDetail = placeDetail;

      if (status === google.maps.places.PlacesServiceStatus.OK
        && hasPlaceLocation(copyPlaceDetail)) {
        delete copyPlaceDetail.utc_offset;

        setPlaceDetailsState(copyPlaceDetail);
        return;
      }

      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        return;
      }

      renderToast('다시 시도해주세요.', { type: 'error' });
    });
  }, [map]);

  const resetPlaceDetails = useCallback(() => setPlaceDetailsState(null), []);

  return [placeDetailsState, onGetPlaceDetails, resetPlaceDetails];
}

export default useGetPlaceDetails;
