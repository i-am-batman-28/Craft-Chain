/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  transpilePackages: ['framer-motion'],
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
};

export default nextConfig;
