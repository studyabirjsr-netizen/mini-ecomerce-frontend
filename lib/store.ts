import { create } from 'zustand';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  category: string;
  setMinPrice: (min: number) => void;
  setMaxPrice: (max: number) => void;
  setCategory: (cat: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  minPrice: 0,
  maxPrice: 500,
  category: 'all',
  setMinPrice: (min) => set({ minPrice: min }),
  setMaxPrice: (max) => set({ maxPrice: max }),
  setCategory: (cat) => set({ category: cat }),
}));
// import { create } from 'zustand';

// interface FilterState {
//   priceRange: [number, number];
//   selectedCategory: string | null;
//   setPriceRange: (range: [number, number]) => void;
//   setCategory: (cat: string | null) => void;
//   resetFilters: () => void;
// }

// export const useFilterStore = create<FilterState>((set) => ({
//   priceRange: [0, 1500],
//   selectedCategory: null,
//   setPriceRange: (range) => set({ priceRange: range }),
//   setCategory: (cat) => set({ selectedCategory: cat }),
//   resetFilters: () => set({ priceRange: [0, 1500], selectedCategory: null }),
// }));
