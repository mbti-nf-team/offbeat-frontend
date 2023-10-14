import { useEffect } from 'react';

import { useGoogleMap } from '@react-google-maps/api';

import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useTextSearch from '@/hooks/maps/useTextSearch';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultPlaceName?: string;
};

function LoadMapContainer({ defaultCountryCode, defaultPlaceId, defaultPlaceName }: Props) {
  const map = useGoogleMap();

  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);
  const {
    placesResult, onTextSearch, isZeroResult,
  } = useTextSearch(map);

  const handleSubmit = (keyword: string) => {
    onTextSearch({ query: keyword });
    saveNextKeyword(keyword);
  };

  useEffect(() => {
    if (defaultPlaceId && defaultPlaceName && map) {
      onTextSearch({ query: defaultPlaceName });

      onOpenPlaceDetailWindow({
        placeId: defaultPlaceId,
        placeName: defaultPlaceName,
      });
    }
  }, [defaultPlaceId, defaultPlaceName, map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const geocoder = new google.maps.Geocoder();

    geocoder?.geocode({
      componentRestrictions: {
        country: defaultCountryCode || 'KR',
      },
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results?.[0].geometry.bounds) {
        map?.setCenter(results[0].geometry.bounds.getCenter());
      }
    });
  }, [defaultCountryCode, map]);

  return (
    <>
      <SearchInput onSubmit={handleSubmit} />
      {placesResult.map((place) => (
        <PlaceResultMarker key={place.place_id} place={place} />
      ))}
      <PlaceBottomSheet
        placesResult={placesResult}
        isZeroResult={isZeroResult}
      />
      <PlaceDetailWindowContainer />
    </>
  );
}

export default LoadMapContainer;
