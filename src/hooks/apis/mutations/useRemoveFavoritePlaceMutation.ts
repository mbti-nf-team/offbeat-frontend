import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFavoritePlace } from '@/lib/apis/favoritePlace';
import useToastStore from '@/stores/toast';

function useRemoveFavoritePlaceMutation() {
  const queryClient = useQueryClient();
  const { renderToast } = useToastStore(['renderToast']);

  const mutation = useMutation<null, unknown, string>({
    mutationFn: (id) => deleteFavoritePlace(id),
    onSuccess: (_, id) => {
      renderToast('장소 저장을 해제했습니다.', {
        type: 'success',
      });

      queryClient.setQueryData<{ google_place_id: string; is_favorite: boolean; }>(['place', id], {
        google_place_id: id,
        is_favorite: false,
      });

      queryClient.invalidateQueries({
        queryKey: ['favoritePlaces'],
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
