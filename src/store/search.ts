import { create } from 'zustand'

interface Store {
  searchTerm: string
}

interface Actions {
  setSearchTerm: (value: string) => void
}

export const useSearchStore = create<Store & Actions>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}))
