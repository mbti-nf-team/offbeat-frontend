'use client';

import { useIsomorphicLayoutEffect } from '@nf-team/react';

import PlaceDetailPage from '../PlaceDetailPage';

type Props = {
  id?: string;
};

function PlacePage({ id }: Props) {
  const onCloseDetailWindow = () => {
    // TODO - 추후 정의
    console.log('clicked close');
  };

  useIsomorphicLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <PlaceDetailPage
      placeId={id}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlacePage;
