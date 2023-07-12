'use client';

import { useCallback, useState } from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { shallow } from 'zustand/shallow';

import PlaceDetailWindowContainer from 'components/detail/PlaceDetailWindowContainer';
import useTextSearch from 'hooks/maps/useTextSearch';
import useRecentSearchStore from 'stores/recentSearch';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

function MainMap() {
  const [libraries] = useState<['places', 'geometry']>(['places', 'geometry']);
  const { saveNextKeyword } = useRecentSearchStore(({ addRecentSearch }) => ({
    saveNextKeyword: addRecentSearch,
  }), shallow);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
  });

  const [mapState, setMapState] = useState<google.maps.Map | null>(null);
  const { placesResult, onTextSearch, isZeroResult } = useTextSearch(mapState);

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

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        minHeight: 'calc(var(--vh, 1vh) * 100)',
        width: '100%',
        maxWidth: '430px',
      }}
      zoom={3}
      center={new google.maps.LatLng(36.204824, 138.252924)}
      onUnmount={onUnmount}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        minZoom: 3,
        restriction: {
          // TODO - test 용 일본
          latLngBounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(20.3585295, 122.8554688),
            new google.maps.LatLng(45.6412626, 154.0031455),
          ),
          strictBounds: false,
        },
      }}
    >
      <SearchInput onSubmit={handleSubmit} />
      {placesResult.map((place) => (
        <PlaceResultMarker key={place.place_id} place={place} />
      ))}
      <PlaceBottomSheet placesResult={placesResult} isZeroResult={isZeroResult} />
      <PlaceDetailWindowContainer />
    </GoogleMap>
  );
}

export default MainMap;
