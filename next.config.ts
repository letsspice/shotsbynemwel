import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/trail-notes", permanent: true },
      { source: "/blog/:slug", destination: "/trail-notes/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
