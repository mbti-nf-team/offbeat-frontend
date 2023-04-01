'use client';

import { ReactNode } from 'react';

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
    renderToast('현재 위치를 불러올 수 없어요.', { type: 'error' });
  };

  console.log(location);

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
