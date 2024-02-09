import { useMutation } from '@tanstack/react-query';

import { postAuthorize } from '@/lib/apis/auth';

function useAuthorizeMutation() {
  const mutation = useMutation<{ redirect_url: string }>({
    mutationFn: () => postAuthorize(),
    onSuccess: ({ redirect_url }) => {
      window.location.href = redirect_url;
    },
  });

  return mutation;
}

export default useAuthorizeMutation;
