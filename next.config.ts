import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizeCss: false, // ✅ Disable lightningcss to prevent ARM crashes
	},
	allowedDevOrigins: true,
};

export default nextConfig;