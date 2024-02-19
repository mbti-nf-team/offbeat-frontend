'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import CookieNames from '@/lib/constants/cookies';

const logoutAction = () => {
  const cookiesStore = cookies();

  cookiesStore.delete(CookieNames.ACCESS_TOKEN);
  cookiesStore.delete(CookieNames.REFRESH_TOKEN);

  revalidatePath('/maps');
};

export default logoutAction;
