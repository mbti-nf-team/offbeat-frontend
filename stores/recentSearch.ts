import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RecentSearchState {
  recentSearchList: string[];
  addRecentSearch: (nextKeyword: string) => void;
}

const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentSearchList: [],
      addRecentSearch: (nextKeyword) => {
        const prevRecentSearch = get().recentSearchList;

        const slicedPrevRecentSearch = prevRecentSearch
          .length >= 5 ? prevRecentSearch.slice(0, 5) : prevRecentSearch;

        const hasKeyword = slicedPrevRecentSearch.includes(nextKeyword);

        set({
          recentSearchList: hasKeyword
            ? slicedPrevRecentSearch : [nextKeyword, ...slicedPrevRecentSearch],
        });
      },
    }),
    {
      name: 'recent-search-list',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useRecentSearchStore;
