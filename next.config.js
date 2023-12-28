/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    poweredByHeader: false,
    distDir: "build",    
    images: {
        domains: [
          ""
        ],
      },
}

module.exports = nextConfig
