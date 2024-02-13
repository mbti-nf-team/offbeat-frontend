'use client';

import { PropsWithChildren, useEffect } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { useRouter } from 'next/navigation';

import { useBoolean } from '@nf-team/react';

function LoginBottomSheet({ children }: PropsWithChildren) {
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
    <BottomSheet
      open={isOpen}
      onDismiss={onDismiss}
      blocking={false}
    >
      {children}
    </BottomSheet>
  );
}

export default LoginBottomSheet;
