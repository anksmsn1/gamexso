import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  basePath: '/my-app', // if deploying to a subpath
  assetPrefix: '/my-app', // for assets like images or JS files
};

export default nextConfig;
