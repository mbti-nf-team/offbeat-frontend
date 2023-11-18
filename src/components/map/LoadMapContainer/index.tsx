import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, checkNumber, isEmpty } from '@nf-team/core';
import { useGoogleMap } from '@react-google-maps/api';

import Button from '@/components/common/Button';
import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useCurrentLocationState from '@/hooks/maps/useCurrentLocationState';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import useGetSearchPlaces from '@/hooks/queries/useGetSearchPlaces';
import { LatLngLiteral } from '@/lib/types/google.maps';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchFormStore from '@/stores/searchKeyword';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function LoadMapContainer({ defaultCountryCode, defaultPlaceId, defaultLocation }: Props) {
  const map = useGoogleMap();
  const {
    searchKeyword, setSearchForm, lat, lng, radius: searchRadius,
  } = useSearchFormStore(['searchKeyword', 'setSearchForm', 'lat', 'lng', 'radius']);
  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();
  const [searchResultCenter, setSearchResultCenter] = useState<Partial<LatLngLiteral>>({
    lat: undefined,
    lng: undefined,
  });

  const { centerLatitude, centerLongitude } = useCurrentLocationState();

  useRenderCurrentLocationMarker({
    lat: defaultLocation?.lat,
    lng: defaultLocation?.lng,
  });

  const {
    query: {
      data: places, isSuccess, isFetching, isFetchingNextPage,
    }, refState,
  } = useGetSearchPlaces({
    keyword: searchKeyword, lat, lng, radius: searchRadius,
  });

  const handleSubmit = useCallback((keyword: string, radius = 50000) => {
    setSelectedPlaceId(undefined);
    setSearchForm({
      searchKeyword: keyword,
      lat: centerLatitude,
      lng: centerLongitude,
      radius,
    });
    saveNextKeyword(keyword);
  }, [centerLatitude, centerLongitude]);

  const isCenterChange = () => {
    const isEqualLat = checkNumber(searchResultCenter.lat).toFixed(3)
      === checkNumber(centerLatitude).toFixed(3);
    const isEqualLng = checkNumber(searchResultCenter.lng).toFixed(3)
      === checkNumber(centerLongitude).toFixed(3);

    if (isEqualLat && isEqualLng) {
      return true;
    }

    return false;
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
    map.setCenter(markerBounds.getCenter());
    setSearchResultCenter({
      lat: markerBounds.getCenter().lat(),
      lng: markerBounds.getCenter().lng(),
    });
  }, [map, isSuccess, placesWithSearchResult]);

  return (
    <>
      <SearchInput
        onSubmit={handleSubmit}
        selectedPlaceId={selectedPlaceId}
        onClearSelectedPlace={() => setSelectedPlaceId(undefined)}
      />
      {searchKeyword && !isCenterChange() && (
        <div className={styles.searchButtonWrapper}>
          <Button size="small" isFloating onClick={() => handleSubmit(searchKeyword, 2000)}>
            여기서 검색
          </Button>
        </div>
      )}
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
