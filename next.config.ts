import type { NextConfig } from 'next';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/mny-fitness-club';
const config: NextConfig = { output: 'export', trailingSlash: true, basePath, assetPrefix: basePath, images: { loader: 'custom', loaderFile: './lib/image-loader.ts', deviceSizes: [480,800,1200,1920], imageSizes: [160,320] } };
export default config;
