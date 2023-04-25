import { memo } from 'react';

import { useGoogleMap } from '@react-google-maps/api';
import useTextSearch from 'hooks/maps/useTextSearch';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import { nanoid } from 'nanoid';
import useRecentSearchStore from 'stores/recentSearch';
import { shallow } from 'zustand/shallow';

import Label from 'components/common/Label';

import styles from './index.module.scss';

type Props = {
  onInput: (value: string) => void;
};

function SuggestSearchList({ onInput }: Props) {
  const map = useGoogleMap();
  const { recentSearchList } = useRecentSearchStore((state) => ({
    recentSearchList: state.recentSearchList,
  }), shallow);
  // const nearbyStarRatingList = useNearBySearch(map);
  const { onTextSearch } = useTextSearch(map);
  // const [placeDetailsState, onGetPlaceDetails] = useGetPlaceDetails();
  // const { setPlaces } = usePlaceStore((state) => ({
  //   setPlaces: state.setPlaces,
  // }), shallow);

  const onActionTextSearch = (keyword: string) => {
    onTextSearch({ query: keyword });
    onInput(keyword);
  };

  // const onNearByRatingItemKeyDown =
  // useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], (_, placeId) => {
  //   onGetPlaceDetails(placeId);
  // });

  const onRecentSearchItemKeyDown = useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], (_, keyword) => {
    onActionTextSearch(keyword);
  });

  // useEffect(() => {
  //   if (placeDetailsState) {
  //     setPlaces([placeDetailsState]);
  //     onClose();
  //   }
  // }, [placeDetailsState]);

  return (
    <>
      {/* <div className={styles.title}>최근 검색</div> */}
      <div className={styles.title}>
        <Label color="attention" type="default" size="small">
          최근 검색기록
        </Label>
      </div>
      {recentSearchList.map((recentSearch) => (
        <div
          key={nanoid()}
          className={styles.searchTerm}
          tabIndex={0}
          role="menuitem"
          onKeyDown={(e) => onRecentSearchItemKeyDown(e, recentSearch)}
          onClick={() => onActionTextSearch(recentSearch)}
        >
          <div>
            {recentSearch}
          </div>
          <div />
        </div>
      ))}
      {/* <div className={styles.title}>주변 별점순</div>
      {nearbyStarRatingList.slice(0, 5).map(({ place_id, name, vicinity }) => (
        <div
          className={styles.searchTerm}
          key={place_id}
          tabIndex={0}
          role="menuitem"
          onKeyDown={(e) => onNearByRatingItemKeyDown(e, place_id)}
          onClick={() => onGetPlaceDetails(place_id)}
        >
          <div>
            {name}
          </div>
          <div>
            {vicinity}
          </div>
        </div>
      ))} */}
    </>
  );
}

export default memo(SuggestSearchList);
