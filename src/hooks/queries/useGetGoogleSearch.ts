import { useQuery } from '@tanstack/react-query';

import { fetchGoogleSearch } from '@/lib/apis/search';

function useGetGoogleSearch({ keyword }: { keyword: string; }) {
  const query = useQuery([keyword], () => fetchGoogleSearch({ keyword }), {
    enabled: !!keyword,
  });

  return query;
}

export default useGetGoogleSearch;
