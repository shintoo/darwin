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
        source: '/builder/i/:path*',
        destination: '/builder/inat/:path*',
      },
      {
        source: '/b/inat/:path*',
        destination: '/builder/inat/:path*',
      },
      {
        source: '/b/ebird/:path*',
        destination: '/builder/ebird/:path*',
      },
      {
        source: '/builder/e/:path*',
        destination: '/builder/ebird/:path*',
      },
      {
        source: '/b/:path*',
        destination: '/builder/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/b/i/:name-:count',
        destination: '/b/i/:name/:count',
        permanent: false,
      },
      {
        source: '/builder/i/:name-:count',
        destination: '/b/i/:name/:count',
        permanent: false,
      },
      {
        source: '/builder/inat/:name-:count',
        destination: '/b/i/:name/:count',
        permanent: false,
      }
    ]
  }
}
