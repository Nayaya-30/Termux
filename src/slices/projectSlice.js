"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelectedProject = exports.selectProject = void 0;
// src/features/projectsSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    selectedProjectId: null
};
var projectsSlice = (0, toolkit_1.createSlice)({
    name: "projects",
    initialState: initialState,
    reducers: {
        selectProject: function (state, action) {
            state.selectedProjectId = action.payload;
        },
        clearSelectedProject: function (state) {
            state.selectedProjectId = null;
        }
    }
});
exports.selectProject = (_a = projectsSlice.actions, _a.selectProject), exports.clearSelectedProject = _a.clearSelectedProject;
exports.default = projectsSlice.reducer;
