// src/features/windowSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Pos = { x: number; y: number };
type Size = { w: number; h: number };

type WindowState = {
  id: string;
  title: string;
  open: boolean;
  minimized?: boolean;
  zIndex: number;
  pos?: Pos;
  size?: Size;
};

type WindowsState = {
  list: WindowState[];
  topZ: number;
};

const STORAGE_KEY = "usouph_windows_v2";

const initialState: WindowsState = {
  list: [],
  topZ: 10
};

const persistLayout = (list: WindowState[]) => {
  try {
    const map: Record<string, { pos?: Pos; size?: Size }> = {};
    list.forEach(w => {
      map[w.id] = {};
      if (w.pos) map[w.id].pos = w.pos;
      if (w.size) map[w.id].size = w.size;
    });
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    // ignore
  }
};

const readLayout = (): Record<string, { pos?: Pos; size?: Size }> | null => {
  try {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

const windowSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    registerWindow(state, action: PayloadAction<{ id: string; title: string }>) {
      const { id, title } = action.payload;
      const exists = state.list.find(w => w.id === id);
      if (!exists) {
        state.topZ += 1;
        const layout = readLayout();
        const saved = layout && layout[id] ? layout[id] : undefined;
        const defaultSize = { w: 520, h: 420 };
        state.list.push({
          id,
          title,
          open: false,
          minimized: false,
          zIndex: state.topZ,
          pos: saved?.pos,
          size: saved?.size ?? defaultSize
        });
      }
    },
    openWindow(state, action: PayloadAction<string>) {
      const w = state.list.find(w => w.id === action.payload);
      if (w) {
        state.topZ += 1;
        w.open = true;
        w.minimized = false;
        w.zIndex = state.topZ;
      }
    },
    closeWindow(state, action: PayloadAction<string>) {
      const w = state.list.find(w => w.id === action.payload);
      if (w) w.open = false;
    },
    minimizeWindow(state, action: PayloadAction<string>) {
      const w = state.list.find(w => w.id === action.payload);
      if (w) {
        w.minimized = true;
        w.open = false;
      }
    },
    focusWindow(state, action: PayloadAction<string>) {
      const w = state.list.find(w => w.id === action.payload);
      if (w) {
        state.topZ += 1;
        w.zIndex = state.topZ;
        w.minimized = false;
      }
    },
    setPosition(state, action: PayloadAction<{ id: string; pos: Pos }>) {
      const { id, pos } = action.payload;
      const w = state.list.find(w => w.id === id);
      if (w) {
        w.pos = pos;
        persistLayout(state.list);
      }
    },
    setSize(state, action: PayloadAction<{ id: string; size: Size }>) {
      const { id, size } = action.payload;
      const w = state.list.find(w => w.id === id);
      if (w) {
        w.size = size;
        persistLayout(state.list);
      }
    },
    restoreLayout(state) {
      const layout = readLayout();
      if (!layout) return;
      state.list.forEach(w => {
        const saved = layout[w.id];
        if (saved?.pos) w.pos = saved.pos;
        if (saved?.size) w.size = saved.size;
      });
    }
  }
});

export const {
  registerWindow,
  openWindow,
  closeWindow,
  minimizeWindow,
  focusWindow,
  setPosition,
  setSize,
  restoreLayout
} = windowSlice.actions;
export default windowSlice.reducer;