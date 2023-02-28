'use client';

import styled from 'styled-components';

import LogoIcon from 'lib/assets/icons/offbeat_logo_draft.svg';
import SearchSvg from 'lib/assets/icons/search.svg';

function SearchCountryHeader() {
  return (
    <>
      <SearchCountryHeaderWrapper>
        <LogoIcon />
      </SearchCountryHeaderWrapper>
      <SearchInputWrapper>
        <SearchIcon />
        <SearchCountryInput
          type="text"
          placeholder="찾는 장소가 어떤 나라인가요?"
        />
      </SearchInputWrapper>
    </>
  );
}

export default SearchCountryHeader;

const SearchCountryHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 16px 24px;
  background-color: ${({ theme }) => theme.gray100};
  width: 100%;
`;

const SearchCountryInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  background-color: ${({ theme }) => theme.white};
  width: 100%;
  border-width: 1px 0px;
  border-style: solid;
  border-color: ${({ theme }) => theme.black};
  padding: 12px 16px 12px 56px;

  /* TODO - 추후 공통 변수로 적용 */
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray400};
  }

  &:focus {
    caret-color: ${({ theme }) => theme.purple500};
    border-width: 2px 0px;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;

  &:focus-within {
    & > svg > path {
      fill: ${({ theme }) => theme.purple500};
    }
  }
`;

const SearchIcon = styled(SearchSvg)`
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 16px;
`;
