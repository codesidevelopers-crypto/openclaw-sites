import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Риски бизнеса — Точка Банк',
    description: 'Сервис управления рисками бизнеса от Точка Банк. Операции, контрагенты, юридические события, самозанятые — всё под контролем.',
    siteUrl: 'https://rb.tochka.com',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Syne:700,800',
          'DM+Sans:400,500,600',
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
        theme_color: '#6C47FF',
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
