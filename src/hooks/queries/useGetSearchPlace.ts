import { useQuery } from '@tanstack/react-query';

import { fetchPlaceDetail } from '@/lib/apis/search';
import { SearchPlace } from '@/lib/types/search';

const TEN_MINUTES = 600000;

function useGetSearchPlace({
  placeId, sessionToken,
}: { placeId?: string; sessionToken?: string; }) {
  const query = useQuery<SearchPlace>(['placeDetailV2', placeId], () => fetchPlaceDetail({ placeId: placeId as string, sessionToken }), {
    enabled: !!placeId,
    staleTime: TEN_MINUTES,
    cacheTime: TEN_MINUTES,
  });

  return query;
}

export default useGetSearchPlace;