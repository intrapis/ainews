/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // GitHub Pages project site: /ainews
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/ainews',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/ainews'
};

export default nextConfig;
