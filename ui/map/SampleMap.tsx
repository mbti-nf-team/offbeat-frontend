import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { GoogleMap, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import { PlaceGeometry } from 'lib/model/google.maps';
import { styled } from 'styled-components';
import { h3Font } from 'styles/fontStyles';

import PlaceResultMarker from './PlaceResultMarker';

import SearchIcon from 'lib/assets/icons/search-md.svg';

const center = {
  lat: 0,
  lng: -180,
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
      zoom={2}
      center={center}
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
        bounds={google.maps.LatLngBounds.MAX_BOUNDS}
        onLoad={onLoadSearchBox}
        onPlacesChanged={onPlacesChanged}
        onUnmount={() => setSearchBoxState(undefined)}
      >
        {/* TODO - 인풋 컴포넌트 추후 공통 컴포넌트로 변경 */}
        <InputWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Input
            type="text"
            placeholder="장소 검색"
          />
        </InputWrapper>
      </StandaloneSearchBox>
      {placeResults.map((place) => (
        <PlaceResultMarker key={place.place_id} place={place} />
      ))}
    </GoogleMap>
  );
}

export default memo(SampleMap);

const SearchIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 12px;
  left: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  top: 24px;
  right: 24px;
  position: absolute;
  width: calc(100% - 48px);
`;

const Input = styled.input`
  ${h3Font({ isBold: false })};
  color: ${({ theme }) => theme.black};
  display: flex;
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: center;
  padding: 11px 16px 11px 52px;
  background: ${({ theme }) => theme.white};
  // TODO - 추후 수정
  border: 1px solid #E8EAF0;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  &::placeholder {
    // TODO - 추후 수정
    color: #C0C3CD;
  }
`;
