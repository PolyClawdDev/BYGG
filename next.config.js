/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,

  // Keep compiled dev pages in memory longer so navigations don't hit freshly-renumbered chunks.
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 10,
  },

  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Stop the rebuild loop on macOS: ignore things that shouldn't trigger recompiles.
      // Without this, .DS_Store, the .next output folder, and node_modules can all
      // retrigger webpack → chunk IDs get renumbered → browser asks for a chunk that no longer exists
      // ("Cannot find module './NNN.js'").
      config.watchOptions = {
        ...(config.watchOptions || {}),
        ignored: [
          '**/.git/**',
          '**/node_modules/**',
          '**/.next/**',
          '**/.DS_Store',
          '**/*.log',
          path.resolve(__dirname, '.next') + '/**',
        ],
        aggregateTimeout: 200,
        poll: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
