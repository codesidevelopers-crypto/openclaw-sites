import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Диагностика денежной устойчивости бизнеса',
    description: 'Узнайте на сколько хватит денег, где риск кассовых разрывов и какой запас держать.',
    siteUrl: 'https://biznes-diagnostika.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'DM+Sans:400,500,600,700',
          'JetBrains+Mono:400,500,600',
          'Syne:700,800',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Диагностика бизнеса',
        short_name: 'Диагностика',
        start_url: '/',
        background_color: '#0B1120',
        theme_color: '#3B82F6',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}

export default config
