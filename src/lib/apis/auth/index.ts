import api from '..';

import { AuthorizeResponse, TokenResponse } from './model';

// eslint-disable-next-line import/prefer-default-export
export const postAuthorize = async () => {
  const response = await api<AuthorizeResponse>({
    method: 'POST',
    url: '/auth/kakao/authorize',
    type: 'public',
    config: {
      cache: 'no-store',
    },
  });

  return response;
};

export const postAuthKakaoToken = async (params: { code: string; state: string; }) => {
  const response = await api<TokenResponse, { code: string; state: string; }>({
    url: '/auth/callback/kakao',
    type: 'bff',
    method: 'POST',
    params,
  });

  return response;
};
