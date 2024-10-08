'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import useActivityLog from '@/hooks/useActivityLog';

function MapLayout({ children }: PropsWithChildren) {
  const [libraries] = useState<['places', 'geometry']>(['places', 'geometry']);
  const { sendEvent } = useActivityLog();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
    language: 'ko',
  });

  useEffect(() => {
    if (loadError) {
      sendEvent({
        name: 'load_google_map',
        action: 'load',
        type: 'error',
      });
    }
  }, [loadError]);

  useEffect(() => {
    if (isLoaded) {
      sendEvent({
        name: 'load_google_map',
        action: 'load',
        type: 'success',
      });
    }
  }, [isLoaded]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return (
      <LoadingSpinner />
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
      {children}
    </GoogleMap>
  );
}

export default MapLayout;
