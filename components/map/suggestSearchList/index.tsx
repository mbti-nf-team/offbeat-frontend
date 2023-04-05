import { nanoid } from 'nanoid';
import useRecentSearchStore from 'stores/recentSearch';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

function SuggestSearchList() {
  const { recentSearchList } = useRecentSearchStore((state) => ({
    recentSearchList: state.recentSearchList,
  }), shallow);

  return (
    <>
      <div className={styles.title}>최근 검색</div>
      {recentSearchList.map((recentSearch) => (
        <div className={styles.searchTerm} key={nanoid()}>
          <div>
            {recentSearch}
          </div>
          <div />
        </div>
      ))}
      <div className={styles.title}>주변 별점순</div>
    </>
  );
}

export default SuggestSearchList;
