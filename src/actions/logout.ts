'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { postAuthTokenRevoke } from '@/lib/apis/auth';
import CookieNames from '@/lib/constants/cookies';

const logoutAction = async () => {
  const cookiesStore = cookies();

  const refreshToken = cookiesStore.get(CookieNames.REFRESH_TOKEN);
  const accessToken = cookiesStore.get(CookieNames.ACCESS_TOKEN);

  await postAuthTokenRevoke({ refreshToken: refreshToken?.value, accessToken: accessToken?.value });

  cookiesStore.delete(CookieNames.ACCESS_TOKEN);
  cookiesStore.delete(CookieNames.REFRESH_TOKEN);

  revalidateTag('users/me');
};

export default logoutAction;
