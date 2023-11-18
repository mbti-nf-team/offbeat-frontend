import { createWithEqualityFn } from 'zustand/traditional';

import { LatLngLiteral } from '@/lib/types/google.maps';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type CurrentLocationState = {
  currentLocationMarker?: google.maps.Marker;
  currentCenter: Partial<LatLngLiteral>;
};

type CurrentLocationAction = {
  setCurrentLocationMarker: (currentLocationMarker: google.maps.Marker) => void;
  setCurrentCenter: (nextCenter: Partial<LatLngLiteral>) => void;
};

export type CurrentLocationStore = CurrentLocationState & CurrentLocationAction;

const currentLocationStore = createWithEqualityFn<CurrentLocationStore>((set) => ({
  currentLocationMarker: undefined,
  currentCenter: { lat: undefined, lng: undefined },
  setCurrentCenter: (nextCenter) => set({ currentCenter: nextCenter }),
  setCurrentLocationMarker: (currentLocationMarker) => set({ currentLocationMarker }),
}));

const useCurrentLocationStore: StoreWithShallow<CurrentLocationStore> = (
  keys,
) => useStoreWithShallow(currentLocationStore, keys);

export default useCurrentLocationStore;
