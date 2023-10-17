import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js';
import { useQuery } from '@tanstack/react-query';

import { fetchPlaceDetail } from '@/lib/apis/search';
import { PlaceDetail } from '@/lib/types/google.maps';

const hasPlaceId = (
  placeDetail: PlaceDetailsResponseData,
): placeDetail is PlaceDetail => {
  if (
    !placeDetail?.result
    || !placeDetail.result?.geometry?.location
    || !placeDetail.result?.place_id
    || !placeDetail.result?.name
  ) {
    return false;
  }

  return true;
};

function useGetPlaceDetail({
  placeId, sessionToken,
}: { placeId?: string; sessionToken?: string; }) {
  const query = useQuery<PlaceDetailsResponseData, undefined, PlaceDetail | undefined>(['placeDetail', placeId], () => fetchPlaceDetail({ placeId: placeId as string, sessionToken }), {
    enabled: !!placeId,
    select: (placeDetail) => {
      if (hasPlaceId(placeDetail)) {
        return placeDetail;
      }

      return undefined;
    },
  });

  return query;
}

export default useGetPlaceDetail;
