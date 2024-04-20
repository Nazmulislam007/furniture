/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'source.unsplash.com',
         },
         {
            protocol: 'https',
            hostname: 'loremflickr.com',
         },
      ],
   },
};

module.exports = nextConfig;
