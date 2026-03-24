import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Диагностика денежной устойчивости бизнеса',
    description: 'Бесплатная диагностика: на сколько хватит денег, где риск кассовых разрывов, что давит на бизнес.',
    siteUrl: 'https://vyzhivaemost-biznesa.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Raleway:400,500,600,700,800,900',
          'JetBrains+Mono:400,500,600',
          'Nunito:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Диагностика денежной устойчивости',
        short_name: 'Устойчивость',
        start_url: '/',
        background_color: '#07090F',
        theme_color: '#E8A020',
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
