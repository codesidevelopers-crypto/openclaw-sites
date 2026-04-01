import React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Benefits from "../components/Benefits"
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import Seo from "../components/Seo"

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <Benefits />
    <ContactForm />
    <Footer />
  </Layout>
)

export default IndexPage

export const Head: HeadFC = () => <Seo />
