'use client';

import { useEffectOnce } from '@nf-team/react';

import useAuthKakaoTokenMutation from '@/hooks/mutations/useAuthKakaoTokenMutation';
import useAuthorizeMutation from '@/hooks/mutations/useAuthorizeMutation';

import Button from '../../common/Button';

type Props = {
  code?: string;
  state?: string;
};

function LoginPage({ state, code }: Props) {
  const { mutate: authorizeMutate } = useAuthorizeMutation();
  const { mutate: authKakaoTokenMutate } = useAuthKakaoTokenMutation();

  useEffectOnce(() => {
    if (state && code) {
      authKakaoTokenMutate({ state, code });
    }
  });

  return (
    <Button
      onClick={() => authorizeMutate()}
      type="button"
      disabled={!!state && !!code}
    >
      카카오로 로그인하기
    </Button>
  );
}

export default LoginPage;
