import { useEffect, useMemo, useState } from 'react';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, isEmpty } from '@nf-team/core';
import { useGoogleMap } from '@react-google-maps/api';

import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import useGetSearchPlaces from '@/hooks/queries/useGetSearchPlaces';
import useCurrentLocationStore from '@/stores/currentLocation';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchKeywordStore from '@/stores/searchKeyword';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function LoadMapContainer({ defaultCountryCode, defaultPlaceId, defaultLocation }: Props) {
  const map = useGoogleMap();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore(['searchKeyword', 'setSearchKeyword']);
  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);
  const { setCurrentLocationMarker } = useCurrentLocationStore(['setCurrentLocationMarker']);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  useRenderCurrentLocationMarker({ ...defaultLocation });

  const {
    query: {
      data: places, isSuccess, isFetching, isFetchingNextPage,
    }, refState,
  } = useGetSearchPlaces({ keyword: searchKeyword });

  const handleSubmit = (keyword: string) => {
    setSelectedPlaceId(undefined);
    setSearchKeyword(keyword);
    saveNextKeyword(keyword);
  };

  const placesWithSearchResult = useMemo(() => checkEmpty(places?.pages)
    .filter((page) => !!page.results?.length && page.status === Status.OK)
    .flatMap((page) => page.results), [places]);

  useEffect(() => {
    if (defaultPlaceId && map) {
      onOpenPlaceDetailWindow({
        placeId: defaultPlaceId,
      });
    }
  }, [defaultPlaceId, map]);

  useEffect(() => {
    if (!map || !defaultCountryCode) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    const geocoderCallbackResult = (
      results: google.maps.GeocoderResult[] | null,
      status: google.maps.GeocoderStatus,
    ) => {
      if (status !== google.maps.GeocoderStatus.OK || !results?.[0].geometry.bounds) {
        return;
      }

      map.setCenter(results[0].geometry.bounds.getCenter());
    };

    geocoder?.geocode({
      componentRestrictions: {
        country: defaultCountryCode || 'KR',
      },
    }, geocoderCallbackResult);
  }, [defaultCountryCode, map]);

  useEffect(() => {
    if (!map || !isSuccess || isEmpty(placesWithSearchResult)) {
      return;
    }

    const markerBounds = new google.maps.LatLngBounds();

    placesWithSearchResult.forEach((place) => {
      if (place?.geometry?.location) {
        markerBounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(markerBounds);
  }, [map, isSuccess, placesWithSearchResult]);

  useEffect(() => {
    if (map) {
      setCurrentLocationMarker(new google.maps.Marker({
        map,
        zIndex: 3,
      }));
    }
  }, [map]);

  return (
    <>
      <SearchInput
        onSubmit={handleSubmit}
        selectedPlaceId={selectedPlaceId}
        onClearSelectedPlace={() => setSelectedPlaceId(undefined)}
      />
      {placesWithSearchResult.map((place, _, array) => (
        <PlaceResultMarker
          key={place.place_id}
          place={place}
          onClickMarker={setSelectedPlaceId}
          selectedPlaceId={array.length === 1 ? place.place_id : selectedPlaceId}
        />
      ))}
      <PlaceBottomSheet
        places={placesWithSearchResult}
        selectedPlaceId={selectedPlaceId}
        refState={refState}
        isSuccess={isSuccess}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        setSelectedPlaceId={setSelectedPlaceId}
      />
      <PlaceDetailWindowContainer />
    </>
  );
}

export default LoadMapContainer;
