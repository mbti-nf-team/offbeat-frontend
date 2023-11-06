import { TextSearchResponseData } from '@googlemaps/google-maps-services-js';

import api from '..';

import { TextSearchRequestParams } from './model';

// eslint-disable-next-line import/prefer-default-export
export const getGoogleTextSearch = async (params: TextSearchRequestParams) => {
  const response = await api<TextSearchResponseData>({
    url: '/place/textsearch/json',
    urlPrefixType: 'google',
    config: {
      method: 'GET',
    },
    params,
  });

  return response;
};
