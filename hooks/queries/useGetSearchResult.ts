import { useQuery } from '@tanstack/react-query';

function useGetSearchResult(keywords?: string) {
  const query = useQuery([keywords], async () => {
    const response = await fetch(`http://localhost:3000/api/search?keyword=${keywords}`, {
      method: 'GET',
    });

    const result = await response.json();

    return result;
  }, {
    enabled: !!keywords,
  });

  return query;
}

export default useGetSearchResult;
