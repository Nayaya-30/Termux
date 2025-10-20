import { configureStore } from '@reduxjs/toolkit';
import guidedTourReducer from '@/slices/guidedTourSlice';
import projectsReducer from "@/slices/projectsSlice";
import themeReducer from '@/slices/themeSlice';
import windowReducer from '@/slices/windowSlice';
import uiReducer from '@/slices/uiSlice';

export const store = configureStore({
	reducer: {
		guidedTour: guidedTourReducer,
		windows: windowReducer,
		theme: themeReducer,
		projects: projectsReducer,
		ui: uiReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

