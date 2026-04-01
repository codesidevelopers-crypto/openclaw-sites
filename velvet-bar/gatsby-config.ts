import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Velvet Bar — Авторские коктейли и атмосфера',
    description: 'Velvet Bar — стильный бар с авторскими коктейлями, DJ-сетами по выходным и уютной атмосферой. Забронируйте столик онлайн.',
    siteUrl: 'https://velvetbar.openclaw.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Playfair+Display:400,500,600,700,900',
          'Inter:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Velvet Bar — Авторские коктейли и атмосфера',
        short_name: 'Velvet Bar',
        start_url: '/',
        background_color: '#0A0A0A',
        theme_color: '#FF2D7B',
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
