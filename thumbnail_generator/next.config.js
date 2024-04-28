/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
      typedRoutes: true,
    },
    typescript: {
        ignoreBuildErrors: true
    }
  }
   
  module.exports = nextConfig