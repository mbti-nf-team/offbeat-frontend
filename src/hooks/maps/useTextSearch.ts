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
    addPlaces, placesResult, isZeroResult, setIsZeroResult, setPagination, resetPlaces,
  } = usePlaceStore((state) => ({
    isZeroResult: state.isZeroResult,
    setIsZeroResult: state.setIsZeroResult,
    addPlaces: state.addPlaces,
    placesResult: state.places,
    setPagination: state.setPagination,
    resetPlaces: state.resetPlaces,
  }), shallow);

  function textSearchAction(
    places: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus,
    pagination: google.maps.places.PlaceSearchPagination | null,
  ) {
    if (status === google.maps.places.PlacesServiceStatus.OK && places?.length) {
      setIsZeroResult(false);
      addPlaces(filteredPlaces(places));
      setPagination({
        hasNextPage: pagination?.hasNextPage,
        fetchNextPage: () => {
          pagination?.nextPage();
        },
      });

      return;
    }

    if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS || !places?.length) {
      setIsZeroResult(true);
      return;
    }

    setIsZeroResult(false);
    resetPlaces();
    renderToast('다시 시도해주세요.', { type: 'error' });
  }

  const onTextSearch = useCallback((request: TextSearchRequest) => {
    if (request?.query) {
      resetPlaces();
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
