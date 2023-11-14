import { useCallback, useRef, useState } from 'react';

import { useActionKeyEvent, useBoolean, useDebounce } from '@nf-team/react';

import Input from '@/components/common/Input';

import SearchTermsBox from '../SearchTermsBox';

type Props = {
  onSubmit: (keyword: string) => void;
  onClearSelectedPlace: () => void;
  selectedPlaceId?: string;
};

function SearchInput({ onSubmit, onClearSelectedPlace, selectedPlaceId }: Props) {
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce(searchInput, 200);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isArrowDownEvent, onArrowDownEvent, blurArrowDownEvent] = useBoolean(false);

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

  const onClickGoBack = () => {
    if (isFocused) {
      setIsFocused(false);
      return;
    }

    onClearSelectedPlace();
  };

  const onInput = useCallback((keyword: string) => {
    onSubmit(keyword);
    setSearchInput(keyword);
    setIsFocused(false);
  }, [onSubmit]);

  return (
    <>
      <Input
        ref={inputRef}
        isVisibleMenuIcon
        type="text"
        goBack={onClickGoBack}
        showSearchIcon={!isFocused && !selectedPlaceId}
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
