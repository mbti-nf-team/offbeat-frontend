import FIXTURE_NAVER_SEARCH_BLOG from 'mocks/fixtures/searchBlog';

import { api, paramsSerializer } from '..';

import { NaverSearchBlogResponse } from './model';
import { fetchNaverSearchBlog } from '.';

jest.mock('..');

describe('search API', () => {
  beforeEach(() => {
    (api as jest.Mock).mockClear();
  });

  describe('fetchNaverSearchBlog', () => {
    const keyword = 'keyword';
    const includePost = true;
    const mockResponse: NaverSearchBlogResponse<typeof includePost> = FIXTURE_NAVER_SEARCH_BLOG;

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it('GET /naver/search/blog', async () => {
      const response = await fetchNaverSearchBlog<typeof includePost>({
        includePost,
        keyword,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toBeCalledWith({
        method: 'GET',
        url: '/naver/search/blog',
        params: {
          query: keyword,
          include_post: includePost,
        },
        paramsSerializer,
      });
    });
  });
});
