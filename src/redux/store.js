import { configureStore, createSlice } from '@reduxjs/toolkit';

const modeStates = () => {
  try {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  } catch (error) {
    console.error("Error loading dark mode from local storage:", error);
    return false;
  }
};

const preferencesSlice = createSlice({
  name: 'modes',
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

export const { setDarkMode } = preferencesSlice.actions;

export const store = configureStore({
  reducer: {
    preferences: preferencesSlice.reducer,
  },
});

