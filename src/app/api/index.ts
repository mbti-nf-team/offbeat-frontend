import { paramsSerializer } from '@/lib/apis';

export class FetchError extends Error {
  constructor(
    response: Response,
  ) {
    super();
    this.response = response;
  }

  response?: Response;
}

type UrlPrefixType = 'public' | 'google' | 'bff';

type FetchRequest = {
  urlPrefixType?: UrlPrefixType;
  url: string;
  params?: any;
  config?: RequestInit;
};

const getUrl = (url: string, type: UrlPrefixType) => {
  if (type === 'bff') {
    return `/api${url}`;
  }

  if (type === 'google') {
    return `${process.env.GOOGLE_MAP_API_ORIGIN}${url}`;
  }

  return `${process.env.NEXT_PUBLIC_API_HOST}${url}`;
};

async function api<T>({
  url, params, config = {}, urlPrefixType = 'public',
}: FetchRequest): Promise<T> {
  const googleKey = urlPrefixType === 'google' ? { key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY } : undefined;

  const response = await fetch(`${getUrl(url, urlPrefixType)}?${paramsSerializer({
    ...params,
    ...googleKey,
  })}`, {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new FetchError(response);
  }

  const data = await response.json() as Promise<T>;

  return data;
}

export default api;
