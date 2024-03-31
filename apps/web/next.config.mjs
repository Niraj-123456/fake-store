/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
      },
      {
        hostname: "placeimg.com",
      },
      {
        hostname: "eduport.webestica.com",
      },
      {
        hostname: "api.escuelajs.co",
      },
      {
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "products.com",
      },
    ],
  },
};

export default nextConfig;
