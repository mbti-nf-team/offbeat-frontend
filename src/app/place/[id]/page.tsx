'use client';

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

  return (
    <PlaceDetailPage
      placeId={params?.id}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlacePage;
