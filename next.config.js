/** @type {import('next').NextConfig} */
const homepageLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</docs/api>; rel="service-doc"; type="text/html"'
].join(', ');

const cacheablePublicHeaders = [
  {
    key: 'Access-Control-Allow-Origin',
    value: '*'
  },
  {
    key: 'Cache-Control',
    value: 'public, max-age=3600, stale-while-revalidate=86400'
  }
];

const cloudflareEmailSafeHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=0, must-revalidate, no-transform'
  }
];

// Static marketing/blog imagery changes rarely; a 30-day TTL lets browsers and
// the Cloudflare edge cache raw image files instead of revalidating every 4h.
// Bump the filename (e.g. _v1.1) when replacing an image in place.
const staticImageHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=2592000, stale-while-revalidate=86400'
  }
];

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  }
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Default is 60s, which forces browsers to revalidate optimized images
    // almost immediately and keeps CDNs from caching /_next/image responses.
    minimumCacheTTL: 2678400,
    // Keep webp-only: avif encoding costs several times more CPU per
    // transform, which matters on the edge node that runs the optimizer.
    formats: ['image/webp']
  },
  async redirects() {
    return [
      {
        source: '/gep',
        destination: '/gender-equality-plan',
        permanent: true
      },
      {
        source: '/services',
        destination: '/products',
        statusCode: 301
      }
    ];
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: homepageLinkHeader
          }
        ]
      },
      {
        source: '/openapi.json',
        headers: [
          ...cacheablePublicHeaders,
          {
            key: 'Content-Type',
            value: 'application/openapi+json; charset=utf-8'
          }
        ]
      },
      {
        source: '/.well-known/api-catalog',
        headers: [
          ...cacheablePublicHeaders,
          {
            key: 'Content-Type',
            value: 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8'
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: staticImageHeaders
      },
      {
        source: '/blog/images/:path*',
        headers: staticImageHeaders
      },
      {
        source: '/favicon.png',
        headers: staticImageHeaders
      },
      {
        source: '/smartclover_logo.jpg',
        headers: staticImageHeaders
      },
      {
        source: '/contact',
        headers: cloudflareEmailSafeHeaders
      },
      {
        source: '/contact/privacy',
        headers: cloudflareEmailSafeHeaders
      },
      {
        source: '/docs/api',
        headers: cloudflareEmailSafeHeaders
      }
    ];
  }
};

module.exports = nextConfig;
