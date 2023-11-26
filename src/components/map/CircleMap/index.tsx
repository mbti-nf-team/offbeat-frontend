import { useEffect, useState } from 'react';

import { useGoogleMap } from '@react-google-maps/api';

type Props = {
  lat?: number;
  lng?: number;
  radius: number;
  isSuccess: boolean;
};

function CircleMap({
  lat, lng, radius, isSuccess,
}: Props) {
  const map = useGoogleMap();
  const [circleMap, setCircleMap] = useState<google.maps.Circle>();

  useEffect(() => {
    if (map) {
      setCircleMap(new google.maps.Circle({
        center: map.getCenter(),
        fillOpacity: 0.35,
        fillColor: '#FF0000',
        map,
      }));
    }
  }, [map]);

  useEffect(() => {
    if (!map || !circleMap || !lat || !lng || !isSuccess) {
      return;
    }

    circleMap.setRadius(50000);
    circleMap.setOptions({
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    circleMap.setCenter({ lat, lng });

    const circleBounds = circleMap.getBounds() ? circleMap.getBounds() : undefined;

    if (!circleBounds) {
      return;
    }

    map.fitBounds(circleBounds);
  }, [lat, lng, map, circleMap, radius, isSuccess]);

  return null;
}

export default CircleMap;
