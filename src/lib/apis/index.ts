import axios from 'axios';
import qs from 'qs';

import { RequestConfig } from '@/lib/types/api';

export const paramsSerializer = <T>(params: T): string => qs.stringify(params, {
  arrayFormat: 'comma',
  indices: false,
});

export const getUrl = (url: string, isBFF = false) => {
  if (isBFF) {
    return `/api${url}`;
  }

  return `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
};

export async function api<T>(config: RequestConfig): Promise<T> {
  const headers: RequestConfig['headers'] = {
    ...config.headers,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const isExternal = config.url.indexOf('://') > -1 || config.url.indexOf('//') > -1;

  if (isExternal) {
    throw new Error('External url is injected');
  }

  const { data } = await axios({
    ...config,
    headers,
    url: getUrl(config.url, config.isBFF),
    paramsSerializer,
  });

  return data;
}
