import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compilerOptions: {
    strict: true,
  },
  images: {
    domains: [
      "media.licdn.com",
      "media.glassdoor.com",
      "d2q79iu7y748jz.cloudfront.net",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "/modules/auth/pages/sign-in",
      },
      {
        source: "/admin/:path*",
        destination: "/modules/dashboard/pages/main",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/modules/auth/pages/sign-in",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
