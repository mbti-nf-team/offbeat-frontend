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
};

function PlaceDetailWindowContainer({ placeName, placeId }: Props) {
  const [isVisibleInfoWindow, openDetailWindow, closeDetailWindow] = useBoolean(false);
  const [placeDetailsState, onGetPlaceDetails, resetPlaceDetails] = useGetPlaceDetails();

  // const { data: searchBlogPost, isSuccess } = useGetSearchBlog<true>({
  //   placeName: [placeName] as string[],
  //   includePost: true,
  //   enabled: !!placeName,
  // });

  const { data: searchBlogPost, isSuccess } = useQuery(
    [placeName, true],
    () => fetchAllSettledSearchBlogs<true>({ placeName: [placeName as string], includePost: true }),
    {
      enabled: !!placeName,
    },
  );

  const onCloseDetailWindow = () => {
    closeDetailWindow();
    resetPlaceDetails();
  };

  useEffect(() => {
    if (placeDetailsState && isSuccess) {
      openDetailWindow();
    }
  }, [placeDetailsState, isSuccess]);

  useEffect(() => {
    if (placeId) {
      onGetPlaceDetails(placeId);
    }
  }, [placeId]);

  const placeDetails = {
    ...placeDetailsState,
    searchBlogPost: searchBlogPost?.[0],
  } as PlacesWithSearchResult<true>;

  return (
    <PlaceDetailWindow
      isVisible={isVisibleInfoWindow}
      placeDetails={placeDetails}
      onClose={onCloseDetailWindow}
    />
  );
}

export default PlaceDetailWindowContainer;