import { memo } from 'react';

import SearchTermsList from '../searchTermsList';
import SuggestSearchList from '../suggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onInput: (value: string) => void;
};

function SearchTermsBox({ keyword, onInput }: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList keyword={keyword} onInput={onInput} />
        ) : (
          <SuggestSearchList onInput={onInput} />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
