'use client';

import { useEffect, useState } from 'react';
import ga4 from 'react-ga4';

import { Language } from '@googlemaps/google-maps-services-js';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import Spinner from '@/components/common/Spinner';
import { GA4_EVENT_ACTION, GA4_EVENT_NAME, GA4_EVENT_TYPE } from '@/constants/ga4';

import LoadMapContainer from '../LoadMapContainer';

import styles from './index.module.scss';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function MainMap({ defaultCountryCode, defaultPlaceId, defaultLocation }: Props) {
  const [libraries] = useState<['places', 'geometry']>(['places', 'geometry']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
    language: Language.ko,
  });

  useEffect(() => {
    if (loadError) {
      ga4.event(GA4_EVENT_NAME.load_google_map, {
        action: GA4_EVENT_ACTION.load,
        type: GA4_EVENT_TYPE.error,
      });
    }
  }, [loadError]);

  useEffect(() => {
    if (isLoaded) {
      ga4.event(GA4_EVENT_NAME.load_google_map, {
        action: GA4_EVENT_ACTION.load,
        type: GA4_EVENT_TYPE.success,
      });
    }
  }, [isLoaded]);

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
        maxZoom: 20,
        restriction: {
          latLngBounds: {
            north: 83.8, south: -57, west: -180, east: 180,
          },
        },

      }}
    >
      <LoadMapContainer
        defaultCountryCode={defaultCountryCode}
        defaultPlaceId={defaultPlaceId}
        defaultLocation={defaultLocation}
      />
    </GoogleMap>
  );
}

export default MainMap;
