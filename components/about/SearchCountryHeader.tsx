'use client';

import { ReactNode } from 'react';

import useGeoLocation from 'hooks/useGeolocation';
import styled from 'styled-components';

import Button from 'components/common/Button';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const [location, onClick] = useGeoLocation();

  console.log(location);

  return (
    <div>
      {children}
      <ButtonWrapper>
        <FindLocationButton type="button" onClick={onClick}>
          현재위치에서 찾기
        </FindLocationButton>
      </ButtonWrapper>
    </div>
  );
}

export default SearchCountryHeader;

const FindLocationButton = styled(Button)``;

const ButtonWrapper = styled.div`
  width: calc(100% - 40px);
  position: fixed;
  bottom: 40px;
  width: 100%;
  max-width: 430px;
  display: flex;
  justify-content: center;
`;
