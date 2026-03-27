import React, { useState } from 'react'
import type { HeadFC } from 'gatsby'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatItDoes from '../components/WhatItDoes'
import WhatVisible from '../components/WhatVisible'
import Products from '../components/Products'
import OperationsDetail from '../components/OperationsDetail'
import CounterpartyDetail from '../components/CounterpartyDetail'
import LegalRisks from '../components/LegalRisks'
import NewFeatures from '../components/NewFeatures'
import EcosystemServices from '../components/EcosystemServices'
import Formats from '../components/Formats'
import ExpertHelp from '../components/ExpertHelp'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import Modal from '../components/Modal'

const IndexPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalSource, setModalSource] = useState<string>('Не указано')

  const openModal = (source: string = 'Общий интерес'): void => {
    setModalSource(source)
    setModalOpen(true)
  }

  return (
    <>
      <Navbar onCtaClick={() => openModal('Navbar')} />
      <main>
        <Hero onCtaClick={() => openModal('Hero — главный экран')} />
        <WhatItDoes />
        <WhatVisible />
        <Products onCtaClick={openModal} />
        <OperationsDetail onCtaClick={openModal} />
        <CounterpartyDetail onCtaClick={openModal} />
        <LegalRisks onCtaClick={openModal} />
        <NewFeatures />
        <EcosystemServices onCtaClick={openModal} />
        <Formats onCtaClick={openModal} />
        <ExpertHelp onCtaClick={openModal} />
        <FAQ />
        <FinalCTA onCtaClick={openModal} />
      </main>
      <Footer />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        source={modalSource}
      />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Риски бизнеса — Точка Банк</title>
    <meta name="description" content="Сервис управления рисками бизнеса от Точка Банк. Риски по операциям, контрагентам, юридические события — всё в одном окне вашего интернет-банка." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
)
