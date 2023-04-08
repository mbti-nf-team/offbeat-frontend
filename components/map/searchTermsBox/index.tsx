import { memo } from 'react';

import SearchTermsList from '../searchTermsList';
import SuggestSearchList from '../suggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onClose: () => void;
};

function SearchTermsBox({ keyword, onClose }: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList keyword={keyword} onClose={onClose} />
        ) : (
          <SuggestSearchList onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
