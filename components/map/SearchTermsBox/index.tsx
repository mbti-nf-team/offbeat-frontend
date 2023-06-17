import { memo } from 'react';

import SearchTermsList from '../SearchTermsList';
import SuggestSearchList from '../SuggestSearchList';

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
