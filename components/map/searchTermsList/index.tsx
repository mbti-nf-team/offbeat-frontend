import {
  memo, useCallback, useEffect, useState,
} from 'react';

import useGetPlaceDetails from 'hooks/maps/useGetPlaceDetails';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import usePlaceStore from 'stores/place';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onClose: () => void;
};

function SearchTermsList({ keyword, onClose }: Props) {
  const [service] = useState(new google.maps.places.AutocompleteService());
  const [sessionToken] = useState(new google.maps.places.AutocompleteSessionToken());
  const [
    estimatedSearchTerms, setEstimatedSearchTerms,
  ] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [placeDetailsState, onGetPlaceDetails] = useGetPlaceDetails();
  const { setPlaces } = usePlaceStore((state) => ({
    setPlaces: state.setPlaces,
  }), shallow);

  const onKeyDown = useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], (_, placeId) => {
    onGetPlaceDetails(placeId);
  });

  const displaySuggestions = useCallback((
    predictions: google.maps.places.AutocompletePrediction[] | null,
    status: google.maps.places.PlacesServiceStatus,
  ) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
      console.error(status);
      return;
    }

    setEstimatedSearchTerms(predictions);
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

  return (
    <>
      {estimatedSearchTerms.map(({ place_id, structured_formatting }) => (
        <div
          className={styles.searchTerm}
          key={place_id}
          tabIndex={0}
          role="menuitem"
          onKeyDown={(e) => onKeyDown(e, place_id)}
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
