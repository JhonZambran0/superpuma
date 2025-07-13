/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        canvas: false,
        encoding: false,
      };
    }
    
    // Ignorar warnings específicos
    config.ignoreWarnings = [
      /Module not found/,
      /Can't resolve/,
    ];
    
    return config;
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
