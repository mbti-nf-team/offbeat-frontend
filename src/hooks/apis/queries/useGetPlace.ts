import { useQuery } from '@tanstack/react-query';

import { getPlace } from '@/lib/apis/places';

function useGetPlace(placeId?: string) {
  const query = useQuery({
    queryKey: ['place', placeId],
    queryFn: () => getPlace(placeId as string),
    enabled: !!placeId,
  });

  return query;
}

export default useGetPlace;
