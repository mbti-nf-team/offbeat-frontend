'use client';

import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { useIsomorphicLayoutEffect } from '@nf-team/react';

import PlaceDetail from '../PlaceDetail';

type Props = {
  id?: string;
};

function PlacePage({ id }: Props) {
  const router = useRouter();

  const onCloseDetailWindow = () => {
    router.push('/' as Route);
  };

  useIsomorphicLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <PlaceDetail
      placeId={id}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlacePage;
