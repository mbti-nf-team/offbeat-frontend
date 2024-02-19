import api from '..';

import {
  AuthorizeResponse, TokenRefreshResponse, TokenResponse, UserResponse,
} from './model';

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

export const postAuthRefresh = async (params: { refreshToken?: string; }) => {
  const response = await api<TokenRefreshResponse, { refresh_token?: string; }>({
    url: '/auth/tokens/refresh',
    type: 'public',
    method: 'POST',
    params: {
      refresh_token: params.refreshToken,
    },
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
