import { jwtDecode, JwtPayload } from 'jwt-decode';

// eslint-disable-next-line import/prefer-default-export
export const isExpired = (token?: string, time = 0) => {
  if (!token) {
    return true;
  }

  try {
    const result = jwtDecode<JwtPayload>(token);

    return Date.now() + time > new Date((result.exp || 0) * 1000).getTime();
  } catch (error) {
    return true;
  }
};
