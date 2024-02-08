import { Status } from '@googlemaps/google-maps-services-js';

import FIXTURE_NAVER_SEARCH_BLOG from '@/mocks/fixtures/searchBlog';
import FIXTURE_SEARCH_PLACE from '@/mocks/fixtures/searchPlace';

import api from '..';

import { NearbySearchPlacesRequest, SearchPlaceResponse, SearchPlacesResponse } from './model';
import { fetchNearbySearchPlaces, fetchPlaceDetail, fetchSearchPlaces } from '.';

jest.mock('..');

describe('search API', () => {
  beforeEach(() => {
    (api as jest.Mock).mockClear();
  });

  describe('fetchSearchPlaces', () => {
    const keyword = 'placeName';
    const mockResponse: SearchPlacesResponse = {
      error_message: '',
      html_attributions: [],
      status: Status.OK,
      results: [{
        ...FIXTURE_SEARCH_PLACE,
        searchBlogPost: {
          status: 'fulfilled',
          value: {
            ...FIXTURE_NAVER_SEARCH_BLOG,
            posts: null,
          },
        },
      }],
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it('GET /search/places', async () => {
      const response = await fetchSearchPlaces({
        keyword,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toHaveBeenCalledWith({
        method: 'GET',
        params: {
          query: keyword,
        },
        url: '/search/places',
        type: 'bff',
      });
    });
  });

  describe('fetchNearbySearchPlaces', () => {
    const requestForm: NearbySearchPlacesRequest = {
      keyword: 'placeName',
      lat: 10.124,
      lng: 20.123,
      radius: 50,
    };
    const mockResponse: SearchPlacesResponse = {
      error_message: '',
      html_attributions: [],
      status: Status.OK,
      results: [{
        ...FIXTURE_SEARCH_PLACE,
        searchBlogPost: {
          status: 'fulfilled',
          value: {
            ...FIXTURE_NAVER_SEARCH_BLOG,
            posts: null,
          },
        },
      }],
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it('GET /search/nearby/places', async () => {
      const response = await fetchNearbySearchPlaces(requestForm);

      expect(response).toEqual(mockResponse);
      expect(api).toHaveBeenCalledWith({
        method: 'GET',
        params: requestForm,
        url: '/search/nearby/places',
        type: 'bff',
      });
    });
  });

  describe('fetchPlaceDetail', () => {
    const placeId = 'placeId';
    const sessionToken = 'sessionToken';
    const mockResponse: SearchPlaceResponse = {
      error_message: '',
      html_attributions: [],
      status: Status.OK,
      result: {
        ...FIXTURE_SEARCH_PLACE,
        searchBlogPost: FIXTURE_NAVER_SEARCH_BLOG,
      },
    };

    beforeEach(() => {
      (api as jest.Mock).mockReturnValueOnce(mockResponse);
    });

    it(`GET /search/places/${placeId}`, async () => {
      const response = await fetchPlaceDetail({
        placeId,
        sessionToken,
      });

      expect(response).toEqual(mockResponse);
      expect(api).toHaveBeenCalledWith({
        method: 'GET',
        headers: {
          'session-token': sessionToken,
        },
        url: `/search/places/${placeId}`,
        type: 'bff',
      });
    });
  });
});
