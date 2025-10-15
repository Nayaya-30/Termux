// src/features/projectsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsState = {
  selectedProjectId?: string | null;
};

const initialState: ProjectsState = {
  selectedProjectId: null
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectProject(state, action: PayloadAction<string | null>) {
      state.selectedProjectId = action.payload;
    },
    clearSelectedProject(state) {
      state.selectedProjectId = null;
    }
  }
});

export const { selectProject, clearSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;