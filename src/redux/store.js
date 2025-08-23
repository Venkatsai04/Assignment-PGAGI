import { configureStore, createSlice } from '@reduxjs/toolkit';

// ---- Dark mode persistence ----
const modeStates = () => {
  try {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  } catch (error) {
    console.error("Error loading dark mode from local storage:", error);
    return false;
  }
};

// ---- Preferences Slice ----
const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    darkMode: modeStates(),
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', JSON.stringify(action.payload));
    },
  },
});

// ---- Favorites Slice ----
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// ---- Categories Slice ----
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    Technology: false,
    Sports: false,
    Finance: false,
    "Health & Wellness": false,
    Travel: false,
  },
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload;
      state[category] = !state[category];
      localStorage.setItem("categories", JSON.stringify(state));
    },
    loadCategories: (state) => {
      try {
        const stored = localStorage.getItem("categories");
        return stored ? JSON.parse(stored) : state;
      } catch {
        return state;
      }
    },
  },
});

export const { setDarkMode } = preferencesSlice.actions;
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export const { toggleCategory, loadCategories } = categoriesSlice.actions;

// ---- Store ----
export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
    favorites: favoritesSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});
