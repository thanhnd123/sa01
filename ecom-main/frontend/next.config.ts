import type { NextConfig } from 'next'


const basePath = process.env.BASEPATH?.trim()
const hasBasePath = basePath && basePath !== ''
const nextConfig: NextConfig = {
  ...(hasBasePath && {
    basePath: basePath,
    assetPrefix: basePath
  }),
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en/apps/ideals',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/apps/ideals',
        permanent: true,
        locale: false
      },
      {
        // Exclude: languages, front-pages, favicon, Next.js internals, và common static folders
        source: '/((?!(?:en|fr|ar|front-pages|favicon\\.ico|_next|images|static|api|public|assets|icons|videos|documents)\\b)):path',
        destination: '/en/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
