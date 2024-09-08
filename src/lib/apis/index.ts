import qs from 'qs';

import { FetchRequest, UrlPrefixType } from '../types/api';

export class FetchError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'FetchError';
  }
}

export const paramsSerializer = <T>(params: T): string => qs.stringify(params, {
  arrayFormat: 'comma',
  indices: false,
});

export const getUrl = (url: string, type: UrlPrefixType) => {
  if (type === 'bff') {
    return `${process.env.NEXT_PUBLIC_ORIGIN}/api${url}`;
  }

  if (type === 'google') {
    return `${process.env.GOOGLE_MAP_API_ORIGIN}${url}`;
  }

  return `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
};

async function api<T, K = unknown>({
  url, params, config = {}, headers, type = 'public', method = 'GET',
}: FetchRequest<K>): Promise<T> {
  const defaultHeader = new Headers(headers);

  if (type === 'public') {
    defaultHeader.set('nfteam-api-token', process.env.API_HEADER_TOKEN);
  }

  const googleKey = type === 'google' ? { key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY } : undefined;

  const defaultParams = paramsSerializer({
    ...params,
    ...googleKey,
  });

  try {
    const response = await fetch(`${getUrl(url, type)}${defaultParams ? `?${defaultParams}` : ''}`, {
      headers: {
        ...defaultHeader,
        ...headers,
        ...(config?.body ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        } : {}),
      },
      method,
      ...config,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));

      throw new FetchError(response.status, errorBody?.message || response.statusText);
    }

    if (response.status === 204) {
      return null as T;
    }

    const data = await response.json() as T;

    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    throw new FetchError(500, 'An unexpected error occurred');
  }
}

export default api;
