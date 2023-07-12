import { create } from 'zustand';

import { SelectedPlace } from 'lib/types/search';

type PlaceDetailWindowState = {
  isOpenPlaceDetailWindow: boolean;
} & SelectedPlace;

type PlaceDetailWindowAction = {
  onClosePlaceDetailWindow: () => void;
  onOpenPlaceDetailWindow: (selectedPlace: SelectedPlace) => void;
};

export type PlaceDetailWindow = PlaceDetailWindowState & PlaceDetailWindowAction;

const initialPlaceDetailWindowState = {
  isOpenPlaceDetailWindow: false,
  placeId: undefined,
  placeName: undefined,
};

const usePlaceDetailWindowStore = create<PlaceDetailWindow>((set) => ({
  ...initialPlaceDetailWindowState,
  onClosePlaceDetailWindow: () => set({
    ...initialPlaceDetailWindowState,
  }),
  onOpenPlaceDetailWindow: (selectedPlace) => set(({
    isOpenPlaceDetailWindow: true, ...selectedPlace,
  })),
}));

export default usePlaceDetailWindowStore;
