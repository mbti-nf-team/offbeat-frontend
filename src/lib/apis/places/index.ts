import Cookies from 'js-cookie';

import CookieNames from '@/lib/constants/cookies';

import api from '..';

// eslint-disable-next-line import/prefer-default-export
export const getPlace = async (placeId: string) => {
  const accessToken = Cookies.get(CookieNames.ACCESS_TOKEN);

  if (!accessToken) {
    return null;
  }

  const response = await api<{ google_place_id: string; is_favorite: boolean; }>({
    method: 'GET',
    url: `/places/${placeId}`,
    type: 'public',
    headers: {
      // TODO - 임시
      Authorization: `Bearer ${Cookies.get(CookieNames.ACCESS_TOKEN)}`,
    },
  });

  return response;
};
