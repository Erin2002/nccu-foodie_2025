// src/store.js
import { create } from 'zustand'

// 建立 store hook
const useBearStore = create((set) => ({
	// states and actions
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))


export { useBearStore }