import { useEffect, useState } from 'react';

import { PlaceResult } from 'lib/types/google.maps';

import { filteredPlaces } from 'utils';

const ONE_THOUSAND_METER = 1000;

function useNearBySearch(map: google.maps.Map | null) {
  const [placeService, setPlaceService] = useState<google.maps.places.PlacesService | undefined>();
  const [placeResults, setPlaceResults] = useState<PlaceResult[]>([]);

  function nearBySearchAction(
    places: google.maps.places.PlaceResult[] | null,
    status: google.maps.places.PlacesServiceStatus,
    // TODO - 추후 페이지네이션 적용
    pagination: google.maps.places.PlaceSearchPagination | null,
  ) {
    if (status === google.maps.places.PlacesServiceStatus.OK && places?.length) {
      setPlaceResults(filteredPlaces(places));
    }
  }

  useEffect(() => {
    if (map) {
      setPlaceService(new google.maps.places.PlacesService(map));
    }
  }, [map]);

  useEffect(() => {
    if (placeService) {
      placeService.nearbySearch({
        type: 'restaurant',
        language: 'ko',
        location: map?.getCenter(),
        radius: ONE_THOUSAND_METER,
      }, nearBySearchAction);
    }
  }, [placeService]);

  return placeResults;
}

export default useNearBySearch;
