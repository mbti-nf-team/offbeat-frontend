import {
  ForwardedRef, forwardRef, memo, RefObject, useCallback, useEffect, useState,
} from 'react';

import useSearchActionKeyEvent from '@/hooks/useSearchActionKeyEvent';
import useToastStore from '@/stores/toast';

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
  const { renderToast } = useToastStore(['renderToast']);
  const [isZeroResult, setIsZeroResult] = useState<boolean>();

  const onKeyDown = useSearchActionKeyEvent<[string]>({
    inputRef, onActionEvent: onInput,
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
    if (isZeroResult) {
      setEstimatedSearchTerms([]);
    }
  }, [isZeroResult]);

  if (isZeroResult) {
    return (
      <ZeroSearchResult
        ref={ref}
        inputRef={inputRef}
        keyword={keyword}
        onInput={onInput}
      />
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
          onKeyDown={(e) => onKeyDown(e, structured_formatting.main_text)}
          onClick={() => onInput(structured_formatting.main_text)}
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
