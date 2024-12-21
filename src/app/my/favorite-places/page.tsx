import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import FavoritePlacesPage from '@/components/my/FavoritePlacesPage';
import CookieNames from '@/lib/constants/cookies';

async function Page() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get(CookieNames.ACCESS_TOKEN);

  if (!accessToken?.value) {
    redirect('/');
  }

  return (
    <FavoritePlacesPage />
  );
}

export default Page;
