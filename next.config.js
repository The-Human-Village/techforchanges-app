/* eslint-disable @typescript-eslint/no-var-requires */


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'ua'],
    defaultLocale: 'en',
  },
  trailingSlash: true,
  images: {
    // domains: [],
  },
  output: 'standalone',
}

module.exports = nextConfig
