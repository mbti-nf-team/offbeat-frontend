'use client';

import { ReactNode } from 'react';

import styled from 'styled-components';
import Button from 'ui/common/Button';

import LogoIcon from 'lib/assets/icons/offbeat_logo_draft.svg';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  return (
    <div>
      <SearchCountryHeaderWrapper>
        <LogoIcon />
      </SearchCountryHeaderWrapper>
      {children}
      <ButtonWrapper>
        <FindLocationButton type="button">
          현재위치에서 찾기
        </FindLocationButton>
      </ButtonWrapper>
    </div>
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

const FindLocationButton = styled(Button)`
  /* position: fixed;
  bottom: 40px; */
`;

const ButtonWrapper = styled.div`
  width: calc(100% - 40px);
  position: fixed;
  bottom: 40px;
  width: 100%;
  max-width: 430px;
  display: flex;
  justify-content: center;
`;
