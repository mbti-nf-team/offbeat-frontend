import { useCallback, useRef, useState } from 'react';

import { useActionKeyEvent, useBoolean, useDebounce } from '@nf-team/react';

import Input from '@/components/common/Input';
import useRecentSearchStore from '@/stores/recentSearch';
import useSearchKeywordStore from '@/stores/searchKeyword';

import SearchTermsBox from '../SearchTermsBox';

type Props = {
  onSubmit: (keyword: string) => void;
};

function SearchInput({ onSubmit }: Props) {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 200);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isArrowDownEvent, onArrowDownEvent, blurArrowDownEvent] = useBoolean(false);

  const { addRecentSearch } = useRecentSearchStore(['addRecentSearch']);
  const { setSearchKeyword } = useSearchKeywordStore(['setSearchKeyword']);

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter', 'ArrowDown'], (e) => {
    if (e.code === 'ArrowDown') {
      onArrowDownEvent();
      return;
    }

    if (searchInput.trim()) {
      onSubmit(searchInput.trim());
      inputRef.current?.blur();
      setIsFocused(false);
    }
  });

  const onRemoveInput = () => setSearchInput('');

  const onFocus = () => {
    setIsFocused(true);
    blurArrowDownEvent();
  };

  const onInput = useCallback((keyword: string) => {
    setSearchKeyword(keyword);
    addRecentSearch(keyword);
    setSearchInput(keyword);
    setIsFocused(false);
  }, []);

  return (
    <>
      <Input
        ref={inputRef}
        isVisibleMenuIcon
        type="text"
        goBack={() => setIsFocused(false)}
        isFocused={isFocused}
        onRemove={onRemoveInput}
        placeholder="장소 검색"
        value={searchInput}
        onFocus={onFocus}
        wrapperStyle={{
          top: '24px',
          right: '16px',
          position: 'absolute',
          zIndex: 'var(--search-input-z-index)',
        }}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {isFocused && (
        <SearchTermsBox
          inputRef={inputRef}
          resetArrowDownEvent={blurArrowDownEvent}
          isArrowDownEvent={isArrowDownEvent}
          keyword={debouncedValue}
          onInput={onInput}
        />
      )}
    </>
  );
}

export default SearchInput;
