"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreLayout = exports.setSize = exports.setPosition = exports.focusWindow = exports.minimizeWindow = exports.closeWindow = exports.openWindow = exports.registerWindow = void 0;
// src/features/windowSlice.ts
var toolkit_1 = require("@reduxjs/toolkit");
var STORAGE_KEY = "usouph_windows_v2";
var initialState = {
    list: [],
    topZ: 10
};
var persistLayout = function (list) {
    try {
        var map_1 = {};
        list.forEach(function (w) {
            map_1[w.id] = {};
            if (w.pos)
                map_1[w.id].pos = w.pos;
            if (w.size)
                map_1[w.id].size = w.size;
        });
        if (typeof window !== "undefined")
            localStorage.setItem(STORAGE_KEY, JSON.stringify(map_1));
    }
    catch (e) {
        // ignore
    }
};
var readLayout = function () {
    try {
        if (typeof window === "undefined")
            return null;
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return null;
        return JSON.parse(raw);
    }
    catch (e) {
        return null;
    }
};
var windowSlice = (0, toolkit_1.createSlice)({
    name: "windows",
    initialState: initialState,
    reducers: {
        registerWindow: function (state, action) {
            var _a;
            var _b = action.payload, id = _b.id, title = _b.title;
            var exists = state.list.find(function (w) { return w.id === id; });
            if (!exists) {
                state.topZ += 1;
                var layout = readLayout();
                var saved = layout && layout[id] ? layout[id] : undefined;
                var defaultSize = { w: 520, h: 420 };
                state.list.push({
                    id: id,
                    title: title,
                    open: false,
                    minimized: false,
                    zIndex: state.topZ,
                    pos: saved === null || saved === void 0 ? void 0 : saved.pos,
                    size: (_a = saved === null || saved === void 0 ? void 0 : saved.size) !== null && _a !== void 0 ? _a : defaultSize
                });
            }
        },
        openWindow: function (state, action) {
            var w = state.list.find(function (w) { return w.id === action.payload; });
            if (w) {
                state.topZ += 1;
                w.open = true;
                w.minimized = false;
                w.zIndex = state.topZ;
            }
        },
        closeWindow: function (state, action) {
            var w = state.list.find(function (w) { return w.id === action.payload; });
            if (w)
                w.open = false;
        },
        minimizeWindow: function (state, action) {
            var w = state.list.find(function (w) { return w.id === action.payload; });
            if (w) {
                w.minimized = true;
                w.open = false;
            }
        },
        focusWindow: function (state, action) {
            var w = state.list.find(function (w) { return w.id === action.payload; });
            if (w) {
                state.topZ += 1;
                w.zIndex = state.topZ;
                w.minimized = false;
            }
        },
        setPosition: function (state, action) {
            var _a = action.payload, id = _a.id, pos = _a.pos;
            var w = state.list.find(function (w) { return w.id === id; });
            if (w) {
                w.pos = pos;
                persistLayout(state.list);
            }
        },
        setSize: function (state, action) {
            var _a = action.payload, id = _a.id, size = _a.size;
            var w = state.list.find(function (w) { return w.id === id; });
            if (w) {
                w.size = size;
                persistLayout(state.list);
            }
        },
        restoreLayout: function (state) {
            var layout = readLayout();
            if (!layout)
                return;
            state.list.forEach(function (w) {
                var saved = layout[w.id];
                if (saved === null || saved === void 0 ? void 0 : saved.pos)
                    w.pos = saved.pos;
                if (saved === null || saved === void 0 ? void 0 : saved.size)
                    w.size = saved.size;
            });
        }
    }
});
exports.registerWindow = (_a = windowSlice.actions, _a.registerWindow), exports.openWindow = _a.openWindow, exports.closeWindow = _a.closeWindow, exports.minimizeWindow = _a.minimizeWindow, exports.focusWindow = _a.focusWindow, exports.setPosition = _a.setPosition, exports.setSize = _a.setSize, exports.restoreLayout = _a.restoreLayout;
exports.default = windowSlice.reducer;
