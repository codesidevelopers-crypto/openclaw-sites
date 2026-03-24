import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Здоров Бизнес',
    description: 'Бесплатная оценка вашего бизнеса за 5 минут. Получите персональный отчёт с точными рекомендациями.',
    siteUrl: 'https://zdorov-biznes.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Raleway:700,800,900',
          'Inter:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Здоров Бизнес',
        short_name: 'ЗБ',
        start_url: '/',
        background_color: '#060A12',
        theme_color: '#FF4D6D',
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
