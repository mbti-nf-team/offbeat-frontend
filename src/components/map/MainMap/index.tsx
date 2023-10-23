'use client';

import { useState } from 'react';

import { Language } from '@googlemaps/google-maps-services-js';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import Spinner from '@/components/common/Spinner';

import LoadMapContainer from '../LoadMapContainer';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultPlaceName?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function MainMap({
  defaultCountryCode, defaultPlaceId, defaultPlaceName, defaultLocation,
}: Props) {
  const [libraries] = useState<['places', 'geometry']>(['places', 'geometry']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
    language: Language.ko,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
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
      options={{
        disableDefaultUI: true,
        minZoom: 3,
      }}
    >
      <LoadMapContainer
        defaultCountryCode={defaultCountryCode}
        defaultPlaceId={defaultPlaceId}
        defaultPlaceName={defaultPlaceName}
        defaultLocation={defaultLocation}
      />
    </GoogleMap>
  );
}

export default MainMap;
