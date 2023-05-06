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
};

export default withVanillaExtract(nextConfig);
