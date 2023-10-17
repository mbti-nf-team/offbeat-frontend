import { Status } from '@googlemaps/google-maps-services-js';

import { TextSearchPlace } from '@/lib/types/google.maps';
import FIXTURE_NAVER_SEARCH_BLOG from '@/mocks/fixtures/searchBlog';

import { api, paramsSerializer } from '..';

import { NaverSearchBlogResponse } from './model';
import { fetchGoogleSearch, fetchNaverSearchBlog, fetchPlaceDetail } from '.';

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

    it('GET /naver/search', async () => {
      const response = await fetchNaverSearchBlog<typeof includePost>({
        includePost,
        keyword,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toBeCalledWith({
        method: 'GET',
        url: '/naver/search',
        params: {
          query: keyword,
          include_post: includePost,
        },
        paramsSerializer,
        isBFF: true,
      });
    });
  });

  describe('fetchGoogleSearch', () => {
    const keyword = 'keyword';
    const mockResponse: TextSearchPlace = {
      error_message: '',
      status: Status.OK,
      results: [],
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it('GET /google/search', async () => {
      const response = await fetchGoogleSearch({
        keyword,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toBeCalledWith({
        method: 'GET',
        url: '/google/search',
        params: {
          query: keyword,
        },
        paramsSerializer,
        isBFF: true,
      });
    });
  });

  describe('fetchPlaceDetail', () => {
    const placeId = 'placeId';
    const sessionToken = 'sessionToken';
    const mockResponse: TextSearchPlace = {
      error_message: '',
      status: Status.OK,
      results: [],
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it('GET /google/search/detail', async () => {
      const response = await fetchPlaceDetail({
        placeId,
        sessionToken,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toBeCalledWith({
        method: 'GET',
        headers: {
          'session-token': sessionToken,
        },
        url: '/google/search/detail',
        params: {
          placeId,
        },
        paramsSerializer,
        isBFF: true,
      });
    });
  });
});
