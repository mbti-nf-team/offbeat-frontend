'use client';

import { ReactNode, useEffect } from 'react';

import Button from '@/components/common/Button';
import useGeoLocation from '@/hooks/useGeolocation';
import useRenderToast from '@/hooks/useRenderToast';

import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const [location, onClick] = useGeoLocation();
  const renderToast = useRenderToast();

  const handleClick = () => {
    onClick();
  };

  useEffect(() => {
    if (location?.error) {
      renderToast('현재 위치를 불러올 수 없어요.', { type: 'error' });
    }
  }, [location?.error]);

  return (
    <div>
      {children}
      <div className={styles.buttonWrapper}>
        <Button
          type="button"
          onClick={handleClick}
          color="highlight"
          isLoading={location.loading}
          width="281px"
        >
          현재위치에서 찾기
        </Button>
      </div>
    </div>
  );
}

export default SearchCountryHeader;