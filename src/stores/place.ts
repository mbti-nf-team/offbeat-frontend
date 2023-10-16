import { createWithEqualityFn } from 'zustand/traditional';

import { PlaceDetailResult } from '@/lib/types/google.maps';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type PlaceState = {
  places: PlaceDetailResult[];
  isReset: boolean;
  isZeroResult: boolean;
  pagination?: { hasNextPage?: boolean; fetchNextPage?: () => void; };
};

type PlaceAction = {
  setPlaces: (place: PlaceDetailResult[]) => void;
  setIsZeroResult: (isZeroResult: boolean) => void;
  resetPlaces: () => void;
  setPagination: (pagination: { hasNextPage?: boolean; fetchNextPage?: () => void; }) => void;
  addPlaces: (place: PlaceDetailResult[]) => void;
};

export type PlaceStore = PlaceAction & PlaceState;

const initialPlaceState = {
  places: [],
  isZeroResult: false,
  isReset: false,
  pagination: undefined,
};

const placeStore = createWithEqualityFn<PlaceStore>((set) => ({
  ...initialPlaceState,
  setPagination: (pagination) => set((state) => ({ ...state, pagination, isReset: false })),
  setPlaces: (places) => set((state) => ({ ...state, places, isReset: false })),
  addPlaces: (places) => set((
    state,
  ) => ({ ...state, places: [...state.places, ...places], isReset: false })),
  setIsZeroResult: (isZeroResult) => set((state) => ({ ...state, isZeroResult, isReset: false })),
  resetPlaces: () => set({
    ...initialPlaceState,
    isReset: true,
  }),
}));

const usePlaceStore: StoreWithShallow<PlaceStore> = (keys) => useStoreWithShallow(placeStore, keys);

export default usePlaceStore;
