import React from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  title?: string
  description?: string
}

const Seo: React.FC<SeoProps> = ({ title, description }) => {
  const { site } = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const metaTitle = title ?? site?.siteMetadata?.title ?? "Demo Form"
  const metaDescription =
    description ?? site?.siteMetadata?.description ?? ""

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </>
  )
}

export default Seo
