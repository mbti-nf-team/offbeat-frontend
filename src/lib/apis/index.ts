import qs from 'qs';

import { FetchRequest, UrlPrefixType } from '../types/api';

export class FetchError extends Error {
  constructor(
    response: Response,
    errorMessage = '',
  ) {
    super();
    this.response = response;
    this.message = errorMessage;
  }

  response?: Response;
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

async function api<T, K = any>({
  url, params, config = {}, headers, type = 'public', method = 'GET',
}: FetchRequest<K>): Promise<T> {
  const defaultHeader = type === 'public' ? { 'nfteam-api-token': process.env.API_HEADER_TOKEN } : undefined;
  const googleKey = type === 'google' ? { key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY } : undefined;

  const response = await fetch(`${getUrl(url, type)}?${paramsSerializer({
    ...params,
    ...googleKey,
  })}`, {
    ...config,
    headers: {
      ...defaultHeader,
      ...headers,
      ...(config?.body ? {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      } : {}),
    },
    method,
  });

  if (!response.ok) {
    throw new FetchError(response, response.statusText);
  }

  if (response.status === 204) {
    return null as T;
  }

  const data = await response.json() as Promise<T>;

  return data;
}

export default api;
