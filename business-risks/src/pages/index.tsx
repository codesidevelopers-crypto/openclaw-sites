import React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RiskModules from '../components/RiskModules'
import RiskQuiz from '../components/RiskQuiz'
import Methodology from '../components/Methodology'
import Cases from '../components/Cases'
import ConsultForm from '../components/ConsultForm'
import Footer from '../components/Footer'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <RiskModules />
      <RiskQuiz />
      <Methodology />
      <Cases />
      <ConsultForm />
      <Footer />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Митигация бизнес-рисков | Защита вашего бизнеса</title>
    <meta
      name="description"
      content="Профессиональный анализ и митигация рисков малого и среднего бизнеса в России. Диагностика, консультации, защита от финансовых, юридических и операционных рисков."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
