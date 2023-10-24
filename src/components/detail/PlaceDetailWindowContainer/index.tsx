import useGetSearchPlace from '@/hooks/queries/useGetSearchPlace';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import PlaceDetailWindow from '../PlaceDetailWindow';

function PlaceDetailWindowContainer() {
  const {
    isOpenPlaceDetailWindow, onClosePlaceDetailWindow, placeId,
  } = usePlaceDetailWindowStore(['isOpenPlaceDetailWindow', 'onClosePlaceDetailWindow', 'placeId']);
  const { data: placesWithSearchResult, isFetching } = useGetSearchPlace({ placeId });

  const onCloseDetailWindow = () => {
    onClosePlaceDetailWindow();
  };

  return (
    <PlaceDetailWindow
      isLoading={isFetching}
      isVisible={isOpenPlaceDetailWindow}
      placeDetail={placesWithSearchResult?.result}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
