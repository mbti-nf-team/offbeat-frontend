import { memo } from 'react';

import SearchTermsList from '../SearchTermsList';
import SuggestSearchList from '../SuggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  isArrowDownEvent: boolean;
  onInput: (value: string) => void;
  resetArrowDownEvent: () => void;
};

function SearchTermsBox({
  keyword, onInput, isArrowDownEvent, resetArrowDownEvent,
}: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList
            keyword={keyword}
            onInput={onInput}
            isArrowDownEvent={isArrowDownEvent}
            resetArrowDownEvent={resetArrowDownEvent}
          />
        ) : (
          <SuggestSearchList onInput={onInput} />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
