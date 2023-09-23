import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { shallow } from 'zustand/shallow';

import useGetPlaceDetails from '@/hooks/maps/useGetPlaceDetails';
import { fetchAllSettledSearchBlogs } from '@/lib/apis/search';
import { PlacesWithSearchResult } from '@/lib/types/search';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';

import PlaceDetailWindow from '../PlaceDetailWindow';

function PlaceDetailWindowContainer() {
  const [placeDetailsState, onGetPlaceDetails, resetPlaceDetails] = useGetPlaceDetails();

  // const { data: searchBlogPost, isSuccess } = useGetSearchBlog<true>({
  //   placeName: [placeName] as string[],
  //   includePost: true,
  //   enabled: !!placeName,
  // });

  const {
    isOpenPlaceDetailWindow, onClosePlaceDetailWindow, placeId, placeName,
  } = usePlaceDetailWindowStore((state) => ({
    placeName: state.placeName,
    placeId: state.placeId,
    isOpenPlaceDetailWindow: state.isOpenPlaceDetailWindow,
    onClosePlaceDetailWindow: state.onClosePlaceDetailWindow,
  }), shallow);

  const { data: searchBlogPost, isLoading } = useQuery(
    [placeName, true],
    () => fetchAllSettledSearchBlogs<true>({ placeName: [placeName as string], includePost: true }),
    {
      enabled: !!placeName,
    },
  );

  const onCloseDetailWindow = () => {
    resetPlaceDetails();
    onClosePlaceDetailWindow();
  };

  const placeDetail = placeDetailsState && {
    ...placeDetailsState,
    searchBlogPost: searchBlogPost?.[0],
  } as PlacesWithSearchResult<true> | null;

  useEffect(() => {
    if (placeId) {
      onGetPlaceDetails(placeId);
    }
  }, [placeId]);

  return (
    <PlaceDetailWindow
      isLoading={isLoading}
      isVisible={isOpenPlaceDetailWindow}
      placeDetail={placeDetail}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
