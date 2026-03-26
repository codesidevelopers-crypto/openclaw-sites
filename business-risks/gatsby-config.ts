import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Риски бизнеса — Точка Банк',
    description: 'Сервис для управления рисками бизнеса: операции, контрагенты, юридические события. Видьте риски заранее — действуйте уверенно.',
    siteUrl: 'https://business-risks.tochka.com',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Golos+Text:400,500,600,700,900',
          'Nunito:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Риски бизнеса — Точка Банк',
        short_name: 'Риски бизнеса',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#7C3AED',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
}

export default config
