import { memo, useCallback, useState } from 'react';

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '800px',
};

const center = {
  lat: 0,
  lng: -180,
};

const position = {
  lat: 37.772,
  lng: -122.214,
};

function SampleMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [nowMap, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((marker: google.maps.Marker) => {
    console.log(marker);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={2}
      center={center}
      onUnmount={onUnmount}
    >
      <MarkerF
        onLoad={onLoad}
        position={position}
        label="test"
      />
    </GoogleMap>
  ) : <>로딩중</>;
}

export default memo(SampleMap);
