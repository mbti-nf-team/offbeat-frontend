import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, isEmpty } from '@nf-team/core';
import { useGoogleMap } from '@react-google-maps/api';

import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import useGetSearchPlaces from '@/hooks/queries/useGetSearchPlaces';
import { LatLngLiteral } from '@/lib/types/google.maps';
import useCurrentLocationStore from '@/stores/currentLocation';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchFormStore from '@/stores/searchKeyword';

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
  const {
    searchKeyword, setSearchForm, lat, lng,
  } = useSearchFormStore(['searchKeyword', 'setSearchForm', 'lat', 'lng']);
  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);
  const { setCurrentLocationMarker } = useCurrentLocationStore(['setCurrentLocationMarker']);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();
  const [currentCenter, setCurrentCenter] = useState<Partial<LatLngLiteral>>({
    lat: undefined, lng: undefined,
  });

  useRenderCurrentLocationMarker({
    lat: defaultLocation?.lat,
    lng: defaultLocation?.lng,
  });

  const {
    query: {
      data: places, isSuccess, isFetching, isFetchingNextPage,
    }, refState,
  } = useGetSearchPlaces({ keyword: searchKeyword, lat, lng });

  const handleSubmit = useCallback((keyword: string) => {
    setSelectedPlaceId(undefined);
    setSearchForm({
      searchKeyword: keyword,
      lat: currentCenter.lat,
      lng: currentCenter.lng,
    });
    saveNextKeyword(keyword);
  }, [currentCenter.lat, currentCenter.lng]);

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

    const geocoderCallbackResult = (
      results: google.maps.GeocoderResult[] | null,
      status: google.maps.GeocoderStatus,
    ) => {
      if (status !== google.maps.GeocoderStatus.OK || !results?.[0].geometry.bounds) {
        return;
      }

      map.setCenter(results[0].geometry.bounds.getCenter());
    };

    const geocoder = new google.maps.Geocoder();

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

  useEffect(() => {
    if (!map) {
      return;
    }

    const onCenterChanged = () => {
      // const zoom = map.getZoom();
      const center = map.getCenter();

      // const km = (38000 / (2 ** (checkNumber(zoom) - 3)))
      //   * (Math.cos(checkNumber(center?.lat()) * (Math.PI / 180)));

      if (center?.lat() && center?.lng()) {
        setCurrentCenter({
          lat: center.lat(),
          lng: center.lng(),
        });
      }
    };

    google.maps.event.addListener(map, 'center_changed', onCenterChanged);
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
