import { useCallback, useEffect, useState } from 'react';

import useRenderToast from 'hooks/useRenderToast';
import usePlaceStore from 'stores/place';
import { shallow } from 'zustand/shallow';

import { filteredPlaces } from 'utils';

type TextSearchRequest = google.maps.places.TextSearchRequest;

function useTextSearch(map: google.maps.Map | null) {
  const [placeService, setPlaceService] = useState<google.maps.places.PlacesService | undefined>();
  const renderToast = useRenderToast();
  const [isZeroResult, setIsZeroResult] = useState<boolean>();
  const { setPlaces, placesResult } = usePlaceStore((state) => ({
    setPlaces: state.setPlaces,
    placesResult: state.places,
  }), shallow);

  function textSearchAction(
    places: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus,
    // TODO - 추후 페이지네이션 적용
    pagination: google.maps.places.PlaceSearchPagination | null,
  ) {
    if (status === google.maps.places.PlacesServiceStatus.OK && places?.length) {
      setIsZeroResult(false);
      setPlaces(filteredPlaces(places));
      return;
    }

    if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS || !places?.length) {
      setIsZeroResult(true);
      return;
    }

    setIsZeroResult(true);
    renderToast('다시 시도해주세요.', { type: 'error' });
  }

  const onTextSearch = useCallback((request: TextSearchRequest) => {
    if (request?.query) {
      placeService?.textSearch({
        ...request,
        // TODO - 입력받을 수 있겠끔 변경
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(20.3585295, 122.8554688),
          new google.maps.LatLng(45.6412626, 154.0031455),
        ),
      }, textSearchAction);
    }
  }, [placeService]);

  useEffect(() => {
    if (map) {
      setPlaceService(new google.maps.places.PlacesService(map));
    }
  }, [map]);

  return {
    onTextSearch,
    placesResult,
    isZeroResult,
  };
}

export default useTextSearch;
