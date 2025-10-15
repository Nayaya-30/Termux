// src/features/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  mode: "dark" | "light" | "gold";
};

const initial: ThemeState = {
  mode: (typeof window !== "undefined" && (localStorage.getItem("themeMode") as ThemeState["mode"])) || "dark"
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initial,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState["mode"]>) {
      state.mode = action.payload;
      if (typeof window !== "undefined") localStorage.setItem("themeMode", action.payload);
      if (typeof document !== "undefined") document.documentElement.dataset.theme = action.payload;
    },
    toggleTheme(state) {
      const next = state.mode === "dark" ? "gold" : state.mode === "gold" ? "light" : "dark";
      state.mode = next;
      if (typeof window !== "undefined") localStorage.setItem("themeMode", next);
      if (typeof document !== "undefined") document.documentElement.dataset.theme = next;
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;