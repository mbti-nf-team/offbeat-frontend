import {
  memo, useCallback, useEffect, useState,
} from 'react';

import styles from './index.module.scss';

type Props = {
  keyword: string;
};

function SearchTermsList({ keyword }: Props) {
  const [service] = useState(new google.maps.places.AutocompleteService());
  const [sessionToken] = useState(new google.maps.places.AutocompleteSessionToken());
  const [
    estimatedSearchTerms, setEstimatedSearchTerms,
  ] = useState<google.maps.places.AutocompletePrediction[]>([]);

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

  return (
    <>
      {estimatedSearchTerms.map((estimatedSearchTerm) => (
        <div className={styles.searchTerm} key={estimatedSearchTerm.place_id}>
          <div>
            {estimatedSearchTerm.structured_formatting.main_text}
          </div>
          <div>
            {estimatedSearchTerm.structured_formatting.secondary_text}
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(SearchTermsList);
