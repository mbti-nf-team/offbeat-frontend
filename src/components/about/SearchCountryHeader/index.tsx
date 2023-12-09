'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import useActivityLog from '@/hooks/useActivityLog';
import useGeoLocation from '@/hooks/useGeolocation';
import { paramsSerializer } from '@/lib/apis';
import useToastStore from '@/stores/toast';

import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const router = useRouter();
  const [location, onClick] = useGeoLocation();
  const { sendEvent } = useActivityLog();
  const { renderToast } = useToastStore(['renderToast']);

  const handleClick = () => {
    sendEvent({
      name: 'bringing_up_the_current_location',
      action: 'click',
    });

    onClick();
  };

  useEffect(() => {
    if (location?.error) {
      sendEvent({
        name: 'bringing_up_the_current_location',
        action: 'load',
        type: 'error',
        value: {
          errorMessage: location?.error.message,
          errorCode: location?.error.code,
        },
      });

      renderToast('현재 위치를 불러올 수 없어요.', { type: 'error' });
    }
  }, [location?.error]);

  useEffect(() => {
    if (location.coordinates?.lat && location.coordinates?.lng) {
      sendEvent({
        name: 'bringing_up_the_current_location',
        action: 'load',
        type: 'success',
        value: {
          latitude: location?.coordinates.lat,
          longitude: location?.coordinates.lng,
        },
      });

      router.push(`/maps?${paramsSerializer({
        lat: location.coordinates?.lat,
        lng: location.coordinates?.lng,
      })}`);
    }
  }, [location.coordinates]);

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
