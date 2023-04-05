import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface RecentSearchState {
  recentSearch: string[];
  addRecentSearch: (nextKeyword: string) => void;
}

const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentSearch: [],
      addRecentSearch: (nextKeyword) => {
        const prevRecentSearch = get().recentSearch;

        const hasKeyword = prevRecentSearch.includes(nextKeyword);

        set({ recentSearch: hasKeyword ? prevRecentSearch : [nextKeyword, ...prevRecentSearch] });
      },
    }),
    {
      name: 'recent-search',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useRecentSearchStore;
