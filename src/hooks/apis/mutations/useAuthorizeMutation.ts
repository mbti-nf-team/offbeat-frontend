import { useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { postAuthorize } from '@/lib/apis/auth';

function useAuthorizeMutation() {
  const searchParams = useSearchParams();

  const mutation = useMutation<{ redirect_url: string }>({
    mutationFn: () => postAuthorize(),
    onSuccess: ({ redirect_url }) => {
      sessionStorage.setItem('params', searchParams.toString());
      window.location.href = redirect_url;
    },
  });

  return mutation;
}

export default useAuthorizeMutation;
