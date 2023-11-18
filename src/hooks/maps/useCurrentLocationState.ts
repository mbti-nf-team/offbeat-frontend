import { useEffect } from 'react';

import { useThrottleCallback } from '@nf-team/react';
import { useGoogleMap } from '@react-google-maps/api';

import useCurrentLocationStore from '@/stores/currentLocation';

function useCurrentLocationState() {
  const map = useGoogleMap();

  const { currentCenter, setCurrentCenter, setCurrentLocationMarker } = useCurrentLocationStore(['currentCenter', 'setCurrentCenter', 'setCurrentLocationMarker']);

  const handleCenterChanged = useThrottleCallback((currentMap: google.maps.Map) => {
    // const zoom = map.getZoom();
    const center = currentMap.getCenter();

    // const km = (38000 / (2 ** (checkNumber(zoom) - 3)))
    //   * (Math.cos(checkNumber(center?.lat()) * (Math.PI / 180)));

    if (center?.lat() && center?.lng()) {
      setCurrentCenter({
        lat: center.lat(),
        lng: center.lng(),
      });
    }
  }, [], 300);

  useEffect(() => {
    if (!map) {
      return;
    }

    setCurrentLocationMarker(new google.maps.Marker({
      map,
      zIndex: 3,
    }));

    google.maps.event.addListener(map, 'center_changed', () => handleCenterChanged(map));
  }, [map, handleCenterChanged]);

  return {
    centerLatitude: currentCenter.lat,
    centerLongitude: currentCenter.lng,
  };
}

export default useCurrentLocationState;
