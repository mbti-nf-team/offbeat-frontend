import { create } from 'zustand';

import { PlaceResult } from '@/lib/types/google.maps';

type PlaceState = {
  places: PlaceResult[];
  isZeroResult: boolean;
};

type PlaceAction = {
  setPlaces: (place: PlaceResult[]) => void;
  setIsZeroResult: (isZeroResult: boolean) => void;
  resetPlaces: () => void;
};

export type PlaceStore = PlaceAction & PlaceState;

const usePlaceStore = create<PlaceStore>((set) => ({
  places: [],
  isZeroResult: false,
  setPlaces: (places) => set((state) => ({ ...state, places })),
  setIsZeroResult: (isZeroResult) => set((state) => ({ ...state, isZeroResult })),
  resetPlaces: () => set({ places: [] }),
}));

export default usePlaceStore;
