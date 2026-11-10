/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Room for a pattern photo (up to 4 MB) sent to Ask Loopy.
    serverActions: { bodySizeLimit: "5mb" },
  },
};

export default nextConfig;
