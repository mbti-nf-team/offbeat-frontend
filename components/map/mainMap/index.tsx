import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import useTextSearch from 'hooks/maps/useTextSearch';
import useRecentSearchStore from 'stores/recentSearch';
import { shallow } from 'zustand/shallow';

import PlaceBottomSheet from '../placeBottomSheet';
import PlaceResultMarker from '../placeResultMarker';
import SearchInput from '../searchInput';

// TODO - 추후 리팩터링 및 수정
function MainMap() {
  const [libraries] = useState<['places']>(['places']);
  const { saveNextKeyword } = useRecentSearchStore(({ addRecentSearch }) => ({
    saveNextKeyword: addRecentSearch,
  }), shallow);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
  });

  const [searchKeyWord, setSearchKeyword] = useState<string>('');
  const [mapState, setMapState] = useState<google.maps.Map | null>(null);

  const placeResults = useTextSearch(mapState, {
    query: searchKeyWord,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapState(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapState(null);
  }, []);

  const handleSubmit = (keyword: string) => {
    // TODO - 테스트용
    console.log(keyword);
    setSearchKeyword(keyword);
    saveNextKeyword(keyword);
  };

  useEffect(() => {
    if (!placeResults.length || !mapState) {
      return;
    }

    const markerBounds = new google.maps.LatLngBounds();

    placeResults.forEach((place) => {
      if (place?.geometry?.viewport) {
        markerBounds.union(place.geometry.viewport);
      }

      if (place?.geometry?.location) {
        markerBounds.extend(place.geometry.location);
      }
    });

    mapState.fitBounds(markerBounds);
  }, [placeResults, mapState]);

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return null;
  }

  return (
    <>
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
        {placeResults.map((place) => (
          <PlaceResultMarker key={place.place_id} place={place} />
        ))}
      </GoogleMap>
      <PlaceBottomSheet placeResult={placeResults} />
    </>

  );
}

export default memo(MainMap);
