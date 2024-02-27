'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useBoolean } from '@nf-team/react';

import PlaceDetailPage from '@/components/place/PlaceDetailPage';

import Modal from './Modal';

type Props = {
  params: {
    id?: string;
  };
};

function Page({ params }: Props) {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useBoolean(false);

  const onDismiss = () => {
    onClose();

    setTimeout(() => {
      router.back();
    }, 300);
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <PlaceDetailPage placeId={params?.id} onClose={onDismiss} />
    </Modal>
  );
}

export default Page;
