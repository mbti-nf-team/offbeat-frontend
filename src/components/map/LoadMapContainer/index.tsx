import { useEffect } from 'react';

import { Status } from '@googlemaps/google-maps-services-js';
import { useGoogleMap } from '@react-google-maps/api';

import PlaceDetailWindowContainer from '@/components/detail/PlaceDetailWindowContainer';
import useGetGoogleSearch from '@/hooks/queries/useGetGoogleSearch';
import usePlaceDetailWindowStore from '@/stores/placeDetailWindow';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchKeywordStore from '@/stores/searchKeyword';

import PlaceBottomSheet from '../PlaceBottomSheet';
import PlaceResultMarker from '../PlaceResultMarker';
import SearchInput from '../SearchInput';

type Props = {
  defaultCountryCode?: string;
  defaultPlaceId?: string;
  defaultPlaceName?: string;
  defaultLocation: { lng?: string; lat?: string; }
};

function LoadMapContainer({
  defaultCountryCode, defaultPlaceId, defaultPlaceName, defaultLocation,
}: Props) {
  const map = useGoogleMap();
  const { searchKeyword, setSearchKeyword } = useSearchKeywordStore(['searchKeyword', 'setSearchKeyword']);
  const { addRecentSearch: saveNextKeyword } = useRecentSearchStore(['addRecentSearch']);
  const { onOpenPlaceDetailWindow } = usePlaceDetailWindowStore(['onOpenPlaceDetailWindow']);

  const {
    query: { data: places, isSuccess }, refState,
  } = useGetGoogleSearch({ keyword: searchKeyword });

  const handleSubmit = (keyword: string) => {
    setSearchKeyword(keyword);
    saveNextKeyword(keyword);
  };

  useEffect(() => {
    if (defaultPlaceId && defaultPlaceName && map) {
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

    const geocoderCallbackResult = (
      results: google.maps.GeocoderResult[] | null,
      status: google.maps.GeocoderStatus,
    ) => {
      if (status === google.maps.GeocoderStatus.OK && results?.[0].geometry.bounds) {
        map.setCenter(results[0].geometry.bounds.getCenter());
        map.setZoom(10);
      }
    };

    if (defaultLocation?.lat && defaultLocation?.lng) {
      geocoder?.geocode({
        location: new google.maps.LatLng({
          lat: Number(defaultLocation.lat),
          lng: Number(defaultLocation.lng),
        }),
      }, geocoderCallbackResult);
      return;
    }

    geocoder?.geocode({
      componentRestrictions: {
        country: defaultCountryCode || 'KR',
      },
    }, geocoderCallbackResult);
  }, [defaultCountryCode, map, defaultLocation]);

  useEffect(() => {
    if (
      !map
      || !isSuccess
      || places?.pages?.[0]?.status === Status.ZERO_RESULTS
      || !places?.pages.length
    ) {
      return;
    }

    const markerBounds = new google.maps.LatLngBounds();

    places.pages.flatMap((place) => place.results).forEach((place) => {
      if (place?.geometry?.location) {
        markerBounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(markerBounds);
  }, [map, isSuccess, places]);

  return (
    <>
      <SearchInput onSubmit={handleSubmit} />
      {places?.pages?.map((placeResult) => (
        placeResult.results.map((place) => (
          <PlaceResultMarker key={place.place_id} place={place} />
        ))
      ))}
      <PlaceBottomSheet
        places={places}
        refState={refState}
        isSuccess={isSuccess}
      />
      <PlaceDetailWindowContainer />
    </>
  );
}

export default LoadMapContainer;
