'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { User } from '@/lib/types/auth';

import PlaceDetail from '../PlaceDetail';

type Props = {
  placeId?: string;
  user: User | null;
};

function PlacePage({ placeId, user }: Props) {
  const router = useRouter();

  const onCloseDetailWindow = () => {
    router.push('/' as Route);
  };

  return (
    <PlaceDetail
      user={user}
      placeId={placeId}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlacePage;
