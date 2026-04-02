import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Барбершоп — стильные стрижки рядом с вами",
    description:
      "Современная парикмахерская: стрижки, укладки и уход для мужчин и женщин. Запись за минуту.",
    siteUrl: "https://barbershop-default.example.com",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Барбершоп",
        short_name: "Барбершоп",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#1a1a2e",
        display: "standalone",
        icon: "src/images/icon.svg",
      },
    },
  ],
};

export default config;
