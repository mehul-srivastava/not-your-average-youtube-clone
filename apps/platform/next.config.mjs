/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/shadcn"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
