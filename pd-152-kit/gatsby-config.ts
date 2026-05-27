import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Документы по персональным данным для бизнеса',
    description:
      'Лендинг fake-door сервиса по подготовке комплекта документов по 152-ФЗ, формулировок для сайта и уведомления в Роскомнадзор.',
    siteUrl: 'http://pd152kit.7091039-oo109471.twc1.net',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Golos+Text:400,500,600,700,800', 'Inter:400,500,600,700'],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Документы по персональным данным для бизнеса',
        short_name: 'PD 152',
        start_url: '/',
        background_color: '#F5F8FC',
        theme_color: '#4677FF',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
};

export default config;
