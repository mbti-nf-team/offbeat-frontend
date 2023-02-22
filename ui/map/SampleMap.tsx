import {
  CSSProperties, memo, useCallback, useEffect, useState,
} from 'react';

import { GoogleMap, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import { PlaceGeometry } from 'lib/model/google.maps';
import { styled } from 'styled-components';

import PlaceResultMarker from './PlaceResultMarker';

const center = {
  lat: 0,
  lng: -180,
};

const inputStyle: CSSProperties = {
  boxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  padding: '0 12px',
  borderRadius: '3px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
  position: 'absolute',
  top: '10px',
  right: '10px',
};

// TODO - Sample Map 추후 리팩터링 및 수정
function SampleMap() {
  const [libraries] = useState<['places']>(['places']);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries,
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        height: '100vh',
        width: '100%',
        maxWidth: '390px',
      }}
      zoom={2}
      center={center}
      onUnmount={onUnmount}
      onLoad={onLoad}
      onBoundsChanged={() => {
        searchBoxState?.setBounds(mapState?.getBounds() as google.maps.LatLngBounds);
      }}
    >
      <StandaloneSearchBox
        bounds={google.maps.LatLngBounds.MAX_BOUNDS}
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
        onUnmount={() => setSearchBoxState(undefined)}
      >
        <Input
          type="text"
          placeholder="입력.."
          style={inputStyle}
        />
      </StandaloneSearchBox>
      {placeResults.map((place) => (
        <PlaceResultMarker key={place.place_id} place={place} />
      ))}
    </GoogleMap>
  ) : <>로딩중</>;
}

export default memo(SampleMap);

const Input = styled.input`
  color: ${({ theme }) => theme.accent8};
`;
