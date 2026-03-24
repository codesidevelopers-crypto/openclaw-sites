import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Кофейня',
    description: 'Авторский кофе, уютная атмосфера и лучшая выпечка в городе. Забронируйте столик или закажите онлайн.',
    siteUrl: 'https://kofeynya.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Playfair+Display:700,800,900',
          'Inter:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Кофейня',
        short_name: 'Кофейня',
        start_url: '/',
        background_color: '#1A0A00',
        theme_color: '#C8831A',
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
