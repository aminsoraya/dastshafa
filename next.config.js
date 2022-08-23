/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "https://files.dastshafa.ir", "files.dastshafa.ir"],
  },
};

module.exports = nextConfig;
