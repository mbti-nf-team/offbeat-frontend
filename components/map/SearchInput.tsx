import { useState } from 'react';

import useActionKeyEvent from 'hooks/useActionKeyEvent';
import styled from 'styled-components';
import { headlineFont } from 'styles/fontStyles';

import CloseIcon from 'lib/assets/icons/close.svg';
import MenuIcon from 'lib/assets/icons/menu.svg';
import SearchIcon from 'lib/assets/icons/search.svg';

function SearchInput() {
  const [searchInput, setSearchInput] = useState<string>('');

  const onKeyDown = useActionKeyEvent<HTMLInputElement>(['Enter', 'NumpadEnter'], (e) => setSearchInput(e.currentTarget.value));
  const onDeleteInput = () => setSearchInput('');

  return (
    <InputWrapper>
      <SearchIconWrapper>
        <SearchIcon className="search-icon" />
      </SearchIconWrapper>
      <Input
        type="text"
        placeholder="장소 검색"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <MenuIconWrapper>
        {searchInput.trim() ? (
          <CloseIcon onClick={onDeleteInput} />
        ) : (
          <MenuIcon />
        )}
      </MenuIconWrapper>
    </InputWrapper>
  );
}

export default SearchInput;

const SearchIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  top: 16px;
  left: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  top: 24px;
  right: 24px;
  position: absolute;
  width: calc(100% - 48px);

  &:focus-within {
    .search-icon > path {
      fill: ${({ theme }) => theme.purple500};
    }
  }
`;

const MenuIconWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  ${headlineFont({ fontWeight: 500 })};
  letter-spacing: -0.012em;

  color: ${({ theme }) => theme.black};
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 4px 0px rgba(19, 17, 24, 0.16);
  outline: none;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 60px;
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 56px;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    caret-color: ${({ theme }) => theme.purple500};
  }
`;
