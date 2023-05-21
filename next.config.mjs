import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: "short",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  webpack: (config) => {
    config.optimization.splitChunks = false;
    return config;
  },
};

export default withVanillaExtract(nextConfig);
