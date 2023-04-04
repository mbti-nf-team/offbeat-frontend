import { useState } from 'react';

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

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], () => {
    if (searchInput.trim()) {
      onSubmit(searchInput.trim());
      setIsVisibleSearchTerms(false);
    }
  });

  const onDeleteInput = () => {
    setSearchInput('');
    setIsVisibleSearchTerms(false);
  };

  const onFocus = () => setIsVisibleSearchTerms(true);

  const onBlur = () => {
    if (!searchInput.trim()) {
      setIsVisibleSearchTerms(false);
    }
  };

  return (
    <>
      <div className={styles.inputWrapper}>
        <div className={styles.searchIconWrapper}>
          <SearchIcon className={styles.searchIcon} />
        </div>
        <input
          type="text"
          placeholder="장소 검색"
          value={searchInput}
          className={clsx(styles.searchInput, {
            [styles.visibleShadow]: !isVisibleSearchTerms,
          })}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className={styles.menuIconWrapper}>
          {searchInput.trim() ? (
            <CloseIcon onClick={onDeleteInput} />
          ) : (
            <MenuIcon />
          )}
        </div>
      </div>
      {isVisibleSearchTerms && (
        <SearchTermsBox keyword={debouncedValue} />
      )}
    </>
  );
}

export default SearchInput;
