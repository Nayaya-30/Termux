"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var guidedTourSlice_1 = require("@/slices/guidedTourSlice");
var themeSlice_1 = require("@slices/themeSlice");
var windowSlice_1 = require("@/slices/windowSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        guidedTour: guidedTourSlice_1.default,
        windows: windowSlice_1.default,
        theme: themeSlice_1.default,
        projects: projectsReduce,
    },
});
