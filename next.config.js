"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextConfig = {
    experimental: {
        optimizeCss: false, // ✅ Disable lightningcss to prevent ARM crashes
    },
    allowedDevOrigins: true,
};
exports.default = nextConfig;
