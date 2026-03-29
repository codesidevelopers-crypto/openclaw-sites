import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Заявка — форма обратной связи',
    description: 'Оставьте заявку, и мы свяжемся с вами в ближайшее время.',
    siteUrl: 'http://localhost:8000',
  },
  plugins: ['gatsby-plugin-styled-components'],
};

export default config;
