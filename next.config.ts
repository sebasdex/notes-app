import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/1516680/pexels-photo-1516680.jpeg",
        search: "",
      },
    ],
  },
};

export default nextConfig;
