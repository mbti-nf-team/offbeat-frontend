import { useEffect } from 'react';

import { GlobalPortal, useGeolocation } from '@nf-team/react';
import { useGoogleMap } from '@react-google-maps/api';
import clsx from 'clsx';

import Spinner from '@/components/common/Spinner';
import useRenderCurrentLocationMarker from '@/hooks/maps/useRenderCurrentLocationMarker';
import { NavigationIcon } from '@/lib/assets/icons';
import useToastStore from '@/stores/toast';

import styles from './index.module.scss';

type Props = {
  placeResultCount: number;
  isZeroResult: boolean;
};

function CurrentLocationButton({ placeResultCount, isZeroResult }: Props) {
  const map = useGoogleMap();
  const [location, onClick] = useGeolocation();
  const { renderToast } = useToastStore(['renderToast']);

  useRenderCurrentLocationMarker({
    lat: location.coordinates?.lat,
    lng: location.coordinates?.lng,
  });

  const handleClick = () => {
    if (map && location.coordinates?.lat && location.coordinates?.lng) {
      const position = new google.maps.LatLng({
        lat: location.coordinates?.lat, lng: location.coordinates?.lng,
      });

      map.setCenter(position);
      map.setZoom(14);
    }

    onClick();
  };

  const bottomPosition = () => {
    if (placeResultCount > 0) {
      return '164px';
    }

    if (isZeroResult) {
      return '184px';
    }

    return '40px';
  };

  useEffect(() => {
    if (location?.error) {
      renderToast('현재 위치를 불러올 수 없어요.', { type: 'error' });
    }
  }, [location?.error]);

  return (
    <GlobalPortal elementId="portal-container">
      <div className={styles.currentLocationButtonWrapper}>
        <button
          type="button"
          disabled={location.loading}
          style={{
            bottom: bottomPosition(),
          }}
          onClick={handleClick}
          className={clsx(styles.navigationButton, location.loading && styles.loading)}
        >
          {location.loading ? <Spinner isLoading size="medium" /> : <NavigationIcon />}
        </button>
      </div>
    </GlobalPortal>
  );
}

export default CurrentLocationButton;
