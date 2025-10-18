import { createSlice } from '@reduxjs/toolkit';

interface GuidedTourState {
  showIntro: boolean;
}

const initialState: GuidedTourState = {
  showIntro: true,
};

const guidedTourSlice = createSlice({
  name: 'guidedTour',
  initialState,
  reducers: {
    hideIntro: (state) => {
      state.showIntro = false;
      localStorage.setItem('intro_seen', 'true');
    },
    resetIntro: (state) => {
      state.showIntro = true;
      localStorage.removeItem('intro_seen');
    },
  },
});

export const { hideIntro, resetIntro } = guidedTourSlice.actions;
export default guidedTourSlice.reducer;