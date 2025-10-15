"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeyShortcuts = void 0;
var addKeyShortcuts = function (handlers) {
    if (typeof window === 'undefined')
        return;
    window.addEventListener('keydown', function (e) {
        var _a, _b;
        if (e.key === 'm' && (e.metaKey || e.ctrlKey)) {
            (_a = handlers.minimizeAll) === null || _a === void 0 ? void 0 : _a.call(handlers);
        }
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            (_b = handlers.openCommand) === null || _b === void 0 ? void 0 : _b.call(handlers);
        }
    });
};
exports.addKeyShortcuts = addKeyShortcuts;
