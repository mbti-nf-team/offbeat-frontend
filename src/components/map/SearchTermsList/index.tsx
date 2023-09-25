import {
  ForwardedRef, forwardRef, memo, RefObject, useCallback, useEffect, useState,
} from 'react';

import { shallow } from 'zustand/shallow';

import useGetPlaceDetails from '@/hooks/maps/useGetPlaceDetails';
import useRenderToast from '@/hooks/useRenderToast';
import useSearchActionKeyEvent from '@/hooks/useSearchActionKeyEvent';
import usePlaceStore from '@/stores/place';
import useRecentSearchStore from '@/stores/recentSearch';

import ZeroSearchResult from '../ZeroSearchResult';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onInput: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
};

function SearchTermsList({
  keyword, onInput, inputRef,
}: Props, ref: ForwardedRef<HTMLButtonElement>) {
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

  const onKeyDown = useSearchActionKeyEvent<[string, string]>({
    inputRef, onActionEvent: onActionTextSearch,
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
      <ZeroSearchResult ref={ref} inputRef={inputRef} keyword={keyword} onInput={onInput} />
    );
  }

  return (
    <>
      {estimatedSearchTerms.map(({ place_id, structured_formatting }, index) => (
        <button
          className={styles.searchTerm}
          type="button"
          key={place_id}
          ref={index === 0 ? ref : undefined}
          onKeyDown={(e) => onKeyDown(e, place_id, structured_formatting.main_text)}
          onClick={() => onActionTextSearch(place_id, structured_formatting.main_text)}
        >
          <div>
            {structured_formatting.main_text}
          </div>
          <div>
            {structured_formatting.secondary_text}
          </div>
        </button>
      ))}
    </>
  );
}

export default memo(forwardRef<HTMLButtonElement, Props>(SearchTermsList));
