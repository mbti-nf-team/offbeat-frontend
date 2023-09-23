import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RecentSearchState = {
  recentSearchList: string[];
};

type RecentSearchAction = {
  addRecentSearch: (nextKeyword: string) => void;
  removeRecentSearch: (removeKeyword: string) => void;
};

type RecentSearch = RecentSearchState & RecentSearchAction;

const useRecentSearchStore = create<RecentSearch>()(
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

export default useRecentSearchStore;
