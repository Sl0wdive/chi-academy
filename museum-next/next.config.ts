import type { NextConfig } from "next";

const nextConfig: NextConfig = {images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "playground.zenberry.one",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
