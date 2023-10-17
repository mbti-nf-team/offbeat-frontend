import useGetPlaceDetail from '@/hooks/queries/useGetPlaceDetail';
import useGetSearchBlog from '@/hooks/queries/useGetSearchBlog';
import { PlaceResult } from '@/lib/types/google.maps';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import PlaceDetailWindow from '../PlaceDetailWindow';

function PlaceDetailWindowContainer() {
  const {
    isOpenPlaceDetailWindow, onClosePlaceDetailWindow, placeId,
  } = usePlaceDetailWindowStore(['isOpenPlaceDetailWindow', 'onClosePlaceDetailWindow', 'placeId']);
  const { data: placeDetail, isSuccess } = useGetPlaceDetail({ placeId });

  const { data: placesWithSearchResult, isLoading } = useGetSearchBlog<true>({
    placesResult: [placeDetail?.result as PlaceResult],
    includePost: true,
    enabled: isSuccess && !!placeDetail?.result,
  });

  const onCloseDetailWindow = () => {
    onClosePlaceDetailWindow();
  };

  return (
    <PlaceDetailWindow
      isLoading={isLoading}
      isVisible={isOpenPlaceDetailWindow}
      placeDetail={placesWithSearchResult?.[0]}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
