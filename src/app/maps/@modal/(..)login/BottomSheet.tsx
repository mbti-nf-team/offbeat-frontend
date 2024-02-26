'use client';

import { PropsWithChildren, useEffect } from 'react';
import { BottomSheet as ReactBottomSheet } from 'react-spring-bottom-sheet';

import { useRouter } from 'next/navigation';

import { useBoolean } from '@nf-team/react';

function BottomSheet({ children }: PropsWithChildren) {
  const router = useRouter();

  const [isOpen, onOpen, onClose] = useBoolean(false);

  const onDismiss = () => {
    router.back();
    onClose();
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <ReactBottomSheet
      open={isOpen}
      onDismiss={onDismiss}
      blocking={false}
    >
      {children}
    </ReactBottomSheet>
  );
}

export default BottomSheet;
