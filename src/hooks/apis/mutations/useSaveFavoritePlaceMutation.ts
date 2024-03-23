import { useMutation } from '@tanstack/react-query';

import { postFavoritePlace } from '@/lib/apis/favoritePlace';
import { FavoritePlaceRequest } from '@/lib/apis/favoritePlace/model';
import { FavoritePlace } from '@/lib/types/favoritePlace';
import useToastStore from '@/stores/toast';

function useSaveFavoritePlaceMutation() {
  const { renderToast } = useToastStore(['renderToast']);

  const mutation = useMutation<FavoritePlace, unknown, FavoritePlaceRequest>({
    mutationFn: (params) => postFavoritePlace(params),
    onSuccess: () => {
      renderToast('장소를 저장했습니다.', {
        type: 'success',
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
