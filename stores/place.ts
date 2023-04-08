import { PlaceResult } from 'lib/types/google.maps';
import { create } from 'zustand';

type PlaceState = {
  places: PlaceResult[];
};

type PlaceAction = {
  setPlaces: (place: PlaceResult[]) => void;
  resetPlaces: () => void;
};

export type PlaceStore = PlaceAction & PlaceState;

const usePlaceStore = create<PlaceStore>((set) => ({
  places: [],
  setPlaces: (places) => set((state) => ({ ...state, places })),
  resetPlaces: () => set({ places: [] }),
}));

export default usePlaceStore;
