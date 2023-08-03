import { memo, MouseEvent } from 'react';

import { useActionKeyEvent } from '@nf-team/react';
import { useGoogleMap } from '@react-google-maps/api';
import { shallow } from 'zustand/shallow';

import Button from 'components/common/Button';
import Label from 'components/common/Label';
import useTextSearch from 'hooks/maps/useTextSearch';
import { ClockIcon, CloseIcon } from 'lib/assets/icons';
import useRecentSearchStore from 'stores/recentSearch';

import styles from './index.module.scss';

type Props = {
  onInput: (value: string) => void;
};

function SuggestSearchList({ onInput }: Props) {
  const map = useGoogleMap();
  const {
    recentSearchList, addRecentSearch, removeRecentSearch,
  } = useRecentSearchStore((state) => ({
    recentSearchList: state.recentSearchList,
    addRecentSearch: state.addRecentSearch,
    removeRecentSearch: state.removeRecentSearch,
  }), shallow);

  const { onTextSearch } = useTextSearch(map);

  const onActionTextSearch = (keyword: string) => {
    onTextSearch({ query: keyword });
    addRecentSearch(keyword);
    onInput(keyword);
  };

  const onRecentSearchItemKeyDown = useActionKeyEvent<HTMLDivElement, string[]>(['Enter', 'NumpadEnter'], (_, keyword) => {
    onActionTextSearch(keyword);
  });

  const onClickCloseIcon = (removeKeyword: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeRecentSearch(removeKeyword);
  };

  return (
    <>
      <div className={styles.title}>
        <Label color="attention" type="default" size="small">
          최근 검색기록
        </Label>
      </div>
      <div className={styles.searchTermWrapper}>
        {recentSearchList.map((recentSearch) => (
          <div
            key={recentSearch}
            className={styles.searchTerm}
            tabIndex={0}
            role="menuitem"
            onKeyDown={(e) => onRecentSearchItemKeyDown(e, recentSearch)}
            onClick={() => onActionTextSearch(recentSearch)}
          >
            <ClockIcon width={24} height={24} style={{ minWidth: '24px', minHeight: '24px' }} />
            <div className={styles.recentSearchText}>
              {recentSearch}
            </div>
            <Button
              type="button"
              className={styles.button}
              size="small"
              color="ghost"
              onClick={onClickCloseIcon(recentSearch)}
              onlyIcon={(
                <CloseIcon
                  className={styles.closeIcon}
                />
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(SuggestSearchList);
