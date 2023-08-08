import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum BookmarkType {
  Services = 'services',
  News = 'news',
  Knowledge = 'knowledge',
}

interface Store {
  bookmarks: Record<BookmarkType, string[]>
}

interface Actions {
  toggleBookmark: (type: BookmarkType, id: string) => void
  isBookmarked: (type: BookmarkType, id: string) => boolean
}

export const useBookmarksStore = create<Store & Actions>()(
  persist(
    (set, get) => ({
      bookmarks: {
        services: [],
        news: [],
        knowledge: [],
      },
      toggleBookmark: (type: BookmarkType, id: string) => {
        set((state) => {
          const isBookmarked = state.bookmarks[type].includes(id)
          const updatedBookmarks = isBookmarked
            ? state.bookmarks[type].filter((bookmarkId) => bookmarkId !== id)
            : [...state.bookmarks[type], id]

          return {
            bookmarks: {
              ...state.bookmarks,
              [type]: updatedBookmarks,
            },
          }
        })
      },
      isBookmarked: (type: BookmarkType, id: string) => {
        const state = get()
        return state.bookmarks[type].includes(id)
      },
    }),
    { name: 'bookmarks', storage: createJSONStorage(() => localStorage) },
  ),
)
