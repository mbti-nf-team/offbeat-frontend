'use client';

import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { Status } from '@googlemaps/google-maps-services-js';
import { checkEmpty, checkNumber, isEmpty } from '@nf-team/core';
import { useGoogleMap } from '@react-google-maps/api';

import UserMenuBottomSheet from '@/components/bottomSheet/UserMenu';
import Button from '@/components/common/Button';
import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useCurrentLocationState from '@/hooks/maps/useCurrentLocationState';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import useGetSearchPlaces from '@/hooks/queries/useGetSearchPlaces';
import useActivityLog from '@/hooks/useActivityLog';
import { LatLngLiteral } from '@/lib/types/google.maps';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchFormStore from '@/stores/searchKeyword';
import { ZOOM_LEVEL_TO_METER } from '@/utils/constants';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function MapContainer({ defaultCountryCode, defaultPlaceId, defaultLocation }: Props) {
  const map = useGoogleMap();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const { sendEvent } = useActivityLog();
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
      sendEvent({
        name: 'open_place_detail_window_via_shared_link',
        action: 'load',
        value: {
          placeId: defaultPlaceId,
        },
      });

      onOpenPlaceDetailWindow({
        placeId: defaultPlaceId,
      });
    }
  }, [defaultPlaceId, map]);

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
        onToggleMenu={() => setIsOpenMenu(!isOpenMenu)}
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
      <UserMenuBottomSheet isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
      <PlaceDetailWindowContainer />
    </>
  );
}

export default MapContainer;