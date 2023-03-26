'use client';

import { ReactNode } from 'react';

import useGeoLocation from 'hooks/useGeolocation';

import Button from 'components/common/button';

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
        <Button type="button" onClick={onClick}>
          현재위치에서 찾기
        </Button>
      </div>
    </div>
  );
}

export default SearchCountryHeader;
