import { memo } from 'react';

import SearchTermsList from '../searchTermsList';
import SuggestSearchList from '../suggestSearchList';

import styles from './index.module.scss';

type Props = {
  keyword: string;
  onSubmit: (keyword: string) => void
};

function SearchTermsBox({ keyword, onSubmit }: Props) {
  return (
    <div className={styles.searchTermsBlock}>
      <div className={styles.searchTermsBox}>
        {keyword ? (
          <SearchTermsList keyword={keyword} onSubmit={onSubmit} />
        ) : (
          <SuggestSearchList />
        )}
      </div>
    </div>
  );
}

export default memo(
  SearchTermsBox,
  (prevProps, nextProps) => prevProps.keyword === nextProps.keyword,
);
