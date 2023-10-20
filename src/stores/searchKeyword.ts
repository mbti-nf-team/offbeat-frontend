import { createWithEqualityFn } from 'zustand/traditional';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type SearchKeywordState = {
  searchKeyword: string;
};

type SearchKeywordAction = {
  setSearchKeyword: (searchKeyword: string) => void;
};

export type KeywordStore = SearchKeywordState & SearchKeywordAction;

const searchKeywordStore = createWithEqualityFn<KeywordStore>((set) => ({
  searchKeyword: '',
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
}));

const useSearchKeywordStore: StoreWithShallow<KeywordStore> = (
  keys,
) => useStoreWithShallow(searchKeywordStore, keys);

export default useSearchKeywordStore;
