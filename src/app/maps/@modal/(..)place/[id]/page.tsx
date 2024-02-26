'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import PlaceDetailPage from '@/components/place/PlaceDetailPage';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import Modal from './Modal';

type Props = {
  params: {
    id?: string;
  };
};

function Page({ params }: Props) {
  const router = useRouter();
  const {
    onClosePlaceDetailWindow, onOpenPlaceDetailWindow,
  } = usePlaceDetailWindowStore(['onClosePlaceDetailWindow', 'onOpenPlaceDetailWindow']);

  const onDismiss = () => {
    onClosePlaceDetailWindow();
    router.back();
  };

  useEffect(() => {
    onOpenPlaceDetailWindow({ placeId: params?.id });
  }, [params?.id]);

  return (
    <Modal>
      <PlaceDetailPage placeId={params?.id} onClose={onDismiss} />
    </Modal>
  );
}

export default Page;
