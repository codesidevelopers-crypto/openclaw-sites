import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Team from '../components/Team'
import HowWeWork from '../components/HowWeWork'
import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <WhyUs />
      <Team />
      <HowWeWork />
      <ContactForm />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Воронов и партнёры — Юридическая фирма</title>
    <meta
      name="description"
      content="Профессиональная юридическая защита в России. Гражданские споры, корпоративное право, семейное право, недвижимость, уголовная защита. 15+ лет опыта, 1200+ дел."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://voronov-law.ru/" />
  </>
)
