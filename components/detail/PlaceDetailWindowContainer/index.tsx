import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import useGetPlaceDetails from 'hooks/maps/useGetPlaceDetails';
import useBoolean from 'hooks/useBoolean';
import { fetchAllSettledSearchBlogs } from 'lib/apis/search';
import { PlacesWithSearchResult } from 'lib/types/google.maps';

import PlaceDetailWindow from '../PlaceDetailWindow';

type Props = {
  placeName?: string;
  placeId?: string;
  onRestPlace: () => void;
};

function PlaceDetailWindowContainer({ placeName, placeId, onRestPlace }: Props) {
  const [isVisibleInfoWindow, openDetailWindow, closeDetailWindow] = useBoolean(false);
  const [placeDetailsState, onGetPlaceDetails, resetPlaceDetails] = useGetPlaceDetails();

  // const { data: searchBlogPost, isSuccess } = useGetSearchBlog<true>({
  //   placeName: [placeName] as string[],
  //   includePost: true,
  //   enabled: !!placeName,
  // });

  const { data: searchBlogPost, isSuccess, isLoading } = useQuery(
    [placeName, true],
    () => fetchAllSettledSearchBlogs<true>({ placeName: [placeName as string], includePost: true }),
    {
      enabled: !!placeName,
    },
  );

  const onCloseDetailWindow = () => {
    closeDetailWindow();
    resetPlaceDetails();
    onRestPlace();
  };

  const placeDetail = placeDetailsState && {
    ...placeDetailsState,
    searchBlogPost: searchBlogPost?.[0],
  } as PlacesWithSearchResult<true> | null;

  useEffect(() => {
    if (placeId) {
      openDetailWindow();
      onGetPlaceDetails(placeId);
    }
  }, [placeId]);

  return (
    <PlaceDetailWindow
      isLoading={isLoading}
      isVisible={isVisibleInfoWindow}
      placeDetail={placeDetail}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;
