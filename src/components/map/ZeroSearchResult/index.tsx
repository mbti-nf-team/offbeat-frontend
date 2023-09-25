import {
  ForwardedRef, forwardRef, memo, RefObject,
} from 'react';

import { useGoogleMap } from '@react-google-maps/api';

import useTextSearch from '@/hooks/maps/useTextSearch';
import useSearchActionKeyEvent from '@/hooks/useSearchActionKeyEvent';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onInput: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
};

function ZeroSearchResult({
  keyword, onInput, inputRef,
}: Props, ref: ForwardedRef<HTMLButtonElement>) {
  const map = useGoogleMap();
  const { onTextSearch } = useTextSearch(map);

  const onSubmit = () => {
    onTextSearch({
      query: keyword,
    });
    onInput(keyword);
  };

  const onKeyDown = useSearchActionKeyEvent({
    inputRef, onActionEvent: onSubmit,
  });

  return (
    <button
      type="button"
      ref={ref}
      className={styles.emptySearchTerm}
      onKeyDown={onKeyDown}
      onClick={onSubmit}
    >
      <strong>{`‘${keyword}’`}</strong>
      &nbsp;
      <p>검색</p>
    </button>
  );
}

export default memo(forwardRef<HTMLButtonElement, Props>(ZeroSearchResult));
