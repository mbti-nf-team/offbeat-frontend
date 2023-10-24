import { paramsSerializer } from '@/lib/apis';

const BATCH_SIZE = 10;
const DELAY = 1000;

export const fetchNaverSearchBlog = async ({
  query, includePost,
}: { query: string; includePost: boolean; }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN}/api/naver/search?${paramsSerializer({
    query,
    include_post: includePost,
  })}`);

  if (response.ok) {
    const searchResult = await response.json();

    return searchResult;
  }

  return null;
};

export const fetchAllSettledSearchNaverBlogs = async ({
  placeName,
}: {
  placeName: string[];
}) => {
  const copyPlaceName = [...placeName];
  const firstPlaceName = copyPlaceName.splice(0, BATCH_SIZE);

  const firstResponse = await Promise
    .allSettled([...firstPlaceName.map((query) => fetchNaverSearchBlog({
      query,
      includePost: false,
    }))]);

  if (placeName.length <= 10) {
    return firstResponse;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY);
  });

  const secondResponse = await Promise
    .allSettled([...copyPlaceName.map((query) => fetchNaverSearchBlog({
      query,
      includePost: false,
    }))]);

  return [...firstResponse, ...secondResponse];
};
