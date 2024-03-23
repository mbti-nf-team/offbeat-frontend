import { useMutation } from '@tanstack/react-query';

import { deleteFavoritePlace } from '@/lib/apis/favoritePlace';
import useToastStore from '@/stores/toast';

function useRemoveFavoritePlaceMutation() {
  const { renderToast } = useToastStore(['renderToast']);

  const mutation = useMutation<null, unknown, string>({
    mutationFn: (id) => deleteFavoritePlace(id),
    onSuccess: () => {
      renderToast('장소 저장을 해제했습니다.', {
        type: 'success',
      });
    },
    onError: () => {
      renderToast('장소 저장을 해제에 실패했습니다.', {
        type: 'error',
      });
    },
  });

  return mutation;
}

export default useRemoveFavoritePlaceMutation;
