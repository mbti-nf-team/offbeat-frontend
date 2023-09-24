import { useCallback, useEffect, useState } from 'react';

import { shallow } from 'zustand/shallow';

import useRenderToast from '@/hooks/useRenderToast';
import usePlaceStore from '@/stores/place';
import { filteredPlaces } from '@/utils';

type TextSearchRequest = google.maps.places.TextSearchRequest;

function useTextSearch(map: google.maps.Map | null) {
  const [placeService, setPlaceService] = useState<google.maps.places.PlacesService | undefined>();
  const renderToast = useRenderToast();
  const {
    setPlaces, placesResult, isZeroResult, setIsZeroResult,
  } = usePlaceStore((state) => ({
    isZeroResult: state.isZeroResult,
    setIsZeroResult: state.setIsZeroResult,
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

    setIsZeroResult(false);
    renderToast('다시 시도해주세요.', { type: 'error' });
  }

  const onTextSearch = useCallback((request: TextSearchRequest) => {
    if (request?.query) {
      placeService?.textSearch(request, textSearchAction);
    }
  }, [placeService]);

  useEffect(() => {
    if (map) {
      setPlaceService(new google.maps.places.PlacesService(map));
    }
  }, [map]);

  useEffect(() => {
    if (!placesResult.length || !map || isZeroResult) {
      return;
    }

    const markerBounds = new google.maps.LatLngBounds();

    placesResult.forEach((place) => {
      if (place?.geometry?.viewport) {
        markerBounds.union(place.geometry.viewport);
      }

      if (place?.geometry?.location) {
        markerBounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(markerBounds);
    map.fitBounds(markerBounds);
  }, [placesResult, map, isZeroResult]);

  return {
    onTextSearch,
    placesResult,
    isZeroResult,
  };
}

export default useTextSearch;
