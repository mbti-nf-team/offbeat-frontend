'use client';

import { ReactNode } from 'react';

import useGeoLocation from 'hooks/useGeolocation';
import styled from 'styled-components';

import Button from 'components/common/Button';

import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const [location, onClick] = useGeoLocation();

  console.log(location);

  return (
    <div>
      {children}
      <div className={styles.buttonWrapper}>
        <FindLocationButton type="button" onClick={onClick}>
          현재위치에서 찾기
        </FindLocationButton>
      </div>
    </div>
  );
}

export default SearchCountryHeader;

const FindLocationButton = styled(Button)``;
