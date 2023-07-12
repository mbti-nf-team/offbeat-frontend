import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { shallow } from 'zustand/shallow';

import useGetPlaceDetails from 'hooks/maps/useGetPlaceDetails';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import useRenderToast from 'hooks/useRenderToast';
import usePlaceStore from 'stores/place';
import useRecentSearchStore from 'stores/recentSearch';

import ZeroSearchResult from '../ZeroSearchResult';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onInput: (value: string) => void;
};

function SearchTermsList({ keyword, onInput }: Props) {
  const [service] = useState(new google.maps.places.AutocompleteService());
  const [sessionToken] = useState(new google.maps.places.AutocompleteSessionToken());
  const [
    estimatedSearchTerms, setEstimatedSearchTerms,
  ] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const renderToast = useRenderToast();
  const [placeDetailsState, onGetPlaceDetails] = useGetPlaceDetails();
  const [isZeroResult, setIsZeroResult] = useState<boolean>();
  const { setPlaces } = usePlaceStore((state) => ({
    setPlaces: state.setPlaces,
  }), shallow);
  const { addRecentSearch } = useRecentSearchStore((state) => ({
    addRecentSearch: state.addRecentSearch,
  }), shallow);

  const onActionTextSearch = (placeId: string, placeName: string) => {
    onGetPlaceDetails(placeId);
    addRecentSearch(placeName);
  };

  const onKeyDown = useActionKeyEvent<HTMLDivElement, [string, string]>(['Enter', 'NumpadEnter'], (_, placeId, placeName) => {
    onActionTextSearch(placeId, placeName);
  });

  const displaySuggestions = useCallback((
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus,
  ) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && predictions?.length) {
      setIsZeroResult(false);
      setEstimatedSearchTerms(predictions);
      return;
    }

    if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS || !predictions?.length) {
      setIsZeroResult(true);
      return;
    }

    setIsZeroResult(true);
    renderToast('다시 시도해주세요.', { type: 'error' });
  }, []);

  useEffect(() => {
    service.getPlacePredictions({
      input: keyword,
      sessionToken,
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(20.3585295, 122.8554688),
        new google.maps.LatLng(45.6412626, 154.0031455),
      ),
    }, displaySuggestions);
  }, [keyword, displaySuggestions, service, sessionToken]);

  useEffect(() => {
    if (placeDetailsState) {
      setPlaces([placeDetailsState]);
      onInput(`${placeDetailsState?.name}`);
    }
  }, [placeDetailsState]);

  useEffect(() => {
    if (isZeroResult) {
      setEstimatedSearchTerms([]);
    }
  }, [isZeroResult]);

  if (isZeroResult) {
    return (
      <ZeroSearchResult keyword={keyword} onInput={onInput} />
    );
  }

  return (
    <>
      {estimatedSearchTerms.map(({ place_id, structured_formatting }) => (
        <div
          className={styles.searchTerm}
          key={place_id}
          tabIndex={0}
          role="menuitem"
          onKeyDown={(e) => onKeyDown(e, place_id, structured_formatting.main_text)}
          onClick={() => onActionTextSearch(place_id, structured_formatting.main_text)}
        >
          <div>
            {structured_formatting.main_text}
          </div>
          <div>
            {structured_formatting.secondary_text}
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(SearchTermsList);
