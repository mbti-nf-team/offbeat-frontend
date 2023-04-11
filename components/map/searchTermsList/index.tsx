import {
  memo, useCallback, useEffect, useState,
} from 'react';

import { useGoogleMap } from '@react-google-maps/api';
import useGetPlaceDetails from 'hooks/maps/useGetPlaceDetails';
import useTextSearch from 'hooks/maps/useTextSearch';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import useRenderToast from 'hooks/useRenderToast';
import usePlaceStore from 'stores/place';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onClose: () => void;
};

function SearchTermsList({ keyword, onClose }: Props) {
  const map = useGoogleMap();
  const [service] = useState(new google.maps.places.AutocompleteService());
  const [sessionToken] = useState(new google.maps.places.AutocompleteSessionToken());
  const [
    estimatedSearchTerms, setEstimatedSearchTerms,
  ] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const renderToast = useRenderToast();
  const [placeDetailsState, onGetPlaceDetails] = useGetPlaceDetails();
  const { onTextSearch, isZeroResult: isTextSearchZeroResult } = useTextSearch(map);
  const [isZeroResult, setIsZeroResult] = useState<boolean>();
  const { setPlaces } = usePlaceStore((state) => ({
    setPlaces: state.setPlaces,
  }), shallow);

  const onKeyDownItem = useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], (_, placeId) => {
    onGetPlaceDetails(placeId);
  });

  const onKeyDownEmptyKeyword = useActionKeyEvent<HTMLDivElement>(['Enter', 'NumpadEnter'], () => {
    onTextSearch({
      query: keyword,
    });
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
      onClose();
    }
  }, [placeDetailsState]);

  useEffect(() => {
    if (isZeroResult) {
      setEstimatedSearchTerms([]);
    }
  }, [isZeroResult]);

  useEffect(() => {
    if (isTextSearchZeroResult) {
      onClose();
    }
  }, [isTextSearchZeroResult]);

  if (isZeroResult) {
    return (
      <div
        className={styles.emptySearchTerm}
        tabIndex={0}
        role="menuitem"
        onKeyDown={onKeyDownEmptyKeyword}
        onClick={() => onTextSearch({ query: keyword })}
      >
        <strong>{`‘${keyword}’`}</strong>
        &nbsp;
        <p>검색</p>
      </div>
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
          onKeyDown={(e) => onKeyDownItem(e, place_id)}
          onClick={() => onGetPlaceDetails(place_id)}
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
