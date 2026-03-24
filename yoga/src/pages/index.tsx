import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import { Hero } from '../components/Hero'
import { Directions } from '../components/Directions'
import { Schedule } from '../components/Schedule'
import { Teachers } from '../components/Teachers'
import { Reviews } from '../components/Reviews'
import { Pricing } from '../components/Pricing'
import { BookingForm } from '../components/BookingForm'
import { Contacts } from '../components/Contacts'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <Directions />
      <Schedule />
      <Teachers />
      <Reviews />
      <Pricing />
      <BookingForm />
      <Contacts />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Прана — Йога-студия в Москве</title>
    <meta
      name="description"
      content="Премиальная йога-студия в центре Москвы. Хатха, виньяса, аштанга, медитация. Записаться на пробное занятие."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Прана — Йога-студия в Москве" />
    <meta property="og:description" content="Пространство для глубокой практики и внутреннего баланса." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </>
)
