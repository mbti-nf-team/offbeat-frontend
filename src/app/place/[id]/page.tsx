'use client';

import { useIsomorphicLayoutEffect } from '@nf-team/react';

import PlaceDetailPage from '@/components/place/PlaceDetailPage';

type Props = {
  params: {
    id?: string;
  };
};

function PlacePage({ params }: Props) {
  const onCloseDetailWindow = () => {
    // TODO - 추후 정의
    console.log('clicked close');
  };

  useIsomorphicLayoutEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <PlaceDetailPage
      placeId={params?.id}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlacePage;
