'use client';

import { ReactNode, useEffect } from 'react';
import ga4 from 'react-ga4';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import { GA4_EVENT_ACTION, GA4_EVENT_NAME, GA4_EVENT_TYPE } from '@/constants/ga4';
import useGeoLocation from '@/hooks/useGeolocation';
import useRenderToast from '@/hooks/useRenderToast';
import { paramsSerializer } from '@/lib/apis';

import styles from './index.module.scss';

type Props = {
  children: ReactNode;
};

function SearchCountryHeader({ children }: Props) {
  const router = useRouter();
  const [location, onClick] = useGeoLocation();
  const renderToast = useRenderToast();

  const handleClick = () => {
    ga4.event(GA4_EVENT_NAME.retrieve_current_location, {
      action: GA4_EVENT_ACTION.click,
    });

    onClick();
  };

  useEffect(() => {
    if (location?.error) {
      ga4.event(GA4_EVENT_NAME.retrieve_current_location, {
        action: GA4_EVENT_ACTION.load,
        type: GA4_EVENT_TYPE.error,
        errorMessage: location?.error.message,
        errorCode: location?.error.code,
      });

      renderToast('현재 위치를 불러올 수 없어요.', { type: 'error' });
    }
  }, [location?.error]);

  useEffect(() => {
    if (location.coordinates?.lat && location.coordinates?.lng) {
      ga4.event(GA4_EVENT_NAME.retrieve_current_location, {
        action: GA4_EVENT_ACTION.load,
        type: GA4_EVENT_TYPE.success,
        latitude: location?.coordinates.lat,
        longitude: location?.coordinates.lng,
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
