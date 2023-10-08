import { create } from 'zustand';

import { PlaceResult } from '@/lib/types/google.maps';

type PlaceState = {
  places: PlaceResult[];
  isZeroResult: boolean;
  pagination?: { hasNextPage?: boolean; fetchNextPage?: () => void; };
};

type PlaceAction = {
  setPlaces: (place: PlaceResult[]) => void;
  setIsZeroResult: (isZeroResult: boolean) => void;
  resetPlaces: () => void;
  setPagination: (pagination: { hasNextPage?: boolean; fetchNextPage?: () => void; }) => void;
  addPlaces: (place: PlaceResult[]) => void;
};

export type PlaceStore = PlaceAction & PlaceState;

const initialPlaceState = {
  places: [],
  isZeroResult: false,
  pagination: undefined,
};

const usePlaceStore = create<PlaceStore>((set) => ({
  ...initialPlaceState,
  setPagination: (pagination) => set((state) => ({ ...state, pagination })),
  setPlaces: (places) => set((state) => ({ ...state, places })),
  addPlaces: (places) => set((state) => ({ ...state, places: [...state.places, ...places] })),
  setIsZeroResult: (isZeroResult) => set((state) => ({ ...state, isZeroResult })),
  resetPlaces: () => set({
    ...initialPlaceState,
  }),
}));

export default usePlaceStore;
