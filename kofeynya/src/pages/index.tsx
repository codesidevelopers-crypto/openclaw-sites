import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Menu } from '../components/Menu'
import { BookingForm } from '../components/BookingForm'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Menu />
      <BookingForm />
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Кофейня — Авторский кофе в Москве</title>
    <meta
      name="description"
      content="Авторский кофе, уютная атмосфера и лучшая выпечка в городе. Забронируйте столик онлайн."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
