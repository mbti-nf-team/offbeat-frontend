import qs from 'qs';

import { FetchRequest } from '../types/api';

import api, { getUrl, paramsSerializer } from '.';

describe('paramsSerializer', () => {
  it('"qs.stringify"를 호출해야만 한다', () => {
    const qsSpyOn = jest.spyOn(qs, 'stringify');
    const params = {
      param1: 'apple',
      param2: 'banana',
      param3: 'orange',
    };

    const result = paramsSerializer(params);

    expect(result).toBe('param1=apple&param2=banana&param3=orange');
    expect(qsSpyOn).toHaveBeenCalledWith(params, {
      indices: false,
      arrayFormat: 'comma',
    });

    qsSpyOn.mockRestore();
  });
});

describe('getUrl', () => {
  const path = '/path';

  context('type이 "bff"인 경우', () => {
    it('url 앞에 "/api"가 붙어서 반환해야만 한다', () => {
      const url = getUrl('/path', 'bff');

      expect(url).toBe(`${process.env.NEXT_PUBLIC_ORIGIN}/api${path}`);
    });
  });

  context('type이 "google"인 경우', () => {
    it('url 앞에 NEXT_PUBLIC_API_HOST가 붙어서 반환해야만 한다', () => {
      const url = getUrl('/path', 'google');

      expect(url).toBe(`${process.env.NEXT_PUBLIC_API_HOST}${path}`);
    });
  });

  context('type이 "public"인 경우', () => {
    it('url 앞에 NEXT_PUBLIC_API_HOST가 붙어서 반환해야만 한다', () => {
      const url = getUrl('/path', 'public');

      expect(url).toBe(`${process.env.NEXT_PUBLIC_API_HOST}${path}`);
    });
  });
});

describe('api', () => {
  const mockResponse = {
    data: 'mockData',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  const mockRequestConfig = (url: string, params?: string): FetchRequest<string> => ({
    url,
    method: 'get',
    params,
  });

  context('fetch가 성공한 경우', () => {
    (window.fetch as jest.Mock) = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    }));

    it('fetch가 호출되야만 한다', async () => {
      const response = await api<string>(mockRequestConfig('/test/test', 'test'));

      expect(response).toBe(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  context('fetch가 실패한 경우', () => {
    const statusText = 'error';

    it('에러가 던저져야 한다', async () => {
      (window.fetch as jest.Mock) = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
        }),
        statusText,
        ok: false,
      }));

      const throwErrorApiResponse = () => api<string>(mockRequestConfig('/test/test', 'test'));

      await expect(throwErrorApiResponse).rejects.toThrow(statusText);
    });
  });
});
