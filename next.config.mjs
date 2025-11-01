let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Mengatasi request __nextjs_original-stack-frames yang berulang
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Nonaktifkan source maps sepenuhnya untuk menghentikan request berulang
      config.devtool = false
    }
    return config
  },
  // Menonaktifkan error overlay di development untuk menghentikan request
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  reactStrictMode: true,
  // Konfigurasi untuk mengurangi overhead development
  devIndicators: {
    buildActivity: false, // Nonaktifkan untuk mengurangi overhead
    buildActivityPosition: 'bottom-right',
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
