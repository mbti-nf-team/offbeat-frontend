import {
  ForwardedRef, forwardRef, memo, MouseEvent, RefObject,
} from 'react';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import useSearchActionKeyEvent from '@/hooks/useSearchActionKeyEvent';
import { ClockIcon, CloseIcon } from '@/lib/assets/icons';
import useRecentSearchStore from '@/stores/recentSearch';

import styles from './index.module.scss';

type Props = {
  onInput: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
};

function SuggestSearchList({ onInput, inputRef }: Props, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    recentSearchList, removeRecentSearch,
  } = useRecentSearchStore(['recentSearchList', 'removeRecentSearch']);

  const onRecentSearchItemKeyDown = useSearchActionKeyEvent<[string]>({
    inputRef, onActionEvent: onInput,
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
        {recentSearchList.map((recentSearch, index) => (
          <button
            type="button"
            ref={index === 0 ? ref : undefined}
            key={recentSearch}
            className={styles.searchTerm}
            onKeyDown={(e) => onRecentSearchItemKeyDown(e, recentSearch)}
            onClick={() => onInput(recentSearch)}
          >
            <div className={styles.recentSearchContents}>
              <ClockIcon width={24} height={24} style={{ minWidth: '24px', minHeight: '24px' }} />
              <div className={styles.recentSearchText}>
                {recentSearch}
              </div>
            </div>
            <Button
              href="#"
              size="small"
              color="ghost"
              onClick={onClickCloseIcon(recentSearch)}
              onlyIcon={(
                <CloseIcon
                  className={styles.closeIcon}
                />
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default memo(forwardRef<HTMLButtonElement, Props>(SuggestSearchList));
