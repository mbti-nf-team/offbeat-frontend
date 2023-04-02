'use client';

import { ReactNode, useEffect } from 'react';

import useGeoLocation from 'hooks/useGeolocation';
import useToastStore from 'stores/toast';
import { shallow } from 'zustand/shallow';

import Button from 'components/common/button';

import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const { renderToast } = useToastStore((state) => ({
    renderToast: state.renderToast,
  }), shallow);
  const [location, onClick] = useGeoLocation();

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
        <Button type="button" onClick={handleClick}>
          현재위치에서 찾기
        </Button>
      </div>
    </div>
  );
}

export default SearchCountryHeader;
