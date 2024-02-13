'use client';

import { useEffectOnce } from '@nf-team/react';

import Spinner from '@/components/common/Spinner';
import useAuthKakaoTokenMutation from '@/hooks/mutations/useAuthKakaoTokenMutation';
import useAuthorizeMutation from '@/hooks/mutations/useAuthorizeMutation';
import { KakaoLogo } from '@/lib/assets/logos';

import styles from './index.module.scss';

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
    <>
      {!!state && !!code ? (
        <div className={styles.loading}>
          <Spinner color="black" isLoading size="large" />
        </div>
      ) : (
        <div className={styles.loginWrapper}>
          <h1 className={styles.title}>소셜 계정으로 계속하기</h1>
          <button type="button" onClick={() => authorizeMutate()} disabled={!!state && !!code} className={styles.button}>
            <KakaoLogo />
          </button>
          <div className={styles.info}>여행에서 진짜 로컬 여행지 찾기</div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
