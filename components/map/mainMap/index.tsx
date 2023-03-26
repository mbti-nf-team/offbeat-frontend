import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { GoogleMap, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import { PlaceGeometry } from 'lib/types/google.maps';

import PlaceBottomSheet from '../placeBottomSheet';
import PlaceResultMarker from '../placeResultMarker';
import SearchInput from '../searchInput';

// TODO - 추후 리팩터링 및 수정
function MainMap() {
  const [libraries] = useState<['places']>(['places']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
    region: 'KR',
  });

  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [searchBoxState, setSearchBoxState] = useState<google.maps.places.SearchBox>();
  const [placeResults, setPlaceResult] = useState<PlaceGeometry[]>([]);
  const [mapState, setMapState] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapState(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMapState(null);
  }, []);

  const onLoadSearchBox = useCallback((searchBox: google.maps.places.SearchBox) => {
    setSearchBoxState(searchBox);
  }, []);

  const onPlacesChanged = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);

    const places = searchBoxState?.getPlaces();

    if (!places?.length) {
      return;
    }

    setPlaceResult(places.filter((
      place,
    ): place is PlaceGeometry => Boolean(place.geometry?.location)));
  };

  useEffect(() => {
    if (!placeResults.length || !mapState) {
      return;
    }

    const markerBounds = new google.maps.LatLngBounds();

    placeResults.forEach((place) => {
      if (place.geometry.viewport) {
        markerBounds.union(place.geometry.viewport);
      }

      if (place.geometry.location) {
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
        onBoundsChanged={() => {
          searchBoxState?.setBounds(mapState?.getBounds() as google.maps.LatLngBounds);
        }}
        options={{
          disableDefaultUI: true,
        }}
      >
        <StandaloneSearchBox
          // NOTE - 일본 bounds (임시)
          bounds={new google.maps.LatLngBounds(
            new google.maps.LatLng(20.3585295, 122.8554688),
            new google.maps.LatLng(45.6412626, 154.0031455),
          )}
          onLoad={onLoadSearchBox}
          onPlacesChanged={onPlacesChanged}
          onUnmount={() => setSearchBoxState(undefined)}
        >
          <SearchInput />
        </StandaloneSearchBox>
        {placeResults.map((place) => (
          <PlaceResultMarker key={place.place_id} place={place} />
        ))}
      </GoogleMap>
      <PlaceBottomSheet placeResult={placeResults} />
    </>

  );
}

export default memo(MainMap);
