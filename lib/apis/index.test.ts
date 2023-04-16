import mockAxios from 'axios';
import { RequestConfig } from 'lib/types/api';
import qs from 'qs';

import { api, getUrl, paramsSerializer } from '.';

jest.mock('axios');

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

  context('isBFF가 true인 경우', () => {
    it('url 앞에 "/api"가 붙어서 반환해야만 한다', () => {
      const url = getUrl('/path', true);

      expect(url).toBe(`/api${path}`);
    });
  });

  context('isBFF가 false인 경우', () => {
    it('url 앞에 NEXT_PUBLIC_API_HOST가 붙어서 반환해야만 한다', () => {
      const url = getUrl('/path');

      expect(url).toBe(`${process.env.NEXT_PUBLIC_API_HOST}${path}`);
    });
  });
});

describe('api', () => {
  const mockResponse = {
    data: 'mockData',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (mockAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);
  });

  const mockAxiosRequestConfig = (url: string, params?: string): RequestConfig => ({
    url,
    method: 'get',
    params,
  });

  context('올바른 URL인 경우', () => {
    it('axios가 호출되야만 한다', async () => {
      const response = await api<string>(mockAxiosRequestConfig('/test/test', 'test'));

      expect(response).toBe(mockResponse.data);
      expect(mockAxios).toBeCalledTimes(1);
    });
  });

  context('올바르지 않은 URL인 경우', () => {
    it('에러가 던저져야 한다', async () => {
      const throwErrorApiResponse = () => api<string>(mockAxiosRequestConfig('http://www.test.com', 'test'));

      await expect(throwErrorApiResponse).rejects.toThrow('External url is injected');
    });
  });
});
