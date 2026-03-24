import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Прана — йога-студия в Москве',
    description: 'Премиальная йога-студия в центре Москвы. Хатха, виньяса, аштанга, медитация и растяжка. Запишитесь на пробное занятие.',
    siteUrl: 'https://prana-yoga.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Cormorant+Garamond:300,400,500,600,700',
          'Jost:300,400,500,600',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Прана — йога-студия',
        short_name: 'Прана',
        start_url: '/',
        background_color: '#0D1A0D',
        theme_color: '#B8955A',
        display: 'standalone',
        icon: 'src/images/atmosphere.jpg',
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
