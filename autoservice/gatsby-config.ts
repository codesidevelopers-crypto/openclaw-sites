import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'AutoPro — Премиальный автосервис',
    description: 'Профессиональный автосервис AutoPro. Диагностика, ТО, кузовной ремонт, покраска, шиномонтаж, электрика. 10 лет опыта, 5000+ довольных клиентов.',
    siteUrl: 'https://autopro-service.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Montserrat:400,500,600,700,800,900',
          'Inter:300,400,500,600',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'AutoPro — Премиальный автосервис',
        short_name: 'AutoPro',
        start_url: '/',
        background_color: '#0D0D0D',
        theme_color: '#E63946',
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
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}

export default config
