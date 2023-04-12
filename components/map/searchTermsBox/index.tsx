import { memo } from 'react';

import SearchTermsList from '../searchTermsList';
import SuggestSearchList from '../suggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onClose: () => void;
  onInput: (value: string) => void;
};

function SearchTermsBox({ keyword, onClose, onInput }: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList keyword={keyword} onClose={onClose} onInput={onInput} />
        ) : (
          <SuggestSearchList onClose={onClose} onInput={onInput} />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
