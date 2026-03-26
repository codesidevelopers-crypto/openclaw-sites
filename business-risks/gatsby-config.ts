import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Митигация бизнес-рисков | Защита вашего бизнеса',
    description: 'Профессиональный анализ и митигация рисков малого и среднего бизнеса в России. Диагностика, консультации, защита от финансовых, юридических и операционных рисков.',
    siteUrl: 'https://business-risks.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'PT+Serif:400,400i,700,700i',
          'PT+Sans:400,400i,700',
          'PT+Sans+Narrow:400,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Митигация бизнес-рисков',
        short_name: 'БизнесРиски',
        start_url: '/',
        background_color: '#0A1628',
        theme_color: '#C9A84C',
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
