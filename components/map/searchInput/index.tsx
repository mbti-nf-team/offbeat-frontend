import { useState } from 'react';

import useActionKeyEvent from 'hooks/useActionKeyEvent';
import useDebounce from 'hooks/useDebounce';

import SearchTermsBox from '../searchTermsBox';

import CloseIcon from 'lib/assets/icons/close.svg';
import MenuIcon from 'lib/assets/icons/menu.svg';
import SearchIcon from 'lib/assets/icons/search.svg';

import styles from './index.module.scss';

function SearchInput() {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 200);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], (e) => setSearchInput(e.currentTarget.value));
  const onDeleteInput = () => setSearchInput('');
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

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
          className={styles.searchInput}
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
      {isFocused && (
        <SearchTermsBox keyword={debouncedValue} />
      )}
    </>
  );
}

export default SearchInput;
