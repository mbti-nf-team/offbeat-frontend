import { Route } from 'next';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { postAuthKakaoToken } from '@/lib/apis/auth';
import { TokenRequest, TokenResponse } from '@/lib/apis/auth/model';
import useToastStore from '@/stores/toast';

function useAuthKakaoTokenMutation() {
  const router = useRouter();
  const { renderToast } = useToastStore(['renderToast']);

  const mutation = useMutation<TokenResponse, unknown, TokenRequest>({
    mutationFn: postAuthKakaoToken,
    onSuccess: () => {
      renderToast('로그인에 성공했어요.', {
        type: 'success',
      });

      router.replace('/' as Route);
    },
    onError: () => {
      renderToast('로그인에 실패했어요.', {
        type: 'error',
      });
    },
  });

  return mutation;
}

export default useAuthKakaoTokenMutation;
