import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { GoogleMap, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import { PlaceGeometry } from 'lib/types/google.maps';
import { styled } from 'styled-components';
import { headlineFont } from 'styles/fontStyles';

import PlaceResultMarker from './PlaceResultMarker';

import CloseIcon from 'lib/assets/icons/close.svg';
import MenuIcon from 'lib/assets/icons/menu.svg';
import SearchIcon from 'lib/assets/icons/search.svg';

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
  const [searchInput, setSearchInput] = useState<string>('');

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], (e) => setSearchInput(e.currentTarget.value));
  const onDeleteInput = () => setSearchInput('');

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
            <SearchIcon className="search-icon" />
          </SearchIconWrapper>
          <Input
            type="text"
            placeholder="장소 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <MenuIconWrapper>
            {searchInput.trim() ? (
              <CloseIcon onClick={onDeleteInput} />
            ) : (
              <MenuIcon />
            )}
          </MenuIconWrapper>
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
  display: flex;
  top: 16px;
  left: 20px;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  top: 24px;
  right: 24px;
  position: absolute;
  width: calc(100% - 48px);

  &:focus-within {
    .search-icon > path {
      fill: ${({ theme }) => theme.purple500};
    }
  }
`;

const Input = styled.input`
  ${headlineFont({ fontWeight: 500 })};
  letter-spacing: -0.012em;

  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 4px 0px rgba(19, 17, 24, 0.16);
  outline: none;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 60px;
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 56px;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    caret-color: ${({ theme }) => theme.purple500};
  }
`;
