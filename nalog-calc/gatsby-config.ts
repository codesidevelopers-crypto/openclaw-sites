import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'НалогКалькулятор — выберите лучший налоговый режим',
    description: 'Бесплатный калькулятор для выбора оптимальной системы налогообложения для ИП и ООО. УСН 6%, УСН 15%, Патент, ОСНО — сравните и сэкономьте.',
    siteUrl: 'https://nalog-calc.ru',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Unbounded:400,500,700,900',
          'Nunito:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'НалогКалькулятор',
        short_name: 'НалогКалькулятор',
        start_url: '/',
        background_color: '#060C18',
        theme_color: '#00D4A8',
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
