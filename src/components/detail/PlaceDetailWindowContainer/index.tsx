import { useEffect } from 'react';

import { shallow } from 'zustand/shallow';

import useGetPlaceDetails from '@/hooks/maps/useGetPlaceDetails';
import useGetSearchBlog from '@/hooks/queries/useGetSearchBlog';
import { PlaceResult } from '@/lib/types/google.maps';
import { PlacesWithSearchResult } from '@/lib/types/search';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import PlaceDetailWindow from '../PlaceDetailWindow';

function PlaceDetailWindowContainer() {
  const [placeDetailsState, onGetPlaceDetails, resetPlaceDetails] = useGetPlaceDetails();

  const {
    isOpenPlaceDetailWindow, onClosePlaceDetailWindow, placeId,
  } = usePlaceDetailWindowStore((state) => ({
    placeName: state.placeName,
    placeId: state.placeId,
    isOpenPlaceDetailWindow: state.isOpenPlaceDetailWindow,
    onClosePlaceDetailWindow: state.onClosePlaceDetailWindow,
  }), shallow);

  const { data: placesWithSearchResult, isLoading } = useGetSearchBlog<true>({
    placesResult: [placeDetailsState as PlaceResult],
    includePost: true,
    enabled: !!placeDetailsState,
  });

  const onCloseDetailWindow = () => {
    resetPlaceDetails();
    onClosePlaceDetailWindow();
  };

  useEffect(() => {
    if (placeId) {
      onGetPlaceDetails(placeId);
    }
  }, [placeId]);

  return (
    <PlaceDetailWindow
      isLoading={isLoading}
      isVisible={isOpenPlaceDetailWindow}
      placeDetail={placesWithSearchResult?.[0] as PlacesWithSearchResult<true> | null}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
