import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The deep-link files must be served as JSON over HTTPS with no redirects.
  // apple-app-site-association has no file extension, so set its type explicitly.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
