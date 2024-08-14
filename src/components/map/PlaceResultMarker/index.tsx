import {
  memo, useCallback, useMemo, useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { useUnmount, useUpdateEffect } from '@nf-team/react';
import { MarkerF } from '@react-google-maps/api';

import { PlaceResult } from '@/lib/types/google.maps';

type Props = {
  place: PlaceResult;
  onClickMarker: (placeId: string) => void;
  selectedPlaceId?: string;
};

function PlaceResultMarker({ place, selectedPlaceId, onClickMarker }: Props) {
  const [markerState, setMarker] = useState<google.maps.Marker>();
  const router = useRouter();

  const isSelectedPlace = place.place_id === selectedPlaceId;

  const icon = useMemo(() => {
    const size = isSelectedPlace ? new google.maps.Size(34, 40) : new google.maps.Size(22, 26);
    const url = isSelectedPlace ? '/assets/images/selected-marker.png' : '/assets/images/default-marker.png';
    const anchor = isSelectedPlace ? new google.maps.Point(17, 40) : new google.maps.Point(11, 26);

    return {
      url,
      size,
      origin: new google.maps.Point(0, 0),
      anchor,
      scaledSize: size,
    } as google.maps.Icon;
  }, [isSelectedPlace]);

  const handleClickMarker = useCallback(() => {
    if (isSelectedPlace) {
      router.push(`/place/${place.place_id}`);
      return;
    }

    onClickMarker(place.place_id);
  }, [isSelectedPlace, place.place_id]);

  useUpdateEffect(() => {
    markerState?.setIcon(icon);
    markerState?.setZIndex(isSelectedPlace ? 2 : 1);
  }, [icon]);

  useUnmount(() => markerState?.unbindAll());

  return (
    <MarkerF
      icon={icon}
      onLoad={(marker) => setMarker(marker)}
      onClick={handleClickMarker}
      zIndex={1}
      title={place.name}
      position={place.geometry.location}
    />
  );
}

export default memo(PlaceResultMarker);
