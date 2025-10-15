"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = void 0;
// src/hooks/reduxHooks.ts
var react_redux_1 = require("react-redux");
var useAppDispatch = function () { return (0, react_redux_1.useDispatch)(); };
exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = react_redux_1.useSelector;
