import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shopedia',
    short_name: 'Shopedia',
    description: 'You will get anything fresh here.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/shopedia-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/shopedia-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}