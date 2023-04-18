import { useCallback, useRef, useState } from 'react';

import useActionKeyEvent from 'hooks/useActionKeyEvent';
import useDebounce from 'hooks/useDebounce';

import Input from 'components/common/Input';

import SearchTermsBox from '../searchTermsBox';

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
        type="text"
        goBack={() => setIsFocused(false)}
        isFocused={isFocused}
        onRemove={onRemoveInput}
        placeholder="장소 검색"
        value={searchInput}
        onFocus={onFocus}
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
