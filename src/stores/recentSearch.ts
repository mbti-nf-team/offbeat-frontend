import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import { StoreWithShallow, useStoreWithShallow } from './utils';

type RecentSearchState = {
  recentSearchList: string[];
};

type RecentSearchAction = {
  addRecentSearch: (nextKeyword: string) => void;
  removeRecentSearch: (removeKeyword: string) => void;
};

type RecentSearch = RecentSearchState & RecentSearchAction;

const recentSearchStore = createWithEqualityFn<RecentSearch>()(
  persist(
    (set, get) => ({
      recentSearchList: [],
      addRecentSearch: (nextKeyword) => {
        const prevRecentSearch = get().recentSearchList;

        const slicedPrevRecentSearch = prevRecentSearch
          .length >= 10 ? prevRecentSearch.slice(0, 10) : prevRecentSearch;

        const filteredKeyword = slicedPrevRecentSearch.filter((keyword) => keyword !== nextKeyword);

        set({ recentSearchList: [nextKeyword, ...filteredKeyword] });
      },
      removeRecentSearch: (removeKeyword) => {
        const recentSearch = get().recentSearchList;

        const nextRecentSearch = recentSearch.filter((keyword) => keyword !== removeKeyword);

        set({ recentSearchList: nextRecentSearch });
      },
    }),
    {
      name: 'recent-search-list',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const useRecentSearchStore: StoreWithShallow<RecentSearch> = (
  keys,
) => useStoreWithShallow(recentSearchStore, keys);

export default useRecentSearchStore;
