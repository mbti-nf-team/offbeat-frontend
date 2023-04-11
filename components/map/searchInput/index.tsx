import { useCallback, useRef, useState } from 'react';

import clsx from 'clsx';
import useActionKeyEvent from 'hooks/useActionKeyEvent';
import useDebounce from 'hooks/useDebounce';

import SearchTermsBox from '../searchTermsBox';

import CloseIcon from 'lib/assets/icons/close.svg';
import MenuIcon from 'lib/assets/icons/menu.svg';
import SearchIcon from 'lib/assets/icons/search.svg';

import styles from './index.module.scss';

type Props = {
  onSubmit: (keyword: string) => void;
};

function SearchInput({ onSubmit }: Props) {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 200);
  const [isVisibleSearchTerms, setIsVisibleSearchTerms] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isHiddenSearchIcon = !isVisibleSearchTerms && searchInput.trim();

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], () => {
    if (searchInput.trim()) {
      onSubmit(searchInput.trim());
      inputRef.current?.blur();
      setIsVisibleSearchTerms(false);
    }
  });

  const onDeleteInput = useCallback(() => {
    setIsVisibleSearchTerms(false);
  }, []);

  const onFocus = () => setIsVisibleSearchTerms(true);

  return (
    <>
      <div className={styles.inputWrapper}>
        {!isHiddenSearchIcon && (
          <div className={styles.searchIconWrapper}>
            <SearchIcon className={styles.searchIcon} />
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="장소 검색"
          value={searchInput}
          className={clsx(styles.searchInput, {
            [styles.visibleShadow]: !isVisibleSearchTerms,
            [styles.isHiddenSearchIcon]: isHiddenSearchIcon,
          })}
          onFocus={onFocus}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className={styles.menuIconWrapper}>
          {(isVisibleSearchTerms || searchInput.trim()) ? (
            <CloseIcon onClick={onDeleteInput} />
          ) : (
            <MenuIcon />
          )}
        </div>
      </div>
      {isVisibleSearchTerms && (
        <SearchTermsBox keyword={debouncedValue} onClose={onDeleteInput} />
      )}
    </>
  );
}

export default SearchInput;
