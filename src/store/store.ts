import { configureStore } from '@reduxjs/toolkit';
import guidedTourReducer from '@/slices/guidedTourSlice';
import projectsReducer from "@/slises/projectsSlice";
import themeReducer from '@slices/themeSlice';
import windowReducer from '@/slices/windowSlice'

export const store = configureStore({
	reducer: {
		guidedTour: guidedTourReducer,
		windows: windowReducer,
		theme: themeReducer,
		projects: projectsReduce,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
