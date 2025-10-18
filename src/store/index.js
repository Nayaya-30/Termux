"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var uiSlice_1 = require("@/slices/uiSlice");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        ui: uiSlice_1.default,
    },
});
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
