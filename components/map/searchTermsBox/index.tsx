import { memo } from 'react';

import SearchTermsList from '../searchTermsList';
import SuggestSearchList from '../suggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
};

function SearchTermsBox({ keyword }: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList keyword={keyword} />
        ) : (
          <SuggestSearchList />
        )}
      </div>
    </div>
  );
}

export default memo(SearchTermsBox);
