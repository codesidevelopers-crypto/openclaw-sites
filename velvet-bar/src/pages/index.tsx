import React, { useRef } from 'react'
import type { HeadFC } from 'gatsby'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Cocktails from '../components/Cocktails'
import Program from '../components/Program'
import Gallery from '../components/Gallery'
import Advantages from '../components/Advantages'
import BookingForm from '../components/BookingForm'
import Contacts from '../components/Contacts'
import Footer from '../components/Footer'

const IndexPage: React.FC = () => {
  const bookingRef = useRef<HTMLElement | null>(null)

  const scrollToBooking = (): void => {
    const el = document.getElementById('booking')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar onBookClick={scrollToBooking} />
      <main ref={bookingRef}>
        <Hero onBookClick={scrollToBooking} />
        <About />
        <Cocktails />
        <Program />
        <Gallery />
        <Advantages />
        <BookingForm />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Velvet Bar — Авторские коктейли и атмосфера</title>
    <meta name="description" content="Velvet Bar — стильный бар с авторскими коктейлями, DJ-сетами по выходным и уютной атмосферой. Забронируйте столик онлайн." />
  </>
)
