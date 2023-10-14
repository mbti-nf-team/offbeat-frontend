import { createWithEqualityFn } from 'zustand/traditional';

import { SelectedPlace } from '@/lib/types/search';

import { StoreWithShallow, useStoreWithShallow } from './utils';

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

const placeDetailWindowStore = createWithEqualityFn<PlaceDetailWindow>((set) => ({
  ...initialPlaceDetailWindowState,
  onClosePlaceDetailWindow: () => set({
    ...initialPlaceDetailWindowState,
  }),
  onOpenPlaceDetailWindow: (selectedPlace) => set(({
    isOpenPlaceDetailWindow: true, ...selectedPlace,
  })),
}));

const usePlaceDetailWindowStore: StoreWithShallow<PlaceDetailWindow> = (
  keys,
) => useStoreWithShallow(placeDetailWindowStore, keys);

export default usePlaceDetailWindowStore;
