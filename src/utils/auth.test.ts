import { jwtDecode } from 'jwt-decode';

import { isExpired } from './auth';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

const tomorrow = (date: Date) => {
  date.setDate(date.getDate() + 1);

  return date.getTime();
};

const yesterday = (date: Date) => {
  date.setDate(date.getDate() - 1);

  return date.getTime();
};

describe('isExpired', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('토큰이 없는 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isExpired('');

      expect(result).toBeTruthy();
    });
  });

  context('토큰 만료일이 지나지 않은 경우', () => {
    beforeEach(() => {
      (jwtDecode as jest.Mock).mockImplementationOnce(() => ({
        exp: tomorrow(new Date()) / 1000,
      }));
    });

    it('false를 반환해야만 한다', () => {
      const result = isExpired('token');

      expect(result).toBeFalsy();
    });
  });

  context('토큰 만료일이 지난 경우', () => {
    beforeEach(() => {
      (jwtDecode as jest.Mock).mockImplementationOnce(() => ({
        exp: yesterday(new Date()) / 1000,
      }));
    });

    it('true를 반환해야만 한다', () => {
      const result = isExpired('token');

      expect(result).toBeTruthy();
    });
  });

  context('토큰 만료일이 존재하지 않는 경우', () => {
    beforeEach(() => {
      (jwtDecode as jest.Mock).mockImplementationOnce(() => ({
        exp: '',
      }));
    });

    it('true를 반환해야만 한다', () => {
      const result = isExpired('token');

      expect(result).toBeTruthy();
    });
  });

  context('유효하지 않은 토큰일 경우', () => {
    it('true를 반환해야만 한다', () => {
      const result = isExpired('token');

      expect(result).toBeTruthy();
    });
  });
});
