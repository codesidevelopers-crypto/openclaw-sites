import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Здоровье Бизнеса',
    description: 'Оцените здоровье вашего бизнеса за 5 минут. Получите персонализированный дашборд с рекомендациями.',
    siteUrl: 'https://zdorove-biznesa.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Inter:300,400,500,600,700,800,900',
          'Manrope:400,500,600,700,800',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Здоровье Бизнеса',
        short_name: 'ЗБ',
        start_url: '/',
        background_color: '#0a0a0f',
        theme_color: '#6c63ff',
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
