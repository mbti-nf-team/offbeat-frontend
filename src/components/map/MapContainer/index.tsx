'use client';

import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { checkEmpty, checkNumber, isEmpty } from '@nf-team/core';
import { useGoogleMap } from '@react-google-maps/api';
import QueryString from 'qs';

import Button from '@/components/common/Button';
import MenuBottomSheet from '@/components/map/MenuBottomSheet';
import PlaceBottomSheet from '@/components/map/PlaceBottomSheet';
import useGetSearchPlaces from '@/hooks/apis/queries/useGetSearchPlaces';
import useCurrentLocationState from '@/hooks/maps/useCurrentLocationState';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import useActivityLog from '@/hooks/useActivityLog';
import { paramsSerializer } from '@/lib/apis';
import { User } from '@/lib/types/auth';
import { LatLngLiteral } from '@/lib/types/google.maps';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchFormStore from '@/stores/searchKeyword';
import { ZOOM_LEVEL_TO_METER } from '@/utils/constants';

import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultLocation: { lng?: string; lat?: string; };
  user: User | null;
};

function MapContainer({ defaultCountryCode, defaultLocation, user }: Props) {
  const map = useGoogleMap();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sendEvent } = useActivityLog();
  const {
    searchKeyword, setSearchForm, lat, lng, radius: searchRadius,
  } = useSearchFormStore(['searchKeyword', 'setSearchForm', 'lat', 'lng', 'radius']);
  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
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
  } = useGetSearchPlaces<HTMLUListElement>({
    keyword: searchKeyword, lat, lng, radius: searchRadius,
  });

  const handleSubmit = useCallback((actionType: 'search_here' | 'input') => (keyword: string) => {
    const zoom = map?.getZoom() || 8;

    const form = {
      searchKeyword: keyword,
      lat: centerLatitude,
      lng: centerLongitude,
      radius: ZOOM_LEVEL_TO_METER[zoom] || 50000,
    };

    sendEvent({
      name: 'search_places',
      action: 'submit',
      value: {
        keyword,
        latitude: form.lat,
        longitude: form.lng,
        radius: form.radius,
        actionType,
      },
    });

    setSelectedPlaceId(undefined);
    setSearchForm(form);
    saveNextKeyword(keyword);
  }, [centerLatitude, centerLongitude, map]);

  const onToggleMenu = () => {
    const params = QueryString.parse(searchParams.toString());

    const { menu, ...rest } = params;

    if (!menu) {
      router.replace(`/maps?${paramsSerializer({
        ...params,
        menu: 'open',
      })}`);

      return;
    }

    router.replace(`/maps?${paramsSerializer(rest)}`);
  };

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
    .filter((page) => !!page.results?.length && page.status === 'OK')
    .flatMap((page) => page.results), [places]);

  useEffect(() => {
    if (!map) {
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
        onToggleMenu={onToggleMenu}
        onSubmit={handleSubmit('input')}
        selectedPlaceId={selectedPlaceId}
        onClearSelectedPlace={() => setSelectedPlaceId(undefined)}
      />
      {searchKeyword && !isCenterChange() && (
        <div className={styles.searchButtonWrapper}>
          <Button size="small" isFloating onClick={() => handleSubmit('search_here')(searchKeyword)}>
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
      <MenuBottomSheet onToggleMenu={onToggleMenu} user={user} />
    </>
  );
}

export default MapContainer;
