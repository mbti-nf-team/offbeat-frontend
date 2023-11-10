import { createWithEqualityFn } from 'zustand/traditional';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type CurrentLocationState = {
  currentLocationMarker?: google.maps.Marker;
};

type CurrentLocationAction = {
  setCurrentLocationMarker: (currentLocationMarker: google.maps.Marker) => void;
};

export type CurrentLocationStore = CurrentLocationState & CurrentLocationAction;

const currentLocationStore = createWithEqualityFn<CurrentLocationStore>((set) => ({
  currentLocationMarker: undefined,
  setCurrentLocationMarker: (currentLocationMarker) => set({ currentLocationMarker }),
}));

const useCurrentLocationStore: StoreWithShallow<CurrentLocationStore> = (
  keys,
) => useStoreWithShallow(currentLocationStore, keys);

export default useCurrentLocationStore;
