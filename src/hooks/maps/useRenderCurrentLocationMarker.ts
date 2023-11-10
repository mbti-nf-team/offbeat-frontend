import { useEffect } from 'react';

import { useGoogleMap } from '@react-google-maps/api';

import useCurrentLocationStore from '@/stores/currentLocation';

type LatLng = {
  lat?: number | string;
  lng?: number | string;
};

function useRenderCurrentLocationMarker({ lat, lng }: LatLng) {
  const map = useGoogleMap();
  const { currentLocationMarker } = useCurrentLocationStore(['currentLocationMarker']);

  useEffect(() => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    if (Number.isNaN(longitude) || Number.isNaN(latitude) || !map || !currentLocationMarker) {
      return;
    }

    const position = new google.maps.LatLng({ lat: latitude, lng: longitude });

    currentLocationMarker.setIcon({
      url: '/images/current-location-marker.png',
      size: new google.maps.Size(32, 32),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 32),
    });
    currentLocationMarker.setPosition(position);
    map.setCenter(position);
    map.setZoom(14);
  }, [map, lat, lng, currentLocationMarker]);
}

export default useRenderCurrentLocationMarker;
