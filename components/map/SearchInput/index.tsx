import { useCallback, useRef, useState } from 'react';

import { useActionKeyEvent, useDebounce } from '@nf-team/react';

import Input from 'components/common/Input';

import SearchTermsBox from '../SearchTermsBox';

type Props = {
  onSubmit: (keyword: string) => void;
};

function SearchInput({ onSubmit }: Props) {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 200);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], () => {
    if (searchInput.trim()) {
      onSubmit(searchInput.trim());
      inputRef.current?.blur();
      setIsFocused(false);
    }
  });

  const onRemoveInput = () => setSearchInput('');

  const onFocus = () => setIsFocused(true);

  const onInput = useCallback((value: string) => {
    setSearchInput(value);
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
          keyword={debouncedValue}
          onInput={onInput}
        />
      )}
    </>
  );
}

export default SearchInput;
