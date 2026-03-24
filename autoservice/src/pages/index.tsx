import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import BookingForm from '../components/BookingForm'
import Contact from '../components/Contact'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <Contact />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>AutoPro — Премиальный автосервис</title>
    <meta
      name="description"
      content="Профессиональный автосервис AutoPro. Диагностика, ТО, кузовной ремонт, покраска, шиномонтаж, электрика. 10 лет опыта, 5000+ довольных клиентов."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
