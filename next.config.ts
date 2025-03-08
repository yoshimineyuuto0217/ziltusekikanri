import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, // 環境変数を Next.js に明示的に渡す
  },
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve.alias as Record<string, string | false | string[]>),
        "@mapbox/node-pre-gyp": false,
      };
    }
    return config;
  },
};

export default nextConfig;