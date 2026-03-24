import React, { useRef } from 'react'
import type { HeadFC } from 'gatsby'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Reviews from '../components/Reviews'
import Pricing from '../components/Pricing'
import BookingForm from '../components/BookingForm'
import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import { useScrollReveal } from '../hooks/useScrollReveal'

const IndexPage: React.FC = () => {
  const bookingRef = useRef<HTMLElement>(null)

  useScrollReveal()

  const scrollToBooking = (): void => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <Navigation onBookingClick={scrollToBooking} />
      <Hero onBookingClick={scrollToBooking} />
      <Services />
      <About />
      <Reviews />
      <Pricing />
      <BookingForm bookingRef={bookingRef} />
      <Contacts />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>АВТОРИТЕТ — Премиальный автосервис в Москве</title>
    <meta name="description" content="АВТОРИТЕТ — премиальный автосервис в Москве. Диагностика, ТО, кузовной ремонт, шиномонтаж, электрика, АКПП. 12 лет опыта. Гарантия на все работы." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  </>
)
