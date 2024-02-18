import api from '..';

import { AuthorizeResponse, TokenResponse, UserResponse } from './model';

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

export const getUser = async (params: { accessToken?: string; }) => {
  if (!params?.accessToken) {
    return null;
  }

  const response = await api<UserResponse>({
    url: '/users/me',
    type: 'public',
    method: 'GET',
    headers: {
      // TODO - 임시
      Authorization: `Bearer ${params.accessToken}`,
    },
    config: {
      cache: 'no-store',
    },
  });

  return response;
};
