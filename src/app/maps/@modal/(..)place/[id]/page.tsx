import { cookies } from 'next/headers';

import { getUser } from '@/lib/apis/auth';
import CookieNames from '@/lib/constants/cookies';

import PlacePage from './_components/PlacePage';

type Props = {
  params: Promise<{
    id?: string;
  }>;
};

async function Page({ params }: Props) {
  const cookiesStore = await cookies();
  const resolvedParams = await params;
  const accessToken = cookiesStore.get(CookieNames.ACCESS_TOKEN);

  const user = await getUser({ accessToken: accessToken?.value });

  return (
    <PlacePage placeId={resolvedParams?.id} user={user} />
  );
}

export default Page;
