module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/b/i/:path*',
        destination: '/builder/inat/:path*',
      },
      {
        source: '/b/e/:path*',
        destination: '/builder/ebird/:path*',
      },
      {
        source: '/b/:path*',
        destination: '/builder/:path*',
      },
    ]
  }
}
