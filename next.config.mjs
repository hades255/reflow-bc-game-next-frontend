/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.waxpeer.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'community.akamai.steamstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/roulette',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
