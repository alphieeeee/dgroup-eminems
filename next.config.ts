process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dgroup-cms.archfortedesignstudio.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "dgroup-cms.archfortedesignstudio.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
