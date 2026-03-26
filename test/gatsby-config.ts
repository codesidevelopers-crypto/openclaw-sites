import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Тестовый сайт",
    siteUrl: "http://localhost:8000",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Roboto:400,700"],
        display: "swap",
      },
    },
  ],
}

export default config
