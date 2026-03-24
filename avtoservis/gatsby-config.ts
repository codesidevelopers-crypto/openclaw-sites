import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'АВТОРИТЕТ — Премиальный автосервис',
    description: 'АВТОРИТЕТ — премиальный автосервис в Москве. Диагностика, ТО, кузовной ремонт, шиномонтаж, электрика, АКПП. 12 лет опыта, 8000+ клиентов.',
    siteUrl: 'https://avtoritet-motors.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Unbounded:400,500,700,900',
          'Mulish:300,400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'АВТОРИТЕТ — Премиальный автосервис',
        short_name: 'АВТОРИТЕТ',
        start_url: '/',
        background_color: '#07090B',
        theme_color: '#C9A227',
        display: 'standalone',
        icon: 'src/images/hero.jpg',
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
