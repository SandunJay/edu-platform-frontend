  /** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');

const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  // your other Next.js configuration options...
};

module.exports = withNextVideo(nextConfig);