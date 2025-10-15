"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTheme = exports.setTheme = void 0;
// src/features/themeSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var initial = {
    mode: (typeof window !== "undefined" && localStorage.getItem("themeMode")) || "dark"
};
var themeSlice = (0, toolkit_1.createSlice)({
    name: "theme",
    initialState: initial,
    reducers: {
        setTheme: function (state, action) {
            state.mode = action.payload;
            if (typeof window !== "undefined")
                localStorage.setItem("themeMode", action.payload);
            if (typeof document !== "undefined")
                document.documentElement.dataset.theme = action.payload;
        },
        toggleTheme: function (state) {
            var next = state.mode === "dark" ? "gold" : state.mode === "gold" ? "light" : "dark";
            state.mode = next;
            if (typeof window !== "undefined")
                localStorage.setItem("themeMode", next);
            if (typeof document !== "undefined")
                document.documentElement.dataset.theme = next;
        }
    }
});
exports.setTheme = (_a = themeSlice.actions, _a.setTheme), exports.toggleTheme = _a.toggleTheme;
exports.default = themeSlice.reducer;
