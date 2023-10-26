import { useIsomorphicLayoutEffect, useUnmount } from '@nf-team/react';

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

  useIsomorphicLayoutEffect(() => {
    if (isOpenPlaceDetailWindow) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [isOpenPlaceDetailWindow]);

  useUnmount(() => {
    document.body.style.overflow = '';
  });

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
