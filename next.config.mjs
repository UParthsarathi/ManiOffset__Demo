/** @type {import('next').NextConfig} */
const nextConfig = {
  // Calculator switch (see lib/features.ts): when off, its routes go to the quote form.
  async redirects() {
    if (process.env.NEXT_PUBLIC_CALCULATOR_ENABLED === 'true') return [];
    return ['/calculator', '/calculator/:path*', '/admin/calculator'].map((source) => ({
      source,
      destination: source.startsWith('/admin') ? '/admin' : '/contact/express',
      permanent: false,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
