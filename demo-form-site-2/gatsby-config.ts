import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Demo Form",
    description: "Оставьте заявку — мы свяжемся с вами",
    siteUrl: "https://demoform2.example.com",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
}

export default config
