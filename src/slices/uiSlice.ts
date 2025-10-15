import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  activeApp: string | null;
}

const initialState: UIState = {
  activeApp: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openApp: (state, action) => {
      state.activeApp = action.payload;
    },
    closeApp: (state) => {
      state.activeApp = null;
    },
  },
});

export const { openApp, closeApp } = uiSlice.actions;
export default uiSlice.reducer;