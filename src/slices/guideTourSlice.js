"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetIntro = exports.hideIntro = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    showIntro: true,
};
var guidedTourSlice = (0, toolkit_1.createSlice)({
    name: 'guidedTour',
    initialState: initialState,
    reducers: {
        hideIntro: function (state) {
            state.showIntro = false;
            localStorage.setItem('intro_seen', 'true');
        },
        resetIntro: function (state) {
            state.showIntro = true;
            localStorage.removeItem('intro_seen');
        },
    },
});
exports.hideIntro = (_a = guidedTourSlice.actions, _a.hideIntro), exports.resetIntro = _a.resetIntro;
exports.default = guidedTourSlice.reducer;
