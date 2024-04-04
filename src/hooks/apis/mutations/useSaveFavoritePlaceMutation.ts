import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postFavoritePlace } from '@/lib/apis/favoritePlace';
import { FavoritePlaceRequest } from '@/lib/apis/favoritePlace/model';
import { FavoritePlace } from '@/lib/types/favoritePlace';
import useToastStore from '@/stores/toast';

function useSaveFavoritePlaceMutation() {
  const queryClient = useQueryClient();
  const { renderToast } = useToastStore(['renderToast']);

  const mutation = useMutation<FavoritePlace, unknown, FavoritePlaceRequest>({
    mutationFn: (params) => postFavoritePlace(params),
    onSuccess: (response) => {
      renderToast('장소를 저장했습니다.', {
        type: 'success',
      });

      queryClient.setQueryData<{ google_place_id: string; is_favorite: boolean; }>(['place', response.google_place_id], {
        google_place_id: response.google_place_id,
        is_favorite: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['favoritePlaces'],
      });
    },
    onError: () => {
      renderToast('장소에 실패했습니다.', {
        type: 'error',
      });
    },
  });

  return mutation;
}

export default useSaveFavoritePlaceMutation;
