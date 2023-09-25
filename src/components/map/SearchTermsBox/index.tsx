import { memo, RefObject, useRef } from 'react';

import { useUpdateEffect } from '@nf-team/react';

import SearchTermsList from '../SearchTermsList';
import SuggestSearchList from '../SuggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  isArrowDownEvent: boolean;
  onInput: (value: string) => void;
  resetArrowDownEvent: () => void;
  inputRef: RefObject<HTMLInputElement>;
};

function SearchTermsBox({
  keyword, onInput, isArrowDownEvent, resetArrowDownEvent, inputRef,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useUpdateEffect(() => {
    if (isArrowDownEvent && buttonRef?.current) {
      buttonRef.current.focus();
      resetArrowDownEvent();
    }
  }, [isArrowDownEvent]);

  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList
            ref={buttonRef}
            inputRef={inputRef}
            keyword={keyword}
            onInput={onInput}
          />
        ) : (
          <SuggestSearchList inputRef={inputRef} ref={buttonRef} onInput={onInput} />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
