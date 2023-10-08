'use client';

import { useCallback, useEffect, useState } from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { shallow } from 'zustand/shallow';

import Spinner from '@/components/common/Spinner';
import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useTextSearch from '@/hooks/maps/useTextSearch';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultPlaceName?: string;
};

function MainMap({ defaultCountryCode, defaultPlaceId, defaultPlaceName }: Props) {
  const [libraries] = useState<['places', 'geometry']>(['places', 'geometry']);
  const { saveNextKeyword } = useRecentSearchStore(({ addRecentSearch }) => ({
    saveNextKeyword: addRecentSearch,
  }), shallow);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore((state) => ({
    onOpenPlaceDetailWindow: state.onOpenPlaceDetailWindow,
  }), shallow);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
  });

  const [mapState, setMapState] = useState<google.maps.Map | null>(null);
  const {
    placesResult, onTextSearch, isZeroResult, refState,
  } = useTextSearch(mapState);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds>();

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapState(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapState(null);
  }, []);

  const handleSubmit = (keyword: string) => {
    onTextSearch({ query: keyword });
    saveNextKeyword(keyword);
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
      componentRestrictions: {
        country: defaultCountryCode || 'KR',
      },
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        setBounds(results?.[0].geometry.bounds);
      }
    });
  }, [isLoaded, defaultCountryCode]);

  useEffect(() => {
    if (defaultPlaceId && defaultPlaceName && mapState) {
      onTextSearch({ query: defaultPlaceName });

      onOpenPlaceDetailWindow({
        placeId: defaultPlaceId,
        placeName: defaultPlaceName,
      });
    }
  }, [defaultPlaceId, defaultPlaceName, mapState]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded || !bounds) {
    return (
      <div className={styles.loading}>
        <Spinner color="black" isLoading size="large" />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        width: '100%',
        maxWidth: '430px',
      }}
      zoom={5}
      center={bounds.getCenter()}
      onUnmount={onUnmount}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        minZoom: 3,
      }}
    >
      <SearchInput onSubmit={handleSubmit} />
      {placesResult.map((place) => (
        <PlaceResultMarker key={place.place_id} place={place} />
      ))}
      <PlaceBottomSheet
        refState={refState}
        placesResult={placesResult}
        isZeroResult={isZeroResult}
      />
      <PlaceDetailWindowContainer />
    </GoogleMap>
  );
}

export default MainMap;
