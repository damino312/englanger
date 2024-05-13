/** @type {import('next').NextConfig} */
const nextConfig = {
  pronunciation: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.speechace.co",
      },
    ],
  },
};

export default nextConfig;
