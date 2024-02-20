'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import CookieNames from '@/lib/constants/cookies';

const logoutAction = () => {
  const cookiesStore = cookies();

  cookiesStore.delete(CookieNames.ACCESS_TOKEN);
  cookiesStore.delete(CookieNames.REFRESH_TOKEN);

  revalidateTag('users/me');
};

export default logoutAction;
