import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Воронов и партнёры — Юридическая фирма',
    description: 'Профессиональная юридическая защита в России. Гражданские споры, корпоративное право, семейное право, недвижимость, уголовная защита, трудовые споры. 15+ лет опыта, 1200+ дел.',
    siteUrl: 'https://voronov-law.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Playfair+Display:400,400i,600,700,800',
          'Source+Sans+3:300,400,400i,600',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Воронов и партнёры — Юридическая фирма',
        short_name: 'Воронов и партнёры',
        start_url: '/',
        background_color: '#0B2B26',
        theme_color: '#D4AF37',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}

export default config
