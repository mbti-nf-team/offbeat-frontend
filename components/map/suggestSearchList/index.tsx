import { useGoogleMap } from '@react-google-maps/api';
import useNearBySearch from 'hooks/maps/useNearBySearch';
import { nanoid } from 'nanoid';
import useRecentSearchStore from 'stores/recentSearch';
import { shallow } from 'zustand/shallow';

import styles from './index.module.scss';

function SuggestSearchList() {
  const map = useGoogleMap();

  const { recentSearchList } = useRecentSearchStore((state) => ({
    recentSearchList: state.recentSearchList,
  }), shallow);
  const nearbyStarRatingList = useNearBySearch(map);

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
      {nearbyStarRatingList.slice(0, 5).map((nearbyStarRating) => (
        <div className={styles.searchTerm} key={nearbyStarRating.place_id}>
          <div>
            {nearbyStarRating.name}
          </div>
          <div>
            {nearbyStarRating.vicinity}
          </div>
        </div>
      ))}
    </>
  );
}

export default SuggestSearchList;
