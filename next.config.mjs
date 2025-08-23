/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['mongoose'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
