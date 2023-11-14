import { createWithEqualityFn } from 'zustand/traditional';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type SearchFormState = {
  searchKeyword: string;
  lat?: number;
  lng?: number;
};

type SearchFormAction = {
  setSearchForm: (searchForm: SearchFormState) => void;
};

export type FormStore = SearchFormState & SearchFormAction;

const searchFormStore = createWithEqualityFn<FormStore>((set) => ({
  searchKeyword: '',
  setSearchForm: (searchForm) => set({ ...searchForm }),
}));

const useSearchFormStore: StoreWithShallow<FormStore> = (
  keys,
) => useStoreWithShallow(searchFormStore, keys);

export default useSearchFormStore;
